import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Link } from 'wouter';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  ArrowLeft, 
  Search, 
  Filter,
  BookOpen, 
  FileText, 
  Mic, 
  Clock, 
  Brain, 
  Download,
  Share,
  CheckCircle,
  Star,
  Upload,
  Lightbulb,
  HelpCircle
} from 'lucide-react';
import { FileUploader } from '@/components/FileUploader';
import { apiRequest } from '@/lib/queryClient';
import type { Lecture, ProcessedContent } from '@shared/schema';

export function LectureReformatter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'summary' | 'terms' | 'knowledge' | 'quiz'>('upload');
  const [activeLanguage, setActiveLanguage] = useState<'ko' | 'en' | 'zh'>('ko');
  const queryClient = useQueryClient();

  // Fetch lectures
  const { data: lectures = [], isLoading } = useQuery({
    queryKey: ['/api/lectures', searchQuery, selectedSubject],
    queryFn: () => apiRequest(`/api/lectures?search=${searchQuery}&subject=${selectedSubject}`),
  });

  // Star/unstar mutation
  const starMutation = useMutation({
    mutationFn: async ({ id, isStarred }: { id: string; isStarred: boolean }) => {
      return apiRequest(`/api/lectures/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ isStarred }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/lectures'] });
    },
  });

  // Get unique subjects for filter
  const subjects = Array.from(new Set(lectures.map((l: Lecture) => l.subject).filter(Boolean)));

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'presentation': return <FileText className="w-5 h-5 text-red-500" />;
      case 'pdf': return <FileText className="w-5 h-5 text-red-600" />;
      case 'document': return <FileText className="w-5 h-5 text-blue-500" />;
      case 'audio': return <Mic className="w-5 h-5 text-purple-500" />;
      default: return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (lecture: Lecture) => {
    switch (lecture.status) {
      case 'completed':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="w-3 h-3 mr-1" />
            처리완료
          </Badge>
        );
      case 'processing':
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            <Clock className="w-3 h-3 mr-1" />
            처리중
          </Badge>
        );
      case 'failed':
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            처리실패
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            대기중
          </Badge>
        );
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleLectureSelect = (lecture: Lecture) => {
    setSelectedLecture(lecture);
    if (lecture.status === 'completed' && lecture.processedContent) {
      setActiveTab('summary');
    }
  };

  const renderProcessedContent = () => {
    if (!selectedLecture?.processedContent) return null;
    
    const content = selectedLecture.processedContent as ProcessedContent;
    
    switch (activeTab) {
      case 'summary':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">{selectedLecture.title}</h2>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" title="PDF 다운로드">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" title="공유하기">
                    <Share className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg mb-6">
                <h3 className="font-bold text-gray-800 mb-3">📋 강의 개요</h3>
                <p className="text-gray-700 whitespace-pre-line">{content.summary[activeLanguage]}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                  <h4 className="font-semibold text-green-900 mb-3 flex items-center">
                    <Brain className="w-5 h-5 mr-2" />
                    학습 목표
                  </h4>
                  <ul className="space-y-2 text-green-800">
                    {content.learningObjectives[activeLanguage]?.map((objective, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-1 mr-2 flex-shrink-0" />
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl">
                  <h4 className="font-semibold text-orange-900 mb-3 flex items-center">
                    <Star className="w-5 h-5 mr-2" />
                    핵심 키워드
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {content.keywords[activeLanguage]?.map((keyword, index) => (
                      <span key={index} className="px-3 py-1 bg-orange-200 text-orange-800 rounded-full text-sm">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'terms':
        return (
          <div className="space-y-4">
            {content.keyTerms?.map((term, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-800 mb-2">{term.term}</h3>
                    <p className="text-gray-700 mb-3">{term.definition[activeLanguage]}</p>
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">강의 맥락:</span> {term.context[activeLanguage]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'knowledge':
        return (
          <div className="grid md:grid-cols-2 gap-4">
            {content.backgroundKnowledge?.map((knowledge, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                  {knowledge.title[activeLanguage]}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {knowledge.content[activeLanguage]}
                </p>
              </div>
            ))}
          </div>
        );

      case 'quiz':
        return (
          <div className="space-y-6">
            {content.quiz?.map((question, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <HelpCircle className="w-5 h-5 mr-2 text-blue-500" />
                    문제 {index + 1}. {question.question[activeLanguage]}
                  </h3>
                  <div className="space-y-2">
                    {question.options[activeLanguage]?.map((option, optionIndex) => (
                      <label key={optionIndex} className="flex items-center gap-3 p-2 rounded hover:bg-gray-50 cursor-pointer">
                        <input type="radio" name={`q${index}`} value={optionIndex} className="text-blue-600" />
                        <span className="text-sm">{optionIndex + 1}. {option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="bg-green-50 border-l-4 border-green-400 p-3">
                  <p className="text-sm text-gray-700 mb-1">
                    <span className="font-medium">정답:</span> {question.options[activeLanguage]?.[question.correct]}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">해설:</span> {question.explanation[activeLanguage]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">UniBuddy</h1>
                <p className="text-sm text-gray-500">AI 강의 리포맷터</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar */}
        <aside className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">강의 자료 목록</h2>
            
            {/* Search and Filter */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="강의 자료 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex space-x-2">
                <select 
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                >
                  <option value="">전체 과목</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Lecture List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {isLoading ? (
              <div className="text-center text-gray-500">로딩 중...</div>
            ) : lectures.length === 0 ? (
              <div className="text-center text-gray-500">
                <BookOpen className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                <p>강의 자료가 없습니다</p>
              </div>
            ) : (
              lectures.map((lecture: Lecture) => (
                <div
                  key={lecture.id}
                  className={`rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedLecture?.id === lecture.id
                      ? 'bg-blue-50 border border-blue-200'
                      : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                  }`}
                  onClick={() => handleLectureSelect(lecture)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {getFileIcon(lecture.fileType)}
                        <h3 className="font-medium text-gray-900 truncate">{lecture.title}</h3>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">{formatDate(lecture.uploadDate)}</p>
                      <div className="flex items-center justify-between">
                        {getStatusBadge(lecture)}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            starMutation.mutate({ id: lecture.id, isStarred: !lecture.isStarred });
                          }}
                          className={lecture.isStarred ? 'text-orange-500' : 'text-gray-400'}
                        >
                          <Star className={`w-4 h-4 ${lecture.isStarred ? 'fill-current' : ''}`} />
                        </Button>
                      </div>
                      {lecture.status === 'processing' && lecture.progress > 0 && (
                        <div className="mt-2">
                          <Progress value={lecture.progress} className="h-1" />
                          <p className="text-xs text-gray-500 mt-1">{lecture.progress}% 완료</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {!selectedLecture ? (
            /* Upload Area */
            <div className="flex-1 p-6">
              <FileUploader onUploadComplete={() => {
                queryClient.invalidateQueries({ queryKey: ['/api/lectures'] });
              }} />
            </div>
          ) : (
            <>
              {/* Tab Navigation */}
              <div className="bg-white border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  <Button
                    variant="ghost"
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'summary'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab('summary')}
                    disabled={!selectedLecture.processedContent}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    요약 노트
                  </Button>
                  <Button
                    variant="ghost"
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'terms'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab('terms')}
                    disabled={!selectedLecture.processedContent}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    용어 사전
                  </Button>
                  <Button
                    variant="ghost"
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'knowledge'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab('knowledge')}
                    disabled={!selectedLecture.processedContent}
                  >
                    <Lightbulb className="w-4 h-4 mr-2" />
                    배경지식 카드
                  </Button>
                  <Button
                    variant="ghost"
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'quiz'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab('quiz')}
                    disabled={!selectedLecture.processedContent}
                  >
                    <HelpCircle className="w-4 h-4 mr-2" />
                    자동 퀴즈
                  </Button>
                </nav>
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                {selectedLecture.status === 'processing' ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">AI가 강의를 분석하고 있습니다</h3>
                      <p className="text-gray-500 mb-4">잠시만 기다려주세요...</p>
                      <Progress value={selectedLecture.progress} className="w-64 mx-auto" />
                      <p className="text-sm text-gray-500 mt-2">{selectedLecture.progress}% 완료</p>
                    </div>
                  </div>
                ) : selectedLecture.status === 'failed' ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Upload className="w-8 h-8 text-red-500" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">처리 중 오류가 발생했습니다</h3>
                      <p className="text-gray-500">파일을 다시 업로드해주세요.</p>
                    </div>
                  </div>
                ) : selectedLecture.processedContent ? (
                  renderProcessedContent()
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">처리 대기 중</h3>
                      <p className="text-gray-500">AI 분석이 곧 시작됩니다.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Language Bar */}
              {selectedLecture.processedContent && (
                <div className="bg-white border-t border-gray-200 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-medium text-gray-700">언어 설정:</span>
                      <div className="flex space-x-2">
                        <Button
                          variant={activeLanguage === 'ko' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setActiveLanguage('ko')}
                        >
                          한국어
                        </Button>
                        <Button
                          variant={activeLanguage === 'en' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setActiveLanguage('en')}
                        >
                          English
                        </Button>
                        <Button
                          variant={activeLanguage === 'zh' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setActiveLanguage('zh')}
                        >
                          中文
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <Button variant="outline" className="flex items-center space-x-2">
                        <Download className="w-4 h-4" />
                        <span>PDF 내보내기</span>
                      </Button>
                      <Button className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600">
                        <Share className="w-4 h-4" />
                        <span>공유하기</span>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

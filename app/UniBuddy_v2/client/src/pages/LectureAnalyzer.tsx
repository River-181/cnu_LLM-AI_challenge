import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FileText,
  Upload,
  Play,
  Pause,
  Download,
  Search,
  Filter,
  Clock,
  BookOpen,
  Languages,
  Brain,
  ArrowLeft,
} from 'lucide-react';
import { Link } from 'wouter';

const LectureAnalyzer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedLecture, setSelectedLecture] = useState<string | null>(null);

  // Mock lecture data
  const lectures = [
    {
      id: '1',
      title: '마케팅 원론 - 4P 전략',
      course: '경영학원론',
      professor: '김경영 교수',
      uploadDate: '2024-01-15',
      status: 'completed',
      fileType: 'ppt',
      duration: '45분',
      koreanLevel: 'intermediate',
      analysisProgress: 100,
      tags: ['마케팅', '4P', '전략'],
    },
    {
      id: '2',
      title: '국제경영환경 분석',
      course: '국제경영학',
      professor: '이국제 교수',
      uploadDate: '2024-01-14',
      status: 'processing',
      fileType: 'pdf',
      duration: '38분',
      koreanLevel: 'advanced',
      analysisProgress: 75,
      tags: ['국제경영', '환경분석'],
    },
    {
      id: '3',
      title: '재무제표 읽기 기초',
      course: '회계원리',
      professor: '박회계 교수',
      uploadDate: '2024-01-13',
      status: 'pending',
      fileType: 'mp3',
      duration: '52분',
      koreanLevel: 'beginner',
      analysisProgress: 0,
      tags: ['재무제표', '회계', '기초'],
    },
  ];

  const filteredLectures = lectures.filter(lecture => 
    (selectedFilter === 'all' || lecture.status === selectedFilter) &&
    (searchQuery === '' || 
     lecture.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     lecture.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
     lecture.professor.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return '분석 완료';
      case 'processing': return '분석 중';
      case 'pending': return '대기 중';
      default: return '알 수 없음';
    }
  };

  const getFileTypeIcon = (fileType: string) => {
    switch (fileType) {
      case 'ppt': return '📊';
      case 'pdf': return '📄';
      case 'mp3': return '🎵';
      case 'mp4': return '🎬';
      default: return '📁';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-gray-800">AI 강의 리포맷터</h1>
                <p className="text-sm text-gray-500">Lecture Analysis & Reformatter</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">베트남 유학생 맞춤</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Upload Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Upload className="w-5 h-5" />
              <span>새 강의 자료 업로드</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">강의 자료를 업로드하세요</h3>
              <p className="text-gray-600 mb-4">
                PPT, PDF, 음성 녹음 파일 (MP3, WAV), 동영상 (MP4) 지원
              </p>
              <div className="flex items-center justify-center space-x-4">
                <Button className="bg-blue-500 hover:bg-blue-600">
                  <Upload className="w-4 h-4 mr-2" />
                  파일 선택
                </Button>
                <span className="text-sm text-gray-500">또는 파일을 여기로 끌어다 놓으세요</span>
              </div>
              <p className="text-xs text-gray-400 mt-4">최대 파일 크기: 100MB</p>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="강의 제목, 과목명, 교수명으로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="상태로 필터" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체</SelectItem>
              <SelectItem value="completed">분석 완료</SelectItem>
              <SelectItem value="processing">분석 중</SelectItem>
              <SelectItem value="pending">대기 중</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Lecture List */}
        <div className="space-y-4">
          {filteredLectures.map((lecture) => (
            <Card key={lecture.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="text-3xl">{getFileTypeIcon(lecture.fileType)}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{lecture.title}</h3>
                        <Badge className={`text-xs ${getStatusColor(lecture.status)}`}>
                          {getStatusText(lecture.status)}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 mb-3">
                        <p><strong>과목:</strong> {lecture.course}</p>
                        <p><strong>교수:</strong> {lecture.professor}</p>
                        <p><strong>업로드:</strong> {lecture.uploadDate}</p>
                      </div>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span>{lecture.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Languages className="w-4 h-4 text-gray-500" />
                          <span>{lecture.koreanLevel === 'beginner' ? '초급' : 
                                 lecture.koreanLevel === 'intermediate' ? '중급' : '고급'}</span>
                        </div>
                        <div className="flex space-x-1">
                          {lecture.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-3">
                    {lecture.status === 'processing' && (
                      <div className="w-32">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>분석 중</span>
                          <span>{lecture.analysisProgress}%</span>
                        </div>
                        <Progress value={lecture.analysisProgress} className="h-2" />
                      </div>
                    )}
                    
                    <div className="flex space-x-2">
                      {lecture.status === 'completed' && (
                        <>
                          <Button size="sm" variant="outline">
                            <BookOpen className="w-4 h-4 mr-1" />
                            요약 보기
                          </Button>
                          <Button size="sm" variant="outline">
                            <Brain className="w-4 h-4 mr-1" />
                            퀴즈
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-1" />
                            다운로드
                          </Button>
                        </>
                      )}
                      {lecture.status === 'processing' && (
                        <Button size="sm" variant="outline" disabled>
                          <div className="animate-spin w-4 h-4 mr-1">⏳</div>
                          분석 중...
                        </Button>
                      )}
                      {lecture.status === 'pending' && (
                        <Button size="sm">
                          <Play className="w-4 h-4 mr-1" />
                          분석 시작
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredLectures.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">강의 자료가 없습니다</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery ? '검색 결과가 없습니다.' : '첫 번째 강의 자료를 업로드해보세요.'}
              </p>
              {!searchQuery && (
                <Button>
                  <Upload className="w-4 h-4 mr-2" />
                  강의 업로드
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Features Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Languages className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">다국어 지원</h3>
              <p className="text-sm text-gray-600">
                한국어, 베트남어, 영어로 강의 내용을 요약하고 번역합니다.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">AI 분석</h3>
              <p className="text-sm text-gray-600">
                당신의 한국어 수준에 맞춰 핵심 내용을 쉽게 설명합니다.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">학습 도구</h3>
              <p className="text-sm text-gray-600">
                퀴즈, 용어 사전, 발음 가이드 등 다양한 학습 도구를 제공합니다.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LectureAnalyzer;

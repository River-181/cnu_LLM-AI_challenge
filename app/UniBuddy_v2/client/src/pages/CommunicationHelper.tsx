import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  MessageCircle, 
  Mail, 
  Presentation, 
  Volume2, 
  Copy, 
  CheckCircle2, 
  Lightbulb,
  Users,
  BookOpen,
  Star
} from 'lucide-react';
import { Link } from 'wouter';
import { COMMUNICATION_TYPES, TARGET_AUDIENCES } from '@/lib/constants';

const CommunicationHelper = () => {
  const [selectedType, setSelectedType] = useState('email');
  const [selectedAudience, setSelectedAudience] = useState('professor');
  const [userInput, setUserInput] = useState('');
  const [improvedText, setImprovedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedText, setCopiedText] = useState('');

  // Mock improved text generation
  const handleImproveText = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const improvedVersions = {
      email: {
        professor: `안녕하세요, 교수님.

경영학과 2학년에 재학 중인 응옥짠(Ngọc Trân)입니다.

이번 마케팅 수업과 관련하여 질문이 있어서 연락드렸습니다. 4P 전략 과제를 준비하던 중, 베트남 시장과 한국 시장의 차이점에 대해 더 자세히 알고 싶어서요. 

바쁘신 중에도 시간을 내어 답변해 주시면 정말 감사하겠습니다.

좋은 하루 보내세요.

응옥짠 드림
학번: 2023123456
경영학과 2학년`,
        peer: `안녕! 나는 응옥짠이야.

마케팅 과제 관련해서 질문이 있는데, 혹시 시간 있을 때 도움 좀 받을 수 있을까? 4P 전략 부분이 좀 어려워서 말이야.

고마워!`,
      },
      presentation: {
        professor: `안녕하세요. 저는 경영학과 2학년 응옥짠입니다.

오늘은 '베트남과 한국의 마케팅 전략 비교'에 대해 발표하겠습니다.

먼저 발표 순서를 말씀드리겠습니다...

(발표 후)
경청해 주셔서 감사합니다. 질문이 있으시면 언제든지 말씀해 주세요.`,
      }
    };

    const type = selectedType as keyof typeof improvedVersions;
    const typeData = improvedVersions[type];
    
    if (typeof typeData === 'object' && typeData !== null) {
      const audience = selectedAudience as keyof typeof typeData;
      setImprovedText(typeData[audience] || '개선된 텍스트를 생성할 수 없습니다.');
    } else {
      setImprovedText(typeData || '개선된 텍스트를 생성할 수 없습니다.');
    }
    setIsLoading(false);
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(''), 2000);
  };

  const pronunciationGuides = [
    {
      korean: '안녕하세요, 교수님',
      pronunciation: 'an-nyeong-ha-se-yo, gyo-su-nim',
      meaning: 'Hello, Professor',
      audio: '/audio/hello-professor.mp3'
    },
    {
      korean: '질문이 있습니다',
      pronunciation: 'jil-mun-i iss-seub-ni-da',
      meaning: 'I have a question',
      audio: '/audio/have-question.mp3'
    },
    {
      korean: '감사합니다',
      pronunciation: 'gam-sa-hab-ni-da',
      meaning: 'Thank you',
      audio: '/audio/thank-you.mp3'
    },
    {
      korean: '죄송합니다',
      pronunciation: 'joe-song-hab-ni-da',
      meaning: 'I\'m sorry',
      audio: '/audio/sorry.mp3'
    },
  ];

  const templates = [
    {
      category: '이메일',
      items: [
        {
          title: '교수님께 질문 이메일',
          preview: '안녕하세요 교수님, 수업 관련하여 질문이...',
          formality: 'high'
        },
        {
          title: '과제 연장 요청',
          preview: '교수님께, 과제 제출 기한 연장을...',
          formality: 'high'
        },
        {
          title: '동기에게 도움 요청',
          preview: '안녕! 과제 관련해서 질문이...',
          formality: 'low'
        },
      ]
    },
    {
      category: '발표',
      items: [
        {
          title: '자기소개 발표',
          preview: '안녕하세요. 저는... 입니다.',
          formality: 'medium'
        },
        {
          title: '프로젝트 발표 시작',
          preview: '오늘 발표할 주제는...',
          formality: 'medium'
        },
        {
          title: '발표 마무리',
          preview: '경청해 주셔서 감사합니다...',
          formality: 'medium'
        },
      ]
    }
  ];

  const culturalTips = [
    {
      situation: '교수님과의 소통',
      tips: [
        '항상 존댓말을 사용하세요',
        '이메일 제목에 학과와 이름을 명시하세요',
        '"바쁘신 중에도"와 같은 상대방 배려 표현을 사용하세요',
        '감사 인사로 마무리하세요'
      ],
      icon: '👨‍🏫'
    },
    {
      situation: '동급생과의 소통',
      tips: [
        '반말과 존댓말을 상황에 맞게 사용하세요',
        '친근한 표현을 적절히 섞어 사용하세요',
        '도움을 요청할 때는 부담스럽지 않게 표현하세요',
        '"고마워"보다는 "고마워요" 정도가 적당해요'
      ],
      icon: '👥'
    },
    {
      situation: '발표 상황',
      tips: [
        '발표 시작과 끝에 인사를 꼭 하세요',
        '청중의 눈을 마주치며 말하세요',
        '너무 빠르지 않게, 명확하게 발음하세요',
        '질문 시간을 위해 "질문 있으시면 말씀해 주세요"라고 하세요'
      ],
      icon: '🎤'
    }
  ];

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
              <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-gray-800">교수 소통 헬퍼</h1>
                <p className="text-sm text-gray-500">Communication Assistant</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-orange-100 text-orange-800">
              한국 문화 맞춤형
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <Tabs defaultValue="improve" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="improve">텍스트 개선</TabsTrigger>
            <TabsTrigger value="templates">템플릿</TabsTrigger>
            <TabsTrigger value="pronunciation">발음 가이드</TabsTrigger>
            <TabsTrigger value="culture">문화 가이드</TabsTrigger>
          </TabsList>

          {/* Text Improvement Tab */}
          <TabsContent value="improve" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Input Section */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Mail className="w-5 h-5 text-orange-600" />
                      <span>소통 상황 설정</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          소통 유형
                        </label>
                        <Select value={selectedType} onValueChange={setSelectedType}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {COMMUNICATION_TYPES.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                <div className="flex items-center space-x-2">
                                  <i className={`${type.icon} text-sm`}></i>
                                  <span>{type.label}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          대상
                        </label>
                        <Select value={selectedAudience} onValueChange={setSelectedAudience}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {TARGET_AUDIENCES.map((audience) => (
                              <SelectItem key={audience.value} value={audience.value}>
                                <div className="flex items-center justify-between w-full">
                                  <span>{audience.label}</span>
                                  <Badge variant="outline" className="ml-2 text-xs">
                                    {audience.formality === 'high' ? '높임' : 
                                     audience.formality === 'medium' ? '보통' : '친근'}
                                  </Badge>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        원본 텍스트 입력
                      </label>
                      <Textarea
                        placeholder="개선하고 싶은 문장이나 내용을 입력하세요..."
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        className="min-h-[120px]"
                      />
                    </div>

                    <Button 
                      onClick={handleImproveText}
                      disabled={isLoading || !userInput.trim()}
                      className="w-full bg-orange-500 text-white hover:bg-orange-600"
                    >
                      {isLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                          <span>AI가 개선 중...</span>
                        </div>
                      ) : (
                        <>
                          <Lightbulb className="w-4 h-4 mr-2" />
                          문화적 맥락으로 개선하기
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                {/* Improved Result */}
                {improvedText && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <span>개선된 텍스트</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans">
                          {improvedText}
                        </pre>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          onClick={() => handleCopyText(improvedText)}
                          size="sm"
                          variant="outline"
                          className="flex items-center space-x-2"
                        >
                          {copiedText === improvedText ? (
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                          <span>{copiedText === improvedText ? '복사됨!' : '복사하기'}</span>
                        </Button>
                        
                        <Button size="sm" variant="outline">
                          <Volume2 className="w-4 h-4 mr-2" />
                          발음 듣기
                        </Button>
                      </div>

                      {/* Cultural Notes */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-medium text-blue-900 mb-2">💡 문화적 개선 포인트</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• 존댓말 사용으로 정중한 표현으로 변경</li>
                          <li>• 상대방을 배려하는 표현 추가</li>
                          <li>• 한국 문화에 맞는 이메일 형식 적용</li>
                          <li>• 감사 인사로 정중하게 마무리</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Side Panel */}
              <div className="space-y-6">
                {/* Quick Tips */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">상황별 핵심 표현</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-1">교수님께</h4>
                        <p className="text-sm text-gray-600">"바쁘신 중에 죄송합니다"</p>
                        <p className="text-sm text-gray-600">"시간 내어 주셔서 감사합니다"</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-1">동급생에게</h4>
                        <p className="text-sm text-gray-600">"시간 있을 때 도움 좀 받을 수 있을까?"</p>
                        <p className="text-sm text-gray-600">"미리 고마워!"</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-1">발표 시</h4>
                        <p className="text-sm text-gray-600">"경청해 주셔서 감사합니다"</p>
                        <p className="text-sm text-gray-600">"질문 있으시면 말씀해 주세요"</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Usage Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">이번 주 활용도</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">이메일 작성</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 h-2 bg-gray-200 rounded-full">
                            <div className="w-12 h-2 bg-orange-500 rounded-full"></div>
                          </div>
                          <span className="text-sm text-gray-600">8회</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">발표 준비</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 h-2 bg-gray-200 rounded-full">
                            <div className="w-8 h-2 bg-blue-500 rounded-full"></div>
                          </div>
                          <span className="text-sm text-gray-600">3회</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">질문하기</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 h-2 bg-gray-200 rounded-full">
                            <div className="w-10 h-2 bg-green-500 rounded-full"></div>
                          </div>
                          <span className="text-sm text-gray-600">5회</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((category) => (
                <Card key={category.category}>
                  <CardHeader>
                    <CardTitle className="text-lg">{category.category} 템플릿</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {category.items.map((template, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-900">{template.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {template.formality === 'high' ? '정중함' : 
                             template.formality === 'medium' ? '보통' : '친근함'}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{template.preview}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Pronunciation Guide Tab */}
          <TabsContent value="pronunciation" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pronunciationGuides.map((guide, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {guide.korean}
                        </h3>
                        <p className="text-sm text-blue-600 font-mono">
                          {guide.pronunciation}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {guide.meaning}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button size="sm" className="flex items-center space-x-2">
                          <Volume2 className="w-4 h-4" />
                          <span>발음 듣기</span>
                        </Button>
                        <Button size="sm" variant="outline">
                          <Copy className="w-4 h-4 mr-2" />
                          복사
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Cultural Guide Tab */}
          <TabsContent value="culture" className="space-y-6">
            <div className="space-y-6">
              {culturalTips.map((tip, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <span className="text-2xl">{tip.icon}</span>
                      <span>{tip.situation}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {tip.tips.map((tipItem, tipIndex) => (
                        <div key={tipIndex} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                          <Star className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-blue-800">{tipItem}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CommunicationHelper;

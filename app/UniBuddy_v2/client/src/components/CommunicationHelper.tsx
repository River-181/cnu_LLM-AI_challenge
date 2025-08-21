import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Volume2, Copy, RefreshCw, MessageSquare, Users, BookOpen, Mic, Play, Pause, RotateCcw } from 'lucide-react';

const CommunicationHelper = () => {
  const [selectedTarget, setSelectedTarget] = useState('professor');
  const [selectedSituation, setSelectedSituation] = useState('email');
  const [inputText, setInputText] = useState('교수님, 내일 수업에 늦을 것 같습니다. 죄송합니다.');
  const [isProcessing, setIsProcessing] = useState(false);

  const communicationTargets = [
    { id: 'professor', name: '교수님', icon: '👨‍🏫', description: '교수 및 강사진' },
    { id: 'peers', name: '동료/친구', icon: '👥', description: '같은 과 학생들' },
    { id: 'seniors', name: '선배', icon: '🎓', description: '상급생 및 선배' },
    { id: 'staff', name: '직원', icon: '👔', description: '행정직원 및 교직원' },
    { id: 'international', name: '외국인 학생', icon: '🌍', description: '다른 나라 유학생' }
  ];

  const communicationSituations = [
    { id: 'email', name: '이메일', icon: '📧' },
    { id: 'presentation', name: '발표', icon: '📊' },
    { id: 'question', name: '질문하기', icon: '❓' },
    { id: 'request', name: '부탁/요청', icon: '🙏' },
    { id: 'apology', name: '사과/양해', icon: '🙇' },
    { id: 'introduction', name: '자기소개', icon: '👋' },
    { id: 'discussion', name: '토론/의견', icon: '💭' },
    { id: 'club', name: '동아리/모임', icon: '🏆' }
  ];

  const transformationResult = {
    original: inputText,
    transformed: '교수님, 안녕하세요. 내일 수업 관련하여 말씀드리고 싶은 것이 있어서 연락드립니다. 개인적인 사정으로 인해 수업 시작 시간에 다소 늦게 도착할 것 같습니다. 이로 인해 수업에 차질이 생기지 않도록 미리 말씀드리며, 늦어지는 점 정말 죄송합니다. 가능한 한 빨리 도착하도록 하겠습니다. 감사합니다.',
    culturalTips: [
      '한국에서는 교수님께 연락할 때 충분한 존댓말과 정중한 표현을 사용하는 것이 중요합니다.',
      '미리 알려드리는 것이 예의에 맞으며, 사과와 함께 해결 의지를 보여주는 것이 좋습니다.',
      '단순한 사실 전달보다는 상황을 설명하고 양해를 구하는 형식이 적절합니다.'
    ],
    keyChanges: [
      { type: 'politeness', before: '늦을 것 같습니다', after: '늦게 도착할 것 같습니다', reason: '더 정중한 표현으로 변경' },
      { type: 'formality', before: '죄송합니다', after: '정말 죄송합니다', reason: '강조를 통한 진정성 표현' },
      { type: 'context', before: '단순 통보', after: '상황 설명 + 해결 의지', reason: '한국 문화에 맞는 맥락 제공' }
    ],
    pronunciationGuide: [
      { word: '교수님', pronunciation: '교-수-님', emphasis: '님에 강세' },
      { word: '말씀드립니다', pronunciation: '말-씀-드-립-니-다', emphasis: '정중한 높임 표현' },
      { word: '죄송합니다', pronunciation: '죄-송-합-니-다', emphasis: '진정성 있게' }
    ]
  };

  const koreanMannerTips = [
    {
      category: '한국식 발표 매너',
      tips: [
        '발표 시작 시 "안녕하세요, 발표하게 될 [이름]입니다"로 인사',
        '교수님과 청중에게 각각 인사하기',
        '발표 중 "죄송합니다"보다는 "실례합니다" 사용',
        '질문받을 때 "좋은 질문 감사합니다"로 시작',
        '발표 마무리에 "경청해 주셔서 감사합니다" 필수'
      ]
    },
    {
      category: '20대 대학생 표현 사전',
      tips: [
        '교수님께: ~것 같습니다 (추측 표현으로 겸손함 표현)',
        '동기들에게: ~할게요 (친근하지만 정중한 약속)',
        '선배에게: ~해도 될까요? (허락 구하는 표현)',
        '후배에게: ~해봐 (격려하는 표현)',
        '동아리에서: ~어때요? (의견 묻기)'
      ]
    },
    {
      category: '발음 가이드',
      tips: [
        '존댓말 어미 "-습니다"는 명확하게 발음',
        '"ㅓ"와 "ㅗ" 구분하여 발음 (특히 베트남어 화자)',
        '받침 "ㅇ" 소리 정확히 내기',
        '격음(ㅋ,ㅌ,ㅍ,ㅊ) 강하게 발음하기',
        '의문문 끝 억양 올리기'
      ]
    }
  ];

  const emailTemplates = [
    {
      situation: '수업 결석 알림',
      template: '교수님, 안녕하세요. [과목명] 수업을 듣고 있는 [이름]입니다. [날짜] 수업에 [사유]로 인해 참석하지 못하게 되어 미리 말씀드립니다. 수업 내용은 동료들을 통해 확인하겠으며, 과제나 공지사항이 있다면 알려주시면 감사하겠습니다. 불편을 끼쳐드려 죄송합니다.'
    },
    {
      situation: '과제 제출 연장 요청',
      template: '교수님, 안녕하세요. [과목명]을 수강하는 [이름]입니다. [날짜]까지 제출 예정인 [과제명]과 관련하여 연락드립니다. [구체적 사유]로 인해 기한 내 제출이 어려운 상황입니다. 가능하시다면 [기간] 연장을 부탁드려도 될까요? 최선을 다해 완성하겠습니다. 감사합니다.'
    },
    {
      situation: '연구실 방문 약속',
      template: '교수님, 안녕하세요. [과목명]을 수강하는 [이름]입니다. [구체적 내용]에 대해 상담을 받고 싶어서 연락드립니다. 교수님의 일정이 허락하신다면 연구실 방문이 가능한지 문의드립니다. 가능한 날짜와 시간을 알려주시면 그에 맞춰 방문하겠습니다. 바쁘신 중에 시간 내주셔서 감사합니다.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-gray-800">교수 소통 헬퍼</h1>
                <p className="text-sm text-gray-500">Professor Communication Helper</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Target & Situation Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">대상 및 상황 선택</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    대화 상대 선택
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {communicationTargets.map((target) => (
                      <Button
                        key={target.id}
                        variant={selectedTarget === target.id ? "default" : "outline"}
                        onClick={() => setSelectedTarget(target.id)}
                        className="h-auto p-3 flex flex-col items-center space-y-1"
                      >
                        <span className="text-lg">{target.icon}</span>
                        <span className="text-xs">{target.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    발화 상황
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {communicationSituations.map((situation) => (
                      <Button
                        key={situation.id}
                        variant={selectedSituation === situation.id ? "default" : "outline"}
                        onClick={() => setSelectedSituation(situation.id)}
                        className="h-auto p-3 flex flex-col items-center space-y-1"
                      >
                        <span className="text-lg">{situation.icon}</span>
                        <span className="text-xs">{situation.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Input Text */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">문화 맥락 번역</CardTitle>
                <p className="text-sm text-gray-600">
                  직설적 표현을 한국 문화에 맞는 완곡하고 정중한 표현으로 변환합니다.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    변환할 텍스트 입력
                  </label>
                  <Textarea
                    placeholder="변환하고 싶은 문장을 입력해주세요..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
                <Button 
                  className="w-full bg-orange-600 hover:bg-orange-700"
                  onClick={() => setIsProcessing(true)}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      변환 중...
                    </>
                  ) : (
                    '한국 문화에 맞게 변환하기'
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Transformation Result */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">변환 결과</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-red-800">원본</h4>
                    <Button variant="ghost" size="sm">
                      <Volume2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-red-700">{transformationResult.original}</p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-green-800">한국 문화 맞춤 변환</h4>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Volume2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-green-700">{transformationResult.transformed}</p>
                </div>

                {/* Key Changes */}
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-800">주요 변경사항</h4>
                  {transformationResult.keyChanges.map((change, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm bg-blue-50 p-2 rounded">
                      <span className="font-medium text-blue-800">{change.type}:</span>
                      <span className="text-red-600">"{change.before}"</span>
                      <span>→</span>
                      <span className="text-green-600">"{change.after}"</span>
                      <span className="text-gray-600">({change.reason})</span>
                    </div>
                  ))}
                </div>

                {/* Cultural Tips */}
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-medium text-yellow-800 mb-2">문화적 팁</h4>
                  <ul className="space-y-1 text-sm text-yellow-700">
                    {transformationResult.culturalTips.map((tip, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-yellow-600">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Pronunciation Guide */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Mic className="w-5 h-5 mr-2 text-blue-600" />
                  발음 가이드
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {transformationResult.pronunciationGuide.map((guide, idx) => (
                  <div key={idx} className="bg-gray-50 p-3 rounded">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-800">{guide.word}</span>
                      <Button variant="ghost" size="sm">
                        <Volume2 className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="text-sm text-blue-600 mb-1">{guide.pronunciation}</div>
                    <div className="text-xs text-gray-600">{guide.emphasis}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Korean Manner Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-green-600" />
                  한국 소통 가이드
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {koreanMannerTips.map((category, idx) => (
                  <div key={idx} className="space-y-2">
                    <h4 className="font-medium text-gray-800 border-b pb-1">{category.category}</h4>
                    <ul className="space-y-1">
                      {category.tips.slice(0, 3).map((tip, tipIdx) => (
                        <li key={tipIdx} className="text-xs text-gray-600 flex items-start space-x-2">
                          <span className="text-green-500 mt-1">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                    <Button variant="ghost" size="sm" className="text-xs">
                      더보기 ({category.tips.length - 3}개)
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Email Templates */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">이메일 템플릿</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {emailTemplates.map((template, idx) => (
                  <div key={idx} className="bg-gray-50 p-3 rounded">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-800 text-sm">{template.situation}</h4>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm">
                          <Volume2 className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-3">{template.template}</p>
                  </div>
                ))}
                <Button variant="outline" className="w-full text-sm">
                  모든 템플릿 보기
                </Button>
              </CardContent>
            </Card>

            {/* Audio Practice */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Play className="w-5 h-5 mr-2 text-purple-600" />
                  음성 연습
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-purple-50 p-3 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">한국어 발표 연습</span>
                    <Button variant="ghost" size="sm">
                      <Play className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-600">
                    <RotateCcw className="w-3 h-3" />
                    <span>재생 속도: 0.8x</span>
                  </div>
                </div>
                
                <div className="bg-purple-50 p-3 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">20대 대학생 표현</span>
                    <Button variant="ghost" size="sm">
                      <Play className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-600">
                    <RotateCcw className="w-3 h-3" />
                    <span>반복 학습: 3회</span>
                  </div>
                </div>

                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-sm">
                  AI 발음 코치와 연습하기
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunicationHelper;
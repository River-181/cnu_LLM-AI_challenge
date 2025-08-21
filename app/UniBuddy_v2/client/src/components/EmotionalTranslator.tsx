import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Send, Heart, Users, Book, Volume2, Meh, Smile, Target, TrendingUp, Brain, MessageCircle } from 'lucide-react';

const EmotionalTranslator = () => {
  const [message, setMessage] = useState('');
  const [messages] = useState([
    {
      id: 1,
      type: 'bot',
      content: '안녕하세요 응옥짠님! 오늘 하루는 어떠셨나요? 어떤 일로 마음이 무거우신지 편하게 말씀해주세요 😊',
      timestamp: '오후 2:30'
    },
    {
      id: 2,
      type: 'user',
      content: '나 오늘 친구랑 놀지 못해서 외로웠어... 한국에서 친구 사귀는 게 정말 어려운 것 같아요.',
      timestamp: '오후 2:32'
    },
    {
      id: 3,
      type: 'bot',
      content: '아, 친구와의 약속이 취소되어서 많이 외로우셨겠네요. 새로운 환경에서 친구를 사귀는 것은 정말 용기가 필요한 일이에요. 응옥짠님의 마음이 충분히 이해됩니다. 혼자 있는 시간도 소중하지만, 사람과의 연결도 중요하죠.',
      timestamp: '오후 2:33',
      emotion: 'loneliness',
      emotionIntensity: 'moderate',
      culturalContext: 'friendship_adjustment',
      suggestions: ['친구 사귀기 팁', '외로움 달래기', '동아리 추천', '언어교환 모임']
    },
    {
      id: 4,
      type: 'bot',
      content: '혹시 베트남에서는 친구들과 어떤 활동을 즐기셨나요? 한국에서도 비슷한 취미나 관심사를 가진 사람들을 찾아보는 것이 좋을 것 같아요. 충남대에는 다양한 동아리와 국제학생 모임들이 있답니다!',
      timestamp: '오후 2:34',
      suggestions: ['CNU 동아리 목록', '국제학생 모임', '언어교환 프로그램', '문화교류 이벤트']
    }
  ]);

  // 감정 분석 결과 (mBERT + 감성 BERT 시뮬레이션)
  const emotionAnalysis = {
    primaryEmotion: '외로움',
    intensity: '보통',
    culturalContext: '한국 적응 중 사회적 관계 형성 어려움',
    emotionScores: {
      sadness: 65,
      loneliness: 80,
      anxiety: 45,
      hope: 30,
      frustration: 55
    }
  };

  const psychologyMetrics = {
    phq9: {
      score: 8,
      status: '경미한 우울 증상',
      trend: '안정적'
    },
    gad7: {
      score: 6,
      status: '경미한 불안 증상', 
      trend: '개선 중'
    },
    learningComprehension: 78,
    socialConnection: 45
  };

  const communityRecommendations = [
    { name: '힐링 게시판', icon: Heart, color: 'text-pink-600', bgColor: 'bg-pink-50', description: '같은 고민을 가진 친구들과 소통' },
    { name: '친구 찾기', icon: Users, color: 'text-blue-600', bgColor: 'bg-blue-50', description: '취미가 맞는 친구들을 찾아보세요' },
    { name: '문화교류', icon: MessageCircle, color: 'text-green-600', bgColor: 'bg-green-50', description: '베트남-한국 문화 교류 모임' },
    { name: '언어교환', icon: Book, color: 'text-purple-600', bgColor: 'bg-purple-50', description: '한국어-베트남어 언어교환 파트너' }
  ];

  const coping strategies = [
    { title: '호흡명상', description: '5분간 깊은 호흡으로 마음 진정하기', icon: '🧘‍♀️' },
    { title: '일기쓰기', description: '오늘의 감정을 글로 정리해보기', icon: '📝' },
    { title: '음악듣기', description: '베트남 음악이나 편안한 곡 듣기', icon: '🎵' },
    { title: '산책하기', description: '캠퍼스나 근처 공원에서 가벼운 산책', icon: '🚶‍♀️' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-gray-800">마음의 통역사</h1>
                <p className="text-sm text-gray-500">The Heart of Dialogues</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Users className="w-4 h-4 mr-2" />
              상담 신청
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat Area */}
          <div className="lg:col-span-2">
            <Card className="h-[700px] flex flex-col">
              {/* Chat Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-sm lg:max-w-md ${msg.type === 'user' ? 'bg-blue-600 text-white' : 'bg-white border'} rounded-lg p-3`}>
                      <p className="text-sm">{msg.content}</p>
                      <div className="text-xs opacity-70 mt-1">{msg.timestamp}</div>
                      
                      {msg.suggestions && (
                        <div className="mt-3 space-y-2">
                          <div className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded flex items-center">
                            <Brain className="w-3 h-3 mr-1" />
                            감정 분석: {emotionAnalysis.primaryEmotion} ({emotionAnalysis.intensity})
                          </div>
                          <div className="bg-blue-50 text-blue-800 text-xs px-2 py-1 rounded">
                            문화적 맥락: {emotionAnalysis.culturalContext}
                          </div>
                          <div className="grid grid-cols-2 gap-1">
                            {msg.suggestions.map((suggestion, idx) => (
                              <Button key={idx} variant="outline" size="sm" className="text-xs h-8">
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    placeholder="응옥짠님의 마음을 편하게 나누어 주세요..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-2 space-y-4">
            {/* Current Emotion Status */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-green-600" />
                  현재 감정 상태
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">주요 감정</span>
                  <div className="flex items-center space-x-2">
                    <Meh className="w-5 h-5 text-orange-500" />
                    <span className="text-sm font-medium">{emotionAnalysis.primaryEmotion}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-red-50 p-2 rounded">
                    <div className="font-medium">외로움</div>
                    <div className="text-red-600">{emotionAnalysis.emotionScores.loneliness}%</div>
                  </div>
                  <div className="bg-blue-50 p-2 rounded">
                    <div className="font-medium">슬픔</div>
                    <div className="text-blue-600">{emotionAnalysis.emotionScores.sadness}%</div>
                  </div>
                  <div className="bg-yellow-50 p-2 rounded">
                    <div className="font-medium">불안</div>
                    <div className="text-yellow-600">{emotionAnalysis.emotionScores.anxiety}%</div>
                  </div>
                  <div className="bg-green-50 p-2 rounded">
                    <div className="font-medium">희망</div>
                    <div className="text-green-600">{emotionAnalysis.emotionScores.hope}%</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Psychology Metrics */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Target className="w-5 h-5 mr-2 text-blue-600" />
                  심리 지표 측정
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">PHQ-9 (우울증 선별)</span>
                    <span className="text-sm font-medium">{psychologyMetrics.phq9.score}/27</span>
                  </div>
                  <div className="text-xs text-gray-600">{psychologyMetrics.phq9.status}</div>
                  
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-sm">GAD-7 (불안장애 선별)</span>
                    <span className="text-sm font-medium">{psychologyMetrics.gad7.score}/21</span>
                  </div>
                  <div className="text-xs text-gray-600">{psychologyMetrics.gad7.status}</div>
                </div>
                
                <div className="pt-2 border-t">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">학습 이해도</span>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3 text-green-500" />
                      <span className="text-sm font-medium">{psychologyMetrics.learningComprehension}%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">사회적 연결감</span>
                    <div className="flex items-center space-x-1">
                      <span className="text-sm font-medium text-orange-600">{psychologyMetrics.socialConnection}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Coping Strategies */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">맞춤 추천</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {coping strategies.map((strategy, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{strategy.icon}</span>
                      <div>
                        <div className="text-sm font-medium">{strategy.title}</div>
                        <div className="text-xs text-gray-600">{strategy.description}</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Volume2 className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Community Recommendations */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">추천 커뮤니티</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {communityRecommendations.map((board, idx) => (
                  <div key={idx} className={`p-3 ${board.bgColor} rounded-lg border-l-4 border-${board.color.split('-')[1]}-400`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 mb-1">
                        <board.icon className={`w-4 h-4 ${board.color}`} />
                        <span className="text-sm font-medium">{board.name}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Volume2 className="w-3 h-3" />
                      </Button>
                    </div>
                    <p className="text-xs text-gray-600">{board.description}</p>
                  </div>
                ))}
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white" size="sm">
                  Sentiment-Match 엔진으로 커뮤니티 이동
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmotionalTranslator;
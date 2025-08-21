import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'wouter';
import { ArrowLeft, Send, Heart, AlertTriangle, Users, Calendar, Brain, Smile } from 'lucide-react';

interface EmotionalTranslatorProps {
  userPreferences: { name: string; preferredLanguage: string } | null;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  emotionScore?: {
    positive: boolean;
    loneliness: boolean;
    sadness: boolean;
    concern: boolean;
    excited: boolean;
  };
  suggestions?: string[];
}

export function EmotionalTranslator({ userPreferences }: EmotionalTranslatorProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `안녕하세요 ${userPreferences?.name}님! 저는 마음의 통역사입니다. 오늘 어떤 일로 고민이 있으신가요? 편안하게 말씀해주세요.`,
      sender: 'bot',
      timestamp: new Date(),
    },
    {
      id: '2',
      text: '나 오늘 친구랑 놀지 못해서 외로웠어',
      sender: 'user',
      timestamp: new Date(Date.now() + 60000),
      emotionScore: { positive: false, loneliness: true, sadness: false, concern: false, excited: false }
    },
    {
      id: '3',
      text: `친구들과 함께 시간을 보내지 못해서 외로우셨군요. ${userPreferences?.name}님의 마음 정말 이해해요. 유학 생활에서 혼자 있는 시간이 많을 때 이런 감정이 드는 건 너무 자연스러운 일이에요. 

혼자만의 시간도 소중하지만, 사람들과의 연결도 중요하죠. 새로운 친구들과 만날 수 있는 기회들을 찾아보시면 어떨까요? 충남대학교에는 다양한 국적의 학생들이 있고, 여러 활동들을 통해 자연스럽게 친구를 만들 수 있답니다.`,
      sender: 'bot',
      timestamp: new Date(Date.now() + 120000),
      suggestions: [
        '국제학생 모임 참여하기',
        '같은 관심사 동아리 찾기', 
        '언어교환 프로그램 신청',
        '문화교류 이벤트 참석하기'
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 기본적인 감정 분석 (일반적인 기분 상태만)
  const analyzeEmotion = (text: string) => {
    const positiveKeywords = ['기뻐', '행복', '좋아', '즐거', '신나', '만족', '성공', '잘해'];
    const lonelinessKeywords = ['외로', '혼자', '친구', '놀지', '못해', '같이', '함께'];
    const sadnessKeywords = ['슬프', '허전', '쓸쓸', '그립', '우울'];
    const concernKeywords = ['걱정', '고민', '어려워', '막막', '힘들'];
    const excitedKeywords = ['설레', '기대', '새로', '도전'];

    const positive = positiveKeywords.some(keyword => text.includes(keyword));
    const loneliness = lonelinessKeywords.some(keyword => text.includes(keyword)) || text.includes('외로웠어');
    const sadness = sadnessKeywords.some(keyword => text.includes(keyword));
    const concern = concernKeywords.some(keyword => text.includes(keyword));
    const excited = excitedKeywords.some(keyword => text.includes(keyword));

    return { positive, loneliness, sadness, concern, excited };
  };

  // 감정 기반 응답 생성 (일반적인 지원만)
  const generateResponse = (emotionScore: any) => {
    const { positive, loneliness, sadness, concern, excited } = emotionScore;
    
    if (loneliness) {
      return {
        response: `친구들과 함께 시간을 보내지 못해서 외로우셨군요. ${userPreferences?.name}님의 마음 정말 이해해요. 유학 생활에서 혼자 있는 시간이 많을 때 이런 감정이 드는 건 너무 자연스러운 일이에요. 

혼자만의 시간도 소중하지만, 사람들과의 연결도 중요하죠. 새로운 친구들과 만날 수 있는 기회들을 찾아보시면 어떨까요? 충남대학교에는 다양한 국적의 학생들이 있고, 여러 활동들을 통해 자연스럽게 친구를 만들 수 있답니다.`,
        suggestions: [
          '국제학생 모임 참여하기',
          '같은 관심사 동아리 찾기',
          '언어교환 프로그램 신청',
          '문화교류 이벤트 참석하기'
        ]
      };
    }
    
    if (positive) {
      return {
        response: `정말 좋은 소식이네요! ${userPreferences?.name}님의 긍정적인 마음이 느껴져요. 이런 좋은 기분을 더 많은 사람들과 나누시면 어떨까요?`,
        suggestions: [
          '성취 경험 공유하기',
          '친구들과 즐거운 시간 보내기',
          '새로운 도전 계획하기',
          '학습 성과 기록하기'
        ]
      };
    }
    
    if (sadness) {
      return {
        response: `마음이 좀 무거우시군요. 외국에서 지내다 보면 가끔 이런 감정이 드는 게 자연스러워요. 혼자가 아니라는 걸 기억해 주세요.`,
        suggestions: [
          '같은 나라 친구들과 만나기',
          '문화교류 프로그램 참여하기',
          '취미 동아리 찾아보기',
          '힐링 게시판 둘러보기'
        ]
      };
    }

    if (concern) {
      return {
        response: `고민이 있으시군요. 유학 생활에서 어려움이 생기는 건 누구에게나 있는 일이에요. 천천히 해결해 나가면 됩니다.`,
        suggestions: [
          '학습 도움 요청하기',
          '선배들의 조언 듣기',
          '문제 해결 가이드 보기',
          '멘토링 프로그램 참여하기'
        ]
      };
    }

    if (excited) {
      return {
        response: `새로운 일에 대한 기대감이 느껴져요! 도전하는 마음가짐이 정말 멋져요. 차근차준비해보시면 좋을 것 같아요.`,
        suggestions: [
          '계획 세우기',
          '필요한 정보 찾아보기',
          '경험자들과 대화하기',
          '단계별 목표 정하기'
        ]
      };
    }

    return {
      response: `오늘은 어떤 하루를 보내셨나요? ${userPreferences?.name}님의 이야기를 들려주세요. 함께 대화하면서 도움이 될 만한 정보를 찾아보겠습니다.`,
      suggestions: [
        '오늘 있었던 일 이야기하기',
        '학습 계획 세우기',
        '친구 만들기 팁 보기',
        '문화 체험 정보 찾기'
      ]
    };
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      // Call Gemini API for emotional analysis
      const response = await fetch('/api/emotional-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputText,
          userName: userPreferences?.name || '학생'
        }),
      });

      if (response.ok) {
        const analysis = await response.json();
        
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: analysis.response,
          sender: 'bot',
          timestamp: new Date(),
          emotionScore: analysis.emotion,
          suggestions: analysis.suggestions
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        // Fallback to local response
        const emotionScore = analyzeEmotion(inputText);
        const { response, suggestions } = generateResponse(emotionScore);
        
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: response,
          sender: 'bot',
          timestamp: new Date(),
          emotionScore,
          suggestions,
        };
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (error) {
      console.error('Error calling emotional analysis API:', error);
      // Fallback to local response
      const emotionScore = analyzeEmotion(inputText);
      const { response, suggestions } = generateResponse(emotionScore);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date(),
        emotionScore,
        suggestions,
      };
      setMessages(prev => [...prev, botMessage]);
    }

    setIsTyping(false);
  };

  const getEmotionDisplay = (emotionScore: any) => {
    const emotions = [];
    if (emotionScore.positive) emotions.push({ text: '긍정적', color: 'bg-green-100 text-green-700' });
    if (emotionScore.loneliness) emotions.push({ text: '외로움', color: 'bg-indigo-100 text-indigo-700' });
    if (emotionScore.sadness) emotions.push({ text: '아쉬움', color: 'bg-blue-100 text-blue-700' });
    if (emotionScore.concern) emotions.push({ text: '고민중', color: 'bg-yellow-100 text-yellow-700' });
    if (emotionScore.excited) emotions.push({ text: '기대감', color: 'bg-purple-100 text-purple-700' });
    
    return emotions.length > 0 ? emotions : [{ text: '평온함', color: 'bg-gray-100 text-gray-700' }];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">마음의 통역사</h1>
                <p className="text-sm text-gray-500">감정 분석 기반 공감 챗봇</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* 채팅 영역 */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  실시간 감정 분석 대화
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender === 'user' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-white border shadow-sm'
                      }`}>
                        <p className="text-sm">{message.text}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                        </p>

                        {message.emotionScore && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <p className="text-xs text-gray-500 mb-2">감지된 기분:</p>
                            <div className="flex flex-wrap gap-1">
                              {getEmotionDisplay(message.emotionScore).map((emotion, index) => (
                                <span key={index} className={`px-2 py-1 rounded text-xs ${emotion.color}`}>
                                  {emotion.text}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {message.suggestions && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <p className="text-xs text-gray-500 mb-2">추천 지원:</p>
                            <div className="space-y-1">
                              {message.suggestions.map((suggestion, index) => (
                                <button
                                  key={index}
                                  className="block w-full text-left text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded hover:bg-blue-100"
                                >
                                  {suggestion}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white border shadow-sm rounded-lg px-4 py-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="flex gap-2">
                  <Input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="마음 편히 이야기해보세요..."
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={sendMessage} disabled={!inputText.trim() || isTyping}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 사이드바 */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Smile className="w-4 h-4" />
                  감정 인식 도우미
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-gray-600 mb-3">
                  대화 내용을 바탕으로 적절한 학습 자료와 커뮤니티를 추천합니다
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs">기분 분석 활성화</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-xs">맞춤 추천 대기</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  추천 커뮤니티
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <button className="w-full text-left p-2 rounded border hover:bg-gray-50">
                  <p className="text-sm font-medium">힐링 게시판</p>
                  <p className="text-xs text-gray-500">스트레스 완화와 정서적 지원</p>
                </button>
                <button className="w-full text-left p-2 rounded border hover:bg-gray-50">
                  <p className="text-sm font-medium">멘토링 매칭</p>
                  <p className="text-xs text-gray-500">선배 유학생과의 1:1 상담</p>
                </button>
                <button className="w-full text-left p-2 rounded border hover:bg-gray-50">
                  <p className="text-sm font-medium">문화적응 그룹</p>
                  <p className="text-xs text-gray-500">같은 고민을 가진 친구들</p>
                </button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  연계 서비스
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <button className="w-full text-left p-2 rounded border hover:bg-gray-50">
                  <p className="text-sm font-medium">학생상담센터</p>
                  <p className="text-xs text-gray-500">전문 상담 예약</p>
                </button>
                <button className="w-full text-left p-2 rounded border hover:bg-gray-50">
                  <p className="text-sm font-medium">국제교류본부</p>
                  <p className="text-xs text-gray-500">유학생 지원 프로그램</p>
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
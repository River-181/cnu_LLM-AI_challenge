import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Heart, Brain, MessageCircle, Mic, Calendar, Users, Send, BarChart3, TrendingUp, AlertTriangle } from 'lucide-react';
import { Link } from 'wouter';
import { EMOTION_CATEGORIES } from '@/lib/constants';
import type { EmotionScores, ConversationMessage } from '@/types';

const EmotionalTranslator = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<ConversationMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: '안녕하세요! 저는 UniBuddy의 마음의 통역사예요. 오늘 기분이 어떠신가요? 편하게 이야기해주세요. 베트남어로도 대화할 수 있어요! 😊',
      timestamp: new Date(),
    },
  ]);
  
  // Mock emotion analysis results
  const currentEmotions: EmotionScores = {
    depression: 2.1,
    anxiety: 1.8,
    stress: 3.2,
    loneliness: 2.5,
    hope: 7.8,
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage: ConversationMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        '그렇게 느끼시는 것이 충분히 이해돼요. 새로운 환경에서 적응하는 것은 정말 어려운 일이에요.',
        '베트남에서 한국으로 오시느라 많은 변화를 경험하고 계시는군요. 그런 감정들이 자연스러운 거예요.',
        '한국어 공부하면서 스트레스를 받으시는 것 같아요. 천천히 해도 괜찮다는 것을 기억해주세요.',
        '같은 고민을 하는 다른 유학생 친구들도 많아요. 혼자가 아니라는 것을 알아주세요.',
      ];
      
      const response: ConversationMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  const getEmotionColor = (score: number) => {
    if (score <= 3) return 'bg-green-500';
    if (score <= 5) return 'bg-yellow-500';
    if (score <= 7) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getEmotionLevel = (score: number) => {
    if (score <= 2) return '매우 낮음';
    if (score <= 4) return '낮음';
    if (score <= 6) return '보통';
    if (score <= 8) return '높음';
    return '매우 높음';
  };

  const recommendations = [
    {
      icon: '🧘‍♀️',
      title: '호흡 명상 (5분)',
      description: '베트남어 가이드와 함께하는 간단한 호흡 운동',
      action: '시작하기',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      icon: '📝',
      title: '감정 일기 쓰기',
      description: '오늘의 감정을 베트남어나 한국어로 기록해보세요',
      action: '일기 쓰기',
      color: 'bg-purple-50 text-purple-700',
    },
    {
      icon: '🎵',
      title: '베트남 음악 듣기',
      description: '고향의 음악으로 마음을 편안하게 해보세요',
      action: '음악 듣기',
      color: 'bg-green-50 text-green-700',
    },
    {
      icon: '💬',
      title: '동포 친구와 채팅',
      description: '같은 고민을 하는 베트남 유학생들과 대화',
      action: '채팅방 참여',
      color: 'bg-orange-50 text-orange-700',
    },
  ];

  const weeklyTrend = [
    { day: '월', score: 6.2 },
    { day: '화', score: 5.8 },
    { day: '수', score: 4.9 },
    { day: '목', score: 5.5 },
    { day: '금', score: 6.8 },
    { day: '토', score: 7.2 },
    { day: '일', score: 6.5 },
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
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-gray-800">마음의 통역사</h1>
                <p className="text-sm text-gray-500">Emotional Support & Analysis</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              안전한 상담 환경
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chat Interface */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Emotion Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-blue-600" />
                  <span>실시간 감정 분석</span>
                  <Badge variant="outline" className="ml-auto">mBERT AI 분석</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-700">현재 감정 상태</span>
                    <span className="text-sm text-gray-500">실시간 업데이트됨</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {EMOTION_CATEGORIES.map((category) => {
                      const score = currentEmotions[category.key as keyof EmotionScores];
                      return (
                        <div key={category.key} className="space-y-2">
                          <div className="flex justify-between text-xs text-gray-600">
                            <span>{category.label}</span>
                            <span>{score}/10</span>
                          </div>
                          <Progress value={score * 10} className="h-3" />
                          <p className="text-xs text-center text-gray-600">
                            {getEmotionLevel(score)}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Chat Interface */}
            <Card className="h-96">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                  <span>대화하기</span>
                  <Badge variant="secondary" className="ml-auto">🇻🇳🇰🇷 다국어 지원</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start space-x-3 ${
                        message.role === 'user' ? 'justify-end' : ''
                      }`}
                    >
                      {message.role === 'assistant' && (
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Heart className="w-4 h-4 text-green-600" />
                        </div>
                      )}
                      
                      <div
                        className={`rounded-2xl p-4 max-w-xs ${
                          message.role === 'user'
                            ? 'bg-blue-500 text-white rounded-tr-md'
                            : 'bg-gray-100 text-gray-800 rounded-tl-md'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>

                      {message.role === 'user' && (
                        <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs font-bold">NT</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="border border-gray-200 rounded-xl p-3">
                  <div className="flex items-center space-x-3">
                    <Textarea
                      placeholder="마음 편하게 이야기해보세요... (Hãy chia sẻ thoải mái...)"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      className="flex-1 border-0 focus:ring-0 focus:outline-none bg-transparent resize-none"
                      rows={1}
                    />
                    <div className="flex space-x-2">
                      <Button size="sm" variant="ghost">
                        <Mic className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={handleSendMessage}
                        disabled={!inputText.trim()}
                        size="sm"
                        className="bg-blue-500 text-white hover:bg-blue-600"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Weekly Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  <span>주간 감정 트렌드</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {weeklyTrend.map((day) => (
                    <div key={day.day} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{day.day}</span>
                      <div className="flex items-center space-x-2 flex-1 mx-3">
                        <Progress value={day.score * 10} className="flex-1 h-2" />
                        <span className="text-sm text-gray-600 w-8">{day.score}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <TrendingUp className="w-4 h-4 inline mr-1" />
                    이번 주 전체적으로 긍정적인 추세를 보이고 있어요!
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-pink-600" />
                  <span>맞춤 추천</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recommendations.map((rec, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className={`w-full text-left p-3 rounded-lg ${rec.color} hover:opacity-80 transition-opacity justify-start h-auto`}
                  >
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-lg">{rec.icon}</span>
                        <span className="font-medium text-sm">{rec.title}</span>
                      </div>
                      <p className="text-xs opacity-75">{rec.description}</p>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Professional Help */}
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-orange-800">
                  <AlertTriangle className="w-5 h-5" />
                  <span>전문 상담 안내</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-white p-3 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">충남대 학생상담센터</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    전문 상담사와 1:1 상담을 받을 수 있어요. 다국어 지원 가능합니다.
                  </p>
                  <Button size="sm" className="w-full bg-orange-500 text-white hover:bg-orange-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    상담 예약하기
                  </Button>
                </div>
                
                <div className="bg-white p-3 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">베트남 유학생 네트워크</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    같은 경험을 가진 선배, 동기들과 연결해드려요.
                  </p>
                  <Button size="sm" variant="outline" className="w-full">
                    <Users className="w-4 h-4 mr-2" />
                    네트워크 참여
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Privacy Notice */}
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <h4 className="font-medium text-blue-900 mb-2 flex items-center">
                  <Heart className="w-4 h-4 mr-2" />
                  안전한 상담 환경
                </h4>
                <p className="text-xs text-blue-800">
                  모든 대화는 암호화되어 저장되며, 개인정보는 철저히 보호됩니다. 
                  위급한 상황에서만 전문가에게 연결됩니다.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmotionalTranslator;

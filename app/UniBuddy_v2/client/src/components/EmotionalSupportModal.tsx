import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Heart, Bot, User, Mic, Calendar, Users, Send, X } from 'lucide-react';
import { EMOTION_CATEGORIES } from '@/lib/constants';
import type { ConversationMessage, EmotionScores } from '@/types';

interface EmotionalSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmotionalSupportModal: React.FC<EmotionalSupportModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ConversationMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: '안녕하세요, Trân님! 오늘 하루는 어떠셨나요? 베트남어로도 편하게 대화하실 수 있어요. 😊',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  // Mock emotion scores
  const emotionScores: EmotionScores = {
    depression: 2.1,
    anxiety: 1.8,
    stress: 3.2,
    loneliness: 2.5,
    hope: 7.8,
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: ConversationMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const response: ConversationMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '이해해요. 새로운 언어로 빠른 강의를 듣는 것은 정말 힘들죠. 이런 상황에서는 강의 녹음을 AI 리포맷터로 분석해보는 것이 도움이 될 것 같아요. 베트남어 설명도 함께 제공해드릴 수 있어요!',
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

  const quickActions = [
    {
      icon: Mic,
      title: '음성으로 대화하기',
      color: 'bg-blue-50 hover:bg-blue-100',
      textColor: 'text-blue-900',
      iconColor: 'text-blue-600',
    },
    {
      icon: Calendar,
      title: '학생상담센터 예약하기',
      color: 'bg-purple-50 hover:bg-purple-100',
      textColor: 'text-purple-900',
      iconColor: 'text-purple-600',
    },
    {
      icon: Users,
      title: '비슷한 고민의 친구들과 연결',
      color: 'bg-green-50 hover:bg-green-100',
      textColor: 'text-green-900',
      iconColor: 'text-green-600',
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="border-b border-gray-200 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <DialogTitle className="text-xl font-semibold">마음의 통역사</DialogTitle>
                <p className="text-gray-600">감정 분석 기반 맞춤 상담</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto space-y-6 py-4">
          {/* Emotion Score Display */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">현재 감정 상태</span>
              <span className="text-sm text-gray-500">실시간 분석됨</span>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              {EMOTION_CATEGORIES.map((category) => {
                const score = emotionScores[category.key as keyof EmotionScores];
                return (
                  <div key={category.key} className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>{category.label}</span>
                      <span>{score}/10</span>
                    </div>
                    <Progress 
                      value={score * 10} 
                      className="h-2"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chat Interface */}
          <div className="space-y-4 min-h-[300px] max-h-[400px] overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.role === 'user' ? 'justify-end' : ''
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-green-600" />
                  </div>
                )}
                
                <div
                  className={`rounded-2xl p-4 max-w-sm ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white rounded-tr-md'
                      : 'bg-gray-100 text-gray-800 rounded-tl-md'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>

                {message.role === 'user' && (
                  <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">T</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="border border-gray-200 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <Input
                placeholder="마음 편하게 이야기해보세요... (Hãy chia sẻ thoải mái...)"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 border-0 focus:ring-0 focus:outline-none bg-transparent"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="w-10 h-10 bg-blue-500 text-white rounded-lg hover:bg-blue-600 p-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  variant="ghost"
                  className={`w-full text-left p-3 rounded-lg ${action.color} transition-colors justify-start`}
                >
                  <Icon className={`w-4 h-4 mr-3 ${action.iconColor}`} />
                  <span className={`text-sm font-medium ${action.textColor}`}>
                    {action.title}
                  </span>
                </Button>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmotionalSupportModal;

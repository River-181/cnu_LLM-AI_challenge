import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { GraduationCap, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import OnboardingModal from '@/components/OnboardingModal';
import { useMockAuth } from '@/hooks/useAuth';
import { useLocation } from 'wouter';

const OnboardingForm = () => {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [, setLocation] = useLocation();
  const { user } = useMockAuth();

  const handleStartOnboarding = () => {
    setIsOnboardingOpen(true);
  };

  const handleCompleteOnboarding = (data: any) => {
    console.log('Onboarding completed with data:', data);
    setIsOnboardingOpen(false);
    // In a real app, this would save to the backend
    setLocation('/');
  };

  if (user?.profile?.completedOnboarding) {
    setLocation('/');
    return null;
  }

  const onboardingFeatures = [
    {
      icon: '🎯',
      title: '맞춤형 학습',
      description: '당신의 한국어 수준과 전공에 맞는 개인화된 학습 경험',
    },
    {
      icon: '💬',
      title: '문화적 소통',
      description: '베트남 문화 배경을 고려한 한국어 커뮤니케이션 지원',
    },
    {
      icon: '🤝',
      title: '정서적 지원',
      description: 'AI 기반 감정 분석과 맞춤형 심리 상담 서비스',
    },
    {
      icon: '📚',
      title: '강의 분석',
      description: '복잡한 강의 내용을 이해하기 쉽게 요약 및 번역',
    },
    {
      icon: '🌏',
      title: '커뮤니티',
      description: '다국적 유학생들과의 소통 및 정보 공유 플랫폼',
    },
    {
      icon: '📋',
      title: '생활 정보',
      description: '비자, 보험, 주거 등 필수 행정업무 안내',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to <span className="text-blue-600">UniBuddy</span>
          </h1>
          <p className="text-xl text-gray-600 mb-2">충남대학교 유학생을 위한 AI 버디</p>
          <p className="text-lg text-gray-500">Your AI companion for academic and emotional support</p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {onboardingFeatures.map((feature, index) => (
            <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Call to Action */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Get Started with Personalized Setup
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              UniBuddy는 당신의 학습 목표, 한국어 수준, 문화적 배경을 이해하여 
              가장 적합한 지원을 제공합니다. 6단계의 간단한 설정으로 시작해보세요.
            </p>
            
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>개인 맞춤형 설정</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>다국어 지원</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>약 5분 소요</span>
              </div>
            </div>

            <Button
              onClick={handleStartOnboarding}
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 text-lg font-medium"
            >
              시작하기 (Get Started)
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <p className="text-xs text-gray-500 mt-4">
              설정 완료 후 언제든지 변경할 수 있습니다
            </p>
          </CardContent>
        </Card>

        {/* Language Support */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500 mb-2">지원 언어</p>
          <div className="flex justify-center space-x-4">
            <span className="text-2xl" title="Vietnamese">🇻🇳</span>
            <span className="text-2xl" title="Korean">🇰🇷</span>
            <span className="text-2xl" title="English">🇺🇸</span>
            <span className="text-2xl" title="Chinese">🇨🇳</span>
            <span className="text-2xl" title="Japanese">🇯🇵</span>
          </div>
        </div>
      </div>

      {/* Onboarding Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onComplete={handleCompleteOnboarding}
      />
    </div>
  );
};

export default OnboardingForm;

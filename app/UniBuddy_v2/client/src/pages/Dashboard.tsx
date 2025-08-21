import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Book,
  Heart,
  CheckCircle,
  Users,
  FileText,
  MessageCircle,
  Calendar,
  Mic,
  UserPlus,
  ClipboardList,
  MapPin,
  Globe,
  GraduationCap,
  AlertCircle,
} from 'lucide-react';
import { useMockAuth } from '@/hooks/useAuth';
import { COMMUNITY_BOARDS } from '@/lib/constants';
import EmotionalSupportModal from '@/components/EmotionalSupportModal';
import LectureAnalysisModal from '@/components/LectureAnalysisModal';
import type { UserStats, QuickAction } from '@/types';

const Dashboard = () => {
  const { user } = useMockAuth();
  const [isEmotionalModalOpen, setIsEmotionalModalOpen] = useState(false);
  const [isLectureModalOpen, setIsLectureModalOpen] = useState(false);

  // Mock user stats
  const userStats: UserStats = {
    todayLearning: 12,
    emotionScore: 4.2,
    completedTasks: 8,
    communityParticipation: 23,
  };

  const quickActions: QuickAction[] = [
    {
      id: '1',
      title: '발음 연습하기',
      icon: 'fas fa-microphone',
      color: 'text-blue-500',
      onClick: () => console.log('발음 연습'),
    },
    {
      id: '2',
      title: '학습 일정 추가',
      icon: 'fas fa-calendar-plus',
      color: 'text-green-500',
      onClick: () => console.log('학습 일정'),
    },
    {
      id: '3',
      title: '멘토 찾기',
      icon: 'fas fa-user-friends',
      color: 'text-purple-500',
      onClick: () => console.log('멘토 찾기'),
    },
    {
      id: '4',
      title: '체크리스트 확인',
      icon: 'fas fa-clipboard-list',
      color: 'text-orange-500',
      onClick: () => console.log('체크리스트'),
    },
  ];

  const recentActivities = [
    {
      id: '1',
      title: '마케팅 강의 분석 완료',
      time: '30분 전',
      color: 'bg-blue-500',
    },
    {
      id: '2',
      title: '감정 상담 세션 참여',
      time: '2시간 전',
      color: 'bg-green-500',
    },
    {
      id: '3',
      title: '교수님께 이메일 발송',
      time: '어제',
      color: 'bg-orange-500',
    },
    {
      id: '4',
      title: '커뮤니티 게시글 작성',
      time: '2일 전',
      color: 'bg-purple-500',
    },
  ];

  const cnuServices = [
    {
      name: 'TOPIK 센터',
      icon: GraduationCap,
      status: 'connected',
      color: 'text-blue-500',
    },
    {
      name: '학생상담센터',
      icon: Heart,
      status: 'connected',
      color: 'text-red-500',
    },
    {
      name: '국제교류본부',
      icon: Globe,
      status: 'connected',
      color: 'text-blue-500',
    },
  ];

  const mainFeatures = [
    {
      id: 'lecture',
      title: 'AI 강의 리포맷터',
      description: '강의 자료를 당신의 한국어 수준에 맞게 요약하고 해설해드려요. PPT, 노트, 녹음 파일을 업로드하면 맞춤형 학습 자료를 제공합니다.',
      icon: FileText,
      color: 'bg-blue-100',
      iconColor: 'text-blue-600',
      buttonText: '강의 업로드',
      buttonColor: 'bg-blue-500 hover:bg-blue-600',
      lastUsed: '최근 사용: 2시간 전',
      onClick: () => setIsLectureModalOpen(true),
    },
    {
      id: 'emotional',
      title: '마음의 통역사',
      description: '당신의 감정을 이해하고 문화적 배경을 고려한 개인화된 심리 지원을 제공합니다. 힘든 순간에 언제든 대화할 수 있어요.',
      icon: Heart,
      color: 'bg-green-100',
      iconColor: 'text-green-600',
      buttonText: '상담 시작',
      buttonColor: 'bg-green-500 hover:bg-green-600',
      status: '지금 기분이 좋아 보여요!',
      statusColor: 'text-green-600',
      onClick: () => setIsEmotionalModalOpen(true),
    },
    {
      id: 'communication',
      title: '교수 소통 헬퍼',
      description: '한국 문화에 맞는 예의 바른 소통을 도와드려요. 이메일 작성, 질문 방법, 발표 스크립트까지 완벽하게 준비하세요.',
      icon: MessageCircle,
      color: 'bg-orange-100',
      iconColor: 'text-orange-600',
      buttonText: '이메일 작성',
      buttonColor: 'bg-orange-500 hover:bg-orange-600',
      usage: '이번 주 사용: 5회',
      onClick: () => console.log('Communication helper'),
    },
    {
      id: 'info',
      title: '유학생활 정보 허브',
      description: '비자 연장, 건강보험, 은행 계좌 개설 등 필수 행정업무와 생활 정보를 한 곳에서 확인하세요.',
      icon: AlertCircle,
      color: 'bg-purple-100',
      iconColor: 'text-purple-600',
      buttonText: '정보 확인',
      buttonColor: 'bg-purple-500 hover:bg-purple-600',
      progress: 78,
      onClick: () => console.log('Student life info'),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              안녕하세요, <span>{user?.profile?.preferredName}</span>님! 👋
            </h2>
            <p className="text-blue-100 mb-4">UniBuddy가 한국 유학생활을 응원합니다!</p>
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>한국 거주 <strong>{user?.profile?.koreaResidenceDuration}개월</strong></span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span>한국어 <strong>{user?.profile?.koreanLevel === 'intermediate' ? '중급' : user?.profile?.koreanLevel}</strong></span>
              </div>
              <div className="flex items-center space-x-2">
                <GraduationCap className="w-4 h-4" />
                <span>경영학과 <strong>{user?.profile?.year}학년</strong></span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
              alt="Happy international student"
              className="w-20 h-20 rounded-full border-4 border-white object-cover"
            />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">오늘의 학습</p>
                <p className="text-3xl font-bold text-gray-900">{userStats.todayLearning}</p>
                <p className="text-sm text-green-600">+3 from yesterday</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Book className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">감정 점수</p>
                <p className="text-3xl font-bold text-gray-900">{userStats.emotionScore}</p>
                <p className="text-sm text-blue-600">평균보다 좋음</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">완료된 과제</p>
                <p className="text-3xl font-bold text-gray-900">{userStats.completedTasks}</p>
                <p className="text-sm text-purple-600">이번 주</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">커뮤니티 참여</p>
                <p className="text-3xl font-bold text-gray-900">{userStats.communityParticipation}</p>
                <p className="text-sm text-orange-600">활발한 활동</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Features */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-semibold text-gray-900">주요 기능</h3>
          
          {mainFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
                      <p className="text-gray-600 mb-4">{feature.description}</p>
                      <div className="flex items-center space-x-4">
                        <Button 
                          onClick={feature.onClick}
                          className={`${feature.buttonColor} text-white font-medium transition-colors`}
                        >
                          {feature.buttonText}
                        </Button>
                        {feature.lastUsed && (
                          <span className="text-sm text-gray-500">{feature.lastUsed}</span>
                        )}
                        {feature.status && (
                          <div className="flex items-center space-x-1">
                            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                            <span className={`text-sm ${feature.statusColor}`}>{feature.status}</span>
                          </div>
                        )}
                        {feature.usage && (
                          <span className="text-sm text-gray-500">{feature.usage}</span>
                        )}
                        {feature.progress && (
                          <span className="text-sm text-purple-600">진행률: {feature.progress}%</span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">빠른 활동</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action) => (
                <Button
                  key={action.id}
                  variant="outline"
                  onClick={action.onClick}
                  className="w-full text-left p-3 border border-gray-200 hover:bg-gray-50 transition-colors justify-start"
                >
                  <div className="flex items-center space-x-3">
                    <i className={`${action.icon} ${action.color}`}></i>
                    <span className="font-medium">{action.title}</span>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">최근 활동</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 ${activity.color} rounded-full mt-2`}></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-center text-sm text-blue-600 font-medium hover:text-blue-700">
                모든 활동 보기
              </Button>
            </CardContent>
          </Card>

          {/* CNU Services Integration */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">CNU 서비스 연결</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {cnuServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-4 h-4 ${service.color}`} />
                      <span className="text-sm font-medium">{service.name}</span>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      연결됨
                    </Badge>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Community Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">UniBuddy 커뮤니티</h3>
          <Button variant="ghost" className="text-blue-600 font-medium hover:text-blue-700">
            전체 보기
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMMUNITY_BOARDS.slice(0, 3).map((board) => (
            <Card key={board.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-10 h-10 bg-${board.color}-100 rounded-lg flex items-center justify-center`}>
                    <i className={`${board.icon} text-${board.color}-600`}></i>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">{board.name}</h4>
                </div>
                <p className="text-gray-600 mb-4">{board.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>새 글 {board.postCount}개</span>
                  {board.id === 'study_help' && <span>🇻🇳🇰🇷🇨🇳 다국어 지원</span>}
                  {board.id === 'life_info' && <span>📍 대전/충남 특화</span>}
                  {board.id === 'healing' && <span>💚 익명 가능</span>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Modals */}
      <EmotionalSupportModal
        isOpen={isEmotionalModalOpen}
        onClose={() => setIsEmotionalModalOpen(false)}
      />
      
      <LectureAnalysisModal
        isOpen={isLectureModalOpen}
        onClose={() => setIsLectureModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;

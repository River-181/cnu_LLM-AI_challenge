import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { 
  BookOpen, 
  Heart, 
  MessageSquare, 
  Brain,
  Users,
  Globe,
  Clock,
  Star
} from 'lucide-react';

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">UniBuddy</h1>
              <p className="text-sm text-gray-500">충남대학교 (CNU) AI 학습 동반자</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">안녕하세요!</p>
              <p className="text-xs text-gray-500">오늘도 함께 학습해보세요</p>
            </div>
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium">U</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            학습과 정서적 지원을 위한 AI 동반자
          </h2>
          <p className="text-gray-600">
            UniBuddy와 함께 더 효과적이고 즐거운 유학 생활을 만들어보세요
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          
          {/* AI 강의 리포맷터 */}
          <Link href="/lecture-reformatter">
            <Card className="h-full cursor-pointer transition-all hover:shadow-xl hover:scale-105 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl text-blue-900">AI 강의 리포맷터</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-800 mb-4">
                  PPT, PDF, 음성 파일을 업로드하면 AI가 자동으로 요약 노트, 용어 사전, 퀴즈를 생성합니다
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-blue-700">
                    <Brain className="w-4 h-4 mr-2" />
                    <span>맞춤형 학습 자료 생성</span>
                  </div>
                  <div className="flex items-center text-sm text-blue-700">
                    <Globe className="w-4 h-4 mr-2" />
                    <span>다국어 동시 지원</span>
                  </div>
                  <div className="flex items-center text-sm text-blue-700">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>시간표 연동 스케줄링</span>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                  강의 리포맷터 사용하기
                </Button>
              </CardContent>
            </Card>
          </Link>

          {/* 마음의 통역사 */}
          <Link href="/emotional-translator">
            <Card className="h-full cursor-pointer transition-all hover:shadow-xl hover:scale-105 bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
              <CardHeader>
                <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl text-pink-900">마음의 통역사</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-pink-800 mb-4">
                  감정 분석 기반 공감 대화로 유학 생활의 정서적 어려움을 함께 나눠보세요
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-pink-700">
                    <Brain className="w-4 h-4 mr-2" />
                    <span>실시간 감정 분석</span>
                  </div>
                  <div className="flex items-center text-sm text-pink-700">
                    <Users className="w-4 h-4 mr-2" />
                    <span>커뮤니티 연결 지원</span>
                  </div>
                  <div className="flex items-center text-sm text-pink-700">
                    <Heart className="w-4 h-4 mr-2" />
                    <span>문화적 맥락 공감</span>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-pink-600 hover:bg-pink-700">
                  마음의 통역사와 대화하기
                </Button>
              </CardContent>
            </Card>
          </Link>

          {/* 교수 소통 헬퍼 */}
          <Link href="/communication-helper">
            <Card className="h-full cursor-pointer transition-all hover:shadow-xl hover:scale-105 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardHeader>
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl text-green-900">교수 소통 헬퍼</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-800 mb-4">
                  한국 학술 문화에 맞는 이메일, 질문, 발표 스크립트를 AI가 도와드립니다
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-green-700">
                    <Globe className="w-4 h-4 mr-2" />
                    <span>문화 맥락 번역</span>
                  </div>
                  <div className="flex items-center text-sm text-green-700">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    <span>존댓말 자동 변환</span>
                  </div>
                  <div className="flex items-center text-sm text-green-700">
                    <Star className="w-4 h-4 mr-2" />
                    <span>발표 매너 가이드</span>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                  교수 소통 헬퍼 사용하기
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">120+</div>
              <div className="text-sm text-gray-600">처리된 강의</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-pink-600">85%</div>
              <div className="text-sm text-gray-600">학습 만족도</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">16개</div>
              <div className="text-sm text-gray-600">지원 언어</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">24/7</div>
              <div className="text-sm text-gray-600">AI 지원</div>
            </CardContent>
          </Card>
        </div>

        {/* CNU Integration Notice */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-blue-900 mb-2">충남대학교 공식 연계 서비스</h3>
                <p className="text-blue-800 mb-3">
                  UniBuddy는 국제교류본부, 학생상담센터, 교수학습지원센터와 연계되어 
                  포괄적인 유학생 지원을 제공합니다.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    국제교류본부 연계
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    학생상담센터 연계
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    교수학습지원센터 연계
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

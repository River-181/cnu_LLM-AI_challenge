import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Heart, MessageSquare, Book, Users, AlertTriangle, Info, GraduationCap } from 'lucide-react';
import { Link } from 'wouter';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <GraduationCap className="text-blue-600 w-5 h-5" />
            </div>
            <span className="font-semibold">UniBuddy</span>
            <span className="text-sm opacity-90">Chungnam National University</span>
          </div>
          <div className="flex items-center space-x-4">
            <select className="bg-blue-700 text-white rounded px-2 py-1 text-sm">
              <option>한국어</option>
              <option>English</option>
              <option>Tiếng Việt</option>
            </select>
            <div className="flex items-center space-x-2">
              <span className="text-sm">응옥짠님</span>
              <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            안녕하세요, 응옥짠님! 👋
          </h1>
          <p className="text-gray-600">
            UniBuddy와 함께 즐겁고 성공적인 유학 생활을 시작해보세요.
          </p>
          <div className="flex space-x-6 mt-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">12</div>
              <div className="text-sm text-gray-500">학습한 강의</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">4.2</div>
              <div className="text-sm text-gray-500">평균 점수</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">8</div>
              <div className="text-sm text-gray-500">완료한 퀴즈</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex space-x-4 mb-6">
            <Button variant="outline" className="flex-1">
              <FileText className="w-4 h-4 mr-2" />
              AI 강의 업로드
            </Button>
            <Link href="/emotional-translator">
              <Button variant="outline" className="flex-1">
                <Heart className="w-4 h-4 mr-2" />
                마음 상담
              </Button>
            </Link>
            <Link href="/communication-helper">
              <Button variant="outline" className="flex-1">
                <MessageSquare className="w-4 h-4 mr-2" />
                교수님 이메일
              </Button>
            </Link>
            <Link href="/student-life">
              <Button variant="outline" className="flex-1">
                <Info className="w-4 h-4 mr-2" />
                유학생활 정보
              </Button>
            </Link>
            <Link href="/community">
              <Button variant="outline" className="flex-1">
                <Users className="w-4 h-4 mr-2" />
                커뮤니티
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Features */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">주요 기능</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* AI 강의 리포맷터 */}
                <Card className="border-blue-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <FileText className="w-8 h-8 text-blue-600" />
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        시작하기
                      </Button>
                    </div>
                    <h3 className="font-semibold mb-2">AI 강의 리포맷터</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      강의 자료를 업로드하면 요약과 함께 
                      퀴즈를 자동 생성해드립니다.
                    </p>
                    <div className="text-xs text-blue-600">
                      이용 가능한 파일: PPT, PDF, MP3
                    </div>
                  </CardContent>
                </Card>

                {/* 마음의 통역사 */}
                <Link href="/emotional-translator">
                  <Card className="border-green-200 hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <Heart className="w-8 h-8 text-green-600" />
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          대화하기
                        </Button>
                      </div>
                      <h3 className="font-semibold mb-2">마음의 통역사</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        감정을 분석하고 공감하는 대화를 
                        통해 심리적 지원을 제공합니다.
                      </p>
                      <div className="text-xs text-green-600">
                        24시간 언제든지 이용 가능
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                {/* 교수 소통 헬퍼 */}
                <Link href="/communication-helper">
                  <Card className="border-orange-200 hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <MessageSquare className="w-8 h-8 text-orange-600" />
                        <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                          작성하기
                        </Button>
                      </div>
                      <h3 className="font-semibold mb-2">교수 소통 헬퍼</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        한국 문화에 맞는 정중하고 
                        적절한 이메일을 작성해드립니다.
                      </p>
                      <div className="text-xs text-orange-600">
                        이메일, 발표, 질문 템플릿 제공
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                {/* 유학생활 정보 */}
                <Link href="/student-life">
                  <Card className="border-purple-200 hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <Info className="w-8 h-8 text-purple-600" />
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                          정보보기
                        </Button>
                      </div>
                      <h3 className="font-semibold mb-2">유학생활 정보</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        행정, 생활, 법령 관련 
                        유학생활 필수 정보를 제공합니다.
                      </p>
                      <div className="text-xs text-purple-600">
                        비자, 보험, 생활정보 등
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">최근 활동</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">데이터베이스 PPT 업로드 완료</div>
                    <div className="text-xs text-gray-500">2시간 전</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">감정 분석 세션 완료</div>
                    <div className="text-xs text-gray-500">4시간 전</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">교수님께 이메일 전송 완료</div>
                    <div className="text-xs text-gray-500">1일 전</div>
                  </div>
                </div>
                <Button variant="ghost" className="w-full text-sm text-blue-600">
                  활동 더보기
                </Button>
              </CardContent>
            </Card>

            {/* CNU Services */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">CNU 서비스 연결</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-green-600" />
                    <span className="text-sm">국제교류본부</span>
                  </div>
                  <span className="text-xs text-green-600">연결됨</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-green-600" />
                    <span className="text-sm">학생상담센터</span>
                  </div>
                  <span className="text-xs text-green-600">연결됨</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm">LMS 연동</span>
                  </div>
                  <span className="text-xs text-yellow-600">대기중</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
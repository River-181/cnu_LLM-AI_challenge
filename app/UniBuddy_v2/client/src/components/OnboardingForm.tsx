import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GraduationCap, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';

const OnboardingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    nationality: '',
    nativeLanguage: '',
    preferredLanguage: 'ko',
    koreanLevel: '',
    department: '',
    year: '',
    residencePeriod: '',
    previousCountries: '',
    culturalBackground: '',
    learningGoals: '',
    communicationStyle: '',
    interests: '',
    socialPreferences: ''
  });

  const totalSteps = 4;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // TODO: Submit to backend
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">기본 정보 입력</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                이름 (Name)
              </label>
              <Input
                placeholder="Nguyễn Thị Hương"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                국적 (Nationality)
              </label>
              <Select value={formData.nationality} onValueChange={(value) => setFormData({...formData, nationality: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="국적을 선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vietnam">베트남 (Vietnam)</SelectItem>
                  <SelectItem value="china">중국 (China)</SelectItem>
                  <SelectItem value="japan">일본 (Japan)</SelectItem>
                  <SelectItem value="mongolia">몽골 (Mongolia)</SelectItem>
                  <SelectItem value="thailand">태국 (Thailand)</SelectItem>
                  <SelectItem value="philippines">필리핀 (Philippines)</SelectItem>
                  <SelectItem value="indonesia">인도네시아 (Indonesia)</SelectItem>
                  <SelectItem value="malaysia">말레이시아 (Malaysia)</SelectItem>
                  <SelectItem value="india">인도 (India)</SelectItem>
                  <SelectItem value="bangladesh">방글라데시 (Bangladesh)</SelectItem>
                  <SelectItem value="nepal">네팔 (Nepal)</SelectItem>
                  <SelectItem value="pakistan">파키스탄 (Pakistan)</SelectItem>
                  <SelectItem value="uzbekistan">우즈베키스탄 (Uzbekistan)</SelectItem>
                  <SelectItem value="other">기타 (Other)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                모국어 (Native Language)
              </label>
              <Select value={formData.nativeLanguage} onValueChange={(value) => setFormData({...formData, nativeLanguage: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="모국어를 선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vietnamese">Tiếng Việt (베트남어)</SelectItem>
                  <SelectItem value="chinese">中文 (중국어)</SelectItem>
                  <SelectItem value="japanese">日本語 (일본어)</SelectItem>
                  <SelectItem value="mongolian">Монгол хэл (몽골어)</SelectItem>
                  <SelectItem value="thai">ภาษาไทย (태국어)</SelectItem>
                  <SelectItem value="filipino">Filipino (필리핀어)</SelectItem>
                  <SelectItem value="indonesian">Bahasa Indonesia (인도네시아어)</SelectItem>
                  <SelectItem value="malay">Bahasa Melayu (말레이어)</SelectItem>
                  <SelectItem value="hindi">हिन्दी (힌디어)</SelectItem>
                  <SelectItem value="bengali">বাংলা (벵골어)</SelectItem>
                  <SelectItem value="nepali">नेपाली (네팔어)</SelectItem>
                  <SelectItem value="urdu">اردو (우르두어)</SelectItem>
                  <SelectItem value="uzbek">O'zbek tili (우즈베크어)</SelectItem>
                  <SelectItem value="english">English (영어)</SelectItem>
                  <SelectItem value="other">기타 (Other)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                선호 언어 (Preferred Language for App)
              </label>
              <Select value={formData.preferredLanguage} onValueChange={(value) => setFormData({...formData, preferredLanguage: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ko">한국어 - KO</SelectItem>
                  <SelectItem value="en">English - EN</SelectItem>
                  <SelectItem value="zh">中文 - ZH</SelectItem>
                  <SelectItem value="ja">日本語 - JA</SelectItem>
                  <SelectItem value="vi">Tiếng Việt - VI</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">학업 정보</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                한국어 수준 (Korean Proficiency Level)
              </label>
              <Select value={formData.koreanLevel} onValueChange={(value) => setFormData({...formData, koreanLevel: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="한국어 수준을 선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">초급 (Beginner - TOPIK 1-2급)</SelectItem>
                  <SelectItem value="intermediate">중급 (Intermediate - TOPIK 3-4급)</SelectItem>
                  <SelectItem value="advanced">고급 (Advanced - TOPIK 5-6급)</SelectItem>
                  <SelectItem value="native">원어민 수준 (Native level)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                학과 (Department)
              </label>
              <Select value={formData.department} onValueChange={(value) => setFormData({...formData, department: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="학과를 선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="computer-science">컴퓨터공학과</SelectItem>
                  <SelectItem value="electrical-engineering">전자전기공학과</SelectItem>
                  <SelectItem value="mechanical-engineering">기계공학과</SelectItem>
                  <SelectItem value="business">경영학과</SelectItem>
                  <SelectItem value="economics">경제학과</SelectItem>
                  <SelectItem value="korean-language">국어국문학과</SelectItem>
                  <SelectItem value="english-language">영어영문학과</SelectItem>
                  <SelectItem value="mathematics">수학과</SelectItem>
                  <SelectItem value="chemistry">화학과</SelectItem>
                  <SelectItem value="biology">생물학과</SelectItem>
                  <SelectItem value="psychology">심리학과</SelectItem>
                  <SelectItem value="sociology">사회학과</SelectItem>
                  <SelectItem value="political-science">정치외교학과</SelectItem>
                  <SelectItem value="architecture">건축학과</SelectItem>
                  <SelectItem value="medicine">의학과</SelectItem>
                  <SelectItem value="pharmacy">약학과</SelectItem>
                  <SelectItem value="agriculture">농업생명과학과</SelectItem>
                  <SelectItem value="other">기타</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                학년 (Academic Year)
              </label>
              <Select value={formData.year} onValueChange={(value) => setFormData({...formData, year: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="학년을 선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1학년 (Freshman)</SelectItem>
                  <SelectItem value="2">2학년 (Sophomore)</SelectItem>
                  <SelectItem value="3">3학년 (Junior)</SelectItem>
                  <SelectItem value="4">4학년 (Senior)</SelectItem>
                  <SelectItem value="graduate">대학원생 (Graduate)</SelectItem>
                  <SelectItem value="exchange">교환학생 (Exchange)</SelectItem>
                  <SelectItem value="language">어학연수생 (Language Program)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                한국 거주 기간 (Residence Period in Korea)
              </label>
              <Select value={formData.residencePeriod} onValueChange={(value) => setFormData({...formData, residencePeriod: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="거주 기간을 선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="less-than-6months">6개월 미만 (Less than 6 months)</SelectItem>
                  <SelectItem value="6months-1year">6개월-1년 (6 months - 1 year)</SelectItem>
                  <SelectItem value="1-2years">1-2년 (1-2 years)</SelectItem>
                  <SelectItem value="2-3years">2-3년 (2-3 years)</SelectItem>
                  <SelectItem value="3-4years">3-4년 (3-4 years)</SelectItem>
                  <SelectItem value="more-than-4years">4년 이상 (More than 4 years)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">문화적 배경</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                이전 거주 국가 경험 (Previous International Experience)
              </label>
              <Input
                placeholder="예: 미국 1년, 일본 6개월 (선택사항)"
                value={formData.previousCountries}
                onChange={(e) => setFormData({...formData, previousCountries: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                문화적 배경 정보 (Cultural Background)
              </label>
              <Select value={formData.culturalBackground} onValueChange={(value) => setFormData({...formData, culturalBackground: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="문화적 배경을 선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="urban">도시 출신 (Urban background)</SelectItem>
                  <SelectItem value="rural">시골 출신 (Rural background)</SelectItem>
                  <SelectItem value="mixed">도시/시골 혼합 (Mixed urban/rural)</SelectItem>
                  <SelectItem value="international">국제적 환경 (International background)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                의사소통 스타일 선호도 (Communication Style Preference)
              </label>
              <Select value={formData.communicationStyle} onValueChange={(value) => setFormData({...formData, communicationStyle: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="의사소통 스타일을 선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="direct">직접적 (Direct)</SelectItem>
                  <SelectItem value="indirect">간접적 (Indirect)</SelectItem>
                  <SelectItem value="formal">격식적 (Formal)</SelectItem>
                  <SelectItem value="informal">비격식적 (Informal)</SelectItem>
                  <SelectItem value="mixed">상황에 따라 (Context-dependent)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                관심사 및 취미 (Interests & Hobbies)
              </label>
              <Input
                placeholder="예: 축구, 요리, K-pop, 독서, 게임, 여행"
                value={formData.interests}
                onChange={(e) => setFormData({...formData, interests: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                사회적 선호도 (Social Preferences)
              </label>
              <Select value={formData.socialPreferences} onValueChange={(value) => setFormData({...formData, socialPreferences: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="사회적 선호도를 선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="extrovert">외향적 (Extroverted)</SelectItem>
                  <SelectItem value="introvert">내향적 (Introverted)</SelectItem>
                  <SelectItem value="ambivert">상황에 따라 (Ambivert)</SelectItem>
                  <SelectItem value="group-oriented">그룹 활동 선호 (Group-oriented)</SelectItem>
                  <SelectItem value="individual-oriented">개인 활동 선호 (Individual-oriented)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">학습 목표 및 최종 확인</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                UniBuddy를 통한 학습 목표 (Learning Goals with UniBuddy)
              </label>
              <Select value={formData.learningGoals} onValueChange={(value) => setFormData({...formData, learningGoals: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="주요 학습 목표를 선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="academic-support">학업 지원 (Academic support)</SelectItem>
                  <SelectItem value="korean-improvement">한국어 실력 향상 (Korean language improvement)</SelectItem>
                  <SelectItem value="cultural-adaptation">문화 적응 (Cultural adaptation)</SelectItem>
                  <SelectItem value="social-connection">사회적 관계 형성 (Social connections)</SelectItem>
                  <SelectItem value="emotional-support">정서적 지원 (Emotional support)</SelectItem>
                  <SelectItem value="communication-skills">의사소통 기술 (Communication skills)</SelectItem>
                  <SelectItem value="overall-integration">전반적 적응 (Overall integration)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Summary */}
            <div className="bg-blue-50 rounded-lg p-4 mt-6">
              <h4 className="font-semibold text-blue-800 mb-3">입력 정보 요약</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><strong>이름:</strong> {formData.name}</div>
                <div><strong>국적:</strong> {formData.nationality}</div>
                <div><strong>모국어:</strong> {formData.nativeLanguage}</div>
                <div><strong>한국어 수준:</strong> {formData.koreanLevel}</div>
                <div><strong>학과:</strong> {formData.department}</div>
                <div><strong>학년:</strong> {formData.year}</div>
                <div><strong>거주 기간:</strong> {formData.residencePeriod}</div>
                <div><strong>학습 목표:</strong> {formData.learningGoals}</div>
              </div>
            </div>

            {/* CNU Services Connection */}
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-green-800 mb-1">
                    충남대학교 서비스 연동 완료
                  </h4>
                  <p className="text-xs text-green-700">
                    국제교류본부, 학생상담센터, 교수학습지원센터와 연동하여 
                    종합적인 학습 및 생활 지원을 제공합니다.
                  </p>
                  <ul className="text-xs text-green-600 mt-2 space-y-1">
                    <li>• TOPIK 센터 연계 한국어 진단</li>
                    <li>• 학생상담센터 상담 예약 지원</li>
                    <li>• LMS 강의 자료 연동</li>
                    <li>• 대전시 글로벌 캠퍼스 사업 연계</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            Welcome to UniBuddy
          </CardTitle>
          <p className="text-gray-600">Chungnam National University</p>
          <p className="text-sm text-gray-500 mt-2">
            AI 기반 유학생 종합 지원 플랫폼
          </p>
          
          {/* Progress Bar */}
          <div className="flex items-center space-x-2 mt-6">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`w-12 h-1 ${step < currentStep ? 'bg-blue-600' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-sm text-gray-600 mt-2">
            {currentStep}/4 단계: {currentStep === 1 ? '기본 정보' : currentStep === 2 ? '학업 정보' : currentStep === 3 ? '문화적 배경' : '최종 확인'}
          </div>
        </CardHeader>

        <CardContent className="p-8">
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button 
              variant="outline" 
              onClick={handlePrev}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              이전
            </Button>
            
            {currentStep < totalSteps ? (
              <Button 
                onClick={handleNext}
                className="bg-blue-600 hover:bg-blue-700"
              >
                다음
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700"
              >
                UniBuddy 시작하기
                <CheckCircle className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingForm;
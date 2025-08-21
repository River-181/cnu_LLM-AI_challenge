import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ExternalLink, Search, FileText, CreditCard, Home, Phone, Shield, Briefcase, Heart, MapPin, Clock, AlertCircle } from 'lucide-react';
import { Link } from 'wouter';

const StudentLifeInfo = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: '전체', icon: FileText },
    { id: 'visa', name: '비자/체류', icon: Shield },
    { id: 'housing', name: '주거/생활', icon: Home },
    { id: 'finance', name: '금융/보험', icon: CreditCard },
    { id: 'health', name: '의료/건강', icon: Heart },
    { id: 'work', name: '아르바이트', icon: Briefcase },
    { id: 'emergency', name: '응급/긴급', icon: Phone }
  ];

  const adminInfo = [
    {
      category: 'visa',
      title: '외국인등록증 발급/연장',
      description: '체류기간 연장 및 외국인등록증 재발급 절차',
      organization: '출입국·외국인청',
      urgency: 'high',
      deadline: '체류기간 만료 4개월 전',
      documents: ['여권', '재학증명서', '재정증명서', '사진'],
      link: 'https://www.hikorea.go.kr',
      phone: '1345',
      address: '대전출입국·외국인사무소 (서구 대덕대로 176)',
      tips: [
        '체류기간 만료 4개월 전부터 신청 가능',
        '온라인 사전예약 필수 (HiKorea)',
        '신청 수수료 120,000원 (1년 연장 기준)'
      ]
    },
    {
      category: 'visa',
      title: '비자 변경 (D-2 → F-2-7 등)',
      description: '학업 완료 후 구직활동 또는 취업 비자 변경',
      organization: '출입국·외국인청',
      urgency: 'high',
      deadline: '졸업 후 6개월 이내',
      documents: ['학위증명서', '성적증명서', '구직활동계획서'],
      link: 'https://www.hikorea.go.kr',
      phone: '1345',
      tips: [
        'D-10 (구직) 비자: 졸업 후 최대 2년간 구직활동 가능',
        'F-2-7 (점수제): 한국어능력, 학력, 소득 등 종합 평가'
      ]
    },
    {
      category: 'housing',
      title: '기숙사 신청/퇴사',
      description: '충남대학교 기숙사 입사 및 퇴사 절차',
      organization: '충남대학교 학생생활관',
      urgency: 'medium',
      deadline: '학기별 신청 기간 확인',
      documents: ['재학증명서', '건강진단서', '보증금'],
      link: 'https://dorm.cnu.ac.kr',
      phone: '042-821-5065',
      address: '대전광역시 유성구 대학로 99',
      tips: [
        '국제학생 우선 배정 (신입생)',
        '보증금: 300,000원 (퇴사 시 반환)',
        '생활관비: 학기당 약 1,000,000원'
      ]
    },
    {
      category: 'housing',
      title: '전월세 계약 및 주의사항',
      description: '한국 부동산 계약 시 알아야 할 필수 정보',
      organization: '한국토지주택공사(LH)',
      urgency: 'medium',
      documents: ['외국인등록증', '재학증명서', '보증금'],
      link: 'https://www.lh.or.kr',
      phone: '1600-1004',
      tips: [
        '계약서 작성 전 부동산 중개사 자격 확인',
        '보증금은 반드시 확정일자 받기',
        '계약금은 10% 이하로 제한',
        '임대차보호법에 따른 권리 숙지'
      ]
    },
    {
      category: 'finance',
      title: '은행계좌 개설',
      description: '국내 은행 계좌 개설 및 금융서비스 이용',
      organization: '각 시중은행',
      urgency: 'high',
      deadline: '입국 후 빠른 시일 내',
      documents: ['외국인등록증', '재학증명서', '여권'],
      phone: '각 은행 고객센터',
      tips: [
        '외국인 전용 상품 확인 (수수료 면제 등)',
        '온라인뱅킹 및 모바일뱅킹 신청',
        '체크카드 발급 (해외사용 가능)',
        '주요 은행: 국민, 신한, 우리, 하나'
      ]
    },
    {
      category: 'finance',
      title: '국민건강보험 가입',
      description: '외국인 건강보험 의무가입 및 혜택',
      organization: '국민건강보험공단',
      urgency: 'high',
      deadline: '외국인등록 후 3개월 이내',
      documents: ['외국인등록증', '재학증명서'],
      link: 'https://www.nhis.or.kr',
      phone: '1577-1000',
      address: '대전지역본부 (서구 대덕대로 176)',
      tips: [
        '보험료: 월 약 120,000원 (지역가입자)',
        '의료비 본인부담률: 30~50%',
        '6개월 이상 체류 시 의무가입',
        '학교 단체가입 시 할인 혜택'
      ]
    },
    {
      category: 'health',
      title: '충남대학교병원 이용',
      description: '교내 병원 이용 및 의료서비스 안내',
      organization: '충남대학교병원',
      urgency: 'medium',
      documents: ['건강보험증', '학생증', '신분증'],
      link: 'https://www.cnuh.co.kr',
      phone: '042-280-7000',
      address: '대전광역시 중구 문화로 282',
      tips: [
        '학생 할인 혜택 (진료비 10% 할인)',
        '응급실 24시간 운영',
        '외국인 전담 직원 배치',
        '통역 서비스 제공 (영어, 중국어)'
      ]
    },
    {
      category: 'health',
      title: '정신건강 상담 서비스',
      description: '학생상담센터 및 정신건강 지원',
      organization: '충남대 학생상담센터',
      urgency: 'low',
      documents: ['학생증'],
      link: 'https://counsel.cnu.ac.kr',
      phone: '042-821-5080',
      address: '학생회관 3층',
      tips: [
        '개인상담: 주 1회, 50분',
        '집단상담 프로그램 운영',
        '위기상담 24시간 핫라인',
        '다국어 상담 가능 (영어, 중국어)'
      ]
    },
    {
      category: 'work',
      title: '시간제취업 허가 (아르바이트)',
      description: 'D-2 비자 소지자 아르바이트 허가 신청',
      organization: '출입국·외국인청',
      urgency: 'medium',
      deadline: '근무 시작 전',
      documents: ['여권', '외국인등록증', '재학증명서', '성적증명서'],
      link: 'https://www.hikorea.go.kr',
      phone: '1345',
      tips: [
        '주 20시간 이내 (방학 중 무제한)',
        '허가 수수료: 50,000원',
        '온라인 신청 가능 (HiKorea)',
        '성적 2.0/4.5 이상 유지 필요'
      ]
    },
    {
      category: 'work',
      title: '근로계약서 작성 및 권리',
      description: '아르바이트 시 알아야 할 근로자 권리',
      organization: '고용노동부',
      urgency: 'high',
      documents: ['근로계약서', '신분증'],
      link: 'https://www.moel.go.kr',
      phone: '1350',
      tips: [
        '최저임금: 시간당 9,620원 (2024년 기준)',
        '주휴수당: 주 15시간 이상 근무 시 지급',
        '4대보험 가입 권리 (일정 조건 충족 시)',
        '부당대우 시 고용노동부 신고'
      ]
    },
    {
      category: 'emergency',
      title: '응급상황 연락처',
      description: '응급 상황 시 즉시 연락할 수 있는 번호들',
      organization: '각 기관',
      urgency: 'critical',
      phone: '종합',
      tips: [
        '경찰: 112 (범죄신고, 사건사고)',
        '소방서: 119 (화재, 응급의료)',
        '국번없이 1339: 응급의료정보센터',
        '출입국: 1345 (비자, 체류 관련)',
        '다누리콜센터: 1577-1366 (다문화가족 상담)',
        '충남대 국제교류본부: 042-821-5012'
      ]
    }
  ];

  const usefulLinks = [
    {
      category: '정부기관',
      links: [
        { name: '하이코리아 (출입국·외국인청)', url: 'https://www.hikorea.go.kr', description: '비자, 체류 관련 모든 업무' },
        { name: '국민건강보험공단', url: 'https://www.nhis.or.kr', description: '건강보험 가입 및 조회' },
        { name: '고용노동부', url: 'https://www.moel.go.kr', description: '근로관계, 아르바이트 정보' },
        { name: '대전광역시청', url: 'https://www.daejeon.go.kr', description: '지역 행정서비스' }
      ]
    },
    {
      category: '생활정보',
      links: [
        { name: '다누리포털', url: 'https://www.danuri.go.kr', description: '다문화가족 종합정보' },
        { name: '외국인종합안내센터', url: 'https://www.1577-1366.kr', description: '생활상담 및 정보제공' },
        { name: '한국토지주택공사', url: 'https://www.lh.or.kr', description: '주거 관련 정보' },
        { name: '워킹홀리데이 인포센터', url: 'https://www.whic.kr', description: '워킹홀리데이 정보' }
      ]
    },
    {
      category: '학교 관련',
      links: [
        { name: '충남대 국제교류본부', url: 'https://oia.cnu.ac.kr', description: '유학생 지원 업무' },
        { name: '충남대 학생생활관', url: 'https://dorm.cnu.ac.kr', description: '기숙사 관련 업무' },
        { name: '충남대 학생상담센터', url: 'https://counsel.cnu.ac.kr', description: '심리상담 및 지원' },
        { name: '충남대병원', url: 'https://www.cnuh.co.kr', description: '의료서비스' }
      ]
    },
    {
      category: '앱 및 도구',
      links: [
        { name: '정부24', url: 'https://www.gov.kr', description: '정부민원 온라인 처리' },
        { name: '모바일 신분증', url: 'https://www.pass.go.kr', description: '디지털 신분증 서비스' },
        { name: '카카오맵', url: 'https://map.kakao.com', description: '한국 지도 및 교통정보' },
        { name: '배달의민족', url: 'https://www.baemin.com', description: '음식 배달 서비스' }
      ]
    }
  ];

  const filteredInfo = adminInfo.filter(info => 
    (selectedCategory === 'all' || info.category === selectedCategory) &&
    (searchQuery === '' || 
     info.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     info.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getUrgencyText = (urgency: string) => {
    switch (urgency) {
      case 'critical': return '긴급';
      case 'high': return '중요';
      case 'medium': return '보통';
      case 'low': return '참고';
      default: return '일반';
    }
  };

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
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-gray-800">유학생활 정보</h1>
                <p className="text-sm text-gray-500">Student Life Information</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">베트남 유학생 맞춤</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="정보 검색... (예: 비자, 보험, 아르바이트)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center space-x-2"
                size="sm"
              >
                <category.icon className="w-4 h-4" />
                <span>{category.name}</span>
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Information */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">행정·생활 필수 정보</h2>
              <div className="space-y-4">
                {filteredInfo.map((info, idx) => (
                  <Card key={idx} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-lg text-gray-800">{info.title}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(info.urgency)}`}>
                              {getUrgencyText(info.urgency)}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-3">{info.description}</p>
                          <div className="text-sm text-blue-600 font-medium mb-2">{info.organization}</div>
                        </div>
                      </div>

                      {info.deadline && (
                        <div className="flex items-center space-x-2 mb-3 text-sm">
                          <Clock className="w-4 h-4 text-orange-600" />
                          <span className="font-medium">마감/기한:</span>
                          <span className="text-orange-600">{info.deadline}</span>
                        </div>
                      )}

                      {info.documents && (
                        <div className="mb-3">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">필요 서류:</h4>
                          <div className="flex flex-wrap gap-1">
                            {info.documents.map((doc, docIdx) => (
                              <span key={docIdx} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                                {doc}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {info.phone && (
                          <div className="flex items-center space-x-2 text-sm">
                            <Phone className="w-4 h-4 text-green-600" />
                            <span className="font-medium">전화:</span>
                            <span className="text-green-600">{info.phone}</span>
                          </div>
                        )}
                        {info.address && (
                          <div className="flex items-center space-x-2 text-sm">
                            <MapPin className="w-4 h-4 text-gray-600" />
                            <span className="font-medium">주소:</span>
                            <span className="text-gray-600">{info.address}</span>
                          </div>
                        )}
                      </div>

                      {info.tips && (
                        <div className="bg-yellow-50 p-3 rounded-lg mb-4">
                          <h4 className="text-sm font-medium text-yellow-800 mb-2">📝 유용한 팁:</h4>
                          <ul className="space-y-1">
                            {info.tips.map((tip, tipIdx) => (
                              <li key={tipIdx} className="text-sm text-yellow-700 flex items-start space-x-2">
                                <span className="text-yellow-600 mt-1">•</span>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {info.link && (
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" asChild>
                            <a href={info.link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              공식 사이트 방문
                            </a>
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Emergency Contacts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
                  긴급 연락처
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-red-50 p-3 rounded-lg">
                  <div className="text-sm font-medium text-red-800 mb-2">응급상황</div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>경찰:</span>
                      <span className="font-bold text-red-600">112</span>
                    </div>
                    <div className="flex justify-between">
                      <span>소방서:</span>
                      <span className="font-bold text-red-600">119</span>
                    </div>
                    <div className="flex justify-between">
                      <span>응급의료:</span>
                      <span className="font-bold text-red-600">1339</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-sm font-medium text-blue-800 mb-2">유학생 지원</div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>출입국:</span>
                      <span className="font-bold text-blue-600">1345</span>
                    </div>
                    <div className="flex justify-between">
                      <span>다누리콜센터:</span>
                      <span className="font-bold text-blue-600">1577-1366</span>
                    </div>
                    <div className="flex justify-between">
                      <span>CNU 국제교류:</span>
                      <span className="font-bold text-blue-600">821-5012</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Useful Links */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">유용한 사이트</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {usefulLinks.map((category, idx) => (
                  <div key={idx}>
                    <h4 className="font-medium text-gray-800 mb-2 border-b pb-1">{category.category}</h4>
                    <div className="space-y-2">
                      {category.links.map((link, linkIdx) => (
                        <div key={linkIdx} className="bg-gray-50 p-2 rounded">
                          <div className="flex items-center justify-between mb-1">
                            <a 
                              href={link.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center"
                            >
                              {link.name}
                              <ExternalLink className="w-3 h-3 ml-1" />
                            </a>
                          </div>
                          <p className="text-xs text-gray-600">{link.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">생활 꿀팁</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-green-50 p-3 rounded-lg">
                  <h4 className="text-sm font-medium text-green-800 mb-2">💰 생활비 절약</h4>
                  <ul className="text-xs text-green-700 space-y-1">
                    <li>• 학식 이용 (3,000~4,000원)</li>
                    <li>• 대중교통 정기권 구매</li>
                    <li>• 학생할인 적극 활용</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="text-sm font-medium text-blue-800 mb-2">📱 필수 앱</h4>
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li>• 카카오톡 (소통)</li>
                    <li>• 카카오맵 (지도)</li>
                    <li>• 배달앱 (음식주문)</li>
                    <li>• 지하철 앱</li>
                  </ul>
                </div>

                <div className="bg-purple-50 p-3 rounded-lg">
                  <h4 className="text-sm font-medium text-purple-800 mb-2">🏥 의료 정보</h4>
                  <ul className="text-xs text-purple-700 space-y-1">
                    <li>• 약국: 평일 9시~18시</li>
                    <li>• 응급실 24시간 운영</li>
                    <li>• 건강보험 30% 본인부담</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLifeInfo;
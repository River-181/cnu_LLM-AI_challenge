import type { Language, CommunityBoard, OnboardingStep } from '@/types';

export const LANGUAGES: Language[] = [
  { code: 'vi', name: 'Vietnamese', flag: '🇻🇳', nativeName: 'Tiếng Việt' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷', nativeName: '한국어' },
  { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳', nativeName: '中文' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵', nativeName: '日本語' },
];

export const KOREAN_LEVELS = [
  { value: 'beginner', label: '초급 (Beginner)' },
  { value: 'intermediate', label: '중급 (Intermediate)' },
  { value: 'advanced', label: '고급 (Advanced)' },
];

export const TOPIK_LEVELS = [
  { value: '1', label: 'TOPIK 1급' },
  { value: '2', label: 'TOPIK 2급' },
  { value: '3', label: 'TOPIK 3급' },
  { value: '4', label: 'TOPIK 4급' },
  { value: '5', label: 'TOPIK 5급' },
  { value: '6', label: 'TOPIK 6급' },
  { value: 'none', label: '응시 경험 없음' },
];

export const DEPARTMENTS = [
  { value: 'business', label: '경영학과' },
  { value: 'economics', label: '경제학과' },
  { value: 'engineering', label: '공학과' },
  { value: 'computer_science', label: '컴퓨터공학과' },
  { value: 'korean_language', label: '국어국문학과' },
  { value: 'international_studies', label: '국제학부' },
  { value: 'other', label: '기타' },
];

export const LEARNING_GOALS = [
  { value: 'korean_improvement', label: '한국어 실력 향상' },
  { value: 'cultural_adaptation', label: '문화 적응' },
  { value: 'academic_success', label: '학업 성취' },
  { value: 'social_connections', label: '사회적 관계 형성' },
  { value: 'career_preparation', label: '진로 준비' },
  { value: 'emotional_support', label: '정서적 지원' },
];

export const DIFFICULTIES = [
  { value: 'language_barrier', label: '언어 장벽' },
  { value: 'cultural_differences', label: '문화적 차이' },
  { value: 'homesickness', label: '향수병' },
  { value: 'academic_pressure', label: '학업 스트레스' },
  { value: 'social_isolation', label: '사회적 고립' },
  { value: 'financial_stress', label: '경제적 부담' },
  { value: 'administrative_tasks', label: '행정 업무' },
];

export const LEARNING_STYLES = [
  { value: 'visual', label: '시각적 학습' },
  { value: 'auditory', label: '청각적 학습' },
  { value: 'kinesthetic', label: '체험적 학습' },
  { value: 'reading_writing', label: '읽기/쓰기 학습' },
];

export const COMMUNITY_BOARDS: CommunityBoard[] = [
  {
    id: 'study_help',
    name: '학습 도움',
    description: '과제나 공부에 대한 질문과 답변을 나누세요',
    icon: 'fas fa-book',
    postCount: 23,
    color: 'blue',
  },
  {
    id: 'life_info',
    name: '생활 정보',
    description: '대전 생활 꿀팁과 맛집 정보를 공유해요',
    icon: 'fas fa-map-marker-alt',
    postCount: 15,
    color: 'green',
  },
  {
    id: 'healing',
    name: '힐링 공간',
    description: '마음이 힘들 때 따뜻한 위로를 받을 수 있어요',
    icon: 'fas fa-heart',
    postCount: 8,
    color: 'purple',
  },
  {
    id: 'cultural_exchange',
    name: '문화 교류',
    description: '다양한 나라의 문화를 소개하고 배워요',
    icon: 'fas fa-globe',
    postCount: 12,
    color: 'orange',
  },
  {
    id: 'friend_search',
    name: '친구 찾기',
    description: '함께 공부하고 놀 친구들을 찾아보세요',
    icon: 'fas fa-user-friends',
    postCount: 18,
    color: 'pink',
  },
  {
    id: 'events',
    name: '행사/모임',
    description: '각종 행사와 모임 정보를 확인하세요',
    icon: 'fas fa-calendar-alt',
    postCount: 6,
    color: 'indigo',
  },
];

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 1,
    title: '기본 정보',
    description: '당신에 대해 알려주세요',
    fields: [
      {
        name: 'preferredName',
        type: 'text',
        label: '선호하는 이름',
        required: true,
        placeholder: '어떻게 불러드릴까요?',
      },
      {
        name: 'nationality',
        type: 'select',
        label: '국적',
        required: true,
        options: [
          { value: 'vietnam', label: '🇻🇳 베트남 (Vietnam)' },
          { value: 'china', label: '🇨🇳 중국 (China)' },
          { value: 'japan', label: '🇯🇵 일본 (Japan)' },
          { value: 'other', label: '기타' },
        ],
      },
      {
        name: 'nativeLanguage',
        type: 'select',
        label: '모국어',
        required: true,
        options: LANGUAGES.map(lang => ({ value: lang.code, label: `${lang.flag} ${lang.nativeName}` })),
      },
      {
        name: 'preferredLanguage',
        type: 'select',
        label: '선호 언어 (앱 사용)',
        required: true,
        options: LANGUAGES.map(lang => ({ value: lang.code, label: `${lang.flag} ${lang.name}` })),
      },
    ],
  },
  {
    id: 2,
    title: '학업 정보',
    description: '당신의 학업 현황을 알려주세요',
    fields: [
      {
        name: 'department',
        type: 'select',
        label: '전공/학과',
        required: true,
        options: DEPARTMENTS,
      },
      {
        name: 'year',
        type: 'select',
        label: '학년',
        required: true,
        options: [
          { value: '1', label: '1학년' },
          { value: '2', label: '2학년' },
          { value: '3', label: '3학년' },
          { value: '4', label: '4학년' },
          { value: 'graduate', label: '대학원생' },
        ],
      },
      {
        name: 'admissionYear',
        type: 'select',
        label: '입학년도',
        required: true,
        options: Array.from({ length: 10 }, (_, i) => {
          const year = new Date().getFullYear() - i;
          return { value: year.toString(), label: `${year}년` };
        }),
      },
    ],
  },
  {
    id: 3,
    title: '언어 능력',
    description: '한국어 실력을 평가해주세요',
    fields: [
      {
        name: 'koreanLevel',
        type: 'radio',
        label: '한국어 수준',
        required: true,
        options: KOREAN_LEVELS,
      },
      {
        name: 'topikLevel',
        type: 'select',
        label: 'TOPIK 등급',
        required: false,
        options: TOPIK_LEVELS,
      },
    ],
  },
  {
    id: 4,
    title: '문화적 배경',
    description: '한국 경험에 대해 알려주세요',
    fields: [
      {
        name: 'koreaResidenceDuration',
        type: 'select',
        label: '한국 거주 기간',
        required: true,
        options: [
          { value: '1', label: '1개월 미만' },
          { value: '3', label: '1-3개월' },
          { value: '6', label: '3-6개월' },
          { value: '12', label: '6개월-1년' },
          { value: '24', label: '1-2년' },
          { value: '36', label: '2년 이상' },
        ],
      },
      {
        name: 'previousKoreaExperience',
        type: 'radio',
        label: '이전 한국 방문 경험',
        required: true,
        options: [
          { value: 'true', label: '있음' },
          { value: 'false', label: '없음' },
        ],
      },
      {
        name: 'culturalUnderstanding',
        type: 'range',
        label: '한국 문화 이해도 (1-5)',
        required: true,
      },
    ],
  },
  {
    id: 5,
    title: '학습 목표',
    description: 'UniBuddy를 통해 달성하고 싶은 목표를 선택하세요',
    fields: [
      {
        name: 'learningGoals',
        type: 'multiselect',
        label: '주요 목표 (복수 선택 가능)',
        required: true,
        options: LEARNING_GOALS,
      },
      {
        name: 'difficulties',
        type: 'multiselect',
        label: '현재 어려움 (복수 선택 가능)',
        required: true,
        options: DIFFICULTIES,
      },
    ],
  },
  {
    id: 6,
    title: '개인 설정',
    description: '마지막으로 학습 스타일을 설정해주세요',
    fields: [
      {
        name: 'learningStyle',
        type: 'radio',
        label: '선호하는 학습 스타일',
        required: true,
        options: LEARNING_STYLES,
      },
    ],
  },
];

export const EMOTION_CATEGORIES = [
  { key: 'depression', label: '우울감', color: 'red' },
  { key: 'anxiety', label: '불안감', color: 'orange' },
  { key: 'stress', label: '스트레스', color: 'yellow' },
  { key: 'loneliness', label: '외로움', color: 'purple' },
  { key: 'hope', label: '희망', color: 'green' },
];

export const COMMUNICATION_TYPES = [
  { value: 'email', label: '이메일 작성', icon: 'fas fa-envelope' },
  { value: 'presentation', label: '발표 준비', icon: 'fas fa-presentation' },
  { value: 'question', label: '질문하기', icon: 'fas fa-question-circle' },
  { value: 'apology', label: '사과하기', icon: 'fas fa-heart' },
  { value: 'request', label: '부탁하기', icon: 'fas fa-hand-holding-heart' },
  { value: 'introduction', label: '자기소개', icon: 'fas fa-user' },
];

export const TARGET_AUDIENCES = [
  { value: 'professor', label: '교수님', formality: 'high' },
  { value: 'senior', label: '선배', formality: 'medium' },
  { value: 'peer', label: '동급생', formality: 'low' },
  { value: 'junior', label: '후배', formality: 'low' },
  { value: 'staff', label: '직원', formality: 'medium' },
  { value: 'international', label: '외국인 학생', formality: 'low' },
];

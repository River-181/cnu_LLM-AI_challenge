import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, MessageSquare, Heart, Users, Globe, BookOpen, Coffee, Calendar, Pin, Search, Plus, ThumbsUp, MessageCircle, Share, Flag, Star } from 'lucide-react';
import { Link } from 'wouter';

const Community = () => {
  const [selectedBoard, setSelectedBoard] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);

  const communityBoards = [
    { 
      id: 'all', 
      name: '전체글', 
      icon: Globe, 
      color: 'text-blue-600', 
      bgColor: 'bg-blue-50',
      description: '모든 게시판의 최신글' 
    },
    { 
      id: 'healing', 
      name: '힐링 게시판', 
      icon: Heart, 
      color: 'text-pink-600', 
      bgColor: 'bg-pink-50',
      description: '마음의 위로와 힐링이 필요할 때',
      memberCount: 234
    },
    { 
      id: 'study', 
      name: '학습 도움', 
      icon: BookOpen, 
      color: 'text-green-600', 
      bgColor: 'bg-green-50',
      description: '과제, 시험, 스터디 관련 질문과 도움',
      memberCount: 567
    },
    { 
      id: 'friendship', 
      name: '친구 찾기', 
      icon: Users, 
      color: 'text-blue-600', 
      bgColor: 'bg-blue-50',
      description: '새로운 친구들과 만남의 장',
      memberCount: 432
    },
    { 
      id: 'culture', 
      name: '문화교류', 
      icon: Globe, 
      color: 'text-purple-600', 
      bgColor: 'bg-purple-50',
      description: '각국 문화 소개 및 교류',
      memberCount: 298
    },
    { 
      id: 'cafe', 
      name: '자유 수다', 
      icon: Coffee, 
      color: 'text-orange-600', 
      bgColor: 'bg-orange-50',
      description: '일상 이야기와 자유로운 대화',
      memberCount: 723
    },
    { 
      id: 'events', 
      name: '행사/모임', 
      icon: Calendar, 
      color: 'text-indigo-600', 
      bgColor: 'bg-indigo-50',
      description: '각종 행사 및 모임 안내',
      memberCount: 189
    }
  ];

  const posts = [
    {
      id: 1,
      board: 'healing',
      title: '오늘 정말 힘든 하루였어요... 위로받고 싶어요 😢',
      content: '내일 발표가 있는데 한국어가 아직 서툴러서 너무 긴장돼요. 같은 경험 있으신 분들 조언 부탁드려요.',
      author: '응옥짠 (베트남)',
      authorLevel: '새내기',
      timeAgo: '2분 전',
      likes: 12,
      comments: 8,
      views: 45,
      tags: ['발표', '한국어', '긴장'],
      isHot: true,
      emotionSupport: true
    },
    {
      id: 2,
      board: 'study',
      title: '데이터베이스 과제 같이 하실 분 계세요?',
      content: 'SQL 쿼리 작성하는 부분에서 막혀서 스터디 그룹 만들고 싶어요. 컴공과 2학년 환영합니다!',
      author: '이민준 (한국)',
      authorLevel: '멘토',
      timeAgo: '15분 전',
      likes: 8,
      comments: 15,
      views: 89,
      tags: ['데이터베이스', 'SQL', '스터디', '컴공'],
      studyGroup: true
    },
    {
      id: 3,
      board: 'friendship',
      title: '[베트남 학생] 같이 한국 음식 먹으러 갈 친구 찾아요! 🍜',
      content: '한국에 온 지 3개월 됐는데 아직 혼자 밥 먹기가 어색해요. 같이 맛집 탐방하실 분 있으면 좋겠어요!',
      author: '팜반딕 (베트남)',
      authorLevel: '새내기',
      timeAgo: '1시간 전',
      likes: 23,
      comments: 31,
      views: 156,
      tags: ['맛집', '친구찾기', '베트남'],
      meetup: true
    },
    {
      id: 4,
      board: 'culture',
      title: '베트남 전통 음식 만들기 체험 이벤트 참가자 모집!',
      content: '다음 주 토요일에 베트남 전통 요리 체험 행사를 준비하고 있어요. 한국 친구들도 많이 와주세요!',
      author: '응우옌탄훙 (베트남)',
      authorLevel: '운영진',
      timeAgo: '3시간 전',
      likes: 67,
      comments: 42,
      views: 234,
      tags: ['베트남', '요리', '문화체험', '이벤트'],
      isEvent: true,
      isPinned: true
    },
    {
      id: 5,
      board: 'cafe',
      title: '오늘 날씨 너무 좋네요! 캠퍼스 벚꽃 구경하러 누구 오실래요?',
      content: '점심시간에 잠깐 산책하면서 벚꽃 구경하고 싶어요. 같이 가실 분 댓글 달아주세요~',
      author: '김수진 (한국)',
      authorLevel: '선배',
      timeAgo: '4시간 전',
      likes: 34,
      comments: 18,
      views: 127,
      tags: ['벚꽃', '산책', '캠퍼스'],
      isToday: true
    },
    {
      id: 6,
      board: 'study',
      title: '[교수님 질문] 영문학과 김교수님 수업 어떠신가요?',
      content: '다음 학기 수강신청 고민 중인데 김교수님 수업 들어보신 분 계신가요? 과제나 시험은 어떤지 궁금해요.',
      author: '왕메이링 (중국)',
      authorLevel: '3학년',
      timeAgo: '6시간 전',
      likes: 15,
      comments: 27,
      views: 203,
      tags: ['수강신청', '영문학과', '교수님'],
      isQuestion: true
    }
  ];

  const trendingTopics = [
    { tag: '한국어', count: 45, growth: '+12%' },
    { tag: '친구찾기', count: 38, growth: '+8%' },
    { tag: '아르바이트', count: 32, growth: '+15%' },
    { tag: '기숙사', count: 28, growth: '+5%' },
    { tag: '문화체험', count: 24, growth: '+20%' },
    { tag: '맛집', count: 22, growth: '+10%' },
    { tag: '스터디', count: 19, growth: '+6%' },
    { tag: '발표', count: 16, growth: '+25%' }
  ];

  const activeUsers = [
    { name: '응옥짠', country: '베트남', level: '새내기', posts: 12, likes: 89, status: 'online' },
    { name: '이민준', country: '한국', level: '멘토', posts: 34, likes: 245, status: 'online' },
    { name: '왕메이링', country: '중국', level: '3학년', posts: 28, likes: 156, status: 'online' },
    { name: '타나카 유키', country: '일본', level: '2학년', posts: 19, likes: 98, status: 'away' },
    { name: '김수진', country: '한국', level: '선배', posts: 45, likes: 321, status: 'online' }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesBoard = selectedBoard === 'all' || post.board === selectedBoard;
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesBoard && matchesSearch;
  });

  const getPostIcon = (post) => {
    if (post.isPinned) return <Pin className="w-4 h-4 text-red-500" />;
    if (post.isHot) return <Star className="w-4 h-4 text-yellow-500" />;
    if (post.studyGroup) return <BookOpen className="w-4 h-4 text-green-500" />;
    if (post.meetup) return <Users className="w-4 h-4 text-blue-500" />;
    if (post.isEvent) return <Calendar className="w-4 h-4 text-purple-500" />;
    return <MessageSquare className="w-4 h-4 text-gray-400" />;
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
              <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-gray-800">UniBuddy 커뮤니티</h1>
                <p className="text-sm text-gray-500">유학생과 국내학생이 함께하는 소통공간</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              onClick={() => setShowNewPost(true)}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              글쓰기
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="게시글 검색... (제목, 내용, 태그)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </div>

        {/* Board Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {communityBoards.map((board) => (
              <Button
                key={board.id}
                variant={selectedBoard === board.id ? "default" : "outline"}
                onClick={() => setSelectedBoard(board.id)}
                className={`flex items-center space-x-2 ${
                  selectedBoard === board.id ? '' : 'hover:bg-gray-50'
                }`}
              >
                <board.icon className="w-4 h-4" />
                <span>{board.name}</span>
                {board.memberCount && (
                  <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                    {board.memberCount}
                  </span>
                )}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Posts */}
          <div className="lg:col-span-3 space-y-4">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {getPostIcon(post)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-lg text-gray-800 hover:text-indigo-600 cursor-pointer">
                          {post.title}
                        </h3>
                        {post.isPinned && (
                          <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
                            공지
                          </span>
                        )}
                        {post.isHot && (
                          <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full text-xs font-medium">
                            HOT
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-600 mb-3 line-clamp-2">{post.content}</p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {post.tags.map((tag, idx) => (
                          <span 
                            key={idx} 
                            className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs hover:bg-indigo-100 hover:text-indigo-600 cursor-pointer"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      {/* Author and Meta */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium text-indigo-600">
                                {post.author.charAt(0)}
                              </span>
                            </div>
                            <span className="text-sm font-medium text-gray-700">{post.author}</span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              post.authorLevel === '멘토' ? 'bg-green-100 text-green-600' :
                              post.authorLevel === '운영진' ? 'bg-purple-100 text-purple-600' :
                              post.authorLevel === '선배' ? 'bg-blue-100 text-blue-600' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                              {post.authorLevel}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">{post.timeAgo}</span>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{post.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <MessageCircle className="w-4 h-4" />
                            <span>{post.comments}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <span>조회 {post.views}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Special Features */}
                      {post.emotionSupport && (
                        <div className="mt-3 bg-pink-50 border border-pink-200 rounded-lg p-3">
                          <div className="flex items-center space-x-2 text-sm text-pink-700">
                            <Heart className="w-4 h-4" />
                            <span>감정 지원 필요 - 마음의 통역사가 추천한 게시글입니다</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Active Users */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Users className="w-5 h-5 mr-2 text-green-600" />
                  현재 접속 중
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {activeUsers.map((user, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-indigo-600">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                        user.status === 'online' ? 'bg-green-400' : 'bg-yellow-400'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-800 truncate">
                        {user.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {user.country} · {user.level}
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="ghost" className="w-full text-sm">
                  더보기 ({activeUsers.length + 23}명 접속 중)
                </Button>
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-600" />
                  인기 태그
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {trendingTopics.map((topic, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">#{topic.tag}</span>
                      <span className="text-xs text-green-600">{topic.growth}</span>
                    </div>
                    <span className="text-xs text-gray-500">{topic.count}개</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Community Rules */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">커뮤니티 규칙</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2">
                  <div className="flex items-start space-x-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>서로 존중하며 예의를 지켜주세요</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>다양한 문화를 이해하고 포용해주세요</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>개인정보 공유를 주의해주세요</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>스팸이나 광고는 금지됩니다</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>학습과 성장을 돕는 내용을 권장합니다</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full text-sm">
                  전체 규칙 보기
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">바로가기</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/emotional-translator">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Heart className="w-4 h-4 mr-2 text-pink-600" />
                    마음의 통역사
                  </Button>
                </Link>
                <Link href="/communication-helper">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <MessageSquare className="w-4 h-4 mr-2 text-orange-600" />
                    교수 소통 헬퍼
                  </Button>
                </Link>
                <Link href="/student-life">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <BookOpen className="w-4 h-4 mr-2 text-purple-600" />
                    유학생활 정보
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* New Post Modal */}
      {showNewPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                새 글 작성
                <Button variant="ghost" size="sm" onClick={() => setShowNewPost(false)}>
                  ✕
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">게시판 선택</label>
                <select className="w-full border rounded-md px-3 py-2">
                  <option value="">게시판을 선택하세요</option>
                  {communityBoards.slice(1).map(board => (
                    <option key={board.id} value={board.id}>{board.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">제목</label>
                <Input placeholder="제목을 입력하세요" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">내용</label>
                <Textarea 
                  placeholder="내용을 입력하세요" 
                  className="min-h-[200px]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">태그</label>
                <Input placeholder="#태그를 입력하세요 (공백으로 구분)" />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowNewPost(false)}>
                  취소
                </Button>
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                  글 작성하기
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Community;
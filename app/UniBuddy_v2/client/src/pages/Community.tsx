import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowLeft,
  Users,
  Plus,
  Search,
  TrendingUp,
  MessageCircle,
  Heart,
  Eye,
  Pin,
  Globe,
  Clock,
  Star,
  ThumbsUp,
  Filter,
  BookOpen,
  MapPin,
  UserPlus,
  Calendar
} from 'lucide-react';
import { Link } from 'wouter';
import { COMMUNITY_BOARDS } from '@/lib/constants';

const Community = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedBoard, setSelectedBoard] = useState('all');

  // Mock community data
  const posts = [
    {
      id: '1',
      boardId: 'study_help',
      title: '마케팅 과제 도움 요청! 4P 전략 관련',
      content: '안녕하세요! 마케팅 수업 4P 전략 과제를 하고 있는데, 베트남 시장 사례를 찾기가 어려워서 도움을 요청드립니다...',
      author: {
        name: '응옥짠',
        avatar: '',
        nationality: '🇻🇳',
        year: '2학년',
        department: '경영학과'
      },
      language: 'ko',
      isAnonymous: false,
      likes: 12,
      comments: 5,
      views: 48,
      tags: ['마케팅', '과제도움', '4P전략'],
      createdAt: '2시간 전',
      isSticky: false,
      hasReward: false
    },
    {
      id: '2',
      boardId: 'life_info',
      title: '대전 베트남 음식점 추천해주세요!',
      content: '고향 음식이 너무 그리워요 ㅠㅠ 대전에서 맛있는 베트남 음식점 있으면 추천 부탁드려요!',
      author: {
        name: '민트',
        avatar: '',
        nationality: '🇻🇳',
        year: '1학년',
        department: '컴퓨터공학과'
      },
      language: 'ko',
      isAnonymous: false,
      likes: 25,
      comments: 18,
      views: 156,
      tags: ['맛집', '베트남음식', '대전'],
      createdAt: '5시간 전',
      isSticky: false,
      hasReward: false
    },
    {
      id: '3',
      boardId: 'healing',
      title: '오늘 한국어 발표가 너무 떨렸어요',
      content: '한국어로 발표하는 게 아직도 너무 어려워요. 떨리고 실수할까봐 걱정이 많았는데 그래도 무사히 끝났네요. 같은 경험 있으신 분들 어떻게 극복하셨나요?',
      author: {
        name: '익명',
        avatar: '',
        nationality: '🇨🇳',
        year: '익명',
        department: '익명'
      },
      language: 'ko',
      isAnonymous: true,
      likes: 43,
      comments: 12,
      views: 89,
      tags: ['발표', '한국어', '응원'],
      createdAt: '1일 전',
      isSticky: false,
      hasReward: false
    },
    {
      id: '4',
      boardId: 'cultural_exchange',
      title: 'Introducing Vietnamese Tet Holiday! 🇻🇳',
      content: 'Hello everyone! Tet is coming soon and I want to share about this important holiday in Vietnam...',
      author: {
        name: '리엔',
        avatar: '',
        nationality: '🇻🇳',
        year: '3학년',
        department: '국어국문학과'
      },
      language: 'en',
      isAnonymous: false,
      likes: 67,
      comments: 24,
      views: 203,
      tags: ['문화소개', 'Tet', '베트남'],
      createdAt: '2일 전',
      isSticky: true,
      hasReward: false
    },
    {
      id: '5',
      boardId: 'friend_search',
      title: '같이 한국어 공부할 스터디 메이트 구해요!',
      content: 'TOPIK 6급 목표로 공부하고 있어요. 주 2-3회 만나서 같이 공부할 분 있으시면 연락주세요!',
      author: {
        name: '타오',
        avatar: '',
        nationality: '🇨🇳',
        year: '2학년',
        department: '한국어학과'
      },
      language: 'ko',
      isAnonymous: false,
      likes: 18,
      comments: 8,
      views: 72,
      tags: ['스터디', 'TOPIK', '한국어'],
      createdAt: '3일 전',
      isSticky: false,
      hasReward: true
    }
  ];

  const trendingTopics = [
    { tag: '마케팅', count: 15, growth: '+23%' },
    { tag: '한국어', count: 32, growth: '+18%' },
    { tag: '대전맛집', count: 24, growth: '+45%' },
    { tag: 'TOPIK', count: 19, growth: '+12%' },
    { tag: '기숙사', count: 11, growth: '+8%' },
  ];

  const onlineUsers = [
    { name: '응옥짠', nationality: '🇻🇳', status: 'active' },
    { name: '민트', nationality: '🇻🇳', status: 'active' },
    { name: '타오', nationality: '🇨🇳', status: 'idle' },
    { name: '사키', nationality: '🇯🇵', status: 'active' },
    { name: '알렉스', nationality: '🇺🇸', status: 'active' },
  ];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLanguage = selectedLanguage === 'all' || post.language === selectedLanguage;
    const matchesBoard = selectedBoard === 'all' || post.boardId === selectedBoard;
    
    return matchesSearch && matchesLanguage && matchesBoard;
  });

  const getBoardInfo = (boardId: string) => {
    return COMMUNITY_BOARDS.find(board => board.id === boardId);
  };

  const getLanguageFlag = (lang: string) => {
    switch (lang) {
      case 'ko': return '🇰🇷';
      case 'en': return '🇺🇸';
      case 'vi': return '🇻🇳';
      case 'zh': return '🇨🇳';
      case 'ja': return '🇯🇵';
      default: return '🌐';
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
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-gray-800">UniBuddy 커뮤니티</h1>
                <p className="text-sm text-gray-500">Multicultural Student Community</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {onlineUsers.filter(u => u.status === 'active').length}명 온라인
            </Badge>
            <Button className="bg-purple-600 text-white hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              새 글 쓰기
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Filters and Search */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="게시글 검색..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <Select value={selectedBoard} onValueChange={setSelectedBoard}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="게시판 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체 게시판</SelectItem>
                      {COMMUNITY_BOARDS.map((board) => (
                        <SelectItem key={board.id} value={board.id}>
                          <div className="flex items-center space-x-2">
                            <i className={board.icon}></i>
                            <span>{board.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger className="w-full md:w-32">
                      <SelectValue placeholder="언어" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">🌐 전체</SelectItem>
                      <SelectItem value="ko">🇰🇷 한국어</SelectItem>
                      <SelectItem value="en">🇺🇸 English</SelectItem>
                      <SelectItem value="vi">🇻🇳 Tiếng Việt</SelectItem>
                      <SelectItem value="zh">🇨🇳 中文</SelectItem>
                      <SelectItem value="ja">🇯🇵 日本語</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Community Boards Overview */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {COMMUNITY_BOARDS.slice(0, 6).map((board) => (
                <Card key={board.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <div className={`w-10 h-10 bg-${board.color}-100 rounded-lg flex items-center justify-center mx-auto mb-2`}>
                      <i className={`${board.icon} text-${board.color}-600`}></i>
                    </div>
                    <h3 className="font-semibold text-sm">{board.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{board.postCount}개 글</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Posts List */}
            <div className="space-y-4">
              {filteredPosts.map((post) => {
                const boardInfo = getBoardInfo(post.boardId);
                return (
                  <Card key={post.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          {post.isSticky && <Pin className="w-4 h-4 text-orange-500" />}
                          <Badge variant="outline" className="text-xs">
                            {boardInfo?.name}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {getLanguageFlag(post.language)} 
                            {post.language === 'ko' ? '한국어' : 
                             post.language === 'en' ? 'English' : 
                             post.language === 'vi' ? 'Tiếng Việt' : 
                             post.language === 'zh' ? '中文' : '일본어'}
                          </Badge>
                          {post.hasReward && (
                            <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                              <Star className="w-3 h-3 mr-1" />
                              보상 있음
                            </Badge>
                          )}
                        </div>
                        <span className="text-xs text-gray-500 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {post.createdAt}
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {post.content}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs">
                              {post.isAnonymous ? '?' : post.author.name.slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center space-x-2">
                              <p className="text-sm font-medium text-gray-900">
                                {post.isAnonymous ? '익명' : post.author.name}
                              </p>
                              {!post.isAnonymous && (
                                <>
                                  <span className="text-sm">{post.author.nationality}</span>
                                  <Badge variant="outline" className="text-xs">
                                    {post.author.department} {post.author.year}
                                  </Badge>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{post.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{post.comments}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{post.views}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {filteredPosts.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">게시글이 없습니다</h3>
                  <p className="text-gray-600 mb-4">
                    {searchQuery ? '검색 결과가 없습니다.' : '첫 번째 게시글을 작성해보세요.'}
                  </p>
                  <Button className="bg-purple-600 text-white hover:bg-purple-700">
                    <Plus className="w-4 h-4 mr-2" />
                    새 글 쓰기
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Online Users */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Users className="w-5 h-5 mr-2 text-green-600" />
                  온라인 사용자
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {onlineUsers.map((user, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs">
                          {user.name.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                        user.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium">{user.name}</p>
                        <span className="text-sm">{user.nationality}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="ghost" className="w-full text-sm text-blue-600 hover:text-blue-700">
                  더 보기
                </Button>
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-orange-600" />
                  인기 태그
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div>
                      <p className="font-medium text-gray-900">#{topic.tag}</p>
                      <p className="text-sm text-gray-500">{topic.count}개 게시글</p>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                      {topic.growth}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Community Rules */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-red-600" />
                  커뮤니티 규칙
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">🌍 다문화 존중</h4>
                  <p className="text-blue-800">서로 다른 문화와 언어를 존중하고 이해해주세요.</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">📚 학습 지향</h4>
                  <p className="text-green-800">함께 배우고 성장하는 긍정적인 분위기를 만들어가요.</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <h4 className="font-medium text-purple-900 mb-2">🤝 도움 나누기</h4>
                  <p className="text-purple-800">어려움이 있는 친구들에게 따뜻한 도움의 손길을 내밀어주세요.</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">빠른 링크</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <BookOpen className="w-4 h-4 mr-2" />
                  학습 그룹 찾기
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <MapPin className="w-4 h-4 mr-2" />
                  대전 생활 정보
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <UserPlus className="w-4 h-4 mr-2" />
                  멘토/멘티 매칭
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  이벤트 및 모임
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;

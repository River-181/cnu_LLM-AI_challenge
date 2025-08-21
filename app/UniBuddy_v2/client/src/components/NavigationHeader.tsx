import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, ChevronDown, GraduationCap, Globe } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { LANGUAGES } from '@/lib/constants';
import { useMockAuth } from '@/hooks/useAuth';

const NavigationHeader = () => {
  const [location] = useLocation();
  const { user } = useMockAuth();
  const [selectedLanguage, setSelectedLanguage] = useState('vi');

  const navigationItems = [
    { href: '/', label: '대시보드', key: 'dashboard' },
    { href: '/lecture-analyzer', label: '강의 분석', key: 'lecture' },
    { href: '/emotional-translator', label: '마음 상담', key: 'emotional' },
    { href: '/communication-helper', label: '소통 도우미', key: 'communication' },
    { href: '/student-life-info', label: '생활 정보', key: 'info' },
    { href: '/community', label: '커뮤니티', key: 'community' },
  ];

  const selectedLang = LANGUAGES.find(lang => lang.code === selectedLanguage);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">UniBuddy</h1>
                <p className="text-xs text-gray-500">충남대학교 유학생 AI 버디</p>
              </div>
            </div>
          </Link>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link key={item.key} href={item.href}>
                <Button
                  variant={location === item.href ? "default" : "ghost"}
                  className="font-medium"
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <span className="text-sm font-medium">
                    {selectedLang?.flag} {selectedLang?.code.toUpperCase()}
                  </span>
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {LANGUAGES.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setSelectedLanguage(lang.code)}
                    className={selectedLanguage === lang.code ? "bg-blue-50" : ""}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    <span>{lang.nativeName}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-4 h-4" />
              <Badge variant="destructive" className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs">
                3
              </Badge>
            </Button>

            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={user?.profileImageUrl} />
                <AvatarFallback className="bg-gradient-to-r from-red-500 to-yellow-500 text-white text-sm font-bold">
                  NT
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{user?.profile?.preferredName}</p>
                <p className="text-xs text-gray-500">경영학과 2학년</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavigationHeader;

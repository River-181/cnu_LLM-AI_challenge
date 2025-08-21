import React from 'react';
import { Button } from '@/components/ui/button';
import { Home, Book, Heart, Users, User } from 'lucide-react';
import { Link, useLocation } from 'wouter';

const MobileNavigation = () => {
  const [location] = useLocation();

  const navigationItems = [
    { href: '/', label: '홈', icon: Home },
    { href: '/lecture-analyzer', label: '강의', icon: Book },
    { href: '/emotional-translator', label: '상담', icon: Heart },
    { href: '/community', label: '커뮤니티', icon: Users },
    { href: '/profile', label: '프로필', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-30">
      <div className="grid grid-cols-5 gap-1 p-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href;
          
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                size="sm"
                className={`flex flex-col items-center space-y-1 p-2 h-auto ${
                  isActive ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNavigation;

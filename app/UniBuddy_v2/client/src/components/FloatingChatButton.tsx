import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, Heart } from 'lucide-react';

interface FloatingChatButtonProps {
  onClick: () => void;
}

const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40"
      size="sm"
    >
      <MessageCircle className="w-6 h-6" />
      <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
        <Heart className="w-3 h-3" />
      </div>
    </Button>
  );
};

export default FloatingChatButton;

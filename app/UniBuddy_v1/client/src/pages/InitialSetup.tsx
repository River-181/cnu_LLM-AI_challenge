import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SUPPORTED_LANGUAGES } from '@shared/schema';
import { GraduationCap, User, Globe } from 'lucide-react';

interface InitialSetupProps {
  onSetupComplete: (preferences: { name: string; preferredLanguage: string }) => void;
}

export function InitialSetup({ onSetupComplete }: InitialSetupProps) {
  const [name, setName] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [showLanguages, setShowLanguages] = useState(false);

  const handleSubmit = () => {
    if (name && selectedLanguage) {
      onSetupComplete({ name, preferredLanguage: selectedLanguage });
    }
  };

  const selectedLang = SUPPORTED_LANGUAGES.find(lang => lang.code === selectedLanguage);

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-sm shadow-xl">
        <CardHeader className="text-center pb-2">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">UniBuddy에 오신 것을 환영합니다</h1>
          <p className="text-sm text-gray-600 mt-2">충남대학교 (CNU)</p>
          <p className="text-xs text-gray-500 mt-1">학업과 정서적 지원을 위한 AI 동반자</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <User className="w-4 h-4" />
              어떻게 불러드릴까요?
            </label>
            <Input
              placeholder="선호하는 이름을 입력하세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Globe className="w-4 h-4" />
              선호하는 언어를 선택하세요
            </label>
            
            <div className="relative">
              <button
                onClick={() => setShowLanguages(!showLanguages)}
                className="w-full p-3 border border-gray-300 rounded-md text-left bg-white hover:bg-gray-50 flex items-center justify-between"
              >
                {selectedLang ? (
                  <span className="flex items-center gap-2">
                    <span className="text-lg">{selectedLang.flag}</span>
                    <span>{selectedLang.name}</span>
                  </span>
                ) : (
                  <span className="text-gray-500">언어 선택</span>
                )}
                <span className="text-gray-400">▼</span>
              </button>
              
              {showLanguages && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setSelectedLanguage(lang.code);
                        setShowLanguages(false);
                      }}
                      className="w-full p-3 text-left hover:bg-blue-50 flex items-center gap-3 border-b border-gray-100 last:border-b-0"
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span className="font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs">ℹ</span>
              </div>
              <div className="text-sm text-blue-700">
                <p className="font-medium mb-1">CNU 서비스와 연결됨</p>
                <p className="text-xs">UniBuddy는 국제교류본부, 학생상담센터, 학습지원센터와 연계되어 포괄적인 지원을 제공합니다.</p>
              </div>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!name || !selectedLanguage}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-medium"
          >
            → UniBuddy와 함께 시작하기
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
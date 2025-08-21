import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FileText, CloudUpload, Play, X, Clock } from 'lucide-react';

interface LectureAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LectureAnalysisModal: React.FC<LectureAnalysisModalProps> = ({ isOpen, onClose }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [audioProgress, setAudioProgress] = useState(35);

  // Mock lecture analysis data
  const analysisData = {
    original: {
      title: '마케팅믹스 - 4P 전략',
      content: 'Product, Price, Place, Promotion의 네 가지 요소로 구성된 마케팅 전략 프레임워크입니다. 각각의 요소는 상호 연관성을 가지며...',
      audioDuration: '43:25',
      currentTime: '15:12',
    },
    reformatted: {
      koreanSummary: {
        title: '중급 수준 요약',
        content: '마케팅믹스는 회사가 제품을 팔 때 사용하는 네 가지 중요한 방법입니다:',
        points: [
          '제품(Product): 무엇을 팔 것인가?',
          '가격(Price): 얼마에 팔 것인가?',
          '장소(Place): 어디서 팔 것인가?',
          '홍보(Promotion): 어떻게 알릴 것인가?',
        ],
      },
      vietnameseTranslation: {
        title: '베트남어 번역',
        content: 'Marketing Mix là bốn yếu tố quan trọng mà công ty sử dụng khi bán sản phẩm:',
        points: [
          'Sản phẩm (Product): Bán gì?',
          'Giá (Price): Bán với giá bao nhiêu?',
          'Địa điểm (Place): Bán ở đâu?',
          'Khuyến mãi (Promotion): Làm sao để quảng bá?',
        ],
      },
      keyTerms: [
        { korean: '마케팅믹스', english: 'Marketing Mix' },
        { korean: '전략', english: 'Strategy', vietnamese: 'Chiến lược' },
        { korean: '프레임워크', english: 'Framework', vietnamese: 'Khung' },
      ],
    },
    quiz: {
      question: '마케팅믹스의 4P에 포함되지 않는 것은?',
      options: [
        'Product (제품)',
        'Process (과정)',
        'Price (가격)',
        'Promotion (홍보)',
      ],
      correctAnswer: 1,
    },
  };

  const handleSubmitQuiz = () => {
    // Handle quiz submission
    console.log('Selected answer:', selectedAnswer);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b border-gray-200 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <DialogTitle className="text-xl font-semibold">AI 강의 리포맷터</DialogTitle>
                <p className="text-gray-600">강의 자료 업로드 및 분석</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="py-6 space-y-6">
          {/* Upload Area */}
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <CloudUpload className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">강의 자료를 업로드하세요</h4>
            <p className="text-gray-600 mb-4">PPT, PDF, 음성 녹음 파일 (MP3, WAV) 지원</p>
            <Button className="bg-blue-500 text-white hover:bg-blue-600">
              파일 선택
            </Button>
          </div>

          {/* Analysis Results */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Original Content */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">원본 강의 내용</h4>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <h5 className="font-medium text-gray-900 mb-2">{analysisData.original.title}</h5>
                  <p className="text-sm text-gray-600">{analysisData.original.content}</p>
                </div>
                
                {/* Audio Player */}
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <Button size="sm" variant="ghost" className="text-blue-600">
                      <Play className="w-4 h-4 mr-2" />
                      강의 녹음
                    </Button>
                    <span className="text-sm text-gray-500 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {analysisData.original.audioDuration}
                    </span>
                  </div>
                  <Progress value={audioProgress} className="w-full mb-2" />
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{analysisData.original.currentTime}</span>
                    <span>{analysisData.original.audioDuration}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Reformatted Content */}
            <div className="bg-green-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">맞춤형 분석 결과</h4>
              <div className="space-y-4">
                {/* Korean Level Summary */}
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-medium text-green-600">
                      {analysisData.reformatted.koreanSummary.title}
                    </span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      한국어 중급
                    </span>
                  </div>
                  <p className="text-sm text-gray-800 mb-2">
                    {analysisData.reformatted.koreanSummary.content}
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {analysisData.reformatted.koreanSummary.points.map((point, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Vietnamese Translation */}
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-medium text-red-600">
                      {analysisData.reformatted.vietnameseTranslation.title}
                    </span>
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                      🇻🇳 Tiếng Việt
                    </span>
                  </div>
                  <p className="text-sm text-gray-800 mb-2">
                    {analysisData.reformatted.vietnameseTranslation.content}
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {analysisData.reformatted.vietnameseTranslation.points.map((point, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Terms Dictionary */}
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-medium text-purple-600">핵심 용어 사전</span>
                    <FileText className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="space-y-2 text-sm">
                    {analysisData.reformatted.keyTerms.map((term, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="font-medium">{term.korean}</span>
                        <span className="text-gray-600">
                          {term.english}
                          {term.vietnamese && ` (${term.vietnamese})`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quiz Section */}
          <div className="bg-orange-50 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">복습 퀴즈</h4>
            <div className="bg-white rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-4">{analysisData.quiz.question}</p>
              <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                {analysisData.quiz.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="text-sm cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              <Button
                onClick={handleSubmitQuiz}
                disabled={!selectedAnswer}
                className="mt-4 bg-orange-500 text-white hover:bg-orange-600"
              >
                답안 제출
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LectureAnalysisModal;

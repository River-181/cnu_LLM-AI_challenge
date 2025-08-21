import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'wouter';
import { 
  ArrowLeft, 
  MessageSquare, 
  Mail,
  FileText,
  Mic,
  CheckSquare,
  ArrowRight,
  Lightbulb,
  Users,
  Book,
  Settings,
  Volume2,
  VolumeX,
  Play,
  Pause
} from 'lucide-react';

interface CommunicationHelperProps {
  userPreferences: { name: string; preferredLanguage: string } | null;
}

type CommunicationType = 'email' | 'question' | 'presentation' | 'general';

interface ConversionExample {
  direct: string;
  polite: string;
  context: string;
}

export function CommunicationHelper({ userPreferences }: CommunicationHelperProps) {
  const [activeType, setActiveType] = useState<CommunicationType>('email');
  const [inputText, setInputText] = useState('');
  const [convertedText, setConvertedText] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  const conversionExamples: ConversionExample[] = [
    {
      direct: "수업을 못 들었어요. 자료 주세요.",
      polite: "안녕하세요 교수님. 개인적인 사정으로 인해 지난 수업에 참석하지 못하게 되어 죄송합니다. 혹시 수업 자료를 공유해 주실 수 있을까요? 감사합니다.",
      context: "이메일 - 수업 자료 요청"
    },
    {
      direct: "과제 기한을 늘려주세요.",
      polite: "교수님께 말씀드리고 싶은 것이 있습니다. 현재 과제를 성실히 준비하고 있으나, 예상보다 시간이 더 필요할 것 같습니다. 혹시 제출 기한을 조금 연장해 주실 수 있을까요?",
      context: "대면 상담 - 과제 기한 연장 요청"
    },
    {
      direct: "이해 안 돼요. 다시 설명해 주세요.",
      polite: "죄송합니다, 제가 이해력이 부족한 것 같은데, 혹시 다시 한 번 설명해 주실 수 있을까요? 좀 더 자세히 알고 싶습니다.",
      context: "수업 중 질문"
    }
  ];

  const handleConvert = async () => {
    if (!inputText.trim()) return;
    
    setIsConverting(true);
    
    try {
      // Call Gemini API for cultural context translation
      const response = await fetch('/api/communication-helper', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputText,
          context: getContextForType(activeType)
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setConvertedText(result.politeVersion);
        setShowChecklist(true);
      } else {
        // Fallback to local generation
        let converted = '';
        
        if (activeType === 'email') {
          converted = generatePoliteEmail(inputText);
        } else if (activeType === 'question') {
          converted = generatePoliteQuestion(inputText);
        } else if (activeType === 'presentation') {
          converted = generatePresentationScript(inputText);
        } else {
          converted = generateGeneralPolite(inputText);
        }
        
        setConvertedText(converted);
        setShowChecklist(true);
      }
    } catch (error) {
      console.error('Error calling communication helper API:', error);
      // Fallback to local generation
      let converted = '';
      
      if (activeType === 'email') {
        converted = generatePoliteEmail(inputText);
      } else if (activeType === 'question') {
        converted = generatePoliteQuestion(inputText);
      } else if (activeType === 'presentation') {
        converted = generatePresentationScript(inputText);
      } else {
        converted = generateGeneralPolite(inputText);
      }
      
      setConvertedText(converted);
      setShowChecklist(true);
    }
    
    setIsConverting(false);
  };

  const getContextForType = (type: CommunicationType): string => {
    switch (type) {
      case 'email':
        return '교수님께 보내는 이메일';
      case 'question':
        return '수업 중 질문하기';
      case 'presentation':
        return '발표 스크립트';
      case 'general':
        return '일반적인 교수님과의 소통';
      default:
        return '일반적인 교수님과의 소통';
    }
  };

  const generatePoliteEmail = (text: string): string => {
    return `안녕하세요, 교수님.

${userPreferences?.name}입니다.

${text}에 관하여 문의드리고자 메일을 보냅니다.

바쁘신 중에도 시간을 내어 확인해 주시면 감사하겠습니다.

좋은 하루 보내세요.

감사합니다.

${userPreferences?.name} 드림`;
  };

  const generatePoliteQuestion = (text: string): string => {
    return `교수님, 죄송합니다. 

"${text}"에 대해 질문이 있습니다. 

제가 이해한 것이 맞는지 확인하고 싶어서 여쭤봅니다. 

시간이 되실 때 설명해 주시면 감사하겠습니다.`;
  };

  const generatePresentationScript = (text: string): string => {
    return `안녕하세요, 여러분.

오늘 "${text}"에 대해 발표하게 된 ${userPreferences?.name}입니다.

먼저 이런 기회를 주셔서 감사합니다.

부족한 점이 있더라도 끝까지 들어주시면 감사하겠습니다.

그럼 시작하겠습니다.`;
  };

  const generateGeneralPolite = (text: string): string => {
    const politeText = text
      .replace(/해줘/g, '해 주시면 감사하겠습니다')
      .replace(/알려줘/g, '알려주시면 감사하겠습니다')
      .replace(/도와줘/g, '도움을 부탁드립니다')
      .replace(/궁금해/g, '궁금합니다')
      .replace(/몰라/g, '잘 모르겠습니다');
      
    return `${politeText}

혹시 시간이 되실 때 답변 부탁드립니다.

감사합니다.`;
  };

  const checklist = [
    { item: '존댓말 사용 확인', checked: true },
    { item: '완곡한 표현 사용', checked: true },
    { item: '감사 인사 포함', checked: true },
    { item: '상황에 맞는 격식', checked: true },
    { item: '문화적 예의 준수', checked: true }
  ];

  // 컴포넌트 마운트 시 TTS 지원 확인
  useState(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSpeechSupported(true);
    }
  });

  // 텍스트를 음성으로 읽어주는 함수
  const speakText = (text: string) => {
    if (!speechSupported || !text.trim()) return;

    // 현재 재생 중인 음성이 있으면 중지
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR'; // 한국어 설정
    utterance.rate = 0.8; // 속도 조절 (약간 느리게)
    utterance.pitch = 1; // 음높이
    utterance.volume = 1; // 볼륨

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  // 음성 중지 함수
  const stopSpeech = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">교수 소통 헬퍼</h1>
                <p className="text-sm text-gray-500">한국 학술 문화에 맞는 정중한 소통</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* 소통 유형 선택 */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 mb-4">
            <Button
              variant={activeType === 'email' ? 'default' : 'outline'}
              onClick={() => setActiveType('email')}
              className="flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              이메일 작성
            </Button>
            <Button
              variant={activeType === 'question' ? 'default' : 'outline'}
              onClick={() => setActiveType('question')}
              className="flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              질문하기
            </Button>
            <Button
              variant={activeType === 'presentation' ? 'default' : 'outline'}
              onClick={() => setActiveType('presentation')}
              className="flex items-center gap-2"
            >
              <Mic className="w-4 h-4" />
              발표 스크립트
            </Button>
            <Button
              variant={activeType === 'general' ? 'default' : 'outline'}
              onClick={() => setActiveType('general')}
              className="flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              일반 변환
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* 메인 변환 도구 */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowRight className="w-5 h-5" />
                  문화 맥락 번역
                </CardTitle>
                <p className="text-sm text-gray-600">
                  직설적인 표현을 한국 학술 문화에 맞는 완곡하고 정중한 표현으로 변환합니다
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">원본 텍스트</label>
                    <textarea
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="변환하고 싶은 텍스트를 입력하세요..."
                      className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex justify-center">
                    <Button
                      onClick={handleConvert}
                      disabled={!inputText.trim() || isConverting}
                      className="bg-green-500 hover:bg-green-600 text-white"
                    >
                      {isConverting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          문화적 맥락 적용 중...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <ArrowRight className="w-4 h-4" />
                          완곡한 표현으로 변환
                        </div>
                      )}
                    </Button>
                  </div>

                  {convertedText && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium">변환된 텍스트</label>
                        {speechSupported && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => speakText(convertedText)}
                            className="flex items-center gap-2"
                          >
                            {isSpeaking ? (
                              <>
                                <Pause className="w-4 h-4" />
                                정지
                              </>
                            ) : (
                              <>
                                <Volume2 className="w-4 h-4" />
                                음성으로 듣기
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="whitespace-pre-line text-sm">{convertedText}</p>
                      </div>
                    </div>
                  )}

                  {showChecklist && (
                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-3 flex items-center gap-2">
                        <CheckSquare className="w-4 h-4" />
                        문화적 예의 체크리스트
                      </h4>
                      <div className="space-y-2">
                        {checklist.map((item, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-green-500 rounded-sm flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            <span className="text-sm text-gray-700">{item.item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* 변환 예시 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  변환 예시
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {conversionExamples.map((example, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="text-xs text-gray-500 mb-2">{example.context}</div>
                      <div className="mb-3">
                        <div className="text-sm font-medium text-red-600 mb-1">직설적 표현:</div>
                        <div className="text-sm bg-red-50 p-2 rounded">{example.direct}</div>
                      </div>
                      <div className="flex justify-center my-2">
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-sm font-medium text-green-600">완곡한 표현:</div>
                          {speechSupported && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => speakText(example.polite)}
                              className="h-6 w-6 p-0"
                            >
                              <Volume2 className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                        <div className="text-sm bg-green-50 p-2 rounded">{example.polite}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 사이드바 - 가이드 */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Book className="w-4 h-4" />
                  한국 학술 문화 가이드
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-blue-800">존댓말 사용</h4>
                    {speechSupported && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => speakText("교수님, 안녕하세요. 질문이 있어서 말씀드립니다.")}
                        className="h-6 w-6 p-0"
                      >
                        <Volume2 className="w-3 h-3 text-blue-600" />
                      </Button>
                    )}
                  </div>
                  <p className="text-xs text-blue-700">교수님, 선생님께는 항상 존댓말을 사용하며, '습니다/습니까' 체를 활용합니다.</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-green-800">완곡한 표현</h4>
                    {speechSupported && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => speakText("혹시 시간이 되시면 도움을 부탁드릴 수 있을까요?")}
                        className="h-6 w-6 p-0"
                      >
                        <Volume2 className="w-3 h-3 text-green-600" />
                      </Button>
                    )}
                  </div>
                  <p className="text-xs text-green-700">직접적인 요청보다는 '혹시', '가능하시다면' 등의 완곡한 표현을 사용합니다.</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-purple-800">감사 표현</h4>
                    {speechSupported && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => speakText("시간 내어 주셔서 감사합니다.")}
                        className="h-6 w-6 p-0"
                      >
                        <Volume2 className="w-3 h-3 text-purple-600" />
                      </Button>
                    )}
                  </div>
                  <p className="text-xs text-purple-700">시작과 끝에 감사 인사를 포함하여 예의를 표현합니다.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  상황별 가이드
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="p-2 border rounded text-center">
                  <p className="text-sm font-medium">📧 이메일</p>
                  <p className="text-xs text-gray-600">제목 명시, 인사말, 본문, 맺음말 구조</p>
                </div>
                <div className="p-2 border rounded text-center">
                  <p className="text-sm font-medium">🙋‍♀️ 질문</p>
                  <p className="text-xs text-gray-600">허락 구하기 → 질문 → 감사 표현</p>
                </div>
                <div className="p-2 border rounded text-center">
                  <p className="text-sm font-medium">🎤 발표</p>
                  <p className="text-xs text-gray-600">인사 → 주제 소개 → 양해 구하기</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">주의사항</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-start gap-2">
                    <span className="text-red-500">⚠️</span>
                    <span>너무 격식을 차리면 오히려 어색할 수 있습니다</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-500">💡</span>
                    <span>상황과 관계에 따라 적절한 수준을 선택하세요</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500">✅</span>
                    <span>자주 사용하는 표현은 외워두면 도움이 됩니다</span>
                  </div>
                  {speechSupported && (
                    <div className="flex items-start gap-2 mt-3 pt-3 border-t">
                      <Volume2 className="w-4 h-4 text-gray-400 mt-0.5" />
                      <span>음성 버튼을 클릭하여 정확한 발음을 들어보세요</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
export interface EmotionScores {
  depression: number;
  anxiety: number;
  stress: number;
  loneliness: number;
  hope: number;
}

export interface ConversationMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  language?: string;
}

export interface LectureAnalysis {
  originalSummary: string;
  koreanLevelSummary: string;
  vietnameseTranslation?: string;
  keyTerms: { korean: string; english: string; vietnamese?: string }[];
  quizQuestions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface CommunityBoard {
  id: string;
  name: string;
  description: string;
  icon: string;
  postCount: number;
  color: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: Date;
}

export interface QuickAction {
  id: string;
  title: string;
  icon: string;
  color: string;
  onClick: () => void;
}

export interface UserStats {
  todayLearning: number;
  emotionScore: number;
  completedTasks: number;
  communityParticipation: number;
}

export interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  fields: OnboardingField[];
}

export interface OnboardingField {
  name: string;
  type: 'text' | 'select' | 'multiselect' | 'radio' | 'checkbox' | 'range';
  label: string;
  options?: { value: string; label: string }[];
  required: boolean;
  placeholder?: string;
}

export interface Language {
  code: string;
  name: string;
  flag: string;
  nativeName: string;
}

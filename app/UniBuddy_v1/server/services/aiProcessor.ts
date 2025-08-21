import { GoogleGenAI } from "@google/genai";
import { ProcessedContent } from "@shared/schema";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export class AIProcessor {
  async processLectureContent(text: string, title: string): Promise<ProcessedContent> {
    try {
      console.log(`Processing lecture content for: ${title}`);
      
      // Generate summary in multiple languages
      const summary = await this.generateSummary(text, title);
      
      // Extract key terms
      const keyTerms = await this.extractKeyTerms(text);
      
      // Generate background knowledge
      const backgroundKnowledge = await this.generateBackgroundKnowledge(text, title);
      
      // Create quiz questions
      const quiz = await this.generateQuiz(text);
      
      // Extract learning objectives
      const learningObjectives = await this.extractLearningObjectives(text);
      
      // Extract keywords
      const keywords = await this.extractKeywords(text);
      
      return {
        summary,
        keyTerms,
        backgroundKnowledge,
        quiz,
        learningObjectives,
        keywords
      };
    } catch (error) {
      console.error('AI processing failed:', error);
      throw new Error('Failed to process lecture content with AI');
    }
  }

  private async generateSummary(text: string, title: string): Promise<ProcessedContent['summary']> {
    const prompt = `
    다음 강의 내용을 분석하여 핵심 내용을 요약해주세요.
    강의 제목: ${title}
    강의 내용: ${text}
    
    다음 형식의 JSON으로 응답해주세요:
    {
      "ko": "한국어 요약 (학습 목표, 핵심 개념, 주요 내용을 포함한 상세한 요약)",
      "en": "English summary (detailed summary including learning objectives, key concepts, and main content)",
      "zh": "中文摘要 (包含学习目标、核心概念和主要内容的详细摘要)"
    }
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        responseMimeType: "application/json"
      },
      contents: prompt,
    });

    const rawJson = response.text;
    return rawJson ? JSON.parse(rawJson) : {};
  }

  private async extractKeyTerms(text: string): Promise<ProcessedContent['keyTerms']> {
    const prompt = `
    다음 강의 내용에서 중요한 용어들을 추출하고 설명해주세요.
    강의 내용: ${text}
    
    다음 형식의 JSON 배열로 응답해주세요:
    {
      "terms": [
        {
          "term": "용어명",
          "definition": {
            "ko": "한국어 정의",
            "en": "English definition",
            "zh": "中文定义"
          },
          "context": {
            "ko": "강의에서의 맥락 설명",
            "en": "Context explanation in the lecture",
            "zh": "在讲座中的背景说明"
          }
        }
      ]
    }
    
    최대 8개의 주요 용어를 선택해주세요.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        responseMimeType: "application/json"
      },
      contents: prompt,
    });

    const rawJson = response.text;
    const result = rawJson ? JSON.parse(rawJson) : { terms: [] };
    return result.terms || [];
  }

  private async generateBackgroundKnowledge(text: string, title: string): Promise<ProcessedContent['backgroundKnowledge']> {
    const prompt = `
    다음 강의 내용을 바탕으로 이해를 돕는 배경 지식을 생성해주세요.
    강의 제목: ${title}
    강의 내용: ${text}
    
    다음 형식의 JSON으로 응답해주세요:
    {
      "knowledge": [
        {
          "title": {
            "ko": "배경지식 제목",
            "en": "Background knowledge title",
            "zh": "背景知识标题"
          },
          "content": {
            "ko": "배경지식 상세 설명",
            "en": "Detailed background knowledge explanation",
            "zh": "详细的背景知识说明"
          }
        }
      ]
    }
    
    최대 4개의 배경지식 항목을 생성해주세요.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        responseMimeType: "application/json"
      },
      contents: prompt,
    });

    const rawJson = response.text;
    const result = rawJson ? JSON.parse(rawJson) : { knowledge: [] };
    return result.knowledge || [];
  }

  private async generateQuiz(text: string): Promise<ProcessedContent['quiz']> {
    const prompt = `
    다음 강의 내용을 바탕으로 이해도를 점검할 수 있는 퀴즈를 생성해주세요.
    강의 내용: ${text}
    
    다음 형식의 JSON으로 응답해주세요:
    {
      "quiz": [
        {
          "question": {
            "ko": "문제 (한국어)",
            "en": "Question (English)",
            "zh": "问题 (中文)"
          },
          "options": {
            "ko": ["선택지1", "선택지2", "선택지3", "선택지4"],
            "en": ["Option1", "Option2", "Option3", "Option4"],
            "zh": ["选项1", "选项2", "选项3", "选项4"]
          },
          "correct": 0,
          "explanation": {
            "ko": "정답 해설",
            "en": "Answer explanation",
            "zh": "答案解释"
          }
        }
      ]
    }
    
    5개의 객관식 문제를 생성해주세요. correct는 정답의 인덱스(0-3)입니다.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        responseMimeType: "application/json"
      },
      contents: prompt,
    });

    const rawJson = response.text;
    const result = rawJson ? JSON.parse(rawJson) : { quiz: [] };
    return result.quiz || [];
  }

  private async extractLearningObjectives(text: string): Promise<ProcessedContent['learningObjectives']> {
    const prompt = `
    다음 강의 내용에서 학습 목표를 추출해주세요.
    강의 내용: ${text}
    
    다음 형식의 JSON으로 응답해주세요:
    {
      "ko": ["학습목표1", "학습목표2", "학습목표3"],
      "en": ["Learning objective 1", "Learning objective 2", "Learning objective 3"],
      "zh": ["学习目标1", "学习目标2", "学习目标3"]
    }
    
    최대 5개의 구체적인 학습 목표를 제시해주세요.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        responseMimeType: "application/json"
      },
      contents: prompt,
    });

    const rawJson = response.text;
    return rawJson ? JSON.parse(rawJson) : {};
  }

  private async extractKeywords(text: string): Promise<ProcessedContent['keywords']> {
    const prompt = `
    다음 강의 내용에서 핵심 키워드를 추출해주세요.
    강의 내용: ${text}
    
    다음 형식의 JSON으로 응답해주세요:
    {
      "ko": ["키워드1", "키워드2", "키워드3"],
      "en": ["Keyword1", "Keyword2", "Keyword3"],
      "zh": ["关键词1", "关键词2", "关键词3"]
    }
    
    최대 8개의 중요한 키워드를 추출해주세요.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        responseMimeType: "application/json"
      },
      contents: prompt,
    });

    const rawJson = response.text;
    return rawJson ? JSON.parse(rawJson) : {};
  }
}

export const aiProcessor = new AIProcessor();

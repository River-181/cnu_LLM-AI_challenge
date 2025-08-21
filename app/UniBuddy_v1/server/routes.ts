import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { upload, extractTextFromFile, getFileType, formatFileSize } from "./services/fileProcessor";
import { aiProcessor } from "./services/aiProcessor";
import { insertLectureSchema, updateLectureSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get all lectures with optional search and filter
  app.get("/api/lectures", async (req, res) => {
    try {
      const { search, subject } = req.query;
      const lectures = await storage.getLectures(
        search as string, 
        subject as string
      );
      res.json(lectures);
    } catch (error) {
      console.error("Error fetching lectures:", error);
      res.status(500).json({ message: "Failed to fetch lectures" });
    }
  });

  // Get specific lecture
  app.get("/api/lectures/:id", async (req, res) => {
    try {
      const lecture = await storage.getLecture(req.params.id);
      if (!lecture) {
        return res.status(404).json({ message: "Lecture not found" });
      }
      res.json(lecture);
    } catch (error) {
      console.error("Error fetching lecture:", error);
      res.status(500).json({ message: "Failed to fetch lecture" });
    }
  });

  // Upload new lecture file
  app.post("/api/lectures/upload", upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const { title, subject } = req.body;
      
      if (!title) {
        return res.status(400).json({ message: "Title is required" });
      }

      const fileType = getFileType(req.file.originalname);
      
      const lectureData = {
        title,
        subject: subject || null,
        fileType,
        fileName: req.file.originalname,
        filePath: req.file.path,
        fileSize: req.file.size,
      };

      // Validate the data
      const validatedData = insertLectureSchema.parse(lectureData);
      
      // Create lecture record
      const lecture = await storage.createLecture(validatedData);
      
      // Start background processing
      processLectureInBackground(lecture.id);
      
      res.json(lecture);
    } catch (error) {
      console.error("Error uploading lecture:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to upload lecture" });
    }
  });

  // Update lecture (for starring, etc.)
  app.patch("/api/lectures/:id", async (req, res) => {
    try {
      const validatedData = updateLectureSchema.parse(req.body);
      const lecture = await storage.updateLecture(req.params.id, validatedData);
      res.json(lecture);
    } catch (error) {
      console.error("Error updating lecture:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update lecture" });
    }
  });

  // Delete lecture
  app.delete("/api/lectures/:id", async (req, res) => {
    try {
      await storage.deleteLecture(req.params.id);
      res.json({ message: "Lecture deleted successfully" });
    } catch (error) {
      console.error("Error deleting lecture:", error);
      res.status(500).json({ message: "Failed to delete lecture" });
    }
  });

  // Get processing status
  app.get("/api/lectures/:id/status", async (req, res) => {
    try {
      const lecture = await storage.getLecture(req.params.id);
      if (!lecture) {
        return res.status(404).json({ message: "Lecture not found" });
      }
      
      res.json({
        id: lecture.id,
        status: lecture.status,
        progress: lecture.progress,
        hasProcessedContent: !!lecture.processedContent
      });
    } catch (error) {
      console.error("Error fetching lecture status:", error);
      res.status(500).json({ message: "Failed to fetch lecture status" });
    }
  });

  // Emotional translator endpoint
  app.post('/api/emotional-analysis', async (req, res) => {
    try {
      const { message, userName } = req.body;
      
      const prompt = `
      당신은 충남대학교 유학생들을 위한 마음의 통역사입니다. 다음 메시지의 감정을 분석하고 공감적인 응답을 제공해주세요.
      
      사용자 이름: ${userName || '학생'}
      메시지: ${message}
      
      다음 형식의 JSON으로 응답해주세요:
      {
        "emotion": {
          "positive": false,
          "loneliness": false,
          "sadness": false,
          "concern": false,
          "excited": false
        },
        "response": "공감적이고 따뜻한 응답 (200-300자 내외)",
        "suggestions": ["실용적인 조언1", "실용적인 조언2", "실용적인 조언3", "실용적인 조언4"]
      }
      
      주의사항:
      - 극심한 스트레스나 의료적 진단은 하지 마세요
      - 일반적이고 안전한 감정 지원에 집중해주세요
      - 대학생 맞춤의 친근하고 공감적인 톤으로 작성해주세요
      - 충남대학교 국제학생들의 상황을 고려해주세요
      `;

      // Use Gemini API for emotional analysis
      const { GoogleGenAI } = require("@google/genai");
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        config: {
          responseMimeType: "application/json"
        },
        contents: prompt,
      });

      const analysis = JSON.parse(response.text || '{}');
      res.json(analysis);
    } catch (error) {
      console.error('Emotional analysis error:', error);
      res.status(500).json({ error: 'Failed to analyze emotion' });
    }
  });

  // Communication helper endpoint (for cultural context translation)
  app.post('/api/communication-helper', async (req, res) => {
    try {
      const { message, context } = req.body;
      
      const prompt = `
      당신은 20대 대학생들을 위한 교수 소통 헬퍼입니다. 다음 메시지를 한국 학술 문화에 맞는 완곡하고 정중한 표현으로 변환해주세요.
      
      원본 메시지: ${message}
      상황: ${context || '일반적인 교수님과의 소통'}
      
      다음 형식의 JSON으로 응답해주세요:
      {
        "politeVersion": "완곡하고 정중한 표현으로 변환된 메시지",
        "explanation": "왜 이렇게 표현하는 것이 좋은지 설명",
        "culturalTips": ["문화적 조언1", "문화적 조언2", "문화적 조언3"]
      }
      
      주의사항:
      - 20대 대학생에게 적절한 존댓말과 격식 사용
      - 한국 교수-학생 관계의 위계질서를 고려
      - 직설적 표현을 완곡한 표현으로 변환
      - 학술적이고 정중한 톤 유지
      `;

      // Use Gemini API for communication helper
      const { GoogleGenAI } = require("@google/genai");
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        config: {
          responseMimeType: "application/json"
        },
        contents: prompt,
      });

      const result = JSON.parse(response.text || '{}');
      res.json(result);
    } catch (error) {
      console.error('Communication helper error:', error);
      res.status(500).json({ error: 'Failed to process communication request' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

// Background processing function
async function processLectureInBackground(lectureId: string) {
  try {
    console.log(`Starting background processing for lecture ${lectureId}`);
    
    // Update status to processing
    await storage.updateLecture(lectureId, { 
      status: "processing", 
      progress: 10 
    });

    const lecture = await storage.getLecture(lectureId);
    if (!lecture) {
      throw new Error("Lecture not found");
    }

    // Extract text from file
    await storage.updateLecture(lectureId, { progress: 30 });
    const extractedText = await extractTextFromFile(lecture.filePath, lecture.fileType);
    
    // Process with AI
    await storage.updateLecture(lectureId, { progress: 60 });
    const processedContent = await aiProcessor.processLectureContent(extractedText, lecture.title);
    
    // Save processed content
    await storage.updateLecture(lectureId, { 
      status: "completed", 
      progress: 100,
      processedContent
    });

    console.log(`Successfully processed lecture ${lectureId}`);
  } catch (error) {
    console.error(`Failed to process lecture ${lectureId}:`, error);
    await storage.updateLecture(lectureId, { 
      status: "failed", 
      progress: 0 
    });
  }
}

import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // User profile routes
  app.get("/api/users/:id/profile", async (req, res) => {
    try {
      const userId = req.params.id;
      const profile = await storage.getUserProfile(userId);
      
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      
      res.json(profile);
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/users/:id/profile", async (req, res) => {
    try {
      const userId = req.params.id;
      const profileData = req.body;
      
      const profile = await storage.createOrUpdateProfile(userId, profileData);
      res.json(profile);
    } catch (error) {
      console.error("Error creating/updating profile:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Lecture analysis routes
  app.get("/api/lectures", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      const lectures = await storage.getUserLectures(userId);
      res.json(lectures);
    } catch (error) {
      console.error("Error fetching lectures:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/lectures", async (req, res) => {
    try {
      const lectureData = req.body;
      const lecture = await storage.createLecture(lectureData);
      
      // In a real app, this would trigger AI analysis
      // For now, we'll simulate the analysis
      setTimeout(async () => {
        await storage.updateLectureAnalysis(lecture.id, {
          status: 'completed',
          reformattedContent: {
            koreanSummary: 'AI로 분석된 한국어 요약',
            vietnameseTranslation: 'AI로 번역된 베트남어 내용',
            keyTerms: [
              { korean: '마케팅', english: 'Marketing', vietnamese: 'Marketing' }
            ],
            quizQuestions: [
              {
                question: '마케팅믹스의 4P는?',
                options: ['Product, Price, Place, Promotion', '다른 선택지'],
                correctAnswer: 0
              }
            ]
          }
        });
      }, 5000);
      
      res.json(lecture);
    } catch (error) {
      console.error("Error creating lecture:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Emotional support routes
  app.get("/api/emotional-sessions", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      const sessions = await storage.getUserEmotionalSessions(userId);
      res.json(sessions);
    } catch (error) {
      console.error("Error fetching emotional sessions:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/emotional-sessions", async (req, res) => {
    try {
      const sessionData = req.body;
      
      // Simulate AI emotion analysis
      const emotionScores = {
        depression: Math.random() * 3, // Keep low for demo
        anxiety: Math.random() * 3,
        stress: Math.random() * 5,
        loneliness: Math.random() * 4,
        hope: 6 + Math.random() * 4 // Keep higher for positive demo
      };
      
      const session = await storage.createEmotionalSession({
        ...sessionData,
        emotionScores,
        riskLevel: emotionScores.depression > 7 ? 'high' : 
                  emotionScores.depression > 4 ? 'medium' : 'low'
      });
      
      res.json(session);
    } catch (error) {
      console.error("Error creating emotional session:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Communication helper routes
  app.post("/api/communication/improve", async (req, res) => {
    try {
      const { originalText, communicationType, targetAudience, userId } = req.body;
      
      // In a real app, this would use AI to improve the text
      // For now, simulate improved text based on audience and type
      let improvedText = originalText;
      
      if (targetAudience === 'professor') {
        improvedText = `안녕하세요, 교수님.

${originalText}

바쁘신 중에도 시간을 내어 주셔서 감사합니다.

좋은 하루 보내세요.

학생 드림`;
      }
      
      const request = await storage.createCommunicationRequest({
        userId,
        requestType: communicationType,
        targetAudience,
        originalText,
        improvedText,
        culturalNotes: [
          '존댓말 사용으로 정중한 표현',
          '상대방 배려 표현 추가',
          '한국 문화에 맞는 형식 적용'
        ]
      });
      
      res.json(request);
    } catch (error) {
      console.error("Error improving communication:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Community routes
  app.get("/api/community/posts", async (req, res) => {
    try {
      const { boardType, language, limit } = req.query;
      const posts = await storage.getCommunityPosts({
        boardType: boardType as string,
        language: language as string,
        limit: limit ? parseInt(limit as string) : undefined
      });
      res.json(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/community/posts", async (req, res) => {
    try {
      const postData = req.body;
      const post = await storage.createCommunityPost(postData);
      res.json(post);
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/community/posts/:id/comments", async (req, res) => {
    try {
      const postId = req.params.id;
      const comments = await storage.getPostComments(postId);
      res.json(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/community/posts/:id/comments", async (req, res) => {
    try {
      const postId = req.params.id;
      const commentData = { ...req.body, postId };
      const comment = await storage.createComment(commentData);
      res.json(comment);
    } catch (error) {
      console.error("Error creating comment:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Activity tracking
  app.post("/api/activities", async (req, res) => {
    try {
      const activityData = req.body;
      const activity = await storage.createActivity(activityData);
      res.json(activity);
    } catch (error) {
      console.error("Error creating activity:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Admin info routes
  app.get("/api/admin-info", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      const category = req.query.category as string;
      const adminInfo = await storage.getUserAdminInfo(userId, category);
      res.json(adminInfo);
    } catch (error) {
      console.error("Error fetching admin info:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/admin-info", async (req, res) => {
    try {
      const adminInfoData = req.body;
      const adminInfo = await storage.createAdminInfo(adminInfoData);
      res.json(adminInfo);
    } catch (error) {
      console.error("Error creating admin info:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Mock auth endpoint for development
  app.get("/api/auth/user", async (req, res) => {
    // Return mock user data for development
    const mockUser = {
      id: "mock-user-id",
      email: "ngoctran@example.com",
      firstName: "Ngọc",
      lastName: "Trân",
      profileImageUrl: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    res.json(mockUser);
  });

  const httpServer = createServer(app);
  return httpServer;
}

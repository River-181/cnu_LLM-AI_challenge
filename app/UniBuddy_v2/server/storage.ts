import { randomUUID } from "crypto";
import type {
  User,
  InsertUser,
  StudentProfile,
  InsertStudentProfile,
  Lecture,
  InsertLecture,
  EmotionalSession,
  InsertEmotionalSession,
  CommunicationRequest,
  InsertCommunicationRequest,
  CommunityPost,
  InsertCommunityPost,
  CommunityComment,
  InsertCommunityComment,
  UserActivity,
  InsertUserActivity,
  AdminInfo,
  InsertAdminInfo,
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Student profile operations
  getUserProfile(userId: string): Promise<StudentProfile | undefined>;
  createOrUpdateProfile(userId: string, profile: Partial<InsertStudentProfile>): Promise<StudentProfile>;

  // Lecture operations
  getUserLectures(userId: string): Promise<Lecture[]>;
  createLecture(lecture: InsertLecture): Promise<Lecture>;
  updateLectureAnalysis(lectureId: string, analysisData: any): Promise<Lecture>;

  // Emotional session operations
  getUserEmotionalSessions(userId: string): Promise<EmotionalSession[]>;
  createEmotionalSession(session: InsertEmotionalSession): Promise<EmotionalSession>;

  // Communication request operations
  createCommunicationRequest(request: InsertCommunicationRequest): Promise<CommunicationRequest>;

  // Community operations
  getCommunityPosts(filters: {
    boardType?: string;
    language?: string;
    limit?: number;
  }): Promise<CommunityPost[]>;
  createCommunityPost(post: InsertCommunityPost): Promise<CommunityPost>;
  getPostComments(postId: string): Promise<CommunityComment[]>;
  createComment(comment: InsertCommunityComment): Promise<CommunityComment>;

  // Activity tracking
  createActivity(activity: InsertUserActivity): Promise<UserActivity>;

  // Admin info operations
  getUserAdminInfo(userId: string, category?: string): Promise<AdminInfo[]>;
  createAdminInfo(info: InsertAdminInfo): Promise<AdminInfo>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private profiles: Map<string, StudentProfile> = new Map();
  private lectures: Map<string, Lecture> = new Map();
  private emotionalSessions: Map<string, EmotionalSession> = new Map();
  private communicationRequests: Map<string, CommunicationRequest> = new Map();
  private communityPosts: Map<string, CommunityPost> = new Map();
  private communityComments: Map<string, CommunityComment> = new Map();
  private activities: Map<string, UserActivity> = new Map();
  private adminInfos: Map<string, AdminInfo> = new Map();

  constructor() {
    // Initialize with mock data
    this.initializeMockData();
  }

  private initializeMockData() {
    // Mock user
    const mockUser: User = {
      id: "mock-user-id",
      email: "ngoctran@example.com",
      firstName: "Ngọc",
      lastName: "Trân",
      profileImageUrl: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(mockUser.id, mockUser);

    // Mock student profile
    const mockProfile: StudentProfile = {
      id: randomUUID(),
      userId: mockUser.id,
      preferredName: "Ngọc Trân",
      nationality: "vietnam",
      nativeLanguage: "vi",
      preferredLanguage: "ko",
      koreanLevel: "intermediate",
      topikLevel: "3",
      department: "business",
      year: 2,
      admissionYear: 2023,
      koreaResidenceDuration: 4,
      previousKoreaExperience: false,
      culturalUnderstanding: 3,
      learningGoals: ["korean_improvement", "cultural_adaptation", "social_connections"],
      difficulties: ["language_barrier", "cultural_differences"],
      learningStyle: "visual",
      notificationSettings: {},
      completedOnboarding: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.profiles.set(mockUser.id, mockProfile);

    // Mock lectures
    const mockLectures: Lecture[] = [
      {
        id: randomUUID(),
        userId: mockUser.id,
        title: "마케팅 원론 - 4P 전략",
        originalContent: "마케팅믹스의 4P 전략에 대한 강의 내용...",
        reformattedContent: {
          koreanSummary: "마케팅믹스는 네 가지 요소로 구성됩니다...",
          vietnameseTranslation: "Marketing Mix bao gồm bốn yếu tố...",
          keyTerms: [
            { korean: "마케팅", english: "Marketing", vietnamese: "Marketing" }
          ]
        },
        fileUrl: "/uploads/lecture1.pdf",
        fileType: "pdf",
        courseName: "경영학원론",
        professorName: "김경영 교수",
        analysisStatus: "completed",
        keyTerms: [],
        quizQuestions: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];
    
    mockLectures.forEach(lecture => {
      this.lectures.set(lecture.id, lecture);
    });

    // Mock community posts
    const mockPosts: CommunityPost[] = [
      {
        id: randomUUID(),
        userId: mockUser.id,
        boardType: "study_help",
        title: "마케팅 과제 도움 요청!",
        content: "4P 전략 과제를 하고 있는데 도움이 필요해요.",
        language: "ko",
        isAnonymous: false,
        tags: ["마케팅", "과제도움"],
        attachments: [],
        likes: 12,
        views: 48,
        isSticky: false,
        isLocked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    mockPosts.forEach(post => {
      this.communityPosts.set(post.id, post);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = {
      id,
      email: insertUser.email ?? null,
      firstName: insertUser.firstName ?? null,
      lastName: insertUser.lastName ?? null,
      profileImageUrl: insertUser.profileImageUrl ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async getUserProfile(userId: string): Promise<StudentProfile | undefined> {
    return this.profiles.get(userId);
  }

  async createOrUpdateProfile(userId: string, profileData: Partial<InsertStudentProfile>): Promise<StudentProfile> {
    const existing = this.profiles.get(userId);
    
    if (existing) {
      const updated = { ...existing, ...profileData, updatedAt: new Date() };
      this.profiles.set(userId, updated);
      return updated;
    } else {
      const profile: StudentProfile = {
        id: randomUUID(),
        userId,
        preferredName: "",
        nationality: "",
        nativeLanguage: "",
        preferredLanguage: "",
        koreanLevel: "beginner",
        topikLevel: null,
        department: "",
        year: 1,
        admissionYear: new Date().getFullYear(),
        koreaResidenceDuration: 0,
        previousKoreaExperience: false,
        culturalUnderstanding: 1,
        learningGoals: [],
        difficulties: [],
        learningStyle: "visual",
        notificationSettings: {},
        completedOnboarding: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...profileData,
      };
      this.profiles.set(userId, profile);
      return profile;
    }
  }

  async getUserLectures(userId: string): Promise<Lecture[]> {
    return Array.from(this.lectures.values()).filter(lecture => lecture.userId === userId);
  }

  async createLecture(lectureData: InsertLecture): Promise<Lecture> {
    const id = randomUUID();
    const lecture: Lecture = {
      id,
      title: lectureData.title,
      userId: lectureData.userId ?? null,
      originalContent: lectureData.originalContent ?? null,
      reformattedContent: lectureData.reformattedContent ?? {},
      fileUrl: lectureData.fileUrl ?? null,
      fileType: lectureData.fileType ?? null,
      courseName: lectureData.courseName ?? null,
      professorName: lectureData.professorName ?? null,
      analysisStatus: lectureData.analysisStatus ?? "pending",
      keyTerms: lectureData.keyTerms ?? [],
      quizQuestions: lectureData.quizQuestions ?? [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.lectures.set(id, lecture);
    return lecture;
  }

  async updateLectureAnalysis(lectureId: string, analysisData: any): Promise<Lecture> {
    const lecture = this.lectures.get(lectureId);
    if (!lecture) {
      throw new Error("Lecture not found");
    }
    
    const updated = { 
      ...lecture, 
      ...analysisData,
      updatedAt: new Date() 
    };
    this.lectures.set(lectureId, updated);
    return updated;
  }

  async getUserEmotionalSessions(userId: string): Promise<EmotionalSession[]> {
    return Array.from(this.emotionalSessions.values()).filter(session => session.userId === userId);
  }

  async createEmotionalSession(sessionData: InsertEmotionalSession): Promise<EmotionalSession> {
    const id = randomUUID();
    const session: EmotionalSession = {
      id,
      userId: sessionData.userId ?? null,
      sessionType: sessionData.sessionType,
      emotionScores: sessionData.emotionScores ?? {},
      conversationHistory: sessionData.conversationHistory ?? [],
      recommendations: sessionData.recommendations ?? [],
      riskLevel: sessionData.riskLevel ?? null,
      referralMade: sessionData.referralMade ?? null,
      duration: sessionData.duration ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.emotionalSessions.set(id, session);
    return session;
  }

  async createCommunicationRequest(requestData: InsertCommunicationRequest): Promise<CommunicationRequest> {
    const id = randomUUID();
    const request: CommunicationRequest = {
      id,
      userId: requestData.userId ?? null,
      requestType: requestData.requestType,
      targetAudience: requestData.targetAudience,
      originalText: requestData.originalText,
      improvedText: requestData.improvedText ?? null,
      culturalNotes: requestData.culturalNotes ?? [],
      pronunciationGuide: requestData.pronunciationGuide ?? {},
      templates: requestData.templates ?? [],
      feedback: requestData.feedback ?? null,
      rating: requestData.rating ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.communicationRequests.set(id, request);
    return request;
  }

  async getCommunityPosts(filters: {
    boardType?: string;
    language?: string;
    limit?: number;
  }): Promise<CommunityPost[]> {
    let posts = Array.from(this.communityPosts.values());
    
    if (filters.boardType && filters.boardType !== 'all') {
      posts = posts.filter(post => post.boardType === filters.boardType);
    }
    
    if (filters.language && filters.language !== 'all') {
      posts = posts.filter(post => post.language === filters.language);
    }
    
    // Sort by sticky first, then by creation date
    posts.sort((a, b) => {
      if (a.isSticky && !b.isSticky) return -1;
      if (!a.isSticky && b.isSticky) return 1;
      const aTime = a.createdAt?.getTime() ?? 0;
      const bTime = b.createdAt?.getTime() ?? 0;
      return bTime - aTime;
    });
    
    if (filters.limit) {
      posts = posts.slice(0, filters.limit);
    }
    
    return posts;
  }

  async createCommunityPost(postData: InsertCommunityPost): Promise<CommunityPost> {
    const id = randomUUID();
    const post: CommunityPost = {
      id,
      userId: postData.userId ?? null,
      boardType: postData.boardType,
      title: postData.title,
      content: postData.content,
      language: postData.language,
      isAnonymous: postData.isAnonymous ?? null,
      tags: postData.tags ?? [],
      attachments: postData.attachments ?? [],
      likes: postData.likes ?? 0,
      views: postData.views ?? 0,
      isSticky: postData.isSticky ?? null,
      isLocked: postData.isLocked ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.communityPosts.set(id, post);
    return post;
  }

  async getPostComments(postId: string): Promise<CommunityComment[]> {
    return Array.from(this.communityComments.values()).filter(comment => comment.postId === postId);
  }

  async createComment(commentData: InsertCommunityComment): Promise<CommunityComment> {
    const id = randomUUID();
    const comment: CommunityComment = {
      id,
      parentId: null,
      likes: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...commentData,
    };
    this.communityComments.set(id, comment);
    return comment;
  }

  async createActivity(activityData: InsertUserActivity): Promise<UserActivity> {
    const id = randomUUID();
    const activity: UserActivity = {
      id,
      userId: activityData.userId ?? null,
      activityType: activityData.activityType,
      activityData: activityData.activityData ?? {},
      metadata: activityData.metadata ?? {},
      createdAt: new Date(),
    };
    this.activities.set(id, activity);
    return activity;
  }

  async getUserAdminInfo(userId: string, category?: string): Promise<AdminInfo[]> {
    let adminInfos = Array.from(this.adminInfos.values()).filter(info => info.userId === userId);
    
    if (category) {
      adminInfos = adminInfos.filter(info => info.category === category);
    }
    
    return adminInfos;
  }

  async createAdminInfo(infoData: InsertAdminInfo): Promise<AdminInfo> {
    const id = randomUUID();
    const info: AdminInfo = {
      id,
      userId: infoData.userId ?? null,
      category: infoData.category,
      taskTitle: infoData.taskTitle,
      status: infoData.status ?? "pending",
      deadline: infoData.deadline ?? null,
      documents: infoData.documents ?? [],
      notes: infoData.notes ?? null,
      reminders: infoData.reminders ?? [],
      completedAt: infoData.completedAt ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.adminInfos.set(id, info);
    return info;
  }
}

export const storage = new MemStorage();

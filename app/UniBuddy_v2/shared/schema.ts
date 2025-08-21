import { sql, relations } from "drizzle-orm";
import {
  pgTable,
  text,
  varchar,
  integer,
  timestamp,
  jsonb,
  boolean,
  decimal,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table for authentication and basic profile
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  profileImageUrl: text("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Student profiles with detailed onboarding information
export const studentProfiles = pgTable("student_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id, { onDelete: "cascade" }),
  preferredName: text("preferred_name").notNull(),
  nationality: text("nationality").notNull(),
  nativeLanguage: text("native_language").notNull(),
  preferredLanguage: text("preferred_language").notNull(),
  koreanLevel: text("korean_level").notNull(), // beginner, intermediate, advanced
  topikLevel: text("topik_level"), // 1-6 or null
  department: text("department").notNull(),
  year: integer("year").notNull(),
  admissionYear: integer("admission_year").notNull(),
  koreaResidenceDuration: integer("korea_residence_duration").notNull(), // in months
  previousKoreaExperience: boolean("previous_korea_experience").default(false),
  culturalUnderstanding: integer("cultural_understanding").notNull(), // 1-5 scale
  learningGoals: jsonb("learning_goals").notNull(), // array of goals
  difficulties: jsonb("difficulties").notNull(), // array of difficulties
  learningStyle: text("learning_style").notNull(),
  notificationSettings: jsonb("notification_settings").default('{}'),
  completedOnboarding: boolean("completed_onboarding").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Lecture materials and analyses
export const lectures = pgTable("lectures", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  originalContent: text("original_content"),
  reformattedContent: jsonb("reformatted_content").notNull(), // includes summaries, translations, etc.
  fileUrl: text("file_url"),
  fileType: text("file_type"), // pdf, ppt, mp3, mp4, etc.
  courseName: text("course_name"),
  professorName: text("professor_name"),
  analysisStatus: text("analysis_status").default("pending"), // pending, processing, completed, failed
  keyTerms: jsonb("key_terms").default('[]'),
  quizQuestions: jsonb("quiz_questions").default('[]'),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Emotional analysis sessions
export const emotionalSessions = pgTable("emotional_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id, { onDelete: "cascade" }),
  sessionType: text("session_type").notNull(), // chat, voice, assessment
  emotionScores: jsonb("emotion_scores").notNull(), // depression, anxiety, stress, etc.
  conversationHistory: jsonb("conversation_history").default('[]'),
  recommendations: jsonb("recommendations").default('[]'),
  riskLevel: text("risk_level").default("low"), // low, medium, high, critical
  referralMade: boolean("referral_made").default(false),
  duration: integer("duration"), // in minutes
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Communication assistance requests
export const communicationRequests = pgTable("communication_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id, { onDelete: "cascade" }),
  requestType: text("request_type").notNull(), // email, presentation, question, apology, etc.
  targetAudience: text("target_audience").notNull(), // professor, peer, staff, etc.
  originalText: text("original_text").notNull(),
  improvedText: text("improved_text"),
  culturalNotes: jsonb("cultural_notes").default('[]'),
  pronunciationGuide: jsonb("pronunciation_guide").default('{}'),
  templates: jsonb("templates").default('[]'),
  feedback: text("feedback"),
  rating: integer("rating"), // 1-5 stars
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Community posts
export const communityPosts = pgTable("community_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id, { onDelete: "cascade" }),
  boardType: text("board_type").notNull(), // study_help, life_info, cultural_exchange, healing, etc.
  title: text("title").notNull(),
  content: text("content").notNull(),
  language: text("language").notNull(),
  isAnonymous: boolean("is_anonymous").default(false),
  tags: jsonb("tags").default('[]'),
  attachments: jsonb("attachments").default('[]'),
  likes: integer("likes").default(0),
  views: integer("views").default(0),
  isSticky: boolean("is_sticky").default(false),
  isLocked: boolean("is_locked").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Community comments
export const communityComments = pgTable("community_comments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  postId: varchar("post_id").references(() => communityPosts.id, { onDelete: "cascade" }),
  userId: varchar("user_id").references(() => users.id, { onDelete: "cascade" }),
  parentId: varchar("parent_id"), // Remove self-reference from table definition
  content: text("content").notNull(),
  language: text("language").notNull(),
  isAnonymous: boolean("is_anonymous").default(false),
  likes: integer("likes").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// User activities for tracking and analytics
export const userActivities = pgTable("user_activities", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id, { onDelete: "cascade" }),
  activityType: text("activity_type").notNull(), // lecture_upload, emotion_chat, communication_help, community_post, etc.
  activityData: jsonb("activity_data").default('{}'),
  metadata: jsonb("metadata").default('{}'),
  createdAt: timestamp("created_at").defaultNow(),
});

// Administrative information tracking
export const adminInfo = pgTable("admin_info", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id, { onDelete: "cascade" }),
  category: text("category").notNull(), // visa, housing, finance, health, work, emergency
  taskTitle: text("task_title").notNull(),
  status: text("status").default("pending"), // pending, in_progress, completed, expired
  deadline: timestamp("deadline"),
  documents: jsonb("documents").default('[]'),
  notes: text("notes"),
  reminders: jsonb("reminders").default('[]'),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Create insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  firstName: true,
  lastName: true,
  profileImageUrl: true,
});

export const upsertUserSchema = createInsertSchema(users).omit({
  createdAt: true,
  updatedAt: true,
});

export const insertStudentProfileSchema = createInsertSchema(studentProfiles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertLectureSchema = createInsertSchema(lectures).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertEmotionalSessionSchema = createInsertSchema(emotionalSessions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCommunicationRequestSchema = createInsertSchema(communicationRequests).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCommunityPostSchema = createInsertSchema(communityPosts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCommunityCommentSchema = createInsertSchema(communityComments).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertUserActivitySchema = createInsertSchema(userActivities).omit({
  id: true,
  createdAt: true,
});

export const insertAdminInfoSchema = createInsertSchema(adminInfo).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type UpsertUser = z.infer<typeof upsertUserSchema>;

export type StudentProfile = typeof studentProfiles.$inferSelect;
export type InsertStudentProfile = z.infer<typeof insertStudentProfileSchema>;

export type Lecture = typeof lectures.$inferSelect;
export type InsertLecture = z.infer<typeof insertLectureSchema>;

export type EmotionalSession = typeof emotionalSessions.$inferSelect;
export type InsertEmotionalSession = z.infer<typeof insertEmotionalSessionSchema>;

export type CommunicationRequest = typeof communicationRequests.$inferSelect;
export type InsertCommunicationRequest = z.infer<typeof insertCommunicationRequestSchema>;

export type CommunityPost = typeof communityPosts.$inferSelect;
export type InsertCommunityPost = z.infer<typeof insertCommunityPostSchema>;

export type CommunityComment = typeof communityComments.$inferSelect;
export type InsertCommunityComment = z.infer<typeof insertCommunityCommentSchema>;

export type UserActivity = typeof userActivities.$inferSelect;
export type InsertUserActivity = z.infer<typeof insertUserActivitySchema>;

export type AdminInfo = typeof adminInfo.$inferSelect;
export type InsertAdminInfo = z.infer<typeof insertAdminInfoSchema>;

// Relations
export const communityCommentsRelations = relations(communityComments, ({ one, many }) => ({
  post: one(communityPosts, { fields: [communityComments.postId], references: [communityPosts.id] }),
  user: one(users, { fields: [communityComments.userId], references: [users.id] }),
  parent: one(communityComments, { fields: [communityComments.parentId], references: [communityComments.id], relationName: "parentComment" }),
  replies: many(communityComments, { relationName: "parentComment" }),
}));

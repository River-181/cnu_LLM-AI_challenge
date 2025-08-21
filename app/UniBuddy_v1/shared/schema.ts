import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, jsonb, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const lectures = pgTable("lectures", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  subject: text("subject"),
  uploadDate: timestamp("upload_date").defaultNow(),
  status: text("status").notNull().default("uploaded"), // uploaded, processing, completed, failed
  progress: integer("progress").default(0),
  fileType: text("file_type").notNull(),
  fileName: text("file_name").notNull(),
  filePath: text("file_path").notNull(),
  fileSize: integer("file_size").notNull(),
  isStarred: boolean("is_starred").default(false),
  processedContent: jsonb("processed_content"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertLectureSchema = createInsertSchema(lectures).pick({
  title: true,
  subject: true,
  fileType: true,
  fileName: true,
  filePath: true,
  fileSize: true,
});

export const updateLectureSchema = createInsertSchema(lectures).pick({
  status: true,
  progress: true,
  processedContent: true,
  isStarred: true,
}).partial();

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Lecture = typeof lectures.$inferSelect;
export type InsertLecture = z.infer<typeof insertLectureSchema>;
export type UpdateLecture = z.infer<typeof updateLectureSchema>;

export const SUPPORTED_LANGUAGES = [
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'ms', name: 'Bahasa Melayu', flag: '🇲🇾' },
  { code: 'tl', name: 'Filipino', flag: '🇵🇭' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
  { code: 'ur', name: 'اردو', flag: '🇵🇰' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'fa', name: 'فارسی', flag: '🇮🇷' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
];

export interface ProcessedContent {
  summary: {
    ko: string;
    en: string;
    zh: string;
  };
  keyTerms: Array<{
    term: string;
    definition: {
      ko: string;
      en: string;
      zh: string;
    };
    context: {
      ko: string;
      en: string;
      zh: string;
    };
  }>;
  backgroundKnowledge: Array<{
    title: {
      ko: string;
      en: string;
      zh: string;
    };
    content: {
      ko: string;
      en: string;
      zh: string;
    };
  }>;
  quiz: Array<{
    question: {
      ko: string;
      en: string;
      zh: string;
    };
    options: {
      ko: string[];
      en: string[];
      zh: string[];
    };
    correct: number;
    explanation: {
      ko: string;
      en: string;
      zh: string;
    };
  }>;
  learningObjectives: {
    ko: string[];
    en: string[];
    zh: string[];
  };
  keywords: {
    ko: string[];
    en: string[];
    zh: string[];
  };
}

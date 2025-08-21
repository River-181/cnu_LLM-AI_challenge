import { 
  users, 
  lectures,
  type User, 
  type InsertUser, 
  type Lecture, 
  type InsertLecture,
  type UpdateLecture 
} from "@shared/schema";
import { eq, desc, ilike, or } from "drizzle-orm";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Lecture operations
  createLecture(lecture: InsertLecture): Promise<Lecture>;
  getLecture(id: string): Promise<Lecture | undefined>;
  getLectures(searchQuery?: string, subject?: string): Promise<Lecture[]>;
  updateLecture(id: string, updates: UpdateLecture): Promise<Lecture>;
  deleteLecture(id: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private lectures: Map<string, Lecture>;

  constructor() {
    this.users = new Map();
    this.lectures = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createLecture(insertLecture: InsertLecture): Promise<Lecture> {
    const id = randomUUID();
    const now = new Date();
    const lecture: Lecture = {
      ...insertLecture,
      id,
      uploadDate: now,
      status: "uploaded",
      progress: 0,
      isStarred: false,
      processedContent: null,
      createdAt: now,
      updatedAt: now,
    };
    this.lectures.set(id, lecture);
    return lecture;
  }

  async getLecture(id: string): Promise<Lecture | undefined> {
    return this.lectures.get(id);
  }

  async getLectures(searchQuery?: string, subject?: string): Promise<Lecture[]> {
    let lectures = Array.from(this.lectures.values());
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      lectures = lectures.filter(lecture => 
        lecture.title.toLowerCase().includes(query) ||
        lecture.fileName.toLowerCase().includes(query) ||
        lecture.subject?.toLowerCase().includes(query)
      );
    }
    
    if (subject) {
      lectures = lectures.filter(lecture => lecture.subject === subject);
    }
    
    return lectures.sort((a, b) => 
      new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
    );
  }

  async updateLecture(id: string, updates: UpdateLecture): Promise<Lecture> {
    const lecture = this.lectures.get(id);
    if (!lecture) {
      throw new Error("Lecture not found");
    }
    
    const updatedLecture: Lecture = {
      ...lecture,
      ...updates,
      updatedAt: new Date(),
    };
    
    this.lectures.set(id, updatedLecture);
    return updatedLecture;
  }

  async deleteLecture(id: string): Promise<void> {
    this.lectures.delete(id);
  }
}

export const storage = new MemStorage();

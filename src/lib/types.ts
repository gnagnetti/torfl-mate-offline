export type Level = "A1" | "A2" | "B1" | "B2" | "C1";
export const LEVELS: Level[] = ["A1", "A2", "B1", "B2", "C1"];
export const LEVEL_LABEL: Record<Level, string> = {
  A1: "Элементарный (ТЭУ)", A2: "Базовый (ТБУ)", B1: "ТРКИ-1", B2: "ТРКИ-2", C1: "ТРКИ-3",
};
export const LEVEL_ELO: Record<Level, number> = { A1: 900, A2: 1100, B1: 1300, B2: 1500, C1: 1700 };

export type Category = "grammar" | "lexicon" | "reading";
export const CATEGORY_LABEL: Record<Category, string> = {
  grammar: "Grammatica", lexicon: "Lessico", reading: "Lettura",
};

export interface Question {
  id: string;
  level: Level;
  category: Category;
  passage?: string;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface TestResult { bestScore: number; lastScore: number; passed: boolean; attempts: number }
export interface ItemAttempt { isCorrect: boolean; category: string; level: string; timestamp: number }

export interface UserProfile {
  id: string;
  username: string;
  avatar: string;
  currentLevel: Level;
  eloRating: number;
  totalPoints: number;
  streakDays: number;
  lastActiveDate: string;
  completedTests: Record<string, TestResult>;
  itemHistory: Record<string, ItemAttempt[]>;
  unlockedBadges: string[];
}

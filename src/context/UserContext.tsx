import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { Level, Question, UserProfile } from "@/lib/types";
import { LEVEL_ELO } from "@/lib/types";
import { BADGES } from "@/lib/badges";

const KEY = "trki-master:users";
const CUR = "trki-master:current";

interface Ctx {
  ready: boolean;
  users: UserProfile[];
  user: UserProfile | null;
  createUser: (username: string, avatar: string, level: Level) => void;
  selectUser: (id: string | null) => void;
  deleteUser: (id: string) => void;
  recordTest: (testId: string, items: { q: Question; correct: boolean }[], passMark: number) => { score: number; eloDelta: number; newBadges: string[] };
}

const UserCtx = createContext<Ctx | null>(null);
const today = () => new Date().toISOString().slice(0, 10);

export function UserProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try { setUsers(JSON.parse(localStorage.getItem(KEY) || "[]")); } catch { /* empty */ }
    setCurrentId(localStorage.getItem(CUR));
    setReady(true);
  }, []);

  const persist = (list: UserProfile[]) => { setUsers(list); localStorage.setItem(KEY, JSON.stringify(list)); };

  const selectUser = useCallback((id: string | null) => {
    setCurrentId(id);
    if (id) localStorage.setItem(CUR, id); else localStorage.removeItem(CUR);
  }, []);

  const createUser = (username: string, avatar: string, level: Level) => {
    const u: UserProfile = {
      id: crypto.randomUUID(), username, avatar, currentLevel: level, eloRating: 1200, totalPoints: 0,
      streakDays: 0, lastActiveDate: "", completedTests: {}, itemHistory: {}, unlockedBadges: [],
    };
    persist([...users, u]);
    selectUser(u.id);
  };

  const deleteUser = (id: string) => {
    persist(users.filter((u) => u.id !== id));
    if (currentId === id) selectUser(null);
  };

  const user = users.find((u) => u.id === currentId) ?? null;

  const recordTest: Ctx["recordTest"] = (testId, items, passMark) => {
    if (!user) return { score: 0, eloDelta: 0, newBadges: [] };
    const u: UserProfile = structuredClone(user);
    let elo = u.eloRating;
    for (const { q, correct } of items) {
      const exp = 1 / (1 + 10 ** ((LEVEL_ELO[q.level] - elo) / 400));
      elo += 24 * ((correct ? 1 : 0) - exp);
      (u.itemHistory[q.id] ||= []).push({ isCorrect: correct, category: q.category, level: q.level, timestamp: Date.now() });
    }
    const correctN = items.filter((i) => i.correct).length;
    const score = Math.round((correctN / Math.max(items.length, 1)) * 100);
    const eloDelta = Math.round(elo - u.eloRating);
    u.eloRating = Math.round(elo);
    u.totalPoints += correctN * 10 + (score === 100 ? 50 : 0);
    const prev = u.completedTests[testId];
    u.completedTests[testId] = {
      bestScore: Math.max(prev?.bestScore ?? 0, score), lastScore: score,
      passed: (prev?.passed ?? false) || score >= passMark, attempts: (prev?.attempts ?? 0) + 1,
    };
    const t = today();
    if (u.lastActiveDate !== t) {
      const y = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
      u.streakDays = u.lastActiveDate === y ? u.streakDays + 1 : 1;
      u.lastActiveDate = t;
    }
    const newBadges = BADGES.filter((b) => !u.unlockedBadges.includes(b.id) && b.test(u)).map((b) => b.id);
    u.unlockedBadges.push(...newBadges);
    persist(users.map((x) => (x.id === u.id ? u : x)));
    return { score, eloDelta, newBadges };
  };

  return (
    <UserCtx.Provider value={{ ready, users, user, createUser, selectUser, deleteUser, recordTest }}>
      {children}
    </UserCtx.Provider>
  );
}

export function useUser() {
  const c = useContext(UserCtx);
  if (!c) throw new Error("useUser outside provider");
  return c;
}

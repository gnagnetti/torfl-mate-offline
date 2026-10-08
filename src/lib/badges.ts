import type { UserProfile } from "./types";

export const BADGES: { id: string; name: string; desc: string; test: (u: UserProfile) => boolean }[] = [
  { id: "first", name: "Первый шаг", desc: "Completa il primo test", test: (u) => Object.keys(u.completedTests).length > 0 },
  { id: "perfect", name: "Отли́чно!", desc: "Ottieni 100% in un test", test: (u) => Object.values(u.completedTests).some((t) => t.bestScore === 100) },
  { id: "streak3", name: "Упо́рство", desc: "3 giorni consecutivi", test: (u) => u.streakDays >= 3 },
  { id: "points500", name: "Копи́лка", desc: "500 punti totali", test: (u) => u.totalPoints >= 500 },
  { id: "elo1400", name: "Мастер", desc: "Elo ≥ 1400", test: (u) => u.eloRating >= 1400 },
  { id: "exam", name: "Сертифика́т", desc: "Supera una simulazione d'esame", test: (u) => Object.entries(u.completedTests).some(([k, t]) => k.startsWith("exam-") && t.passed) },
];

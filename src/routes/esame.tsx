import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Quiz } from "@/components/Quiz";
import { useUser } from "@/context/UserContext";
import { QUESTIONS, shuffle } from "@/lib/questions";
import { LEVELS, LEVEL_LABEL, type Level } from "@/lib/types";

export const Route = createFileRoute("/esame")({
  head: () => ({
    meta: [
      { title: "Simulazione d'esame — ТРКИ Master" },
      { name: "description", content: "Simulazione cronometrata dell'esame ТРКИ / TORFL con soglia di superamento al 66%." },
      { property: "og:title", content: "Simulazione d'esame — ТРКИ Master" },
      { property: "og:description", content: "Simula l'esame ТРКИ dal livello A1 al C1." },
    ],
  }),
  component: () => <AppShell><Exam /></AppShell>,
});

function Exam() {
  const { user } = useUser();
  const [level, setLevelRaw] = useState<Level | null>(null);
  const [qs, setQs] = useState<typeof QUESTIONS>([]);
  const setLevel = (l: Level | null) => { if (l) setQs(shuffle(QUESTIONS.filter((q) => q.level === l))); setLevelRaw(l); };
  if (level) {
    return <Quiz testId={`exam-${level}`} title={`Esame ${level}`} questions={qs} passMark={66} timeLimit={qs.length * 60} feedback={false} onExit={() => setLevel(null)} />;
  }
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Simulazione d'esame</h1>
      <p className="flex items-center gap-2 rounded-md bg-warning/20 p-3 text-sm"><AlertTriangle size={16} className="text-warning" />Nessuna correzione durante la prova. 1 minuto per domanda, soglia 66%.</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {LEVELS.map((l) => {
          const t = user?.completedTests[`exam-${l}`];
          return (
            <div key={l} className="panel p-5">
              <div className="font-serif text-3xl font-semibold text-primary">{l}</div>
              <div className="text-sm text-muted-foreground">{LEVEL_LABEL[l]}</div>
              <div className="mt-2 text-sm">{t ? <>Tentativi: {t.attempts} · Migliore: <span className={t.passed ? "text-success" : "text-destructive"}>{t.bestScore}%</span></> : "Mai tentato"}</div>
              <button className="btn btn-primary mt-4 w-full" onClick={() => setLevel(l)}>Inizia esame</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

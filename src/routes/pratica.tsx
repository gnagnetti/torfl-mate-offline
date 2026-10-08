import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Quiz } from "@/components/Quiz";
import { useUser } from "@/context/UserContext";
import { QUESTIONS, shuffle } from "@/lib/questions";
import { CATEGORY_LABEL, LEVELS, type Category, type Level, type Question } from "@/lib/types";

export const Route = createFileRoute("/pratica")({
  head: () => ({
    meta: [
      { title: "Pratica — ТРКИ Master" },
      { name: "description", content: "Esercizi di grammatica, lessico e lettura russa per livello con correzione immediata." },
      { property: "og:title", content: "Pratica — ТРКИ Master" },
      { property: "og:description", content: "Esercizi ТРКИ per livello e categoria con spiegazioni." },
    ],
  }),
  component: () => <AppShell><Practice /></AppShell>,
});

function Practice() {
  const { user } = useUser();
  const [level, setLevel] = useState<Level>(user?.currentLevel ?? "A1");
  const [cat, setCat] = useState<Category | "all">("all");
  const [run, setRun] = useState<Question[] | null>(null);

  if (run) return <Quiz testId={`practice-${level}-${cat}`} title={`Pratica ${level}`} questions={run} passMark={66} feedback onExit={() => setRun(null)} />;

  const pool = QUESTIONS.filter((q) => q.level === level && (cat === "all" || q.category === cat));
  const start = () => {
    const hist = user?.itemHistory ?? {};
    // prioritise items answered wrong last time or never seen
    const weight = (q: Question) => { const h = hist[q.id]; return !h ? 1 : h[h.length - 1].isCorrect ? 0 : 2; };
    setRun(shuffle(pool).sort((a, b) => weight(b) - weight(a)).slice(0, 10));
  };

  return (
    <div className="panel mx-auto max-w-2xl p-6">
      <h1 className="text-3xl font-semibold">Pratica guidata</h1>
      <div className="mt-6 text-sm font-medium">Livello</div>
      <div className="mt-2 flex flex-wrap gap-2">{LEVELS.map((l) => <button key={l} className={`btn ${l === level ? "btn-primary" : "btn-outline"}`} onClick={() => setLevel(l)}>{l}</button>)}</div>
      <div className="mt-4 text-sm font-medium">Categoria</div>
      <div className="mt-2 flex flex-wrap gap-2">
        {(["all", "grammar", "lexicon", "reading"] as const).map((c) => <button key={c} className={`btn ${c === cat ? "btn-primary" : "btn-outline"}`} onClick={() => setCat(c)}>{c === "all" ? "Tutte" : CATEGORY_LABEL[c]}</button>)}
      </div>
      <p className="mt-4 text-sm text-muted-foreground">{pool.length} domande disponibili · priorità agli errori recenti</p>
      <button className="btn btn-primary mt-6" disabled={!pool.length} onClick={start}>Inizia</button>
    </div>
  );
}

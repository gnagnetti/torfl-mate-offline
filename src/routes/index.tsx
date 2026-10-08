import { createFileRoute, Link } from "@tanstack/react-router";
import { Target, GraduationCap, Award, Lock } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useUser } from "@/context/UserContext";
import { BADGES } from "@/lib/badges";
import { LEVELS, LEVEL_LABEL } from "@/lib/types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ТРКИ Master — Preparazione esami di russo TORFL" },
      { name: "description", content: "Esercitati e simula gli esami ТРКИ / TORFL di lingua russa dal livello A1 al C1, tutto nel browser." },
      { property: "og:title", content: "ТРКИ Master — Preparazione esami di russo TORFL" },
      { property: "og:description", content: "Pratica e simulazioni ТРКИ A1–C1 con statistiche locali." },
    ],
  }),
  component: () => <AppShell><Dashboard /></AppShell>,
});

function Dashboard() {
  const { user } = useUser();
  if (!user) return null;
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-muted-foreground">Здра́вствуйте,</p>
        <h1 className="text-4xl font-semibold">{user.username}</h1>
      </div>
      <div className="grid gap-4 sm:grid-cols-4">
        {[["Livello", user.currentLevel], ["Elo", user.eloRating], ["Punti", user.totalPoints], ["Serie (giorni)", user.streakDays]].map(([k, v]) => (
          <div key={k} className="panel p-5"><div className="text-xs uppercase tracking-wider text-muted-foreground">{k}</div><div className="mt-1 font-serif text-3xl font-semibold text-primary">{v}</div></div>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Link to="/pratica" className="panel flex gap-4 p-6 hover:border-primary"><Target className="text-primary" /><div><h2 className="text-xl font-semibold">Pratica guidata</h2><p className="text-sm text-muted-foreground">Esercizi per categoria con spiegazioni immediate.</p></div></Link>
        <Link to="/esame" className="panel flex gap-4 p-6 hover:border-primary"><GraduationCap className="text-primary" /><div><h2 className="text-xl font-semibold">Simulazione d'esame</h2><p className="text-sm text-muted-foreground">Test cronometrato, soglia di superamento 66%.</p></div></Link>
      </div>
      <section>
        <h2 className="text-xl font-semibold">Percorso di certificazione</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-5">
          {LEVELS.map((l) => {
            const t = user.completedTests[`exam-${l}`];
            return <div key={l} className={`panel p-4 ${t?.passed ? "border-success" : ""}`}><div className="font-serif text-2xl font-semibold">{l}</div><div className="text-xs text-muted-foreground">{LEVEL_LABEL[l]}</div><div className={`mt-2 text-sm ${t?.passed ? "text-success" : "text-muted-foreground"}`}>{t ? `Migliore: ${t.bestScore}%` : "Non tentato"}</div></div>;
          })}
        </div>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Badge</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {BADGES.map((b) => {
            const on = user.unlockedBadges.includes(b.id);
            return <div key={b.id} className={`panel flex items-center gap-3 p-4 ${on ? "" : "opacity-50"}`}>{on ? <Award className="text-warning" /> : <Lock className="text-muted-foreground" />}<div><div className="font-medium">{b.name}</div><div className="text-xs text-muted-foreground">{b.desc}</div></div></div>;
          })}
        </div>
      </section>
    </div>
  );
}

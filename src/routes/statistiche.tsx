import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useUser } from "@/context/UserContext";
import { CATEGORY_LABEL, LEVELS, type Category } from "@/lib/types";

export const Route = createFileRoute("/statistiche")({
  head: () => ({
    meta: [
      { title: "Statistiche — ТРКИ Master" },
      { name: "description", content: "Analisi dei tuoi progressi in russo per livello e categoria." },
      { property: "og:title", content: "Statistiche — ТРКИ Master" },
      { property: "og:description", content: "Precisione per livello e categoria, cronologia dei test." },
    ],
  }),
  component: () => <AppShell><Stats /></AppShell>,
});

function Bar({ label, ok, total }: { label: string; ok: number; total: number }) {
  const p = total ? Math.round((ok / total) * 100) : 0;
  const color = !total ? "bg-muted" : p >= 66 ? "bg-success" : p >= 40 ? "bg-warning" : "bg-destructive";
  return (
    <div>
      <div className="flex justify-between text-sm"><span>{label}</span><span className="text-muted-foreground">{total ? `${p}% (${ok}/${total})` : "—"}</span></div>
      <div className="mt-1 h-2 rounded bg-muted"><div className={`h-full rounded ${color}`} style={{ width: `${p}%` }} /></div>
    </div>
  );
}

function Stats() {
  const { user } = useUser();
  if (!user) return null;
  const all = Object.values(user.itemHistory).flat();
  const agg = (f: (a: (typeof all)[number]) => boolean) => { const s = all.filter(f); return { ok: s.filter((a) => a.isCorrect).length, total: s.length }; };
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Statistiche</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="panel space-y-4 p-6"><h2 className="text-lg font-semibold">Per categoria</h2>
          {(Object.keys(CATEGORY_LABEL) as Category[]).map((c) => <Bar key={c} label={CATEGORY_LABEL[c]} {...agg((a) => a.category === c)} />)}
        </div>
        <div className="panel space-y-4 p-6"><h2 className="text-lg font-semibold">Per livello</h2>
          {LEVELS.map((l) => <Bar key={l} label={l} {...agg((a) => a.level === l)} />)}
        </div>
      </div>
      <div className="panel p-6">
        <h2 className="text-lg font-semibold">Test completati</h2>
        {Object.keys(user.completedTests).length === 0 ? <p className="mt-2 text-sm text-muted-foreground">Nessun test ancora.</p> : (
          <table className="mt-3 w-full text-sm">
            <thead className="text-left text-muted-foreground"><tr><th className="py-1">Test</th><th>Tentativi</th><th>Ultimo</th><th>Migliore</th><th>Esito</th></tr></thead>
            <tbody>{Object.entries(user.completedTests).map(([k, t]) => (
              <tr key={k} className="border-t"><td className="py-2">{k}</td><td>{t.attempts}</td><td>{t.lastScore}%</td><td>{t.bestScore}%</td><td className={t.passed ? "text-success" : "text-destructive"}>{t.passed ? "Superato" : "Non superato"}</td></tr>
            ))}</tbody>
          </table>
        )}
      </div>
    </div>
  );
}

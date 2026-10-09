import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Clock, Award } from "lucide-react";
import type { Question } from "@/lib/types";
import { CATEGORY_LABEL } from "@/lib/types";
import { BADGES } from "@/lib/badges";
import { useUser } from "@/context/UserContext";

interface Props { testId: string; title: string; questions: Question[]; passMark: number; timeLimit?: number; feedback: boolean; onExit: () => void }

export function Quiz({ testId, title, questions, passMark, timeLimit, feedback, onExit }: Props) {
  const { recordTest } = useUser();
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null));
  const [revealed, setRevealed] = useState(false);
  const [left, setLeft] = useState(timeLimit ?? 0);
  const [result, setResult] = useState<ReturnType<typeof recordTest> | null>(null);

  const finish = () => {
    if (result) return;
    setResult(recordTest(testId, questions.map((q, k) => ({ q, correct: answers[k] === q.answer })), passMark));
  };

  useEffect(() => {
    if (!timeLimit || result) return;
    if (left <= 0) { finish(); return; }
    const t = setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  });

  const q = questions[i]!;
  const choose = (k: number) => {
    if (feedback && revealed) return;
    setAnswers((a) => a.map((v, j) => (j === i ? k : v)));
    if (feedback) setRevealed(true);
  };
  const next = () => { setRevealed(false); if (i < questions.length - 1) setI(i + 1); else finish(); };

  if (result) {
    const passed = result.score >= passMark;
    return (
      <div className="space-y-6">
        <div className="panel p-8 text-center">
          <div className={`text-6xl font-serif font-semibold ${passed ? "text-success" : "text-destructive"}`}>{result.score}%</div>
          <p className="mt-2 text-lg">{passed ? "Сда́но! Test superato." : `Non superato — soglia ${passMark}%`}</p>
          <p className="mt-1 text-sm text-muted-foreground">Elo {result.eloDelta >= 0 ? "+" : ""}{result.eloDelta}</p>
          {result.newBadges.length > 0 && (
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {result.newBadges.map((b) => <span key={b} className="flex items-center gap-1 rounded-full bg-warning px-3 py-1 text-sm text-warning-foreground"><Award size={14} />{BADGES.find((x) => x.id === b)?.name}</span>)}
            </div>
          )}
          <button className="btn btn-primary mt-6" onClick={onExit}>Torna indietro</button>
        </div>
        <div className="space-y-3">
          {questions.map((x, k) => {
            const ok = answers[k] === x.answer;
            return (
              <div key={x.id} className="panel p-4 text-sm">
                <div className="flex gap-2">{ok ? <CheckCircle2 className="shrink-0 text-success" size={18} /> : <XCircle className="shrink-0 text-destructive" size={18} />}<span className="font-medium">{x.prompt}</span></div>
                <div className="mt-1 pl-7 text-muted-foreground">Risposta: <span className="text-success">{x.options[x.answer]}</span>{!ok && answers[k] != null && <> · tua: <span className="text-destructive">{x.options[answers[k]!]}</span></>} — {x.explanation}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
        <span>{title} · {i + 1}/{questions.length}</span>
        {timeLimit ? <span className={`flex items-center gap-1 ${left < 60 ? "text-warning" : ""}`}><Clock size={14} />{Math.floor(left / 60)}:{String(left % 60).padStart(2, "0")}</span> : null}
      </div>
      <div className="h-1.5 rounded bg-muted"><div className="h-full rounded bg-primary transition-all" style={{ width: `${(i / questions.length) * 100}%` }} /></div>
      <div className="panel mt-6 p-6">
        <span className="text-xs uppercase tracking-wider text-muted-foreground">{q.level} · {CATEGORY_LABEL[q.category]}</span>
        {q.passage && <p className="mt-3 rounded-md bg-muted p-4 font-serif leading-relaxed">{q.passage}</p>}
        <p className="mt-4 text-lg font-medium">{q.prompt}</p>
        <div className="mt-4 grid gap-2">
          {q.options.map((o, k) => {
            let cls = "btn-outline";
            if (feedback && revealed) cls = k === q.answer ? "bg-success text-success-foreground" : k === answers[i] ? "bg-destructive text-destructive-foreground" : "btn-outline";
            else if (answers[i] === k) cls = "btn-primary";
            return <button key={k} onClick={() => choose(k)} className={`btn ${cls} !justify-start text-left text-base`}>{String.fromCharCode(1040 + k)}) {o}</button>;
          })}
        </div>
        {feedback && revealed && <p className="mt-4 rounded-md bg-accent p-3 text-sm">{q.explanation}</p>}
        <div className="mt-6 flex justify-between">
          <button className="btn btn-outline" onClick={onExit}>Esci</button>
          <button className="btn btn-primary" disabled={answers[i] == null} onClick={next}>{i < questions.length - 1 ? "Avanti" : "Termina"}</button>
        </div>
      </div>
    </div>
  );
}

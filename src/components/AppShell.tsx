import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { LogOut, Flame, Trophy } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { Avatar } from "./Avatar";
import { Welcome } from "./Welcome";

const nav = [
  { to: "/", label: "Dashboard" },
  { to: "/pratica", label: "Pratica" },
  { to: "/esame", label: "Simulazione" },
  { to: "/statistiche", label: "Statistiche" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const { ready, user, selectUser } = useUser();
  if (!ready) return <div className="min-h-screen" />;
  if (!user) return <Welcome />;
  return (
    <div className="min-h-screen">
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-4 py-3">
          <Link to="/" className="font-serif text-xl font-semibold text-primary">ТРКИ Master</Link>
          <nav className="flex flex-wrap gap-1 text-sm">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} activeOptions={{ exact: true }} className="rounded-md px-3 py-1.5 text-muted-foreground hover:bg-muted" activeProps={{ className: "bg-accent text-accent-foreground font-medium" }}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1 text-warning-foreground"><Flame size={16} className="text-warning" />{user.streakDays}</span>
            <span className="flex items-center gap-1"><Trophy size={16} className="text-primary" />{user.eloRating}</span>
            <Avatar name={user.avatar} size={14} />
            <span className="font-medium">{user.username}</span>
            <button className="btn btn-outline !px-2 !py-1" onClick={() => selectUser(null)} title="Cambia utente"><LogOut size={16} /></button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}

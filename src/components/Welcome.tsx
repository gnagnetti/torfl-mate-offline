import { useState } from "react";
import { Trash2, Plus } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { LEVELS, type Level } from "@/lib/types";
import { AVATARS, Avatar } from "./Avatar";

export function Welcome() {
  const { users, selectUser, createUser, deleteUser } = useUser();
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("book");
  const [level, setLevel] = useState<Level>("A1");

  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <p className="text-sm uppercase tracking-widest text-muted-foreground">Тест по ру́сскому языку́ как иностра́нному</p>
      <h1 className="mt-2 text-5xl font-semibold text-primary">ТРКИ Master</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">Preparazione e simulazione degli esami ТРКИ / TORFL dal livello A1 al C1. Tutti i dati restano nel tuo browser.</p>

      {users.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold">Scegli un profilo</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {users.map((u) => (
              <div key={u.id} className="panel flex items-center gap-3 p-4">
                <button className="flex flex-1 items-center gap-3 text-left" onClick={() => selectUser(u.id)}>
                  <Avatar name={u.avatar} />
                  <div>
                    <div className="font-medium">{u.username}</div>
                    <div className="text-xs text-muted-foreground">{u.currentLevel} · Elo {u.eloRating}</div>
                  </div>
                </button>
                <button className="text-muted-foreground hover:text-destructive" onClick={() => confirm(`Eliminare ${u.username}?`) && deleteUser(u.id)}><Trash2 size={16} /></button>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="panel mt-10 p-6">
        <h2 className="text-xl font-semibold">Nuovo profilo</h2>
        <label className="mt-4 block text-sm font-medium">Nome utente</label>
        <input value={name} onChange={(e) => setName(e.target.value)} maxLength={30} className="mt-1 w-full rounded-md border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring" placeholder="Es. Luca" />
        <div className="mt-4 text-sm font-medium">Avatar</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {Object.keys(AVATARS).map((a) => (
            <button key={a} onClick={() => setAvatar(a)} className={`rounded-full p-0.5 ring-2 ${avatar === a ? "ring-primary" : "ring-transparent"}`}><Avatar name={a} /></button>
          ))}
        </div>
        <div className="mt-4 text-sm font-medium">Livello iniziale</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {LEVELS.map((l) => (
            <button key={l} onClick={() => setLevel(l)} className={`btn ${level === l ? "btn-primary" : "btn-outline"}`}>{l}</button>
          ))}
        </div>
        <button className="btn btn-primary mt-6" disabled={!name.trim()} onClick={() => createUser(name.trim(), avatar, level)}><Plus size={16} />Crea e inizia</button>
      </section>
    </div>
  );
}

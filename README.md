# Torfl Mate Offline

Crea un'applicazione web completa, reattiva e modulare per la preparazione e simulazione degli esami di certificazione di lingua russa ТРКИ / TORFL (livelli A1, A2, B1, B2, C1), denominata "ТРКИ Master".

L'applicazione deve essere 100% CLIENT-SIDE (ZERO API esterne, ZERO database remoti, ZERO dipendenze da server o chiavi API). 

Tutto lo stato applicativo, i profili utente, i progressi e le statistiche devono essere persistiti in locale tramite LocalStorage/IndexedDB.

L'interfaccia deve essere realizzata con React (Vite + TypeScript), Tailwind CSS, Lucide Icons e componenti shadcn/ui, con pieno supporto per caratteri cirillici con accento tonico (combining acute accent U+0301). Design accademico, pulito e moderno (Slate/Navy Blue, Emerald per il corretto, Crimson per l'errore, Amber per gli avvisi).

---

### 1. GESTIONE UTENTI LOCALE E DATA LIFECYCLE (SENZA BACKEND)

Implementa un gestore utenti locale (`UserContext` + `LocalStorage`):

1. **Selezione e Creazione Utente:**

   - Schermata di benvenuto con possibilità di:

     - Creare un nuovo profilo (Nome utente, Avatar a scelta tra 8 icone, Livello iniziale di studio: A1, A2, B1, B2, C1).

     - Selezionare un profilo esistente da una lista a schede.

     - Cambiare utente in qualsiasi momento dalla barra di navigazione.

2. **Struttura Dati Utente salvata in LocalStorage:**

   ```typescript

   interface UserProfile {

     id: string;

     username: string;

     avatar: string;

     currentLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

     eloRating: number; // default 1200

     totalPoints: number;

     streakDays: number;

     lastActiveDate: string;

     completedTests: Record<string, { bestScore: number; lastScore: number; passed: boolean; attempts: number }>;

     itemHistory: Record<string, { isCorrect: boolean; category: string; level: string; timestamp: number }[]>;

     unlockedBadges: string[]; // id dei badge sbloccati

   } Crea un'applicazione web completa, reattiva e modulare per la preparazione e simulazione degli esami di certificazione di lingua russa ТРКИ / TORFL (livelli A1, A2, B1, B2, C1), denominata "ТРКИ Master".

L'applicazione deve essere 100% CLIENT-SIDE (ZERO API esterne, ZERO database remoti, ZERO dipendenze da server o chiavi API). 

Tutto lo stato applicativo, i profili utente, i progressi e le statistiche devono essere persistiti in locale tramite LocalStorage/IndexedDB.

L'interfaccia deve essere realizzata con React (Vite + TypeScript), Tailwind CSS, Lucide Icons e componenti shadcn/ui, con pieno supporto per caratteri cirillici con accento tonico (combining acute accent U+0301). Design accademico, pulito e moderno (Slate/Navy Blue, Emerald per il corretto, Crimson per l'errore, Amber per gli avvisi).

---

### 1. GESTIONE UTENTI LOCALE E DATA LIFECYCLE (SENZA BACKEND)

Implementa un gestore utenti locale (`UserContext` + `LocalStorage`):

1. **Selezione e Creazione Utente:**

   - Schermata di benvenuto con possibilità di:

     - Creare un nuovo profilo (Nome utente, Avatar a scelta tra 8 icone, Livello iniziale di studio: A1, A2, B1, B2, C1).

     - Selezionare un profilo esistente da una lista a schede.

     - Cambiare utente in qualsiasi momento dalla barra di navigazione.

2. **Struttura Dati Utente salvata in LocalStorage:**

   ```typescript

   interface UserProfile {

     id: string;

     username: string;

     avatar: string;

     currentLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

     eloRating: number; // default 1200

     totalPoints: number;

     streakDays: number;

     lastActiveDate: string;

     completedTests: Record<string, { bestScore: number; lastScore: number; passed: boolean; attempts: number }>;

     itemHistory: Record<string, { isCorrect: boolean; category: string; level: string; timestamp: number }[]>;

     unlockedBadges: string[]; // id dei badge sbloccati

   }

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://torfl-mate-offline.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/57979ca6-d8ba-414e-8163-15721ea44b3e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

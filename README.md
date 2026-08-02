# ERP Clients

ERP interne pour piloter plusieurs clients : centralisation des mails (via une
boîte générique qui reçoit les transferts), suivi des réunions, et **todo
quotidienne générée par Claude**.

> **État actuel : Phase 1 (socle).** L'interface, le modèle de données, le login
> et les écrans sont en place, alimentés par des données d'exemple (seed).
> L'ingestion des vrais mails (Phase 2) et la génération IA de la todo (Phase 3)
> viennent ensuite.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Prisma** + **PostgreSQL** (Neon ou Supabase)
- Authentification par mot de passe unique (cookie signé JWT)
- Déploiement **Vercel**

---

## ✅ À faire quand tu es au PC (mise en route)

### 1. Créer la base de données Postgres

Sur **[Neon](https://neon.tech)** (gratuit) ou **[Supabase](https://supabase.com)** :
crée un projet, puis récupère les deux chaînes de connexion :

- une **poolée** → `DATABASE_URL`
- une **directe** → `DIRECT_URL`

### 2. Configurer les variables d'environnement

Copie `.env.example` en `.env` et renseigne :

```bash
cp .env.example .env
```

- `DATABASE_URL` et `DIRECT_URL` : cf. étape 1
- `APP_PASSWORD` : ton mot de passe pour te connecter à l'ERP
- `AUTH_SECRET` : une longue chaîne aléatoire →
  ```bash
  openssl rand -base64 32
  ```

### 3. Installer, créer les tables, remplir les données d'exemple

```bash
npm install
npm run db:push      # crée les tables dans Postgres
npm run db:seed      # insère 3 clients + mails/réunions/todo d'exemple
```

### 4. Lancer en local

```bash
npm run dev
```

Ouvre http://localhost:3000 → tu arrives sur le login. Entre ton `APP_PASSWORD`.

### 5. Déployer sur Vercel

1. Pousse ce repo sur GitHub (déjà fait si tu lis ceci depuis GitHub).
2. Sur [Vercel](https://vercel.com), **Add New → Project**, importe le repo.
3. Dans **Settings → Environment Variables**, ajoute les mêmes variables que
   dans ton `.env` (`DATABASE_URL`, `DIRECT_URL`, `APP_PASSWORD`, `AUTH_SECRET`).
4. Déploie. Vercel lance `prisma generate && next build` automatiquement.

> ⚠️ Le `db:push` et le `db:seed` se lancent **depuis ta machine** (étape 3),
> pas par Vercel. Vercel se contente de servir l'app connectée à la même base.

---

## 🔜 Prochaines phases

- **Phase 2 — Ingestion.** Lecture de la boîte générique (IMAP/API), attribution
  de chaque mail au bon client, parsing des invitations `.ics` → réunions.
- **Phase 3 — Todo IA.** Job quotidien (Vercel Cron) qui appelle Claude (SDK
  Anthropic, clé API) pour générer la todo du jour à partir des mails des
  dernières 24 h et des réunions du jour.

## Structure

```
app/
  login/            écran de connexion (+ action serveur)
  (app)/            zone protégée (sidebar)
    page.tsx        tableau de bord (todo + réunions + mails du jour)
    clients/        gestion des clients
    emails/         liste des mails, filtrable par client
    meetings/       réunions à venir
  api/logout/       déconnexion
lib/
  db.ts             client Prisma (singleton)
  auth.ts           session (cookie JWT signé)
  format.ts         helpers de dates
prisma/
  schema.prisma     modèle de données
  seed.ts           données d'exemple
middleware.ts       protège les routes (redirige vers /login)
```

## Sécurité

- L'ERP contient les mails de tes clients → il reste **privé**, derrière login.
- Les secrets (base, `AUTH_SECRET`, plus tard clé Anthropic et accès à la boîte)
  vivent uniquement dans les variables d'environnement, **jamais** dans le code.

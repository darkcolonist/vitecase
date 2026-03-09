# ⚡ ViteCase

**The Firestarter Bootstrap** | A high-performance, schema-first Vue 3 + Vite foundation.
Designed for **Static Hosting on Cloudflare Pages** with a **Supabase custom-schema** backend.

---

## 🏗️ The ViteCase Stack

* **Frontend:** Vue 3 (Composition API) + Vite + PrimeVue (Sakai Admin UI).
* **Database:** Supabase with `vitecase` custom schema (No prefixes!).
* **Serverless:** Deno-based Edge Functions for dynamic logic.
* **Deployment:** Cloudflare Pages (Pure Static SPA).

---

## 🚀 Quick Start (Local Development)

### 1. Installation

```bash
# Clone and install
git clone [https://github.com/YOUR_USERNAME/ViteCase.git](https://github.com/YOUR_USERNAME/ViteCase.git)
cd ViteCase
npm install

```

### 2. Supabase Production Setup
To transition from Demo Mode to your real database, follow these steps:

#### A. Configure Environment
Create a `.env` file (copy from `.env.example`). **You must populate these variables, otherwise the setup scripts will fail:**
*   `VITE_SUPABASE_URL`: Your project URL.
*   `VITE_SUPABASE_PUBLISHABLE_KEY`: Your project anon key.
*   `VITE_SUPABASE_SCHEMA`: Your target schema name (e.g., `vitecase_prod`).

#### B. Connect via CLI
```bash
# Login to Supabase
npx supabase login

# Link your local project to your Supabase project ID
npx supabase link --project-ref your-project-id
```

#### C. Generate & Push Schema
ViteCase uses a dynamic migration system to handle your custom schema name.
```bash
# 1. Generate the migration file based on your .env
npm run db:setup

# 2. Push the schema to your live database
npx supabase db push
```

#### D. Essential Dashboard Settings
After pushing the schema, you **must** manually enable it in the Supabase Dashboard:
1.  **API Settings:** Go to *Settings > API > Exposed Schemas* and add your custom schema name.
2.  **SQL Permissions:** Run the following in the *SQL Editor* to allow the API to access your schema:
```sql
GRANT USAGE ON SCHEMA your_schema_name TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA your_schema_name TO authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA your_schema_name TO anon;
```

### 3. Run the App
```bash
npm run dev
```
*The app will automatically detect your Supabase credentials and disable Demo Mode.*

---

## 🔐 Database & Schema Strategy

ViteCase moves away from "MySQL-barbaric" table prefixing. All application data lives in a dedicated schema (defaults to `vitecase`).

* **Schema:** `vitecase` (Configurable via `VITE_SUPABASE_SCHEMA`)
* **Tables:** `profiles`, `workspace_settings`
* **Auth:** Managed via `auth.users` with RLS triggers to sync with the application schema.

To add new tables, add a migration in `/supabase/migrations/` and ensure you grant usage:

```sql
GRANT USAGE ON SCHEMA vitecase TO anon, authenticated;

```

---

## ⚡ Edge Functions

Edge functions are located in `/supabase/functions`. These handle logic that shouldn't be on the client (e.g., Stripe, Admin tasks).

**Deploying Functions:**

```bash
# Link to your Supabase project first
npx supabase link --project-ref your-project-id

# Deploy a specific function
npx supabase functions deploy health-check

```

---

## ☁️ Cloudflare Pages Deployment

This project is optimized for "Build from Git" on Cloudflare.

### Deployment Settings:

1. **Framework Preset:** `None`
2. **Build Command:** `npm run build`
3. **Build Output Directory:** `dist`
4. **Root Directory:** `/` (default)
5. **Node.js Version:** `18` or higher (Set in Settings > Environment Variables)

### Environment Variables:

Add these in the Cloudflare Dashboard under **Settings > Environment Variables > [Both Production & Preview]**:

* `VITE_SUPABASE_URL`: Your Supabase Project URL.
* `VITE_SUPABASE_PUBLISHABLE_KEY`: Your Supabase Publishable Key.
* `VITE_SUPABASE_SCHEMA`: Your custom database schema (defaults to `vitecase`).
* `NODE_VERSION`: `20` (Recommended for Vite 5 performance).

### The SPA Fix:

This repo includes a `public/_redirects` file. Cloudflare uses this to route all deep links to `index.html`, allowing `vue-router` to handle navigation without 404s.

---

## 📚 Documentation

Detailed guides are available in the `./docs/` folder:
- **Architecture Overview:** Details the schema-first setup and deployment strategy in `./docs/architecture.md`.
- **AI Agent Guidelines:** Strict standards for RLS, grants, and database isolation in `./docs/ai-agent-guidelines.md`.

---

## 📝 License

MIT

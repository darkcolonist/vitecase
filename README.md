# ⚡ ViteCase

**The Firestarter Bootstrap** | A high-performance, schema-first Vue 3 + Vite foundation.
Designed for **Static Hosting on Cloudflare Pages** with a **Supabase custom-schema** backend.

---

## 🏗️ The ViteCase Stack

* **Frontend:** Vue 3 (Composition API) + Vite (Ultra-fast HMR).
* **Database:** Supabase with `app_data` custom schema (No prefixes!).
* **Serverless:** Deno-based Edge Functions for dynamic logic.
* **Deployment:** Cloudflare Pages (Pure Static SPA).

---

## 🚀 Quick Start (Local Development)

### 1. Installation

```bash
# Clone and install
git clone [https://github.com/YOUR_USERNAME/ViteCase.git](https://github.com/YOUR_USERNAME/ViteCase.git)
cd ViteCase
pnpm install

```

### 2. Local Supabase Setup (Optional for Demo)

If you want to test the full-stack logic locally:

```bash
# Initialize Supabase
npx supabase start

# Apply schema-first migrations
npx supabase migration up

```

### 3. Run the App

```bash
pnpm dev

```

*Note: If no Supabase environment variables are detected, the app will gracefully fall back to a "Demo Mode" UI.*

---

## 🔐 Database & Schema Strategy

ViteCase moves away from "MySQL-barbaric" table prefixing. All application data lives in the `app_data` schema.

* **Schema:** `app_data`
* **Tables:** `profiles`, `workspace_settings`
* **Auth:** Managed via `auth.users` with RLS triggers to sync with `app_data.profiles`.

To add new tables, add a migration in `/supabase/migrations/` and ensure you grant usage:

```sql
GRANT USAGE ON SCHEMA app_data TO anon, authenticated;

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

1. **Framework Preset:** `Vite`
2. **Build Command:** `pnpm run build`
3. **Build Output Directory:** `dist`
4. **Root Directory:** `/`

### Environment Variables:

Add these in the Cloudflare Dashboard under **Settings > Variables**:

* `VITE_SUPABASE_URL`: Your Supabase Project URL.
* `VITE_SUPABASE_ANON_KEY`: Your Supabase Anon Key.

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
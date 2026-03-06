### 🚀 PROJECT: ViteCase Firestarter

**The Goal:**
Build a high-performance Vue 3 + Vite "Firestarter" Bootstrap optimized for Static Hosting (Cloudflare Pages) and Supabase.

**The Tech Stack:**
- **Framework:** Vue 3 (Composition API) + TypeScript.
- **Build Tool:** Vite (Optimized for HDD performance, no Webpack).
- **State/Auth:** Pinia + Supabase Client-side Auth.
- **Database:** Supabase with Custom Postgres Schemas (Moving beyond 'MySQL-barbaric' prefixes).
- **Deployment:** Pure Static SPA (Cloudflare Pages).

---

### 📂 DIRECTORY STRUCTURE
Please generate the following structure:
/
├── docs/                   # NEW: Project documentation and architecture guides
├── supabase/
│   ├── migrations/         # SQL for app_data schema
│   └── functions/          # Deno Edge Function boilerplate
├── src/
│   ├── api/                # Supabase client (db: { schema: 'app_data' })
│   ├── components/         # UI using 'Admin One Vue Tailwind' patterns
│   ├── layouts/            # AppLayout.vue (Sidebar) & GuestLayout.vue
│   ├── router/             # Meta-based Auth guards
│   ├── stores/             # Pinia auth.ts
│   └── views/              # Dashboard.vue, Login.vue, Profile.vue
├── public/
│   └── _redirects          # Content: /* /index.html 200
├── .env.example
└── vite.config.ts

---

### 🛠️ CORE REQUIREMENTS

1. **Schema-First SQL:**
   - Create a migration that initializes a custom schema: `app_data`.
   - Grant `USAGE` on `app_data` to `anon` and `authenticated` roles.
   - Create `app_data.profiles` (id references auth.users).
   - Create an SQL trigger to auto-insert a profile on signup.
   - Enable RLS with a policy: "Users can only view/edit their own data."

2. **Supabase Client (SPA Mode):**
   - Provide the `supabase.ts` initialization.
   - **Crucial:** Configure the client to point to the `app_data` schema by default.

3. **Auth & Routing:**
   - Provide the Pinia `authStore` using `onAuthStateChange`.
   - Setup `router.beforeEach` to check for the session before entering `/dashboard`.

4. **UI Blueprint:**
   - Use the aesthetic of 'Admin One' (Tailwind CSS).
   - Sidebar must be responsive (hidden on mobile, fixed on desktop).
   - Use Lucide-Vue-Next for icons.

5. **Static Hosting Fix:**
   - Include the configuration to ensure the app is a pure SPA ready for Cloudflare Pages (dist folder output).

6. **Documentation Starter:**
   - Provide a `docs/architecture.md` template explaining the schema-based setup and how to add new tables to the `app_data` namespace.
# ViteCase Firestarter Architecture

## 🚀 Overview
A high-performance Vue 3 template optimized for **Static Hosting** (Cloudflare Pages) and **Supabase (Schema-First)**.

## 🏗️ Schema Setup: `app_data`
Unlike a standard Supabase project where tables are placed in the `public` schema, this project uses a dedicated `app_data` schema.

### Benefits
1.  **Isolation:** Separates core application data from other extensions or standard Supabase features.
2.  **Organization:** Cleans up the database explorer by avoiding system table clutter.
3.  **Security:** Easy to manage `USAGE` grants for specific roles.

### Adding New Tables
When adding a new table, always prefix it with the `app_data` namespace in your SQL:

```sql
CREATE TABLE app_data.new_feature (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES app_data.profiles(id),
    content TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Don't forget RLS!
ALTER TABLE app_data.new_feature ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only view their own content" 
ON app_data.new_feature 
FOR SELECT 
TO authenticated 
USING (auth.uid() = profile_id);
```

## 🔌 Supabase Client
The client is pre-configured in `src/api/supabase.ts` to use `app_data` as the default schema.

```typescript
// Queries automatically target 'app_data'
const { data, error } = await supabase.from('profiles').select('*')
```

## 🛡️ Authentication
Managed via Pinia (`src/stores/auth.ts`). A router guard in `src/router/index.ts` handles:
1.  Initializing auth state.
2.  Redirecting unauthenticated users from `/dashboard` and protected routes.
3.  Redirecting authenticated users away from `/login`.

## 📦 Build & Deployment
-   **Static SPA:** No Server-Side Rendering (SSR) required.
-   **Cloudflare Pages:** The `public/_redirects` file ensures that all requests fall back to `index.html`, allowing Vue Router to handle routing.
-   **Manual Chunking:** Configured in `vite.config.ts` to separate vendor code from application logic for better caching.

## 🕹️ Demo Mode
If the Supabase environment variables (`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`) are missing or left as placeholders, the app automatically switches to **Demo Mode**.

### Demo Features:
-   **Mock Auth:** Allows login with username **admin** and password **admin**.
-   **Session Persistence:** Uses `localStorage` to simulate a persistent session.
-   **Data Simulation:** Bypasses Supabase API calls and returns mock data for profiles and other features.
-   **Indicator:** A "Demo Mode Active" badge is displayed on the login page.

## 🤖 AI Development Standards
For automated development (including AI agents), please follow the [AI Agent Guidelines](file:///d:/_gits/dc.vitecase/docs/ai-agent-guidelines.md) to maintain the Schema-First and RLS/Grant standards required by the project.

# 🤖 AI Agent Implementation Guidelines: Supabase & Schema-First

As an AI agent working on the **ViteCase Firestarter** project, you MUST strictly follow these database standards when creating tables, functions, or migrations. 

Failure to follow these rules will cause Supabase security warnings and application failures.

## 🏛️ 1. Mandatory Schema: `app_data`
ALL application-specific tables MUST reside in the `app_data` schema. NEVER use the `public` schema for application data.

### Standard Table Creation Template
```sql
-- Always use the schema prefix
CREATE TABLE app_data.table_name (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    -- your fields...
);
```

## 🛡️ 2. Mandatory Row Level Security (RLS)
The Supabase Dashboard will flag any table without RLS as a security vulnerability. You must enable it immediately after creation.

```sql
ALTER TABLE app_data.table_name ENABLE ROW LEVEL SECURITY;
```

## 🔑 3. Explicit Grants (The "No-Warning" Policy)
By default, standard Supabase roles (`anon` and `authenticated`) do not have access to custom schemas. You must explicitly grant access to suppress warnings and enable API access.

```sql
-- Mandatory for EVERY migration that touches app_data
GRANT USAGE ON SCHEMA app_data TO anon, authenticated;

-- Mandatory for EVERY new table
GRANT ALL ON TABLE app_data.table_name TO authenticated;
GRANT SELECT ON TABLE app_data.table_name TO anon;
```

## 📜 4. Secure Policies
NEVER leave a table with RLS enabled but no policies (which blocks all access). Define granular policies based on the `auth.uid()` or project requirements.

```sql
-- Example: User-owned data
CREATE POLICY "Users can only manage their own records" 
ON app_data.table_name 
FOR ALL 
TO authenticated 
USING (auth.uid() = user_id);
```

## 🔌 5. Client Integration
The Supabase client in `src/api/supabase.ts` is configured with `db: { schema: 'app_data' }`. 

When writing frontend code:
- **DO NOT** prefix table names in `.from()` calls (e.g., use `supabase.from('profiles')` NOT `supabase.from('app_data.profiles')`).
- If you need to access a different schema (e.g., `public` or `storage`), you must create a separate client instance or use the `.schema()` modifier.

## 🚀 6. Migration Naming Convention
Place all SQL files in `supabase/migrations/`. 
Use the prefix `[XX]_description.sql` (e.g., `02_create_tasks.sql`).

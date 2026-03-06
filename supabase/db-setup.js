import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'

// 1. Setup paths
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const root = path.resolve(__dirname, '..')

// 2. Load ENV
const envPath = path.join(root, '.env')
const envLocalPath = path.join(root, '.env.local')

if (!fs.existsSync(envPath) && !fs.existsSync(envLocalPath)) {
    console.error('❌ Error: No .env or .env.local file found. Please create one based on .env.example.')
    process.exit(1)
}

dotenv.config({ path: envPath })
dotenv.config({ path: envLocalPath })

const schema = process.env.VITE_SUPABASE_SCHEMA
const url = process.env.VITE_SUPABASE_URL
const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY

if (!schema || !url || !key) {
    console.error('❌ Error: Missing required environment variables in your .env file.')
    console.error('Ensure the following are set:')
    if (!url) console.error('  - VITE_SUPABASE_URL')
    if (!key) console.error('  - VITE_SUPABASE_PUBLISHABLE_KEY')
    if (!schema) console.error('  - VITE_SUPABASE_SCHEMA')
    process.exit(1)
}

console.log(`🚀 Preparing migration for schema: ${schema}`)

// 3. Prepare directories
const blueprintPath = path.join(root, 'supabase/blueprints/init_schema.sql')
const migrationDir = path.join(root, 'supabase/migrations')

if (!fs.existsSync(migrationDir)) {
    fs.mkdirSync(migrationDir, { recursive: true })
}

// 4. Generate the Migration
const template = fs.readFileSync(blueprintPath, 'utf8')
const generatedSql = template.replace(/\{\{SCHEMA\}\}/g, schema)

// Generate a timestamped file to avoid conflicts
const timestamp = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14)
const outputPath = path.join(migrationDir, `${timestamp}_init_schema.sql`)

// Clear existing migrations to prevent schema duplication conflicts
const files = fs.readdirSync(migrationDir)
for (const file of files) {
    if (file.includes('init_schema.sql')) {
        fs.unlinkSync(path.join(migrationDir, file))
    }
}

fs.writeFileSync(outputPath, generatedSql)

console.log(`✅ Success! Migration file created: ${path.basename(outputPath)}`)
console.log(`\nNext steps:`)
console.log(`1. npx supabase login`)
console.log(`2. npx supabase link --project-ref your-project-id`)
console.log(`3. npx supabase db push`)

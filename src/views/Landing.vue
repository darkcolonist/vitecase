<template>
  <div class="min-h-screen bg-slate-950 text-slate-200 selection:bg-blue-500/30 font-sans overflow-x-hidden">
    <!-- Navigation -->
    <nav class="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div class="flex items-center space-x-3 group cursor-pointer">
          <div class="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
            <Box class="w-6 h-6 text-white" />
          </div>
          <span class="text-xl font-bold tracking-tight text-white">ViteCase</span>
        </div>
        <div class="hidden md:flex items-center space-x-8">
          <a href="#features" class="text-sm font-medium text-slate-400 hover:text-white transition-colors">Features</a>
          <a href="#stack" class="text-sm font-medium text-slate-400 hover:text-white transition-colors">The Stack</a>
          <router-link 
            to="/login" 
            class="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/25 transition-all active:scale-95"
          >
            Sign In
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <header class="relative pt-40 pb-24 overflow-hidden">
      <!-- Background Sparks/Glows -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div class="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <div class="flex flex-col items-center mb-8 animate-fade-in-up">
          <div class="inline-flex items-center space-x-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span>Version 1.0 is Out</span>
          </div>
          <div class="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-black">
            <a href="https://github.com/darkcolonist/vitecase" class="text-blue-400 hover:text-blue-300 transition-colors">Open Source Built with ❤️</a>
          </div>
        </div>
        
        <h1 class="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.1] mb-8 animate-fade-in-up delay-100">
          ⚡ ViteCase <br/>
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">The Firestarter Bootstrap</span>
        </h1>
        
        <p class="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 leading-relaxed mb-12 animate-fade-in-up delay-200">
          A high-performance, schema-first Vue 3 + Vite foundation. 
          Designed for static hosting on Cloudflare Pages and Supabase backends.
        </p>
        
        <div class="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in-up delay-300">
          <router-link 
            to="/login" 
            class="w-full sm:w-auto px-8 py-4 bg-white text-slate-950 rounded-2xl font-bold text-lg hover:bg-slate-200 transition-all flex items-center justify-center space-x-2 shadow-xl"
          >
            <span>Get Started</span>
            <ArrowRight class="w-5 h-5" />
          </router-link>
          <a 
            href="https://github.com/darkcolonist/vitecase" 
            class="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 border border-white/10 transition-all flex items-center justify-center space-x-2"
          >
            <Github class="w-5 h-5" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </header>

    <!-- Features Section -->
    <section id="features" class="py-24 relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div class="max-w-2xl">
            <h2 class="text-xs font-bold text-blue-500 uppercase tracking-[0.3em] mb-4">Features</h2>
            <h3 class="text-4xl md:text-5xl font-black text-white tracking-tight">Everything you need to <span class="text-slate-500">ship in record time.</span></h3>
          </div>
          <p class="text-slate-400 max-w-sm">
            Focus on your business logic, not the boilerplate. ViteCase handles the heavy lifting of infrastructure.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div v-for="feature in features" :key="feature.title" class="group">
            <div class="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-300">
              <component :is="feature.icon" class="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </div>
            <h4 class="text-xl font-bold text-white mb-3">{{ feature.title }}</h4>
            <p class="text-slate-400 leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stack Grid -->
    <section id="stack" class="py-24 border-t border-white/5 bg-slate-900/40">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-white mb-4">The ViteCase Stack</h2>
          <p class="text-slate-400">Built with the fastest and most modern tools in the ecosystem.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="p-8 rounded-3xl bg-slate-950 border border-white/5 hover:border-blue-500/30 transition-all group">
            <div class="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap class="w-6 h-6 text-emerald-400" />
            </div>
            <h3 class="text-xl font-bold text-white mb-2">Frontend</h3>
            <p class="text-slate-400 text-sm leading-relaxed">Vue 3 (Composition API) + Vite (Ultra-fast HMR) for a blazing developer experience.</p>
          </div>

          <div class="p-8 rounded-3xl bg-slate-950 border border-white/5 hover:border-indigo-500/30 transition-all group">
            <div class="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Database class="w-6 h-6 text-indigo-400" />
            </div>
            <h3 class="text-xl font-bold text-white mb-2">Database</h3>
            <p class="text-slate-400 text-sm leading-relaxed">Supabase with custom schemas. No barbaric table prefixing. Clean, structured data.</p>
          </div>

          <div class="p-8 rounded-3xl bg-slate-950 border border-white/5 hover:border-purple-500/30 transition-all group">
            <div class="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Cloud class="w-6 h-6 text-purple-400" />
            </div>
            <h3 class="text-xl font-bold text-white mb-2">Serverless</h3>
            <p class="text-slate-400 text-sm leading-relaxed">Deno-based Edge Functions for dynamic logic that scales globally with zero latency.</p>
          </div>

          <div class="p-8 rounded-3xl bg-slate-950 border border-white/5 hover:border-orange-500/30 transition-all group">
            <div class="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Globe class="w-6 h-6 text-orange-400" />
            </div>
            <h3 class="text-xl font-bold text-white mb-2">Deployment</h3>
            <p class="text-slate-400 text-sm leading-relaxed">Cloudflare Pages. Pure static SPA hosting with automatic git-based deployments.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- AI Railroading Section (Sensational) -->
    <section class="py-24 relative">
      <div class="absolute inset-0 bg-blue-600/5 -skew-y-3 pointer-events-none"></div>
      <div class="max-w-7xl mx-auto px-6 relative">
        <div class="bg-gradient-to-br from-slate-900 to-slate-950 border border-blue-500/20 rounded-[3rem] p-12 md:p-20 shadow-2xl overflow-hidden relative group">
          <!-- Decorative elements -->
          <div class="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/10 blur-[100px] rounded-full group-hover:bg-blue-600/20 transition-colors duration-700"></div>
          
          <div class="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div class="inline-flex items-center space-x-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-xs font-bold uppercase tracking-widest mb-8">
                <BrainCircuit class="w-4 h-4" />
                <span>Engineered for Alignment</span>
              </div>
              <h2 class="text-4xl md:text-6xl font-black text-white leading-tight mb-8">
                Railroad your <br/>
                <span class="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">AI Coding Agents</span>
              </h2>
              <p class="text-xl text-slate-400 leading-relaxed mb-8">
                Exhausted by AI agents drifting out of scope? ViteCase is more than a template—it's a <strong>high-integrity containment system</strong>. 
              </p>
              <div class="p-6 bg-slate-950/50 border-l-4 border-amber-500 rounded-r-2xl italic text-slate-300 text-lg mb-8">
                "ViteCase is specifically architected to <strong>railroad AI agents</strong>, keeping them locked into your project's scope and mathematically minimizing hallucination drift."
              </div>
            </div>
            
            <div class="grid grid-cols-1 gap-4">
              <div class="p-6 bg-white/5 border border-white/10 rounded-2xl flex items-start space-x-4 hover:border-amber-500/30 transition-all">
                <div class="p-3 bg-amber-500/10 rounded-xl"><ShieldAlert class="w-6 h-6 text-amber-400" /></div>
                <div>
                  <h4 class="font-bold text-white mb-1">Scope Lock</h4>
                  <p class="text-sm text-slate-400">Strict schema and directory rules that don't give LLMs room to improvise.</p>
                </div>
              </div>
              <div class="p-6 bg-white/5 border border-white/10 rounded-2xl flex items-start space-x-4 hover:border-amber-500/30 transition-all">
                <div class="p-3 bg-blue-500/10 rounded-xl"><ZapOff class="w-6 h-6 text-blue-400" /></div>
                <div>
                  <h4 class="font-bold text-white mb-1">Anti-Hallucination</h4>
                  <p class="text-sm text-slate-400">Detailed `ai-agent-guidelines.md` that acts as a cognitive leash for your AI pair programmer.</p>
                </div>
              </div>
              <div class="p-6 bg-white/5 border border-white/10 rounded-2xl flex items-start space-x-4 hover:border-amber-500/30 transition-all">
                <div class="p-3 bg-purple-500/10 rounded-xl"><Compass class="w-6 h-6 text-purple-400" /></div>
                <div>
                  <h4 class="font-bold text-white mb-1">Zero-Drift Logic</h4>
                  <p class="text-sm text-slate-400">Pattern-driven code structure that makes the 'next right move' obvious to any LLM.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Schema Strategy -->
    <section class="py-24">
      <div class="max-w-7xl mx-auto px-6 lg:flex items-center space-y-12 lg:space-y-0 lg:space-x-12">
        <div class="lg:w-1/2">
          <h2 class="text-4xl font-bold text-white mb-6">Database & Schema Strategy</h2>
          <p class="text-slate-400 text-lg mb-8 leading-relaxed">
            ViteCase moves away from traditional, messy table structures. 
            All application data lives in the <code class="text-blue-400 bg-blue-500/10 px-2 py-1 rounded">app_data</code> schema, ensuring a clean separation from auth and system tables.
          </p>
          <ul class="space-y-4">
            <li class="flex items-start space-x-3">
              <div class="mt-1 p-1 bg-blue-500/20 rounded-full"><Check class="w-4 h-4 text-blue-400" /></div>
              <span class="text-slate-300">Schema Isolation for security</span>
            </li>
            <li class="flex items-start space-x-3">
              <div class="mt-1 p-1 bg-blue-500/20 rounded-full"><Check class="w-4 h-4 text-blue-400" /></div>
              <span class="text-slate-300">Native RLS Support</span>
            </li>
            <li class="flex items-start space-x-3">
              <div class="mt-1 p-1 bg-blue-500/20 rounded-full"><Check class="w-4 h-4 text-blue-400" /></div>
              <span class="text-slate-300">Clean Relationship Mapping</span>
            </li>
          </ul>
        </div>
        <div class="lg:w-1/2 bg-slate-900 p-2 rounded-[2rem] border border-white/5 shadow-2xl overflow-hidden group">
          <div class="bg-slate-950 rounded-[1.5rem] p-8 border border-white/5 group-hover:scale-[1.02] transition-transform duration-500">
            <pre class="font-mono text-sm text-blue-400/80"><code>-- The ViteCase Way
GRANT USAGE ON SCHEMA app_data TO anon, authenticated;

-- Tables live here
CREATE TABLE app_data.profiles (
  id uuid REFERENCES auth.users NOT NULL,
  full_name text,
  updated_at timestamp
);</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-12 border-t border-white/5">
      <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 text-slate-500 text-sm">
        <div class="flex items-center space-x-4">
          <span class="font-bold text-white">ViteCase</span>
          <span class="px-2 py-0.5 bg-white/5 rounded">Free & Open Source</span>
        </div>
        <p>&copy; {{ new Date().getFullYear() }} ViteCase. Released under MIT License.</p>
        <div class="flex items-center space-x-6">
          <a href="https://github.com/darkcolonist/vitecase" class="text-blue-400 font-medium hover:text-blue-300 transition-colors">Github Repo</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { 
  Box, 
  ArrowRight, 
  Github, 
  Zap, 
  Database, 
  Cloud, 
  Globe, 
  Check, 
  ShieldCheck, 
  Cpu, 
  Rocket, 
  Monitor, 
  Sparkles, 
  Star,
  BrainCircuit,
  ShieldAlert,
  ZapOff,
  Compass
} from 'lucide-vue-next'

const features = [
  {
    title: 'Schema-First Architecture',
    description: 'Clean data isolation using Supabase app_data schemas. No more table prefixing or messy migrations.',
    icon: ShieldCheck
  },
  {
    title: 'Edge Computing Native',
    description: 'First-class support for Deno-based Edge Functions, enabling global scale with zero cold starts.',
    icon: Cpu
  },
  {
    title: 'Cloudflare Optimized',
    description: 'Engineered for Cloudflare Pages with built-in SPA routing and ultra-fast asset delivery.',
    icon: Rocket
  },
  {
    title: 'Demo Mode Ready',
    description: 'Automatic fallback to a fully functional demo UI when environment variables are missing.',
    icon: Monitor
  },
  {
    title: 'AI Agent Optimized',
    description: 'Strict RLS and schema guidelines designed to work perfectly with AI-assisted development.',
    icon: Sparkles
  },
  {
    title: 'Premium Foundation',
    description: 'Vue 3 Carbon-neutral setup with Pinia, Vue Router, and Tailwind CSS pre-configured.',
    icon: Star
  }
]
</script>

<style scoped>
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }
</style>

"use client";
import { supabase } from "@/lib/supabase";
import { Sparkles, Layout, Zap, ShieldCheck } from "lucide-react";

export default function Home() {

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/tasks` },
    });
  }


  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans selection:bg-cyan-100">

      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-cyan-50/50 to-transparent -z-10" />
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-sm font-medium">
            <Sparkles size={16} />
            <span>The Evolution of Todo — Phase II</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
            Master the Architecture of <br />
            <span className="text-cyan-600 italic">Intelligence.</span>
          </h1>
          <button
            onClick={handleLogin}
            className="group flex items-center gap-3 px-8 py-4 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-2xl transition-all shadow-xl shadow-cyan-100 mx-auto"
          >
            <img src="https://www.google.com/favicon.ico" className="w-5 h-5 brightness-200" alt="google" />
            Get Started with Google
          </button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Layout className="text-cyan-600" />}
            title="Spec-Driven UI"
            desc="Built using Claude Code and Spec-Kit Plus for high-fidelity implementation."
          />
          <FeatureCard
            icon={<Zap className="text-cyan-600" />}
            title="AI-Native Backend"
            desc="Powered by FastAPI and Neon Serverless PostgreSQL for instant scalability."
          />
          <FeatureCard
            icon={<ShieldCheck className="text-cyan-600" />}
            title="Secure Auth"
            desc="Enterprise-grade security using Google OAuth and JWT-based isolation."
          />
        </div>
      </section>
    </main>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-8 rounded-3xl border border-gray-100 bg-white hover:border-cyan-200 hover:shadow-lg hover:shadow-cyan-50 transition-all duration-300 group">
      <div className="w-12 h-12 rounded-2xl bg-cyan-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-500 leading-relaxed text-sm">{desc}</p>
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, LogOut, LayoutDashboard, ChevronDown, Sparkles } from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsOpen(false);
    router.push("/");
  };

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/tasks` },
    });
  };

  const avatar = user?.user_metadata?.avatar_url || user?.user_metadata?.picture || null;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-transparent"
          onClick={() => setIsOpen(false)}
        />
      )}

      <nav className="fixed top-0 w-full z-50 bg-white/60 backdrop-blur-xl border-b border-gray-100 px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">

          <Link href="/" className="flex items-center group">
            <span className="text-2xl font-black tracking-tighter text-gray-900 group-hover:text-cyan-600 transition-colors">
              Task<span className="font-light italic text-cyan-500">Flow.</span>
            </span>
          </Link>

          <div className="relative z-50">
            {user ? (
              <div className="flex items-center">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center gap-3 p-1.5 pl-4 rounded-2xl bg-white border border-gray-200 hover:border-cyan-300 hover:shadow-md transition-all active:scale-95"
                >
                  <span className="text-sm font-semibold text-gray-700 hidden sm:block">
                    {user?.user_metadata?.full_name?.split(' ')[0] || "Account"}
                  </span>
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="User"
                      className="w-8 h-8 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-xl bg-cyan-100 flex items-center justify-center text-cyan-600">
                      <User size={18} />
                    </div>
                  )}
                  <ChevronDown
                    size={16}
                    className={`text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isOpen && (
                  <div className="absolute right-0 mt-56 w-72 bg-white border border-gray-100 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] py-3 overflow-hidden animate-in fade-in zoom-in slide-in-from-top-4 duration-200">

                    <div className="px-5 py-4 bg-gray-50/50 mb-2 border-b border-gray-50">
                      <p className="text-[10px] font-bold text-cyan-600 uppercase tracking-widest mb-1">Signed In As</p>
                      <p className="text-sm font-bold text-gray-800 truncate">{user.email}</p>
                    </div>

                    <div className="px-2 space-y-1">
                      <Link
                        href="/tasks"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 rounded-2xl hover:bg-cyan-50 hover:text-cyan-600 transition-all group"
                      >
                        <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                          <LayoutDashboard size={18} />
                        </div>
                        My Workspace
                      </Link>

                      <Link
                        href="/chat"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 rounded-2xl hover:bg-cyan-50 hover:text-cyan-600"
                      >
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <Sparkles size={18} />
                        </div>
                        AI Assistant
                      </Link>


                      <div className="h-px bg-gray-100 mx-4 my-2" />

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-red-500 rounded-2xl hover:bg-red-50 transition-all group"
                      >
                        <div className="p-2 bg-red-50 group-hover:bg-white rounded-lg transition-colors">
                          <LogOut size={18} />
                        </div>
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="group relative p-3 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-gray-800 active:scale-95 shadow-lg shadow-gray-200 transition-colors"
              >
                <User size={20} className="text-white" />
              </button>

            )}
          </div>

        </div>
      </nav>
    </>
  );
}
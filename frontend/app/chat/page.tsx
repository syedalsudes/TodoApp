"use client";

import ChatBox from "@/components/ChatBox";
import { supabase } from "@/lib/supabase";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ChatPage() {
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push("/");
      }
    }
    checkAuth();
  }, []);

  return (
    <main className="min-h-screen bg-[#F8FAFC] pt-28 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-black text-gray-900 mb-6">
          AI <span className="text-cyan-600">Assistant</span>
        </h1>

        <ChatBox />
      </div>
    </main>
  );
}

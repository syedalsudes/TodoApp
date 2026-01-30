"use client";

import { supabase } from "@/lib/supabase";

export default function GoogleLoginButton() {
  async function loginWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  }

  return (
    <button
      onClick={loginWithGoogle}
      className="w-80 py-3 rounded bg-red-600 text-white font-semibold"
    >
      Continue with Google
    </button>
  );
}

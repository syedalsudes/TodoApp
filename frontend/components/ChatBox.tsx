"use client";

import { useState, useRef, useEffect } from "react";
import { api } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import { Send, Bot, User, Loader2 } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const token = await getAuthToken();
      if (!token) return;

      const res = await api.sendChatMessage(token, userMessage.content);
      const aiMessage: Message = { role: "assistant", content: res.reply };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Oops! Kuch masla ho gaya. Dobara try karein." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-[2rem] shadow-2xl shadow-cyan-100/50 border border-gray-100 flex flex-col h-[75vh] overflow-hidden">
      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 scroll-smooth"
      >
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <div className="bg-cyan-50 p-4 rounded-full">
              <Bot className="text-cyan-600 w-8 h-8" />
            </div>
            <div>
              <p className="text-gray-900 font-semibold">How can I help today?</p>
              <p className="text-gray-400 text-sm mt-1">Try: "Add a meeting with Team at 4pm"</p>
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
              msg.role === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {/* Avatar */}
            <div className={`flex-shrink-0 p-2 rounded-xl ${
              msg.role === "user" ? "bg-cyan-600 text-white" : "bg-gray-100 text-gray-600"
            }`}>
              {msg.role === "user" ? <User size={18} /> : <Bot size={18} />}
            </div>

            {/* Bubble */}
            <div
              className={`max-w-[80%] px-5 py-3 rounded-[1.5rem] text-[15px] leading-relaxed shadow-sm ${
                msg.role === "user"
                  ? "bg-cyan-600 text-white rounded-tr-none"
                  : "bg-gray-100 text-gray-800 rounded-tl-none border border-gray-200"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-start gap-3 animate-pulse">
            <div className="bg-gray-100 p-2 rounded-xl text-gray-400">
              <Bot size={18} />
            </div>
            <div className="bg-gray-100 px-5 py-4 rounded-[1.5rem] rounded-tl-none">
              <Loader2 className="w-5 h-5 animate-spin text-cyan-600" />
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 md:p-6 bg-gray-50/50 border-t border-gray-100">
        <form
          onSubmit={sendMessage}
          className="relative max-w-2xl mx-auto flex items-center gap-2 bg-white p-2 rounded-2xl shadow-inner border border-gray-200 focus-within:border-cyan-400 transition-all"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 px-4 py-2 bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-cyan-600 hover:bg-cyan-700 text-white p-3 rounded-xl disabled:opacity-30 disabled:grayscale transition-all shadow-lg shadow-cyan-200"
          >
            <Send size={20} />
          </button>
        </form>
        <p className="text-[10px] text-center text-gray-400 mt-3 uppercase tracking-widest font-medium">
          Powered by FastAPI & AI
        </p>
      </div>
    </div>
  );
}
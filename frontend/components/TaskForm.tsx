"use client";

import { useState } from "react";
import { Plus } from "lucide-react"; 

export default function TaskForm({ onAdd }: { onAdd: (title: string) => void }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title);
    setTitle("");
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="flex gap-3 p-1 bg-white rounded-2xl shadow-sm border border-cyan-100 focus-within:border-cyan-400 focus-within:ring-4 focus-within:ring-cyan-50 transition-all duration-300 mb-8"
    >
      <input
        className="flex-1 bg-transparent px-5 py-3 outline-none text-gray-700 placeholder:text-gray-300 font-medium"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
      />
      
      <button
        type="submit"
        disabled={!title.trim()}
        className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-200 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-cyan-200 hover:shadow-cyan-300 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
      >
        <Plus className="w-5 h-5 stroke-[3px]" />
        <span>Add Task</span>
      </button>
    </form>
  );
}

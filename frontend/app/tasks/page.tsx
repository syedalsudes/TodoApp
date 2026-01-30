"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { ListTodo, ClipboardList } from "lucide-react";

export default function TasksPage() {
    const router = useRouter();
    const [tasks, setTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setToken(data.session?.access_token || null);
        });
    }, []);


    async function load() {
        const token = await getAuthToken();
        if (!token) {
            router.push("/");
            return;
        }
        try {
            const data = await api.getTasks(token);
            setTasks(data);
        } catch (e) {
            console.error("Failed to load tasks", e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        async function checkAuth() {
            const { data } = await supabase.auth.getSession();
            if (!data.session) {
                router.push("/");
                return;
            }
            await load();
        }
        checkAuth();
    }, []);

    async function addTask(title: string) {
        if (!token) return;

        const tempTask = { id: Date.now(), title, completed: false };
        setTasks(prev => [tempTask, ...prev]);

        try {
            const newTask = await api.addTask(token, { title });
            setTasks(prev => prev.map(t => t.id === tempTask.id ? newTask : t));
        } catch (error) {
            setTasks(prev => prev.filter(t => t.id !== tempTask.id));
            alert("Error adding task");
        }
    }


    async function toggleTask(id: number) {
        if (!token) return;

        setTasks(prev =>
            prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
        );

        try {
            const updated = await api.toggleTask(token, id);
            setTasks(prev => prev.map(t => (t.id === id ? updated : t)));
        } catch (error) {
            setTasks(prev =>
                prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
            );
            alert("Failed to toggle task");
        }
    }


    async function deleteTask(id: number) {
        if (!token) return;

        const prevTasks = [...tasks];
        setTasks(prev => prev.filter(t => t.id !== id));

        try {
            await api.deleteTask(token, id);
        } catch (error) {
            setTasks(prevTasks);
            alert("Failed to delete task");
        }
    }


    async function updateTask(id: number, title: string) {
        const token = await getAuthToken();
        if (!token) return;
        const updated = await api.updateTask(token, id, { title });
        setTasks(prev => prev.map(t => (t.id === id ? updated : t)));
    }

    return (
        <main className="min-h-screen bg-[#F8FAFC] selection:bg-cyan-100 selection:text-cyan-900 pt-28 pb-12 px-4">
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-gradient-to-b from-cyan-50/50 to-transparent -z-10" />

            <div className="max-w-2xl mx-auto space-y-8">

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-2">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-black tracking-tight text-gray-900">
                            My <span className="text-cyan-600">Workspace</span>
                        </h1>
                        <p className="text-sm text-gray-500 font-medium">
                            Manage your daily missions and goals.
                        </p>
                    </div>
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-gray-100 shadow-sm">
                        <ListTodo size={18} className="text-cyan-600" />
                        <span className="text-sm font-bold text-gray-700">{tasks.length} Tasks</span>
                    </div>
                </div>

                {/* ⚡ Quick Add Section */}
                <section className="bg-white rounded-[2.5rem] p-6 shadow-xl shadow-cyan-900/5 border border-gray-50">
                    <TaskForm onAdd={addTask} />
                </section>

                {/* 📋 Tasks List Container */}
                <section className="bg-white/70 backdrop-blur-2xl rounded-[2.5rem] border border-white shadow-2xl shadow-gray-200/50 overflow-hidden">
                    <div className="px-8 py-5 border-b border-gray-100 bg-white/50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <ClipboardList size={18} className="text-gray-400" />
                            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-widest">Active List</h2>
                        </div>
                    </div>

                    <div className="p-4">
                        {loading ? (
                            <div className="py-20 text-center space-y-4">
                                <div className="w-10 h-10 border-4 border-cyan-100 border-t-cyan-600 rounded-full animate-spin mx-auto" />
                                <p className="text-gray-400 text-sm font-medium">Fetching your tasks...</p>
                            </div>
                        ) : tasks.length > 0 ? (
                            <TaskList
                                tasks={tasks}
                                onToggle={toggleTask}
                                onDelete={deleteTask}
                                onUpdate={updateTask}
                            />
                        ) : (
                            <div className="py-20 text-center space-y-3">
                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
                                    <ListTodo size={32} />
                                </div>
                                <h3 className="text-gray-900 font-bold">No tasks found</h3>
                                <p className="text-gray-400 text-sm max-w-[200px] mx-auto">
                                    Enjoy your free time or add a new goal above!
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                {/* 💡 Keyboard Shortcut Info */}
                <footer className="text-center space-y-2">
                    <div className="inline-flex items-center gap-4 px-4 py-2 bg-gray-100/50 rounded-full border border-gray-200/50">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                            Pro Tip: Double click a task to edit
                        </p>
                    </div>
                </footer>
            </div>
        </main>
    );
}
"use client";

import { useEffect, useState } from "react";
import { Trash2, CheckCircle, Circle, Pencil, X, Check } from "lucide-react";

export default function TaskItem({ task, onToggle, onDelete, onUpdate }: any) {
    const [title, setTitle] = useState(task.title);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        setTitle(task.title);
    }, [task.title]);

    async function save(e?: React.MouseEvent | React.KeyboardEvent) {
        if (e) e.preventDefault(); 

        if (title.trim() === "") {
            setEditing(false);
            return;
        }

        console.log("Saving title:", title);

        try {
            await onUpdate(task.id, title);
            setEditing(false);
        } catch (err) {
            console.error("Save error:", err);
        }
    }

    return (
        <div className="group flex items-center justify-between p-4 mb-3 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 flex-1">
                <button onClick={() => onToggle(task.id)} className="focus:outline-none">
                    {task.completed ? (
                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                    ) : (
                        <Circle className="w-6 h-6 text-slate-400 hover:text-cyan-600" />
                    )}
                </button>

                <div className="flex-1">
                    {editing ? (
                        <input
                            autoFocus
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    save();
                                }
                            }}
                            className="w-full border-2 border-cyan-500 px-2 py-1 rounded text-slate-900 outline-none"
                        />

                    ) : (
                        <span
                            className={`text-lg font-medium block transition-all ${task.completed
                                ? "line-through text-slate-400 decoration-slate-400"
                                : "text-slate-800"
                                }`}
                        >
                            {task.title}
                        </span>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-3 ml-4">
                {editing ? (
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={(e) => save(e)} 
                            className="p-1 text-emerald-600 hover:bg-emerald-50 rounded"
                        >
                            <Check size={20} strokeWidth={3} />
                        </button>

                        <button
                            onClick={() => {
                                setTitle(task.title);
                                setEditing(false);
                            }}
                            className="p-1 text-red-500 hover:bg-red-50 rounded"
                        >

                            <X size={20} strokeWidth={3} />
                        </button>
                    </div>
                ) : (
                    <div className="flex gap-1 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={() => setEditing(true)}
                            className="p-2 text-slate-500 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg"
                            title="Edit Task"
                        >
                            <Pencil size={18} />
                        </button>
                        <button
                            onClick={() => onDelete(task.id)}
                            className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                            title="Delete Task"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

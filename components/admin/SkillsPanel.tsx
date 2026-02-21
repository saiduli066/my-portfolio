"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Skill {
    name: string;
    category: "frontend" | "backend" | "ai" | "devops";
}

interface Props {
    skills: Skill[];
    saving: boolean;
    onSave: (skills: Skill[]) => void;
}

const categories: Skill["category"][] = ["frontend", "backend", "ai", "devops"];

const catColors: Record<string, string> = {
    frontend: "border-sky-500/20 text-sky-400 bg-sky-500/[0.06]",
    backend: "border-emerald-500/20 text-emerald-400 bg-emerald-500/[0.06]",
    ai: "border-violet-500/20 text-violet-400 bg-violet-500/[0.06]",
    devops: "border-amber-500/20 text-amber-400 bg-amber-500/[0.06]",
};

const inputCls =
    "w-full rounded-lg border border-white/[0.06] bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition-all focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/10";

export default function SkillsPanel({ skills, saving, onSave }: Props) {
    const [list, setList] = useState<Skill[]>(skills);
    const [newName, setNewName] = useState("");
    const [newCat, setNewCat] = useState<Skill["category"]>("frontend");
    const [editIdx, setEditIdx] = useState<number | null>(null);
    const [editName, setEditName] = useState("");
    const [editCat, setEditCat] = useState<Skill["category"]>("frontend");

    useEffect(() => setList(skills), [skills]);

    function addSkill() {
        if (!newName.trim()) return;
        setList((prev) => [...prev, { name: newName.trim(), category: newCat }]);
        setNewName("");
    }

    function removeSkill(idx: number) {
        setList((prev) => prev.filter((_, i) => i !== idx));
    }

    function startEdit(idx: number) {
        setEditIdx(idx);
        setEditName(list[idx].name);
        setEditCat(list[idx].category);
    }

    function saveEdit() {
        if (editIdx === null) return;
        setList((prev) =>
            prev.map((s, i) =>
                i === editIdx ? { name: editName.trim(), category: editCat } : s
            )
        );
        setEditIdx(null);
    }

    return (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
            <h2 className="text-lg font-bold text-white">Skills</h2>
            <p className="mt-1 text-xs text-gray-500">
                Add, edit, or remove skills. Changes are saved to data.ts.
            </p>

            {/* Add new skill */}
            <div className="mt-5 flex flex-col gap-3 rounded-lg border border-white/[0.04] bg-white/[0.02] p-4 sm:flex-row sm:items-end">
                <div className="flex-1">
                    <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-gray-500">
                        Skill Name
                    </label>
                    <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="e.g. Docker"
                        onKeyDown={(e) => e.key === "Enter" && addSkill()}
                        className={inputCls}
                    />
                </div>
                <div className="w-full sm:w-44">
                    <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-gray-500">
                        Category
                    </label>
                    <select
                        value={newCat}
                        onChange={(e) =>
                            setNewCat(e.target.value as Skill["category"])
                        }
                        className={`${inputCls} appearance-none`}
                    >
                        {categories.map((c) => (
                            <option key={c} value={c} className="bg-[#0b0b0f]">
                                {c}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    onClick={addSkill}
                    className="rounded-lg bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-indigo-600"
                >
                    + Add
                </button>
            </div>

            {/* Skills list */}
            <div className="mt-5 space-y-2">
                <AnimatePresence>
                    {list.map((skill, idx) => (
                        <motion.div
                            key={`${skill.name}-${idx}`}
                            layout
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="flex items-center gap-3 rounded-lg border border-white/[0.04] bg-white/[0.015] px-4 py-2.5"
                        >
                            {editIdx === idx ? (
                                <>
                                    <input
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                        className="flex-1 rounded border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-sm text-white outline-none focus:border-indigo-500/40"
                                    />
                                    <select
                                        value={editCat}
                                        onChange={(e) =>
                                            setEditCat(
                                                e.target.value as Skill["category"]
                                            )
                                        }
                                        className="rounded border border-white/[0.06] bg-white/[0.03] px-2 py-1.5 text-xs text-white outline-none"
                                    >
                                        {categories.map((c) => (
                                            <option
                                                key={c}
                                                value={c}
                                                className="bg-[#0b0b0f]"
                                            >
                                                {c}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        onClick={saveEdit}
                                        className="text-xs font-semibold text-emerald-400 hover:text-emerald-300"
                                    >
                                        ✓
                                    </button>
                                    <button
                                        onClick={() => setEditIdx(null)}
                                        className="text-xs font-semibold text-gray-500 hover:text-gray-300"
                                    >
                                        ✕
                                    </button>
                                </>
                            ) : (
                                <>
                                    <span className="flex-1 text-sm font-medium text-gray-200">
                                        {skill.name}
                                    </span>
                                    <span
                                        className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase ${catColors[skill.category]
                                            }`}
                                    >
                                        {skill.category}
                                    </span>
                                    <button
                                        onClick={() => startEdit(idx)}
                                        className="text-xs text-gray-500 transition-colors hover:text-indigo-400"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => removeSkill(idx)}
                                        className="text-xs text-gray-500 transition-colors hover:text-red-400"
                                    >
                                        Delete
                                    </button>
                                </>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Count + Save */}
            <div className="mt-5 flex items-center justify-between">
                <span className="text-xs text-gray-500">
                    {list.length} skill{list.length !== 1 ? "s" : ""}
                </span>
                <button
                    onClick={() => onSave(list)}
                    disabled={saving}
                    className="rounded-lg bg-indigo-500 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-indigo-600 disabled:opacity-50"
                >
                    {saving ? "Saving..." : "Save Skills"}
                </button>
            </div>
        </div>
    );
}

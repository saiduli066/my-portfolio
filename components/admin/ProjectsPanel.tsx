"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
    title: string;
    description: string;
    tags: string[];
    image: string;
    github?: string;
    live?: string;
}

interface Props {
    projects: Project[];
    saving: boolean;
    onSave: (projects: Project[]) => void;
}

const inputCls =
    "w-full rounded-lg border border-white/[0.06] bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition-all focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/10";

const emptyProject: Project = {
    title: "",
    description: "",
    tags: [],
    image: "",
    github: "",
    live: "",
};

export default function ProjectsPanel({ projects, saving, onSave }: Props) {
    const [list, setList] = useState<Project[]>(projects);
    const [editIdx, setEditIdx] = useState<number | null>(null);
    const [form, setForm] = useState<Project>(emptyProject);
    const [tagInput, setTagInput] = useState("");

    useEffect(() => setList(projects), [projects]);

    function startAdd() {
        setForm(emptyProject);
        setTagInput("");
        setEditIdx(-1); // -1 = adding new
    }

    function startEdit(idx: number) {
        setForm(list[idx]);
        setTagInput(list[idx].tags.join(", "));
        setEditIdx(idx);
    }

    function saveForm() {
        const project: Project = {
            ...form,
            tags: tagInput
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean),
        };
        if (!project.title.trim()) return;

        if (editIdx === -1) {
            // Adding new
            setList((prev) => [...prev, project]);
        } else if (editIdx !== null) {
            // Editing existing
            setList((prev) =>
                prev.map((p, i) => (i === editIdx ? project : p))
            );
        }
        setEditIdx(null);
    }

    function removeProject(idx: number) {
        setList((prev) => prev.filter((_, i) => i !== idx));
    }

    function moveUp(idx: number) {
        if (idx === 0) return;
        setList((prev) => {
            const next = [...prev];
            [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
            return next;
        });
    }

    function moveDown(idx: number) {
        if (idx >= list.length - 1) return;
        setList((prev) => {
            const next = [...prev];
            [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
            return next;
        });
    }

    return (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-bold text-white">Projects</h2>
                    <p className="mt-1 text-xs text-gray-500">
                        Manage your portfolio projects.
                    </p>
                </div>
                <button
                    onClick={startAdd}
                    className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-indigo-600"
                >
                    + Add Project
                </button>
            </div>

            {/* Edit / Add form */}
            <AnimatePresence>
                {editIdx !== null && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-5 overflow-hidden rounded-lg border border-indigo-500/20 bg-indigo-500/[0.03] p-5"
                    >
                        <h3 className="mb-4 text-sm font-bold text-white">
                            {editIdx === -1 ? "New Project" : `Editing: ${form.title}`}
                        </h3>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-gray-500">
                                    Title
                                </label>
                                <input
                                    value={form.title}
                                    onChange={(e) =>
                                        setForm((p) => ({
                                            ...p,
                                            title: e.target.value,
                                        }))
                                    }
                                    placeholder="Project Title"
                                    className={inputCls}
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-gray-500">
                                    Tags (comma-separated)
                                </label>
                                <input
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    placeholder="React, Node.js, MongoDB"
                                    className={inputCls}
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-gray-500">
                                    Description
                                </label>
                                <textarea
                                    value={form.description}
                                    onChange={(e) =>
                                        setForm((p) => ({
                                            ...p,
                                            description: e.target.value,
                                        }))
                                    }
                                    rows={3}
                                    placeholder="Describe the project..."
                                    className={`${inputCls} resize-none`}
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-gray-500">
                                    Image Path
                                </label>
                                <input
                                    value={form.image}
                                    onChange={(e) =>
                                        setForm((p) => ({
                                            ...p,
                                            image: e.target.value,
                                        }))
                                    }
                                    placeholder="/projects/my-project.jpg"
                                    className={inputCls}
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-gray-500">
                                    GitHub URL
                                </label>
                                <input
                                    value={form.github ?? ""}
                                    onChange={(e) =>
                                        setForm((p) => ({
                                            ...p,
                                            github: e.target.value,
                                        }))
                                    }
                                    placeholder="https://github.com/..."
                                    className={inputCls}
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-gray-500">
                                    Live URL
                                </label>
                                <input
                                    value={form.live ?? ""}
                                    onChange={(e) =>
                                        setForm((p) => ({
                                            ...p,
                                            live: e.target.value,
                                        }))
                                    }
                                    placeholder="https://myproject.vercel.app"
                                    className={inputCls}
                                />
                            </div>
                        </div>
                        <div className="mt-4 flex gap-3">
                            <button
                                onClick={saveForm}
                                className="rounded-lg bg-emerald-500 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-emerald-600"
                            >
                                {editIdx === -1 ? "Add Project" : "Update"}
                            </button>
                            <button
                                onClick={() => setEditIdx(null)}
                                className="rounded-lg border border-white/[0.06] px-5 py-2 text-sm text-gray-400 transition-all hover:text-white"
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Projects list */}
            <div className="mt-5 space-y-2">
                {list.map((project, idx) => (
                    <div
                        key={`${project.title}-${idx}`}
                        className="flex flex-col gap-3 rounded-lg border border-white/[0.04] bg-white/[0.015] p-4 sm:flex-row sm:items-center"
                    >
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-indigo-500/15 bg-indigo-500/[0.06]">
                            <span className="font-mono text-sm font-bold text-indigo-400">
                                {String(idx + 1).padStart(2, "0")}
                            </span>
                        </div>
                        <div className="min-w-0 flex-1">
                            <h4 className="text-sm font-semibold text-white">
                                {project.title}
                            </h4>
                            <p className="mt-0.5 line-clamp-1 text-xs text-gray-500">
                                {project.description}
                            </p>
                            <div className="mt-1.5 flex flex-wrap gap-1">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[10px] text-gray-500"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => moveUp(idx)}
                                disabled={idx === 0}
                                className="rounded p-1 text-gray-600 transition-colors hover:text-white disabled:opacity-30"
                                title="Move up"
                            >
                                ↑
                            </button>
                            <button
                                onClick={() => moveDown(idx)}
                                disabled={idx >= list.length - 1}
                                className="rounded p-1 text-gray-600 transition-colors hover:text-white disabled:opacity-30"
                                title="Move down"
                            >
                                ↓
                            </button>
                            <button
                                onClick={() => startEdit(idx)}
                                className="rounded-lg border border-white/[0.06] px-3 py-1 text-xs text-gray-400 transition-all hover:text-indigo-400"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => removeProject(idx)}
                                className="rounded-lg border border-white/[0.06] px-3 py-1 text-xs text-gray-400 transition-all hover:border-red-500/20 hover:text-red-400"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Save */}
            <div className="mt-5 flex items-center justify-between">
                <span className="text-xs text-gray-500">
                    {list.length} project{list.length !== 1 ? "s" : ""}
                </span>
                <button
                    onClick={() => onSave(list)}
                    disabled={saving}
                    className="rounded-lg bg-indigo-500 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-indigo-600 disabled:opacity-50"
                >
                    {saving ? "Saving..." : "Save Projects"}
                </button>
            </div>
        </div>
    );
}

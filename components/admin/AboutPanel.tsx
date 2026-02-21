"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Highlight {
    icon: string;
    label: string;
    value: string;
}

interface AboutData {
    paragraphs: string[];
    highlights: Highlight[];
}

interface Props {
    about: AboutData;
    saving: boolean;
    onSave: (about: AboutData) => void;
}

const inputCls =
    "w-full rounded-lg border border-white/[0.06] bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition-all focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/10";

export default function AboutPanel({ about, saving, onSave }: Props) {
    const [paragraphs, setParagraphs] = useState<string[]>(about.paragraphs);
    const [highlights, setHighlights] = useState<Highlight[]>(about.highlights);

    // New highlight form
    const [newIcon, setNewIcon] = useState("");
    const [newLabel, setNewLabel] = useState("");
    const [newValue, setNewValue] = useState("");

    // Edit state
    const [editIdx, setEditIdx] = useState<number | null>(null);
    const [editIcon, setEditIcon] = useState("");
    const [editLabel, setEditLabel] = useState("");
    const [editValue, setEditValue] = useState("");

    useEffect(() => {
        setParagraphs(about.paragraphs);
        setHighlights(about.highlights);
    }, [about]);

    /* ── Paragraph helpers ── */
    function updateParagraph(idx: number, text: string) {
        setParagraphs((prev) => prev.map((p, i) => (i === idx ? text : p)));
    }

    function addParagraph() {
        setParagraphs((prev) => [...prev, ""]);
    }

    function removeParagraph(idx: number) {
        setParagraphs((prev) => prev.filter((_, i) => i !== idx));
    }

    /* ── Highlight helpers ── */
    function addHighlight() {
        if (!newLabel.trim() || !newValue.trim()) return;
        setHighlights((prev) => [
            ...prev,
            { icon: newIcon || "✦", label: newLabel.trim(), value: newValue.trim() },
        ]);
        setNewIcon("");
        setNewLabel("");
        setNewValue("");
    }

    function removeHighlight(idx: number) {
        setHighlights((prev) => prev.filter((_, i) => i !== idx));
    }

    function startEditHighlight(idx: number) {
        setEditIdx(idx);
        setEditIcon(highlights[idx].icon);
        setEditLabel(highlights[idx].label);
        setEditValue(highlights[idx].value);
    }

    function saveEditHighlight() {
        if (editIdx === null) return;
        setHighlights((prev) =>
            prev.map((h, i) =>
                i === editIdx
                    ? { icon: editIcon || "✦", label: editLabel.trim(), value: editValue.trim() }
                    : h
            )
        );
        setEditIdx(null);
    }

    return (
        <div className="space-y-6">
            {/* Bio Paragraphs */}
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-white">Bio Paragraphs</h2>
                        <p className="mt-1 text-xs text-gray-500">
                            Edit the about section text. Each entry is a separate paragraph.
                        </p>
                    </div>
                    <button
                        onClick={addParagraph}
                        className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-indigo-600"
                    >
                        + Add
                    </button>
                </div>

                <div className="mt-5 space-y-4">
                    {paragraphs.map((p, idx) => (
                        <div key={idx} className="flex gap-3">
                            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-indigo-500/15 bg-indigo-500/[0.06] text-xs font-bold text-indigo-400">
                                {idx + 1}
                            </div>
                            <textarea
                                value={p}
                                onChange={(e) => updateParagraph(idx, e.target.value)}
                                rows={3}
                                className={`${inputCls} flex-1 resize-none`}
                                placeholder="Write a paragraph..."
                            />
                            <button
                                onClick={() => removeParagraph(idx)}
                                className="flex-shrink-0 self-start rounded-lg border border-white/[0.06] px-3 py-2 text-xs text-gray-500 transition-all hover:border-red-500/20 hover:text-red-400"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Highlights */}
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
                <h2 className="text-lg font-bold text-white">Highlight Chips</h2>
                <p className="mt-1 text-xs text-gray-500">
                    The four feature cards shown beside your bio (icon, label, value).
                </p>

                {/* Add new highlight */}
                <div className="mt-5 flex flex-col gap-3 rounded-lg border border-white/[0.04] bg-white/[0.02] p-4 sm:flex-row sm:items-end">
                    <div className="w-full sm:w-20">
                        <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-gray-500">
                            Icon
                        </label>
                        <input
                            type="text"
                            value={newIcon}
                            onChange={(e) => setNewIcon(e.target.value)}
                            placeholder="⚡"
                            className={inputCls}
                        />
                    </div>
                    <div className="flex-1">
                        <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-gray-500">
                            Label
                        </label>
                        <input
                            type="text"
                            value={newLabel}
                            onChange={(e) => setNewLabel(e.target.value)}
                            placeholder="e.g. Stack"
                            className={inputCls}
                        />
                    </div>
                    <div className="flex-1">
                        <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-gray-500">
                            Value
                        </label>
                        <input
                            type="text"
                            value={newValue}
                            onChange={(e) => setNewValue(e.target.value)}
                            placeholder="e.g. MERN / Next.js"
                            onKeyDown={(e) => e.key === "Enter" && addHighlight()}
                            className={inputCls}
                        />
                    </div>
                    <button
                        onClick={addHighlight}
                        className="rounded-lg bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-indigo-600"
                    >
                        + Add
                    </button>
                </div>

                {/* Highlights list */}
                <div className="mt-4 space-y-2">
                    <AnimatePresence>
                        {highlights.map((h, idx) => (
                            <motion.div
                                key={`${h.label}-${idx}`}
                                layout
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                className="flex items-center gap-3 rounded-lg border border-white/[0.04] bg-white/[0.015] px-4 py-2.5"
                            >
                                {editIdx === idx ? (
                                    <>
                                        <input
                                            value={editIcon}
                                            onChange={(e) => setEditIcon(e.target.value)}
                                            className="w-12 rounded border border-white/[0.06] bg-white/[0.03] px-2 py-1.5 text-center text-sm text-white outline-none"
                                        />
                                        <input
                                            value={editLabel}
                                            onChange={(e) => setEditLabel(e.target.value)}
                                            className="flex-1 rounded border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-sm text-white outline-none focus:border-indigo-500/40"
                                        />
                                        <input
                                            value={editValue}
                                            onChange={(e) => setEditValue(e.target.value)}
                                            className="flex-1 rounded border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-sm text-white outline-none focus:border-indigo-500/40"
                                        />
                                        <button onClick={saveEditHighlight} className="text-xs font-semibold text-emerald-400 hover:text-emerald-300">✓</button>
                                        <button onClick={() => setEditIdx(null)} className="text-xs font-semibold text-gray-500 hover:text-gray-300">✕</button>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-xl">{h.icon}</span>
                                        <div className="min-w-0 flex-1">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600">
                                                {h.label}
                                            </span>
                                            <p className="text-sm font-semibold text-gray-200">
                                                {h.value}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => startEditHighlight(idx)}
                                            className="text-xs text-gray-500 transition-colors hover:text-indigo-400"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => removeHighlight(idx)}
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
            </div>

            {/* Save button */}
            <div className="flex justify-end">
                <button
                    onClick={() =>
                        onSave({
                            paragraphs: paragraphs.filter((p) => p.trim()),
                            highlights,
                        })
                    }
                    disabled={saving}
                    className="rounded-lg bg-indigo-500 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-indigo-600 disabled:opacity-50"
                >
                    {saving ? "Saving..." : "Save About Section"}
                </button>
            </div>
        </div>
    );
}

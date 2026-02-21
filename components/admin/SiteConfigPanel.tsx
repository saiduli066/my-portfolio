"use client";

import { useState, useEffect } from "react";

interface SiteConfig {
    name: string;
    role: string;
    tagline: string;
    description: string;
    email: string;
    github: string;
    linkedin: string;
    twitter: string;
}

interface Props {
    config: SiteConfig;
    saving: boolean;
    onSave: (config: SiteConfig) => void;
}

const fields: { key: keyof SiteConfig; label: string; multiline?: boolean }[] = [
    { key: "name", label: "Full Name" },
    { key: "role", label: "Role / Title" },
    { key: "tagline", label: "Tagline", multiline: true },
    { key: "description", label: "Description", multiline: true },
    { key: "email", label: "Email" },
    { key: "github", label: "GitHub URL" },
    { key: "linkedin", label: "LinkedIn URL" },
    { key: "twitter", label: "Twitter URL" },
];

const inputCls =
    "w-full rounded-lg border border-white/[0.06] bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition-all focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/10";

export default function SiteConfigPanel({ config, saving, onSave }: Props) {
    const [form, setForm] = useState<SiteConfig>(config);

    useEffect(() => setForm(config), [config]);

    function update(key: keyof SiteConfig, value: string) {
        setForm((prev) => ({ ...prev, [key]: value }));
    }

    return (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
            <h2 className="text-lg font-bold text-white">Site Configuration</h2>
            <p className="mt-1 text-xs text-gray-500">
                Update your personal info, bio, and social links.
            </p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {fields.map((f) => (
                    <div
                        key={f.key}
                        className={f.multiline ? "sm:col-span-2" : ""}
                    >
                        <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-gray-500">
                            {f.label}
                        </label>
                        {f.multiline ? (
                            <textarea
                                rows={3}
                                value={form[f.key]}
                                onChange={(e) => update(f.key, e.target.value)}
                                className={`${inputCls} resize-none`}
                            />
                        ) : (
                            <input
                                type="text"
                                value={form[f.key]}
                                onChange={(e) => update(f.key, e.target.value)}
                                className={inputCls}
                            />
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-6 flex justify-end">
                <button
                    onClick={() => onSave(form)}
                    disabled={saving}
                    className="rounded-lg bg-indigo-500 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-indigo-600 disabled:opacity-50"
                >
                    {saving ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </div>
    );
}

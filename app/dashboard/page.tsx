"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDashboardData } from "@/lib/useDashboardData";
import SiteConfigPanel from "@/components/admin/SiteConfigPanel";
import SkillsPanel from "@/components/admin/SkillsPanel";
import ProjectsPanel from "@/components/admin/ProjectsPanel";
import AboutPanel from "@/components/admin/AboutPanel";

const tabs = [
    { id: "site", label: "Site Config", icon: "⚙️" },
    { id: "about", label: "About", icon: "👤" },
    { id: "skills", label: "Skills", icon: "🛠️" },
    { id: "projects", label: "Projects", icon: "📂" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState<TabId>("site");
    const { data, loading, saving, toast, save } = useDashboardData();

    if (loading || !data) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
                    <p className="text-xs text-gray-500">Loading data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Heading */}
            <div>
                <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                <p className="mt-1 text-sm text-gray-500">
                    Manage your portfolio content. Changes write directly to{" "}
                    <code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-xs text-indigo-400">
                        data.ts
                    </code>
                </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 rounded-xl border border-white/[0.06] bg-white/[0.02] p-1">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${activeTab === tab.id
                                ? "text-white"
                                : "text-gray-500 hover:text-gray-300"
                            }`}
                    >
                        {activeTab === tab.id && (
                            <motion.div
                                layoutId="dashboard-tab"
                                className="absolute inset-0 rounded-lg bg-white/[0.06]"
                                transition={{
                                    type: "spring",
                                    stiffness: 380,
                                    damping: 30,
                                }}
                            />
                        )}
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            <span className="hidden sm:inline">{tab.icon}</span>
                            {tab.label}
                        </span>
                    </button>
                ))}
            </div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    {activeTab === "site" && (
                        <SiteConfigPanel
                            config={data.siteConfig}
                            saving={saving}
                            onSave={(cfg) => save({ siteConfig: cfg })}
                        />
                    )}
                    {activeTab === "about" && (
                        <AboutPanel
                            about={data.about}
                            saving={saving}
                            onSave={(about) => save({ about })}
                        />
                    )}
                    {activeTab === "skills" && (
                        <SkillsPanel
                            skills={data.skills}
                            saving={saving}
                            onSave={(skills) => save({ skills })}
                        />
                    )}
                    {activeTab === "projects" && (
                        <ProjectsPanel
                            projects={data.projects}
                            saving={saving}
                            onSave={(projects) => save({ projects })}
                        />
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Toast */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className={`fixed bottom-6 right-6 z-50 rounded-xl border px-5 py-3 text-sm font-medium shadow-lg backdrop-blur-sm ${toast.type === "ok"
                                ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                                : "border-red-500/20 bg-red-500/10 text-red-400"
                            }`}
                    >
                        {toast.msg}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

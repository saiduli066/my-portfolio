"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/lib/AuthContext";

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

interface Skill {
    name: string;
    category: "frontend" | "backend" | "ai" | "devops";
}

interface Project {
    title: string;
    description: string;
    tags: string[];
    image: string;
    github?: string;
    live?: string;
}

interface Highlight {
    icon: string;
    label: string;
    value: string;
}

interface AboutData {
    paragraphs: string[];
    highlights: Highlight[];
}

export interface DashboardData {
    siteConfig: SiteConfig;
    skills: Skill[];
    projects: Project[];
    about: AboutData;
}

export function useDashboardData() {
    const { token } = useAuth();

    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState<{ msg: string; type: "ok" | "err" } | null>(null);

    const getHeaders = useCallback((): Record<string, string> => ({
        Authorization: `Bearer ${token ?? ""}`,
        "Content-Type": "application/json",
    }), [token]);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/data", { headers: getHeaders() });
            const json = await res.json();
            setData(json);
        } catch {
            setToast({ msg: "Failed to load data", type: "err" });
        } finally {
            setLoading(false);
        }
    }, [getHeaders]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const save = useCallback(
        async (partial: Partial<DashboardData>) => {
            setSaving(true);
            try {
                const res = await fetch("/api/data", {
                    method: "PUT",
                    headers: getHeaders(),
                    body: JSON.stringify(partial),
                });
                const json = await res.json();
                if (json.ok) {
                    setToast({ msg: "Changes saved!", type: "ok" });
                    await fetchData();
                } else {
                    setToast({ msg: "Save failed", type: "err" });
                }
            } catch {
                setToast({ msg: "Network error", type: "err" });
            } finally {
                setSaving(false);
                setTimeout(() => setToast(null), 3000);
            }
        },
        [fetchData, getHeaders],
    );

    return { data, loading, saving, toast, save, refetch: fetchData };
}

"use client";

import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isAuthenticated, logout } = useAuth();
    const router = useRouter();
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            router.replace("/admin");
        } else {
            setChecked(true);
        }
    }, [isAuthenticated, router]);

    if (!checked) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#0b0b0f]">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0b0b0f]">
            {/* Dashboard top bar */}
            <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0b0b0f]/80 backdrop-blur-2xl">
                <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/dashboard"
                            className="text-sm font-bold text-white"
                        >
                            <span className="text-indigo-400">⚡</span> Admin
                            Dashboard
                        </Link>
                        <span className="hidden h-4 w-px bg-white/10 sm:block" />
                        <Link
                            href="/"
                            target="_blank"
                            className="hidden text-xs text-gray-500 transition-colors hover:text-white sm:block"
                        >
                            View Site →
                        </Link>
                    </div>
                    <button
                        onClick={() => {
                            logout();
                            router.replace("/admin");
                        }}
                        className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-gray-400 transition-all hover:border-red-500/20 hover:bg-red-500/[0.06] hover:text-red-400"
                    >
                        Logout
                    </button>
                </div>
            </header>

            {/* Content */}
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
                {children}
            </main>
        </div>
    );
}

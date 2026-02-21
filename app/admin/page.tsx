"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/AuthContext";

export default function AdminLoginPage() {
    const { login } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError("");
        const result = await login(email, password);
        if (result.ok) {
            setSuccess(true);
            setTimeout(() => router.push("/dashboard"), 800);
        } else {
            setError(result.error ?? "Login failed");
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#0b0b0f] px-4">
            {/* Background glow */}
            <div className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-500/[0.06] blur-[160px]" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative w-full max-w-sm"
            >
                {/* Card */}
                <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-white/[0.015] p-8 backdrop-blur-sm">
                    {/* Top accent */}
                    <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

                    {/* Corner brackets */}
                    <span className="absolute left-3 top-3 h-5 w-5 border-l border-t border-white/[0.08]" />
                    <span className="absolute bottom-3 right-3 h-5 w-5 border-b border-r border-white/[0.08]" />

                    <div className="text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/[0.08]">
                            <svg className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                            </svg>
                        </div>
                        <h1 className="mt-4 text-xl font-bold text-white">Admin Login</h1>
                        <p className="mt-1.5 text-xs text-gray-500">
                            Enter your credentials to access the dashboard
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-5">
                        <div className="space-y-1.5">
                            <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500">
                                <span className="h-1 w-1 rounded-full bg-indigo-500/50" />
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@example.com"
                                required
                                className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-all focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/10"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500">
                                <span className="h-1 w-1 rounded-full bg-indigo-500/50" />
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-all focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/10"
                            />
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="rounded-lg border border-red-500/20 bg-red-500/[0.08] px-4 py-2.5 text-center text-sm text-red-400"
                            >
                                {error}
                            </motion.div>
                        )}

                        {success && (
                            <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="rounded-lg border border-emerald-500/20 bg-emerald-500/[0.08] px-4 py-2.5 text-center text-sm text-emerald-400"
                            >
                                Login successful! Redirecting...
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={success}
                            className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:shadow-xl hover:shadow-indigo-500/30 disabled:opacity-60"
                        >
                            {success ? "Redirecting..." : "Sign In"}
                        </button>
                    </form>

                    <p className="mt-5 text-center text-[10px] text-gray-600">
                        This is a private admin area
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

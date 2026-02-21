"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/data";
import { fadeUp, stagger, viewport } from "@/lib/animations";

const inputClasses =
    "w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-5 py-4 text-sm text-white placeholder-gray-600 outline-none transition-all duration-300 focus:border-indigo-500/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-indigo-500/10 focus:shadow-[0_0_20px_rgba(99,102,241,0.06)]";

export default function Contact() {
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
    const [focused, setFocused] = useState<string | null>(null);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("sending");

        const form = e.currentTarget;
        const data = new FormData(form);
        data.append("access_key", "a5b7dba9-df6c-4d75-a43d-b54d6a5af1c7");
        data.append("to_email", siteConfig.email);
        data.append("subject", `Portfolio Contact from ${data.get("name")}`);

        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: data,
            });
            const json = await res.json();
            if (json.success) {
                setStatus("sent");
                form.reset();
                setTimeout(() => setStatus("idle"), 5000);
            } else {
                setStatus("error");
                setTimeout(() => setStatus("idle"), 5000);
            }
        } catch {
            setStatus("error");
            setTimeout(() => setStatus("idle"), 5000);
        }
    }

    return (
        <section id="contact" className="section-pad relative overflow-hidden">
            {/* Background glows */}
            <div className="pointer-events-none absolute bottom-0 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-indigo-500/[0.04] blur-[180px]" />
            <div className="pointer-events-none absolute -left-32 top-1/4 h-[300px] w-[300px] rounded-full bg-violet-500/[0.03] blur-[120px]" />

            <div className="relative z-10 mx-auto max-w-2xl px-6">
                {/* Section header */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    className="text-center"
                >
                    <span className="inline-block rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
                        Contact
                    </span>
                    <h2 className="mt-5 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                        Get In Touch
                    </h2>
                    <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-gray-500">
                        Have a project in mind or want to collaborate?
                        <br />
                        I&apos;d love to hear from you.
                    </p>

                    {/* Quick contact row */}
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-[12px] text-gray-500">
                        <a
                            href={`mailto:${siteConfig.email}`}
                            className="flex items-center gap-1.5 transition-colors hover:text-white"
                        >
                            <svg className="h-3.5 w-3.5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.093L2.25 6.75" />
                            </svg>
                            {siteConfig.email}
                        </a>
                        <span className="h-3 w-px bg-white/10" />
                        <a
                            href={siteConfig.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 transition-colors hover:text-white"
                        >
                            <svg className="h-3.5 w-3.5 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                            GitHub
                        </a>
                    </div>
                </motion.div>

                {/* Form panel */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    custom={1}
                    className="group/panel relative mt-8 overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-white/[0.015] p-5 backdrop-blur-sm transition-all duration-500 hover:border-white/[0.1] sm:mt-10 sm:p-8 md:p-10"
                >
                    {/* Top accent line */}
                    <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/15 to-transparent" />

                    {/* Corner decorations */}
                    <span className="absolute left-4 top-4 h-6 w-6 border-l border-t border-white/[0.06] transition-colors duration-500 group-hover/panel:border-indigo-500/20" />
                    <span className="absolute bottom-4 right-4 h-6 w-6 border-b border-r border-white/[0.06] transition-colors duration-500 group-hover/panel:border-indigo-500/20" />

                    {/* Grid pattern */}
                    <div className="pointer-events-none absolute inset-0 grid-bg opacity-15" />

                    {/* Glow that follows focus */}
                    <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-indigo-500/[0.04] blur-[80px] transition-opacity duration-700" style={{ opacity: focused ? 1 : 0 }} />

                    <motion.form
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport}
                        onSubmit={handleSubmit}
                        className="relative flex flex-col gap-6"
                    >
                        {/* Honeypot spam protection */}
                        <input type="checkbox" name="botcheck" className="hidden" />

                        <div className="grid gap-5 sm:grid-cols-2">
                            <motion.div variants={fadeUp} className="space-y-2.5">
                                <label
                                    htmlFor="name"
                                    className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] transition-colors duration-300 ${focused === "name" ? "text-indigo-400" : "text-gray-500"}`}
                                >
                                    <span className={`h-1 w-1 rounded-full transition-colors duration-300 ${focused === "name" ? "bg-indigo-400" : "bg-indigo-500/50"}`} />
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="Your name"
                                    required
                                    onFocus={() => setFocused("name")}
                                    onBlur={() => setFocused(null)}
                                    className={inputClasses}
                                />
                            </motion.div>
                            <motion.div variants={fadeUp} className="space-y-2.5">
                                <label
                                    htmlFor="email"
                                    className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] transition-colors duration-300 ${focused === "email" ? "text-indigo-400" : "text-gray-500"}`}
                                >
                                    <span className={`h-1 w-1 rounded-full transition-colors duration-300 ${focused === "email" ? "bg-indigo-400" : "bg-indigo-500/50"}`} />
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    required
                                    onFocus={() => setFocused("email")}
                                    onBlur={() => setFocused(null)}
                                    className={inputClasses}
                                />
                            </motion.div>
                        </div>

                        <motion.div variants={fadeUp} className="space-y-2.5">
                            <label
                                htmlFor="message"
                                className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] transition-colors duration-300 ${focused === "message" ? "text-indigo-400" : "text-gray-500"}`}
                            >
                                <span className={`h-1 w-1 rounded-full transition-colors duration-300 ${focused === "message" ? "bg-indigo-400" : "bg-indigo-500/50"}`} />
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={6}
                                placeholder="Tell me about your project..."
                                required
                                onFocus={() => setFocused("message")}
                                onBlur={() => setFocused(null)}
                                className={`${inputClasses} resize-none`}
                            />
                        </motion.div>

                        {/* Progress line */}
                        <motion.div variants={fadeUp}>
                            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
                        </motion.div>

                        <motion.div variants={fadeUp} className="flex flex-col items-center gap-4 pt-1">
                            <motion.button
                                type="submit"
                                disabled={status === "sending"}
                                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(99,102,241,0.2)" }}
                                whileTap={{ scale: 0.98 }}
                                className="group relative w-full overflow-hidden rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:shadow-xl hover:shadow-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-12 sm:py-4"
                            >
                                <span className="relative z-10 flex items-center gap-2.5">
                                    {status === "sending" ? (
                                        <>
                                            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                            </svg>
                                        </>
                                    )}
                                </span>
                                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-indigo-600 to-violet-600 transition-transform duration-500 group-hover:translate-x-0" />
                            </motion.button>

                            {/* Status messages */}
                            <AnimatePresence mode="wait">
                                {status === "sent" && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                        className="flex items-center gap-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.08] px-5 py-3"
                                    >
                                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20">
                                            <svg className="h-3.5 w-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-sm font-medium text-emerald-400">
                                            Message sent! I&apos;ll get back to you soon.
                                        </span>
                                    </motion.div>
                                )}
                                {status === "error" && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                        className="flex items-center gap-2.5 rounded-xl border border-red-500/20 bg-red-500/[0.08] px-5 py-3"
                                    >
                                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/20">
                                            <svg className="h-3.5 w-3.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </div>
                                        <span className="text-sm font-medium text-red-400">
                                            Failed to send. Please try again.
                                        </span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </motion.form>
                </motion.div>
            </div>
        </section>
    );
}

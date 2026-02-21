"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/data";
import { fadeUp, stagger } from "@/lib/animations";
import HeroCanvas from "./HeroCanvas";
import { smoothScroll } from "../Navbar";

export default function Hero() {
    return (
        <section
            id="home"
            className="relative flex min-h-screen items-center overflow-hidden"
        >
            {/* ── Layered background ── */}
            <div
                className="pointer-events-none absolute inset-0 z-0"
                style={{
                    background:
                        "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(99,102,241,0.10) 0%, transparent 70%)",
                }}
            />
            <div className="pointer-events-none absolute -left-60 top-1/3 h-[600px] w-[600px] rounded-full bg-violet-600/[0.05] blur-[180px]" />
            <div className="pointer-events-none absolute -right-40 bottom-1/4 h-[500px] w-[500px] rounded-full bg-indigo-500/[0.04] blur-[150px]" />

            {/* ── Grid overlay ── */}
            <div className="pointer-events-none absolute inset-0 z-[1] grid-bg opacity-40" />

            {/* ── Content ── */}
            <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-4 pt-20 sm:px-6 sm:pt-24 lg:grid-cols-[1.1fr_1fr] lg:gap-8 lg:pt-0">
                {/* Left — Text */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col gap-6"
                >
                    {/* Status badge */}
                    <motion.div
                        variants={fadeUp}
                        custom={0}
                        className="flex w-fit items-center gap-2.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] px-4 py-1.5"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                        </span>
                        <span className="text-[11px] font-semibold tracking-wide text-emerald-400">
                            Available for opportunities
                        </span>
                    </motion.div>

                    {/* Role */}
                    <motion.p
                        variants={fadeUp}
                        custom={1}
                        className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-400/80"
                    >
                        {siteConfig.role}
                    </motion.p>

                    {/* Name */}
                    <motion.h1
                        variants={fadeUp}
                        custom={2}
                        className="text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
                    >
                        <span className="bg-gradient-to-b from-white via-white to-gray-500 bg-clip-text text-transparent">
                            {siteConfig.name}
                        </span>
                        <span className="text-indigo-400">.</span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        variants={fadeUp}
                        custom={3}
                        className="max-w-lg text-base leading-relaxed text-gray-400/90"
                    >
                        {siteConfig.description}
                    </motion.p>

                    {/* Tech stack pills */}
                    <motion.div
                        variants={fadeUp}
                        custom={4}
                        className="flex flex-wrap gap-2"
                    >
                        {[
                            { label: "React", color: "border-sky-500/20 text-sky-400" },
                            { label: "Next.js", color: "border-white/10 text-white" },
                            { label: "Node.js", color: "border-emerald-500/20 text-emerald-400" },
                            { label: "MongoDB", color: "border-green-500/20 text-green-400" },
                            { label: "TypeScript", color: "border-blue-500/20 text-blue-400" },
                        ].map((t) => (
                            <span
                                key={t.label}
                                className={`rounded-full border bg-white/[0.02] px-3.5 py-1 text-[11px] font-semibold ${t.color}`}
                            >
                                {t.label}
                            </span>
                        ))}
                    </motion.div>

                    {/* CTAs */}
                    <motion.div
                        variants={fadeUp}
                        custom={5}
                        className="mt-2 flex flex-wrap items-center gap-4"
                    >
                        <a
                            href="#projects"
                            onClick={(e) => smoothScroll(e, "#projects")}
                            className="group relative overflow-hidden rounded-full bg-indigo-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/30"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                View Projects
                                <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M3 8h10M9 4l4 4-4 4" />
                                </svg>
                            </span>
                            <span className="absolute inset-0 -translate-x-full bg-indigo-600 transition-transform duration-300 group-hover:translate-x-0" />
                        </a>
                        <a
                            href="#contact"
                            onClick={(e) => smoothScroll(e, "#contact")}
                            className="group rounded-full border border-white/10 px-8 py-3 text-sm font-semibold text-gray-300 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04] hover:text-white"
                        >
                            Let&apos;s Talk
                        </a>
                    </motion.div>

                    {/* Social links */}
                    <motion.div
                        variants={fadeUp}
                        custom={6}
                        className="flex items-center gap-5"
                    >
                        <a
                            href={siteConfig.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[13px] font-medium text-gray-500 transition-colors hover:text-white"
                        >
                            GitHub
                        </a>
                        <span className="h-3 w-px bg-white/10" />
                        <a
                            href={siteConfig.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[13px] font-medium text-gray-500 transition-colors hover:text-white"
                        >
                            LinkedIn
                        </a>
                    </motion.div>
                </motion.div>

                {/* Right — 3D Canvas (visible on ALL screens) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.6, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                    className="relative flex h-[280px] items-center justify-center sm:h-[350px] md:h-[420px] lg:h-[600px]"
                >
                    <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/[0.07] blur-[100px]" />
                    <HeroCanvas />
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="absolute bottom-4 left-1/2 z-10 hidden -translate-x-1/2 sm:block sm:bottom-8"
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-gray-600">
                        Scroll
                    </span>
                    <span className="block h-8 w-px animate-pulse bg-gradient-to-b from-indigo-500/50 to-transparent" />
                </div>
            </motion.div>
        </section>
    );
}

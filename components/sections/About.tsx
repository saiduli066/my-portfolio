"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { siteConfig, about } from "@/lib/data";
import { fadeUp, slideLeft, slideRight, stagger, viewport } from "@/lib/animations";
import myPhoto from "@/assets/my-photo.jpg";

const borderColors = [
    "border-sky-500/15",
    "border-violet-500/15",
    "border-emerald-500/15",
    "border-amber-500/15",
];

export default function About() {
    return (
        <section id="about" className="section-pad relative overflow-hidden">
            {/* Background */}
            <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-indigo-500/[0.03] blur-[140px]" />

            <div className="relative z-10 mx-auto max-w-6xl px-6">
                {/* Section header */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    className="text-center"
                >
                    <span className="inline-block rounded-full border border-indigo-500/20 bg-indigo-500/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-400">
                        About
                    </span>
                    <h2 className="mt-5 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                        Get to know me
                    </h2>
                    <p className="mx-auto mt-4 max-w-md text-sm text-gray-500">
                        Engineer, tinkerer, relentless builder.
                    </p>
                </motion.div>

                <div className="mt-10 grid gap-10 sm:mt-14 sm:gap-14 md:grid-cols-[0.85fr_1fr] md:items-center lg:gap-20">
                    {/* Left — Visual card */}
                    <motion.div
                        variants={slideLeft}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport}
                        className="flex justify-center"
                    >
                        <div className="group relative">
                            {/* Outer glow */}
                            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-indigo-500/20 to-violet-600/10 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />

                            {/* Card */}
                            <div className="relative flex h-[360px] w-60 flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-white/[0.01] sm:h-[420px] sm:w-72 md:w-80">
                                {/* Grid pattern */}
                                <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />

                                {/* Profile photo */}
                                <div className="relative px-6 pt-2">
                                    {/* Animated glow behind photo */}
                                    <div className="absolute inset-0 m-auto h-40 w-32 rounded-2xl bg-indigo-500/20 blur-2xl transition-all duration-700 group-hover:bg-indigo-400/25 group-hover:blur-3xl" />

                                    {/* Outer decorative frame */}
                                    <div className="absolute -inset-3 rounded-2xl border border-dashed border-white/[0.06]" />

                                    {/* Gradient border wrapper */}
                                    <div className="relative rounded-xl bg-gradient-to-br from-indigo-500/30 via-violet-500/20 to-sky-500/30 p-[1.5px]">
                                        {/* Corner brackets */}
                                        <span className="absolute -left-2 -top-2 h-4 w-4 border-l-2 border-t-2 border-indigo-400/40" />
                                        <span className="absolute -right-2 -top-2 h-4 w-4 border-r-2 border-t-2 border-violet-400/40" />
                                        <span className="absolute -bottom-2 -left-2 h-4 w-4 border-b-2 border-l-2 border-sky-400/40" />
                                        <span className="absolute -bottom-2 -right-2 h-4 w-4 border-b-2 border-r-2 border-indigo-400/40" />

                                        {/* Accent dots */}
                                        <span className="absolute -right-1 top-1/4 h-1.5 w-1.5 rounded-full bg-indigo-400 shadow-sm shadow-indigo-400/60" />
                                        <span className="absolute -left-1 top-3/4 h-1.5 w-1.5 rounded-full bg-violet-400 shadow-sm shadow-violet-400/60" />
                                        <span className="absolute left-1/3 -top-1 h-1.5 w-1.5 rounded-full bg-sky-400 shadow-sm shadow-sky-400/60" />

                                        <div className="relative h-40 w-32 overflow-hidden rounded-[10px] sm:h-48 sm:w-40">
                                            {/* Top light reflection */}
                                            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-white/[0.06] to-transparent" />
                                            {/* Bottom vignette */}
                                            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-black/30 to-transparent" />
                                            {/* Color tint overlay */}
                                            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-indigo-500/[0.06] via-transparent to-violet-500/[0.06]" />
                                            <Image
                                                src={myPhoto}
                                                alt={siteConfig.name}
                                                fill
                                                sizes="160px"
                                                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                            />
                                        </div>
                                    </div>

                                    {/* Side accent lines */}
                                    <span className="absolute -left-5 top-1/2 h-12 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-indigo-500/25 to-transparent" />
                                    <span className="absolute -right-5 top-1/2 h-12 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-violet-500/25 to-transparent" />
                                </div>

                                <div className="flex flex-col items-center gap-1">
                                    <span className="text-base font-bold text-white">
                                        {siteConfig.name}
                                    </span>
                                    <span className="text-xs font-medium text-gray-500">
                                        {siteConfig.role}
                                    </span>
                                </div>

                                {/* Status */}
                                <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-1">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    <span className="text-[10px] font-semibold text-emerald-400">
                                        Open to work
                                    </span>
                                </div>

                                {/* Corner accents */}
                                <span className="absolute left-3 top-3 h-5 w-5 border-l border-t border-white/[0.08]" />
                                <span className="absolute bottom-3 right-3 h-5 w-5 border-b border-r border-white/[0.08]" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Right — Copy + highlights */}
                    <motion.div
                        variants={slideRight}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport}
                        className="flex flex-col gap-6"
                    >
                        <div className="space-y-4 text-[15px] leading-[1.8] text-gray-400">
                            {about.paragraphs.map((p, i) => (
                                <p key={i}>{p}</p>
                            ))}
                        </div>

                        {/* Highlight chips */}
                        <motion.div
                            variants={stagger}
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewport}
                            className="grid grid-cols-2 gap-3"
                        >
                            {about.highlights.map((h, i) => (
                                <motion.div
                                    key={h.label}
                                    variants={fadeUp}
                                    custom={i}
                                    className={`group rounded-xl border ${borderColors[i % borderColors.length]} bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.04]`}
                                >
                                    <span className="text-lg">{h.icon}</span>
                                    <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-600">
                                        {h.label}
                                    </p>
                                    <p className="mt-1 text-sm font-semibold text-gray-300">
                                        {h.value}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>

                        <a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group mt-2 flex w-fit items-center gap-2 rounded-full border border-indigo-500/25 bg-indigo-500/[0.06] px-6 py-2.5 text-sm font-semibold text-indigo-400 transition-all hover:border-indigo-400/40 hover:bg-indigo-500/10"
                        >
                            Download Resume
                            <svg
                                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                                viewBox="0 0 16 16"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M3 8h10M9 4l4 4-4 4" />
                            </svg>
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

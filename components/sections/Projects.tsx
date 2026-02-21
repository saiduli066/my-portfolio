"use client";

import { useRef } from "react";
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
} from "framer-motion";
import { projects, type Project } from "@/lib/data";
import { fadeUp, stagger, viewport } from "@/lib/animations";

/* ── Project card with tilt + cursor glow ── */
function ProjectCard({ project, index }: { project: Project; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), {
        stiffness: 250,
        damping: 25,
    });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), {
        stiffness: 250,
        damping: 25,
    });
    const glowX = useTransform(x, [-0.5, 0.5], ["20%", "80%"]);
    const glowY = useTransform(y, [-0.5, 0.5], ["20%", "80%"]);

    function onMove(e: React.MouseEvent) {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    }

    function onLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.article
            ref={ref}
            variants={fadeUp}
            custom={index}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{ rotateX, rotateY, transformPerspective: 900 }}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-white/[0.01] transition-all duration-500 hover:border-white/[0.1] hover:shadow-2xl hover:shadow-indigo-500/[0.05]"
        >
            {/* Cursor-following glow */}
            <motion.div
                className="pointer-events-none absolute -inset-px z-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                    background: useTransform(
                        [glowX, glowY],
                        ([gx, gy]) =>
                            `radial-gradient(400px circle at ${gx} ${gy}, rgba(99,102,241,0.08), transparent 60%)`
                    ),
                }}
            />

            {/* Image / Preview area */}
            <div className="relative flex h-48 items-center justify-center overflow-hidden border-b border-white/[0.04] bg-gradient-to-br from-[#12121a] to-[#0b0b0f]">
                {/* Decorative code badge */}
                <div className="flex flex-col items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/[0.08]">
                        <span className="font-mono text-lg font-bold text-indigo-400">
                            {String(index + 1).padStart(2, "0")}
                        </span>
                    </div>
                    <span className="text-[11px] font-semibold text-gray-600 transition-colors group-hover:text-gray-400">
                        {project.title}
                    </span>
                </div>

                {/* Shimmer */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.02] to-transparent transition-transform duration-[1200ms] ease-out group-hover:translate-x-full" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-1 flex-col p-6">
                <h3 className="text-base font-bold text-white">{project.title}</h3>
                <p className="mt-2.5 text-[13px] leading-relaxed text-gray-500">
                    {project.description}
                </p>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-md border border-white/[0.05] bg-white/[0.03] px-2.5 py-0.5 text-[10px] font-semibold text-gray-500 transition-colors group-hover:text-gray-400"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Links */}
                <div className="mt-auto flex items-center gap-5 pt-6 text-[13px] font-semibold">
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-gray-500 transition-colors hover:text-white"
                        >
                            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                            </svg>
                            Source
                        </a>
                    )}
                    {project.live && (
                        <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-indigo-400 transition-colors hover:text-indigo-300"
                        >
                            <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M6.5 3.5h-3a1 1 0 00-1 1v8a1 1 0 001 1h8a1 1 0 001-1v-3M9.5 2.5h4v4M6.5 9.5l7-7" />
                            </svg>
                            Live Demo
                        </a>
                    )}
                </div>
            </div>
        </motion.article>
    );
}

export default function Projects() {
    return (
        <section id="projects" className="section-pad relative overflow-hidden">
            <div className="pointer-events-none absolute left-1/3 top-0 h-[600px] w-[600px] rounded-full bg-indigo-500/[0.03] blur-[160px]" />

            <div className="relative z-10 mx-auto max-w-6xl px-6">
                {/* Section header */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    className="text-center"
                >
                    <span className="inline-block rounded-full border border-sky-500/20 bg-sky-500/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-400">
                        Projects
                    </span>
                    <h2 className="mt-5 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                        Featured Work
                    </h2>
                    <p className="mx-auto mt-4 max-w-md text-sm text-gray-500">
                        A selection of projects I&apos;ve designed and built end-to-end.
                    </p>
                </motion.div>

                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {projects.map((project, i) => (
                        <ProjectCard key={project.title} project={project} index={i} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

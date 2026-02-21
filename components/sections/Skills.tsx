"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { skills, type Skill } from "@/lib/data";
import { fadeUp, stagger, viewport } from "@/lib/animations";

const categoryMeta: Record<
    string,
    { label: string; color: string; border: string; bg: string; dot: string }
> = {
    frontend: {
        label: "Frontend",
        color: "text-sky-400",
        border: "border-sky-500/15",
        bg: "bg-sky-500/[0.06]",
        dot: "bg-sky-500",
    },
    backend: {
        label: "Backend",
        color: "text-emerald-400",
        border: "border-emerald-500/15",
        bg: "bg-emerald-500/[0.06]",
        dot: "bg-emerald-500",
    },
    ai: {
        label: "AI & Automation",
        color: "text-violet-400",
        border: "border-violet-500/15",
        bg: "bg-violet-500/[0.06]",
        dot: "bg-violet-500",
    },
    devops: {
        label: "Tools & Deployment",
        color: "text-amber-400",
        border: "border-amber-500/15",
        bg: "bg-amber-500/[0.06]",
        dot: "bg-amber-500",
    },
};

const categoryOrder = ["frontend", "backend", "ai", "devops"] as const;

/* ── 3D-tilt skill card ── */
function TiltCard({ skill, index }: { skill: Skill; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
        stiffness: 300,
        damping: 30,
    });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
        stiffness: 300,
        damping: 30,
    });

    const meta = categoryMeta[skill.category];

    function handleMouse(e: React.MouseEvent) {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    }

    function handleLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            ref={ref}
            variants={fadeUp}
            custom={index}
            onMouseMove={handleMouse}
            onMouseLeave={handleLeave}
            style={{ rotateX, rotateY, transformPerspective: 800 }}
            className={`group relative cursor-default overflow-hidden rounded-xl border ${meta.border} bg-white/[0.02] p-4 transition-all duration-300 hover:bg-white/[0.04] hover:shadow-lg hover:shadow-black/10`}
        >
            {/* Hover accent line */}
            <div className={`absolute inset-x-0 top-0 h-px ${meta.bg} opacity-0 transition-opacity group-hover:opacity-100`} />

            <p className="text-sm font-semibold text-gray-200">{skill.name}</p>
            <p className={`mt-1 text-[10px] font-bold uppercase tracking-wider ${meta.color} opacity-60`}>
                {meta.label}
            </p>
        </motion.div>
    );
}

export default function Skills() {
    return (
        <section id="skills" className="section-pad relative overflow-hidden">
            <div className="pointer-events-none absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-violet-500/[0.03] blur-[140px]" />

            <div className="relative z-10 mx-auto max-w-6xl px-6">
                {/* Section header */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    className="text-center"
                >
                    <span className="inline-block rounded-full border border-violet-500/20 bg-violet-500/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-400">
                        Skills
                    </span>
                    <h2 className="mt-5 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                        Technical Arsenal
                    </h2>
                    <p className="mx-auto mt-4 max-w-md text-sm text-gray-500">
                        The tools and technologies I use to turn ideas into production-ready systems.
                    </p>
                </motion.div>

                {/* Category sections */}
                <div className="mt-16 space-y-12">
                    {categoryOrder.map((cat) => {
                        const items = skills.filter((s) => s.category === cat);
                        const meta = categoryMeta[cat];
                        return (
                            <div key={cat}>
                                <motion.div
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={viewport}
                                    className="mb-4 flex items-center gap-3"
                                >
                                    <span className={`h-2.5 w-2.5 rounded-full ${meta.dot}`} />
                                    <h3 className={`text-xs font-bold uppercase tracking-[0.2em] ${meta.color}`}>
                                        {meta.label}
                                    </h3>
                                    <span className="h-px flex-1 bg-white/[0.04]" />
                                </motion.div>

                                <motion.div
                                    variants={stagger}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={viewport}
                                    className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                                >
                                    {items.map((skill, i) => (
                                        <TiltCard key={skill.name} skill={skill} index={i} />
                                    ))}
                                </motion.div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

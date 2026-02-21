"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/data";
import { fadeUp, viewport } from "@/lib/animations";

const socials = [
    { label: "GitHub", href: siteConfig.github },
    { label: "LinkedIn", href: siteConfig.linkedin },
    { label: "Twitter", href: siteConfig.twitter },
];

export default function Footer() {
    const year = new Date().getFullYear();

    function scrollToTop(e: React.MouseEvent<HTMLAnchorElement>) {
        e.preventDefault();
        const startY = window.scrollY;
        const duration = Math.min(1200, Math.max(600, startY * 0.5));
        let start: number | null = null;

        function easeInOutCubic(t: number) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        function step(timestamp: number) {
            if (!start) start = timestamp;
            const elapsed = timestamp - start;
            const progress = Math.min(elapsed / duration, 1);
            window.scrollTo(0, startY * (1 - easeInOutCubic(progress)));
            if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
    }

    return (
        <footer className="relative border-t border-white/[0.04] bg-[#0b0b0f]">
            {/* Top-edge glow */}
            <div className="pointer-events-none absolute -top-px left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-indigo-500/25 to-transparent" />

            <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-6 py-14 text-center"
            >
                {/* Back to top */}
                <a
                    href="#home"
                    onClick={scrollToTop}
                    className="group mb-1 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-600 transition-colors hover:text-indigo-400"
                >
                    Back to top
                    <span className="transition-transform group-hover:-translate-y-0.5">&uarr;</span>
                </a>

                {/* Social links */}
                <div className="flex gap-6">
                    {socials.map((s) => (
                        <a
                            key={s.label}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg border border-white/[0.04] bg-white/[0.02] px-4 py-1.5 text-[12px] font-medium text-gray-500 transition-all hover:border-white/[0.08] hover:text-white"
                        >
                            {s.label}
                        </a>
                    ))}
                </div>

                <div className="h-px w-20 bg-white/[0.06]" />

                <p className="text-[11px] text-gray-600">
                    &copy; {year} {siteConfig.name}. Built with Next.js, Three.js,
                    Framer Motion &amp; Tailwind CSS.
                </p>
            </motion.div>
        </footer>
    );
}

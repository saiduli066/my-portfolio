"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, siteConfig } from "@/lib/data";
import myPhoto from "@/assets/my-photo.jpg";

export function smoothScroll(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    const navHeight = 80;
    const targetY = el
        ? el.getBoundingClientRect().top + window.scrollY - navHeight
        : 0;
    const startY = window.scrollY;
    const diff = targetY - startY;
    const duration = Math.min(1200, Math.max(600, Math.abs(diff) * 0.5));
    let start: number | null = null;

    function easeInOutCubic(t: number) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function step(timestamp: number) {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / duration, 1);
        window.scrollTo(0, startY + diff * easeInOutCubic(progress));
        if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState("#home");

    /* Track scroll position for glass effect & active section */
    const handleScroll = useCallback(() => {
        setScrolled(window.scrollY > 40);

        const sections = navLinks.map((l) => l.href.slice(1));
        for (let i = sections.length - 1; i >= 0; i--) {
            const el = document.getElementById(sections[i]);
            if (el && el.getBoundingClientRect().top <= 120) {
                setActive(`#${sections[i]}`);
                break;
            }
        }
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    return (
        <motion.header
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            className={`fixed top-0 z-50 w-full transition-all duration-500 ${scrolled
                ? "border-b border-white/[0.06] bg-[#0b0b0f]/60 backdrop-blur-2xl shadow-lg shadow-black/20"
                : "bg-transparent"
                }`}
        >
            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                {/* Logo */}
                <a
                    href="#home"
                    onClick={(e) => smoothScroll(e, "#home")}
                    className="flex items-center gap-2 text-base font-bold tracking-tight text-white"
                >
                    <span className="relative h-7 w-5.5 overflow-hidden rounded border border-indigo-500/20">
                        <Image
                            src={myPhoto}
                            alt={siteConfig.name}
                            fill
                            className="object-cover"
                        />
                    </span>
                    <span className="hidden text-sm font-semibold sm:inline">
                        {siteConfig.name}
                        <span className="text-indigo-400">.</span>
                    </span>
                </a>

                {/* Desktop links */}
                <ul className="hidden items-center gap-1 md:flex">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                onClick={(e) => smoothScroll(e, link.href)}
                                className={`relative rounded-lg px-3.5 py-1.5 text-[13px] font-medium transition-all duration-300 ${active === link.href
                                    ? "text-white"
                                    : "text-gray-500 hover:text-gray-300"
                                    }`}
                            >
                                {active === link.href && (
                                    <motion.span
                                        layoutId="nav-active"
                                        className="absolute inset-0 rounded-lg bg-white/[0.06]"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{link.label}</span>
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Mobile toggle */}
                <button
                    onClick={() => setOpen((v) => !v)}
                    className="relative z-50 flex h-8 w-8 flex-col items-center justify-center gap-[5px] md:hidden"
                    aria-label="Toggle menu"
                >
                    <span
                        className={`block h-[1.5px] w-5 rounded-full bg-white transition-all duration-300 ${open ? "translate-y-[6.5px] rotate-45" : ""
                            }`}
                    />
                    <span
                        className={`block h-[1.5px] w-5 rounded-full bg-white transition-all duration-300 ${open ? "opacity-0" : ""
                            }`}
                    />
                    <span
                        className={`block h-[1.5px] w-5 rounded-full bg-white transition-all duration-300 ${open ? "-translate-y-[6.5px] -rotate-45" : ""
                            }`}
                    />
                </button>
            </nav>

            {/* Mobile menu */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="overflow-hidden border-t border-white/[0.06] bg-[#0b0b0f]/95 backdrop-blur-2xl md:hidden"
                    >
                        <ul className="flex flex-col gap-1 px-4 py-4">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        onClick={(e) => {
                                            smoothScroll(e, link.href);
                                            setOpen(false);
                                        }}
                                        className={`block rounded-lg px-3 py-2.5 text-sm transition-colors ${active === link.href
                                            ? "bg-white/[0.04] text-white"
                                            : "text-gray-400 hover:text-white"
                                            }`}
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}

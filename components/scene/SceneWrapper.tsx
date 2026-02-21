"use client";

import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { Suspense, useState, useEffect, type ReactNode } from "react";

interface Props {
    children: ReactNode;
    className?: string;
}

/**
 * Reusable R3F canvas wrapper.
 * Handles suspense, DPR, GL settings, resize, and responsive camera.
 */
export default function SceneWrapper({ children, className }: Props) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia("(max-width: 768px)");
        setIsMobile(mq.matches);
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    return (
        <Canvas
            className={className}
            dpr={[1, isMobile ? 1.25 : 1.5]}
            gl={{ antialias: !isMobile, alpha: true, powerPreference: "high-performance" }}
            camera={{ position: [0, 0, isMobile ? 6.5 : 5], fov: isMobile ? 50 : 45 }}
        >
            <Suspense fallback={null}>
                {children}
                <Preload all />
            </Suspense>
        </Canvas>
    );
}

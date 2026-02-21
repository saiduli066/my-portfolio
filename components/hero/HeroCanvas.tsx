"use client";

import dynamic from "next/dynamic";

const SceneWrapper = dynamic(
    () => import("@/components/scene/SceneWrapper"),
    { ssr: false }
);
const EnvironmentScene = dynamic(
    () => import("@/components/scene/EnvironmentScene"),
    { ssr: false }
);

/**
 * Lazy-loaded Three.js hero canvas.
 * Dynamic import avoids SSR issues & keeps initial bundle light.
 */
export default function HeroCanvas() {
    return (
        <div className="h-full w-full">
            <SceneWrapper>
                <EnvironmentScene />
            </SceneWrapper>
        </div>
    );
}

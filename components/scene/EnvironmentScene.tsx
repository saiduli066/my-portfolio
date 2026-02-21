"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function useIsMobile() {
    const [mobile, setMobile] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia("(max-width: 768px)");
        setMobile(mq.matches);
        const h = (e: MediaQueryListEvent) => setMobile(e.matches);
        mq.addEventListener("change", h);
        return () => mq.removeEventListener("change", h);
    }, []);
    return mobile;
}

/* ─────────────────────────────────────────────
 *  CODE EDITOR PANEL — A tilted 3D plane that
 *  looks like VS Code with syntax-highlighted
 *  code rendered via HTML Canvas texture
 * ───────────────────────────────────────────── */
function CodeEditorPanel({
    position,
    rotation,
    scale = 1,
}: {
    position: [number, number, number];
    rotation: [number, number, number];
    scale?: number;
}) {
    const meshRef = useRef<THREE.Mesh>(null);

    const texture = useMemo(() => {
        const W = 512;
        const H = 400;
        const c = document.createElement("canvas");
        c.width = W;
        c.height = H;
        const ctx = c.getContext("2d")!;

        // Editor background
        ctx.fillStyle = "#1e1e2e";
        ctx.beginPath();
        ctx.roundRect(0, 0, W, H, 16);
        ctx.fill();

        // Title bar
        ctx.fillStyle = "#181825";
        ctx.beginPath();
        ctx.roundRect(0, 0, W, 32, [16, 16, 0, 0]);
        ctx.fill();

        // Traffic lights
        const dots = ["#f38ba8", "#fab387", "#a6e3a1"];
        dots.forEach((col, i) => {
            ctx.fillStyle = col;
            ctx.beginPath();
            ctx.arc(20 + i * 18, 16, 5, 0, Math.PI * 2);
            ctx.fill();
        });

        // File tab
        ctx.fillStyle = "#89b4fa";
        ctx.font = "bold 11px monospace";
        ctx.fillText("index.tsx", 90, 20);

        // Line numbers
        ctx.fillStyle = "#45475a";
        ctx.font = "12px monospace";
        for (let i = 0; i < 18; i++) {
            ctx.fillText(String(i + 1).padStart(2, " "), 12, 54 + i * 20);
        }

        // Syntax-highlighted code
        const codeLines: Array<Array<{ text: string; color: string }>> = [
            [
                { text: "import ", color: "#cba6f7" },
                { text: "{ useState }", color: "#f38ba8" },
                { text: " from ", color: "#cba6f7" },
                { text: "'react'", color: "#a6e3a1" },
            ],
            [
                { text: "import ", color: "#cba6f7" },
                { text: "{ motion }", color: "#f38ba8" },
                { text: " from ", color: "#cba6f7" },
                { text: "'framer-motion'", color: "#a6e3a1" },
            ],
            [],
            [
                { text: "export default ", color: "#cba6f7" },
                { text: "function ", color: "#89b4fa" },
                { text: "App", color: "#f9e2af" },
                { text: "() {", color: "#cdd6f4" },
            ],
            [
                { text: "  const ", color: "#cba6f7" },
                { text: "[count, setCount]", color: "#cdd6f4" },
                { text: " = ", color: "#89dceb" },
                { text: "useState", color: "#89b4fa" },
                { text: "(0)", color: "#fab387" },
            ],
            [],
            [
                { text: "  return ", color: "#cba6f7" },
                { text: "(", color: "#cdd6f4" },
            ],
            [
                { text: "    <", color: "#89dceb" },
                { text: "motion.div", color: "#f38ba8" },
            ],
            [
                { text: "      animate", color: "#89b4fa" },
                { text: "={{ opacity: ", color: "#cdd6f4" },
                { text: "1", color: "#fab387" },
                { text: " }}", color: "#cdd6f4" },
            ],
            [
                { text: "      className", color: "#89b4fa" },
                { text: "=", color: "#89dceb" },
                { text: '"container"', color: "#a6e3a1" },
            ],
            [{ text: "    >", color: "#89dceb" }],
            [
                { text: "      <", color: "#89dceb" },
                { text: "h1", color: "#f38ba8" },
                { text: ">Hello World</", color: "#cdd6f4" },
                { text: "h1", color: "#f38ba8" },
                { text: ">", color: "#89dceb" },
            ],
            [
                { text: "      <", color: "#89dceb" },
                { text: "Button", color: "#f9e2af" },
                { text: " onClick", color: "#89b4fa" },
                { text: "={", color: "#cdd6f4" },
                { text: "handle", color: "#89b4fa" },
                { text: "}", color: "#cdd6f4" },
            ],
            [
                { text: "        count", color: "#89b4fa" },
                { text: "={count}", color: "#cdd6f4" },
            ],
            [{ text: "      />", color: "#89dceb" }],
            [
                { text: "    </", color: "#89dceb" },
                { text: "motion.div", color: "#f38ba8" },
                { text: ">", color: "#89dceb" },
            ],
            [{ text: "  )", color: "#cdd6f4" }],
            [{ text: "}", color: "#cdd6f4" }],
        ];

        ctx.font = "12px monospace";
        codeLines.forEach((line, row) => {
            let xPos = 42;
            line.forEach(({ text, color }) => {
                ctx.fillStyle = color;
                ctx.fillText(text, xPos, 54 + row * 20);
                xPos += ctx.measureText(text).width;
            });
        });

        // Cursor
        ctx.fillStyle = "#89b4fa";
        ctx.fillRect(42 + 170, 42 + 3 * 20, 2, 16);

        const tex = new THREE.CanvasTexture(c);
        tex.needsUpdate = true;
        return tex;
    }, []);

    useFrame(({ clock }) => {
        if (meshRef.current) {
            meshRef.current.position.y =
                position[1] + Math.sin(clock.getElapsedTime() * 0.5) * 0.08;
        }
    });

    return (
        <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.2}>
            <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
                <planeGeometry args={[3.2, 2.5]} />
                <meshStandardMaterial
                    map={texture}
                    emissive={new THREE.Color("#6366f1")}
                    emissiveIntensity={0.08}
                    roughness={0.3}
                    metalness={0.1}
                    transparent
                    opacity={0.95}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </Float>
    );
}

/* ─────────────────────────────────────────────
 *  TERMINAL PANEL — Floating terminal / CLI
 * ───────────────────────────────────────────── */
function TerminalPanel({
    position,
    rotation,
    scale = 1,
}: {
    position: [number, number, number];
    rotation: [number, number, number];
    scale?: number;
}) {
    const meshRef = useRef<THREE.Mesh>(null);

    const texture = useMemo(() => {
        const W = 420;
        const H = 280;
        const c = document.createElement("canvas");
        c.width = W;
        c.height = H;
        const ctx = c.getContext("2d")!;

        ctx.fillStyle = "#11111b";
        ctx.beginPath();
        ctx.roundRect(0, 0, W, H, 14);
        ctx.fill();

        // Title bar
        ctx.fillStyle = "#181825";
        ctx.beginPath();
        ctx.roundRect(0, 0, W, 28, [14, 14, 0, 0]);
        ctx.fill();

        ctx.fillStyle = "#6c7086";
        ctx.font = "bold 10px monospace";
        ctx.fillText("terminal — zsh", 16, 18);

        const lines: Array<{ text: string; color: string }> = [
            { text: "~/portfolio $ npm run build", color: "#a6e3a1" },
            { text: "", color: "" },
            { text: "▸ Building Next.js app...", color: "#89b4fa" },
            { text: "▸ Compiling TypeScript...", color: "#89b4fa" },
            { text: "▸ Generating static pages...", color: "#89b4fa" },
            { text: "✓ Compiled successfully", color: "#a6e3a1" },
            { text: "✓ 5 pages generated", color: "#a6e3a1" },
            { text: "✓ Build completed in 4.2s", color: "#a6e3a1" },
            { text: "", color: "" },
            { text: "~/portfolio $ git push ▊", color: "#a6e3a1" },
        ];

        ctx.font = "11px monospace";
        lines.forEach((line, i) => {
            if (line.text) {
                ctx.fillStyle = line.color;
                ctx.fillText(line.text, 14, 48 + i * 19);
            }
        });

        const tex = new THREE.CanvasTexture(c);
        tex.needsUpdate = true;
        return tex;
    }, []);

    useFrame(({ clock }) => {
        if (meshRef.current) {
            meshRef.current.position.y =
                position[1] + Math.sin(clock.getElapsedTime() * 0.4 + 1) * 0.06;
        }
    });

    return (
        <Float speed={0.6} rotationIntensity={0.04} floatIntensity={0.15}>
            <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
                <planeGeometry args={[2.8, 1.87]} />
                <meshStandardMaterial
                    map={texture}
                    emissive={new THREE.Color("#a6e3a1")}
                    emissiveIntensity={0.05}
                    roughness={0.3}
                    metalness={0.1}
                    transparent
                    opacity={0.9}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </Float>
    );
}

/* ─────────────────────────────────────────────
 *  GIT BRANCH GRAPH — commits + branches
 * ───────────────────────────────────────────── */
function GitGraph() {
    const groupRef = useRef<THREE.Group>(null);

    const commits = useMemo(
        () => [
            { pos: [0, 0, 0] as [number, number, number], color: "#a6e3a1", size: 0.08 },
            { pos: [0.35, 0, 0] as [number, number, number], color: "#a6e3a1", size: 0.08 },
            { pos: [0.7, 0, 0] as [number, number, number], color: "#a6e3a1", size: 0.08 },
            { pos: [1.05, 0, 0] as [number, number, number], color: "#a6e3a1", size: 0.08 },
            { pos: [0.7, 0.3, 0] as [number, number, number], color: "#89b4fa", size: 0.07 },
            { pos: [1.05, 0.3, 0] as [number, number, number], color: "#89b4fa", size: 0.07 },
            { pos: [1.4, 0.15, 0] as [number, number, number], color: "#f9e2af", size: 0.09 },
            { pos: [1.75, 0, 0] as [number, number, number], color: "#a6e3a1", size: 0.08 },
        ],
        []
    );

    const lineObjects = useMemo(() => {
        const edges: Array<[number, number, string]> = [
            [0, 1, "#a6e3a1"],
            [1, 2, "#a6e3a1"],
            [2, 3, "#a6e3a1"],
            [2, 4, "#89b4fa"],
            [4, 5, "#89b4fa"],
            [3, 6, "#a6e3a1"],
            [5, 6, "#89b4fa"],
            [6, 7, "#a6e3a1"],
        ];
        return edges.map(([a, b, color]) => {
            const points = [
                new THREE.Vector3(...commits[a].pos),
                new THREE.Vector3(...commits[b].pos),
            ];
            const geo = new THREE.BufferGeometry().setFromPoints(points);
            const mat = new THREE.LineBasicMaterial({
                color: new THREE.Color(color),
                transparent: true,
                opacity: 0.7,
            });
            return new THREE.Line(geo, mat);
        });
    }, [commits]);

    useFrame(({ clock }) => {
        if (groupRef.current) {
            groupRef.current.position.y =
                Math.sin(clock.getElapsedTime() * 0.3 + 2) * 0.05;
        }
    });

    return (
        <group ref={groupRef} position={[-1.4, -1.4, 0.5]} scale={1.2}>
            {commits.map((commit, i) => (
                <mesh key={i} position={commit.pos}>
                    <sphereGeometry args={[commit.size, 16, 16]} />
                    <meshStandardMaterial
                        color={commit.color}
                        emissive={commit.color}
                        emissiveIntensity={0.5}
                        roughness={0.3}
                    />
                </mesh>
            ))}
            {lineObjects.map((line, i) => (
                <primitive key={i} object={line} />
            ))}
            <CanvasLabel position={[-0.3, -0.25, 0]} text="main" color="#a6e3a1" />
            <CanvasLabel position={[0.5, 0.55, 0]} text="feature" color="#89b4fa" />
        </group>
    );
}

/* Small text label via canvas */
function CanvasLabel({
    position,
    text,
    color,
}: {
    position: [number, number, number];
    text: string;
    color: string;
}) {
    const texture = useMemo(() => {
        const c = document.createElement("canvas");
        c.width = 128;
        c.height = 32;
        const ctx = c.getContext("2d")!;
        ctx.clearRect(0, 0, 128, 32);
        ctx.font = "bold 16px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = color;
        ctx.fillText(text, 64, 16);
        const tex = new THREE.CanvasTexture(c);
        tex.needsUpdate = true;
        return tex;
    }, [text, color]);

    return (
        <mesh position={position}>
            <planeGeometry args={[0.6, 0.15]} />
            <meshBasicMaterial
                map={texture}
                transparent
                depthWrite={false}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}

/* ─────────────────────────────────────────────
 *  FLOATING DATA PARTICLES
 * ───────────────────────────────────────────── */
function DataParticles({ count = 80 }: { count?: number }) {
    const pointsRef = useRef<THREE.Points>(null);

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 8;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
        }
        return pos;
    }, [count]);

    useFrame(({ clock }) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = clock.getElapsedTime() * 0.02;
            pointsRef.current.rotation.x =
                Math.sin(clock.getElapsedTime() * 0.15) * 0.03;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                    count={count}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.02}
                color="#818cf8"
                transparent
                opacity={0.5}
                sizeAttenuation
            />
        </points>
    );
}

/* ─────────────────────────────────────────────
 *  MAIN SCENE
 * ───────────────────────────────────────────── */
export default function EnvironmentScene() {
    const groupRef = useRef<THREE.Group>(null);
    const isMobile = useIsMobile();
    const s = isMobile ? 0.72 : 1;

    useFrame(({ clock, pointer }) => {
        if (groupRef.current) {
            groupRef.current.rotation.y =
                clock.getElapsedTime() * 0.02 + pointer.x * 0.15;
            groupRef.current.rotation.x = pointer.y * 0.08;
        }
    });

    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={0.8} color="#e0e7ff" />
            <directionalLight position={[-3, -2, 4]} intensity={0.3} color="#818cf8" />
            <pointLight position={[0, 2, 3]} intensity={0.4} color="#6366f1" />
            <pointLight position={[-2, -1, 2]} intensity={0.2} color="#a78bfa" />

            <group ref={groupRef} scale={[s, s, s]}>
                <CodeEditorPanel
                    position={[-0.3, 0.2, 0]}
                    rotation={[0.05, 0.25, -0.02]}
                    scale={1.05}
                />
                <TerminalPanel
                    position={[1.6, 0.8, -0.8]}
                    rotation={[0.03, -0.2, 0.02]}
                    scale={0.85}
                />
                <GitGraph />
                <DataParticles count={isMobile ? 40 : 80} />
            </group>
        </>
    );
}

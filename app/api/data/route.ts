import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { getAuthToken } from "@/lib/auth";

const DATA_PATH = path.join(process.cwd(), "lib", "data.ts");

/* ── Helpers to parse/serialize the TS file ── */

function parseSiteConfig(content: string) {
  const match = content.match(
    /export const siteConfig\s*=\s*(\{[\s\S]*?\n\};)/,
  );
  if (!match) return null;
  // eslint-disable-next-line no-eval
  return eval(`(${match[1].replace(/;$/, "")})`);
}

function parseSkills(content: string) {
  const match = content.match(
    /export const skills:\s*Skill\[\]\s*=\s*(\[[\s\S]*?\n\];)/,
  );
  if (!match) return [];
  // eslint-disable-next-line no-eval
  return eval(`(${match[1].replace(/;$/, "")})`);
}

function parseProjects(content: string) {
  const match = content.match(
    /export const projects:\s*Project\[\]\s*=\s*(\[[\s\S]*?\n\];)/,
  );
  if (!match) return [];
  // eslint-disable-next-line no-eval
  return eval(`(${match[1].replace(/;$/, "")})`);
}

function parseAbout(content: string) {
  const match = content.match(
    /export const about:\s*AboutData\s*=\s*(\{[\s\S]*?\n\};)/,
  );
  if (!match) return { paragraphs: [], highlights: [] };
  // eslint-disable-next-line no-eval
  return eval(`(${match[1].replace(/;$/, "")})`);
}

function serializeSiteConfig(cfg: Record<string, string>) {
  const lines = Object.entries(cfg)
    .map(([k, v]) => `  ${k}: ${JSON.stringify(v)},`)
    .join("\n");
  return `export const siteConfig = {\n${lines}\n};`;
}

function serializeSkills(skills: { name: string; category: string }[]) {
  const lines = skills
    .map(
      (s) =>
        `  { name: ${JSON.stringify(s.name)}, category: ${JSON.stringify(s.category)} },`,
    )
    .join("\n");
  return `export const skills: Skill[] = [\n${lines}\n];`;
}

function serializeProjects(
  projects: {
    title: string;
    description: string;
    tags: string[];
    image: string;
    github?: string;
    live?: string;
  }[],
) {
  const entries = projects.map((p) => {
    const fields = [
      `    title: ${JSON.stringify(p.title)},`,
      `    description:\n      ${JSON.stringify(p.description)},`,
      `    tags: ${JSON.stringify(p.tags)},`,
      `    image: ${JSON.stringify(p.image)},`,
    ];
    if (p.github) fields.push(`    github: ${JSON.stringify(p.github)},`);
    if (p.live) fields.push(`    live: ${JSON.stringify(p.live)},`);
    return `  {\n${fields.join("\n")}\n  },`;
  });
  return `export const projects: Project[] = [\n${entries.join("\n")}\n];`;
}

function serializeAbout(about: {
  paragraphs: string[];
  highlights: { icon: string; label: string; value: string }[];
}) {
  const paras = about.paragraphs
    .map((p) => `    ${JSON.stringify(p)},`)
    .join("\n");
  const highlights = about.highlights
    .map(
      (h) =>
        `    { icon: ${JSON.stringify(h.icon)}, label: ${JSON.stringify(h.label)}, value: ${JSON.stringify(h.value)} },`,
    )
    .join("\n");
  return `export const about: AboutData = {\n  paragraphs: [\n${paras}\n  ],\n  highlights: [\n${highlights}\n  ],\n};`;
}

/* ── Verify auth ── */
function checkAuth(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  return authHeader === `Bearer ${getAuthToken()}`;
}

/* ── GET: Return current data ── */
export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const content = await fs.readFile(DATA_PATH, "utf-8");
  return NextResponse.json({
    siteConfig: parseSiteConfig(content),
    skills: parseSkills(content),
    projects: parseProjects(content),
    about: parseAbout(content),
  });
}

/* ── PUT: Overwrite data sections ── */
export async function PUT(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  let content = await fs.readFile(DATA_PATH, "utf-8");

  if (body.siteConfig) {
    content = content.replace(
      /export const siteConfig\s*=\s*\{[\s\S]*?\n\};/,
      serializeSiteConfig(body.siteConfig),
    );
  }

  if (body.skills) {
    content = content.replace(
      /export const skills:\s*Skill\[\]\s*=\s*\[[\s\S]*?\n\];/,
      serializeSkills(body.skills),
    );
  }

  if (body.projects) {
    content = content.replace(
      /export const projects:\s*Project\[\]\s*=\s*\[[\s\S]*?\n\];/,
      serializeProjects(body.projects),
    );
  }

  if (body.about) {
    content = content.replace(
      /export const about:\s*AboutData\s*=\s*\{[\s\S]*?\n\};/,
      serializeAbout(body.about),
    );
  }

  await fs.writeFile(DATA_PATH, content, "utf-8");

  return NextResponse.json({ ok: true });
}

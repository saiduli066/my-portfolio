export const siteConfig = {
  name: "MD. Saidul Islam",
  role: "MERN Stack Developer",
  tagline:
    "Passionate about building modern web applications with the MERN stack and exploring AI-powered solutions.",
  description:
    "I build web applications using Next.js, React, MongoDB, Express, and Node.js. I'm continuously learning, improving my skills, and working on AI-integrated and automation-based web projects.",
  email: "saiduli066@gmail.com",
  github: "https://github.com/saiduli066",
  linkedin: "https://www.linkedin.com/in/md-saidul-islam-akash/",
  twitter: "",
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;

/* ─── About ─── */

export interface Highlight {
  icon: string;
  label: string;
  value: string;
}

export interface AboutData {
  paragraphs: string[];
  highlights: Highlight[];
}

export const about: AboutData = {
  paragraphs: [
    "I'm a develop specialising in the MERN stack, Next.js, and AI-powered applications. I build products that are not only performant and scalable, but crafted with intention — from architecture to pixel.",
    "My focus areas include intelligent automation systems, real-time data pipelines, and clean API design. I thrive at the intersection of engineering depth and product sensibility.",
  ],
  highlights: [
    { icon: "⚡", label: "Stack", value: "MERN / Next.js" },
    { icon: "🎯", label: "Focus", value: "AI & Automation" },
    { icon: "🏗️", label: "Approach", value: "Clean Architecture" },
    { icon: "🚀", label: "Drive", value: "Performance-First" },
  ],
};

/* ─── Skills ─── */

export interface Skill {
  name: string;
  category: "frontend" | "backend" | "ai" | "devops";
}

export const skills: Skill[] = [
  // Frontend
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "JavaScript", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Framer Motion", category: "frontend" },
  { name: "Three.js", category: "frontend" },

  // Backend
  { name: "Node.js", category: "backend" },
  { name: "Express.js", category: "backend" },
  { name: "MongoDB", category: "backend" },
  { name: "REST APIs", category: "backend" },
  { name: "JWT Authentication", category: "backend" },

  // AI & Automation (Learning & Exploring)
  { name: "OpenAI API", category: "ai" },
  { name: "Prompt Engineering", category: "ai" },
  { name: "Basic AI Integrations", category: "ai" },
  { name: "n8n Automation", category: "ai" },

  // Deployment / Tools
  { name: "Git & GitHub", category: "devops" },
  { name: "Vercel", category: "devops" },
  { name: "Cloudinary", category: "devops" },
];

/* ─── Projects ─── */

export interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  github?: string;
  live?: string;
}

export const projects: Project[] = [
  {
    title: "AI Summarizer Web App",
    description:
      "A web application that summarizes long-form text and documents using AI APIs with a clean and responsive Next.js interface.",
    tags: ["Next.js", "OpenAI API", "Tailwind", "TypeScript"],
    image: "/projects/ai-summarizer.jpg",
    github: "https://github.com/saiduli066",
  },
  {
    title: "Mess Manager System",
    description:
      "Full-stack mess management system with member tracking, meal calculation, expense management, and role-based access.",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    image: "/projects/mess-manager.jpg",
    github: "https://github.com/saiduli066",
  },
  {
    title: "Automation Practice Project",
    description:
      "Experimenting with workflow automation and API integrations to streamline repetitive tasks using modern tools.",
    tags: ["Node.js", "REST APIs", "n8n"],
    image: "/projects/automation.jpg",
    github: "https://github.com/saiduli066",
  },
  {
    title: "Android News App",
    description:
      "An Android application that fetches real-time news using APIs with category filtering and search functionality.",
    tags: ["Java", "Android", "REST API"],
    image: "/projects/news-app.jpg",
    github: "https://github.com/saiduli066",
  },
  {
    title: "Medicine Reminder App",
    description:
      "A simple Android application for scheduling and managing medicine reminders with notifications.",
    tags: ["Java", "Android Studio"],
    image: "/projects/medicine-app.jpg",
    github: "https://github.com/saiduli066",
  },
];

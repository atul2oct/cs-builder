import fs from "fs";
import path from "path";

export interface Project {
  id: string;
  title: string;
  category: "Land" | "Architecture" | "Construction" | "Interiors" | "Supplies";
  tagline: string;
  location: string;
  area: string;
  year: string;
  status: string;
  featured: boolean;
  image: string;
  badge: string;
  description: string;
  highlights: string[];
  deliverables: string;
}

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  location: string;
  stage: string;
  budget?: string;
  requirements?: string;
  createdAt: string;
  status?: "New" | "Contacted" | "Scheduled Visit" | "Closed";
}

const dataDir = path.join(process.cwd(), "src", "data");
const projectsFile = path.join(dataDir, "projects.json");
const enquiriesFile = path.join(dataDir, "enquiries.json");

// In-memory fallback if files cannot be written
let inMemoryProjects: Project[] | null = null;
let inMemoryEnquiries: Enquiry[] | null = null;

function ensureDirectoryExists() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

export function getProjects(): Project[] {
  try {
    if (fs.existsSync(projectsFile)) {
      const data = fs.readFileSync(projectsFile, "utf-8");
      inMemoryProjects = JSON.parse(data);
      return inMemoryProjects || [];
    }
  } catch (err) {
    console.error("Error reading projects.json:", err);
  }
  return inMemoryProjects || [];
}

export function saveProjects(projects: Project[]) {
  inMemoryProjects = projects;
  try {
    ensureDirectoryExists();
    fs.writeFileSync(projectsFile, JSON.stringify(projects, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving projects.json:", err);
  }
}

export function addProject(project: Omit<Project, "id">): Project {
  const projects = getProjects();
  const newProject: Project = {
    ...project,
    id: `proj-${Date.now()}`,
  };
  projects.unshift(newProject);
  saveProjects(projects);
  return newProject;
}

export function updateProject(id: string, updates: Partial<Project>): Project | null {
  const projects = getProjects();
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) return null;
  projects[index] = { ...projects[index], ...updates };
  saveProjects(projects);
  return projects[index];
}

export function deleteProject(id: string): boolean {
  const projects = getProjects();
  const initialLen = projects.length;
  const filtered = projects.filter((p) => p.id !== id);
  if (filtered.length !== initialLen) {
    saveProjects(filtered);
    return true;
  }
  return false;
}

export function getEnquiries(): Enquiry[] {
  try {
    if (fs.existsSync(enquiriesFile)) {
      const data = fs.readFileSync(enquiriesFile, "utf-8");
      inMemoryEnquiries = JSON.parse(data);
      return inMemoryEnquiries || [];
    }
  } catch (err) {
    console.error("Error reading enquiries.json:", err);
  }
  return inMemoryEnquiries || [];
}

export function addEnquiry(enquiry: Omit<Enquiry, "id" | "createdAt">): Enquiry {
  const enquiries = getEnquiries();
  const newEnquiry: Enquiry = {
    ...enquiry,
    id: `enq-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: "New",
  };
  enquiries.unshift(newEnquiry);
  try {
    ensureDirectoryExists();
    fs.writeFileSync(enquiriesFile, JSON.stringify(enquiries, null, 2), "utf-8");
    inMemoryEnquiries = enquiries;
  } catch (err) {
    console.error("Error saving enquiries.json:", err);
  }
  return newEnquiry;
}

export function deleteEnquiry(id: string): boolean {
  const enquiries = getEnquiries();
  const filtered = enquiries.filter((e) => e.id !== id);
  if (filtered.length !== enquiries.length) {
    try {
      ensureDirectoryExists();
      fs.writeFileSync(enquiriesFile, JSON.stringify(filtered, null, 2), "utf-8");
      inMemoryEnquiries = filtered;
      return true;
    } catch (err) {
      console.error("Error deleting enquiry:", err);
    }
  }
  return false;
}

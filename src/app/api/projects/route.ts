import { NextRequest, NextResponse } from "next/server";
import { getProjects, addProject, updateProject, deleteProject } from "@/lib/projectStore";

export async function GET() {
  try {
    const projects = getProjects();
    return NextResponse.json({ success: true, projects });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.title || !body.category) {
      return NextResponse.json({ success: false, error: "Title and Category are required" }, { status: 400 });
    }

    const newProject = addProject({
      title: body.title,
      category: body.category,
      tagline: body.tagline || "",
      location: body.location || "Bangalore, India",
      area: body.area || "Custom",
      year: body.year || new Date().getFullYear().toString(),
      status: body.status || "Completed",
      featured: Boolean(body.featured),
      image: body.image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      badge: body.badge || body.category,
      description: body.description || "",
      highlights: Array.isArray(body.highlights) ? body.highlights : (body.highlights ? body.highlights.split("\n").filter(Boolean) : []),
      deliverables: body.deliverables || "Turnkey Delivery",
    });

    return NextResponse.json({ success: true, project: newProject }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create project" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.id) {
      return NextResponse.json({ success: false, error: "Project ID is required" }, { status: 400 });
    }

    const updated = updateProject(body.id, body);
    if (!updated) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, project: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Project ID is required" }, { status: 400 });
    }

    const deleted = deleteProject(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete project" }, { status: 500 });
  }
}

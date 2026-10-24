import { NextRequest, NextResponse } from "next/server";
import { getEnquiries, deleteEnquiry } from "@/lib/projectStore";

export async function GET() {
  try {
    const enquiries = getEnquiries();
    return NextResponse.json({ success: true, enquiries });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch enquiries" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Enquiry ID required" }, { status: 400 });
    }
    const deleted = deleteEnquiry(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: "Enquiry not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Enquiry deleted" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete enquiry" }, { status: 500 });
  }
}

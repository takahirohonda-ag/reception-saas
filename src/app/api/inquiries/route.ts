import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, category, message } = body;

    if (!name || !email || !category || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const inquiry = await prisma.inquiry.create({
      data: { name, email, company, category, message },
    });

    // TODO: send email notification to all@domain

    return NextResponse.json({ success: true, id: inquiry.id });
  } catch (error) {
    console.error("Inquiry error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(inquiries);
}

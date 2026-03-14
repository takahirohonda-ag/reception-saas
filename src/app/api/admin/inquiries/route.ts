import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(inquiries);
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const { id, status, note } = body;

  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  const updated = await prisma.inquiry.update({
    where: { id },
    data: { ...(status && { status }), ...(note !== undefined && { note }) },
  });

  return NextResponse.json(updated);
}

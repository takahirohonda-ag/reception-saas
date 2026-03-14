import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const tenants = await prisma.tenant.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { staffMembers: true, visitorLogs: true } },
    },
  });
  return NextResponse.json(tenants);
}

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

async function getTenantForUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { tenants: { include: { tenant: true }, take: 1 } },
  });

  return user?.tenants[0]?.tenant || null;
}

export async function GET() {
  const tenant = await getTenantForUser();
  if (!tenant) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await prisma.tenant.findUnique({
    where: { id: tenant.id },
    include: {
      staffMembers: { orderBy: { displayOrder: "asc" } },
      notifications: true,
      _count: { select: { visitorLogs: true } },
    },
  });

  return NextResponse.json(data);
}

export async function PATCH(request: NextRequest) {
  const tenant = await getTenantForUser();
  if (!tenant) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { name, logoUrl, primaryColor, welcomeMessage, welcomeMessageEn } = body;

  const updated = await prisma.tenant.update({
    where: { id: tenant.id },
    data: {
      ...(name && { name }),
      ...(logoUrl !== undefined && { logoUrl }),
      ...(primaryColor && { primaryColor }),
      ...(welcomeMessage && { welcomeMessage }),
      ...(welcomeMessageEn && { welcomeMessageEn }),
    },
  });

  return NextResponse.json(updated);
}

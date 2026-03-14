import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

async function getTenantId() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { tenants: { select: { tenantId: true }, take: 1 } },
  });

  return user?.tenants[0]?.tenantId || null;
}

export async function POST(request: NextRequest) {
  const tenantId = await getTenantId();
  if (!tenantId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { type, name, config } = await request.json();

  const channel = await prisma.notificationChannel.create({
    data: { tenantId, type, name, config },
  });

  return NextResponse.json(channel);
}

export async function PATCH(request: NextRequest) {
  const tenantId = await getTenantId();
  if (!tenantId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, name, config, isActive } = await request.json();

  const channel = await prisma.notificationChannel.update({
    where: { id, tenantId },
    data: {
      ...(name && { name }),
      ...(config && { config }),
      ...(isActive !== undefined && { isActive }),
    },
  });

  return NextResponse.json(channel);
}

export async function DELETE(request: NextRequest) {
  const tenantId = await getTenantId();
  if (!tenantId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await request.json();
  await prisma.notificationChannel.delete({ where: { id, tenantId } });
  return NextResponse.json({ success: true });
}

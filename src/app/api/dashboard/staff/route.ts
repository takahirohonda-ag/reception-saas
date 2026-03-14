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

  const { nameJp, nameEn, position } = await request.json();
  if (!nameJp || !nameEn) {
    return NextResponse.json({ error: "名前（日英）は必須です" }, { status: 400 });
  }

  const count = await prisma.staffMember.count({ where: { tenantId } });

  const staff = await prisma.staffMember.create({
    data: { tenantId, nameJp, nameEn, position, displayOrder: count },
  });

  return NextResponse.json(staff);
}

export async function PATCH(request: NextRequest) {
  const tenantId = await getTenantId();
  if (!tenantId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, nameJp, nameEn, position, isActive } = await request.json();

  const staff = await prisma.staffMember.update({
    where: { id, tenantId },
    data: {
      ...(nameJp && { nameJp }),
      ...(nameEn && { nameEn }),
      ...(position !== undefined && { position }),
      ...(isActive !== undefined && { isActive }),
    },
  });

  return NextResponse.json(staff);
}

export async function DELETE(request: NextRequest) {
  const tenantId = await getTenantId();
  if (!tenantId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await request.json();

  await prisma.staffMember.delete({ where: { id, tenantId } });
  return NextResponse.json({ success: true });
}

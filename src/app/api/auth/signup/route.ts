import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, companyName } = await request.json();

    if (!email || !password || !companyName) {
      return NextResponse.json({ error: "必須項目が不足しています" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "このメールアドレスは既に登録されています" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user + tenant in transaction
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: { name, email, password: hashedPassword },
      });

      const slug = companyName
        .toLowerCase()
        .replace(/[^a-z0-9\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]+/g, "-")
        .replace(/^-|-$/g, "") || `tenant-${Date.now()}`;

      const tenant = await tx.tenant.create({
        data: {
          name: companyName,
          slug,
          members: { create: { userId: user.id, role: "OWNER" } },
        },
      });

      return { user, tenant };
    });

    return NextResponse.json({
      success: true,
      userId: result.user.id,
      tenantSlug: result.tenant.slug,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "登録に失敗しました" }, { status: 500 });
  }
}

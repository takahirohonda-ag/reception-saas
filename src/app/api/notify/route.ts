import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendNotifications } from "@/lib/notifications/providers";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tenantId, staffId, visitorName, companyName } = body;

    if (!tenantId || !staffId) {
      return NextResponse.json(
        { error: "tenantId and staffId are required" },
        { status: 400 }
      );
    }

    // Fetch tenant, staff, and notification channels
    const [tenant, staff, channels] = await Promise.all([
      prisma.tenant.findUnique({ where: { id: tenantId } }),
      prisma.staffMember.findUnique({ where: { id: staffId } }),
      prisma.notificationChannel.findMany({
        where: { tenantId, isActive: true },
      }),
    ]);

    if (!tenant || !staff) {
      return NextResponse.json(
        { error: "Tenant or staff not found" },
        { status: 404 }
      );
    }

    // Log the visit
    await prisma.visitorLog.create({
      data: { tenantId, staffId, visitorName, companyName },
    });

    // Send notifications to all active channels
    const payload = {
      staffName: staff.nameJp,
      staffNameEn: staff.nameEn,
      visitorName,
      companyName,
      tenantName: tenant.name,
      timestamp: new Date(),
    };

    const results = await sendNotifications(
      channels.map((ch: { type: string; config: unknown }) => ({
        type: ch.type,
        config: ch.config as Record<string, unknown>,
      })),
      payload
    );

    return NextResponse.json({ success: true, notifications: results });
  } catch (error) {
    console.error("Notification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

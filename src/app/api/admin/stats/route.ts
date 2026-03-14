import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const [tenantCount, visitorCount, inquiryCount, planBreakdown, recentVisitors] = await Promise.all([
      prisma.tenant.count(),
      prisma.visitorLog.count(),
      prisma.inquiry.count({ where: { status: "NEW" } }),
      prisma.tenant.groupBy({ by: ["plan"], _count: true }),
      prisma.visitorLog.findMany({
        take: 10,
        orderBy: { notifiedAt: "desc" },
        include: { tenant: { select: { name: true } }, staff: { select: { nameJp: true } } },
      }),
    ]);

    return NextResponse.json({
      tenantCount,
      visitorCount,
      inquiryCount,
      planBreakdown: planBreakdown.map((p) => ({ plan: p.plan, count: p._count })),
      recentVisitors,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

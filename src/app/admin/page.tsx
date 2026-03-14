"use client";

import { useEffect, useState } from "react";

interface Stats {
  tenantCount: number;
  visitorCount: number;
  inquiryCount: number;
  planBreakdown: { plan: string; count: number }[];
  recentVisitors: {
    id: string;
    visitorName: string | null;
    companyName: string | null;
    notifiedAt: string;
    tenant: { name: string };
    staff: { nameJp: string };
  }[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-gray-400 py-12">読み込み中...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">ダッシュボード</h1>

      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="text-sm text-gray-400 mb-1">テナント数</div>
          <div className="text-3xl font-extrabold text-gray-900">{stats?.tenantCount ?? 0}</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="text-sm text-gray-400 mb-1">総来訪者数</div>
          <div className="text-3xl font-extrabold text-gray-900">{stats?.visitorCount ?? 0}</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="text-sm text-gray-400 mb-1">未対応お問い合わせ</div>
          <div className="text-3xl font-extrabold text-emerald-600">{stats?.inquiryCount ?? 0}</div>
        </div>
      </div>

      {stats?.planBreakdown && stats.planBreakdown.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-10">
          <h2 className="font-bold text-gray-900 mb-4">プラン別内訳</h2>
          <div className="flex gap-6">
            {stats.planBreakdown.map((p) => (
              <div key={p.plan} className="text-center">
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">{p.plan}</div>
                <div className="text-2xl font-bold text-gray-900">{p.count}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="font-bold text-gray-900 mb-4">直近の来訪者</h2>
        {stats?.recentVisitors && stats.recentVisitors.length > 0 ? (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs text-gray-400 pb-2 font-medium">日時</th>
                <th className="text-left text-xs text-gray-400 pb-2 font-medium">テナント</th>
                <th className="text-left text-xs text-gray-400 pb-2 font-medium">担当者</th>
                <th className="text-left text-xs text-gray-400 pb-2 font-medium">来訪者</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentVisitors.map((v) => (
                <tr key={v.id} className="border-b border-gray-50">
                  <td className="py-2.5 text-gray-500">{new Date(v.notifiedAt).toLocaleString("ja-JP")}</td>
                  <td className="py-2.5 text-gray-900 font-medium">{v.tenant.name}</td>
                  <td className="py-2.5 text-gray-600">{v.staff.nameJp}</td>
                  <td className="py-2.5 text-gray-600">{v.visitorName || "—"} {v.companyName ? `(${v.companyName})` : ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-400 text-sm">まだ来訪者の記録はありません</p>
        )}
      </div>
    </div>
  );
}

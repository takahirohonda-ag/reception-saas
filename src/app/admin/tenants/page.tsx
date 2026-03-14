"use client";

import { useEffect, useState } from "react";

interface Tenant {
  id: string;
  name: string;
  slug: string;
  plan: string;
  _count: { staffMembers: number; visitorLogs: number };
  createdAt: string;
}

export default function AdminTenantsPage() {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/tenants")
      .then((r) => r.json())
      .then(setTenants)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-gray-400 py-12">読み込み中...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">テナント一覧</h1>
      {tenants.length === 0 ? (
        <p className="text-gray-400">まだテナントはありません</p>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-6 py-3 text-xs text-gray-400 font-medium">組織名</th>
                <th className="text-left px-6 py-3 text-xs text-gray-400 font-medium">スラッグ</th>
                <th className="text-left px-6 py-3 text-xs text-gray-400 font-medium">プラン</th>
                <th className="text-left px-6 py-3 text-xs text-gray-400 font-medium">スタッフ数</th>
                <th className="text-left px-6 py-3 text-xs text-gray-400 font-medium">来訪者数</th>
                <th className="text-left px-6 py-3 text-xs text-gray-400 font-medium">登録日</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((t) => (
                <tr key={t.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-6 py-3 font-medium text-gray-900">{t.name}</td>
                  <td className="px-6 py-3 text-gray-500 font-mono text-xs">{t.slug}</td>
                  <td className="px-6 py-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      t.plan === "ENTERPRISE" ? "bg-purple-50 text-purple-600" :
                      t.plan === "STANDARD" ? "bg-emerald-50 text-emerald-600" :
                      "bg-gray-100 text-gray-500"
                    }`}>{t.plan}</span>
                  </td>
                  <td className="px-6 py-3 text-gray-600">{t._count.staffMembers}</td>
                  <td className="px-6 py-3 text-gray-600">{t._count.visitorLogs}</td>
                  <td className="px-6 py-3 text-gray-500">{new Date(t.createdAt).toLocaleDateString("ja-JP")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

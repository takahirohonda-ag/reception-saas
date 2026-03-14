"use client";

import { useEffect, useState } from "react";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  company: string | null;
  category: string;
  message: string;
  status: string;
  note: string | null;
  createdAt: string;
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  NEW: { label: "新規", color: "bg-red-50 text-red-600" },
  IN_PROGRESS: { label: "対応中", color: "bg-amber-50 text-amber-600" },
  RESOLVED: { label: "完了", color: "bg-emerald-50 text-emerald-600" },
};

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Inquiry | null>(null);

  const load = () => {
    fetch("/api/admin/inquiries")
      .then((r) => r.json())
      .then(setInquiries)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch("/api/admin/inquiries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    load();
  };

  if (loading) return <div className="text-gray-400 py-12">読み込み中...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">お問い合わせ一覧</h1>

      <div className="flex gap-6">
        <div className={`${selected ? "w-1/2" : "w-full"} transition-all`}>
          {inquiries.length === 0 ? (
            <p className="text-gray-400">お問い合わせはまだありません</p>
          ) : (
            <div className="space-y-2">
              {inquiries.map((inq) => {
                const s = STATUS_LABELS[inq.status] || STATUS_LABELS.NEW;
                return (
                  <button
                    key={inq.id}
                    onClick={() => setSelected(inq)}
                    className={`w-full text-left bg-white rounded-xl border p-4 transition-all hover:shadow-sm ${
                      selected?.id === inq.id ? "border-emerald-300 shadow-sm" : "border-gray-100"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900">{inq.name}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.color}`}>{s.label}</span>
                    </div>
                    <div className="text-xs text-gray-400">
                      {inq.company && `${inq.company} · `}{inq.category} · {new Date(inq.createdAt).toLocaleDateString("ja-JP")}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {selected && (
          <div className="w-1/2 bg-white rounded-2xl border border-gray-100 p-6 sticky top-6 self-start">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900 text-lg">{selected.name}</h2>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-sm">✕</button>
            </div>
            <div className="space-y-3 text-sm mb-6">
              <div><span className="text-gray-400">メール:</span> <span className="text-gray-900">{selected.email}</span></div>
              {selected.company && <div><span className="text-gray-400">会社名:</span> <span className="text-gray-900">{selected.company}</span></div>}
              <div><span className="text-gray-400">カテゴリ:</span> <span className="text-gray-900">{selected.category}</span></div>
              <div><span className="text-gray-400">日時:</span> <span className="text-gray-900">{new Date(selected.createdAt).toLocaleString("ja-JP")}</span></div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 mb-6 whitespace-pre-wrap">{selected.message}</div>
            <div className="flex gap-2">
              {["NEW", "IN_PROGRESS", "RESOLVED"].map((st) => {
                const s = STATUS_LABELS[st];
                return (
                  <button
                    key={st}
                    onClick={() => updateStatus(selected.id, st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      selected.status === st ? s.color : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                    }`}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

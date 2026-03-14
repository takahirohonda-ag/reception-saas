"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Staff { id: string; nameJp: string; nameEn: string; position: string | null; isActive: boolean }
interface Channel { id: string; type: string; name: string; config: Record<string, unknown>; isActive: boolean }
interface TenantData {
  id: string; name: string; slug: string; logoUrl: string | null;
  primaryColor: string; welcomeMessage: string; welcomeMessageEn: string;
  staffMembers: Staff[]; notifications: Channel[];
  _count: { visitorLogs: number };
}

const CHANNEL_TYPES = [
  { value: "SLACK", label: "Slack", fields: [{ key: "webhookUrl", label: "Webhook URL" }] },
  { value: "TEAMS", label: "Microsoft Teams", fields: [{ key: "webhookUrl", label: "Webhook URL" }] },
  { value: "GOOGLE_CHAT", label: "Google Chat", fields: [{ key: "webhookUrl", label: "Webhook URL" }] },
  { value: "EMAIL", label: "Email", fields: [{ key: "email", label: "メールアドレス" }] },
  { value: "LINE", label: "LINE Notify", fields: [{ key: "accessToken", label: "アクセストークン" }] },
  { value: "DISCORD", label: "Discord", fields: [{ key: "webhookUrl", label: "Webhook URL" }] },
  { value: "WEBHOOK", label: "カスタムWebhook", fields: [{ key: "url", label: "URL" }] },
];

type Tab = "general" | "staff" | "notifications" | "reception";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tenant, setTenant] = useState<TenantData | null>(null);
  const [tab, setTab] = useState<Tab>("general");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [color, setColor] = useState("#1a8a7d");
  const [welcomeJp, setWelcomeJp] = useState("");
  const [welcomeEn, setWelcomeEn] = useState("");

  // Staff form
  const [newStaffJp, setNewStaffJp] = useState("");
  const [newStaffEn, setNewStaffEn] = useState("");
  const [newStaffPos, setNewStaffPos] = useState("");

  // Channel form
  const [newChType, setNewChType] = useState("SLACK");
  const [newChName, setNewChName] = useState("");
  const [newChConfig, setNewChConfig] = useState<Record<string, string>>({});

  const load = useCallback(() => {
    fetch("/api/dashboard/tenant")
      .then((r) => { if (r.status === 401) { router.push("/login"); return null; } return r.json(); })
      .then((d) => {
        if (!d) return;
        setTenant(d);
        setName(d.name); setLogoUrl(d.logoUrl || ""); setColor(d.primaryColor);
        setWelcomeJp(d.welcomeMessage); setWelcomeEn(d.welcomeMessageEn);
      });
  }, [router]);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    else if (status === "authenticated") load();
  }, [status, router, load]);

  const flash = (m: string) => { setMsg(m); setTimeout(() => setMsg(null), 2000); };

  const saveGeneral = async () => {
    setSaving(true);
    await fetch("/api/dashboard/tenant", {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, logoUrl: logoUrl || null, primaryColor: color, welcomeMessage: welcomeJp, welcomeMessageEn: welcomeEn }),
    });
    flash("保存しました"); load(); setSaving(false);
  };

  const addStaff = async () => {
    if (!newStaffJp || !newStaffEn) return;
    await fetch("/api/dashboard/staff", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nameJp: newStaffJp, nameEn: newStaffEn, position: newStaffPos || null }),
    });
    setNewStaffJp(""); setNewStaffEn(""); setNewStaffPos(""); flash("追加しました"); load();
  };

  const toggleStaff = async (id: string, isActive: boolean) => {
    await fetch("/api/dashboard/staff", {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, isActive: !isActive }),
    });
    load();
  };

  const deleteStaff = async (id: string) => {
    await fetch("/api/dashboard/staff", {
      method: "DELETE", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    flash("削除しました"); load();
  };

  const addChannel = async () => {
    if (!newChName) return;
    await fetch("/api/dashboard/notifications", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: newChType, name: newChName, config: newChConfig }),
    });
    setNewChName(""); setNewChConfig({}); flash("追加しました"); load();
  };

  const toggleChannel = async (id: string, isActive: boolean) => {
    await fetch("/api/dashboard/notifications", {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, isActive: !isActive }),
    });
    load();
  };

  const deleteChannel = async (id: string) => {
    await fetch("/api/dashboard/notifications", {
      method: "DELETE", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    flash("削除しました"); load();
  };

  if (status === "loading" || !tenant) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="text-gray-400">読み込み中...</div></div>;
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "general", label: "基本設定" },
    { key: "staff", label: "スタッフ管理" },
    { key: "notifications", label: "通知設定" },
    { key: "reception", label: "受付画面" },
  ];

  const chFields = CHANNEL_TYPES.find((c) => c.value === newChType)?.fields || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="text-xl font-bold text-gray-900 tracking-tight">ラクダReception</a>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">{session?.user?.email}</span>
            <button onClick={() => signOut({ callbackUrl: "/" })} className="text-sm text-gray-400 hover:text-gray-600">ログアウト</button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {msg && <div className="bg-amber-50 text-amber-700 px-4 py-2.5 rounded-xl text-sm mb-6 font-medium">{msg}</div>}

        <h1 className="text-2xl font-bold text-gray-900 mb-8">ダッシュボード</h1>

        <div className="flex gap-1 mb-8 bg-white rounded-xl p-1 border border-gray-200 w-fit">
          {tabs.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${tab === t.key ? "bg-gray-900 text-white" : "text-gray-500 hover:text-gray-900"}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* General */}
        {tab === "general" && (
          <div className="bg-white rounded-2xl border border-gray-200 p-8 max-w-2xl space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">組織名</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">ロゴURL</label>
              <input value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} placeholder="https://..." className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">テーマカラー</label>
              <div className="flex gap-3">
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-12 h-12 rounded-lg cursor-pointer border-0" />
                <input value={color} onChange={(e) => setColor(e.target.value)} className="px-4 py-3 border border-gray-200 rounded-xl w-40 font-mono text-sm outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">ウェルカムメッセージ（日本語）</label>
              <input value={welcomeJp} onChange={(e) => setWelcomeJp(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">ウェルカムメッセージ（英語）</label>
              <input value={welcomeEn} onChange={(e) => setWelcomeEn(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none" />
            </div>
            <button onClick={saveGeneral} disabled={saving} className="bg-gray-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 disabled:opacity-50">
              {saving ? "保存中..." : "保存"}
            </button>
          </div>
        )}

        {/* Staff */}
        {tab === "staff" && (
          <div className="max-w-3xl space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="font-bold text-gray-900 mb-4">スタッフ追加</h2>
              <div className="flex gap-3">
                <input value={newStaffJp} onChange={(e) => setNewStaffJp(e.target.value)} placeholder="名前（日本語）" className="flex-1 px-4 py-3 border border-gray-200 rounded-xl outline-none" />
                <input value={newStaffEn} onChange={(e) => setNewStaffEn(e.target.value)} placeholder="Name (English)" className="flex-1 px-4 py-3 border border-gray-200 rounded-xl outline-none" />
                <input value={newStaffPos} onChange={(e) => setNewStaffPos(e.target.value)} placeholder="役職" className="w-32 px-4 py-3 border border-gray-200 rounded-xl outline-none" />
                <button onClick={addStaff} className="bg-gray-900 text-white px-5 py-3 rounded-xl font-medium">追加</button>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="font-bold text-gray-900 mb-4">スタッフ一覧</h2>
              {tenant.staffMembers.length === 0 ? (
                <p className="text-gray-400 text-sm">まだスタッフが登録されていません</p>
              ) : (
                <div className="space-y-2">
                  {tenant.staffMembers.map((s) => (
                    <div key={s.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                      <div>
                        <span className="font-medium text-gray-900">{s.nameJp}</span>
                        <span className="text-gray-400 text-sm ml-2">{s.nameEn}</span>
                        {s.position && <span className="text-gray-400 text-sm ml-2">· {s.position}</span>}
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => toggleStaff(s.id, s.isActive)}
                          className={`text-xs px-2.5 py-1 rounded-full font-medium ${s.isActive ? "bg-amber-50 text-amber-600" : "bg-gray-100 text-gray-400"}`}>
                          {s.isActive ? "有効" : "無効"}
                        </button>
                        <button onClick={() => deleteStaff(s.id)} className="text-xs text-red-400 hover:text-red-600">削除</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Notifications */}
        {tab === "notifications" && (
          <div className="max-w-3xl space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="font-bold text-gray-900 mb-4">通知チャネル追加</h2>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <select value={newChType} onChange={(e) => { setNewChType(e.target.value); setNewChConfig({}); }}
                    className="px-4 py-3 border border-gray-200 rounded-xl outline-none bg-white">
                    {CHANNEL_TYPES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                  <input value={newChName} onChange={(e) => setNewChName(e.target.value)} placeholder="表示名" className="flex-1 px-4 py-3 border border-gray-200 rounded-xl outline-none" />
                </div>
                {chFields.map((f) => (
                  <input key={f.key} value={newChConfig[f.key] || ""} onChange={(e) => setNewChConfig({ ...newChConfig, [f.key]: e.target.value })}
                    placeholder={f.label} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none" />
                ))}
                <button onClick={addChannel} className="bg-gray-900 text-white px-5 py-3 rounded-xl font-medium">追加</button>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="font-bold text-gray-900 mb-4">登録済みチャネル</h2>
              {tenant.notifications.length === 0 ? (
                <p className="text-gray-400 text-sm">まだ通知チャネルが登録されていません</p>
              ) : (
                <div className="space-y-2">
                  {tenant.notifications.map((ch) => (
                    <div key={ch.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                      <div className="flex items-center gap-3">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg font-mono">{ch.type}</span>
                        <span className="text-gray-900 font-medium">{ch.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => toggleChannel(ch.id, ch.isActive)}
                          className={`text-xs px-2.5 py-1 rounded-full font-medium ${ch.isActive ? "bg-amber-50 text-amber-600" : "bg-gray-100 text-gray-400"}`}>
                          {ch.isActive ? "有効" : "無効"}
                        </button>
                        <button onClick={() => deleteChannel(ch.id)} className="text-xs text-red-400 hover:text-red-600">削除</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Reception URL */}
        {tab === "reception" && (
          <div className="bg-white rounded-2xl border border-gray-200 p-8 max-w-2xl">
            <h2 className="font-bold text-gray-900 mb-4">受付画面</h2>
            <p className="text-gray-500 text-sm mb-6">このURLをiPadやタブレットで開いて、ホーム画面に追加してください。</p>
            <div className="bg-gray-50 rounded-xl px-4 py-3 border border-gray-100 flex items-center gap-3 mb-6">
              <code className="text-sm text-gray-600 flex-1">{typeof window !== "undefined" ? window.location.origin : ""}/reception/{tenant.slug}</code>
              <button onClick={() => navigator.clipboard.writeText(`${window.location.origin}/reception/${tenant.slug}`)}
                className="text-xs text-amber-600 font-medium hover:underline">コピー</button>
            </div>
            <a href={`/reception/${tenant.slug}`} target="_blank" className="inline-block bg-gray-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800">
              プレビュー →
            </a>
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h3 className="font-medium text-gray-900 mb-2">統計</h3>
              <p className="text-sm text-gray-500">総来訪者数: <span className="font-bold text-gray-900">{tenant._count.visitorLogs}</span></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

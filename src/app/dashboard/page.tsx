"use client";

import { useState } from "react";


// Demo data for the dashboard preview
const DEMO_STAFF = [
  { id: "1", nameJp: "田中 太郎", nameEn: "Taro Tanaka", position: "代表取締役", isActive: true },
  { id: "2", nameJp: "佐藤 花子", nameEn: "Hanako Sato", position: "取締役", isActive: true },
  { id: "3", nameJp: "鈴木 一郎", nameEn: "Ichiro Suzuki", position: "", isActive: true },
];

const DEMO_CHANNELS = [
  { id: "1", type: "SLACK", name: "Slack #general", isActive: true },
  { id: "2", type: "EMAIL", name: "admin@example.com", isActive: true },
  { id: "3", type: "TEAMS", name: "Teams - Reception", isActive: false },
];

const NOTIFICATION_TYPES = [
  { value: "SLACK", label: "Slack", configFields: [{ key: "webhookUrl", label: "Webhook URL", placeholder: "https://hooks.slack.com/services/..." }] },
  { value: "TEAMS", label: "Microsoft Teams", configFields: [{ key: "webhookUrl", label: "Webhook URL", placeholder: "https://outlook.office.com/webhook/..." }] },
  { value: "GOOGLE_CHAT", label: "Google Chat", configFields: [{ key: "webhookUrl", label: "Webhook URL", placeholder: "https://chat.googleapis.com/v1/spaces/..." }] },
  { value: "EMAIL", label: "Email", configFields: [{ key: "email", label: "送信先メールアドレス", placeholder: "admin@example.com" }] },
  { value: "LINE", label: "LINE Notify", configFields: [{ key: "accessToken", label: "アクセストークン", placeholder: "LINE Notify token" }] },
  { value: "LINE_WORKS", label: "LINE WORKS", configFields: [
    { key: "botId", label: "Bot ID", placeholder: "Bot ID" },
    { key: "channelId", label: "Channel ID", placeholder: "Channel ID" },
    { key: "accessToken", label: "Access Token", placeholder: "Access Token" },
  ]},
  { value: "DISCORD", label: "Discord", configFields: [{ key: "webhookUrl", label: "Webhook URL", placeholder: "https://discord.com/api/webhooks/..." }] },
  { value: "WEBHOOK", label: "カスタムWebhook", configFields: [{ key: "url", label: "URL", placeholder: "https://your-api.com/webhook" }] },
  { value: "SMS", label: "SMS (Twilio)", configFields: [{ key: "phoneNumber", label: "電話番号", placeholder: "+819012345678" }] },
];

type Tab = "general" | "staff" | "notifications" | "logs";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>("general");
  const [tenantName, setTenantName] = useState("サンプル株式会社");
  const [primaryColor, setPrimaryColor] = useState("#1a8a7d");
  const [welcomeMsg, setWelcomeMsg] = useState("ようこそ。担当者をお呼びします。");
  const [welcomeMsgEn, setWelcomeMsgEn] = useState("Welcome. We'll notify your contact.");

  const tabs: { key: Tab; label: string }[] = [
    { key: "general", label: "基本設定" },
    { key: "staff", label: "スタッフ管理" },
    { key: "notifications", label: "通知設定" },
    { key: "logs", label: "来訪者ログ" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/reception-saas" className="text-xl font-bold text-gray-900 tracking-tight">
            rakudaReception
          </a>
          <div className="flex items-center gap-4">
            <a
              href="/reception-saas/reception/demo"
              target="_blank"
              className="text-sm text-emerald-600 font-medium hover:underline"
            >
              受付画面プレビュー →
            </a>
            <div className="w-8 h-8 bg-gray-200 rounded-full" />
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">ダッシュボード</h1>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-white rounded-xl p-1 border border-gray-200 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "bg-gray-900 text-white"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ===== General Settings ===== */}
        {activeTab === "general" && (
          <div className="bg-white rounded-2xl border border-gray-200 p-8 max-w-2xl">
            <h2 className="text-lg font-bold text-gray-900 mb-6">基本設定</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  組織名
                </label>
                <input
                  type="text"
                  value={tenantName}
                  onChange={(e) => setTenantName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ロゴURL
                </label>
                <input
                  type="text"
                  placeholder="https://example.com/logo.png"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  テーマカラー
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-12 h-12 border-0 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="px-4 py-3 border border-gray-200 rounded-xl w-40 font-mono text-sm outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ウェルカムメッセージ（日本語）
                </label>
                <input
                  type="text"
                  value={welcomeMsg}
                  onChange={(e) => setWelcomeMsg(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ウェルカムメッセージ（英語）
                </label>
                <input
                  type="text"
                  value={welcomeMsgEn}
                  onChange={(e) => setWelcomeMsgEn(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                />
              </div>
              <div className="pt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">受付画面URL</h3>
                <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                  <code className="text-sm text-gray-600 flex-1">
                    https://receptionpad.com/reception/your-slug
                  </code>
                  <button className="text-xs text-emerald-600 font-medium hover:underline">
                    コピー
                  </button>
                </div>
              </div>
              <button className="bg-gray-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors">
                保存
              </button>
            </div>
          </div>
        )}

        {/* ===== Staff Management ===== */}
        {activeTab === "staff" && (
          <div className="bg-white rounded-2xl border border-gray-200 p-8 max-w-3xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">スタッフ管理</h2>
              <button className="bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
                + スタッフ追加
              </button>
            </div>
            <div className="space-y-3">
              {DEMO_STAFF.map((staff) => (
                <div
                  key={staff.id}
                  className="flex items-center justify-between p-4 border border-gray-100 rounded-xl"
                >
                  <div>
                    <div className="font-medium text-gray-900">{staff.nameJp}</div>
                    <div className="text-sm text-gray-400">
                      {staff.nameEn}
                      {staff.position && ` · ${staff.position}`}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full ${
                        staff.isActive
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {staff.isActive ? "有効" : "無効"}
                    </span>
                    <button className="text-sm text-gray-400 hover:text-gray-600">
                      編集
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== Notifications ===== */}
        {activeTab === "notifications" && (
          <div className="space-y-8 max-w-3xl">
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">通知チャネル</h2>
                <button className="bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
                  + チャネル追加
                </button>
              </div>
              <div className="space-y-3">
                {DEMO_CHANNELS.map((ch) => (
                  <div
                    key={ch.id}
                    className="flex items-center justify-between p-4 border border-gray-100 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg font-mono">
                        {ch.type}
                      </span>
                      <span className="text-gray-900 font-medium">{ch.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full ${
                          ch.isActive
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {ch.isActive ? "有効" : "無効"}
                      </span>
                      <button className="text-sm text-gray-400 hover:text-gray-600">
                        編集
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                対応通知チャネル一覧
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {NOTIFICATION_TYPES.map((t) => (
                  <div
                    key={t.value}
                    className="border border-gray-100 rounded-xl p-4 text-center"
                  >
                    <div className="text-sm font-medium text-gray-900">
                      {t.label}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {t.configFields.length} 設定項目
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== Visitor Logs ===== */}
        {activeTab === "logs" && (
          <div className="bg-white rounded-2xl border border-gray-200 p-8 max-w-4xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">来訪者ログ</h2>
              <button className="border border-gray-200 text-gray-600 px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                CSV出力
              </button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-medium text-gray-400 pb-3 uppercase tracking-wider">
                    日時
                  </th>
                  <th className="text-left text-xs font-medium text-gray-400 pb-3 uppercase tracking-wider">
                    担当者
                  </th>
                  <th className="text-left text-xs font-medium text-gray-400 pb-3 uppercase tracking-wider">
                    来訪者
                  </th>
                  <th className="text-left text-xs font-medium text-gray-400 pb-3 uppercase tracking-wider">
                    会社名
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  { date: "2026/03/14 14:30", staff: "田中 太郎", visitor: "山田 太郎", company: "株式会社ABC" },
                  { date: "2026/03/14 11:00", staff: "佐藤 花子", visitor: "—", company: "—" },
                  { date: "2026/03/13 16:00", staff: "鈴木 一郎", visitor: "高橋 次郎", company: "XYZ Holdings" },
                ].map((log, i) => (
                  <tr key={i} className="border-b border-gray-50">
                    <td className="py-3 text-gray-500">{log.date}</td>
                    <td className="py-3 text-gray-900 font-medium">{log.staff}</td>
                    <td className="py-3 text-gray-600">{log.visitor}</td>
                    <td className="py-3 text-gray-600">{log.company}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

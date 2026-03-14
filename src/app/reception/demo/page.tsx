"use client";

import { useState, useCallback } from "react";

interface Staff {
  id: string;
  nameJp: string;
  nameEn: string;
  position?: string;
}

const DEMO_STAFF: Staff[] = [
  { id: "1", nameJp: "田中 太郎", nameEn: "Taro Tanaka", position: "代表取締役" },
  { id: "2", nameJp: "佐藤 花子", nameEn: "Hanako Sato", position: "取締役" },
  { id: "3", nameJp: "鈴木 一郎", nameEn: "Ichiro Suzuki", position: "事業部長" },
  { id: "4", nameJp: "山田 美咲", nameEn: "Misaki Yamada", position: "マネージャー" },
  { id: "5", nameJp: "高橋 健太", nameEn: "Kenta Takahashi" },
  { id: "6", nameJp: "渡辺 さくら", nameEn: "Sakura Watanabe" },
];

const TENANT = {
  name: "Demo Company",
  primaryColor: "#1a8a7d",
  welcomeMessage: "ようこそ。担当者をお呼びします。",
  welcomeMessageEn: "Welcome. We'll notify your contact.",
};

type Screen = "welcome" | "staff" | "confirm";
const AUTO_RESET_SEC = 5;

export default function ReceptionDemoPage() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const selectStaff = useCallback(
    (staff: Staff) => {
      setSelectedStaff(staff);
      setScreen("confirm");
      showToast("Demo: 通知が送信されました（実際には送信されません）");

      setTimeout(() => {
        setScreen("welcome");
        setSelectedStaff(null);
      }, AUTO_RESET_SEC * 1000);
    },
    [showToast]
  );

  const accent = TENANT.primaryColor;

  return (
    <div className="min-h-screen bg-gray-50 select-none overflow-hidden relative">
      {/* Demo Banner */}
      <div className="absolute top-0 left-0 right-0 bg-amber-500 text-white text-center text-sm py-2 font-medium z-50">
        Demo Mode — 実際の通知は送信されません
      </div>

      {/* ===== Welcome Screen ===== */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center p-10 transition-all duration-400 ${
          screen === "welcome"
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-5 pointer-events-none"
        }`}
      >
        <h1 className="text-5xl font-bold text-gray-900 mb-8 tracking-tight">
          {TENANT.name}
        </h1>
        <div
          className="w-16 h-[3px] rounded-full mb-9"
          style={{ background: accent }}
        />
        <p className="text-gray-500 text-xl text-center leading-relaxed mb-12">
          {TENANT.welcomeMessage}
          <br />
          {TENANT.welcomeMessageEn}
        </p>
        <button
          onClick={() => setScreen("staff")}
          className="text-white border-none px-16 py-5 text-xl font-semibold rounded-full tracking-wide transition-transform active:scale-[0.97]"
          style={{ background: accent }}
        >
          Select Staff / 担当者を選ぶ
        </button>
      </div>

      {/* ===== Staff Selection Screen ===== */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center p-10 transition-all duration-400 ${
          screen === "staff"
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-5 pointer-events-none"
        }`}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          Who would you like to see?
        </h2>
        <p className="text-gray-500 mb-8">
          お会いになりたい担当者を選んでください。
        </p>
        <div className="grid grid-cols-2 gap-3.5 w-full max-w-[640px] mb-8">
          {DEMO_STAFF.map((s) => (
            <button
              key={s.id}
              onClick={() => selectStaff(s)}
              className="bg-white border-2 border-gray-200 rounded-2xl py-5 px-4 text-center transition-all active:scale-[0.97] hover:border-gray-300"
            >
              <div className="text-xl font-bold text-gray-900">{s.nameJp}</div>
              <div className="text-sm text-gray-400 tracking-wide">
                {s.nameEn}
              </div>
              {s.position && (
                <div className="text-xs text-gray-400 mt-1">{s.position}</div>
              )}
            </button>
          ))}
        </div>
        <button
          onClick={() => setScreen("welcome")}
          className="border-2 border-gray-200 text-gray-400 px-12 py-3.5 text-base font-semibold rounded-full transition-colors active:border-gray-400"
        >
          ← Back / 戻る
        </button>
      </div>

      {/* ===== Confirmation Screen ===== */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center p-10 transition-all duration-400 ${
          screen === "confirm"
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-5 pointer-events-none"
        }`}
      >
        <div
          className="w-[100px] h-[100px] rounded-full flex items-center justify-center mb-8 animate-[scaleIn_0.4s_ease]"
          style={{ background: accent }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div className="text-3xl font-bold text-gray-900 mb-4">
          {selectedStaff?.nameJp} / {selectedStaff?.nameEn}
        </div>
        <p className="text-gray-500 text-lg text-center leading-relaxed">
          Notified. Please wait a moment.
          <br />
          通知しました。少々お待ちください。
        </p>
        <div className="mt-10 w-[200px] h-1 bg-gray-200 rounded-full overflow-hidden">
          {screen === "confirm" && (
            <div
              className="h-full rounded-full"
              style={{
                background: accent,
                animation: `timerShrink ${AUTO_RESET_SEC}s linear forwards`,
              }}
            />
          )}
        </div>
      </div>

      {/* ===== Toast ===== */}
      <div
        className={`fixed bottom-10 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 z-50 ${
          toast
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-20 pointer-events-none"
        }`}
      >
        {toast}
      </div>
    </div>
  );
}

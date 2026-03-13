"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";

interface Staff {
  id: string;
  nameJp: string;
  nameEn: string;
  position?: string;
}

interface TenantData {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  primaryColor: string;
  welcomeMessage: string;
  welcomeMessageEn: string;
  staff: Staff[];
}

type Screen = "welcome" | "staff" | "confirm";

const AUTO_RESET_SEC = 5;

export default function ReceptionPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [tenant, setTenant] = useState<TenantData | null>(null);
  const [screen, setScreen] = useState<Screen>("welcome");
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/tenants/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then(setTenant)
      .catch(() => setError("Organization not found"))
      .finally(() => setLoading(false));
  }, [slug]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const selectStaff = useCallback(
    async (staff: Staff) => {
      if (!tenant) return;
      setSelectedStaff(staff);
      setScreen("confirm");

      try {
        await fetch("/api/notify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tenantId: tenant.id,
            staffId: staff.id,
          }),
        });
      } catch {
        showToast("通知の送信に失敗しました");
      }

      setTimeout(() => {
        setScreen("welcome");
        setSelectedStaff(null);
      }, AUTO_RESET_SEC * 1000);
    },
    [tenant, showToast]
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-400 text-lg">Loading...</div>
      </div>
    );
  }

  if (error || !tenant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-lg">{error || "Not found"}</p>
      </div>
    );
  }

  const accent = tenant.primaryColor;

  return (
    <div
      className="min-h-screen bg-gray-50 select-none overflow-hidden"
      style={{ ["--accent" as string]: accent }}
    >
      {/* ===== Welcome Screen ===== */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center p-10 transition-all duration-400 ${
          screen === "welcome"
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-5 pointer-events-none"
        }`}
      >
        {tenant.logoUrl ? (
          <img
            src={tenant.logoUrl}
            alt={tenant.name}
            className="max-w-[520px] h-auto mb-8"
          />
        ) : (
          <h1 className="text-5xl font-bold text-gray-900 mb-8 tracking-tight">
            {tenant.name}
          </h1>
        )}
        <div
          className="w-16 h-[3px] rounded-full mb-9"
          style={{ background: accent }}
        />
        <p className="text-gray-500 text-xl text-center leading-relaxed mb-12">
          {tenant.welcomeMessage}
          <br />
          {tenant.welcomeMessageEn}
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
          {tenant.staff.map((s) => (
            <button
              key={s.id}
              onClick={() => selectStaff(s)}
              className="bg-white border-2 border-gray-200 rounded-2xl py-5 px-4 text-center
                transition-all active:scale-[0.97] hover:border-gray-300"
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
        className={`fixed bottom-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
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

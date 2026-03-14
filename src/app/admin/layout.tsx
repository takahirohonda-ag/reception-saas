"use client";

import { usePathname } from "next/navigation";

const NAV = [
  { href: "/admin", label: "ダッシュボード" },
  { href: "/admin/tenants", label: "テナント" },
  { href: "/admin/inquiries", label: "お問い合わせ" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="/admin" className="font-bold tracking-tight">ラクダReception Admin</a>
          <a href="/" className="text-sm text-gray-400 hover:text-white">サイトを見る →</a>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-6 py-6 flex gap-6">
        <nav className="w-48 flex-shrink-0">
          <div className="space-y-1">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "bg-amber-50 text-amber-700"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}

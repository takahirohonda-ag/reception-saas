"use client";

import { signIn } from "next-auth/react";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    const result = await signIn("credentials", { email, password, redirect: false });

    if (result?.error) {
      setError("メールアドレスまたはパスワードが正しくありません");
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.75 21h16.5" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-gray-900">ラクダReception</span>
          </a>
          <h1 className="text-xl font-bold text-gray-900">ログイン</h1>
        </div>

        {error && <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm mb-5">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">メールアドレス</label>
            <input name="email" type="email" required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">パスワード</label>
            <input name="password" type="password" required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none" />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50">
            {loading ? "ログイン中..." : "ログイン"}
          </button>
        </form>

        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full border-2 border-gray-200 py-3.5 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors mb-6"
        >
          Googleでログイン
        </button>

        <p className="text-center text-sm text-gray-500">
          アカウントをお持ちでない方は <a href="/signup" className="text-amber-600 font-medium hover:underline">新規登録</a>
        </p>
      </div>
    </div>
  );
}

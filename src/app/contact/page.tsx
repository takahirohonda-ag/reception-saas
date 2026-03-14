"use client";

import { useState, FormEvent } from "react";


export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: connect to form backend (e.g. Formspree, Resend, etc.)
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center">
          <a href="/reception-saas" className="text-xl font-bold text-gray-900 tracking-tight">
            Receptionism
          </a>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-6 py-16">
        {submitted ? (
          <div className="text-center">
            <div className="text-5xl mb-6">✅</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              お問い合わせを受け付けました
            </h1>
            <p className="text-gray-500 mb-8">
              2営業日以内にご連絡いたします。
            </p>
            <a
              href="/reception-saas"
              className="text-emerald-600 font-medium hover:underline"
            >
              トップに戻る
            </a>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              お問い合わせ
            </h1>
            <p className="text-gray-500 mb-8">
              カスタマイズのご相談、Enterprise プランの詳細、導入のご質問など、
              お気軽にお問い合わせください。
            </p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  お名前 *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  会社名
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  メールアドレス *
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  ご相談内容 *
                </label>
                <select
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-white"
                >
                  <option value="">選択してください</option>
                  <option value="enterprise">Enterprise プランについて</option>
                  <option value="custom">カスタマイズの相談</option>
                  <option value="integration">連携について</option>
                  <option value="other">その他</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  詳細 *
                </label>
                <textarea
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none resize-none"
                  placeholder="導入を検討している拠点数、通知先の要件、カスタマイズしたい内容など"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
              >
                送信する
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

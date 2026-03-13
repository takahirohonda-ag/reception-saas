import Link from "next/link";

const INTEGRATIONS = [
  { name: "Slack", icon: "💬" },
  { name: "Microsoft Teams", icon: "🟪" },
  { name: "Google Chat", icon: "💚" },
  { name: "LINE", icon: "🟢" },
  { name: "LINE WORKS", icon: "📱" },
  { name: "Discord", icon: "🎮" },
  { name: "Email", icon: "📧" },
  { name: "SMS", icon: "📲" },
  { name: "Webhook", icon: "🔗" },
];

const FEATURES = [
  {
    title: "30秒で導入",
    description:
      "iPadやタブレットにURLを開くだけ。アプリのインストールは不要です。",
    icon: "⚡",
  },
  {
    title: "9+の通知チャネル",
    description:
      "Slack、Teams、LINE、メールなど、チームが使っているツールにそのまま通知。",
    icon: "🔔",
  },
  {
    title: "ブランドカスタマイズ",
    description:
      "ロゴ、カラー、メッセージを自由に設定。自社の受付として違和感なく使えます。",
    icon: "🎨",
  },
  {
    title: "来訪者ログ",
    description:
      "誰がいつ来たかを自動記録。CSV出力でセキュリティ・コンプライアンスにも対応。",
    icon: "📋",
  },
  {
    title: "問い合わせベースカスタマイズ",
    description:
      "独自ワークフロー、入館証連携、カレンダー連動など、お気軽にご相談ください。",
    icon: "🛠️",
  },
  {
    title: "マルチ拠点対応",
    description:
      "拠点ごとに担当者・通知先を分けて管理。本社・支社をまとめて運用できます。",
    icon: "🏢",
  },
];

const PLANS = [
  {
    name: "Free",
    price: "¥0",
    period: "",
    description: "まずは試してみたい方に",
    features: [
      "1拠点",
      "スタッフ3名まで",
      "Slack・Email通知",
      "来訪者ログ（30日保存）",
    ],
    cta: "無料で始める",
    highlighted: false,
  },
  {
    name: "Standard",
    price: "¥5,000",
    period: "/月",
    description: "成長中のチームに",
    features: [
      "1拠点",
      "スタッフ無制限",
      "全通知チャネル対応",
      "来訪者ログ（無制限）",
      "ブランドカスタマイズ",
      "CSV出力",
    ],
    cta: "今すぐ始める",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "要お問い合わせ",
    period: "",
    description: "大規模導入・カスタマイズに",
    features: [
      "複数拠点",
      "SSO（シングルサインオン）",
      "API連携",
      "カスタムブランディング",
      "専任サポート",
      "SLA保証",
    ],
    cta: "お問い合わせ",
    highlighted: false,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ===== Header ===== */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-bold text-gray-900 tracking-tight">
            ReceptionPad
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-600">
            <a href="#features" className="hover:text-gray-900 transition-colors">
              機能
            </a>
            <a href="#integrations" className="hover:text-gray-900 transition-colors">
              連携
            </a>
            <a href="#pricing" className="hover:text-gray-900 transition-colors">
              料金
            </a>
            <Link
              href="/login"
              className="text-gray-900 font-medium hover:underline"
            >
              ログイン
            </Link>
            <Link
              href="/signup"
              className="bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              無料で始める
            </Link>
          </nav>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
            オフィスの受付を、
            <br />
            <span className="text-emerald-600">30秒</span>でスマートに。
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            iPadを置くだけで導入完了。来客があれば
            Slack・Teams・LINE・メール、お使いのツールに即通知。
            <br />
            シンプルなUI。明瞭な料金。問い合わせベースで柔軟にカスタマイズ。
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/signup"
              className="bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              無料で始める
            </Link>
            <a
              href="#features"
              className="border-2 border-gray-200 text-gray-600 px-8 py-4 rounded-full text-lg font-semibold hover:border-gray-300 transition-colors"
            >
              詳しく見る
            </a>
          </div>
        </div>
      </section>

      {/* ===== Demo Preview ===== */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-100">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Your Company
              </h2>
              <div className="w-12 h-[3px] bg-emerald-500 rounded-full mx-auto my-6" />
              <p className="text-gray-400 mb-8">
                ようこそ。担当者をお呼びします。
                <br />
                Welcome. We&apos;ll notify your contact.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {["田中 太郎", "佐藤 花子", "鈴木 一郎", "山田 美咲"].map(
                  (name) => (
                    <div
                      key={name}
                      className="border-2 border-gray-100 rounded-xl py-4 px-3 hover:border-emerald-200 transition-colors cursor-default"
                    >
                      <div className="font-bold text-gray-900">{name}</div>
                      <div className="text-xs text-gray-400">Staff</div>
                    </div>
                  )
                )}
              </div>
              <div className="text-xs text-gray-300">
                実際の受付画面イメージ
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Features ===== */}
      <section id="features" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              シンプルだけど、必要な機能は全部入り
            </h2>
            <p className="text-gray-500 text-lg">
              導入に手間はかけさせません。でも機能は妥協しません。
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl p-8 border border-gray-100"
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {f.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Integrations ===== */}
      <section id="integrations" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            お使いのツールに、そのまま通知
          </h2>
          <p className="text-gray-500 text-lg mb-12">
            Webhookで任意のシステムとも連携可能。足りないものがあればご相談ください。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {INTEGRATIONS.map((i) => (
              <div
                key={i.name}
                className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-full px-5 py-3 text-sm font-medium text-gray-700"
              >
                <span className="text-lg">{i.icon}</span>
                {i.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Pricing ===== */}
      <section id="pricing" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              明瞭な料金設計
            </h2>
            <p className="text-gray-500 text-lg">
              従量課金なし。月額固定で安心してお使いいただけます。
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 ${
                  plan.highlighted
                    ? "bg-gray-900 text-white ring-4 ring-emerald-500/20"
                    : "bg-white border border-gray-100"
                }`}
              >
                <div
                  className={`text-sm font-medium mb-2 ${plan.highlighted ? "text-emerald-400" : "text-gray-500"}`}
                >
                  {plan.name}
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span
                      className={`text-sm ${plan.highlighted ? "text-gray-400" : "text-gray-500"}`}
                    >
                      {plan.period}
                    </span>
                  )}
                </div>
                <p
                  className={`text-sm mb-6 ${plan.highlighted ? "text-gray-400" : "text-gray-500"}`}
                >
                  {plan.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className={`flex items-center gap-2 text-sm ${plan.highlighted ? "text-gray-300" : "text-gray-600"}`}
                    >
                      <span
                        className={
                          plan.highlighted ? "text-emerald-400" : "text-emerald-500"
                        }
                      >
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.name === "Enterprise" ? "/contact" : "/signup"}
                  className={`block text-center py-3 rounded-full font-semibold text-sm transition-colors ${
                    plan.highlighted
                      ? "bg-white text-gray-900 hover:bg-gray-100"
                      : "bg-gray-900 text-white hover:bg-gray-800"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            まずは無料で試してみませんか？
          </h2>
          <p className="text-gray-500 text-lg mb-8">
            クレジットカード不要。5分で受付画面が完成します。
          </p>
          <Link
            href="/signup"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            無料で始める
          </Link>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="border-t border-gray-100 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-gray-400">
            © 2026 ReceptionPad. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="/terms" className="hover:text-gray-600">
              利用規約
            </a>
            <a href="/privacy" className="hover:text-gray-600">
              プライバシーポリシー
            </a>
            <a href="/contact" className="hover:text-gray-600">
              お問い合わせ
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

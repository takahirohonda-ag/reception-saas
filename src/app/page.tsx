"use client";

const INTEGRATIONS = [
  { name: "Slack", color: "from-purple-500 to-pink-500" },
  { name: "Microsoft Teams", color: "from-blue-500 to-indigo-500" },
  { name: "Google Chat", color: "from-green-500 to-emerald-500" },
  { name: "LINE", color: "from-green-400 to-lime-500" },
  { name: "LINE WORKS", color: "from-green-600 to-teal-500" },
  { name: "Discord", color: "from-indigo-500 to-purple-600" },
  { name: "Email", color: "from-amber-500 to-orange-500" },
  { name: "SMS", color: "from-cyan-500 to-blue-500" },
  { name: "Webhook", color: "from-gray-500 to-gray-700" },
];

const FEATURES = [
  {
    title: "30秒で導入完了",
    description: "iPadやタブレットでURLを開くだけ。アプリのインストールは一切不要。届いたその日から使えます。",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: "9つ以上の通知チャネル",
    description: "Slack、Teams、LINE、メール、Discord、SMS。チームが普段使っているツールにそのまま来客通知を届けます。",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
      </svg>
    ),
  },
  {
    title: "完全ブランドカスタマイズ",
    description: "ロゴ、テーマカラー、ウェルカムメッセージを自由に設定。自社ブランドの受付として違和感なく運用できます。",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072" />
      </svg>
    ),
  },
  {
    title: "来訪者ログ・CSV出力",
    description: "誰がいつ誰を訪ねたかを自動記録。CSV出力でセキュリティ監査やコンプライアンス要件にも対応します。",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
      </svg>
    ),
  },
  {
    title: "問い合わせベースのカスタマイズ",
    description: "入館証連携、カレンダー自動通知、独自ワークフロー。要件に合わせて柔軟にカスタマイズ対応します。",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-5.1m0 0L11.42 4.97m-5.1 5.1H21M3 3v18" />
      </svg>
    ),
  },
  {
    title: "マルチ拠点対応",
    description: "拠点ごとに担当者・通知先を分けて管理。本社も支社も、1つのアカウントでまとめて運用できます。",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
];

const PLANS = [
  {
    name: "Free",
    price: "¥0",
    period: "",
    description: "まずは試してみたい方に",
    features: ["1拠点", "スタッフ3名まで", "Slack・Email通知", "来訪者ログ（30日保存）"],
    cta: "無料で始める",
    highlighted: false,
  },
  {
    name: "Standard",
    price: "¥5,000",
    period: "/月",
    description: "成長中のチームに最適",
    features: ["1拠点", "スタッフ無制限", "全通知チャネル対応", "来訪者ログ（無制限）", "ブランドカスタマイズ", "CSV出力"],
    cta: "今すぐ始める",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "要お問い合わせ",
    period: "",
    description: "大規模導入・カスタマイズに",
    features: ["複数拠点", "SSO（シングルサインオン）", "API連携", "カスタムブランディング", "専任サポート", "SLA保証"],
    cta: "お問い合わせ",
    highlighted: false,
  },
];

const STEPS = [
  { step: "01", title: "アカウント作成", description: "メールアドレスで無料登録。1分で完了します。" },
  { step: "02", title: "受付画面を設定", description: "ロゴ・カラー・スタッフ名を入力して、自社ブランドの受付画面を作成。" },
  { step: "03", title: "通知先を接続", description: "Slack・Teams・LINE etc. 使っているツールのWebhookを設定するだけ。" },
  { step: "04", title: "iPadに表示", description: "受付画面のURLをiPadで開いてホーム画面に追加。これで導入完了です。" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* ===== Header ===== */}
      <header className="fixed top-0 w-full bg-white/70 backdrop-blur-xl border-b border-gray-100/50 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <svg className="w-4.5 h-4.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">rakudaReception</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-500">
            <a href="#features" className="hover:text-gray-900 transition-colors">機能</a>
            <a href="#how-it-works" className="hover:text-gray-900 transition-colors">使い方</a>
            <a href="#integrations" className="hover:text-gray-900 transition-colors">連携</a>
            <a href="#pricing" className="hover:text-gray-900 transition-colors">料金</a>
            <a href="#pricing" className="bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-all hover:shadow-lg hover:shadow-gray-900/20">
              無料で始める
            </a>
          </nav>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section className="relative pt-36 pb-24 px-6 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-emerald-50/80 via-teal-50/40 to-transparent rounded-full blur-3xl -z-10" />
        <div className="absolute top-20 right-[10%] w-72 h-72 bg-gradient-to-br from-emerald-100/40 to-cyan-100/40 rounded-full blur-3xl -z-10" />
        <div className="absolute top-40 left-[5%] w-48 h-48 bg-gradient-to-br from-teal-100/30 to-emerald-100/30 rounded-full blur-3xl -z-10" />

        <div className="max-w-4xl mx-auto text-center" style={{ animation: "fadeInUp 0.8s ease-out" }}>
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-full px-4 py-1.5 text-sm text-emerald-700 font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            次世代のオフィス受付システム
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-[1.1] tracking-tight mb-8">
            オフィスの受付を、
            <br />
            <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
              30秒でスマートに。
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed">
            iPadを置くだけで導入完了。来客があればSlack・Teams・LINE・メールなど、お使いのツールに即時通知。シンプルなUI、明瞭な料金、問い合わせベースで柔軟にカスタマイズ。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#pricing"
              className="bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition-all hover:shadow-xl hover:shadow-gray-900/20 hover:-translate-y-0.5"
            >
              無料で始める
            </a>
            <a
              href="/reception-saas/reception/demo"
              className="border-2 border-gray-200 text-gray-600 px-8 py-4 rounded-full text-lg font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all"
            >
              デモを見る
            </a>
          </div>
        </div>
      </section>

      {/* ===== Demo Preview ===== */}
      <section className="pb-28 px-6">
        <div className="max-w-5xl mx-auto" style={{ animation: "fadeInUp 1s ease-out 0.2s both" }}>
          <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-3 shadow-2xl shadow-gray-900/30">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                <div className="w-3 h-3 rounded-full bg-green-400/80" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-gray-700/50 rounded-lg px-4 py-1.5 text-sm text-gray-400 text-center font-mono">
                  rakudareception.com/reception/your-company
                </div>
              </div>
            </div>
            {/* Screen content */}
            <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center max-w-lg mx-auto">
                <h2 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">Your Company</h2>
                <div className="w-14 h-[3px] bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto my-7" />
                <p className="text-gray-400 mb-10 text-lg leading-relaxed">
                  ようこそ。担当者をお呼びします。<br />
                  Welcome. We&apos;ll notify your contact.
                </p>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {[
                    { jp: "田中 太郎", en: "Taro Tanaka" },
                    { jp: "佐藤 花子", en: "Hanako Sato" },
                    { jp: "鈴木 一郎", en: "Ichiro Suzuki" },
                    { jp: "山田 美咲", en: "Misaki Yamada" },
                  ].map((s) => (
                    <div
                      key={s.jp}
                      className="border-2 border-gray-100 rounded-xl py-4 px-3 hover:border-emerald-300 hover:shadow-sm transition-all cursor-default group"
                    >
                      <div className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">{s.jp}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{s.en}</div>
                    </div>
                  ))}
                </div>
                <a
                  href="/reception-saas/reception/demo"
                  className="inline-flex items-center gap-1.5 text-sm text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
                >
                  実際に操作してみる
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ===== Features ===== */}
      <section id="features" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-sm text-emerald-600 font-semibold uppercase tracking-widest mb-4">Features</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-5">
              シンプルだけど、妥協はしない
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              導入に手間はかけさせません。必要な機能はすべて揃っています。
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center text-emerald-600 mb-5 group-hover:from-emerald-100 group-hover:to-teal-100 transition-colors">
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== How It Works ===== */}
      <section id="how-it-works" className="py-28 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-sm text-emerald-600 font-semibold uppercase tracking-widest mb-4">How It Works</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-5">
              4ステップで導入完了
            </h2>
            <p className="text-lg text-gray-500">本当に5分で使い始められます。</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {STEPS.map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-xl font-bold mx-auto mb-5 shadow-lg shadow-emerald-500/20">
                  {s.step}
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.description}</p>
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Integrations ===== */}
      <section id="integrations" className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm text-emerald-600 font-semibold uppercase tracking-widest mb-4">Integrations</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-5">
              お使いのツールに、そのまま通知
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              Webhookで任意のシステムとも連携可能。足りないものがあればご相談ください。
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {INTEGRATIONS.map((i) => (
              <div
                key={i.name}
                className="group flex items-center gap-3 bg-white border border-gray-100 rounded-2xl px-6 py-4 hover:shadow-lg hover:border-gray-200 transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${i.color}`} />
                <span className="text-sm font-semibold text-gray-700">{i.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Pricing ===== */}
      <section id="pricing" className="py-28 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-sm text-emerald-600 font-semibold uppercase tracking-widest mb-4">Pricing</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-5">
              明瞭な料金設計
            </h2>
            <p className="text-lg text-gray-500">従量課金なし。月額固定で安心してお使いいただけます。</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-3xl p-9 transition-all duration-300 hover:-translate-y-1 ${
                  plan.highlighted
                    ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl shadow-gray-900/30 ring-1 ring-white/10 scale-[1.03]"
                    : "bg-white border border-gray-100 hover:shadow-lg"
                }`}
              >
                {plan.highlighted && (
                  <div className="inline-block bg-gradient-to-r from-emerald-400 to-teal-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <div className={`text-sm font-semibold mb-3 ${plan.highlighted ? "text-emerald-400" : "text-gray-400 uppercase tracking-wider"}`}>
                  {plan.name}
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-5xl font-extrabold tracking-tight">{plan.price}</span>
                  {plan.period && (
                    <span className={`text-base ${plan.highlighted ? "text-gray-400" : "text-gray-400"}`}>
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className={`text-sm mb-8 ${plan.highlighted ? "text-gray-400" : "text-gray-500"}`}>
                  {plan.description}
                </p>
                <ul className="space-y-3.5 mb-10">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-center gap-3 text-sm ${plan.highlighted ? "text-gray-300" : "text-gray-600"}`}>
                      <svg className={`w-5 h-5 flex-shrink-0 ${plan.highlighted ? "text-emerald-400" : "text-emerald-500"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={plan.name === "Enterprise" ? "/reception-saas/contact" : "#pricing"}
                  className={`block text-center py-3.5 rounded-full font-semibold text-sm transition-all ${
                    plan.highlighted
                      ? "bg-white text-gray-900 hover:bg-gray-100 shadow-lg"
                      : "bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_60%)]" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-5">
            まずは無料で試してみませんか？
          </h2>
          <p className="text-lg text-white/80 mb-10">
            クレジットカード不要。5分で受付画面が完成します。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#pricing"
              className="bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all hover:shadow-xl shadow-lg"
            >
              無料で始める
            </a>
            <a
              href="/reception-saas/contact"
              className="border-2 border-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all"
            >
              お問い合わせ
            </a>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="bg-gray-900 text-gray-400 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                  <svg className="w-4.5 h-4.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-white tracking-tight">rakudaReception</span>
              </div>
              <p className="text-sm text-gray-500 max-w-xs">iPadを置くだけで導入完了。オフィスの受付を次世代にアップデートします。</p>
            </div>
            <div className="flex gap-12 text-sm">
              <div>
                <h4 className="text-white font-semibold mb-4">プロダクト</h4>
                <div className="space-y-2.5">
                  <a href="#features" className="block hover:text-white transition-colors">機能</a>
                  <a href="#pricing" className="block hover:text-white transition-colors">料金</a>
                  <a href="#integrations" className="block hover:text-white transition-colors">連携</a>
                </div>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">その他</h4>
                <div className="space-y-2.5">
                  <a href="/reception-saas/contact" className="block hover:text-white transition-colors">お問い合わせ</a>
                  <a href="/reception-saas/privacy" className="block hover:text-white transition-colors">プライバシーポリシー</a>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8" />
        </div>
      </footer>
    </div>
  );
}

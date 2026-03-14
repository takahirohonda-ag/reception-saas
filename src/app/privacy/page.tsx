export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center">
          <a href="/reception-saas" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <svg className="w-4.5 h-4.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">ラクダReception</span>
          </a>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">プライバシーポリシー</h1>
        <p className="text-sm text-gray-400 mb-12">最終更新日: 2026年3月14日</p>

        <div className="space-y-10 text-sm text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">1. 取得する個人情報</h2>
            <p>当サービスでは、以下の個人情報を取得することがあります。</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>アカウント登録時の氏名・メールアドレス</li>
              <li>受付画面で来訪者が任意で入力する氏名・会社名</li>
              <li>お問い合わせフォームに入力された情報</li>
              <li>サービス利用に伴うアクセスログ</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">2. 利用目的</h2>
            <p>取得した個人情報は、以下の目的で利用します。</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>サービスの提供・運営</li>
              <li>来客通知の送信</li>
              <li>来訪者ログの記録・表示</li>
              <li>お問い合わせへの対応</li>
              <li>サービスの改善・新機能の開発</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">3. 第三者提供</h2>
            <p>法令に基づく場合を除き、ご本人の同意なく個人情報を第三者に提供することはありません。</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">4. 外部サービスとの連携</h2>
            <p>当サービスでは、お客様が設定した通知チャネル（Slack、Microsoft Teams、LINE等）に来客情報を送信します。これらの外部サービスにおける情報の取り扱いは、各サービスのプライバシーポリシーに従います。</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">5. 安全管理措置</h2>
            <p>個人情報の漏洩・滅失・毀損を防止するため、適切な安全管理措置を講じます。</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">6. 開示・訂正・削除</h2>
            <p>ご本人からの個人情報の開示・訂正・削除のご請求には、合理的な期間内に対応します。</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">7. お問い合わせ</h2>
            <p>個人情報の取り扱いに関するお問い合わせは、<a href="/contact" className="text-emerald-600 hover:underline">お問い合わせフォーム</a>よりご連絡ください。</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">8. ポリシーの変更</h2>
            <p>本ポリシーの内容は、法令の変更やサービスの変更に伴い、予告なく変更することがあります。変更後のポリシーは、本ページに掲載した時点で効力を生じます。</p>
          </section>
        </div>
      </div>
    </div>
  );
}

// src/app/privacy/AuctionList.tsx
import Link from 'next/link';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'プライバシーポリシー | ステラフィルワールド',
    description: 'ステラフィルワールドのプライバシーポリシーページです。',
};

export default function Privacy() {
    return (
        <>
            <div className="mb-6">
                <Link href="/">
                    <Button variant="ghost" className="flex items-center">
                        <span className="mr-2">←</span> トップに戻る
                    </Button>
                </Link>
            </div>

            <div className="max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-lg">
                <div className="mb-6 flex items-center justify-center">
                    <Star className="text-yellow-400 h-8 w-8 mr-2" />
                    <h1 className="text-2xl font-bold text-center">プライバシーポリシー</h1>
                </div>

                <div className="space-y-6">
                    <p className=" text-sm mb-6">
                        T-Project（以下「運営」）は、参加者の個人情報の取り扱いについて、以下のとおりプライバシーポリシー（以下「本ポリシー」）を定めます。
                    </p>

                    <section>
                        <h2 className="text-xl font-semibold mb-3 flex items-center">
                            <Star className="h-4 w-4 mr-1 text-yellow-400" /> 第1条（個人情報の定義）
                        </h2>
                        <p className="pl-6">
                            本ポリシーにおいて「個人情報」とは、個人情報保護法に定義される「個人情報」を指すものとし、氏名、メールアドレス、Discordユーザー名など、特定の個人を識別できる情報を指します。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3 flex items-center">
                            <Star className="h-4 w-4 mr-1 text-yellow-400" /> 第2条（収集する個人情報）
                        </h2>
                        <p className="pl-6">
                            運営は、サービス提供のため、以下の個人情報を収集します。
                        </p>
                        <ul className="list-disc pl-12 space-y-1 mt-2">
                            <li>ニックネーム（活動名）</li>
                            <li>メールアドレス</li>
                            <li>Discordユーザー名</li>
                            <li>配信/動画投稿チャンネルリンク</li>
                            <li>Xのリンク</li>
                            <li>その他、応募フォームで参加者が入力した情報</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3 flex items-center">
                            <Star className="h-4 w-4 mr-1 text-yellow-400" /> 第3条（個人情報の利用目的）
                        </h2>
                        <p className="pl-6">
                            運営は、収集した個人情報を以下の目的で利用します。
                        </p>
                        <ul className="list-disc pl-12 space-y-1 mt-2">
                            <li>ステラフィルワールドへの参加審査</li>
                            <li>参加者への連絡や通知</li>
                            <li>本サービスの運営や改善</li>
                            <li>トラブル対応</li>
                            <li>その他、本サービスの提供に必要な業務</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3 flex items-center">
                            <Star className="h-4 w-4 mr-1 text-yellow-400" /> 第4条（個人情報の第三者提供）
                        </h2>
                        <p className="pl-6">
                            運営は、以下の場合を除き、個人情報を第三者に提供することはありません。
                        </p>
                        <ul className="list-disc pl-12 space-y-1 mt-2">
                            <li>参加者の同意がある場合</li>
                            <li>法令に基づく場合</li>
                            <li>人の生命、身体または財産の保護のために必要がある場合</li>
                            <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合</li>
                            <li>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3 flex items-center">
                            <Star className="h-4 w-4 mr-1 text-yellow-400" /> 第5条（個人情報の安全管理）
                        </h2>
                        <p className="pl-6">
                            運営は、個人情報の漏洩、滅失またはき損の防止その他の個人情報の安全管理のために必要かつ適切な措置を講じます。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3 flex items-center">
                            <Star className="h-4 w-4 mr-1 text-yellow-400" /> 第6条（個人情報の開示・訂正・削除）
                        </h2>
                        <p className="pl-6">
                            参加者から自己の個人情報の開示・訂正・削除を求められた場合、運営は速やかに対応します。ただし、運営の業務の適正な実施に著しい支障を及ぼすおそれがある場合、または法令に違反することとなる場合は、この限りではありません。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3 flex items-center">
                            <Star className="h-4 w-4 mr-1 text-yellow-400" /> 第7条（プライバシーポリシーの変更）
                        </h2>
                        <p className="pl-6">
                            運営は、必要に応じて本ポリシーを変更することがあります。変更後のプライバシーポリシーは、本サイト上に表示した時点から効力を生じるものとします。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3 flex items-center">
                            <Star className="h-4 w-4 mr-1 text-yellow-400" /> 第8条（お問い合わせ）
                        </h2>
                        <p className="pl-6">
                            本ポリシーに関するお問い合わせは、Discordサーバーを通じてお願いします。
                        </p>
                    </section>

                    <div className="mt-8 text-center text-sm">
                        2025年2月6日 制定
                    </div>
                </div>
            </div>
        </>
    );
}
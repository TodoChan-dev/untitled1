// src/app/terms/page.tsx
import Link from 'next/link';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '利用規約 | ステラフィルワールド',
    description: 'ステラフィルワールドの利用規約ページです。',
};

export default function Terms() {
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
                    <h1 className="text-2xl font-bold text-center">ステラフィルワールド利用規約</h1>
                </div>

                <div className="space-y-6 text-sm">
                    <p className="mb-6">
                        本利用規約（以下「本規約」）は、T-Project（以下「運営」）が提供する特別企画「ステラフィルワールド」のうち、サーバー内外における動画配信や撮影、プロモーション活動等を行う配信者向け Minecraft サーバー及び配信者専用 Discord サーバー（以下「配信者専用サーバー」）の利用条件を定めるものです。配信者は、別途締結される企画参加契約に従い、本規約に同意した上で本サーバーを利用するものとします。
                    </p>

                    <section>
                        <h2 className="text-xl font-semibold mb-3 flex items-center">
                            <Star className="h-4 w-4 mr-1 text-yellow-400" /> 第1章 総則・定義
                        </h2>

                        <div className="pl-4 space-y-4">
                            <div>
                                <h3 className="font-medium mb-2">第1条（利用規約への同意）</h3>
                                <ol className="list-decimal pl-6 space-y-2">
                                    <li>本規約は、当運営が提供する配信者専用サーバーの利用条件を定めるものです。</li>
                                    <li>配信者は、別途締結される企画参加契約を締結後、本規約に同意し当運営が定める全ての条件に従うことに同意したものとみなします。</li>
                                </ol>
                            </div>

                            <div>
                                <h3 className="font-medium mb-2">第2条（用語の定義）</h3>
                                <p className="mb-2">本規約において、以下の用語は次の意味を有します。</p>
                                <ol className="list-decimal pl-6 space-y-2">
                                    <li>配信者：本サーバーを利用して動画配信、撮影、プロモーション活動等を業務目的で行う者。</li>
                                    <li>アカウント：配信者専用サーバー利用のために当運営が管理する登録情報およびデータ。</li>
                                    <li>コンテンツ：本企画において当運営が提供する、ストーリー、独自アイテム、その他本企画の構成要素。</li>
                                    <li>個別規約：本規約に加え、当運営が別途規定、周知するガイドラインや注意事項、または別途で締結される契約そのものを指します。</li>
                                </ol>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3 flex items-center">
                            <Star className="h-4 w-4 mr-1 text-yellow-400" /> 第2章 利用規約の基本規定
                        </h2>

                        <div className="pl-4 space-y-4">
                            <div>
                                <h3 className="font-medium mb-2">第3条（適用及び変更）</h3>
                                <ol className="list-decimal pl-6 space-y-2">
                                    <li>本規約は、配信者と当運営との間の配信者専用サーバー利用、及び配信者専用サーバー利用を内包する特別企画「ステラフィルワールド」に関する一切の関係に適用されます。</li>
                                    <li>当運営は、本規約または個別規約の内容を、可能な限り各配信者の利益を損ねることなく、必要に応じて変更することができます。変更後の規約は、配信者専用 Discord サーバー内、又は企画参加契約時に提供されたメールアドレスによる告知により周知され、配信者はその変更内容に従うものとします。</li>
                                </ol>
                            </div>

                            <div>
                                <h3 className="font-medium mb-2">第4条（禁止事項）</h3>
                                <p className="mb-2">配信者は、配信者専用サーバーの利用に際して、以下の行為を行ってはなりません。</p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>法令、公序良俗、その他社会的通念に反する行為。</li>
                                    <li>Minecraft 利用規約、Discord 利用規約、その他関連規定に違反する行為。</li>
                                    <li>虚偽の情報による登録や、不正な情報操作、著作権・知的財産権の侵害行為。</li>
                                    <li>有害なプログラムの送信、第三者への嫌がらせ、差別的言動など、当運営が不適切と判断する行為。</li>
                                    <li>サーバー運営や他の配信者の活動を故意に妨害する行為。</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <p className="text-center text-sm text-gray-500 mt-8">
                        ※完全な利用規約は<a href="#" className="text-primary underline">こちら</a>からご覧いただけます。
                    </p>

                    <div className="mt-8 text-center text-sm text-secondary">
                        2025年2月6日 制定
                    </div>
                </div>
            </div>
        </>
    );
}
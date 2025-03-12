// src/app/terms/page.tsx
import Link from 'next/link';
import { Star, ChevronLeft } from 'lucide-react';
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
                        <ChevronLeft className="mr-2 h-5 w-5" />
                        トップに戻る
                    </Button>
                </Link>
            </div>

            <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-lg">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold mb-2 flex items-center justify-center">
                        <Star className="text-yellow-400 h-6 w-6 mr-2" />
                        ステラフィルワールド利用規約
                    </h1>
                    <p className="text-gray-600 mt-4">
                        本利用規約（以下「本規約」）は、T-Project（以下「当運営」）が提供する特別企画「ステラフィルワールド」のうち、サーバー内外における動画配信や撮影、プロモーション活動等を行う配信者向け Minecraft サーバー及び配信者専用 Discord サーバー（以下「配信者専用サーバー」）の利用条件を定めるものです。配信者は、別途締結される企画参加契約に従い、本規約に同意した上で本サーバーを利用するものとします。
                    </p>
                </div>

                <div className="space-y-8">
                    {/* 第1章 総則・定義 */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-gray-200 flex items-center">
                            <Star className="text-yellow-400 h-5 w-5 mr-2" />
                            第1章 総則・定義
                        </h2>

                        <div className="space-y-6 pl-4">
                            <div>
                                <h3 className="text-xl font-semibold mb-3">第1条（利用規約への同意）</h3>
                                <ol className="list-decimal pl-6 space-y-2">
                                    <li>本規約は、当運営が提供する配信者専用サーバーの利用条件を定めるものです。</li>
                                    <li>配信者は、別途締結される企画参加契約を締結後、本規約に同意し当運営が定める全ての条件に従うことに同意したものとみなします。</li>
                                </ol>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-3">第2条（用語の定義）</h3>
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

                    {/* 第2章 利用規約の基本規定 */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-gray-200 flex items-center">
                            <Star className="text-yellow-400 h-5 w-5 mr-2" />
                            第2章 利用規約の基本規定
                        </h2>

                        <div className="space-y-6 pl-4">
                            <div>
                                <h3 className="text-xl font-semibold mb-3">第3条（適用及び変更）</h3>
                                <ol className="list-decimal pl-6 space-y-2">
                                    <li>本規約は、配信者と当運営との間の配信者専用サーバー利用、及び配信者専用サーバー利用を内包する特別企画「ステラフィルワールド」に関する一切の関係に適用されます。</li>
                                    <li>当運営は、本規約または個別規約の内容を、可能な限り各配信者の利益を損ねることなく、必要に応じて変更することができます。変更後の規約は、配信者専用 Discord サーバー内、又は企画参加契約時に提供されたメールアドレスによる告知により周知され、配信者はその変更内容に従うものとします。</li>
                                </ol>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-3">第4条（禁止事項）</h3>
                                <p className="mb-2">配信者は、配信者専用サーバーの利用に際して、以下の行為を行ってはなりません。</p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>法令、公序良俗、その他社会的通念に反する行為。</li>
                                    <li>Minecraft 利用規約、Discord 利用規約、その他関連規定に違反する行為。</li>
                                    <li>虚偽の情報による登録や、不正な情報操作、著作権・知的財産権の侵害行為。</li>
                                    <li>有害なプログラムの送信、第三者への嫌がらせ、差別的言動など、当運営が不適切と判断する行為。</li>
                                    <li>サーバー運営や他の配信者の活動を故意に妨害する行為。</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-3">第5条（利用条件）</h3>
                                <ol className="list-decimal pl-6 space-y-2">
                                    <li>配信者は、本規約に同意した上で、配信者専用サーバーを利用するものとします。</li>
                                    <li>配信者は、自己の責任において、必要なデバイス、通信手段、ソフトウェア、配信機材等を準備し、配信者専用サーバーにアクセスするものとします。</li>
                                </ol>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-3">第6条（利用制限及び登録抹消）</h3>
                                <p className="pl-6">
                                    当運営は、配信者が本規約または企画参加契約等の個別規約に違反した場合、違反の事実認定後速やかに Minecraft サーバー内チャット、又は Discord でその旨を通知し、通知を以て配信者は当該通知を確認したものと見なし、配信者専用サーバーの全部または一部の利用制限、あるいは参加登録抹消を行うことができます。
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-3">第7条（当運営の権利）</h3>
                                <ol className="list-decimal pl-6 space-y-2">
                                    <li>配信者専用サーバー内におけるテクスチャ、ストーリー、その他コンテンツに関する著作権およびその他知的財産権は、原則として当運営に帰属します。</li>
                                    <li>配信者は、当運営の明示的な許諾なく、当企画内のコンテンツの改変、再配布、または外部での利用を行ってはならないものとします。</li>
                                    <li>配信動画等においては、当運営が指定するクレジット表記を必ず行うこととします。</li>
                                </ol>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-3">第8条（免責事項）</h3>
                                <ol className="list-decimal pl-6 space-y-2">
                                    <li>当運営は、配信者専用サーバーの内容、正確性、安全性、完全性について、明示的にも黙示的にも保証しません。</li>
                                    <li>運用サーバーの当運営の操作以外による停止、メンテナンス、天災、その他不可抗力による損害について、当運営は一切責任を負いません。</li>
                                    <li>配信者間や第三者とのトラブルに関して、当運営は一切関知しません。</li>
                                </ol>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-3">第9条（退会）</h3>
                                <p className="pl-6 mb-2">
                                    配信者が配信者専用サーバーの利用を配信者都合によって終了する場合、当該時点で配信者に課される全ての責務を直ちに履行するものとします。但し、配信者の都合によらない理由によって利用を終了する場合、当運営及び配信者の協議によって解決するものとします。
                                </p>
                                <ul className="list-disc pl-10">
                                    <li>一度退会したアカウントの復旧は原則として行いません。</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-3">第10条（権利義務等の譲渡禁止）</h3>
                                <p className="pl-6">
                                    配信者は、本規約に基づく権利および義務を第三者に譲渡、貸与、またはその他処分してはなりません。
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-3">第11条（賠償責任）</h3>
                                <p className="pl-6">
                                    配信者は、本規約違反により当運営または第三者に損害を与えた場合、その損害を賠償するものとします。
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-3">第12条（個人情報の取扱い）</h3>
                                <ol className="list-decimal pl-6 space-y-2">
                                    <li>当運営は、配信者から提供された個人情報保護法で規定される個人情報の他、配信活動に支障をきたす恐れが懸念される非公開情報を、企画参加契約第三条(守秘義務)規定に従って厳重に管理します。但し、配信活動に支障をきたす恐れが懸念される非公開情報において、個人情報保護法で規定される個人情報と同等に取り扱うことを確約するわけではありません。</li>
                                    <li>法令に基づく場合を除き、配信者の同意なく第三者に個人情報を開示しません。</li>
                                </ol>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-3">第13条（サービスの提供）</h3>
                                <ol className="list-decimal pl-6 space-y-2">
                                    <li>配信者は、配信者専用サーバー利用にあたり、自己の責任と費用で必要な機器や通信手段を用意するものとします。</li>
                                    <li>当運営は、必要と判断した場合、事前の通知なく配信者専用サーバーの内容を変更、停止、または中止することができます。</li>
                                </ol>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-3">第14条（アカウントの管理責任）</h3>
                                <ol className="list-decimal pl-6 space-y-2">
                                    <li>配信者は、自己のアカウント管理に万全を期すものとし、配信者が業務上の理由で配信者が信任、又は委託する者を除く第三者にアカウントを利用させないものとします。</li>
                                    <li>当運営は、配信者のアカウントが第三者に不正利用された場合、当運営の故意または重大な過失が認められない限り、一切責任を負いません。</li>
                                </ol>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-3">第15条（料金及び費用）</h3>
                                <ol className="list-decimal pl-6 space-y-2">
                                    <li>配信者専用サーバーの利用は無料としますが、配信者向けに追加機能や有料コンテンツが提供される場合、その料金体系は当運営が別途定め、個別契約として双方合意の元で締結するものとします。</li>
                                    <li>利用に伴う通信費その他の費用は配信者の負担とします。</li>
                                </ol>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-3">第16条（禁止行為の補足）</h3>
                                <p className="mb-2 pl-6">配信者は、以下の行為を行ってはなりません。</p>
                                <ol className="list-decimal pl-6 space-y-2">
                                    <li>ゲームシステム及びゲームバランスに影響を与え得るチートクライアント及びそれに準じるシステム又は機器の使用</li>
                                    <li>STREAM DECK などの物理デバイス(但し、マルチファンクション機能の使用は許容しない。)を除く、マクロツールの使用</li>
                                    <li>不正なクライアントの使用</li>
                                    <li>複数アカウントの使用</li>
                                    <li>サーバーの趣旨に反する、意図的な高負荷行為</li>
                                    <li>不必要な連続アクセス行為</li>
                                    <li>インターネット上における一般的な受忍限度を超える、障がい・国籍・性別・人種差別等のあらゆる差別的言動</li>
                                    <li>運営の指示に従わない行為</li>
                                    <li>その他、運営が不適切と認定する行為</li>
                                </ol>
                            </div>
                        </div>
                    </section>

                    {/* 第3章 配信者条項 */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-gray-200 flex items-center">
                            <Star className="text-yellow-400 h-5 w-5 mr-2" />
                            第3章 配信者条項
                        </h2>

                        <div className="space-y-6 pl-4">
                            <div>
                                <h3 className="text-xl font-semibold mb-3">第17条（動画配信・撮影及びプロモーション活動）</h3>
                                <ol className="list-decimal pl-6 space-y-2">
                                    <li>配信者は、動画配信、撮影、その他プロモーション活動を行う場合、事前に当運営へ申請し、許可を得るものとします。</li>
                                    <li>動画配信及び撮影、その他活動を行う場合、以下の留意事項を認識するものとし、かつ配信者は以下の項目を遵守するものとします。</li>
                                    <li>当事者の承諾なく、他参加者の妨害をしないこと</li>
                                    <li>T-Project の許諾なく、参加者用のサーバーIP アドレスを配信視聴者が閲覧出来ないようにすること</li>
                                    <li>当企画の参加にあたる配信及び動画投稿、又はプロモーション活動において、これに用いる広報資料（サムネイル等を含む。）で、予め T-Project が使用を明示的に許諾した素材以外の当企画コンテンツを含む素材を使用する場合、一般公開前に T-Project の許諾を受けるものとします。但し、当企画のコンテンツに関与しておらず、尚且つ配信者が正当なライセンスを保有又は保留している素材を用いる場合、その素材単体の取り扱いにおいては各配信者の裁量に委ねられます。</li>
                                </ol>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-3">第18条（意見表明）</h3>
                                <ol className="list-decimal pl-6 space-y-2">
                                    <li>参加者が当企画及び当運営との契約全般において意見や提案がある場合、参加者専用 Discord サーバー内、又は当運営が適切な形で設ける場所で表明するものとし、特に当運営や他参加者及び関係者に損害を与え得る表明を、X(旧:Twitter)や YouTube、Twitch、その他不特定多数又は第三者が閲覧できる場で行わないものとします。</li>
                                    <li>本企画を企画運営する T-Project は、上項によって表明された意見及び提案について、可能な限り誠実に対応するものとします。</li>
                                </ol>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-3">第19条（サーバー参加規約の遵守）</h3>
                                <ol className="list-decimal pl-6 space-y-2">
                                    <li>本規約に記載する条項への違反が確認された場合、状況に応じ適切な措置を行う権限があり、参加者はその措置に従うものとします。</li>
                                    <li>処分に対する異議申し立ては、運営が別途指定する方法で受け付けるものとし、異議申し立てを受領後、速やかに措置実施者を除いた担当者又は T-Project 統括責任者が再度審理するものとします。</li>
                                </ol>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-3">第20条（広告表示・スポンサー表記）</h3>
                                <p className="pl-6">
                                    配信及び動画投稿時における広告表示やスポンサー表記については、MINECRAFT 利用規約および エンドユーザー使用許諾契約書等に反しないことを前提として、各配信者の裁量に委ねられるものとします。但し、本企画における協賛企業から指定があった場合は、当該指示を遵守するものとします。
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* 第4章 付則・その他 */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-gray-200 flex items-center">
                            <Star className="text-yellow-400 h-5 w-5 mr-2" />
                            第4章 付則・その他
                        </h2>

                        <div className="space-y-6 pl-4">
                            <div>
                                <h3 className="text-xl font-semibold mb-3">第21条（通知方法及び連絡規定）</h3>
                                <ol className="list-decimal pl-6 space-y-2">
                                    <li>本規約に関する通知は、当運営が定める電子メールまたは公式 Discord サーバーを通じて行うものとします。</li>
                                    <li>配信者は、常に最新の連絡先情報を当運営に提供するものとします。</li>
                                </ol>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-3">第22条（データ保護とセキュリティ）</h3>
                                <ol className="list-decimal pl-6 space-y-2">
                                    <li>当運営は、配信者の個人情報およびアカウント情報の保護に努め、適切なセキュリティ対策を講じます。</li>
                                    <li>万一、情報漏洩等の事態が発生した場合は、当運営が定める手順に従って対応します。</li>
                                </ol>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-3">第23条（準拠法・裁判管轄）</h3>
                                <p className="pl-6">
                                    本規約の解釈には日本法が適用され、紛争が生じた場合、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
                                </p>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="mt-12 text-right text-sm text-gray-500">
                    2025年2月6日 制定
                </div>
            </div>
        </>
    );
}
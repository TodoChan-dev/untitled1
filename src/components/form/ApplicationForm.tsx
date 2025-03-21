// src/components/form/ApplicationForm.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Send, AlertCircle, Mail, User, Link as LinkIcon, AtSign } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

// フォームのバリデーションスキーマ
const formSchema = z.object({
    name: z.string().min(1, { message: 'ニックネームを入力してください' }),
    email: z.string().email({ message: '有効なメールアドレスを入力してください' }),
    discordUsername: z.string().min(2, { message: 'Discordのユーザー名を入力してください' }),
    channelLink: z.string().url({ message: '有効なURLを入力してください' }),
    xLink: z.string().url({ message: '有効なURLを入力してください' }),
    followsTodomen: z.boolean().refine(val => val === true, { message: 'フォローしていることが応募条件です' }),
    streamingFrequency: z.string().optional(),
    termsAgreed: z.boolean().refine(val => val === true, { message: '利用規約に同意してください' }),
    privacyAgreed: z.boolean().refine(val => val === true, { message: 'プライバシーポリシーに同意してください' }),
    additionalInfo: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ApplicationForm() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            discordUsername: '',
            channelLink: '',
            xLink: '',
            followsTodomen: false,
            streamingFrequency: '',
            termsAgreed: false,
            privacyAgreed: false,
            additionalInfo: '',
        },
    });

    const watchTermsAgreed = watch('termsAgreed');
    const watchPrivacyAgreed = watch('privacyAgreed');
    const watchFollowsTodomen = watch('followsTodomen');

    // フォーム送信処理
    const onSubmit = async (data: FormValues) => {
        setIsSubmitting(true);
        setSubmitError('');

        try {
            const response = await fetch('/api/application', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || '応募の送信に失敗しました');
            }

            // 成功したら「ありがとう」ページにリダイレクト
            router.push('/thanks');
        } catch (error) {
            console.error('Submit error:', error);
            setSubmitError(error instanceof Error ? error.message : '応募の送信中にエラーが発生しました。後でもう一度お試しください。');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-lg">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-center">ステラフィルワールド参加応募フォーム</h1>
                <p className="mt-2 text-center">
                    以下のフォームに必要事項を入力して応募してください。<span className="text-red-500">*</span> は必須項目です。
                </p>
                <p className="mt-4 text-center p-4 max-w-2xl mx-auto border rounded shadow-sm">
                    <span className="font-bold block mb-2">【注意事項】</span>
                    ・1人1回までのご応募でお願いいたします。別のアカウント等で複数回ご応募された場合はすべての応募を無効とさせていただきます。<br/>
                    ・回答に不備があった場合(例えば、メールアドレスが間違っていた等)は「support@tproject.jp」にお問い合わせください。<br/>

                    <hr className="my-3 border-gray-300" />

                    <span className="font-bold block mt-2 mb-2">【応募条件】</span>
                    ・チャンネル登録者数又はそれに準ずるフォロワー数が5万人以上である方。(ただし、Twitchの場合は1万人以上とさせていただきます。)<br/>
                    ・満18歳以上である方。<br/>
                    ・継続して本企画で配信活動等を行っていただける方。
                </p>

            {submitError && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md flex items-start">
                    <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <div>{submitError}</div>
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* 名前（ニックネーム） */}
                <div>
                    <Label htmlFor="name" className="text-base font-medium block mb-1.5">
                        ニックネーム（活動名） <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                            <User className="h-5 w-5" />
                        </div>
                        <Input
                            id="name"
                            {...register('name')}
                            className={`pl-10 ${errors.name ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                            placeholder="あなたの活動名"
                        />
                    </div>
                    {errors.name && (
                        <p className="mt-1.5 text-red-500 text-sm">{errors.name.message}</p>
                    )}
                </div>

                {/* 連絡先情報 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* メールアドレス */}
                    <div>
                        <Label htmlFor="email" className="text-base font-medium block mb-1.5">
                            メールアドレス <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                                <Mail className="h-5 w-5" />
                            </div>
                            <Input
                                id="email"
                                type="email"
                                placeholder="example@tproject.jp"
                                {...register('email')}
                                className={`pl-10 ${errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                            />
                        </div>
                        {errors.email && (
                            <p className="mt-1.5 text-red-500 text-sm">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Discordユーザー名 */}
                    <div>
                        <Label htmlFor="discordUsername" className="text-base font-medium block mb-1.5">
                            Discordユーザー名 <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                                <AtSign className="h-5 w-5" />
                            </div>
                            <Input
                                id="discordUsername"
                                placeholder="tarou123"
                                {...register('discordUsername')}
                                className={`pl-10 ${errors.discordUsername ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                            />
                        </div>
                        {errors.discordUsername && (
                            <p className="mt-1.5 text-red-500 text-sm">{errors.discordUsername.message}</p>
                        )}
                    </div>
                </div>

                {/* チャンネルリンク */}
                <div>
                    <Label htmlFor="channelLink" className="text-base font-medium block mb-1.5">
                        配信/動画投稿チャンネルリンク <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                            <LinkIcon className="h-5 w-5" />
                        </div>
                        <Input
                            id="channelLink"
                            type="url"
                            placeholder="https://www.youtube.com/channel/..."
                            {...register('channelLink')}
                            className={`pl-10 ${errors.channelLink ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                        />
                    </div>
                    <p className="mt-1 text-xs">メインとなるチャンネルのURLを入力してください</p>
                    {errors.channelLink && (
                        <p className="mt-1.5 text-red-500 text-sm">{errors.channelLink.message}</p>
                    )}
                </div>

                {/* X（Twitter）リンク */}
                <div>
                    <Label htmlFor="xLink" className="text-base font-medium block mb-1.5">
                        Xのリンク <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                            <LinkIcon className="h-5 w-5" />
                        </div>
                        <Input
                            id="xLink"
                            type="url"
                            placeholder="https://x.com/yourusername"
                            {...register('xLink')}
                            className={`pl-10 ${errors.xLink ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                        />
                    </div>
                    {errors.xLink && (
                        <p className="mt-1.5 text-red-500 text-sm">{errors.xLink.message}</p>
                    )}
                </div>

                {/* とどめんのXをフォローしているか */}
                <div className="border-t pt-6">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="followsTodomen"
                            checked={watchFollowsTodomen}
                            onCheckedChange={(checked) => setValue('followsTodomen', checked === true, { shouldValidate: true })}
                            className={errors.followsTodomen ? 'border-red-500 data-[state=checked]:bg-primary' : ''}
                        />
                        <Label
                            htmlFor="followsTodomen"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            とどめんのXをフォローしています <span className="text-red-500">*</span>
                        </Label>
                    </div>
                    {errors.followsTodomen && (
                        <p className="mt-1.5 text-red-500 text-sm">{errors.followsTodomen.message}</p>
                    )}
                </div>

                {/* 配信頻度 */}
                <div>
                    <Label htmlFor="streamingFrequency" className="text-base font-medium block mb-1.5">
                        配信頻度（参考程度にしか使用しません）
                    </Label>
                    <select
                        id="streamingFrequency"
                        {...register('streamingFrequency')}
                        className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                        <option value="">選択してください</option>
                        <option value="daily">毎日</option>
                        <option value="weekly">週に数回</option>
                        <option value="biweekly">2週間に1回</option>
                        <option value="monthly">月に1回</option>
                        <option value="irregular">不定期</option>
                    </select>
                    <p className="mt-2 text-xs">
                        ※高頻度での配信が難しくても問題ありません。ご自身のペースで活動していただけます。
                    </p>
                </div>

                {/* 追加情報 */}
                <div>
                    <Label htmlFor="additionalInfo" className="text-base font-medium block mb-1.5">
                        追加情報（任意）
                    </Label>
                    <Textarea
                        id="additionalInfo"
                        placeholder="運営スタッフに伝えたいことがあればこちらに記入してください"
                        {...register('additionalInfo')}
                        className="resize-y min-h-[100px]"
                    />
                </div>

                {/* 同意事項 */}
                <div className="space-y-3 pt-2 border-t mt-6">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="termsAgreed"
                            checked={watchTermsAgreed}
                            onCheckedChange={(checked) => setValue('termsAgreed', checked === true, { shouldValidate: true })}
                            className={errors.termsAgreed ? 'border-red-500 data-[state=checked]:bg-primary' : ''}
                        />
                        <Label
                            htmlFor="termsAgreed"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            <Link href="/terms" className="text-primary underline" target="_blank">
                                利用規約
                            </Link>
                            に同意します<span className="text-red-500 ml-1">*</span>
                        </Label>
                    </div>
                    {errors.termsAgreed && (
                        <p className="mt-1 text-red-500 text-sm">{errors.termsAgreed.message}</p>
                    )}

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="privacyAgreed"
                            checked={watchPrivacyAgreed}
                            onCheckedChange={(checked) => setValue('privacyAgreed', checked === true, { shouldValidate: true })}
                            className={errors.privacyAgreed ? 'border-red-500 data-[state=checked]:bg-primary' : ''}
                        />
                        <Label
                            htmlFor="privacyAgreed"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            <Link href="/privacy" className="text-primary underline" target="_blank">
                                プライバシーポリシー
                            </Link>
                            に同意します<span className="text-red-500 ml-1">*</span>
                        </Label>
                    </div>
                    {errors.privacyAgreed && (
                        <p className="mt-1 text-red-500 text-sm">{errors.privacyAgreed.message}</p>
                    )}
                </div>

                {/* 送信ボタン */}
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-6 mt-8 flex items-center justify-center text-lg"
                >
                    {isSubmitting ? (
                        <>
                            <span className="animate-spin mr-2 h-5 w-5 border-b-2 border-white rounded-full"></span>
                            送信中...
                        </>
                    ) : (
                        <>
                            <Send className="mr-2 h-5 w-5" />
                            応募する
                        </>
                    )}
                </Button>
            </form>
        </div>
    );
}
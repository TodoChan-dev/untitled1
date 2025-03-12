'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Lucide Icons
import {
    Star, ChevronDown, Download, Calendar, Users, Sword, Sparkles, MapPin, Zap
} from 'lucide-react';

// UI Components
import { Button } from '@/components/ui/button';
import ApplicationStats from '@/components/stats/ApplicationStats';

// Assets
import mapImage from "../../public/map.png";

// GSAP ScrollTrigger プラグイン登録
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

/* ----------------------------- */
/*  アニメーション用カスタムコンポーネント  */
/* ----------------------------- */
interface AnimatedSectionProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}

const AnimatedSection = ({ children, delay = 0, className = "" }: AnimatedSectionProps) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

/* ----------------------------- */
/*  カード型コンポーネント         */
/* ----------------------------- */
interface FeatureCardProps {
    icon: React.ElementType;
    title: string;
    description: string;
    delay?: number;
}

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }: FeatureCardProps) => {
    return (
        <motion.div
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300
                 hover:scale-105 hover:bg-gradient-to-br from-white to-primary-50"
        >
            <div className="bg-primary-500/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-4
                      transform hover:rotate-3 transition-transform duration-300">
                <Icon className="h-7 w-7 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800 tracking-tight">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
        </motion.div>
    );
};

/* ----------------------------- */
/*  Home コンポーネント            */
/* ----------------------------- */
export default function Home() {
    const heroRef = useRef(null);
    const scrollIndicatorRef = useRef(null);

    useEffect(() => {
        // スクロールインジケーターのアニメーション
        const scrollIndicator = scrollIndicatorRef.current;
        if (scrollIndicator) {
            gsap.to(scrollIndicator, {
                y: 10,
                opacity: 0.5,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
            });
        }

        // パララックス効果
        const parallaxElements = document.querySelectorAll('.parallax');
        parallaxElements.forEach(element => {
            const depth = (element as HTMLElement).dataset.depth || 0.2;
            gsap.to(element, {
                y: `${-depth * 100}%`,
                ease: "none",
                scrollTrigger: {
                    trigger: element.parentElement,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });
        });

        // セクションフェードインアニメーション
        const sections = document.querySelectorAll('.animate-section');
        sections.forEach(section => {
            gsap.fromTo(
                section,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        });
    }, []);

    return (
        <div className="w-full space-y-8 pt-12">
            {/* ヒーローセクション */}
            <section
                ref={heroRef}
                className="min-h-[90vh] flex flex-col justify-center items-center relative pt-20 overflow-hidden"
            >
                {/* バックグラウンドエフェクト */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-radial from-primary-500/30 via-background/20 to-background"></div>
                    <div className="w-full h-full opacity-40">
                        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-600/30 rounded-full filter blur-3xl"></div>
                        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-accent/20 rounded-full filter blur-3xl"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/20 rounded-full filter blur-3xl"></div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="text-center z-10 px-4 sm:px-6 relative"
                >
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-5xl md:text-7xl font-bold mb-6 text-white"
                    >
                        ステラフィルワールド
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        className="flex justify-center mb-8"
                    >
                        <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-primary-500 to-transparent"></div>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.9 }}
                        className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed text-white"
                    >
                        「シデリオン大陸」を舞台にした
                        <span className="text-primary-300 font-semibold"> オープンワールドMMORPG型 </span>
                        ストリーマーサーバー
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.1 }}
                        className="flex flex-col sm:flex-row justify-center gap-4"
                    >
                        <Link href="/apply">
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-blue-600 to-blue-400 hover:opacity-90 text-white border-none rounded-full px-8 py-6 text-lg shadow-md hover:shadow-lg transition-all duration-300"
                            >
                                <Star className="mr-2 h-5 w-5" />
                                応募する
                            </Button>
                        </Link>
                        <Link href="#overview">
                            <Button
                                variant="outline"
                                size="lg"
                                className="bg-gradient-to-r from-lime-600 to-lime-400 hover:opacity-90 text-white border-none rounded-full px-8 py-6 text-lg shadow-md hover:shadow-lg transition-all duration-300"
                            >
                                <Download className="mr-2 h-5 w-5" />
                                詳細を見る
                            </Button>
                        </Link>
                    </motion.div>

                    {/* 開催日時表示 */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1.3 }}
                        className="mt-10 bg-white/90 backdrop-blur-sm inline-block px-6 py-3 rounded-full"
                    >
                        <div className="flex items-center gap-2 text-slate-950">
                            <Calendar className="h-5 w-5" />
                            <span className="font-medium">開催日: 2025年4月5日</span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* スクロールインジケーター */}
                <motion.div
                    ref={scrollIndicatorRef}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                >
                    <ChevronDown className="h-8 w-8 text-primary-300" />
                </motion.div>
            </section>

            {/* 応募統計コンポーネント */}
            <section className="py-6">
                <div className="card-section p-6">
                    <ApplicationStats />
                </div>
            </section>

            {/* 企画概要セクション */}
            <section id="overview" className="py-12">
                <div className="card-section p-8">
                    <AnimatedSection delay={0.2} className="relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-600">
                                企画概要
                            </h2>
                            <div className="h-1 w-20 bg-gradient-to-r from-primary-500 to-accent mx-auto"></div>
                        </div>
                    </AnimatedSection>

                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <AnimatedSection delay={0.4} className="bg-gray-50 p-8 rounded-xl shadow-sm">
                                <div className="absolute -top-3 -left-3 w-16 h-16 text-primary-600">
                                    <div className="absolute inset-0 bg-primary-500/20 rounded-lg transform rotate-45"></div>
                                </div>
                                <div className="space-y-6 text-gray-700">
                                    <p>
                                        「ステラフィルワールド」は、
                                        <span className="text-primary-600 font-medium">シデリオン大陸</span>
                                        と呼ばれる独自の世界観を持つマップを舞台としたオープンワールドMMORPG型ストリーマーサーバーです。最大200名まで参加できます。
                                    </p>
                                    <p>
                                        5つの独立した国家と2つの特別地域で構成される大陸で自分の望む好きな生き方ができます。情勢や国によって価値が変動する経済概念や、プレイヤークラスのような要素があり、ベースとなる戦闘スタイルをいくつか選ぶことができます。
                                    </p>
                                    <p>
                                        生成AIで制御されたクエストシステムがあり、無限にクエストが無くなりません。ランダムで適正属性が決まるなど、様々な要素があります。
                                    </p>
                                </div>
                            </AnimatedSection>

                            <AnimatedSection delay={0.6}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <FeatureCard
                                        icon={Users}
                                        title="最大200名"
                                        description="VTuberや配信者などのクリエイターが集う大規模サーバー"
                                        delay={0.1}
                                    />
                                    <FeatureCard
                                        icon={MapPin}
                                        title="5つの国家"
                                        description="それぞれ独自の文化や特色を持つ5つの国と2つの特別地域"
                                        delay={0.2}
                                    />
                                    <FeatureCard
                                        icon={Sword}
                                        title="戦闘システム"
                                        description="プレイヤークラスを選んで独自の戦闘スタイルを構築"
                                        delay={0.3}
                                    />
                                    <FeatureCard
                                        icon={Zap}
                                        title="AI生成クエスト"
                                        description="生成AIによる無限のクエストと冒険"
                                        delay={0.4}
                                    />
                                </div>
                            </AnimatedSection>
                        </div>
                    </div>
                </div>
            </section>

            {/* 楽しみ方セクション */}
            <section className="py-12">
                <div className="card-section p-8">
                    <AnimatedSection delay={0.2}>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-600">
                                楽しみ方
                            </h2>
                            <div className="h-1 w-20 bg-gradient-to-r from-primary-500 to-accent mx-auto"></div>
                        </div>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Star,
                                title: "ストーリー重視型",
                                description: "メインストーリーに沿って災害に立ち向かう冒険を楽しむことができます。",
                                delay: 0.3,
                            },
                            {
                                icon: Sword,
                                title: "育成重視型",
                                description: "ダンジョン攻略やキャラクター強化を目指す冒険を楽しむことができます。",
                                delay: 0.4,
                            },
                            {
                                icon: Users,
                                title: "生活重視型",
                                description: "建築や交流を中心とした自由な生活を楽しむことができます。",
                                delay: 0.5,
                            },
                        ].map((item) => (
                            <AnimatedSection key={item.title} delay={item.delay}>
                                <div className="bg-white p-6 h-full flex flex-col rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                                    <div className="mb-4 flex items-center">
                                        <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center">
                                            <item.icon className="h-6 w-6 text-primary-600" />
                                        </div>
                                        <h3 className="text-xl font-semibold ml-3 text-gray-800">
                                            {item.title}
                                        </h3>
                                    </div>
                                    <p className="text-gray-600 flex-grow">{item.description}</p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* シデリオン大陸セクション */}
            <section className="py-12">
                <div className="card-section p-8">
                    <AnimatedSection delay={0.2}>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-600">
                                シデリオン大陸
                            </h2>
                            <div className="h-1 w-20 bg-gradient-to-r from-primary-500 to-accent mx-auto"></div>
                        </div>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <AnimatedSection delay={0.4}>
                            <div className="bg-gray-50 p-8 rounded-xl shadow-sm border-primary-500/20 relative overflow-hidden">
                                {/* 装飾的な星のエフェクト */}
                                <div className="absolute -top-10 -right-10 w-40 h-40 blur-xl rounded-full bg-primary-500/10"></div>
                                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-primary-500/10 to-transparent"></div>
                                <div className="relative">
                                    <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                                        星型の大陸
                                    </h3>
                                    <div className="space-y-4 text-gray-700">
                                        <p className="text-lg">
                                            星のような形をした大陸です。まだ、未発見の島があるとか…
                                        </p>
                                        <p>
                                            現在は5つの国が存在しており、それぞれ独自の文化や特色を持っています。
                                        </p>
                                        <p>
                                            プレイヤーは自分の好きな国に所属し、その国の一員として活動することができます。または、どの国にも属さない自由な冒険者として活動することも可能です。
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={0.6}>
                            <div className="bg-white p-1 overflow-hidden rounded-xl shadow-sm">
                                <div className="w-full h-64 md:h-80 lg:h-96 bg-gradient-to-br from-primary-900 to-primary-950 flex items-center justify-center relative">
                                    {/* 星型の大陸の図式表現 */}
                                    <div className="relative w-3/4 h-3/4">
                                        <Image
                                            src={mapImage}
                                            alt="シデリオン大陸の地図"
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* 進化する世界セクション */}
            <section className="py-12">
                <div className="card-section p-8">
                    <AnimatedSection delay={0.2}>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-600">
                                進化する世界
                            </h2>
                            <div className="h-1 w-20 bg-gradient-to-r from-primary-500 to-accent mx-auto"></div>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection delay={0.4}>
                        <div className="bg-gray-50 p-8 relative overflow-hidden rounded-xl shadow-sm">
                            {/* 装飾エフェクト */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-primary-500/10 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-radial from-accent/10 to-transparent"></div>
                            <div className="relative text-center max-w-3xl mx-auto">
                                <p className="text-xl text-gray-700 leading-relaxed">
                                    進化し続ける世界。3日ごとのアップデートが、冒険に新たな風を吹き込む。今日の発見が、明日には伝説となる。
                                </p>
                                <div className="mt-8 flex justify-center">
                                    <Link href="/apply">
                                        <Button
                                            size="lg"
                                            className="bg-gradient-to-r from-blue-600 to-blue-400 hover:opacity-90 text-white border-none rounded-full px-8 py-6 text-lg shadow-md hover:shadow-lg transition-all duration-300"
                                        >
                                            <Star className="mr-2 h-5 w-5" />
                                            応募する
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* 応募ボタンセクション */}
            <section className="py-12">
                <div className="card-section p-8 bg-gradient-to-br from-white to-gray-50">
                    <AnimatedSection delay={0.2} className="text-center">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary-700">
                            2025年4月5日土曜日から開催
                        </h2>
                        <p className="text-xl mb-8 text-gray-700">
                            ぜひあなたも参加してみませんか？
                        </p>
                        <Link href="/apply">
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-blue-600 to-blue-400 hover:opacity-90 text-white border-none rounded-full px-8 py-6 text-lg shadow-md hover:shadow-lg transition-all duration-300"
                            >
                                <Star className="mr-2 h-5 w-5" />
                                応募フォームへ
                            </Button>
                        </Link>
                    </AnimatedSection>
                </div>
            </section>
        </div>
    );
}

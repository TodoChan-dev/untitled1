'use client';

import Link from 'next/link';
import { Star, ChevronDown, Download, Calendar, Users, Sword, Sparkles, MapPin, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// GSAPスクロールトリガーの登録
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// アニメーション用のカスタムコンポーネント
const AnimatedSection = ({ children, delay = 0, className = "" }: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
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

// カード型コンポーネント
const FeatureCard = ({ icon: Icon, title, description, delay = 0 }: {
  icon: React.ElementType;
  title: string;
  description: string;
  delay?: number;
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
      <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay }}
          className="glass-card p-6 hover:shadow-glow-md"
      >
        <div className="bg-primary-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
          <Icon className="h-6 w-6 text-primary-300" />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-glow">{title}</h3>
        <p className="text-foreground/80">{description}</p>
      </motion.div>
  );
};

export default function Home() {
  const heroRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  // GSAP アニメーションのセットアップ
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
        ease: "power1.inOut"
      });
    }

    // 視差効果
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
          scrub: true
        }
      });
    });

    // 各セクションのフェードイン
    const sections = document.querySelectorAll('.animate-section');
    sections.forEach(section => {
      gsap.fromTo(
          section,
          {
            opacity: 0,
            y: 50
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
      );
    });
  }, []);

  return (
      <div className="w-full">
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
                className="text-5xl md:text-7xl font-bold mb-6 text-glow bg-clip-text text-transparent bg-gradient-to-br from-white via-primary-200 to-primary-400"
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
                className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed text-foreground/90"
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
                    className="bg-gradient-to-r from-primary-600 to-primary-400 hover:opacity-90 text-white border-none rounded-full px-8 py-6 text-lg shadow-glow-sm hover:shadow-glow-md transition-all duration-300"
                >
                  <Star className="mr-2 h-5 w-5" />
                  応募する
                </Button>
              </Link>
              <Link href="#overview">
                <Button
                    variant="outline"
                    size="lg"
                    className="glass border-white/10 hover:border-white/20 text-foreground rounded-full px-8 py-6 text-lg"
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
                className="mt-10 glass inline-block px-6 py-3 rounded-full"
            >
              <div className="flex items-center gap-2 text-primary-300">
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

        {/* 企画概要セクション */}
        <section id="overview" className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-primary-950/0 via-primary-900/5 to-primary-950/0 z-0"></div>
          <AnimatedSection delay={0.2} className="relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-glow bg-clip-text text-transparent bg-gradient-to-r from-primary-100 to-primary-400">
                企画概要
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-primary-500 to-accent mx-auto"></div>
            </div>
          </AnimatedSection>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <AnimatedSection delay={0.4} className="glass-card p-8 relative">
                <div className="absolute -top-3 -left-3 w-16 h-16 text-primary-300">
                  <div className="absolute inset-0 bg-primary-500/20 rounded-lg transform rotate-45"></div>
                  <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8" />
                </div>
                <div className="space-y-6 text-foreground/90">
                  <p>
                    「ステラフィルワールド」は、「<span className="text-primary-300 font-medium">シデリオン大陸</span>」と呼ばれる独自の世界観を持つマップを舞台としたオープンワールドMMORPG型ストリーマーサーバーです。最大200名まで参加できます。
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
        </section>

        {/* 楽しみ方セクション */}
        <section className="py-20 relative animate-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <AnimatedSection delay={0.2}>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-glow bg-clip-text text-transparent bg-gradient-to-r from-primary-100 to-primary-400">
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
                  delay: 0.3
                },
                {
                  icon: Sword,
                  title: "育成重視型",
                  description: "ダンジョン攻略やキャラクター強化を目指す冒険を楽しむことができます。",
                  delay: 0.4
                },
                {
                  icon: Users,
                  title: "生活重視型",
                  description: "建築や交流を中心とした自由な生活を楽しむことができます。",
                  delay: 0.5
                }
              ].map((item, index) => (
                  <AnimatedSection key={item.title} delay={item.delay}>
                    <div className="glass-card p-6 h-full flex flex-col">
                      <div className="mb-4 flex items-center">
                        <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center">
                          <item.icon className="h-6 w-6 text-primary-300" />
                        </div>
                        <h3 className="text-xl font-semibold ml-3 text-glow">{item.title}</h3>
                      </div>
                      <p className="text-foreground/80 flex-grow">{item.description}</p>

                      <div className="mt-6 pt-4 border-t border-white/5">
                        <div className="text-primary-300 text-sm font-medium flex items-center">
                          <span>詳しく見る</span>
                          <ChevronDown className="h-4 w-4 ml-1" />
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* シデリオン大陸セクション */}
        <section className="py-20 relative animate-section">
          <div className="absolute inset-0 bg-gradient-to-b from-primary-950/0 via-primary-900/5 to-primary-950/0 z-0"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <AnimatedSection delay={0.2}>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-glow bg-clip-text text-transparent bg-gradient-to-r from-primary-100 to-primary-400">
                  シデリオン大陸
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-primary-500 to-accent mx-auto"></div>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <AnimatedSection delay={0.4}>
                <div className="glass-card p-8 border-primary-500/20 relative overflow-hidden">
                  {/* 装飾的な星のエフェクト */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 blur-xl rounded-full bg-primary-500/10"></div>
                  <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-primary-500/20 to-transparent"></div>

                  <div className="relative">
                    <h3 className="text-2xl font-semibold mb-4 text-glow">星型の大陸</h3>
                    <div className="space-y-4">
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
                <div className="glass-card p-1 overflow-hidden rounded-xl">
                  <div className="w-full h-64 md:h-80 lg:h-96 bg-gradient-to-br from-primary-900 to-primary-950 flex items-center justify-center relative">
                    {/* 星型の大陸の図式表現 */}
                    <div className="relative w-3/4 h-3/4">
                      <div className="absolute inset-0 star-map opacity-70">
                        <div className="star-shape absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
                          {/* 星型のパターン */}
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-300 rounded-full"></div>
                          <div className="absolute top-1/4 right-1/4 transform w-4 h-4 bg-primary-400 rounded-full"></div>
                          <div className="absolute bottom-1/4 right-1/4 transform w-4 h-4 bg-accent rounded-full"></div>
                          <div className="absolute bottom-1/4 left-1/4 transform w-4 h-4 bg-secondary rounded-full"></div>
                          <div className="absolute top-1/4 left-1/4 transform w-4 h-4 bg-primary-500 rounded-full"></div>

                          {/* 接続ライン */}
                          <div className="absolute inset-0 w-full h-full">
                            <svg width="100%" height="100%" viewBox="0 0 100 100">
                              <path d="M50,0 L75,75 L0,30 L100,30 L25,75 Z" fill="none" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="0.5"></path>
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* 光る粒子エフェクト */}
                      {Array.from({ length: 20 }).map((_, i) => (
                          <div
                              key={i}
                              className="absolute w-1 h-1 bg-primary-300 rounded-full animate-pulse-glow"
                              style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 3}s`
                              }}
                          ></div>
                      ))}

                      {/* 中央の明るい星 */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full animate-pulse-glow"></div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* アップデート要素セクション */}
        <section className="py-20 relative animate-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <AnimatedSection delay={0.2}>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-glow bg-clip-text text-transparent bg-gradient-to-r from-primary-100 to-primary-400">
                  進化する世界
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-primary-500 to-accent mx-auto"></div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div className="glass-card p-8 relative overflow-hidden">
                {/* 装飾エフェクト */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-primary-500/10 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-radial from-accent/10 to-transparent"></div>

                <div className="relative text-center max-w-3xl mx-auto">
                  <p className="text-xl text-glow leading-relaxed">
                    進化し続ける世界。3日ごとのアップデートが、冒険に新たな風を吹き込む。今日の発見が、明日には伝説となる。
                  </p>
                  <div className="mt-8 flex justify-center">
                    <Link href="/apply">
                      <Button
                          size="lg"
                          className="bg-gradient-to-r from-primary-600 to-primary-400 hover:opacity-90 text-white border-none rounded-full px-8 py-6 text-lg shadow-glow-sm hover:shadow-glow-md transition-all duration-300"
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
        <section className="py-16 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-primary-950/0 via-primary-600/5 to-primary-950/0 z-0"></div>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <AnimatedSection delay={0.2} className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-glow">
                2025年4月5日土曜日から開催
              </h2>
              <p className="text-xl mb-8 text-foreground/90">
                ぜひあなたも参加してみませんか？
              </p>
              <Link href="/apply">
                <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary-600 to-primary-400 hover:opacity-90 text-white border-none rounded-full px-10 py-7 text-lg shadow-glow-sm hover:shadow-glow-md transition-all duration-300"
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
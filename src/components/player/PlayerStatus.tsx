'use client';

// src/components/player/PlayerStatus.tsx
import { motion } from 'framer-motion';
import { Crown, Heart, Zap, Shield, Sword, Bolt, Brain, SparklesIcon, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';

// プレイヤーデータの型定義
type PlayerData = {
    playerName: string;
    level: number;
    exp: number;
    hp: number;
    mp: number;
    str: number;
    dex: number;
    int_: number;
    vit: number;
    agi: number;
    mnd: number;
};

type PlayerStatusProps = {
    playerData: PlayerData;
    onReset: () => void;
};

// 属性バーコンポーネント
function StatBar({ name, value, color, icon, max = 100 }: { name: string; value: number; color: string; icon: React.ReactNode; max?: number }) {
    const percentage = Math.min((value / max) * 100, 100);

    return (
        <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                    {icon}
                    <span className="ml-2 font-medium text-gray-700">{name}</span>
                </div>
                <span className="text-gray-600">{value}/{max}</span>
            </div>
            <div className="relative h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                    className={`absolute top-0 left-0 h-full ${color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                />
            </div>
        </div>
    );
}

export default function PlayerStatus({ playerData, onReset }: PlayerStatusProps) {
    const {
        playerName,
        level,
        exp,
        hp,
        mp,
        str,
        dex,
        int_,
        vit,
        agi,
        mnd
    } = playerData;

    // アニメーションバリアント
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    return (
        <motion.div
            className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
            variants={container}
            initial="hidden"
            animate="show"
        >
            {/* ヘッダー */}
            <div className="bg-gradient-to-r  from-lime-500 via-green-500 to-emerald-500 p-6 text-white">
                <div className="flex justify-between">
                    <div className="flex items-center">
                        <div className="relative w-16 h-16 mr-4 rounded-lg overflow-hidden border-2 border-white/30 shadow-lg">
                            <Image
                                src={`https://mc-heads.net/avatar/${playerName}/100`}
                                alt={`${playerName}のアバター`}
                                width={100}
                                height={100}
                                unoptimized
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">{playerName}</h2>
                            <div className="flex items-center mt-2">
                                <Crown className="h-5 w-5 text-yellow-300 mr-2" />
                                <span className="text-lg font-semibold">レベル {level}</span>
                            </div>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onReset}
                        className="text-white hover:bg-white/20 h-10"
                    >
                        <RotateCcw className="h-4 w-4 mr-1" />
                        リセット
                    </Button>
                </div>
            </div>

            {/* ステータス情報 */}
            <div className="p-6">
                <motion.div variants={item} className="mb-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <SparklesIcon className="h-5 w-5 text-blue-500 mr-2" />
                        基本ステータス
                    </h3>
                    <div className="space-y-4">
                        <StatBar
                            name="HP"
                            value={hp}
                            color="bg-red-500"
                            icon={<Heart className="h-4 w-4 text-red-500" />}
                            max={hp}
                        />
                        <StatBar
                            name="MP"
                            value={mp}
                            color="bg-blue-500"
                            icon={<Zap className="h-4 w-4 text-blue-500" />}
                            max={mp}
                        />
                    </div>
                </motion.div>

                <motion.div variants={item}>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <Sword className="h-5 w-5 text-blue-500 mr-2" />
                        能力値
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <StatBar
                                name="筋力 (STR)"
                                value={str}
                                color="bg-red-400"
                                icon={<Sword className="h-4 w-4 text-red-400" />}
                            />
                            <StatBar
                                name="器用さ (DEX)"
                                value={dex}
                                color="bg-green-400"
                                icon={<Bolt className="h-4 w-4 text-green-400" />}
                            />
                            <StatBar
                                name="知力 (INT)"
                                value={int_}
                                color="bg-purple-400"
                                icon={<Brain className="h-4 w-4 text-purple-400" />}
                            />
                        </div>
                        <div className="space-y-4">
                            <StatBar
                                name="体力 (VIT)"
                                value={vit}
                                color="bg-orange-400"
                                icon={<Shield className="h-4 w-4 text-orange-400" />}
                            />
                            <StatBar
                                name="素早さ (AGI)"
                                value={agi}
                                color="bg-yellow-400"
                                icon={<Bolt className="h-4 w-4 text-yellow-400" />}
                            />
                            <StatBar
                                name="精神力 (MND)"
                                value={mnd}
                                color="bg-blue-400"
                                icon={<Zap className="h-4 w-4 text-blue-400" />}
                            />
                        </div>
                    </div>
                </motion.div>

                {/* 経験値バー */}
                <motion.div
                    variants={item}
                    className="mt-6 border-t pt-6"
                >
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">経験値</span>
                        <span className="text-sm text-gray-500">{exp}</span>
                    </div>
                    <Progress value={exp} className="h-2" />
                </motion.div>
            </div>
        </motion.div>
    );
}
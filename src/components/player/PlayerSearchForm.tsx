'use client';

// src/components/player/PlayerSearchForm.tsx
import { useState } from 'react';
import { Search, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PlayerStatus from './PlayerStatus';
import { motion, AnimatePresence } from 'framer-motion';

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

export default function PlayerSearchForm() {
    const [playerName, setPlayerName] = useState('');
    const [playerData, setPlayerData] = useState<PlayerData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!playerName.trim()) {
            setError('プレイヤー名を入力してください');
            return;
        }

        setIsLoading(true);
        setError('');
        setPlayerData(null);
        setHasSearched(true);

        try {
            // 内部APIルートを使用してプレイヤーデータを取得
            const response = await fetch(`/api/player/status?name=${encodeURIComponent(playerName)}`);

            if (!response.ok) {
                const errorData = await response.json();
                console.error('API error:', errorData);
                throw new Error(errorData.message || 'プレイヤーデータの取得に失敗しました');
            }

            const data = await response.json();
            setPlayerData(data);
        } catch (err) {
            console.error('Error fetching player data:', err);
            setError('プレイヤーデータの取得中にエラーが発生しました。プレイヤー名を確認するか、後でもう一度お試しください。');
        } finally {
            setIsLoading(false);
        }
    };

    const resetSearch = () => {
        setPlayerName('');
        setPlayerData(null);
        setError('');
        setHasSearched(false);
    };

    return (
        <div>
            <form onSubmit={handleSearch} className="space-y-4">
                <div>
                    <Label htmlFor="playerName" className="text-base font-medium block mb-1.5">
                        プレイヤー名
                    </Label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                            <Search className="h-5 w-5" />
                        </div>
                        <Input
                            id="playerName"
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            placeholder="例: TDMN_03"
                            className="pl-10"
                        />
                    </div>
                </div>

                <div className="flex justify-center">
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full sm:w-auto min-w-[200px]"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                検索中...
                            </>
                        ) : (
                            <>
                                <Search className="mr-2 h-4 w-4" />
                                検索する
                            </>
                        )}
                    </Button>
                </div>
            </form>

            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md flex items-start"
                    >
                        <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                        <p>{error}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {playerData && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mt-10"
                    >
                        <PlayerStatus playerData={playerData} onReset={resetSearch} />
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {hasSearched && !playerData && !error && !isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="mt-10 text-center py-8 bg-gray-50 rounded-lg"
                    >
                        <p className="text-gray-500">プレイヤーが見つかりませんでした。</p>
                        <p className="text-gray-500 text-sm mt-2">プレイヤー名を確認して再度お試しください。</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
// src/components/auction/BidForm.tsx
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertCircle, Loader2 } from 'lucide-react';
import { AuctionItem } from '@/types/auction';
import { placeBid } from '@/lib/auction-api';
import { formatPrice } from '@/lib/utils';

interface BidFormProps {
    item: AuctionItem;
}

export default function BidForm({ item }: BidFormProps) {
    const [bidAmount, setBidAmount] = useState<number>(item.currentPrice + 1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (bidAmount <= item.currentPrice) {
            setError('入札額は現在の価格より高くする必要があります');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const result = await placeBid(item.id, bidAmount);
            setSuccess(result.message || '入札が成功しました！');
            // Optionally reload the page or refetch the item data
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (err) {
            setError(err instanceof Error ? err.message : '入札に失敗しました');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="bidAmount" className="block text-sm font-medium text-gray-700 mb-1">
                    入札額（現在価格: {formatPrice(item.currentPrice)}リア）
                </label>
                <div className="flex">
                    <Input
                        id="bidAmount"
                        type="number"
                        min={item.currentPrice + 1}
                        value={bidAmount}
                        onChange={(e) => setBidAmount(parseInt(e.target.value))}
                        className="rounded-r-none"
                        required
                    />
                    <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500">
            リア
          </span>
                </div>
            </div>

            {error && (
                <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md flex items-start">
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                    <p>{error}</p>
                </div>
            )}

            {success && (
                <div className="p-3 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-md">
                    <p>{success}</p>
                </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        処理中...
                    </>
                ) : (
                    '入札する'
                )}
            </Button>
        </form>
    );
}
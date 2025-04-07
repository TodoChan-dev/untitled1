// @ts-nocheck

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, Database, Package } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import ItemList from '@/components/admin/ItemList';
import ItemDetail from '@/components/admin/ItemDetail';
import { fetchItems } from '@/lib/item-api';

export default function ItemsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedItemId, setSelectedItemId] = useState(null);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/admin/login');
        }
    }, [status, router]);

    useEffect(() => {
        if (status === 'authenticated') {
            loadItems();
        }
    }, [status]);

    const loadItems = async () => {
        try {
            setLoading(true);
            const data = await fetchItems();
            setItems(data);
            setError('');
        } catch (error) {
            console.error('Failed to load items:', error);
            setError('アイテムデータの読み込みに失敗しました。APIサーバーが起動していることを確認してください。');
        } finally {
            setLoading(false);
        }
    };

    const handleItemSelect = (itemId) => {
        setSelectedItemId(itemId);
    };

    const handleRefresh = () => {
        loadItems();
    };

    if (status === 'loading') {
        return (
            <AdminLayout>
                <div className="container mx-auto py-8 px-4">
                    <Skeleton className="h-10 w-64 mb-6" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Skeleton className="h-[700px]" />
                        <Skeleton className="h-[700px]" />
                    </div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="container mx-auto py-8 px-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold flex items-center">
                        <Package className="mr-2 h-6 w-6" />
                        アイテム管理
                    </h1>
                    <button
                        onClick={handleRefresh}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                        disabled={loading}
                    >
                        {loading ? '読み込み中...' : '更新'}
                    </button>
                </div>

                {error && (
                    <Alert variant="destructive" className="mb-6">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>エラー</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Skeleton className="h-[700px]" />
                        <Skeleton className="h-[700px]" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center">
                                    <Database className="mr-2 h-5 w-5" />
                                    アイテム一覧
                                    <span className="ml-2 text-sm font-normal text-muted-foreground">
                                        ({items.length}件)
                                    </span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ItemList
                                    items={items}
                                    onItemSelect={handleItemSelect}
                                    selectedItemId={selectedItemId}
                                />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle>アイテム詳細</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {selectedItemId ? (
                                    <ItemDetail itemId={selectedItemId} />
                                ) : (
                                    <div className="text-center p-10 text-gray-500">
                                        <Package className="h-16 w-16 mx-auto mb-4 opacity-20" />
                                        <p>左側のリストからアイテムを選択してください</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
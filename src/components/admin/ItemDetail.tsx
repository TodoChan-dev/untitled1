// src/components/admin/ItemDetail.tsx
'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { fetchItemDetail } from '@/lib/item-api';
import {
    Book,
    Sparkles,
    Shield,
    Tag,
    Flag,
    Hash,
    AlertCircle,
    Check,
    MessageSquare,
    Unlink,
    Key
} from 'lucide-react';
import JsonViewer from "@/components/admin/JsonViewer";


interface Enchantment {
    name: string;
    level: number;
}

interface Attribute {
    name: string;
    slot: string;
    amount: number;
    operation: string;
    uuid: string;
}

interface ItemDetail {
    id: string;
    type: string;
    displayName: string;
    amount: number;
    lore: string[];
    enchantments: Enchantment[];
    attributes: Attribute[];
    customModelData: number;
    flags: string[];
    unbreakable: boolean;
    persistentData: {
        customItemId?: string;
        [key: string]: any;
    };
}

interface ItemDetailProps {
    itemId: string;
}

export default function ItemDetail({ itemId }: ItemDetailProps) {
    const [item, setItem] = useState<ItemDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function loadItemDetail() {
            setLoading(true);
            setError('');
            try {
                const data = await fetchItemDetail(itemId);
                setItem(data);
            } catch (err) {
                setError('アイテム詳細の読み込みに失敗しました');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        if (itemId) {
            loadItemDetail();
        }
    }, [itemId]);

    if (loading) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-48 w-full" />
            </div>
        );
    }

    if (error || !item) {
        return (
            <div className="text-center p-10 text-red-500">
                <AlertCircle className="h-10 w-10 mx-auto mb-2" />
                <p>{error || 'アイテムが見つかりません'}</p>
            </div>
        );
    }

    // 属性の操作タイプ名を日本語化
    const getOperationName = (operation: string) => {
        switch (operation) {
            case 'ADD_NUMBER': return '数値追加';
            case 'ADD_SCALAR': return '乗算（加算後）';
            case 'MULTIPLY_SCALAR_1': return '乗算（元の値）';
            default: return operation;
        }
    };

    // エンチャント名を日本語化
    const getEnchantmentName = (enchant: string) => {
        const enchantMap: {[key: string]: string} = {
            protection: 'ダメージ軽減',
            fire_protection: '火災保護',
            feather_falling: '落下耐性',
            blast_protection: '爆発耐性',
            projectile_protection: '飛び道具耐性',
            respiration: '水中呼吸',
            aqua_affinity: '水中採掘',
            thorns: '棘の鎧',
            depth_strider: '水中歩行',
            frost_walker: '氷渡り',
            binding_curse: '束縛の呪い',
            sharpness: 'ダメージ増加',
            smite: 'アンデッド特効',
            bane_of_arthropods: '虫特効',
            knockback: 'ノックバック',
            fire_aspect: '火属性',
            looting: 'ドロップ増加',
            sweeping: '掃討の刃',
            efficiency: '効率強化',
            silk_touch: 'シルクタッチ',
            unbreaking: '耐久力',
            fortune: '幸運',
            power: '射撃ダメージ増加',
            punch: 'パンチ',
            flame: '火矢',
            infinity: '無限',
            luck_of_the_sea: '宝釣り',
            lure: '入れ食い',
            loyalty: '忠誠',
            impaling: '水生特効',
            riptide: '激流',
            channeling: '召雷',
            multishot: '拡散',
            quick_charge: '高速装填',
            piercing: '貫通',
            mending: '修繕',
            vanishing_curse: '消滅の呪い',
            soul_speed: '魂の速さ',
            swift_sneak: 'スニーク速度上昇'
        };

        return enchantMap[enchant] || enchant;
    };

    return (
        <div className="space-y-4">
            <div className="border rounded-lg p-4 bg-muted/30">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-primary">
                        {item.displayName}
                    </h3>
                    <Badge>{item.type}</Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                    ID: {itemId}
                </div>
            </div>

            <Tabs defaultValue="basic">
                <TabsList className="w-full">
                    <TabsTrigger value="basic" className="flex-1">
                        <Tag className="h-4 w-4 mr-1" />
                        基本情報
                    </TabsTrigger>
                    <TabsTrigger value="lore" className="flex-1">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        説明文
                    </TabsTrigger>
                    <TabsTrigger value="enchants" className="flex-1">
                        <Sparkles className="h-4 w-4 mr-1" />
                        エンチャント
                    </TabsTrigger>
                    <TabsTrigger value="attributes" className="flex-1">
                        <Shield className="h-4 w-4 mr-1" />
                        属性
                    </TabsTrigger>
                    <TabsTrigger value="json" className="flex-1">
                        <Book className="h-4 w-4 mr-1" />
                        JSON
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="pt-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="border rounded-md p-3">
                            <div className="text-sm font-medium text-muted-foreground mb-1">
                                アイテムタイプ
                            </div>
                            <div>{item.type}</div>
                        </div>
                        <div className="border rounded-md p-3">
                            <div className="text-sm font-medium text-muted-foreground mb-1">
                                個数
                            </div>
                            <div>{item.amount}</div>
                        </div>
                        <div className="border rounded-md p-3">
                            <div className="text-sm font-medium text-muted-foreground mb-1">
                                カスタムモデルデータ
                            </div>
                            <div className="flex items-center">
                                <Hash className="h-4 w-4 mr-1" />
                                {item.customModelData}
                            </div>
                        </div>
                        <div className="border rounded-md p-3">
                            <div className="text-sm font-medium text-muted-foreground mb-1">
                                カスタムアイテムID
                            </div>
                            <div className="flex items-center">
                                <Key className="h-4 w-4 mr-1" />
                                {item.persistentData?.customItemId || "なし"}
                            </div>
                        </div>
                        <div className="border rounded-md p-3">
                            <div className="text-sm font-medium text-muted-foreground mb-1">
                                壊れない
                            </div>
                            <div className="flex items-center">
                                {item.unbreakable ?
                                    <><Check className="h-4 w-4 mr-1 text-green-500" /> はい</> :
                                    <><Unlink className="h-4 w-4 mr-1 text-red-500" /> いいえ</>
                                }
                            </div>
                        </div>
                        <div className="border rounded-md p-3">
                            <div className="text-sm font-medium text-muted-foreground mb-1">
                                フラグ
                            </div>
                            <div className="flex flex-wrap gap-1">
                                {item.flags.length > 0 ? (
                                    item.flags.map(flag => (
                                        <Badge key={flag} variant="secondary" className="text-xs">
                                            {flag}
                                        </Badge>
                                    ))
                                ) : (
                                    <span className="text-muted-foreground text-sm">なし</span>
                                )}
                            </div>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="lore" className="pt-4">
                    {item.lore && item.lore.length > 0 ? (
                        <div className="border rounded-md p-4 bg-muted/30 max-h-[400px] overflow-y-auto">
                            {item.lore.map((line, index) => (
                                <div key={index} className="mb-1 whitespace-pre-wrap">{line}</div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center p-4 text-muted-foreground">
                            説明文はありません
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="enchants" className="pt-4">
                    <ScrollArea className="max-h-[400px]">
                        {item.enchantments && item.enchantments.length > 0 ? (
                            <div className="space-y-2">
                                {item.enchantments.map((enchant, index) => (
                                    <div key={index} className="border rounded-md p-3 flex justify-between items-center">
                                        <div className="flex items-center">
                                            <Sparkles className="h-4 w-4 mr-2 text-purple-500" />
                                            <span>{getEnchantmentName(enchant.name)}</span>
                                        </div>
                                        <Badge className="bg-purple-500">レベル {enchant.level}</Badge>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center p-4 text-muted-foreground">
                                エンチャントはありません
                            </div>
                        )}
                    </ScrollArea>
                </TabsContent>

                <TabsContent value="attributes" className="pt-4">
                    <ScrollArea className="max-h-[400px]">
                        {item.attributes && item.attributes.length > 0 ? (
                            <div className="space-y-2">
                                {item.attributes.map((attr, index) => (
                                    <div key={index} className="border rounded-md p-3">
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="font-medium">{attr.name}</div>
                                            <Badge variant="outline">{attr.slot}</Badge>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">{getOperationName(attr.operation)}</span>
                                            <span className="font-mono">{attr.amount.toFixed(2)}</span>
                                        </div>
                                        <div className="mt-1 text-xs text-muted-foreground truncate">
                                            UUID: {attr.uuid}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center p-4 text-muted-foreground">
                                属性はありません
                            </div>
                        )}
                    </ScrollArea>
                </TabsContent>

                <TabsContent value="json" className="pt-4">
                    <JsonViewer data={item} expandLevel={2} title={`アイテムID: ${itemId}`} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
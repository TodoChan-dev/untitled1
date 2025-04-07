// src/components/admin/ItemList.tsx
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Item {
    id: string;
    type: string;
    displayName: string;
    amount: number;
    customModelData: number;
}

interface ItemListProps {
    items: Item[];
    selectedItemId: string | null;
    onItemSelect: (itemId: string) => void;
}

export default function ItemList({ items, selectedItemId, onItemSelect }: ItemListProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredItems = items.filter(item =>
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-4">
            <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                    placeholder="アイテムを検索..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <ScrollArea className="h-[600px] pr-4">
                {filteredItems.length > 0 ? (
                    <div className="space-y-2">
                        {filteredItems.map((item) => (
                            <div
                                key={item.id}
                                className={`p-3 rounded-md cursor-pointer transition-colors border ${
                                    selectedItemId === item.id
                                        ? 'bg-primary text-primary-foreground border-primary'
                                        : 'bg-card hover:bg-muted border-border'
                                }`}
                                onClick={() => onItemSelect(item.id)}
                            >
                                <div className="font-medium mb-1">{item.displayName}</div>
                                <div className="flex flex-wrap gap-2 items-center">
                                    <Badge variant="outline" className="text-xs py-0">{item.type}</Badge>
                                    {item.customModelData > 0 && (
                                        <Badge variant="secondary" className="text-xs py-0">CMD: {item.customModelData}</Badge>
                                    )}
                                </div>
                                <div className="text-xs mt-1 text-muted-foreground truncate">
                                    ID: {item.id}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center p-4 text-gray-500">
                        アイテムが見つかりません
                    </div>
                )}
            </ScrollArea>
        </div>
    );
}
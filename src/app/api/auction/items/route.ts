// src/app/api/auction/items/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Placeholder for actual database queries - replace with your Minecraft server connection
const getMockAuctionItems = () => {
    return [
        {
            id: 1,
            itemName: "ダイヤモンドの剣",
            itemKey: "diamond_sword",
            description: "鋭い刃を持つダイヤモンドの剣です。耐久性に優れています。",
            sellerName: "Player123",
            startPrice: 1000,
            currentPrice: 1500,
            highestBidderName: "Bidder456",
            startTime: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
            endTime: new Date(Date.now() + 86400000).toISOString(), // 1 day from now
        },
        {
            id: 2,
            itemName: "エンチャントされた金のリンゴ",
            itemKey: "golden_apple",
            description: "強力な効果を持つ特別なリンゴです。",
            sellerName: "Seller789",
            startPrice: 5000,
            currentPrice: 5000,
            highestBidderName: "",
            startTime: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
            endTime: new Date(Date.now() + 172800000).toISOString(), // 2 days from now
        },
        {
            id: 3,
            itemName: "ネザライトの斧",
            itemKey: "netherite_axe",
            description: "最高級の素材で作られた強力な斧です。",
            sellerName: "Miner42",
            startPrice: 8000,
            currentPrice: 10500,
            highestBidderName: "Chopper99",
            startTime: new Date(Date.now() - 120000000).toISOString(),
            endTime: new Date(Date.now() + 36000000).toISOString(),
        },
        {
            id: 4,
            itemName: "エリトラ",
            itemKey: "elytra",
            description: "空を飛ぶことができる貴重なアイテムです。",
            sellerName: "SkyWalker",
            startPrice: 15000,
            currentPrice: 18000,
            highestBidderName: "FlyingDutchman",
            startTime: new Date(Date.now() - 210000000).toISOString(),
            endTime: new Date(Date.now() + 50000000).toISOString(),
        }
    ];
};

export async function GET(request: NextRequest) {
    try {
        // In a real app, you would fetch from your Minecraft server/database
        const items = getMockAuctionItems();

        return NextResponse.json(items);
    } catch (error) {
        console.error('Error fetching auction items:', error);
        return NextResponse.json(
            { error: 'Failed to fetch auction items' },
            { status: 500 }
        );
    }
}
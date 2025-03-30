// src/types/auction.ts
export interface AuctionItem {
    id: number;
    itemName: string;
    itemKey: string;
    description?: string;
    sellerName: string;
    startPrice: number;
    currentPrice: number;
    highestBidderName: string;
    startTime: string;
    endTime: string;
}
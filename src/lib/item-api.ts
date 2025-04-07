// src/lib/item-api.ts

/**
 * アイテム一覧を取得する
 */
export async function fetchItems() {
    try {
        const response = await fetch('/api/admin/items', {
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
    }
}

/**
 * 特定のアイテム詳細を取得する
 * @param itemId アイテムID
 */
export async function fetchItemDetail(itemId: string) {
    try {
        const response = await fetch(`/api/admin/items/${itemId}`, {
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching item detail for ${itemId}:`, error);
        throw error;
    }
}
export type PlayerData = {
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

export type PlayerSearchResponse = PlayerData | {
    error: string;
    message: string;
};
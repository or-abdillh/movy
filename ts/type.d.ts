export type StravaTokenExchangeResponse = {
    token_type: string;
    expires_at: number;
    expires_in: number;
    refresh_token: string;
    access_token: string;
    athlete: Athlete
}

export type Style = {
    id: string;
    slug: string;
    name: string;
    description: string;
    cover: string;
}

export type Card = {
    id: string;
    style_id: string;
    slug: string;
    name: string;
    thumbnail: string;
}
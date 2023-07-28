// Internal Imports
import { apiKey, apiSecret } from "../config";

interface AccessTokenResponse {
    token_type: string;
    expires_in: number;
    access_token: string;
}

export async function getAcessToken(): Promise<AccessTokenResponse> {
    const response = await fetch('https://api.petfinder.com/v2/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({
            grant_type: 'client_credentials',
            client_id: apiKey,
            client_secret: apiSecret,
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to obtain access token')
    }

    return response.json()
}
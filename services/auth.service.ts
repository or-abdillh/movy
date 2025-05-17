import { stravaUrl } from "~/urls/strava.url";
import { Service } from "./service";
import type { StravaTokenExchangeResponse } from "~/ts/type";

/**
 * Service for handling Strava authentication operations.
 * 
 * Provides methods to exchange authorization codes for access tokens
 * using the Strava API.
 */
export class AuthService extends Service {

    protected stravaUrl = stravaUrl
    protected config = useRuntimeConfig()

    /**
     * Exchanges an authorization code for a Strava access token.
     *
     * This method sends a POST request to the Strava token exchange endpoint with the provided authorization code,
     * client ID, and client secret. If successful, it returns the token exchange response containing access and refresh tokens.
     * If an error occurs during the exchange, it logs the error and returns `undefined`.
     *
     * @param code - The authorization code received from Strava after user authentication.
     * @returns A promise that resolves to a `StravaTokenExchangeResponse` object if the exchange is successful, or `undefined` if an error occurs.
     */
    public async stravaTokenExchange(code: string): Promise<StravaTokenExchangeResponse | undefined> {
        
        try {
            // fetch the token exchange
            const res: StravaTokenExchangeResponse = await this.fetch(
                this.stravaUrl.tokenExchange(),
                {
                    method: "POST",
                    body: {
                        client_id: this.config.public.strava.clientId,
                        client_secret: this.config.strava.clientSecret,
                        code: code,
                        grant_type: 'authorization_code',
                    }
                }
            )

            return res
        } catch (error) {
            console.error("Error in stravaTokenExchange:", error)
        }
        
        return undefined
    }
}
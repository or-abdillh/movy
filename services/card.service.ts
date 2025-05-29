import type { Card } from "~/ts/type";
import { Service } from "./service";

/**
 * Service for handling card-related operations.
 * 
 * Provides methods to fetch card data by slug.
 */
export class CardService extends Service {

    /**
     * Retrieves a card by its slug.
     *
     * @param slug - The unique identifier (slug) of the card to fetch.
     * @returns A promise that resolves to the `Card` object if found, or `undefined` if not found or an error occurs.
     *
     * @throws This method does not throw; errors are caught and logged internally.
     */
    public async getCardBySlug(slug: string): Promise<Card | undefined> {

        try {
            // fetch the card by slug
            const res: Card = await this.fetch(`/api/card/${slug}`)

            return res
        } catch (error) {
            console.error("Error in getCardBySlug:", error)
        }

        return undefined
    }
}
import type { Card, Style } from "~/ts/type";
import { Service } from "./service";

/**
 * Service for retrieving style data from the server.
 *
 * Provides methods to fetch and manage style-related information.
 * Extends the base `Service` class.
 */
export class StyleService extends Service {

    /**
     * Retrieves a list of styles from the server.
     *
     * This method asynchronously fetches style data from the `/api/style/style` endpoint.
     * If the fetch is successful, it returns an array of `Style` objects.
     * In case of an error or if no data is returned, it logs the error and returns an empty array.
     *
     * @returns {Promise<Style[]>} A promise that resolves to an array of `Style` objects.
     */
    public async getStyles(): Promise<Style[]> {

        try {
            // fetch the styles
            const res: Style[] = await this.fetch("/api/style/style")

            // success
            if (res) return res

        } catch (error) {
            console.error("Error in getStyles:", error)
        }

        return []
    }

    /**
     * Retrieves a style by its slug.
     *
     * @param slug - The unique identifier for the style to retrieve.
     * @returns A promise that resolves to the `Style` object if found, or `undefined` if an error occurs or the style is not found.
     */
    public async getStyle(slug: string): Promise<Style | undefined> {

        try {
            // get the style
            const res: Style = await this.fetch(`/api/style/${slug}`)

            return res
        } catch (error) {
            console.error("Error in getStyle:", error)
        }

        return undefined
    }

    public async getCards(style: Style): Promise<Card[]> {

        try {
            // fetch the cards
            const cards: Card[] = await this.fetch(`/api/style/${style.slug}/card`)

            // success
            return cards
        } catch (error) {
            console.error("Error in getCards:", error)
        }

        return []
    }
}
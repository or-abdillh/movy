import { stravaUrl } from "~/urls/strava.url";
import { Service } from "./service";
import type { Activity } from "~/schemas/activity.schema";

/**
 * Service for interacting with athlete-related endpoints, such as retrieving activities,
 * using the provided authentication token.
 */
export class AthleteService extends Service {

    protected url = stravaUrl
    protected token: string = ""

    public setToken(token: string) {
        this.token = token
    }

    /**
     * Retrieves a paginated list of activities for the authenticated athlete.
     *
     * @param page - The page number to retrieve (1-based index).
     * @param perPage - The number of activities to retrieve per page.
     * @returns A promise that resolves to an array of `Activity` objects. Returns an empty array if an error occurs.
     *
     * @throws Will log an error to the console if the fetch operation fails.
     */
    public async getActivities(page: number, perPage: number): Promise<Activity[]> {

        try {
            // fetch the activities
            const actvities: Activity[] = await this.fetch(
                this.url.athlete.getActivities(page, perPage),
                {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    }
                }
            )

            return actvities

        } catch (error) {
            console.error("Error in getActivities:", error)
        }

        return []
    }
}
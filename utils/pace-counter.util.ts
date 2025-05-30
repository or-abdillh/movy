import type { Activity } from "~/schemas/activity.schema";

/**
 * Calculates the average pace per kilometer for a given activity.
 *
 * @param activity - The activity object containing `moving_time` (in seconds) and `distance` (in meters).
 * @returns The pace as a formatted string in the form "mm:ss /km".
 */
export const paceCounter = (activity: Activity): string => {

    // calculate pace in seconds per kilometer
    const pace = activity.moving_time / (activity.distance / 1000)

    // convert pace to minutes and seconds
    const min = Math.floor(pace / 60);
    const sec = Math.round(pace % 60).toString().padStart(2, '0')

    // format and return the pace string
    return `${min}:${sec}`
}
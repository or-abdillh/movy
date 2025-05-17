import { z } from "zod";
import { AthleteSchema } from "./athlete.schema";


const MapSchema = z.object({
    id: z.string(),
    resource_state: z.number(),
    summary_polyline: z.string(),
});

export const ActivitySchema = z.object({
    achievement_count: z.number(),
    athlete: AthleteSchema.pick({
        id: true,
        resource_state: true,
    }),
    athlete_count: z.number(),
    average_heartrate: z.number().nullable(),
    average_speed: z.number(),
    comment_count: z.number(),
    commute: z.boolean(),
    display_hide_heartrate_option: z.boolean(),
    distance: z.number(),
    elapsed_time: z.number(),
    elev_high: z.number().nullable(),
    elev_low: z.number().nullable(),
    end_latlng: z.array(z.number()).nullable(),
    external_id: z.string().nullable(),
    flagged: z.boolean(),
    from_accepted_tag: z.boolean(),
    gear_id: z.string().nullable(),
    has_heartrate: z.boolean(),
    has_kudoed: z.boolean(),
    heartrate_opt_out: z.boolean(),
    id: z.number(),
    kudos_count: z.number(),
    location_city: z.string().nullable(),
    location_country: z.string().nullable(),
    location_state: z.string().nullable(),
    manual: z.boolean(),
    map: MapSchema,
    max_heartrate: z.number().nullable(),
    max_speed: z.number(),
    moving_time: z.number(),
    name: z.string(),
    photo_count: z.number(),
    pr_count: z.number(),
    private: z.boolean(),
    resource_state: z.number(),
    sport_type: z.string(),
    start_date: z.string(),
    start_date_local: z.string(),
    start_latlng: z.array(z.number()).nullable(),
    timezone: z.string(),
    total_elevation_gain: z.number(),
    total_photo_count: z.number(),
    trainer: z.boolean(),
    type: z.string(),
    upload_id: z.number(),
    upload_id_str: z.string(),
    utc_offset: z.number(),
    visibility: z.string(),
    workout_type: z.number().nullable(),
});

export type Activity = z.infer<typeof ActivitySchema>;
export type Map = z.infer<typeof MapSchema>;

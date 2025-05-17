import { z } from "zod";

export const athleteSchema = z.object({
    id: z.number(),
    username: z.string().nullable(),
    resource_state: z.number(),
    firstname: z.string(),
    lastname: z.string(),
    bio: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string().nullable(),
    sex: z.enum(["M", "F"]),
    premium: z.boolean(),
    summit: z.boolean(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
    badge_type_id: z.number(),
    weight: z.number(),
    profile_medium: z.string().url(),
    profile: z.string().url(),
    friend: z.unknown().nullable(),
    follower: z.unknown().nullable(),
});

export type Athlete = z.infer<typeof athleteSchema>;
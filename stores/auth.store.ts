import { defineStore } from "pinia";
import type { Athlete } from "~/schemas/athlete.schema";

type Credentials = {
    tokenType: string;
    expiresAt: number;
    expiresIn: number;
    refreshToken: string;
    accessToken: string;
};

export const useAuthStore = defineStore("auth", () => {

    // states
    const athlete = ref<Athlete>()
    const credentials = reactive<Credentials>({
        tokenType: "",
        expiresAt: 0,
        expiresIn: 0,
        refreshToken: "",
        accessToken: ""
    });

    // setter
    const setAthlete = (payload: Athlete | undefined = undefined) => athlete.value = payload
    const setCredentials = (payload: Credentials | undefined = undefined) => {
        if (payload) {
            credentials.tokenType = payload.tokenType;
            credentials.expiresAt = payload.expiresAt;
            credentials.expiresIn = payload.expiresIn;
            credentials.refreshToken = payload.refreshToken;
            credentials.accessToken = payload.accessToken;
        }
    }

    return {
        athlete,
        credentials,
        setAthlete,
        setCredentials
    }
}, {
    persist: true
})
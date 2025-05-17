const PREFIX = "https://www.strava.com/api/v3"

export const stravaUrl = {

    tokenExchange: () => {
        return `${PREFIX}/oauth/token`
    },

    athlete: {

        getActivities: (page: number, perPage: number) => {
            return `${PREFIX}/athlete/activities?page=${page}&per_page=${perPage}`
        }
    }
}
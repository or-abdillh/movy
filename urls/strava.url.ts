const PREFIX = "https://www.strava.com/api/v3"

export const stravaUrl = {

    tokenExchange: () => {
        return `${PREFIX}/oauth/token`
    }
}
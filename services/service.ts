export class Service {

    public fetch = $fetch

    static RESPONSE_CODE = {
        SUCCESS: 200,
        ERROR: 500,
        NOT_FOUND: 404,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
    }
}
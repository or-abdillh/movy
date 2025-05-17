import { AuthService } from "~/services/auth.service"

// services
const authService = new AuthService()

export default defineEventHandler(async event => {
  
  // Get the query parameters from the request
  const query = getQuery(event)
  const { code } = query

  // get exchange token
  const request = await authService.stravaTokenExchange(code as string)

  if (!request) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to exchange token",
    })
  }

  // success
  return request

})

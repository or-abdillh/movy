import { Card } from "~/ts/type"

export default defineEventHandler(async event => {

  // get slug
  const slug = getRouterParam(event, 'slug')

  // get json cards
  const cards = await $fetch<{ cards: Card[] }>(`${useRuntimeConfig().public.app.url}/json/cards.json`)

  // find the cards
  const card = cards.cards.find((card) => card.slug === slug)

  // if not found, return 404
  if (!card) {
    setResponseStatus(event, 404)
    return
  }

  // return the card
  return card
})

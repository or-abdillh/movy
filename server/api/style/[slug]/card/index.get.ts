import { Card, Style } from "~/ts/type"

export default defineEventHandler(async (event) => {

  // get slug
  const slug = getRouterParam(event, 'slug')

  // get JSON styles
  const styles = await $fetch<{ styles: Style[] }>(`${useRuntimeConfig().public.app.url}/json/styles.json`)
  
  // find the style
  const style = styles.styles.find((style) => style.slug === slug)

  // if not found, return 404
  if (!style) {
    setResponseStatus(event, 404)
    return
  }

  // get JSON cards
  const json = await $fetch<{ cards: Card[] }>(`${useRuntimeConfig().public.app.url}/json/cards.json`)

  // find the cards
  const cards = json.cards.filter((card) => card.style_id === style.id)

  // if not found, return 404
  if (!cards) {
    setResponseStatus(event, 404)
    return
  }

  // return the cards
  return cards
})

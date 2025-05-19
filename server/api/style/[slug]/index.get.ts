import { Style } from "~/ts/type"

export default defineEventHandler(async (event) => {
  
  // get params
  const slug = getRouterParam(event, 'slug')

  // get JSON styles
  const json = await $fetch<{ styles: Style[] }>(`${useRuntimeConfig().public.app.url}/json/styles.json`)

  // find the style
  const style = json.styles.find((style) => style.slug === slug)

  // if not found, return 404
  if (!style) {
    setResponseStatus(event, 404)
    return
  }

  // return the style
  return style
})

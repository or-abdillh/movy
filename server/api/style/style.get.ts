import type { Style } from "~/ts/type";

export default defineEventHandler(async event => {

  // config
  const config = useRuntimeConfig()

  // fetch JSON
  const json = await $fetch<{ styles: Style[] }>(`${config.public.app.url}/json/styles.json`)

  // return the data
  return json.styles;
})

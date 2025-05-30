interface Options {
  usePreset?: boolean;
  dimension?: { width: number; height: number };
}

/**
 * Composable for transforming image URLs using ImageKit and Vercel Blob endpoints.
 *
 * Provides a reactive `transformedUrl` and a handler `transformingImage` to generate
 * transformed image URLs based on provided options such as presets or custom dimensions.
 *
 * @returns An object containing:
 * - `transformedUrl`: A ref holding the latest transformed image URL.
 * - `transformingImage`: A function to transform an image URL with optional transformation options.
 *
 * @example
 * const { transformedUrl, transformingImage } = useImageKit();
 * transformingImage('https://vercel-blob-url/image.jpg', { usePreset: true });
 * // transformedUrl.value will be updated with the transformed URL.
 */
export const useImageKit = () => {

  // runtime
  const runtimeConfig = useRuntimeConfig()
  
  // refs
  const transformedUrl = ref<string>("")

  // handler: transforming image URL
  const transformingImage = (url: string, options: Options = { usePreset: false }) => {

    // split vercel blob URL
    const pathToVercelBlob = url.split(runtimeConfig.public.vercel.blob.endpoint)[1] || ""

    // transforming parameters
    let transformParams = ""

    // if using preset, use the default transformation
    if (options.usePreset) transformParams = "tr:n-insta_story"

    // if dimension is provided, set it
    if (options.dimension && options.dimension.width && options.dimension.height) {

      // updating transformed params
      transformParams = `tr:w-${options.dimension.width},h-${options.dimension.height}`
    }

    // construct the transformed URL
    transformedUrl.value = `${runtimeConfig.public.imageKit.endpoint}/${transformParams}/${pathToVercelBlob}`
  }

  // return
  return {
    transformedUrl,
    transformingImage
  }
}

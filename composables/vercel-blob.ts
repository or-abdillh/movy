import { put } from "@vercel/blob"
import type { UploadProgressEvent, PutBlobResult } from "@vercel/blob"

interface Options {
  prefix?: string
}

// composable
const runtimeConfig = useRuntimeConfig()

export const useVercelBlob = (options: Options) => {

  // refs
  const isUploading = ref(false)
  const progress = ref<UploadProgressEvent>({
    loaded: 0,
    total: 0,
    percentage: 0
  })

  // handler: upload
  const upload = async (file: File): Promise<PutBlobResult | undefined> => {

    // generate path name
    const pathName = `${options.prefix}/${new Date().getTime()}.${file.name.split('.').pop() || 'jpg'}`

    try {
      // start
      isUploading.value = true

      // upload to Vercel Blob
      const uploaded = await put(pathName, file, {
        access: "public",
        token: runtimeConfig.public.vercel.blob.read_write_token,
        onUploadProgress(progressEvent) {
  
          // Update the upload progress
          progress.value = {
            loaded: progressEvent.loaded,
            total: progressEvent.total,
            percentage: progressEvent.percentage
          }
        }
      })

      // end
      isUploading.value = false

      // Return the uploaded file information
      return uploaded

    } catch (error) {
      console.error('Upload failed:', error)
    }

    // if upload fails, reset state
    isUploading.value = false
    progress.value = {
      loaded: 0,
      total: 0,
      percentage: 0
    }

    return undefined
  }

  // return composable
  return {
    isUploading,
    progress,
    upload
  }
}

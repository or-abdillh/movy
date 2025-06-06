import { put } from "@vercel/blob"
import moment from "moment"
import type { UploadProgressEvent, PutBlobResult } from "@vercel/blob"


interface Options {
  prefix?: string
}

/**
 * A composable for uploading files to Vercel Blob storage with progress tracking.
 *
 * @param options - Configuration options for the upload, including a `prefix` for the file path.
 * @returns An object containing:
 *   - `isUploading`: A ref indicating if an upload is in progress.
 *   - `progress`: A ref containing the current upload progress (`loaded`, `total`, `percentage`).
 *   - `upload`: An async function to upload a file, returning the upload result or `undefined` on failure.
 *
 * @example
 * ```typescript
 * const { isUploading, progress, upload } = useVercelBlob({ prefix: 'uploads' });
 * const result = await upload(file);
 * ```
 */
export const useVercelBlob = (options: Options) => {
  
  const runtimeConfig = useRuntimeConfig()

  // refs
  const isUploading = ref(false)
  const progress = ref<UploadProgressEvent>({
    loaded: 0,
    total: 0,
    percentage: 0
  })

  // handler: upload
  const upload = async (file: File): Promise<PutBlobResult | undefined> => {

    // get Vercel Blob token from environment variables
    const token = import.meta.env.VITE_BLOB_READ_WRITE_TOKEN as string

    // get month and year
    const month = moment().format('MMMM')
    const year = moment().format('YYYY')

    // generate path name
    const pathName = `${year}/${month}/${options.prefix}/${new Date().getTime()}.${file.name.split('.').pop() || 'jpg'}`

    try {
      // start
      isUploading.value = true

      // upload to Vercel Blob
      const uploaded = await put(pathName, file, {
        access: "public",
        token,
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

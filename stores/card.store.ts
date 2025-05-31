import { defineStore } from 'pinia'
import type { Activity } from '~/schemas/activity.schema'

export const useCardStore = defineStore("card", () => {

  // states
  const selectedActivity = ref<Activity>()
  const isExporting = ref(false)

  // setter
  const setSelectedActivity = (payload: Activity | undefined) => {
    selectedActivity.value = payload
  }

  const setIsExporting = (payload: boolean) => isExporting.value = payload

  return {
    selectedActivity,
    isExporting,
    setSelectedActivity,
    setIsExporting
  }
})

import { defineStore } from 'pinia'
import type { Activity } from '~/schemas/activity.schema'

export const useCardStore = defineStore("card", () => {

  // states
  const selectedActivity = ref<Activity>()

  // setter
  const setSelectedActivity = (payload: Activity | undefined) => {
    selectedActivity.value = payload
  }

  return {
    selectedActivity,
    setSelectedActivity
  }
})

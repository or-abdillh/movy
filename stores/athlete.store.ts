import { defineStore } from 'pinia'
import type { Activity } from '~/schemas/activity.schema'

export const useAthleteStore = defineStore("athlete", () => {

  // states
  const activities = ref<Activity[]>([])

  // setter
  const setActivities = (payload: Activity[] = []) => activities.value = payload

  return {
    activities,
    setActivities
  }
}, {
  persist: true
})

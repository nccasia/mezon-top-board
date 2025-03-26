import { HttpResponse } from "@app/types/API.types"
import { api } from "../../apiInstance"
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    ratingControllerCreateRating: build.mutation<ratingControllerCreateRatingApiResponse,ratingControllerCreateRatingApiArg>({
      query: (queryArg) => ({ url: `/api/rating`, method: "POST", body: queryArg.createRatingRequest })
    })
  }),
  overrideExisting: false
})
export { injectedRtkApi as ratingService }
export type CreateRatingRequest = {
  appId: string
  score: number
  comment: string
}
export type ratingControllerCreateRatingApiResponse = unknown
export type ratingControllerCreateRatingApiArg = {
  createRatingRequest: CreateRatingRequest
}
export const { useRatingControllerCreateRatingMutation } = injectedRtkApi

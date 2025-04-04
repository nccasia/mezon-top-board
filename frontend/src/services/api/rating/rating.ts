import { HttpResponse } from "@app/types/API.types"
import { api } from "../../apiInstance"
import { App, User } from "../mezonApp/mezonApp"
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    ratingControllerCreateRating: build.mutation<
      RatingControllerCreateRatingApiResponse,
      RatingControllerCreateRatingApiArg
    >({
      query: (queryArg) => ({ url: `/api/rating`, method: "POST", body: queryArg.createRatingRequest })
    }),
    ratingControllerGetRatingsByApp: build.query<
      RatingControllerGetRatingByAppApiResponse,
      RatingControllerGetRatingByAppApiArg
    >({
      query: (queryArg) => ({
        url: `/api/rating/get-by-app`,
        params: {
          appId: queryArg.appId
        }
      })
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
export type RatingControllerGetRatingByAppApiResponse = HttpResponse<Rating[]>
export type RatingControllerGetRatingByAppApiArg = {
  appId: string
}
export type RatingControllerCreateRatingApiResponse = unknown
export type RatingControllerCreateRatingApiArg = {
  createRatingRequest: CreateRatingRequest
}

export type Rating = {
  id: string
  userId: string
  score: number
  comment: string
  updatedAt: string
  user: User
  app: App
}

export const {
  useRatingControllerCreateRatingMutation,
  useRatingControllerGetRatingsByAppQuery,
  useLazyRatingControllerGetRatingsByAppQuery
} = injectedRtkApi

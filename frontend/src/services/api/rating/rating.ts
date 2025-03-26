import { HttpResponse } from "@app/types/API.types"
import { api } from "../../apiInstance"
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    ratingControllerCreateRating: build.mutation({
      query: (queryArg) => ({ url: `/api/rating`, method: "POST", body: queryArg.createRatingRequest })
    })
  }),
  overrideExisting: false
})
export { injectedRtkApi as ratingService }
export const { useRatingControllerCreateRatingMutation } = injectedRtkApi

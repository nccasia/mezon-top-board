import { ratingService } from "@app/services/api/rating/rating"
import { ActionReducerMapBuilder } from "@reduxjs/toolkit"

export const ratingExtraReducers = (builder: ActionReducerMapBuilder<any>) => {
  builder
    .addMatcher(ratingService.endpoints.ratingControllerGetRatingsByApp.matchFulfilled, (state, { payload }) => {
      state.ratings = payload
      console.log(state.ratings)
    })
    .addMatcher(ratingService.endpoints.ratingControllerGetRatingsByApp.matchRejected, (state, { payload }) => {
      state.ratings = {}
    })
    .addMatcher(ratingService.endpoints.ratingControllerCreateRating.matchFulfilled, (state, { meta, payload }) => {})
}

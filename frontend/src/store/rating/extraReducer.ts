import { ratingService } from "@app/services/api/rating/rating"
import { ActionReducerMapBuilder } from "@reduxjs/toolkit"

export const ratingExtraReducers = (builder: ActionReducerMapBuilder<any>) => {
  builder
    .addMatcher(ratingService.endpoints.ratingControllerGetRatingsByApp.matchFulfilled, (state, { payload }) => {
      state.ratings = payload
    })
    .addMatcher(ratingService.endpoints.ratingControllerCreateRating.matchFulfilled, (state, { meta, payload }) => {
    })
}

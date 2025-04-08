import { tagService } from "@app/services/api/tag/tag"
import { ActionReducerMapBuilder } from "@reduxjs/toolkit"

export const tagExtraReducers = (builder: ActionReducerMapBuilder<any>) => {
  builder.addMatcher(tagService.endpoints.tagControllerGetTags.matchFulfilled, (state, { payload }) => {
    state.tagList = payload
  })
}

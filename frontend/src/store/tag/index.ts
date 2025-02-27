import { TagControllerGetTagsApiResponse, tagService } from '@app/services/api/tag/tag'
import { createSlice } from '@reduxjs/toolkit'

export interface ITagStore {
  tagList: TagControllerGetTagsApiResponse
}

const initialState: ITagStore = {
  tagList: {} as TagControllerGetTagsApiResponse
}

const tagSlice = createSlice({
  name: 'tag',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(tagService.endpoints.tagControllerGetTags.matchFulfilled, (state, { payload }) => {
      state.tagList = payload
    })
  }
})

export const tagReducer = tagSlice.reducer
export const {} = tagSlice.actions

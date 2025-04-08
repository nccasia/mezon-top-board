import { TagControllerGetTagsApiResponse, tagService } from '@app/services/api/tag/tag'
import { createSlice } from '@reduxjs/toolkit'
import { tagExtraReducers } from './extraReducer'

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
  extraReducers: tagExtraReducers
  }
)

export const tagReducer = tagSlice.reducer
export const {} = tagSlice.actions

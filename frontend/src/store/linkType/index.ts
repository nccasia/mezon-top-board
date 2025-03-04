import { linkTypeService, SocialLinkInMezonAppDetailResponse } from '@app/services/api/linkType/linkType'
import { createSlice } from '@reduxjs/toolkit'

export interface ILinkTypeStore {
  linkTypeList: SocialLinkInMezonAppDetailResponse[]
}

const initialState: ILinkTypeStore = {
  linkTypeList: []
}

const linkTypeSlice = createSlice({
  name: 'link',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(linkTypeService.endpoints.linkTypeControllerGetAllLinks.matchFulfilled, (state, { payload }) => {
      state.linkTypeList = payload.data
    })
  }
})

export const linkTypeReducer = linkTypeSlice.reducer
export const {} = linkTypeSlice.actions

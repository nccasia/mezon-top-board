import { linkService, SocialLinkInMezonAppDetailResponse } from '@app/services/api/link/link'
import { createSlice } from '@reduxjs/toolkit'

export interface ILinkStore {
  linkList: SocialLinkInMezonAppDetailResponse[]
}

const initialState: ILinkStore = {
  linkList: []
}

const linkSlice = createSlice({
  name: 'link',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(linkService.endpoints.linkControllerGetAllLinks.matchFulfilled, (state, { payload }) => {
      state.linkList = payload.data
    })
  }
})

export const linkReducer = linkSlice.reducer
export const {} = linkSlice.actions

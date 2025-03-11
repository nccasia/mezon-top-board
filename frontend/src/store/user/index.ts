import { GetUserDetailsResponse, userService } from '@app/services/api/user/user'
import { createSlice } from '@reduxjs/toolkit'

export interface IUserStore {
  userInfo: GetUserDetailsResponse
}

const initialState: IUserStore = {
  userInfo: {} as GetUserDetailsResponse
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(userService.endpoints.userControllerGetUserDetails.matchFulfilled, (state, { payload }) => {
      state.userInfo = payload.data
      state.userInfo.name = payload.data.name || payload.data.email.split('@')[0]
    })
  }
})

export const userReducer = userSlice.reducer
export const {} = userSlice.actions

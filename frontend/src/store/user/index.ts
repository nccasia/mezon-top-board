import { GetPublicProfileResponse, GetUserDetailsResponse, userService } from '@app/services/api/user/user'
import { createSlice } from '@reduxjs/toolkit'
import { manageUsersExtraReducers } from './extraReducer'

export interface IUserStore {
  userInfo: GetUserDetailsResponse,
  publicProfile: GetPublicProfileResponse,
}

const initialState: IUserStore = {
  userInfo: {} as GetUserDetailsResponse,
  publicProfile: {} as GetPublicProfileResponse,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserInfo: (state) => {
      state.userInfo = {} as GetUserDetailsResponse
    }
  },
  extraReducers: manageUsersExtraReducers
})

export const userReducer = userSlice.reducer
export const { clearUserInfo } = userSlice.actions

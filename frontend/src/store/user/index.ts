import { GetUserDetailsResponse, userService } from '@app/services/api/user/user'
import { createSlice } from '@reduxjs/toolkit'
import { manageUsersExtraReducers } from './extraReducer'

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
  extraReducers: manageUsersExtraReducers
})

export const userReducer = userSlice.reducer
export const {} = userSlice.actions

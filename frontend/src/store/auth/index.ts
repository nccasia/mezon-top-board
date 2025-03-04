import { getAccessTokens, removeAccessTokens } from '@app/utils/storage'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IAuthStore {
  isLogin: boolean
}

const initialState: IAuthStore = {
  isLogin: !!getAccessTokens()
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogIn: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload
      if (!action.payload) {
        removeAccessTokens()
      }
    }
  }
})

export const authReducer = authSlice.reducer
export const { setLogIn } = authSlice.actions

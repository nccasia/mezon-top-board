import { MezonAppControllerSearchMezonAppApiResponse, mezonAppService } from '@app/services/api/mezonApp/mezonApp'
import { createSlice } from '@reduxjs/toolkit'

export interface IMezonAppStore {
  botList: MezonAppControllerSearchMezonAppApiResponse
}

const initialState: IMezonAppStore = {
  botList: {} as MezonAppControllerSearchMezonAppApiResponse
}

const mezonAppSlice = createSlice({
  name: 'mezonApp',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(
      mezonAppService.endpoints.mezonAppControllerSearchMezonApp.matchFulfilled,
      (state, { payload }) => {
        state.botList = payload
      }
    )
  }
})

export const mezonAppReducer = mezonAppSlice.reducer
export const {} = mezonAppSlice.actions

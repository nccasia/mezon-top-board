import {
  GetMezonAppDetailsResponse,
  GetRelatedMezonAppResponse,
  MezonAppControllerSearchMezonAppApiResponse,
  mezonAppService
} from '@app/services/api/mezonApp/mezonApp'
import { createSlice } from '@reduxjs/toolkit'
import { mezonAppExtraReducers } from './extraReducer'

export interface IMezonAppStore {
  mezonApp: MezonAppControllerSearchMezonAppApiResponse
  mezonAppDetail: GetMezonAppDetailsResponse
  relatedMezonApp: GetRelatedMezonAppResponse[]
}

const initialState: IMezonAppStore = {
  mezonApp: {} as MezonAppControllerSearchMezonAppApiResponse,
  mezonAppDetail: {} as GetMezonAppDetailsResponse,
  relatedMezonApp: [],
}

const mezonAppSlice = createSlice({
  name: 'mezonApp',
  initialState,
  reducers: {},
  extraReducers: mezonAppExtraReducers
})

export const mezonAppReducer = mezonAppSlice.reducer
export const {} = mezonAppSlice.actions

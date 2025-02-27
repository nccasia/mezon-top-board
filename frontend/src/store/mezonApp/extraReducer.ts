import { mezonAppService } from '@app/services/api/mezonApp/mezonApp'
import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

export const mezonAppExtraReducers = (builder: ActionReducerMapBuilder<any>) => {
  builder
    .addMatcher(mezonAppService.endpoints.mezonAppControllerSearchMezonApp.matchFulfilled, (state, { payload }) => {
      state.mezonApp = payload
    })
    .addMatcher(mezonAppService.endpoints.mezonAppControllerGetMezonAppDetail.matchFulfilled, (state, { payload }) => {
      state.mezonAppDetail = payload.data
    })
    .addMatcher(mezonAppService.endpoints.mezonAppControllerGetRelatedMezonApp.matchFulfilled, (state, { payload }) => {
      state.relatedMezonApp = payload.data
    })
}

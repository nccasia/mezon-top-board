import { App, mezonAppService } from '@app/services/api/mezonApp/mezonApp';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';

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
    .addMatcher(mezonAppService.endpoints.mezonAppControllerGetMyApp.matchFulfilled, (state, { payload }) => {
      state.mezonAppOfUser = payload
    })
    .addMatcher(mezonAppService.endpoints.mezonAppControllerDeleteMezonApp.matchFulfilled, (state, action) => {
      const deletedId = action.meta.arg.originalArgs.requestWithId.id;
      state.mezonApp.data = state.mezonApp.data.filter((app: App) => app.id !== deletedId);
    })
    .addMatcher(mezonAppService.endpoints.mezonAppControllerCreateMezonApp.matchFulfilled, (state, { payload }) => {
      if (state.mezonApp?.data) {
        state.mezonApp.data.unshift(payload); 
      }
    })
    .addMatcher(
      mezonAppService.endpoints.mezonAppControllerUpdateMezonApp.matchFulfilled,
      (state, { payload }) => {
        const index = state.mezonApp.data.findIndex((app: App) => app.id === payload.id);
        
        if (index !== -1) {
          // Update the app while preserving the existing array reference
          state.mezonApp.data[index] = {
            ...state.mezonApp.data[index], // Keep existing fields if not updated
            ...payload // Overwrite with updated fields
          };
        }
      }
    );
    
}

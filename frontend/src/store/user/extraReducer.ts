import { UpdateUserRequest, userService } from '@app/services/api/user/user'
import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

export const manageUsersExtraReducers = (builder: ActionReducerMapBuilder<any>) => {
  builder
    .addMatcher(userService.endpoints.userControllerSearchUser.matchFulfilled, (state, action) => {
      const { pageNumber, data } = action.payload
      if (pageNumber) state.pages = { ...state.pages, [pageNumber]: data } // Store each page’s data
    })
    .addMatcher(userService.endpoints.userControllerUpdateUser.matchFulfilled, (state, action) => {
      const updatedUser = action.meta.arg.originalArgs.updateUserRequest
      // Loop through all pages and update the user if found
      Object.keys(state.pages).forEach((pageNumber) => {
        const page = state.pages[pageNumber]
        const index = page.findIndex((user: UpdateUserRequest) => user.id === updatedUser.id)
        if (index !== -1) {
          // Update only `name`, `bio`, and `role` fields, keeping other properties intact
          state.pages[pageNumber][index] = {
            ...page[index], // Keep existing fields
            ...updatedUser // Overwrite updated fields
          }
        }
      })
    })
    .addMatcher(userService.endpoints.userControllerGetUserDetails.matchFulfilled, (state, { payload }) => {
      state.userInfo = payload.data
      state.userInfo.name = payload.data.name || payload.data.email.split('@')[0]
    })
    .addMatcher(userService.endpoints.userControllerSelfUpdateUser.matchFulfilled, (state, { meta }) => {
      const {name, bio, profileImage} = meta.arg.originalArgs.selfUpdateUserRequest
      state.userInfo.name = name
      state.userInfo.bio = bio
      state.userInfo.profileImage = profileImage
    })
}

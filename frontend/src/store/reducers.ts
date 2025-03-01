import { combineReducers } from '@reduxjs/toolkit'
import { api } from '@app/services/apiInstance'
import { tagReducer } from './tag'
import { mezonAppReducer } from './mezonApp'

export const rootReducer = combineReducers({
  tag: tagReducer,
  mezonApp: mezonAppReducer,
  [api.reducerPath]: api.reducer
})

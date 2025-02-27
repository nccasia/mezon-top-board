import { combineReducers } from '@reduxjs/toolkit'
import { api } from '@app/services/apiInstance'
import { counterReducer } from './counter'
import { tagReducer } from './tag'
import { mezonAppReducer } from './mezonApp'

export const rootReducer = combineReducers({
  counter: counterReducer,
  tag: tagReducer,
  mezonApp: mezonAppReducer,
  [api.reducerPath]: api.reducer
})

import { combineReducers } from '@reduxjs/toolkit'
import { api } from '@app/services/apiInstance'
import { counterReducer } from './counter'

export const rootReducer = combineReducers({
  counter: counterReducer,
  [api.reducerPath]: api.reducer
})

import { combineReducers } from '@reduxjs/toolkit'
import { api } from '@services/apiInstance'
import { counterReducer } from './counter'

export const rootReducer = combineReducers({
  counter: counterReducer,
  [api.reducerPath]: api.reducer
})

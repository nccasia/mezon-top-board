import { combineReducers } from '@reduxjs/toolkit'
import { api } from '@app/services/apiInstance'
import { tagReducer } from './tag'
import { mezonAppReducer } from './mezonApp'
import { linkTypeReducer } from './linkType'
import { userReducer } from './user'
import { authReducer } from './auth'

export const rootReducer = combineReducers({
  tag: tagReducer,
  mezonApp: mezonAppReducer,
  link: linkTypeReducer,
  user: userReducer,
  auth: authReducer,
  [api.reducerPath]: api.reducer
})

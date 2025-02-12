import { createSlice } from '@reduxjs/toolkit'
import { counterReducers } from './reducer'

export interface ICounterStore {
  value: number
}

const initialState: ICounterStore = {
  value: 0
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: counterReducers
})

export const counterReducer = counterSlice.reducer
export const { increment, decrement } = counterSlice.actions

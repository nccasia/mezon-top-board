import { PayloadAction } from '@reduxjs/toolkit'
import { ICounterStore } from '@store/counter/index'

export const counterReducers = {
  increment: (state: ICounterStore) => {
    state.value += 1
  },
  decrement: (state: ICounterStore) => {
    state.value -= 1
  },
  // Use the PayloadAction type to declare the contents of `action.payload`
  incrementByAmount: (state: ICounterStore, action: PayloadAction<number>) => {
    state.value += action.payload
  }
}

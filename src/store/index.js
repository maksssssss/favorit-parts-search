import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './searchSlice'

export const makeStore = () => configureStore({ reducer: { search: searchReducer } })
export const store = makeStore()

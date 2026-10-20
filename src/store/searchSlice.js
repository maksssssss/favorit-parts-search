import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as api from '../api/favoritApi'

export const loadBrands = createAsyncThunk('search/loadBrands', (number) => api.fetchBrands(number))

export const loadOffers = createAsyncThunk('search/loadOffers', ({ number, brand }) =>
  api.fetchOffers(number, brand),
)

const initialState = {
  query: '',
  brands: [],
  brandsStatus: 'idle', // idle | loading | succeeded | failed
  brandsError: null,
  selectedBrand: null,
  offers: [],
  offersStatus: 'idle',
  offersError: null,
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadBrands.pending, (state, action) => ({
        ...initialState,
        query: action.meta.arg,
        brandsStatus: 'loading',
      }))
      .addCase(loadBrands.fulfilled, (state, action) => {
        state.brandsStatus = 'succeeded'
        state.brands = action.payload
      })
      .addCase(loadBrands.rejected, (state, action) => {
        state.brandsStatus = 'failed'
        state.brandsError = action.error.message
      })
      .addCase(loadOffers.pending, (state, action) => {
        state.selectedBrand = action.meta.arg.brand
        state.offersStatus = 'loading'
        state.offersError = null
        state.offers = []
      })
      .addCase(loadOffers.fulfilled, (state, action) => {
        state.offersStatus = 'succeeded'
        state.offers = action.payload
      })
      .addCase(loadOffers.rejected, (state, action) => {
        state.offersStatus = 'failed'
        state.offersError = action.error.message
      })
  },
})

export const { reset } = searchSlice.actions
export default searchSlice.reducer

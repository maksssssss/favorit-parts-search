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
  brandsRequestId: null,
  selectedBrand: null,
  offers: [],
  offersStatus: 'idle',
  offersError: null,
  offersRequestId: null,
}

// Ответ учитывается, только если это самый свежий запрос своего этапа:
// иначе медленный старый ответ перезаписал бы результаты нового поиска.
const isLatest = (current, action) => current === action.meta.requestId

const searchSlice = createSlice({
  name: 'search',
  initialState,
  extraReducers: (builder) => {
    builder
      // Новый поиск по артикулу сбрасывает и этап 2
      .addCase(loadBrands.pending, (state, action) => ({
        ...initialState,
        query: action.meta.arg,
        brandsStatus: 'loading',
        brandsRequestId: action.meta.requestId,
      }))
      .addCase(loadBrands.fulfilled, (state, action) => {
        if (!isLatest(state.brandsRequestId, action)) return
        state.brandsStatus = 'succeeded'
        state.brands = action.payload
      })
      .addCase(loadBrands.rejected, (state, action) => {
        if (!isLatest(state.brandsRequestId, action)) return
        state.brandsStatus = 'failed'
        state.brandsError = action.error.message
      })
      .addCase(loadOffers.pending, (state, action) => {
        state.selectedBrand = action.meta.arg.brand
        state.offersStatus = 'loading'
        state.offersError = null
        state.offersRequestId = action.meta.requestId
        state.offers = []
      })
      .addCase(loadOffers.fulfilled, (state, action) => {
        if (!isLatest(state.offersRequestId, action)) return
        state.offersStatus = 'succeeded'
        state.offers = action.payload
      })
      .addCase(loadOffers.rejected, (state, action) => {
        if (!isLatest(state.offersRequestId, action)) return
        state.offersStatus = 'failed'
        state.offersError = action.error.message
      })
  },
})

export default searchSlice.reducer

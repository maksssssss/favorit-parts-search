import { describe, expect, it, vi } from 'vitest'
import { makeStore } from './index'
import { loadBrands, loadOffers } from './searchSlice'
import * as api from '../api/favoritApi'

vi.mock('../api/favoritApi')

describe('searchSlice', () => {
  it('этап 1: сохраняет бренды', async () => {
    api.fetchBrands.mockResolvedValue(['MEYLE'])
    const store = makeStore()
    const p = store.dispatch(loadBrands('1'))
    expect(store.getState().search.brandsStatus).toBe('loading')
    await p
    expect(store.getState().search).toMatchObject({
      brandsStatus: 'succeeded',
      brands: ['MEYLE'],
      query: '1',
    })
  })

  it('этап 1: ошибка', async () => {
    api.fetchBrands.mockRejectedValue(new Error('boom'))
    const store = makeStore()
    await store.dispatch(loadBrands('1'))
    expect(store.getState().search).toMatchObject({ brandsStatus: 'failed', brandsError: 'boom' })
  })

  it('этап 2: сохраняет предложения и выбранный бренд', async () => {
    api.fetchOffers.mockResolvedValue([{ id: 'x' }])
    const store = makeStore()
    await store.dispatch(loadOffers({ number: '1', brand: 'MEYLE' }))
    expect(store.getState().search).toMatchObject({
      offersStatus: 'succeeded',
      selectedBrand: 'MEYLE',
      offers: [{ id: 'x' }],
    })
  })

  it('устаревший ответ не перезаписывает результаты нового поиска', async () => {
    let resolveOld
    api.fetchBrands
      .mockImplementationOnce(() => new Promise((resolve) => (resolveOld = resolve)))
      .mockResolvedValueOnce(['NEW'])
    const store = makeStore()
    const oldRequest = store.dispatch(loadBrands('old'))
    await store.dispatch(loadBrands('new'))
    resolveOld(['OLD'])
    await oldRequest
    expect(store.getState().search).toMatchObject({ query: 'new', brands: ['NEW'] })
  })

  it('новый поиск сбрасывает результаты этапа 2', async () => {
    api.fetchOffers.mockResolvedValue([{ id: 'x' }])
    api.fetchBrands.mockResolvedValue([])
    const store = makeStore()
    await store.dispatch(loadOffers({ number: '1', brand: 'MEYLE' }))
    await store.dispatch(loadBrands('2'))
    expect(store.getState().search).toMatchObject({
      offers: [],
      offersStatus: 'idle',
      selectedBrand: null,
    })
  })
})

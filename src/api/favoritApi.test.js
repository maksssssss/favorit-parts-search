import { afterEach, describe, expect, it, vi } from 'vitest'
import { fetchBrands, fetchOffers } from './favoritApi'

const mockFetch = (body, ok = true) =>
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({ ok, status: ok ? 200 : 500, json: async () => body }),
  )

afterEach(() => vi.unstubAllGlobals())

describe('fetchBrands', () => {
  it('возвращает уникальные бренды', async () => {
    mockFetch({ goods: [{ brand: 'MEYLE' }, { brand: 'FEBI' }, { brand: 'MEYLE' }] })
    expect(await fetchBrands('123')).toEqual(['MEYLE', 'FEBI'])
  })

  it('пустой goods даёт пустой список', async () => {
    mockFetch({ goods: [] })
    expect(await fetchBrands('123')).toEqual([])
  })

  it('ошибка API превращается в понятное сообщение', async () => {
    mockFetch({ error: 'Request quota exceeded!' })
    await expect(fetchBrands('123')).rejects.toThrow('Превышен лимит')
  })

  it('сетевой сбой', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('fail')))
    await expect(fetchBrands('123')).rejects.toThrow('Не удалось связаться')
  })

  it('ошибка API с HTTP 403 сохраняет текст из тела ответа', async () => {
    mockFetch({ error: 'Request quota exceeded!' }, false)
    await expect(fetchBrands('123')).rejects.toThrow('Превышен лимит')
  })

  it('HTTP-ошибка', async () => {
    mockFetch({}, false)
    await expect(fetchBrands('123')).rejects.toThrow('Ошибка сервера')
  })
})

describe('fetchOffers', () => {
  it('разворачивает аналоги в плоский список', async () => {
    mockFetch({
      goods: [
        {
          goodsID: 'a',
          brand: 'MEYLE',
          number: '1',
          name: 'Рычаг',
          count: 5,
          price: 100,
          analogues: [
            { goodsID: 'b', brand: 'FEBI', number: '2', name: 'Рычаг 2', count: 3, price: 90 },
          ],
        },
      ],
    })
    const offers = await fetchOffers('1', 'MEYLE')
    expect(offers).toHaveLength(2)
    expect(offers[1]).toMatchObject({ brand: 'FEBI', price: 90, count: 3 })
  })

  it('id уникальны даже при одинаковых goodsID, нулевая цена -> null', async () => {
    mockFetch({
      goods: [
        { goodsID: 'a', brand: 'X', number: '1', name: 'A', count: 0, price: 0 },
        { goodsID: 'a', brand: 'X', number: '1', name: 'A', count: 1, price: 5 },
      ],
    })
    const offers = await fetchOffers('1', 'X')
    expect(new Set(offers.map((o) => o.id)).size).toBe(2)
    expect(offers[0].price).toBeNull()
  })
})

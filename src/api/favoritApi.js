const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'
const API_KEY = import.meta.env.VITE_FAVORIT_API_KEY || '00000000-0000-0000-0000-000000000001'

async function request(params) {
  const url = `${BASE_URL}?${new URLSearchParams({ key: API_KEY, ...params })}`
  let response
  try {
    response = await fetch(url)
  } catch {
    throw new Error('Не удалось связаться с сервером. Проверьте подключение к сети.')
  }
  if (!response.ok) throw new Error(`Ошибка сервера (${response.status})`)

  let data
  try {
    data = await response.json()
  } catch {
    throw new Error('Сервер вернул некорректный ответ.')
  }
  // API возвращает ошибки как {"error": "..."} с HTTP 200
  if (data && data.error) throw new Error(ERROR_MESSAGES[data.error] || data.error)
  return Array.isArray(data?.goods) ? data.goods : []
}

const ERROR_MESSAGES = {
  'Empty key!': 'Не указан ключ API.',
  'Invalid key client!': 'Неверный ключ API.',
  'Empty number goods!': 'Введите артикул.',
  'Request quota exceeded!': 'Превышен лимит запросов к API. Попробуйте позже.',
}

// Этап 1: список производителей, выпускающих деталь с данным артикулом
export async function fetchBrands(number) {
  const goods = await request({ number })
  return [...new Set(goods.map((g) => g.brand).filter(Boolean))]
}

// Этап 2: аналоги и предложения по номеру и бренду
export async function fetchOffers(number, brand) {
  const goods = await request({ number, brand, analogues: 'on' })
  return goods.flatMap((g) => [g, ...(g.analogues || [])]).map((g) => ({
    id: `${g.goodsID}-${g.number}`,
    name: g.name,
    brand: g.brand,
    number: g.number,
    price: g.price ?? null,
    count: g.count ?? 0,
  }))
}

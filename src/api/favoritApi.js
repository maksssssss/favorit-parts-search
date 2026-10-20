const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'
const API_KEY = import.meta.env.VITE_FAVORIT_API_KEY || '00000000-0000-0000-0000-000000000001'

const ERROR_MESSAGES = {
  'Empty key!': 'Не указан ключ API.',
  'Invalid key client!': 'Неверный ключ API.',
  'Empty number goods!': 'Введите артикул.',
  'Request quota exceeded!': 'Превышен лимит запросов к API. Попробуйте позже.',
}

async function request(params) {
  const url = `${BASE_URL}?${new URLSearchParams({ key: API_KEY, ...params })}`
  let response
  try {
    response = await fetch(url)
  } catch {
    throw new Error('Не удалось связаться с сервером. Проверьте подключение к сети.')
  }

  // Тело читаем всегда: API отдаёт ошибки как {"error": "..."} и с HTTP 200, и с 403
  let data = null
  try {
    data = await response.json()
  } catch {
    if (response.ok) throw new Error('Сервер вернул некорректный ответ.')
  }
  if (data?.error) throw new Error(ERROR_MESSAGES[data.error] || data.error)
  if (!response.ok) throw new Error(`Ошибка сервера (${response.status})`)

  return Array.isArray(data?.goods) ? data.goods : []
}

// Этап 1: список производителей, выпускающих деталь с данным артикулом
export async function fetchBrands(number) {
  const goods = await request({ number })
  return [...new Set(goods.map((g) => g.brand).filter(Boolean))]
}

// Этап 2: аналоги и предложения по номеру и бренду
export async function fetchOffers(number, brand) {
  const goods = await request({ number, brand, analogues: 'on' })
  return goods
    .flatMap((g) => [g, ...(g.analogues || [])])
    .map((g, index) => ({
      id: `${g.goodsID}-${index}`, // индекс гарантирует уникальный key в списке
      name: g.name,
      brand: g.brand,
      number: g.number,
      price: g.price || null, // 0 и отсутствие цены означают «нет предложения»
      count: g.count ?? 0,
    }))
}

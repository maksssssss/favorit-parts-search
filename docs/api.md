# API Favorit Parts (кратко)

Источник: https://lk.favorit-parts.ru/static/wsprice.pdf (от 06.03.2023). Проверено живыми запросами.

Базовый URL: `http://api.favorit-parts.ru/hs/hsprice/` (только HTTP, CORS `*`). Метод GET.

## Параметры
| Параметр | Описание |
|---|---|
| `key` | ключ клиента (демо-ключ: `00000000-0000-0000-0000-000000000001`) |
| `number` | номер (артикул) запчасти |
| `brand` | производитель (необязательный) |
| `analogues` | `on` — вернуть аналоги (используется вместе с `brand`) |
| `info` | `on` — добавить признак `notRefund` (невозвратный товар) |

Спецсимволы в параметрах нужно экранировать (`#` → `%23`, `&` → `%26`).

## Сценарии
1. **Этап 1:** `?key=…&number=7160500039S` → `{"goods":[{brand, number, name, count, price, goodsID, rate, warehouses[]}, …]}`. Уникальные `brand` — список производителей.
2. **Этап 2:** `?key=…&number=7160500039S&brand=MEYLE&analogues=on` → в элементе `goods[]` есть массив `analogues[]` с тем же форматом позиций.

## Поля позиции
`goodsID`, `brand`, `number`, `name`, `count` (общий остаток), `price`, `rate`, `warehouses[]`
(`code`, `id`, `own`, `shipmentDate`, `price`, `stock`, `warehouseShipping`).

## Ошибки
Приходят как `{"error": "..."}` (HTTP 200):
- `Empty key!` — не указан ключ
- `Invalid key client!` — неверный ключ
- `Empty number goods!` — не указан номер
- `Request quota exceeded!` — превышена квота запросов

Нет результата → пустой `goods` (или пустой ответ).

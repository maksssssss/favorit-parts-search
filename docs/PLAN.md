# План реализации

> Статус: **реализовано и задеплоено** (шаги 1–6): https://favorit-parts-search-ochre.vercel.app
> Осталось: отправить ссылки в отклик на hh.ru.

## Задача
Клиентское приложение на React для интеграции с API поиска автозапчастей и аналогов (Favorit Parts). Двухэтапный подбор номенклатуры.

- Документация API: https://lk.favorit-parts.ru/static/wsprice.pdf (краткая выжимка: [api.md](api.md))
- **Отклик на вакансию (сюда отправить ссылку на готовый репозиторий):**
  https://hh.ru/applicant/vacancy_response?vacancyId=138619703&startedWithQuestion=false

## Требования
**Этап 1 — поиск производителей**
- Поле ввода артикула.
- Запрос к API по номеру → список брендов.
- Показ списка брендов для выбора.

**Этап 2 — аналоги и предложения**
- При выборе бренда повторный запрос (номер + бренд).
- Итоговая таблица аналогов и предложений: Название / Производитель, Цена, Остаток на складе.

**Технические**
- React + Redux, без TypeScript.
- Стили: Bootstrap.
- Обработка загрузки (лоадеры) и ошибок (пустые ответы, сбои сети). Чем проще, тем лучше.

## Стек
React + Vite (JS), Redux Toolkit, Bootstrap 5, Vitest для тестов.

## Структура
```
src/
  api/favoritApi.js                 # fetch, нормализация ответа, ошибки
  store/index.js, searchSlice.js    # createAsyncThunk: fetchBrands, fetchOffers
  components/SearchForm.jsx, BrandList.jsx, OffersTable.jsx, Loader.jsx, ErrorAlert.jsx
  App.jsx, main.jsx
```
Состояние Redux: `query`, `brands`, `selectedBrand`, `offers`, статусы `idle | loading | failed` для каждого этапа.

## Хостинг и HTTP-API
API работает только по HTTP (CORS `*`). На HTTPS-хостинге браузер заблокирует запросы (mixed content), поэтому в браузере запросы идут на `/api`:
- локально: прокси Vite;
- демо для заказчика: Vercel/Netlify rewrite `/api/* → http://api.favorit-parts.ru/hs/hsprice/*`.

## Skills (mattpocock/skills)
Подключены в проекте для всего процесса разработки, не только для UI:
`grill-with-docs`, `to-spec`, `to-tickets`, `implement`, `tdd`, `code-review`, `pr`. Трекер задач — GitHub Issues.

## Шаги реализации
1. Каркас Vite + React + Redux Toolkit + Bootstrap, прокси `/api`.
2. API-слой (`favoritApi.js`) + тесты: успех, пустой `goods`, `{"error": ...}`, сетевая ошибка.
3. Redux slice с thunk-ами + тесты reducers.
4. UI: форма, список брендов, таблица, лоадеры, ошибки с «Повторить», пустое состояние.
5. README: запуск, скриншоты, ссылка на демо.
6. Деплой (Vercel) с rewrite-прокси.
7. Отправить ссылку на репозиторий в отклик на hh.ru (ссылка выше).

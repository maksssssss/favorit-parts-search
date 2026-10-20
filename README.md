# favorit-parts-search

Тестовое задание: клиентское приложение на React (Redux, без TypeScript, Bootstrap) для поиска автозапчастей и аналогов через API Favorit Parts. Двухэтапный подбор: артикул → производитель → аналоги и предложения (название/производитель, цена, остаток).

**Демо:** https://favorit-parts-search-ochre.vercel.app

**Стек:** React 19 (Vite), Redux Toolkit, Bootstrap 5, без TypeScript. Тесты: Vitest.

## Запуск локально

Нужен Node.js 18+.

```bash
git clone https://github.com/maksssssss/favorit-parts-search.git
cd favorit-parts-search
npm install
cp .env.example .env
npm run dev
```

Откройте адрес из консоли (обычно `http://localhost:5173`). Тесты: `npm test`, сборка: `npm run build`.

API работает только по HTTP, поэтому браузер обращается на `/api`, а Vite (в разработке) или rewrite в `vercel.json` (на хостинге) проксирует запрос на `http://api.favorit-parts.ru/hs/hsprice/`. Демо-ключ из документации API лежит в `.env.example`.

> **Лимит демо-ключа.** Ключ из документации публичный, поэтому на некоторые запросы API может отвечать `Request quota exceeded!` (HTTP 403). Приложение показывает это сообщение и кнопку «Повторить». Для постоянной работы нужен собственный ключ: `VITE_FAVORIT_API_KEY` в `.env`.

## Как работает
1. Ввод артикула → запрос `number` → список уникальных производителей.
2. Выбор производителя → запрос `number + brand + analogues=on` → таблица: название / производитель, цена, остаток.
3. Состояния загрузки (лоадеры), ошибки API и сети (с кнопкой «Повторить»), пустые результаты.

Структура: `src/api` (запросы), `src/store` (Redux slice с `createAsyncThunk`), `src/components` (UI).

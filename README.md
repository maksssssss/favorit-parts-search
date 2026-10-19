# favorit-parts-search

Тестовое задание: клиентское приложение на React (Redux, без TypeScript, Bootstrap) для поиска автозапчастей и аналогов через API Favorit Parts. Двухэтапный подбор: артикул → производитель → аналоги и предложения (название/производитель, цена, остаток).

**Статус:** подготовка завершена, реализация впереди. План: [docs/PLAN.md](docs/PLAN.md), описание API: [docs/api.md](docs/api.md).

## Skills для Claude Code

Skills [mattpocock/skills](https://github.com/mattpocock/skills) уже лежат в репозитории (`.claude/skills`, версии в `skills-lock.json`). После `git clone` и открытия папки в Claude Code они подхватываются автоматически, ничего скачивать не нужно.

Обновить до свежих версий:

```bash
npx skills@latest update
```

Установить заново (если папку `.claude/skills` удалили):

```bash
npx skills@latest add mattpocock/skills -a claude-code -y
```

Первый запуск на новом компьютере: `/setup-matt-pocock-skills` (трекер задач — GitHub Issues), затем `/to-spec` и `/to-tickets` для разбиения плана из [docs/PLAN.md](docs/PLAN.md) на задачи.

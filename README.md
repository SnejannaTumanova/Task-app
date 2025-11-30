# Task App (task-app)

Fullstack-приложение для создания и управления задачами.

**Стек:**

- Backend: **NestJS**, **TypeScript**, **PostgreSQL**, **Prisma**, **JWT**
- Frontend: **Vite**, **React**, **TypeScript**, **Ant Design**
- Документация API: **Swagger** (`/api/docs`)
- Docker: **Docker Compose**

---

## Возможности

### Backend

- Регистрация и авторизация пользователей (JWT)
- CRUD для задач
- Автоматическое назначение случайного исполнителя при создании задачи
- Пагинация списка задач
- Валидация входных данных для всех эндпоинтов

### Frontend

- SPA
- Регистрация / вход
- Создание задач
- Список задач с пагинацией
- Редактирование / удаление задач через модальные окна

---

## Структура проекта

```
task-app/
  backend/         # NestJS + Prisma + PostgreSQL
  frontend/        # Vite + React + Ant Design
  docker-compose.yml
  README.md
```

---

## Быстрый старт через Docker (рекомендуется)

### 1) Клонировать проект

```bash
git clone https://github.com/SnejannaTumanova/Task-app.git
cd Task-app
```

### 2) Собрать и поднять сервисы

```bash
docker compose up --build
```

Поднимутся 3 контейнера:

- **db** (PostgreSQL)
- **backend** (NestJS)
- **frontend** (Vite + React)

### 3) Миграции

Миграции применяются автоматически при старте backend-контейнера.
Дополнительно ничего запускать не нужно.

### 4) Заполнить базу seed-данными (один раз)

В новом терминале, в корне проекта:

```bash
docker compose exec backend npm run prisma:seed
```

После этого в базе появятся тестовые пользователи и задачи.

---

## Адреса после запуска

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`
- Swagger: `http://localhost:3000/api/docs`
- PostgreSQL: `localhost:5432`

---

## Тестовые пользователи (seed)

Пароль у всех: **password123**

Примеры:

- `ivan.petrov@example.com`
- `olga.smirnova@example.com`
- `alex.kuznetsov@example.com`

---

## API (кратко)

### Auth

- `POST /auth/register`
- `POST /auth/login`

### Tasks

- `GET /tasks?page=1&limit=10`
- `GET /tasks/:id`
- `POST /tasks` _(JWT)_
- `PATCH /tasks/:id` _(JWT)_
- `DELETE /tasks/:id` _(JWT)_

Полная интерактивная документация:
`/api/docs`

---

## Локальный запуск без Docker (опционально)

### Backend

```bash
cd backend
npm install
```

Создай `backend/.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/task_app?schema=public"
JWT_SECRET="super_secret_key"
JWT_EXPIRATION=3600
```

Миграции:

```bash
npx prisma generate
npx prisma migrate dev
```

Seed:

```bash
npm run prisma:seed
```

Запуск:

```bash
npm run start:dev
```

### Frontend

```bash
cd ../frontend
npm install
```

Создай `frontend/.env`:

```env
VITE_API_URL=http://localhost:3000
```

Запуск:

```bash
npm run dev
```

---

## Возможные проблемы

### Prisma не подключается к БД

Проверь:

- запущен ли Postgres
- правильный ли `DATABASE_URL`
- совпадают ли порт/логин/пароль

### CORS

Фронт ожидается на `http://localhost:5173`.  
Если порт другой — поправь `origin` в `backend/src/main.ts`.

---

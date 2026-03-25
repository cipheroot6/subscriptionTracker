# AGENTS.md - Subscription Tracker

## Project Overview
- **Type**: Full-stack web application (Express.js backend + React frontend)
- **Database**: MongoDB with Mongoose ODM
- **Deployment**: Vercel

## Project Structure

```
/                    # Root (Vercel deployment config)
├── backend/         # Express.js API server
├── frontend/        # React + Vite frontend
├── config/          # Shared config (env, arcjet, upstash)
├── controllers/    # Express route handlers
├── database/       # MongoDB connection
├── middlewares/    # Express middlewares
├── models/          # Mongoose schemas
├── routes/          # Express routers
└── public/          # Static assets
```

## Commands

### Root (monorepo)
```bash
npm run dev          # Run both backend and frontend concurrently
npm run build        # Build frontend for production
npm run start        # Start backend production server
npm run install:all  # Install all dependencies
```

### Backend
```bash
cd backend
npm run dev          # Start with nodemon (auto-restart on changes)
npm start            # Production start (node bin/www)
```

### Frontend
```bash
cd frontend
npm run dev          # Dev server (http://localhost:5173)
npm run build        # Production build
npm run lint         # Run ESLint
npm run preview      # Preview production build
npm run lint -- --fix  # Auto-fix lint issues
```

### Running a Single Test
> **Note**: No tests exist yet. When tests are added:
```bash
# Jest (backend)
npm test -- --testPathPattern=filename

# Vitest (frontend)
npm run test -- --run filename
```

## Code Style Guidelines

### Backend (Node.js/Express)

**Imports**
- Use ES modules (`import`/`export`, not CommonJS)
- Use `.js` extension for local imports
- Group: external libs → config → models/controllers → routes → middlewares
- Example:
```javascript
import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routers.js";
import errorMiddleware from "./middlewares/error.middleware.js";
```

**Naming**
- Files: `kebab-case` (e.g., `auth.controller.js`, `user.model.js`)
- Functions: `camelCase` (e.g., `signUp`, `getUserById`)
- Variables: `camelCase`
- Constants: `UPPER_SNAKE_CASE` (e.g., `JWT_SECRET`, `HTTP_STATUS_OK`)
- Controllers: noun + action (e.g., `auth.controller.js`, `user.controller.js`)

**Error Handling**
- Use Express error middleware pattern (`(err, req, res, next) =>`)
- Attach `status` property to Error objects for HTTP status codes
- Always pass errors to `next(error)` in async route handlers
- Log errors with `console.error` before responding

**Async Controllers**
```javascript
export const signUp = async (req, res, next) => {
  try {
    // async operations
    res.status(201).json({ success: true, data: ... });
  } catch (error) {
    next(error);
  }
};
```

**Mongoose Models**
- Schema with validation (required, minLength, maxLength, enum)
- Use `timestamps: true` for createdAt/updatedAt
- Index unique fields (email, etc.)

### Frontend (React/Vite)

**Components**
- Use functional components with hooks
- File extension: `.jsx` for components, `.js` for utilities
- PascalCase for component names (e.g., `SignUp.jsx`, `Dashboard.jsx`)
- Default export for page components

**Hooks**
- Use `useState` for local state
- Extract complex logic to custom hooks
- Handle loading/error states in components

**API Calls**
- Use axios instance from `src/lib/api.js`
- Include proper error handling with user feedback
- Use `async/await` with try/catch

**CSS**
- Use CSS modules or component-scoped CSS files
- Follow existing patterns in `src/pages/signUp.css`

**Naming**
- Components: `PascalCase`
- Functions/variables: `camelCase`
- Files: `kebab-case`
- CSS classes: `kebab-case`

### General

**ESLint (Frontend)**
- Config: `frontend/eslint.config.js`
- Runs with React hooks plugin
- Prevents unused variables (except UPPER_CASE constants)

**Environment Variables**
- Backend: `.env.development.local`, `.env.production.local`
- Frontend: `VITE_*` prefix (e.g., `VITE_API_URL`)
- Never commit secrets to version control

**Git**
- Use conventional commits
- Never commit `.env` files, node_modules, dist folders

## Important Notes

- Backend routes prefixed with `/api/v1/` (e.g., `/api/v1/auth`, `/api/v1/users`)
- CORS configured for `http://localhost:5173` (dev) or `CLIENT_URL` (production)
- MongoDB connection handled via `database/mongodb.js`
- Authentication uses JWT tokens with cookies
- Error middleware handles Mongoose errors (CastError, duplicate key, validation)
# Demo Account Auto-Seeding Design

**Date:** 2026-05-06  
**Status:** Approved  
**Commit:** (to be committed)

## Overview

The demo account (`demo@subtracker.dev`) should automatically populate with realistic subscription data on every login. This gives the dashboard real numbers, analytics charts something to display, and shows both active and inactive states. The data should reset to a clean state on each login — never hardcoded in controllers.

## Architecture

```
signIn controller
  └─ check if email === "demo@subtracker.dev"
       ├─ if user doesn't exist → auto-create demo user (verified, no email verification)
       └─ if user exists → call seedDemoSubscriptions(userId) [fire-and-forget]

signUp controller
  └─ if email === "demo@subtracker.dev" → set isVerified: true (skip email verification)

backend/scripts/seedDemo.js
  └─ exports seedDemoSubscriptions(userId)
       ├─ deletes existing demo subscriptions for user
       └─ bulk-inserts fresh seed subscriptions
```

## Components

### 1. `backend/scripts/seedDemo.js` (new file)

- Exports: `seedDemoSubscriptions(userId)`
- Contains seed data as a clean JS array (the 7 subscriptions from the spec)
- Deletes existing subscriptions for the demo user before inserting (prevents duplicates, resets state)
- Uses `Subscription.insertMany()` for efficient bulk insert
- Can also be run directly: `node backend/scripts/seedDemo.js` (for manual setup, looks up demo user by email)
- Seed data:

| Name | Price | Frequency | Category | Status | Start Date | Renewal Date |
|------|-------|------------|----------|--------|-------------|---------------|
| Netflix | 15.99 | monthly | entertainment | active | 30 days ago | 1 month from now |
| Spotify | 9.99 | monthly | entertainment | active | 25 days ago | 5 days from now |
| GitHub Pro | 4.00 | monthly | education | active | 20 days ago | 10 days from now |
| Figma | 12.00 | monthly | other | active | 15 days ago | 15 days from now |
| Notion | 8.00 | monthly | other | active | 10 days ago | 20 days from now |
| NYT | 17.00 | monthly | news | canceled | 60 days ago | 30 days from now |
| Adobe CC | 54.99 | monthly | other | expired | 90 days ago | 30 days ago |

### 2. `backend/controllers/auth.controller.js` (modify signIn)

After successful auth in `signIn`:
- Check `user.email === "demo@subtracker.dev"`
- If user doesn't exist (fresh DB or deleted), auto-create with:
  - `name: "Demo User"`
  - `email: "demo@subtracker.dev"`
  - `password: hashed "Demo1234!"`
  - `isVerified: true`
  - `role: "user"`
- If user exists, call `seedDemoSubscriptions(user._id)` — fire-and-forget (don't await, so login response isn't blocked)

### 3. `backend/controllers/auth.controller.js` (modify signUp)

In `signUp`, after checking if user exists:
- If `email === "demo@subtracker.dev"`, set `isVerified: true` in the user object
- This ensures demo account never gets stuck waiting for email verification

### 4. `frontend/src/pages/signin.jsx` (no changes)

The existing `handleDemoLogin` already calls `/auth/sign-in` with demo credentials — no changes needed on the frontend.

## Data Flow

```
User clicks "Try demo account"
  → POST /auth/sign-in { email: "demo@subtracker.dev", password: "Demo1234!" }
  → signIn controller:
      1. Find or create demo user (always verified)
      2. Generate JWT token
      3. Send response (201 / 200)
      4. [after response] seedDemoSubscriptions(userId) runs async
  → Frontend receives token + user, navigates to dashboard
  → Dashboard loads fresh demo subscriptions
```

## Error Handling

- **Seed failure**: If `seedDemoSubscriptions` fails (DB error, etc.), the login still succeeds — the seed is fire-and-forget. Error is logged but doesn't block the user.
- **Demo user creation failure**: If auto-creation fails (e.g., DB down), the normal error handling in `signIn` catches it and returns an appropriate error.
- **Subscription model validation**: Seed data uses valid enum values matching the schema (`entertainment`, `education`, `news`, `other` for category; `monthly` for frequency; `active`, `canceled`, `expired` for status).
- **Pre-save hook note**: The subscription schema has a `pre-save` hook that auto-sets `status = "expired"` if `renewalDate < new Date()`. To preserve `canceled` status for NYT, set its `renewalDate` to a future date (e.g., 30 days from now). For `expired` subs (Adobe CC), set `renewalDate` to a past date so the hook correctly marks it expired.

## Testing

- Manual: Sign in with demo account, verify dashboard shows 7 subscriptions with correct names, prices, and statuses
- Manual: Sign in again, verify subscriptions are reset (not duplicated)
- Manual: Delete a subscription as demo user, sign in again, verify it's restored
- Manual: Delete demo user entirely, sign in again, verify user is recreated with seed data
- Manual: Verify demo user doesn't need email verification (isVerified: true)

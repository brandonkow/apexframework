# EstateLab Authentication

## Purpose

Authentication protects personal Jarvis conversations without weakening the owner-controlled knowledge boundary. Creating an account does not allow a user to modify EstateLab beliefs, references, decisions, framework files, properties, or comparable data.

## User Experience

- Jarvis remains immediately usable as a guest.
- Guest chat sessions are available only to the originating browser client ID.
- A member can register or sign in through the inline Account panel.
- Member chat sessions are attached to the member ID and can be resumed on another signed-in device.
- Signing out starts a clean guest session on that browser.

## Security Model

- Passwords are hashed with Node.js `scrypt` and a unique random salt.
- Raw passwords are never stored.
- Login tokens use 32 random bytes.
- Only SHA-256 hashes of login tokens are stored in the selected runtime store.
- Login cookies are `HttpOnly`, `SameSite=Strict`, and scoped to the whole app.
- Cookies receive the `Secure` attribute when the request arrives through HTTPS, including Render's forwarded HTTPS requests.
- Authentication attempts and public Jarvis/audio calls are limited in memory by source address.
- JSON request bodies are limited to 8 MB; evidence files and audio are capped separately.
- Email-verification and password-reset codes are random, stored only as SHA-256 hashes, expire, and are single-use.
- Password reset invalidates all existing sessions for that member.
- Disabled accounts cannot authenticate or retain active sessions.
- Unauthorized session access returns `404` so the API does not confirm whether another user's session exists.

## Storage Boundary

When `DATABASE_URL` is configured, users and hashed auth sessions are stored in normalized PostgreSQL tables. Without it, the local fallback stores them under `auth` in the runtime `data/db.json`.

The first authentication deployment clears legacy pre-authentication guest sessions from an existing runtime database. Those sessions had no enforceable user owner, so retaining them would weaken the new access boundary.

The owner knowledge base remains logically separate from public account and conversation data even when both use the same PostgreSQL service.

## Email Delivery

Set `ESTATELAB_EMAIL_WEBHOOK_URL` to a private automation or email-provider adapter. EstateLab sends a JSON payload containing the purpose, recipient, display name, raw one-time token, and expiry. The receiving service is responsible for delivering the code securely.

Keep `ESTATELAB_AUTH_DEBUG_TOKENS=false` in production. `ESTATELAB_REQUIRE_EMAIL_VERIFICATION` should remain false until delivery has been tested. Owner account controls are exposed only through owner-token API routes, never through the public browser.

## Current Limits

- Rate limiting resets when the Node process restarts and should move to a shared limiter for multiple app instances.
- JSON fallback storage does not provide transactional concurrency across multiple server instances.
- The generic webhook is a delivery contract, not a bundled transactional-email provider.

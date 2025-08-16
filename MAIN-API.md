# Main Window API

This document describes the minimal backend API required to replace the mocked
main window data.  The frontend currently uses local mocks defined in
`src/api/mock/index.ts` for these endpoints.  Implementing the endpoints below
will allow the application to work without the mock layer.

Base URL: `https://your-backend.example.com`

## `GET /config`
Returns general configuration used across the app.

**Response**
```json
{
  "expiresAt": 1714042140,
  "limits": { "moreAccounts": [3, 4], ... }
}
```
`limits` should follow the structure of Telegram's `help.getAppConfig` limits.

## `GET /app-config`
Provides UI related configuration such as feature limits.

**Response**
```json
{
  "hash": "string",
  "limits": { "moreAccounts": [3, 4], ... }
}
```

## `GET /chats`
Fetches list of chats.

**Query params**: `limit`, `offsetDate`, `offsetId`

**Response**
```json
{
  "chats": [ {"id": "1", "title": "Chat"} ],
  "users": [],
  "chatIds": ["1"],
  "messages": [],
  "totalChatCount": 1
}
```

## `GET /stories`
Returns story metadata.

**Response**
```json
{ "state": "string", "peerStories": [], "stealthMode": {}, "hasMore": false }
```

## `GET /content-settings`
Content restriction settings for the current user.

**Response**
```json
{ "isSensitiveEnabled": false }
```

## `GET /peer-colors`
Returns color map for peers.

**Response**
```json
{ "hash": "0", "colors": { "peerId": "#aabbcc" } }
```

## `GET /sticker-sets`
Returns installed sticker sets.

**Response**
```json
{ "hash": "0", "sets": [] }
```

## `GET /custom-emoji-sets`
Returns installed custom emoji sets.

**Response**
```json
{ "hash": "0", "sets": [] }
```

## `GET /contacts`
Returns user's contact list.

**Response**
```json
{ "users": [], "userStatusesById": {} }
```

## `GET /me`
Returns current user information.

**Response**
```json
{ "user": {"id": "currentUser", "firstName": "Mock"}, "userFullInfo": {} }
```

## `GET /authorizations`
Active session information.

**Response**
```json
{ "authorizations": {}, "ttlDays": 30 }
```

## `GET /stars/status`
Returns Star or TON balance depending on query parameter `isTon`.

**Response**
```json
{ "balance": { "amount": 0, "currency": "stars" }, "history": [] }
```

## `GET /collectible-emoji-statuses`
Returns available collectible emoji statuses.

**Response**
```json
{ "hash": "0", "statuses": [] }
```

## `GET /featured-emoji-stickers`
Returns featured emoji sticker sets.

**Response**
```json
{ "sets": [] }
```

## Replacing the mocks
The mock layer can be removed by wiring `callApi` to the real backend.  Each of
the endpoints above should mirror the response shapes used by the mocks.  Once
implemented, update `src/api/index.ts` to call your backend instead of the mock
implementation.

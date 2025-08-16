# Authentication API

This document outlines the minimum backend API required to replace the mocked authentication flow.
The frontend interacts with these endpoints through `callApi()` methods such as `signIn` and
`submitCode`.

Base URL: `https://your-backend.example.com`

## `POST /auth/send-code`
Send an authentication code to the supplied phone number.

**Request body**
```json
{
  "phoneNumber": "+1 988 671 6821"
}
```

**Response**
```json
{
  "sessionId": "string" // identifier to be used for the next step
}
```

The backend should forward the request to Telegram's `auth.sendCode` method or an equivalent
provider.

## `POST /auth/verify-code`
Verify the code entered by the user and create an authenticated session.

**Request body**
```json
{
  "sessionId": "string",
  "code": "12345"
}
```

**Response**
```json
{
  "token": "string", // session token
  "user": { ... }     // authorized user data
}
```

On success the frontend will transition to the next screen. Errors should return a non‑200 status
with an error description.

## Testing

- **Mock mode:** run `npm run dev:mocked`. Any code will be accepted and the app will
  proceed to the next screen.
- **Real API:** use `curl` or Postman to verify the endpoints:
  ```bash
  curl -X POST https://your-backend.example.com/auth/send-code \
       -H "Content-Type: application/json" \
       -d '{"phoneNumber":"+19886716821"}'

  curl -X POST https://your-backend.example.com/auth/verify-code \
       -H "Content-Type: application/json" \
       -d '{"sessionId":"<id>","code":"12345"}'
  ```

Implementing these endpoints completes the authentication flow without the mock layer.

# Push Notifications

During development the application may log:

`[PUSH] Unable to subscribe to push. NotAllowedError: Registration failed - permission denied`

Browsers only allow push subscriptions from secure origins and with explicit notification permissions. Ensure the app is served over HTTPS and the user grants notification access. In the mock environment this error can be ignored or push features can be disabled.

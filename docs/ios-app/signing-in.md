# Signing In

## Portal sign-in

1. Open PocketSOC on your iPhone.
2. Tap **Sign in with Portal**.
3. A secure browser window opens with the login page.
4. Sign in with your email/password or passkey. Enterprise plan customers can also use their company SSO provider.
5. After authentication, you are returned to the app.

<!-- ![iOS sign-in screen](/images/ios-sign-in-screen.png) -->

The app automatically:
- Registers your device with your organization
- Downloads your vendor configurations
- Connects to your vendor's API
- Loads your detections feed

## What you see after signing in

If everything is configured correctly, the Detections screen loads with alerts from your connected vendor(s). The toolbar shows your active profile name.

If your admin has set up [groups](/portal/groups), you only see detections from vendor profiles assigned to your groups.

## Switching organizations

PocketSOC currently supports one organization at a time. To switch to a different organization:

1. Go to **Settings** and tap **Sign Out**.
2. Sign back in with credentials associated with the other organization.

Your device registration persists in both organizations.

## Session expiration

Your session lasts 7 days. If it expires, you will be prompted to sign in again. Your device registration is preserved.

## Troubleshooting sign-in

| Issue | Solution |
|-------|----------|
| "Authentication failed" | Check your internet connection and try again |
| "Device limit reached" | Your organization has reached its plan's device limit. Ask your admin to upgrade or deactivate an unused device. |
| "Device deactivated" | Your admin has deactivated your device. Contact them to reactivate it. |
| Sign-in page won't load | Ensure you're not on a restrictive network that blocks the login service |

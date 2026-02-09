# iOS App Overview

The PocketSOC iOS app is where your security team views and triages detections. It connects to your vendor APIs through credentials managed in the portal.

## Requirements

- iPhone running **iOS 17.0** or later
- An active PocketSOC organization with at least one vendor configuration

## Key screens

### Sign-In
The first screen you see when opening the app. Tap **Sign in with Portal** to authenticate via your organization's portal account.

### Detections
The main screen after signing in. Shows a scrollable feed of security detections from your connected vendor(s). Pull down to refresh.

### Detection Detail
Tap any detection to see full details including severity, MITRE ATT&CK tactics, affected hostname, assigned user, and status.

### Process Graph
Available from the detection detail view. Visualizes the process tree showing parent/child process relationships, command lines, and file paths.

### Settings
Configure push notifications, on-call schedules, appearance, and manage your portal connection.

## Demo mode

PocketSOC includes a demo mode with sample detections so you can explore the app without connecting to a real vendor. Toggle **Use Demo Mode** on the sign-in screen.

::: info
If your organization deploys PocketSOC via MDM, your administrator may have disabled demo mode.
:::

# Settings

The Settings screen lets you configure the app's behavior, manage your portal connection, and customize your experience.

## Portal connection

The top section shows your portal connection status:

- **Organization name** and plan
- **Active devices** count
- **Sign Out** button to disconnect from the portal

## Profiles & connection

View your active vendor profile and connection status. See [Profiles](/ios-app/profiles) for details.

## Push notifications

Toggle push notifications on or off. When enabled, you receive instant alerts for new detections. See [Push Notifications](/ios-app/push-notifications) for details.

## Security

- **Require biometric unlock** — Require Face ID or Touch ID to open the app
- **Screen recording protection** — Prevents screenshots and screen recordings (may be enforced by MDM)

## Appearance

- **Theme** — Choose between system default, light, or dark mode

## Swipe actions

Customize which quick actions appear when you swipe left on a detection:

- Assign
- Change status
- Containment actions
- Close detection

## On-call schedule

Configure when you want to receive push notifications. Set your on-call hours for each day of the week so you only get alerts during your working hours. See [Push Notifications](/ios-app/push-notifications) for details.

## Device info

Shows your device ID, platform, and registration status. This information may be useful for troubleshooting with your admin.

## Sign out

Signing out:

- Clears your portal JWT token from the device keychain
- Disconnects from your vendor API
- Removes cached detection data
- Your device registration is preserved on the server (your admin can still see it in the Devices page)

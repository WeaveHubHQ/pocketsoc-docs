# Push Notifications

PocketSOC can send push notifications to your iPhone when new detections arrive, so your team can respond immediately.

## Enabling push notifications

1. Open PocketSOC and go to **Settings**.
2. Toggle **Push Notifications** on.
3. iOS will prompt you to allow notifications — tap **Allow**.

## What triggers a notification

You receive a push notification when:

- A new detection is created in your connected vendor environment
- The detection matches your active profile and group assignments

## On-call schedules

If you don't want to receive notifications 24/7, configure an on-call schedule:

1. Go to **Settings > On-Call Schedule**.
2. For each day of the week, set your start and end times.
3. Notifications will only be delivered during your on-call hours.

Outside of your on-call window, notifications are silently suppressed. You can still see all detections when you open the app.

::: tip
If you're in a rotation with another team member, coordinate your on-call schedules so someone is always covered.
:::

## Notification content

Each notification includes:

- Detection severity (shown as notification priority)
- Detection name
- Affected hostname
- Vendor source

Tap the notification to jump directly to the detection detail view.

## Disabling notifications

To stop receiving notifications:

- Toggle off **Push Notifications** in PocketSOC Settings, or
- Go to **iOS Settings > Notifications > PocketSOC** and disable notifications at the system level

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Not receiving notifications | Check that notifications are enabled in both PocketSOC settings and iOS settings |
| Delayed notifications | Push delivery depends on Apple's APNs service. Occasional delays are normal. |
| Getting notifications outside on-call hours | Verify your on-call schedule times are correct in Settings |

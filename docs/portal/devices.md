# Devices

The **Devices** page shows all iOS devices registered to your organization.

## Device information

Each device entry displays:

- **Device ID** — Unique identifier for the device
- **User** — The team member who registered the device
- **Platform** — Device platform (iOS)
- **Status** — Active or Deactivated
- **Last seen** — When the device last communicated with the server

## Device registration

Devices are registered automatically when a team member signs into the iOS app. No manual setup is needed. Each sign-in registers the device under the user's account.

## Device limits

Your plan determines how many active devices you can have:

| Plan | Device Limit |
|------|-------------|
| Free | 2 |
| Pro | 10 |
| Enterprise | Unlimited |

If you reach your device limit, additional team members will not be able to register until you either deactivate a device or upgrade your plan.

## Deactivating a device

1. Go to **Devices** and find the device.
2. Click **Deactivate**.

A deactivated device can no longer pull detections or receive push notifications. The user will see a message in the app indicating their device has been deactivated.

## Reactivating a device

Click **Activate** on a previously deactivated device to restore access (subject to your plan's device limit).

## Lost or stolen devices

If a team member's device is lost or stolen:

1. **Deactivate the device** immediately from the Devices page to revoke access.
2. **Remove the user** from the Team page if needed — this deactivates all of their devices automatically.

The deactivated device will not be able to access any detection data or vendor API credentials.

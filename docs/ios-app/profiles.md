# Profiles

Profiles represent your vendor API connections. Each profile corresponds to a vendor configuration created in the portal.

## How profiles work

When you sign into the iOS app, it automatically downloads the vendor profiles assigned to you:

- If your organization uses **groups**, you receive profiles assigned to your groups
- If your organization has **no groups**, you receive all profiles

Each profile contains the vendor type, API endpoint, and credentials needed to fetch detections.

## Viewing profiles

Go to **Settings > Profiles** to see your available profiles. Each profile shows:

- **Display name** — The friendly name set by your admin (e.g., "CrowdStrike Production")
- **Vendor** — CrowdStrike or Microsoft Defender
- **Status** — Connected or disconnected
- **Managed by Portal** label — Indicates the profile is managed centrally

## Switching profiles

If you have multiple profiles, you can switch between them:

1. In the Detections view, tap the **profile icon** in the top-left corner.
2. Select the profile you want to view.
3. The Detections feed reloads with alerts from that profile.

## Portal-managed profiles

Profiles synced from the portal are marked as **Managed by Portal**. These profiles:

- Are automatically updated when your admin changes the vendor configuration
- Cannot be edited directly in the app
- Are removed from your app if the admin deletes the configuration or removes you from the relevant group

## Profile sync

The app syncs profiles from the portal:

- On sign-in
- When you pull to refresh in the Detections view
- Periodically in the background

If your admin updates a vendor configuration (e.g., rotates credentials), the app picks up the change automatically on the next sync.

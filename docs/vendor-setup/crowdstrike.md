# CrowdStrike Setup

Connect PocketSOC to your CrowdStrike Falcon environment to view endpoint detections on your iPhone.

## Prerequisites

- A CrowdStrike Falcon subscription
- Access to the Falcon console with permissions to create API clients
- Your Falcon cloud environment URL

## Step 1: Create an API client in Falcon

1. Log into the [Falcon console](https://falcon.crowdstrike.com).
2. Go to **Support and resources > API Clients and Keys**.
3. Click **Create API Client**.
4. Give it a name like `PocketSOC`.
5. Set the following **API scopes** (read-only):

| Scope | Permission | Used for |
|-------|-----------|----------|
| **Detections** | Read, Write | View detections; update status, assign, close, add comments |
| **Hosts** | Read, Write | View host details; contain and lift containment |
| **Incidents** | Read | View related incidents |
| **IOCs** | Read | View indicators of compromise |
| **User Management** | Read | List assignable users |

6. Click **Create**.
7. Copy the **Client ID** and **Client Secret** — the secret is only shown once.

::: warning
Store the Client Secret securely. If you lose it, you will need to create a new API client.
:::

## Step 2: Determine your base URL

CrowdStrike has multiple cloud environments. Select the one that matches your Falcon instance:

| Cloud | Base URL |
|-------|----------|
| US-1 | `https://api.crowdstrike.com` |
| US-2 | `https://api.us-2.crowdstrike.com` |
| EU-1 | `https://api.eu-1.crowdstrike.com` |
| US-GOV-1 | `https://api.laggar.gcw.crowdstrike.com` |

::: tip
Not sure which cloud you're on? Check the URL in your browser when logged into the Falcon console. If it contains `falcon.us-2.crowdstrike.com`, you're on US-2.
:::

## Step 3: Add the configuration in PocketSOC

1. Go to [portal.pocketsoc.com](https://portal.pocketsoc.com) > **Settings**.
2. Under **Vendor Configurations**, click **Add Configuration**.
3. Fill in the fields:

| Field | Value |
|-------|-------|
| **Vendor** | CrowdStrike |
| **Display Name** | A friendly name (e.g., "CrowdStrike Production"). This is shown on each detection in the iOS app to identify which vendor source it came from. |
| **Base URL** | Your cloud URL from Step 2 |
| **Auth Type** | OAuth |
| **Client ID** | From Step 1 |
| **Client Secret** | From Step 1 |

4. Click **Save**.

<!-- ![CrowdStrike vendor config form](/images/portal-crowdstrike-config.png) -->

## Step 4: Verify on the iOS app

1. Open PocketSOC on your iPhone.
2. If you're already signed in, the app automatically refreshes configurations.
3. You should see detections from your CrowdStrike environment in the Detections feed.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| No detections appear | Verify the API client has the correct scopes. Check that the base URL matches your cloud. |
| "Unauthorized" error | The Client Secret may be incorrect. Create a new API client and update the config. |
| Wrong cloud URL | Update the base URL in the portal Settings. The app picks up changes on next refresh. |

## Rotating credentials

To rotate your CrowdStrike API credentials:

1. Create a new API client in the Falcon console.
2. Update the Client ID and Secret in the portal Settings.
3. The iOS app picks up the new credentials on next sync.
4. Delete the old API client in the Falcon console.

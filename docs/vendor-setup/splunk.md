# Splunk Setup

Connect PocketSOC to Splunk so that your saved search alerts are delivered as push notifications to your team's devices.

## How it works

Unlike other vendors where PocketSOC polls an API for detections, Splunk integration uses a **webhook**. When a Splunk saved search fires an alert, Splunk sends a webhook to PocketSOC, which delivers a push notification to on-call devices. Your team can then open the PocketSOC app and view the triggered alert results directly from Splunk.

## Prerequisites

- A Splunk Cloud instance (Platform 9.x+ or Classic 8.2+)
- Admin access to create saved searches and webhook alert actions
- A Splunk **authentication token** with `list_fired_alerts` and `search` permissions (for the mobile app to retrieve alert results)
- A PocketSOC **Enterprise** plan (Splunk integration is an Enterprise feature)

::: info
On-premises Splunk Enterprise is not currently supported. The Splunk REST API must be internet-accessible for the mobile app to retrieve triggered alert results.
:::

## Step 1: Get your webhook URL from PocketSOC

1. Go to [portal.pocketsoc.com](https://portal.pocketsoc.com) > **Settings**.
2. Under **Vendor Configurations**, click **Add Configuration**.
3. Select **Splunk** as the vendor.
4. Fill in the fields:

| Field | Value |
|-------|-------|
| **Display Name** | A friendly name (e.g., "Splunk Cloud Production") |
| **Base URL** | Your Splunk Cloud search head URL (e.g., `https://mycompany.splunkcloud.com`) |
| **Auth Type** | Token |
| **Auth Token** | Your Splunk authentication token (see Step 2) |

5. Click **Save**.
6. Copy the **Webhook URL** shown after saving — you'll need this for Step 3.

## Step 2: Create an authentication token in Splunk

PocketSOC needs a Splunk auth token so the mobile app can retrieve triggered alert results when your team taps on a notification.

1. In Splunk Cloud, go to **Settings** > **Tokens** (under **Users and Authentication**).
2. Click **New Token**.
3. Configure the token:

| Setting | Value |
|---------|-------|
| **User** | Select a user with access to the saved searches you want to alert on |
| **Audience** | `PocketSOC` (or any descriptive name) |
| **Expiration** | Set based on your security policy (e.g., 90 days, 1 year, or no expiration) |

4. Click **Create**.
5. Copy the token value — this goes into the PocketSOC portal configuration (Step 1, Auth Token field).

::: warning
The token is only shown once. Store it securely. If you lose it, create a new token and update the PocketSOC portal configuration.
:::

### Required capabilities

The token's user account needs these Splunk capabilities:

| Capability | Why |
|------------|-----|
| `list_fired_alerts` | Allows PocketSOC to list triggered alerts for the saved search |
| `search` | Allows PocketSOC to retrieve the search results (SID) from a triggered alert |

Most Splunk roles (including `user` and `power`) include these by default.

## Step 3: Configure a webhook alert action in Splunk

For each saved search you want to send to PocketSOC, add a webhook alert action:

1. In Splunk Cloud, find your saved search under **Search & Reporting** > **Alerts**.
2. Click **Edit** > **Edit Alert**.
3. Under **Trigger Actions**, click **Add Actions** > **Webhook**.
4. Paste the **Webhook URL** from Step 1.
5. Click **Save**.

That's it — the next time this saved search triggers, PocketSOC will deliver a push notification to your on-call team members.

::: tip
You can add the webhook action to as many saved searches as you want. Each one will generate its own push notification when triggered.
:::

### Recommended saved search settings

For the best experience with PocketSOC, we recommend these settings on your alerting saved searches:

| Setting | Recommended Value | Why |
|---------|-------------------|-----|
| `alert.track` | `true` | Ensures triggered alerts are tracked so PocketSOC can retrieve results |
| `alert.expires` | `7d` | Increases retention from default 24h, giving your team more time to review |
| `dispatch.earliest_time` | `-15m` or appropriate window | Controls the time range each search covers |

These can be set in the saved search editor or directly in `savedsearches.conf`.

## Step 4: Verify on the mobile app

1. Trigger a test alert from your Splunk saved search (or wait for a real one).
2. You should receive a push notification on your device.
3. Tap the notification to open PocketSOC and view the triggered alert details from Splunk.

::: tip
Enterprise customers can also forward PocketSOC audit logs **to** Splunk via HEC. See [Audit Log > Splunk HEC forwarding](/portal/audit-log#splunk-hec-forwarding) for setup instructions.
:::

## Troubleshooting

| Issue | Solution |
|-------|----------|
| No push notification received | Verify the webhook URL is correct in Splunk. Check that `alert.track` is enabled on the saved search. |
| "Unauthorized" in mobile app when viewing alert | The Splunk auth token may have expired. Create a new token and update the vendor config in the portal. |
| Alert results show "No results" | The triggered alert may have expired. Increase `alert.expires` on the saved search. |
| Webhook not received by PocketSOC | Check Splunk's outbound firewall rules. The webhook must be able to reach `push.pocketsoc.com` over HTTPS. |
## Rotating credentials

1. Create a new token in Splunk (Settings > Tokens).
2. Update the auth token in the PocketSOC portal vendor configuration.
3. Delete the old token in Splunk.

## Supported Splunk versions

| Platform | Minimum Version | Notes |
|----------|----------------|-------|
| Splunk Cloud (Platform) | 9.x+ | Fully supported |
| Splunk Cloud Classic | 8.2+ | Fully supported |
| Splunk Enterprise (on-prem) | — | Not supported (requires internet-accessible REST API) |

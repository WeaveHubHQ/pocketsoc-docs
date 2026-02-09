# Vendor Setup Overview

PocketSOC connects to your security vendor's API to pull detection data. You configure these connections in the portal as **vendor configurations**.

## Supported vendors

| Vendor | Products | Auth Methods |
|--------|----------|-------------|
| **CrowdStrike** | Falcon Endpoint Protection | OAuth2 (API client credentials) |
| **Microsoft Defender** | Defender for Endpoint | OAuth2 (app permissions) or Delegated auth |

## Adding a vendor configuration

1. Go to **Settings** in the portal.
2. Under **Vendor Configurations**, click **Add Configuration**.
3. Select your vendor.
4. Fill in the required fields (see vendor-specific guides below).
5. Click **Save**.

You can add multiple vendor configurations — for example, a CrowdStrike production environment and a staging environment, or both CrowdStrike and Defender.

## Vendor-specific guides

- [CrowdStrike](/vendor-setup/crowdstrike) — Create an API client in the Falcon console
- [Microsoft Defender](/vendor-setup/defender) — Register an app in Azure AD

## How configurations are delivered to devices

When a team member signs into the iOS app, the app automatically pulls the vendor configurations assigned to them:

- If your organization uses **groups**, each user only receives configs assigned to their groups
- If you **don't use groups**, every user receives all configs

API credentials are encrypted at rest and transmitted securely to devices over HTTPS.

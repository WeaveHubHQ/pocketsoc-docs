# Microsoft Defender Setup

Connect PocketSOC to Microsoft Defender for Endpoint to view security alerts on your iPhone.

## Prerequisites

- A Microsoft Defender for Endpoint subscription (P1 or P2)
- Access to the [Azure portal](https://portal.azure.com) with permissions to register applications
- Your Azure AD tenant ID

## Authentication methods

PocketSOC supports two authentication methods for Defender:

| Method | Best for | Description |
|--------|----------|-------------|
| **App permissions (OAuth)** | Most teams | Application-level access, no user context needed |
| **Delegated** | Orgs requiring user-scoped access | Accesses data on behalf of a signed-in user |

We recommend **App permissions** for most deployments.

## Step 1: Register an application in Azure AD

1. Go to [Azure Portal](https://portal.azure.com) > **Azure Active Directory** > **App registrations**.
2. Click **New registration**.
3. Set the name to `PocketSOC`.
4. For **Supported account types**, select **Accounts in this organizational directory only**.
5. Click **Register**.
6. Copy the **Application (client) ID** and **Directory (tenant) ID** from the Overview page.

## Step 2: Configure API permissions

### For App permissions (recommended)

1. Go to **API permissions** > **Add a permission**.
2. Select **APIs my organization uses** and search for **WindowsDefenderATP**.
3. Select **Application permissions**.
4. Add the following permissions:

| Permission | Description |
|-----------|-------------|
| `Alert.Read.All` | Read all alerts |
| `Alert.ReadWrite.All` | Update alert status and close alerts |
| `Machine.Read.All` | Read all machine information |
| `Machine.Isolate` | Isolate and unisolate machines |
| `Machine.ReadWrite.All` | Read machine actions and cancel pending actions |
| `AdvancedQuery.Read.All` | Run advanced queries |

5. Click **Grant admin consent for [your tenant]**.

### For Delegated permissions

1. Follow the same steps but select **Delegated permissions** instead.
2. Add:
   - `Alert.Read`
   - `Alert.ReadWrite`
   - `Machine.Read`
   - `Machine.Isolate`
   - `Machine.ReadWrite`
3. Grant admin consent.

## Step 3: Create a client secret (App permissions only)

If you chose **App permissions** in Step 2, create a client secret:

1. Go to **Certificates & secrets** > **Client secrets** > **New client secret**.
2. Add a description (e.g., `PocketSOC`) and choose an expiration.
3. Click **Add**.
4. Copy the **secret value** immediately — it is only shown once.

::: warning
Note the expiration date. You will need to rotate the secret before it expires. Set a calendar reminder.
:::

::: info
If you chose **Delegated permissions**, you do not need a client secret. The user will authenticate interactively when connecting in the iOS app.
:::

## Step 4: Add the configuration in PocketSOC

1. Go to [portal.pocketsoc.com](https://portal.pocketsoc.com) > **Settings**.
2. Under **Vendor Configurations**, click **Add Configuration**.
3. Fill in the fields:

| Field | Value |
|-------|-------|
| **Vendor** | Microsoft Defender |
| **Display Name** | A friendly name (e.g., "Defender for Endpoint"). This is shown on each detection in the iOS app to identify which vendor source it came from. |
| **Base URL** | `https://api.securitycenter.microsoft.com` |
| **Auth Type** | OAuth (for app permissions) or Delegated |
| **Client ID** | Application (client) ID from Step 1 |
| **Client Secret** | Secret value from Step 3 |
| **Tenant ID** | Directory (tenant) ID from Step 1 |

4. Click **Save**.

<!-- ![Defender vendor config form](/images/portal-defender-config.png) -->

## Step 5: Verify on the iOS app

1. Open PocketSOC on your iPhone.
2. The app automatically pulls the updated configuration.
3. Detections from Defender for Endpoint should appear in the Detections feed.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| No detections appear | Verify API permissions are granted and admin consent was given |
| "Unauthorized" error | Check Client ID, Secret, and Tenant ID. Ensure the secret hasn't expired. |
| "Forbidden" error | The app registration may be missing required permissions. Check the API permissions in Azure AD. |

## Rotating credentials

1. Create a new client secret in Azure AD.
2. Update the Client Secret in the portal Settings.
3. Delete the old secret in Azure AD after confirming the new one works.

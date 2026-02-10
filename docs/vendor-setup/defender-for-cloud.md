# Microsoft Defender for Cloud Setup

Connect PocketSOC to Microsoft Defender for Cloud to view cloud security alerts on your iPhone.

## Prerequisites

- A Microsoft Azure subscription with [Defender for Cloud](https://learn.microsoft.com/en-us/azure/defender-for-cloud/defender-for-cloud-introduction) enabled
- Access to the [Azure portal](https://portal.azure.com) with permissions to register applications and manage role assignments
- Your Azure AD **Tenant ID** and **Subscription ID**

## Authentication methods

PocketSOC supports two authentication methods for Defender for Cloud:

| Method | Best for | Description |
|--------|----------|-------------|
| **Delegated** | Individual analysts | Accesses alerts on behalf of the signed-in user via interactive login |
| **App permissions (OAuth)** | Shared team access | Application-level access using client credentials, no user sign-in needed |

We recommend **Delegated** for most deployments — it provides user-scoped access and doesn't require a client secret.

## Step 1: Register an application in Azure AD

1. Go to [Azure Portal](https://portal.azure.com) > **Microsoft Entra ID** > **App registrations**.
2. Click **New registration**.
3. Set the name to `PocketSOC`.
4. For **Supported account types**, select **Accounts in this organizational directory only**.
5. Leave the Redirect URI blank for now (we'll configure it in the next step for delegated auth).
6. Click **Register**.
7. Copy the **Application (client) ID** and **Directory (tenant) ID** from the Overview page.

## Step 2: Configure the platform (Delegated auth only)

If you are using **delegated auth**, you need to add a redirect URI so the iOS app can complete the interactive sign-in flow.

1. In your app registration, go to **Authentication** > **Add a platform**.
2. Select **Mobile and desktop applications**.
3. Under **Custom redirect URIs**, enter:
   ```
   pocketsoc://auth
   ```
4. Click **Configure**.

::: warning
The redirect URI must be exactly `pocketsoc://auth`. Without it, the interactive sign-in from the iOS app will fail.
:::

::: info
If you are using **App permissions** (client credentials), you can skip this step — no redirect URI is needed.
:::

## Step 3: Configure API permissions

Defender for Cloud uses the **Azure Resource Manager (ARM)** API, not a dedicated security API like Defender for Endpoint.

### For Delegated permissions (recommended)

1. In your app registration, go to **API permissions** > **Add a permission**.
2. Select **APIs my organization uses** and search for **Windows Azure Service Management** (or select it from the list under **Azure Service Management**).
3. Select **Delegated permissions**.
4. Check the following permission:

| Permission | Description |
|-----------|-------------|
| `user_impersonation` | Access Azure Service Management as the signed-in user |

5. Click **Add permissions**.
6. Click **Grant admin consent for [your tenant]**.

### For App permissions (client credentials)

No API permissions need to be added in the app registration. For client credentials, access to Defender for Cloud is controlled entirely through the **Azure RBAC role** assigned in the next step.

::: info
Unlike Defender for Endpoint (which uses granular scopes like `Alert.Read.All`), Defender for Cloud is part of the Azure Resource Manager API. For delegated auth, the `user_impersonation` scope grants ARM access. For app permissions, the RBAC role on the subscription is what authorizes access.
:::

## Step 4: Assign Azure RBAC roles

The user or application must have the appropriate role on the subscription to read and manage alerts.

1. Go to **Subscriptions** > select your subscription > **Access control (IAM)**.
2. Click **Add** > **Add role assignment**.
3. Assign one of the following roles:

| Role | Capabilities |
|------|-------------|
| **Security Reader** | View alerts (read-only) |
| **Security Admin** | View alerts, change alert status (dismiss, resolve, activate) |

::: warning
**Security Reader** only allows viewing alerts. To change alert statuses from PocketSOC (dismiss, resolve, reactivate), the **Security Admin** role is required.
:::

### For Delegated auth

Assign the role to the **user** who will sign in via PocketSOC.

### For App permissions

Assign the role to the **application** (service principal) you registered in Step 1. When adding the role assignment, switch to the **Members** tab, select **User, group, or service principal**, and search for your app name (`PocketSOC`).

## Step 5: Create a client secret (App permissions only)

If you chose **App permissions**, create a client secret:

1. Go to **App registrations** > your app > **Certificates & secrets** > **Client secrets** > **New client secret**.
2. Add a description (e.g., `PocketSOC`) and choose an expiration.
3. Click **Add**.
4. Copy the **secret value** immediately — it is only shown once.

::: warning
Note the expiration date. You will need to rotate the secret before it expires. Set a calendar reminder.
:::

::: info
If you chose **Delegated permissions**, you do not need a client secret. The user will authenticate interactively when connecting in the iOS app.
:::

## Step 6: Find your Subscription ID

1. Go to [Azure Portal](https://portal.azure.com) > **Subscriptions**.
2. Select the subscription that has Defender for Cloud enabled.
3. Copy the **Subscription ID** from the Overview page.

::: tip
If you have multiple subscriptions with Defender for Cloud, you can create a separate PocketSOC profile for each one.
:::

## Step 7: Add the configuration in PocketSOC

### Option A: Via the portal (team deployment)

1. Go to [portal.pocketsoc.com](https://portal.pocketsoc.com) > **Settings**.
2. Under **Vendor Configurations**, click **Add Configuration**.
3. Fill in the fields:

| Field | Value |
|-------|-------|
| **Vendor** | Defender for Cloud |
| **Display Name** | A friendly name (e.g., "Azure Production"). This is shown on each detection in the iOS app to identify which vendor source it came from. |
| **Auth Type** | Delegated (recommended) or OAuth |
| **Tenant ID** | Directory (tenant) ID from Step 1 |
| **Subscription ID** | Subscription ID from Step 6 |
| **Application ID** | Application (client) ID from Step 1 |
| **Client Secret** | Secret value from Step 5 (App permissions only) |

4. Click **Save**.

### Option B: Directly on the iOS app

1. Open PocketSOC on your iPhone.
2. Go to **Settings** > **Profiles** > **Add Profile**.
3. Select **Defender for Cloud**.
4. Enter the same fields as above.
5. Tap **Connect**. For delegated auth, you will be prompted to sign in via Microsoft.

## Step 8: Verify on the iOS app

1. Open PocketSOC on your iPhone.
2. If using delegated auth, you will see a Microsoft sign-in prompt the first time.
3. Detections from Defender for Cloud should appear in the Detections feed.
4. Cloud alerts display the provider as **Azure** and show cloud-specific fields like affected resources, entities, and extended properties.

## Alert statuses

Defender for Cloud uses different status names than other vendors:

| PocketSOC Status | Azure Status | Description |
|-----------------|-------------|-------------|
| Active | Active | New alert, not yet reviewed |
| In Progress | In Progress | Alert is being investigated |
| Dismissed | Dismissed | False positive or not relevant |
| Resolved | Resolved | True positive, remediated |

You can change alert statuses from PocketSOC and they will be reflected in the Azure portal. Only transitions allowed by Azure will take effect — for example, a Resolved alert can only be set back to Active.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| No detections appear | Verify Defender for Cloud is enabled on your subscription and has generated alerts. Check that the user or app has the Security Reader or Security Admin role. |
| "Unauthorized" error | Check Tenant ID, Subscription ID, and Application ID. For delegated auth, ensure admin consent was granted. |
| "Forbidden" error | The user or app may be missing the required Azure RBAC role. Assign Security Reader or Security Admin on the subscription. |
| Status changes don't reflect in Azure | Ensure the user or app has the **Security Admin** role (not just Security Reader). |
| Interactive login fails | Verify the redirect URI is set to `pocketsoc://auth` in the app registration. |
| No alerts after connecting | Generate sample alerts: Azure Portal > Defender for Cloud > Security alerts > **Sample alerts**. |

## Rotating credentials

### App permissions

1. Create a new client secret in the Azure portal app registration.
2. Update the Client Secret in the portal Settings or iOS app profile.
3. Delete the old secret in Azure AD after confirming the new one works.

### Delegated auth

No credential rotation is needed — the user re-authenticates interactively when the token expires.

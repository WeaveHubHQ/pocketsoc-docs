# Quick Start

Get your team up and running with PocketSOC in under 10 minutes.

## Step 1: Create your organization

1. Visit [portal.pocketsoc.com](https://portal.pocketsoc.com) and click **Sign In**.
2. Create an account using email/password or a passkey.
3. A new organization is automatically created for you with a **Free** plan (2 devices).

<!-- ![Portal sign-in page](/images/portal-sign-in.png) -->

## Step 2: Add a vendor configuration

1. In the portal, go to **Settings**.
2. Under **Vendor Configurations**, click **Add Configuration**.
3. Select your vendor (CrowdStrike or Microsoft Defender).
4. Enter your API credentials — see [CrowdStrike Setup](/vendor-setup/crowdstrike) or [Defender Setup](/vendor-setup/defender) for details.
5. Click **Save**.

<!-- ![Add vendor configuration](/images/portal-add-vendor.png) -->

## Step 3: Install the iOS app

1. Download **PocketSOC** from the App Store.
2. Open the app and tap **Sign in with Portal**.
3. Sign in with the same account you used in the portal.
4. The app automatically pulls your vendor configuration and connects.

<!-- ![iOS sign-in flow](/images/ios-sign-in.png) -->

## Step 4: Invite your team

1. In the portal, go to **Team**.
2. Click **Invite Member** and enter their email address.
3. Choose a role: **Admin** (full access) or **Member** (view-only in portal).
4. They receive an email invitation to join your organization.

## Step 5: Verify it works

Once signed in on the iOS app, you should see your detections feed populate with alerts from your vendor. Pull down to refresh. If your CrowdStrike or Defender environment has active detections, they will appear immediately.

::: tip
If you don't see any detections, verify your API credentials in the portal Settings page. Check that the API key has the correct scopes — see the vendor setup guides for required permissions.
:::

## Optional: Upgrade your plan

The Free plan supports up to 2 devices. If you need more:

- **Pro** ($29/month) — Up to 10 devices
- **Enterprise** ($599/month) — Unlimited devices, SSO support

See [Plans & Pricing](/plans) for details.

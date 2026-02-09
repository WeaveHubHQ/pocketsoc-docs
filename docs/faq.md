# FAQ & Troubleshooting

## General

### What vendors does PocketSOC support?
Currently, PocketSOC supports **CrowdStrike Falcon** and **Microsoft Defender for Endpoint**. Support for additional vendors is planned.

### Can I connect to multiple vendors at the same time?
Yes. You can add multiple vendor configurations in the portal. Use the profile switcher in the iOS app to switch between them. If you have multiple profiles, you can also use [groups](/portal/groups) to control which profiles are available to which team members.

### Does PocketSOC store my detection data?
No. PocketSOC fetches detections directly from your vendor's API in real-time. Detection data is displayed in the app but is not stored on PocketSOC servers.

### Can I use PocketSOC with multiple organizations?
Yes, but one at a time. To switch organizations, sign out and sign back in with an account associated with the other organization. Your device registration is preserved in both organizations.

## Portal

### I forgot my password
Click **Sign In** at [portal.pocketsoc.com](https://portal.pocketsoc.com) and use the **Forgot password** link on the login page.

### I can't invite team members
Only **Admin** users can send invitations. Check your role on the Team page. If you're a Member, ask an admin to send the invitation.

### A team member's invitation expired
Invitations expire after 7 days. Cancel the expired invitation and send a new one from the Team page.

### I accidentally removed a team member
Re-invite them from the Team page. They will need to accept the new invitation. Note that their previous device registrations were deactivated when they were removed — they will need to sign in again on their device.

## iOS App

### The app shows "No detections"
This could mean:
1. Your vendor environment has no active detections (good news!)
2. Your vendor configuration may be incorrect — check credentials in the portal Settings
3. Your API key may not have the required scopes — see the [vendor setup guides](/vendor-setup/)
4. Try pulling down to refresh

### "Device deactivated" error
Your admin has deactivated your device. Contact them to reactivate it from the portal Devices page.

### "Device limit reached" error
Your organization has hit its plan's device limit. Ask your admin to either:
- Deactivate an unused device
- Upgrade the plan

### The app won't connect after signing in
1. Check your internet connection
2. Verify the vendor configuration in the portal — the base URL and credentials must be correct
3. Try signing out and signing back in

### How do I enable Face ID / Touch ID?
Go to **Settings > Security** and enable **Require biometric unlock**.

### Detections are outdated / not refreshing
Pull down on the Detections screen to force a refresh. If detections still appear stale:
- Check your internet connection
- Verify the vendor API is accessible (try logging into CrowdStrike/Defender directly)
- Sign out and sign back in to re-sync your profile

### How do I stop receiving push notifications?
Either toggle off **Push Notifications** in PocketSOC Settings, or disable notifications for PocketSOC in **iOS Settings > Notifications**.

## Vendor-specific

### CrowdStrike: Which cloud am I on?
Check the URL when logged into the Falcon console:
- `falcon.crowdstrike.com` → US-1
- `falcon.us-2.crowdstrike.com` → US-2
- `falcon.eu-1.crowdstrike.com` → EU-1
- `falcon.laggar.gcw.crowdstrike.com` → US-GOV-1

### Defender: "Forbidden" when fetching detections
Ensure you granted **admin consent** for the API permissions in Azure AD. Without admin consent, the app registration's permissions are not effective.

### Defender: Client secret expired
Create a new client secret in Azure AD and update it in the portal Settings. Set a calendar reminder for the next expiration.

## Billing

### How do I cancel my subscription?
Go to **Settings > Manage Billing** in the portal to open the Stripe customer portal, then cancel your subscription. Your plan remains active until the end of the billing period.

### I need an invoice
Enterprise customers can request invoice billing. Contact support to set this up.

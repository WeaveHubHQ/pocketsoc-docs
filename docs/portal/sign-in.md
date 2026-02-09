# Portal Sign In

PocketSOC provides a secure login experience with support for multiple authentication methods.

## Supported authentication methods

- **Email and password** — Standard email/password login with email verification
- **Passkeys** — Biometric or hardware key authentication (WebAuthn)
- **Multi-factor authentication (MFA)** — TOTP authenticator app codes
- **SSO (SAML/OIDC)** — Available on the Enterprise plan for organizations that use Okta, Azure AD, Google Workspace, or other identity providers

## Signing in

1. Go to [portal.pocketsoc.com](https://portal.pocketsoc.com).
2. Click **Sign In** — you will be redirected to the login page.
3. Enter your email and password, or use a passkey. Enterprise plan customers can also sign in with their company SSO provider.
4. After authentication, you are redirected back to the portal.

<!-- ![Login screen](/images/portal-login.png) -->

## First-time sign in

If you sign in for the first time without an invitation:

- A new organization is automatically created for you
- You become the **Admin** of that organization
- Your organization starts on the **Free** plan (2 devices)

If you were invited to an organization, you will be added to that organization with the role your admin selected.

## Session duration

Your portal session lasts 30 minutes. After that, you will be prompted to sign in again.

## Signing out

Click your profile icon in the top-right corner of the portal and select **Sign Out**.

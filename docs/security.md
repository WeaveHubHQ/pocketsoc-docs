# Security & Privacy

PocketSOC is designed to handle sensitive security data. Here's how we protect your information.

## Data encryption

### At rest
All sensitive data stored on PocketSOC servers is encrypted using **AES-256-GCM** field-level encryption. This includes:

- Vendor API credentials (Client IDs, Client Secrets, Tenant IDs)
- User email addresses
- Device identifiers

Each field is encrypted individually with its own initialization vector (IV). Encrypted fields cannot be read even with direct database access.

### In transit
All communication between the iOS app, the portal, and PocketSOC servers uses **HTTPS/TLS**. API credentials are never transmitted in plaintext.

### On device
- Portal authentication tokens are stored in the iOS **Keychain** (hardware-encrypted storage)
- Vendor API credentials are transmitted to the device only when needed and are not persisted in plaintext
- Biometric unlock (Face ID / Touch ID) can be enabled for additional on-device protection

## Authentication

PocketSOC supports multiple authentication methods:

- **Email/password** with email verification
- **Passkeys** (WebAuthn/FIDO2)
- **Multi-factor authentication** (TOTP)
- **SSO (SAML/OIDC)** for Enterprise plan customers

Sessions are implemented using signed JWTs with 30-minute expiration. Tokens are verified using HMAC-SHA256 signatures on every API request.

## Multi-tenancy

PocketSOC is a multi-tenant system. Every database query is scoped to your organization ID, ensuring:

- Your data is completely isolated from other organizations
- Users can only access data belonging to their own organization
- Vendor credentials from one organization are never accessible to another

## Blind indexing

To support lookups on encrypted data (e.g., finding a user by email), PocketSOC uses **HMAC-SHA256 blind indexes**. These are one-way hashes that allow the system to locate records without storing or comparing plaintext values.

## API credential security

Vendor API credentials (CrowdStrike Client Secret, Defender Client Secret) are:

1. Encrypted with AES-256-GCM before storage
2. Encrypted with a separate key during transit to devices
3. Never logged or included in error messages
4. Only decrypted in-memory when making API calls to your vendor

## Device deactivation

If a device is lost or stolen, admins can immediately **deactivate** it from the portal. A deactivated device:

- Cannot fetch detections
- Cannot receive push notifications
- Cannot access vendor API credentials
- Receives a "device deactivated" error on next sync attempt

## Responsible disclosure

If you discover a security vulnerability in PocketSOC, please contact us at security@pocketsoc.com.

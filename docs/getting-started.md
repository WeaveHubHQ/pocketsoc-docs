# What is PocketSOC?

PocketSOC is a mobile security operations center for iOS. It connects to your existing CrowdStrike Falcon or Microsoft Defender environment and lets your security team view, triage, and respond to detections from their iPhone.

## How it works

1. **Portal** — An admin creates an organization at [portal.pocketsoc.com](https://portal.pocketsoc.com) and configures vendor API credentials (CrowdStrike or Defender).
2. **iOS App** — Team members install PocketSOC from the App Store, sign in with their portal account, and immediately see live detections.
3. **Groups** — Admins can organize team members into groups and assign specific vendor profiles to each group, controlling who sees what.
4. **Notifications** — The app registers for push notifications so new detections arrive instantly.

## Key features

| Feature | Description |
|---------|-------------|
| **Detections feed** | Scrollable list of alerts with severity, status, hostname, and timestamp |
| **Detection detail** | Full alert details including MITRE ATT&CK tactics, assigned user, and comments |
| **Process graph** | Interactive process tree showing parent/child relationships and command lines |
| **Bulk actions** | Assign, close, or update status on multiple detections at once |
| **Profiles** | Switch between multiple vendor connections (e.g., CrowdStrike prod + staging) |
| **Push notifications** | Real-time alerts delivered to your device |
| **On-call schedules** | Configure notification windows so you only get alerts during your on-call hours |
| **MDM support** | Deploy and configure PocketSOC via your MDM solution |

## Requirements

- iPhone running iOS 17.0 or later
- A CrowdStrike Falcon or Microsoft Defender for Endpoint subscription
- API credentials with read access (see [Vendor Setup](/vendor-setup/))

## Next steps

- [Quick Start](/quick-start) — Set up your organization in under 10 minutes
- [Portal Guide](/portal/) — Learn about all portal features
- [Vendor Setup](/vendor-setup/) — Configure your CrowdStrike or Defender API credentials

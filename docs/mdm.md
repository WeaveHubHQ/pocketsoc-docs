# MDM Deployment

PocketSOC supports deployment and configuration via Mobile Device Management (MDM) solutions like Jamf, Intune, or Mosyle.

## Managed app configuration

When deployed via MDM, PocketSOC reads configuration values from the managed app configuration dictionary. Administrators can enforce the following policies:

| Key | Type | Description |
|-----|------|-------------|
| `screenRecordingProtectionEnabled` | Boolean | Prevents screenshots and screen recordings within the app |
| `inactivityTimeoutMinutes` | Integer | Auto-locks the app after the specified minutes of inactivity (0 = disabled) |
| `demoModeDisabled` | Boolean | Prevents users from using Demo Mode |

## How it looks in the app

When the app detects it is managed by MDM, the Settings screen displays an **"This app is managed by your organization"** banner showing which policies are active:

- Screen recording protection status (enabled/disabled)
- Inactivity timeout configuration
- Demo mode availability

## Deploying via Jamf

1. Upload PocketSOC to your Jamf Pro App Catalog or assign it via Apple Business Manager.
2. Create a **Managed App Configuration** plist:

```xml
<dict>
    <key>screenRecordingProtectionEnabled</key>
    <true/>
    <key>inactivityTimeoutMinutes</key>
    <integer>15</integer>
    <key>demoModeDisabled</key>
    <true/>
</dict>
```

3. Assign the configuration to your target devices/groups.
4. Deploy.

## Deploying via Intune

1. Add PocketSOC as a managed iOS app in Intune.
2. Under **App configuration policies**, create a new policy.
3. Add the configuration keys listed above.
4. Assign to your device groups.

## Notes

- MDM configuration is read on app launch and when the app returns to the foreground
- Users cannot override MDM-enforced policies
- MDM configuration does not replace portal sign-in — users still need to authenticate through the portal to access vendor data

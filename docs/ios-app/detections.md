# Detections

The Detections screen is the main view of the PocketSOC app. It shows a live feed of security alerts from your connected vendor(s).

## Detection feed

Each detection in the feed shows:

- **Severity badge** — Critical, High, Medium, Low, or Informational
- **Detection name** — The alert title from your vendor
- **Hostname** — The affected machine
- **Timestamp** — When the detection occurred
- **Status** — New, In Progress, True Positive, False Positive, etc.
- **Vendor badge** — Which vendor reported the detection (CrowdStrike or Defender)

<!-- ![Detections feed](/images/ios-detections-feed.png) -->

## Filtering

Tap the **filter bar** at the top to filter detections by:

- **Severity** — Show only Critical/High, Medium, etc.
- **Status** — Filter by detection status
- **Product** — Filter by vendor (useful if you have multiple configurations)
- **Time range** — Last 24 hours, 7 days, 30 days, etc.

Active filters are shown as chips in the filter bar. Tap a chip to remove it.

## Pull to refresh

Pull down on the detections list to fetch the latest alerts from your vendor's API.

## Detection detail

Tap any detection to open the full detail view:

- **Summary** — Full description, severity, status, and assigned user
- **MITRE ATT&CK** — Tactics and techniques associated with the detection
- **Affected host** — Machine name, IP address, OS, and last seen time
- **Timeline** — Key events in the detection lifecycle
- **Process Graph** — Visual process tree (see [Process Graph](/ios-app/process-graph))

<!-- ![Detection detail](/images/ios-detection-detail.png) -->

## Swipe actions

Swipe left on a detection in the feed to access quick actions:

- **Assign** — Assign the detection to a team member (CrowdStrike only)
- **Status** — Change the detection status
- **Containment** — Isolate or lift isolation on the affected host
- **Close** — Close the detection with a reason

## Host containment

From the detection detail view, you can isolate the affected host to prevent lateral movement during an active incident:

- **Isolate** — Network-isolates the machine, blocking all connections except to the vendor management console
- **Lift isolation** — Restores normal network connectivity once the threat is resolved

The current isolation state is displayed on the detection detail. States include:

| State | Meaning |
|-------|---------|
| **Not isolated** | Host has normal network access |
| **Isolating** | Isolation is in progress |
| **Isolated** | Host is network-isolated |
| **Lifting** | Isolation is being removed |

::: warning
Host isolation is a disruptive action. The isolated machine will lose network connectivity except to the vendor management console. Coordinate with the affected user before isolating.
:::

## Bulk actions

1. Tap the **checkmark icon** in the toolbar to enter selection mode.
2. Select multiple detections by tapping them.
3. Use the toolbar actions to **Assign**, **Update Status**, **Contain/Lift Isolation**, or **Close** all selected detections at once.

## Profile switcher

If you have access to multiple vendor profiles, tap the profile icon in the top-left corner of the toolbar to switch between them. The detection feed refreshes to show alerts from the selected profile.

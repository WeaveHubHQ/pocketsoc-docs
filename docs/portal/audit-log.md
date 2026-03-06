# Audit Log

The **Audit Log** page provides a chronological record of all administrative actions taken in your organization. This page is visible to admins only.

## What is logged

Every significant action in your organization is recorded:

| Event | Description |
|-------|-------------|
| **User invited** | A team member invitation was sent |
| **User joined** | A team member accepted their invitation |
| **User removed** | A team member was removed from the organization |
| **Role changed** | A team member's role was updated |
| **Device registered** | A new device was registered |
| **Device deactivated** | A device was deactivated |
| **Device activated** | A device was reactivated |
| **Vendor config created** | A vendor configuration was added |
| **Vendor config updated** | A vendor configuration was modified |
| **Vendor config deleted** | A vendor configuration was removed |
| **Group created** | A group was created |
| **Group updated** | A group's name or description was changed |
| **Group deleted** | A group was deleted |
| **Member added to group** | A team member was added to a group |
| **Member removed from group** | A team member was removed from a group |
| **Config assigned to group** | A vendor config was assigned to a group |
| **Config unassigned from group** | A vendor config was removed from a group |
| **Plan changed** | The organization's billing plan changed |
| **Organization claimed** | A new admin claimed an auto-created organization |

## Viewing the audit log

1. Go to **Audit Log** from the sidebar.
2. Events are listed newest-first.
3. Use the **event type** filter to narrow results.
4. Each entry shows the timestamp, event type, user who performed the action, and relevant details.

## Splunk HEC forwarding

Enterprise customers can forward PocketSOC audit logs to Splunk using HTTP Event Collector (HEC). This sends all portal activity (user sign-ins, config changes, device registrations) to a Splunk index for compliance and monitoring.

### Setup

1. In Splunk Cloud, go to **Settings** > **Data Inputs** > **HTTP Event Collector**.
2. Click **New Token** and configure:

| Setting | Value |
|---------|-------|
| **Name** | `PocketSOC Audit Logs` |
| **Source type** | `_json` |
| **Index** | Choose an index (e.g., `main` or a dedicated `pocketsoc` index) |

3. Copy the **HEC token** and **HEC URL** (typically `https://http-inputs-<your-instance>.splunkcloud.com:443/services/collector`).
4. In the PocketSOC portal, go to **Settings** > **Splunk Forwarding**.
5. Enter the HEC URL and token, then click **Test Connection** to verify.
6. Enable forwarding.

PocketSOC will forward new audit log entries to Splunk every minute.

### Troubleshooting

| Issue | Solution |
|-------|----------|
| HEC forwarding errors in portal | Verify the HEC URL uses HTTPS and the HEC token is valid. Use **Test Connection** to diagnose. |
| Events not appearing in Splunk | Check that the target index exists and the HEC token has write access to it. |
| Token rotation | Create a new HEC token in Splunk, update it in PocketSOC portal (Settings > Splunk Forwarding), then delete the old token. |

## Retention

Audit log entries are retained indefinitely for your organization.

# AWS GuardDuty Setup

Connect PocketSOC to AWS GuardDuty to view threat detection findings from your AWS environment on your iPhone.

## Prerequisites

- An AWS account with [GuardDuty](https://aws.amazon.com/guardduty/) enabled in at least one region
- Access to the [AWS Management Console](https://console.aws.amazon.com) with permissions to create IAM users or access keys
- The AWS **region** where GuardDuty is active

## Step 1: Create an IAM user for PocketSOC

PocketSOC authenticates to AWS using an access key and secret. The recommended approach is to create a dedicated IAM user with read-only GuardDuty permissions.

1. Go to [AWS Console](https://console.aws.amazon.com) > **IAM** > **Users** > **Create user**.
2. Set the user name to `PocketSOC`.
3. Do **not** enable console access — PocketSOC only needs programmatic (API) access.
4. Click **Next**.

## Step 2: Attach permissions

On the **Set permissions** page:

1. Select **Attach policies directly**.
2. Search for and select the following AWS managed policy:

| Policy | Description |
|--------|-------------|
| **AmazonGuardDutyReadOnlyAccess** | View detectors and findings (read-only) |

::: tip
If you also want to **archive and unarchive findings** from PocketSOC, use a custom inline policy instead. See [Step 2b](#step-2b-custom-policy-for-archive-unarchive) below.
:::

3. Click **Next**, then **Create user**.

### Step 2b: Custom policy for archive/unarchive

If you want to close (archive) or reopen (unarchive) findings from PocketSOC, create a custom policy with these permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "guardduty:ListDetectors",
        "guardduty:ListFindings",
        "guardduty:GetFindings",
        "guardduty:ArchiveFindings",
        "guardduty:UnarchiveFindings"
      ],
      "Resource": "*"
    }
  ]
}
```

To attach this policy:

1. Go to **IAM** > **Users** > **PocketSOC** > **Add permissions** > **Create inline policy**.
2. Switch to the **JSON** tab and paste the policy above.
3. Click **Next**, name it `PocketSOC-GuardDuty`, and click **Create policy**.

::: warning
`ArchiveFindings` and `UnarchiveFindings` are write operations. Only include them if you want analysts to manage finding status from PocketSOC.
:::

## Step 3: Create an access key

1. Go to **IAM** > **Users** > **PocketSOC** > **Security credentials**.
2. Under **Access keys**, click **Create access key**.
3. Select **Third-party service** as the use case.
4. Check the confirmation checkbox and click **Next**.
5. Add a description tag (e.g., `PocketSOC`) and click **Create access key**.
6. Copy the **Access Key ID** and **Secret Access Key** — the secret is only shown once.

::: warning
Store the Secret Access Key securely. If you lose it, you will need to create a new access key.
:::

## Step 4: Determine your region

GuardDuty is a regional service. You need to know which region your GuardDuty detector is running in.

1. Go to [AWS Console](https://console.aws.amazon.com) > **GuardDuty**.
2. Check the **region selector** in the top-right corner of the console — this is your GuardDuty region.

Common regions:

| Region | Name |
|--------|------|
| `us-east-1` | US East (N. Virginia) |
| `us-east-2` | US East (Ohio) |
| `us-west-1` | US West (N. California) |
| `us-west-2` | US West (Oregon) |
| `eu-west-1` | Europe (Ireland) |
| `eu-west-2` | Europe (London) |
| `eu-central-1` | Europe (Frankfurt) |
| `ap-southeast-1` | Asia Pacific (Singapore) |
| `ap-southeast-2` | Asia Pacific (Sydney) |
| `ap-northeast-1` | Asia Pacific (Tokyo) |

::: tip
If GuardDuty is enabled in multiple regions, you can create a separate PocketSOC configuration for each one.
:::

## Step 5: Add the configuration in PocketSOC

### Option A: Via the portal (team deployment)

1. Go to [portal.pocketsoc.com](https://portal.pocketsoc.com) > **Settings**.
2. Under **Vendor Configurations**, click **Add Configuration**.
3. Fill in the fields:

| Field | Value |
|-------|-------|
| **Vendor** | AWS GuardDuty |
| **Display Name** | A friendly name (e.g., "AWS Production — us-east-1"). This is shown on each detection in the iOS app to identify which vendor source it came from. |
| **AWS Region** | Select the region from Step 4 |
| **Access Key ID** | From Step 3 |
| **Secret Access Key** | From Step 3 |

4. Click **Save**.

<!-- ![GuardDuty vendor config form](/images/portal-guardduty-config.png) -->

### Option B: Directly on the iOS app

1. Open PocketSOC on your iPhone.
2. Go to **Settings** > **Profiles** > **Add Profile**.
3. Select **AWS GuardDuty**.
4. Enter the same fields as above.
5. Tap **Connect**.

## Step 6: Verify on the iOS app

1. Open PocketSOC on your iPhone.
2. If you're already signed in, the app automatically refreshes configurations.
3. Detections from GuardDuty should appear in the Detections feed.
4. Findings display AWS-specific details including resource type, severity score, and a direct link to the finding in the AWS console.

::: info
If there are no active findings in your GuardDuty detector, the Detections feed will be empty. You can [generate sample findings](https://docs.aws.amazon.com/guardduty/latest/ug/sample_findings.html) to test the integration.
:::

## Push notifications

The steps above configure PocketSOC to **pull** findings from GuardDuty on a schedule. If you also want **real-time push notifications** when new findings are created, you can set up an EventBridge rule that forwards GuardDuty events to PocketSOC's webhook.

### Find your webhook URL

1. Go to [portal.pocketsoc.com](https://portal.pocketsoc.com) > **Settings**.
2. Under **Webhook URLs**, copy the **Webhook URL**.

### Create an EventBridge rule

1. Go to [AWS Console](https://console.aws.amazon.com) > **Amazon EventBridge** > **Rules** > **Create rule**.
2. Configure:

| Field | Value |
|-------|-------|
| **Name** | `pocketsoc-guardduty-alerts` |
| **Event bus** | default |
| **Rule type** | Rule with an event pattern |

3. Click **Next**.
4. Under **Event pattern**, select:
   - **Event source**: AWS services
   - **AWS service**: GuardDuty
   - **Event type**: GuardDuty Finding
5. Click **Next**.
6. Under **Target**, select **EventBridge API destination**.
7. Click **Create a new API destination** and configure:

| Field | Value |
|-------|-------|
| **Name** | `pocketsoc-webhook` |
| **API destination endpoint** | Your PocketSOC webhook URL |
| **HTTP method** | POST |
| **Connection** | Create a new connection (no auth headers needed — the webhook token is in the URL) |

8. Click **Next**, then **Create rule**.

### Testing

1. Go to **GuardDuty** > **Settings** > **Generate sample findings**.
2. Wait for EventBridge to process the event (typically within a few seconds).
3. You should receive a push notification on your iPhone via PocketSOC.
4. You can check the EventBridge rule's **Monitoring** tab to verify it executed successfully.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| No detections appear | Verify GuardDuty is enabled in the selected region. Run `aws guardduty list-detectors --region <region>` to check. |
| "Authentication failed" error | Double-check the Access Key ID and Secret Access Key. Ensure the IAM user has not been disabled. |
| "No detector found" error | GuardDuty may not be enabled in the selected region. Check the region in the AWS console. |
| "Forbidden" error | The IAM user is missing the required permissions. Attach the `AmazonGuardDutyReadOnlyAccess` policy. |
| Cannot archive findings | The read-only policy does not include `ArchiveFindings`. Use the custom policy from Step 2b. |
| Findings from wrong region | Each PocketSOC configuration connects to one region. Create a separate configuration for each region where GuardDuty is active. |

## Rotating credentials

To rotate your AWS access key:

1. Create a new access key for the PocketSOC IAM user in the AWS console.
2. Update the Access Key ID and Secret Access Key in the portal Settings.
3. Verify the iOS app can still pull detections.
4. Delete the old access key in the AWS console.

::: tip
AWS recommends rotating access keys regularly. Set a calendar reminder or use [IAM Access Analyzer](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_RotateAccessKey) to track key age.
:::

# Groups

Groups let you control which vendor profiles are available to which team members. This is useful when different parts of your security team need access to different environments.

## How groups work

- A **group** contains team members and has vendor profiles assigned to it
- A team member can be in **multiple groups** and sees the union of all assigned profiles
- If your organization has **no groups**, all team members see all vendor profiles (default behavior)

**Example:**
| Group | Members | Profiles |
|-------|---------|----------|
| SOC Team | Alice, Bob | CrowdStrike Production, Defender for Endpoint |
| Cloud Team | Carol, Bob | Defender for Cloud |

In this example, Bob sees all three profiles because he is in both groups. Alice only sees CrowdStrike Production and Defender for Endpoint. Carol only sees Defender for Cloud.

## Creating a group

1. Go to **Groups** (admin-only page).
2. Click **Create Group**.
3. Enter a group name and optional description.
4. Click **Create**.

<!-- ![Create group dialog](/images/portal-create-group.png) -->

## Adding members to a group

1. On the Groups page, expand the group you want to modify.
2. Click **Add Members**.
3. Select team members from the list (members already in the group are excluded).
4. Click **Add**.

## Assigning profiles to a group

1. On the Groups page, expand the group.
2. Switch to the **Profiles** tab.
3. Click **Assign Profiles**.
4. Select the vendor configurations to assign.
5. Click **Assign**.

## Removing members or profiles

Click the **Remove** button next to any member or profile within the group detail view.

## Deleting a group

Click the **Delete** button on a group. This removes all member and profile assignments. Team members who were only in this group will fall back to the "no groups" behavior and see all profiles.

::: tip
Groups are optional. If you don't need to restrict profile access, you can skip this feature entirely and all team members will see all vendor configurations.
:::

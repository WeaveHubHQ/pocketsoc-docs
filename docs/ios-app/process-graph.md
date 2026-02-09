# Process Graph

The Process Graph (also called ThreatGraph) visualizes the process tree for a detection, showing how a suspicious process was spawned and what it did.

## Accessing the process graph

1. Open any detection from the Detections feed.
2. In the detection detail view, tap **Process Graph** or scroll to the process tree section.

<!-- ![Process graph view](/images/ios-process-graph.png) -->

## What you see

The graph displays a hierarchical tree of processes involved in the detection:

- **Root process** — The top-level parent process
- **Child processes** — Processes spawned by the parent, shown as branches
- **Highlighted process** — The process that triggered the detection is highlighted

Each process node shows:

| Field | Description |
|-------|-------------|
| **Process name** | The executable name (e.g., `cmd.exe`, `powershell.exe`) |
| **Command line** | The full command that was executed |
| **File path** | Where the executable is located on disk |
| **PID** | Process ID |
| **Timestamp** | When the process was created |
| **User** | The user account that ran the process |

## Navigating the graph

- **Tap a node** to expand it and see its details
- **Scroll** to navigate large process trees
- Processes are displayed in parent-child order from top to bottom

## Why process graphs matter

Process graphs help you understand the full attack chain:

- **Identify the initial access vector** — What started the chain? Was it a phishing email, a browser exploit, or a legitimate tool?
- **Understand lateral movement** — Did the attacker spawn additional tools or scripts?
- **Assess the scope** — How many processes were involved? Did the attacker achieve persistence?

This context is critical for determining whether a detection is a true positive or false positive, and for understanding the full scope of an incident.

## Availability

Process graph is currently available for **CrowdStrike** detections only. Microsoft Defender detections do not include process graph data at this time.

If process data is not available for a detection, the Process Graph option will not appear.

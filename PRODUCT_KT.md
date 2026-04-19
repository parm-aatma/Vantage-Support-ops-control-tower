# Vantage — Associate Support Workspace
## Product Knowledge Transfer Document (Complete Data Hydration Reference)

---

## 1. What is Vantage?

Vantage is an internal operations platform built for D2C (Direct-to-Consumer) delivery support teams. It serves as a **centralized command center** where customer support associates can monitor, investigate, and resolve delivery exceptions for orders shipped across the United States.

The platform provides three distinct operational modes:

1. **Customer-Sourced Cases** — Standard delivery exceptions reported by end customers.
2. **Vantage-Sourced Cases** — AI-detected anomalies that have not yet been reported, requiring proactive handling.
3. **Infrastructure Incidents (INFRA)** — System-level anomalies (API failures, webhook degradation) managed exclusively by the Technical Support persona.

The platform combines real-time shipment tracking, AI-powered case analysis, omnichannel customer communication, internal team collaboration, and infrastructure health monitoring — all within a single, high-density workspace.

---

## 2. User Access & Personas

The application begins with a **Persona Selection** screen. Each persona represents a support team member with a specific role, permissions, and visibility constraints.

### 2.1 Persona Roster

| Persona | Title | Department | Specialization | Permissions |
|---|---|---|---|---|
| **Siddhant** | Support Associate | Customer Success | Technical Troubleshooting | `read:alerts`, `create:comments` |
| **Rupesh** | Support Associate | Customer Success | User Onboarding | `read:alerts`, `create:comments` |
| **Shankar** | Technical Support | Engineering Support | Cloud Infrastructure | `access:logs`, `manage:infra` |
| **Simran** | Support Manager | Customer Success | Operations Management | `resolve:all`, `manage:team`, `view:reports` |
| **Piyush** | VP of Support | Executive | Strategic Leadership | `admin:all`, `view:executive-dashboard`, `reports:all` |

### 2.2 Persona Behavior & Visibility
- **Siddhant / Rupesh / Simran:** The **"Open Cases"** tab strictly displays tickets assigned to them.
- **Global Visibility:** All personas have access to the **"All Active Orders"** tab, which serves as a global logistics pipeline.
- **Shankar:** Accesses the **Technical Support Command Center** (INFRA tickets) and the global active orders feed.

---

## 3. The Associate Dashboard (List View)

### 3.1 Summary Metric Cards
Standardized at **140px height** for layout consistency across all screen sizes.
- **Vantage Alerts** — Proactive AI-detected exceptions.
- **Standard Queues** — New, In-progress, and Escalated ticket counts.
- **Breach Risk** — Identifies shipments with critical SLA compression.

### 3.2 Dashboard Tabs & Layout
The dashboard features **32px horizontal padding** on the tab row for refined visual alignment.
1. **Open Cases** — Filtered for "Vantage" or "Customer" sources. Shows only items assigned to the active user.
2. **All Active Orders** — Global feed of all system logistics (Universal Orders + Administrative Cases).
3. **Operations (Manager Only)** — High-density command center for shift-level orientation.

### 3.3 Pagination & State
- **10 Items Per Page:** Standardized across all dashboard views.
- **Synchronized Reset:** Switching between "Open Cases" and "All Active Orders" (or switching personas) automatically resets pagination to Page 1 to ensure data consistency.

---

## 4. Operational Data (50+ Story Hydration)

The platform is fully hydrated with **50+ standard operational stories** (Universal Orders) representing healthy, on-time shipments, alongside the escalated administrative cases.

### 4.1 Categorization
- **Cases (#US-XXXX):** High-urgency administrative tickets with deep history, audit logs, and customer communication threads.
- **Universal Orders (LOC-XXXX):** Platform-wide logistics tracks. These allow associates to monitor the general health of the shipping network.

### 4.2 Vantage AI "Healthy State"
When viewing a Universal Order without an active case, the Vantage AI "Intelligence Action Bar" provides:
- **0% Risk Assessment:** Confirming nominal operational health with a green (**lime**) theme.
- **Nominal Synthesis:** Confirms labels are generated and carrier handoff is stable.
- **Suggested Action:** Standardized as "All good here for now."

---

## 5. Technical Architecture & Stability

### 5.1 State Management (RefError Resolution)
- **Hoisted State:** The `activeCase` derivation is centralized at the top level of the `Home` component using `useMemo`. This ensures that all sub-components, modals, and tabs have stable access to data, preventing runtime ReferenceErrors.
- **Initialization Sequence:** Static mocks (`mockCases`, `mockOrders`) are initialized at the module level.

### 5.2 Global Sync (Timezone & Data)
- **Global Selector:** A central timezone selector (top right) re-hydrates all timestamps, log entries, and milestones across the entire workspace in real-time.

---

## 6. Detail View Hierarchy

### 6.1 Unified Workspace
- **Intelligence Action Bar:** Real-time AI analysis of risk, synthesis of logs, and suggested next steps.
- **Shipment Milestone Map:** Node-based tracking graph showing elapsed time and carrier handoff points.
- **Tabbed Log Workspace:** 7+ distinct data tabs (Vantage Actions, activity logs, entity-specific tickets).
- **Omnichannel communication:** TEMPLATE-powered chat threads for SMS, Email, and WhatsApp.

---

## 7. The VP Executive Dashboard (Piyush)

A board-ready, **quantitative-only** command center that removes all narrative text in favor of high-fidelity metrics and logistical performance matrices.

### 7.1 Section 1: Support Operations
- **Pipeline Health:** Dual-axis visualization of daily volume vs. stage distribution.
- **Breach Risk Dynamics:** Horizontal time-to-breach distribution and source-level breach rates.
- **Carrier Health Matrix:** Quantitative performance grid for FedEx, UPS, and USPS.
- **Queue Depth:** Stacked area chart tracking New, In-Progress, and Escalated growth.

### 7.2 Section 2: Vantage AI Business Impact
- **Financial Outcomes:** Tracks Cost Avoidance ($124.5k), Churn Prevention ($51.5k), and Spend Reduction.
- **Confidence Trend:** True Positive (TPR) vs. False Positive (FPR) rates for proactive AI alerts.
- **Associate Utilization:** Measures resolution velocity and outcome deltas when following AI suggestions.

---

## 8. The Support Manager "Operations" Hub (Simran)

A high-density surface for real-time shift management and resource allocation.

### 8.1 Shift Snapshot
- **Period-Scoped Metrics:** Segmented control for **Today / This Week / Last 7 Days**.
- **Team-Wide KPIs:** Vantage Alerts, New/Escalated counts, and Breach Risk counts.

### 8.2 Operational Intelligence
- **Throughput:** Grouped bars for Case Inflow vs. Resolution.
- **Team Workload Matrix:** Raw numerical matrix of assignments, priorities, and active breaches per associate.
- **Time-to-Breach Drilldown:** Categorized SLA buckets. Clicking a bucket applies immediate high-priority filters to the "Open Cases" workspace.

### 8.3 Order Pipeline Visibility
- **LOC-XXXX Funnel:** Horizontal stage funnel (Label Gen → Delivered) with active count and percentage occupancy.
- **Stage Dwell Times:** Tracks median residence time per stage today vs. 7-day median with delta alerts.

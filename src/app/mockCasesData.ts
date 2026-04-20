import { universalOrdersData } from './universalData';

export const mockCases: any[] = [
  // ── Manager Cases (Simran) ──────────────────────────────────────────────
  {
    id: '#US-9105', orderId: 'WA-FedEx-9105', zip: '98109', source: 'Customer',
    status: 'Escalated', sla: '01d 12h', slaColor: 'sla-green',
    summary: 'Refund Authorization Request: Customer received Inito Monitor damaged in transit. Associate Siddhant recommends full replacement.',
    updates: 'Approval Needed', isVantageAlert: false,
    priority: 'Medium', customerName: 'David L.',
    carrier: 'FedEx', warehouse: 'SEA-02', assignee: 'Simran', date: '11/08',
    deliveryStatus: 'Damaged in Transit',
    escalatedBy: 'Siddhant',
    associateMessage: 'Customer provided photos of the damaged Inito Monitor box — screen cracked, USB port broken. Order value is $149. Escalating for replacement authorization.',
    intelligence: {
      breachProbability: 8, resolutionRunway: "36h 00m",
      riskAssessment: "LOW — Package sustained physical damage at the final mile node. Customer is distressed but cooperative. Reputational risk is contained if replacement is actioned today.",
      caseSynthesis: "The Inito Monitor (SKU: INI-MON-V3) arrived with the outer box crushed. FedEx photo confirms damage at time of delivery. Replacement is standard for hardware damage.",
      suggestedAction: "Approve replacement shipment (not refund). Re-order same SKU from nearest warehouse and ship Priority to retain customer. File damage claim with FedEx separately."
    }
  },
  {
    id: '#US-9288', orderId: 'FL-UPS-9288', zip: '33101', source: 'Vantage',
    status: 'New', sla: '02d 08h', slaColor: 'sla-green',
    summary: 'Anomalous cluster detected: 4 Inito orders from MEM-01 stalled at local Miami hub simultaneously.',
    updates: 'AI Correlation Flag', isVantageAlert: true,
    priority: 'High', customerName: 'Cluster Alpha',
    carrier: 'UPS', warehouse: 'MEM-01', assignee: 'Simran', date: '11/08',
    deliveryStatus: 'Stalled in Regional Hub',
    intelligence: {
      breachProbability: 45, resolutionRunway: "18h 00m",
      riskAssessment: "MODERATE — 4 separate Inito Monitor orders are experiencing identical hub stalls. Indicates a potential systemic carrier issue at the Miami gateway, not individual package problems.",
      caseSynthesis: "Vantage detected correlated 502 Bad Gateway responses from the UPS API for 4 order IDs dispatched from MEM-01. Physical arrival at hub confirmed via telematics, but outbound sortation has not triggered in 12 hours.",
      suggestedAction: "Contact UPS Southeast Regional Manager to confirm gateway processing status. Do not create individual tickets — this is a batched systemic issue."
    }
  },

  // ── Case #US-8911 (Siddhant — Vantage: Warehouse Stall) ────────────────
  {
    id: '#US-8911', orderId: 'TX-FedEx-8911', zip: '78701', source: 'Vantage',
    status: 'Escalated', sla: '03d 14h', slaColor: 'sla-green',
    summary: 'Address anomaly on Inito Monitor order autonomously resolved via WhatsApp. Order subsequently stalled at the Austin warehouse.',
    updates: 'Escalated to human support', isVantageAlert: true,
    integrationSource: 'Shopify API', techStatus: 'Success', lastPing: '11/08, 08:00 AM',
    breachProb: '20%', priority: 'High', customerName: 'Jordan P.',
    carrier: 'FedEx', warehouse: 'AUS-01', assignee: 'Siddhant', date: '11/08',
    deliveryStatus: 'Exception - Warehouse Stall',
    fulfillmentCenter: 'Austin TX (AUS-01)',
    intelligence: {
      breachProbability: 20, resolutionRunway: "48h 00m",
      riskAssessment: "LOW — SLA has a comfortable 3-day buffer, but the order is completely stationary. Risk is operational: if the warehouse queue remains blocked, the Inito Monitor will never enter the carrier network. Every hour of inaction compresses the final-mile delivery window.",
      caseSynthesis: "Vantage autonomously corrected an incomplete address via WhatsApp outreach (missing Apt 405). The address hold was lifted and the order was released to the Austin, TX fulfillment center. However, the order has now been sitting in the warehouse pick queue for over 40 hours with zero scan activity. Automated priority ticket #WH-882 was raised 24 hours ago and has received no response from warehouse staff.",
      suggestedAction: "Call Austin Warehouse Dispatch directly at Ext 402. Reference internal ticket #WH-882 and request an immediate manual pick scan for this order. If dispatch is unresponsive, escalate to Regional Warehouse Manager (Sarah Jenkins) with a P1 override.",
      humanTouchAdvice: "This is a physical-world blockage — no digital automation can resolve it. The warehouse pick queue requires a human operator to locate and scan the order. A direct phone call is the only path to resolution."
    },
    customer: { name: 'Jordan P.', email: 'jordan.p@example.com', phone: '+1 (512) 555-0199', city: 'Austin', state: 'TX', zipCode: '78701', fullAddress: '1100 Congress Ave, Apt 405, Austin, TX 78701', localTimezone: 'US Central (CST)', type: 'REPEAT', ltv: '$420', totalOrders: 4, orderWindow: '12 months', localTimeNow: '09:45 AM CST', isQuietHours: false },
    milestones: [
      { id: 1, action: 'Order Received', location: 'Shopify', time: '11/06, 02:15 PM', status: 'Completed', colorClass: 'green', icon: 'check', connectorTime: '0h 02m', connectorColor: '#10b981' },
      { id: 2, action: 'Address Validation', location: 'Vantage AI', time: '11/06, 04:30 PM', status: 'Completed', colorClass: 'green', icon: 'check', connectorTime: '2h 15m', connectorColor: '#10b981' },
      { id: 3, action: 'Warehouse Processing', location: 'Austin, TX', time: '11/06, 04:35 PM', status: 'Current', colorClass: 'red', icon: 'alert', connectorTime: 'Stalled 40h+', connectorColor: '#ef4444' },
      { id: 4, action: 'Pick & Pack', location: 'Austin, TX', time: 'Pending', status: 'Pending', colorClass: 'gray', icon: 'clock', connectorTime: 'Pending', connectorColor: 'gray' },
      { id: 5, action: 'Carrier Handoff', location: 'FedEx AUS Hub', time: 'Pending', status: 'Pending', colorClass: 'gray', icon: 'clock', connectorTime: null, connectorColor: 'gray' },
    ],
    caseAuditLogs: [
      { id: 1010, type: 'Internal', title: 'Escalated to Support Team', time: '11/08, 08:00 AM', details: 'Case transferred from autonomous queue to Associate queue due to unresponsive warehouse ticket #WH-882.', isVantage: true },
      { id: 1009, type: 'System', title: 'Ticket SLA Expired', time: '11/08, 04:35 AM', details: 'Internal SLA of 12 hours for automated Ticket #WH-882 elapsed with no status change from warehouse facility.', isVantage: false },
      { id: 1007, type: 'Warehouse', title: 'Order Routed to Facility', time: '11/06, 04:35 PM', details: 'Order assigned to Austin TX Fulfillment Center. Added to pick queue.', isVantage: false },
      { id: 1005, type: 'Customer', title: 'Customer Reply Received', time: '11/06, 04:28 PM', details: "Customer responded via WhatsApp providing unit number 'Apt 405'.", isVantage: false },
      { id: 1004, type: 'Customer', title: 'Automated Outreach Sent', time: '11/06, 02:20 PM', details: 'Vantage dispatched automated WhatsApp message requesting address clarification.', isVantage: true },
      { id: 1001, type: 'Source', title: 'Order Ingested', time: '11/06, 02:15 PM', details: 'Order received from Shopify API. Inito Monitor (INI-MON-V3) × 1. Payload parsed successfully.', isVantage: false },
    ],
    caseVantageActions: [
      { id: 1008, type: 'VantageAction', title: 'Packing Delay Detected', time: '11/07, 04:35 PM', details: 'Order has been in warehouse queue for >24 hours without a pick scan. Automated Ticket #WH-882 raised to warehouse prioritizing the order.', isVantage: true, actionCategory: 'alert' },
      { id: 1006, type: 'VantageAction', title: 'Address Updated & Hold Lifted', time: '11/06, 04:30 PM', details: 'Address payload updated to include Apt 405. Fulfillment hold successfully removed. Order released to warehouse.', isVantage: true, actionCategory: 'validation' },
      { id: 1003, type: 'VantageAction', title: 'Fulfillment Hold Placed', time: '11/06, 02:17 PM', details: 'Automated hold placed on order routing to prevent undeliverable exception.', isVantage: true, actionCategory: 'validation' },
      { id: 1002, type: 'VantageAction', title: 'Address Anomaly Detected', time: '11/06, 02:17 PM', details: 'Vantage detected incomplete destination address. Missing secondary unit/apartment number for multi-tenant building.', isVantage: true, actionCategory: 'detection' },
    ],
    omniMessages: [
      { id: 501, direction: 'outbound', channel: 'WhatsApp', text: "Hi Jordan! Your Inito order is ready to be processed, but our system flagged that your address (1100 Congress Ave) might be missing an apartment or unit number. Could you please reply with your unit number so we can get your package shipped out?", time: '11/06, 02:20 PM', sender: 'Vantage AI', isAiSuggested: true },
      { id: 502, direction: 'inbound', channel: 'WhatsApp', text: "Oh sorry! It's Apt 405.", time: '11/06, 04:28 PM', sender: 'Jordan P.' },
      { id: 503, direction: 'outbound', channel: 'WhatsApp', text: "Got it, thank you! Your address has been updated to 1100 Congress Ave, Apt 405, and your order is heading to the warehouse for packing now.", time: '11/06, 04:30 PM', sender: 'Vantage AI', isAiSuggested: true },
    ],
    copilotSuggestion: "Hi Jordan, we've escalated your Inito order to our Austin warehouse team for immediate processing. You should see a tracking update shortly — we appreciate your patience!",
  },

  // ── Case #US-9024 (Rupesh — Vantage: Sequential Carrier Delays) ─────────
  {
    id: '#US-9024', orderId: 'GA-FedEx-9024', zip: '60601', source: 'Vantage',
    status: 'Breach Risk', sla: '00d 14h', slaColor: 'sla-red',
    summary: 'Inito Monitor shipment hit sequential barcode scan failures at Memphis and Indianapolis hubs. SLA breach imminent.',
    updates: 'SLA Breach Risk High', isVantageAlert: true,
    integrationSource: 'FedEx Webhook', techStatus: 'Success', lastPing: '11/08, 02:15 PM',
    breachProb: '85%', priority: 'Critical', customerName: 'Michael T.',
    carrier: 'FedEx', warehouse: 'ATL-01', assignee: 'Rupesh', date: '11/08',
    deliveryStatus: 'Exception - Carrier Delay',
    fulfillmentCenter: 'Atlanta GA (ATL-01)',
    intelligence: {
      breachProbability: 85, resolutionRunway: "04h 00m",
      riskAssessment: "CRITICAL — The delivery window has been reduced from 4 days to under 4 hours by two sequential hub stalls. Standard ground routing from Indianapolis to Chicago will not arrive in time. Without a carrier service level upgrade, SLA breach is near-certain. This is a first-time customer with 1 order — a breach directly risks permanent churn.",
      caseSynthesis: "This Inito Monitor package has been relabeled twice at two separate FedEx hubs (Memphis, TN and Indianapolis, IN) due to recurring barcode unreadability — a pattern suggesting physical label damage at the origin scan. Vantage autonomously resolved both stalls via carrier tickets (#CAR-102, #CAR-304), but the compounded 72+ hours of delays have critically compressed the remaining delivery window to under 4 hours for the Chicago destination.",
      suggestedAction: "Call FedEx Indianapolis Regional Dispatch at Ext 204. Request an immediate 'Service Level Upgrade' to Priority First Overnight for the final-mile leg to Chicago, IL 60601. This upgrade requires human authorization and cannot be triggered via API. Reference carrier tickets #CAR-102 and #CAR-304.",
      humanTouchAdvice: "Vantage cannot authorize carrier service level upgrades — this is a human-only action. No customer outreach needed yet — only contact after the upgraded routing is confirmed."
    },
    customer: { name: 'Michael T.', email: 'michael.t@example.com', phone: '+1 (312) 555-0188', city: 'Chicago', state: 'IL', zipCode: '60601', fullAddress: '200 E Randolph St, Suite 4100, Chicago, IL 60601', localTimezone: 'US Central (CST)', type: 'NEW', ltv: '$149', totalOrders: 1, orderWindow: 'New', localTimeNow: '01:30 PM CST', isQuietHours: false },
    milestones: [
      { id: 1, action: 'Order Received', location: 'Shopify', time: '11/04, 09:15 AM', status: 'Completed', colorClass: 'green', icon: 'check', connectorTime: '6h 30m', connectorColor: '#10b981' },
      { id: 2, action: 'Origin Scan', location: 'Atlanta, GA (ATL-01)', time: '11/04, 03:45 PM', status: 'Completed', colorClass: 'green', icon: 'check', connectorTime: '14h 15m', connectorColor: '#10b981' },
      { id: 3, action: 'Hub (Relabeled & Cleared)', location: 'Memphis, TN', time: '11/05, 06:00 AM', status: 'Completed', colorClass: 'green', icon: 'check', connectorTime: '48h 30m', connectorColor: '#ef4444' },
      { id: 4, action: 'Regional Hub (Stalled)', location: 'Indianapolis, IN', time: '11/08, 02:00 PM', status: 'Current', colorClass: 'red', icon: 'alert', connectorTime: '—', connectorColor: 'gray' },
      { id: 5, action: 'Out for Delivery', location: 'Chicago, IL', time: 'Pending', status: 'Pending', colorClass: 'gray', icon: 'clock', connectorTime: null, connectorColor: 'gray' },
    ],
    caseAuditLogs: [
      { id: 2009, type: 'Carrier', title: 'Carrier Ticket Updated', time: '11/08, 01:50 PM', details: "FedEx responded: 'Package required secondary relabeling. Cleared for next dispatch.'", isVantage: false },
      { id: 2006, type: 'Carrier', title: 'Departed Memphis Hub', time: '11/05, 06:00 AM', details: 'Departure scan recorded. SLA remains intact. Vantage closed Ticket #CAR-102.', isVantage: false },
      { id: 2005, type: 'Carrier', title: 'Carrier Ticket Updated (MEM)', time: '11/05, 05:45 AM', details: "FedEx responded: 'Barcode damaged. Relabeled and re-entered into sorting queue.'", isVantage: false },
      { id: 2002, type: 'Carrier', title: 'Picked up by Carrier', time: '11/04, 03:45 PM', details: 'FedEx Express origin scan completed in Atlanta, GA.', isVantage: false },
      { id: 2001, type: 'Source', title: 'Order Ingested', time: '11/04, 09:15 AM', details: 'Order received from Shopify. Inito Monitor (INI-MON-V3) × 1. Processed normally.', isVantage: false },
    ],
    caseVantageActions: [
      { id: 2010, type: 'VantageAction', title: 'SLA Risk Escalated', time: '11/08, 02:15 PM', details: 'Compounding delays reduced resolution runway to 4 hours. Escalated to Associate queue for manual Service Level Upgrade.', isVantage: true, actionCategory: 'alert' },
      { id: 2008, type: 'VantageAction', title: 'Carrier Ticket Raised (IND)', time: '11/08, 10:05 AM', details: 'Automated Ticket #CAR-304 raised to FedEx Indianapolis requesting manual scan.', isVantage: true, actionCategory: 'alert' },
      { id: 2007, type: 'VantageAction', title: 'Stall Detected: Indianapolis Hub', time: '11/08, 10:00 AM', details: 'Package missed scheduled departure scan at Indianapolis, IN. Barcode unreadability pattern detected again.', isVantage: true, actionCategory: 'detection' },
      { id: 2004, type: 'VantageAction', title: 'Carrier Ticket Raised (MEM)', time: '11/05, 02:05 PM', details: 'Automated Ticket #CAR-102 raised to FedEx Memphis requesting location check.', isVantage: true, actionCategory: 'alert' },
      { id: 2003, type: 'VantageAction', title: 'Stall Detected: Memphis Hub', time: '11/05, 02:00 PM', details: 'Package missed scheduled departure scan at Memphis, TN hub. No movement for 8 hours.', isVantage: true, actionCategory: 'detection' },
    ],
    omniMessages: [],
    copilotSuggestion: "Hi Michael, your Inito order is currently being prioritized at the Indianapolis dispatch center. We expect it to be on its way to Chicago shortly. Thank you for your patience!",
  },

  // ── Case #US-9112 (Customer: Signature Required Hold) — Siddhant ─────────
  {
    id: '#US-9112', orderId: 'WA-FedEx-9112', zip: '98109', source: 'Customer',
    status: 'New', sla: '01d 12h', slaColor: 'sla-green',
    summary: 'Customer reported missing Inito Monitor delivery. Carrier logs confirm failed attempt (Signature Required) — package held at FedEx OnSite.',
    updates: '1 unread message', isVantageAlert: false,
    integrationSource: 'FedEx API', techStatus: 'Success', lastPing: '11/08, 09:30 AM',
    breachProb: '5%', priority: 'Low', customerName: 'David L.',
    carrier: 'FedEx', warehouse: 'SEA-02', assignee: 'Simran', date: '11/08',
    deliveryStatus: 'Held at FedEx OnSite',
    fulfillmentCenter: 'Seattle WA (SEA-02)',
    intelligence: {
      breachProbability: 5, resolutionRunway: "36h 00m",
      riskAssessment: "MINIMAL — The Inito Monitor is physically secure and the SLA window is healthy at 1d 12h. The only risk is reputational: the customer is alarmed. A fast, empathetic response fully resolves this case.",
      caseSynthesis: "Customer believes their Inito Monitor was stolen because tracking shows 'Delivered' but their porch is empty. In reality, the delivery required a signature and no one was home at 1:45 PM yesterday. Per FedEx protocol, the driver redirected the package to the nearest OnSite location (Walgreens, 400 Broad St, Seattle, WA 98109). It has been scanned and is safely held there since 4:00 PM yesterday.",
      suggestedAction: "Use Vantage Copilot to draft a reassurance email. Key points: (1) Package is safe, NOT stolen, (2) It requires a signature, (3) It's at Walgreens on 400 Broad St, (4) Customer needs valid photo ID to pick up. No operational action required.",
      humanTouchAdvice: "No operational action required — carrier workflow completed correctly. This is purely a customer communication task. Review the pre-generated Copilot message, personalize the tone, and send immediately."
    },
    customer: { name: 'David L.', email: 'david.l@example.com', phone: '+1 (206) 555-0122', city: 'Seattle', state: 'WA', zipCode: '98109', fullAddress: '1200 Aloha St, Seattle, WA 98109', localTimezone: 'US Pacific (PST)', type: 'NEW', ltv: '$149', totalOrders: 1, orderWindow: 'New', localTimeNow: '10:15 AM PST', isQuietHours: false },
    milestones: [
      { id: 1, action: 'Out for Delivery', location: 'Seattle, WA', time: '11/07, 08:30 AM', status: 'Completed', colorClass: 'green', icon: 'check', connectorTime: '5h 15m', connectorColor: '#10b981' },
      { id: 2, action: 'Delivery Attempted', location: 'Customer Address', time: '11/07, 01:45 PM', status: 'Completed', colorClass: 'red', icon: 'alert', connectorTime: '0h 45m', connectorColor: '#ef4444' },
      { id: 3, action: 'Redirected to Hold', location: 'FedEx Logistics', time: '11/07, 02:30 PM', status: 'Completed', colorClass: 'green', icon: 'check', connectorTime: '1h 30m', connectorColor: '#10b981' },
      { id: 4, action: 'Ready for Pickup', location: 'FedEx OnSite (Walgreens)', time: '11/07, 04:00 PM', status: 'Current', colorClass: 'green', icon: 'check', connectorTime: '—', connectorColor: 'gray' },
      { id: 5, action: 'Delivered to Customer', location: 'Pending Pickup', time: 'Pending', status: 'Pending', colorClass: 'gray', icon: 'clock', connectorTime: null, connectorColor: 'gray' },
    ],
    caseAuditLogs: [
      { id: 3005, type: 'Customer', title: 'Inbound Customer Email', time: '11/08, 09:10 AM', details: "Customer initiated support ticket via email. Subject: 'Missing Package — urgent!'", isVantage: false },
      { id: 3004, type: 'Carrier', title: 'Ready for Pickup', time: '11/07, 04:00 PM', details: 'Package scanned and held at FedEx OnSite (Walgreens, 400 Broad St, Seattle, WA 98109).', isVantage: false },
      { id: 3003, type: 'Carrier', title: 'Package Redirected', time: '11/07, 02:30 PM', details: 'Package redirected to nearby FedEx OnSite location per carrier protocol.', isVantage: false },
      { id: 3002, type: 'Carrier', title: 'Delivery Exception', time: '11/07, 01:45 PM', details: 'Delivery attempt failed. Reason: Customer not available. Signature required for Inito Monitor.', isVantage: false },
      { id: 3001, type: 'Carrier', title: 'Out for Delivery', time: '11/07, 08:30 AM', details: 'Package loaded onto final mile delivery vehicle. Signature Required flag active.', isVantage: false },
    ],
    caseVantageActions: [
      { id: 3006, type: 'VantageAction', title: 'Case Intelligence Synthesized', time: '11/08, 09:10 AM', details: 'Vantage cross-referenced carrier logs against customer complaint. Root cause identified: redirected signature-required delivery. Copilot response pre-generated.', isVantage: true, actionCategory: 'detection' },
    ],
    omniMessages: [
      { id: 504, direction: 'inbound', channel: 'Email', text: "Hi, my tracking says my package was delivered yesterday, but my porch is empty! I've checked everywhere. Was it stolen?! I really need the Inito Monitor — it's for tracking my cycle.", time: '11/08, 09:10 AM', sender: 'David L.' },
      { id: 505, direction: 'outbound', channel: 'Email', text: "Hi David, don't worry at all — your Inito Monitor is completely safe! Because this device requires a signature and no one was available yesterday at 1:45 PM, the driver redirected it to the local FedEx OnSite for convenient pickup.\n\nIt is currently waiting for you at the Walgreens at 400 Broad St, Seattle. Just bring a valid photo ID matching your shipping address to claim it. Let us know if you need any help!", time: '11/08, 09:12 AM', sender: 'Siddhant', isAiSuggested: true },
    ],
    copilotSuggestion: "Hi David, your Inito Monitor is safe at the Walgreens at 400 Broad St, Seattle. Please bring a valid photo ID to pick it up at your convenience.",
  },

  // ── Case INFRA-3092 (Shankar — UPS Webhook Outage) ──────────────────────
  {
    id: 'INFRA-3092', orderId: 'US-Cluster-3092', zip: 'GLOBAL', source: 'Infrastructure',
    status: 'Identified', sla: '--', slaColor: '',
    summary: 'UPS Webhook — 502 Bad Gateway Outage affecting 82 Inito orders.',
    updates: 'Incident Active', isVantageAlert: true,
    integrationSource: 'UPS API', techStatus: 'Critical Error', lastPing: '14:18',
    breachProb: '100%', priority: 'Critical', customerName: 'SYSTEM',
    carrier: 'UPS', warehouse: 'NAT-01', assignee: 'Shankar', date: '11/08',
    deliveryStatus: 'Infrastructure Incident',
    fulfillmentCenter: 'National (NAT-01)',
    intelligence: null,
    customer: null,
    milestones: [],
    caseAuditLogs: [],
    caseVantageActions: [],
    omniMessages: [],
    copilotSuggestion: '',
    infraData: {
      title: 'UPS Webhook — 502 Bad Gateway Outage',
      incidentType: 'Webhook Failure',
      severity: 'HIGH',
      detectedAt: '13:45',
      activeDuration: '0h 35m',
      whatHappened: 'Vantage infrastructure monitor detected a 100% drop in incoming UPS tracking webhook payloads. The endpoint is returning HTTP 502 Bad Gateway errors across all polling requests, freezing tracking state updates in the Vantage UI.',
      blastRadiusNarrative: '82 active Inito customer orders currently in transit via UPS are experiencing frozen tracking states. SLA remains fully intact for all affected orders as physical packages are still moving, but associate visibility is temporarily compromised.',
      anomalySource: 'UPS Webhook',
      detectionMethod: 'Webhook Drop Rate Monitor',
      affectedCarrier: 'UPS Ground',
      affectedRegion: 'National (US)',
      ordersInBlastRadius: 82,
      openTickets: '82 (12V / 70C)',
      slaCriticalCount: '0 (Breaching <6h)',
      errorRatePeak: '100%',
      latencyP95: '5000ms (Timeout)',
      endpoints: [
        { name: 'api.ups.com/track/v1/webhook', count: '1450', code: '502 Bad Gateway', time: '14:18' },
      ],
      affectedTickets: [
        { id: '#US-9112', source: '👤 Customer', assigned: 'Siddhant', stage: 'In Transit', carrier: 'UPS Ground', sla: '02d 10h', slaColor: 'var(--accent-lime)', critical: false },
        { id: '#US-9145', source: '🤖 Vantage', assigned: 'Simran', stage: 'Out for Delivery', carrier: 'UPS Ground', sla: '14h 30m', slaColor: 'var(--accent-lime)', critical: false },
        { id: '#US-9201', source: '👤 Customer', assigned: 'Rupesh', stage: 'In Transit', carrier: 'UPS Ground', sla: '01d 22h', slaColor: 'var(--accent-lime)', critical: false },
        { id: '#US-9233', source: '🤖 Vantage', assigned: 'Piyush', stage: 'Pending Scan', carrier: 'UPS Ground', sla: '03d 08h', slaColor: 'var(--accent-lime)', critical: false },
      ],
      broadcastPreviewText: '⚠️ Tech Incident Notice — INFRA-3092: UPS webhook outage. Tracking statuses will remain frozen for ~2 hours. Do not manually escalate to carrier.',
      totalTickets: 82,
      slaCriticalTickets: 0,
      normalTickets: 82,
      vitals: [
        { label: 'Anomaly Source', value: 'UPS Webhook' },
        { label: 'Detection Method', value: 'Webhook Drop Rate Monitor' },
        { label: 'Affected Carrier', value: 'UPS Ground' },
        { label: 'Affected Region', value: 'National (US)' },
        { label: 'Orders in Blast Radius', value: '82' },
        { label: 'Open Tickets', value: '82 (12V / 70C)' },
        { label: 'SLA-Critical', value: '0 (Breaching <6h)', color: 'var(--accent-lime)' },
      ],
      timeline: [
        { id: 4006, type: 'Broadcast', text: "Broadcast sent: '⚠️ Tech Incident Notice — INFRA-3092: UPS webhook outage. Tracking statuses will remain frozen for ~2 hours. Do not manually escalate to carrier.' targeting 82 tickets.", time: '14:15' },
        { id: 4005, type: 'Status', text: 'Incident status changed to Identified.', time: '14:12', user: 'Shankar' },
        { id: 4004, type: 'Note', text: 'UPS Dev Support responded. Confirmed regional load balancer failure. Physical packages are unaffected. ETA for API restoration is 2 hours.', time: '14:10', user: 'Shankar' },
        { id: 4003, type: 'Note', text: 'Verified internal systems are operational. Issue isolated to UPS remote servers. Raised priority ticket #UPS-DEV-88 via developer portal.', time: '14:00', user: 'Shankar' },
        { id: 4002, type: 'Status', text: 'Incident status changed to Investigating.', time: '13:50', user: 'System' },
        { id: 4001, type: 'Detection', text: 'Automated alert triggered: UPS Webhook returning consecutive 502 Gateway Timeout errors. Error rate exceeded 5% threshold.', time: '13:45' },
      ],
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // SIDDHANT NEW STORIES (3 Vantage, 3 Customer)
  // ══════════════════════════════════════════════════════════════════════════

  // [Vantage] #US-9401 — ATL Warehouse Conveyor Failure
  {
    id: '#US-9401', orderId: 'GA-UPS-9401', zip: '30303', source: 'Vantage',
    status: 'Stalled', sla: '01d 04h', slaColor: 'sla-red',
    summary: 'Inito Monitor order stalled at ATL-01 warehouse. Conveyor failure in Section B. Vantage auto-escalated 12h ago, pick scan still not seen.',
    updates: 'System Alert: Warehouse Stall', isVantageAlert: true,
    priority: 'High', customerName: 'Sarah K.',
    carrier: 'UPS', warehouse: 'ATL-01', assignee: 'Siddhant', date: '11/08',
    deliveryStatus: 'Stalled at Warehouse',
    fulfillmentCenter: 'Atlanta GA (ATL-01)',
    intelligence: {
      breachProbability: 65, resolutionRunway: "28h 00m",
      riskAssessment: "HIGH — Vantage raised an automated ticket 12 hours ago but the pick scan still hasn't happened. The conveyor was repaired, but this specific order was moved to an exception bin and missed the re-queue. SLA breach window is closing.",
      caseSynthesis: "Conveyor Belt #4 in ATL-01 failed at 02:00 AM. Vantage auto-raised Ticket #WH-991 and notified the shift lead. The belt was repaired by 08:00 AM, but this Inito Monitor order was set aside during the repair and placed in bin 'B-4-EXCEPT'. It has not been re-scanned or returned to the pick queue.",
      suggestedAction: "Call ATL-01 Facility Manager at Ext 219. Reference Ticket #WH-991 and request a manual scan for exception bin 'B-4-EXCEPT'. Do not wait for the ticket to auto-resolve — the bin audit is a human task.",
      humanTouchAdvice: "Sarah hasn't contacted us yet. Do not proactively email until the pick scan is confirmed. Once confirmed, send a 'Your order is now packed and on its way' update."
    },
    customer: { name: 'Sarah K.', email: 's.kapoor@example.com', phone: '+1 (404) 555-0122', city: 'Atlanta', state: 'GA', zipCode: '30303', fullAddress: '150 Peachtree St NE, Atlanta, GA 30303', localTimezone: 'US Eastern (EST)', type: 'REPEAT', ltv: '$580', totalOrders: 5, orderWindow: '8 months', localTimeNow: '10:00 AM EST', isQuietHours: false },
    milestones: [
      { id: 1, action: 'Order Placed', location: 'Inito Website', time: '11/07, 09:30 AM', status: 'Completed', colorClass: 'green', icon: 'check', connectorTime: '30m', connectorColor: '#10b981' },
      { id: 2, action: 'Fraud Check Passed', location: 'Vantage AI', time: '11/07, 10:00 AM', status: 'Completed', colorClass: 'green', icon: 'check', connectorTime: '2h', connectorColor: '#10b981' },
      { id: 3, action: 'Warehouse Received', location: 'ATL-01, Section B', time: '11/07, 12:00 PM', status: 'Current', colorClass: 'red', icon: 'alert', connectorTime: '22h+ Stalled', connectorColor: '#ef4444' },
      { id: 4, action: 'Pick & Pack', location: 'ATL-01', time: 'Pending', status: 'Pending', colorClass: 'gray', icon: 'clock', connectorTime: 'Pending', connectorColor: 'gray' },
      { id: 5, action: 'UPS Pickup', location: 'ATL-01 Dock', time: 'Pending', status: 'Pending', colorClass: 'gray', icon: 'clock', connectorTime: null, connectorColor: 'gray' },
    ],
    caseAuditLogs: [
      { id: 9401001, type: 'System', title: 'Vantage WH-991 Ticket SLA Expired', time: '11/08, 08:00 AM', details: 'Automated ticket #WH-991 issued 12h ago with no warehouse response. Auto-escalated to Associate.', isVantage: true },
      { id: 9401002, type: 'Warehouse', title: 'Conveyor B-4 Repaired', time: '11/08, 08:05 AM', details: 'ATL-01 maintenance confirmed conveyor belt restored to service. Orders in exception bin not yet re-scanned.', isVantage: false },
      { id: 9401003, type: 'Warehouse', title: 'Mechanical Failure Reported', time: '11/08, 02:15 AM', details: 'Conveyor B-4 offline. Estimated downtime 6 hours. 45 orders affected.', isVantage: false },
      { id: 9401004, type: 'Source', title: 'Order Ingested', time: '11/07, 09:30 AM', details: 'Inito Monitor (INI-MON-V3) × 1 received from Shopify. Routed to ATL-01.', isVantage: false },
    ],
    caseVantageActions: [
      { id: 9401101, type: 'VantageAction', title: 'Stall Alert: Pick Overdue', time: '11/08, 08:00 AM', details: 'Pick cycle exceeded 20h threshold. SLA breach risk elevated to HIGH. Escalated to Siddhant.', isVantage: true, actionCategory: 'alert' },
      { id: 9401102, type: 'VantageAction', title: 'Warehouse Ticket Raised', time: '11/08, 02:20 AM', details: 'Vantage raised Ticket #WH-991 to ATL-01 Shift Lead for 45 conveyor-affected orders.', isVantage: true, actionCategory: 'alert' },
    ],
    omniMessages: [],
    copilotSuggestion: "Call ATL-01 Ext 219 first. If the bin is cleared in the next 2 hours, Sarah's order will make the UPS afternoon pickup. You can then send a proactive 'your order is on its way' message."
  },

  // [Vantage] #US-9402 — FedEx API Address Sync Failure
  {
    id: '#US-9402', orderId: 'MA-FED-9402', zip: '02108', source: 'Vantage',
    status: 'Address Hold', sla: '02d 10h', slaColor: 'sla-green',
    summary: 'Inito Hormone Strip order: address corrected via SMS, but FedEx API returning 422 Validation Error on resync.',
    updates: 'Sync Error: FedEx API', isVantageAlert: true,
    priority: 'Medium', customerName: 'Leo G.',
    carrier: 'FedEx', warehouse: 'BOS-04', assignee: 'Siddhant', date: '11/08',
    deliveryStatus: 'Label Correction Needed',
    fulfillmentCenter: 'Boston MA (BOS-04)',
    intelligence: {
      breachProbability: 22, resolutionRunway: "56h 00m",
      riskAssessment: "LOW-MODERATE — SLA runway is healthy, but the label needs manual intervention before the 4 PM daily FedEx pickup. If missed, the Inito Strip order sits another 24 hours. Customer ordered for a cycle tracking window — delays have specific impact on product utility.",
      caseSynthesis: "Vantage detected missing 'Suite' in the address. Customer replied 'Suite 2100' via SMS within 40 minutes. Vantage pushed the corrected address to FedEx, but FedEx API returned Error 422: 'Address Line 1 exceeds 35 character limit'. The correct address is valid — the issue is a character limit mismatch in FedEx's address validation schema.",
      suggestedAction: "Log into FedEx ShipManager directly. Edit the label manually: move 'Suite 2100' from Line 1 to Address Line 2. Do not try the API again — this needs a manual portal fix before 4 PM today.",
      humanTouchAdvice: "Send Leo a brief update: 'We're applying a manual correction to your shipping label — no action needed from you. Your Inito strips will ship today.' Proactive communication avoids an anxious inbound ticket."
    },
    customer: { name: 'Leo G.', email: 'leo.g@financial.com', phone: '+1 (617) 555-0988', city: 'Boston', state: 'MA', zipCode: '02108', fullAddress: '100 Federal St, Suite 2100, Boston, MA 02108', localTimezone: 'US Eastern (EST)', type: 'NEW', ltv: '$89', totalOrders: 1, orderWindow: 'New', localTimeNow: '10:00 AM EST', isQuietHours: false },
    milestones: [
      { id: 1, action: 'Order Placed', location: 'Website', time: '11/07, 03:00 PM', status: 'Completed', colorClass: 'green', icon: 'check', connectorTime: '1h 05m', connectorColor: '#10b981' },
      { id: 2, action: 'Address Anomaly Detected', location: 'Vantage AI', time: '11/07, 04:05 PM', status: 'Completed', colorClass: 'green', icon: 'check', connectorTime: '40m', connectorColor: '#10b981' },
      { id: 3, action: 'Customer SMS Response', location: 'Customer', time: '11/07, 04:45 PM', status: 'Completed', colorClass: 'green', icon: 'check', connectorTime: '16h+', connectorColor: '#10b981' },
      { id: 4, action: 'FedEx Label Sync', location: 'FedEx API', time: '11/08, 09:00 AM', status: 'Current', colorClass: 'red', icon: 'alert', connectorTime: 'Failed (422)', connectorColor: '#ef4444' },
      { id: 5, action: 'Warehouse Pick & Ship', location: 'BOS-04', time: 'Pending', status: 'Pending', colorClass: 'gray', icon: 'clock', connectorTime: null, connectorColor: 'gray' },
    ],
    caseAuditLogs: [
      { id: 9402001, type: 'System', title: 'FedEx API Error 422', time: '11/08, 09:01 AM', details: 'Error 422: Address Line 1 exceeds 35 character limit. Vantage retry queued.', isVantage: true },
      { id: 9402002, type: 'Customer', title: 'SMS Reply Received', time: '11/07, 04:45 PM', details: "Customer provided 'Suite 2100' via SMS. Address updated in Vantage.", isVantage: false },
      { id: 9402003, type: 'Source', title: 'Order Ingested', time: '11/07, 03:00 PM', details: 'Inito Hormone Strip Kit (INI-STRIP-12) × 1. Shopify order received.', isVantage: false },
    ],
    caseVantageActions: [
      { id: 9402101, type: 'VantageAction', title: 'Auto-SMS Outreach', time: '11/07, 04:05 PM', details: "Vantage sent automated SMS to customer requesting missing Suite number.", isVantage: true, actionCategory: 'validation' },
      { id: 9402102, type: 'VantageAction', title: 'FedEx Sync Attempted (Failed)', time: '11/08, 09:00 AM', details: 'Vantage pushed updated address to FedEx Shipping API. API rejected with Error 422.', isVantage: true, actionCategory: 'alert' },
    ],
    omniMessages: [
      { id: 9402501, direction: 'outbound', channel: 'SMS', text: "Hi Leo! This is Inito Support. Your order of Hormone Strip Kit is almost ready to ship, but our system flagged a possible missing Suite or Unit number in your address. Could you reply with your complete unit number?", time: '11/07, 04:05 PM', sender: 'Vantage AI', isAiSuggested: true },
      { id: 9402502, direction: 'inbound', channel: 'SMS', text: "It's Suite 2100, thanks!", time: '11/07, 04:45 PM', sender: 'Leo G.' },
    ],
    copilotSuggestion: "The FedEx character limit issue is a known API quirk. Moving 'Suite' to Line 2 in ShipManager takes about 2 minutes. Get this done before 3:30 PM to make the pickup window."
  },

  // [Vantage] #US-9403 — HAZMAT Reroute: LH Test Kit with Reagent
  {
    id: '#US-9403', orderId: 'CO-UPS-9403', zip: '80202', source: 'Vantage',
    status: 'In Transit', sla: '00d 20h', slaColor: 'sla-red',
    summary: 'Inito LH Fertility Kit air-shipment rejected at Denver ramp (chemical reagent flag). Vantage auto-rerouted to UPS 3-Day Ground. Customer expected next-day delivery.',
    updates: 'VIP Priority — Service Breach Expected', isVantageAlert: true,
    priority: 'Critical', customerName: 'Priya M.',
    carrier: 'UPS', warehouse: 'DEN-01', assignee: 'Siddhant', date: '11/08',
    deliveryStatus: 'Carrier Service Downgraded',
    fulfillmentCenter: 'Denver CO (DEN-01)',
    intelligence: {
      breachProbability: 90, resolutionRunway: "20h 00m",
      riskAssessment: "CRITICAL — Customer placed an express order for an LH test kit for time-sensitive fertility monitoring. She paid for next-day shipping. UPS Air rejected at ramp due to chemical reagent classification of the LH test reagent. Vantage auto-rerouted to Ground to avoid total package loss, but Ground arrival is 3 days out — creating a meaningful personal disruption.",
      caseSynthesis: "UPS Air safety flagged SKU 'INI-LH-KIT-6' at DEN Airport pre-load. The LH reagent strip is a restricted air cargo item under IATA regulations. Vantage auto-diverted to UPS Ground to prevent return-to-origin. Customer has a tracked ovulation window and ordered express specifically for timing reasons. This is a medically-sensitive use case.",
      suggestedAction: "Call UPS Healthcare Compliance desk (separate from standard dispatch) to check if a special handling exemption can be applied for this shipper category. If no exemption: source the order from the nearest warehouse that can ship via ground with same-day cut, or arrange a local courier pickup for Priya in Denver if feasible.",
      humanTouchAdvice: "Call Priya before sending any written communication. Acknowledge the delivery limitation and the impact on her cycle window. Offer a full refund of the express shipping fee and proactively prioritize any future order. Do not offer a product refund unless she explicitly requests; the strips are still coming."
    },
    customer: { name: 'Priya M.', email: 'priya.m@example.com', phone: '+1 (303) 555-4471', city: 'Denver', state: 'CO', zipCode: '80202', fullAddress: '2000 Welton St, Denver, CO 80205', localTimezone: 'US Mountain (MST)', type: 'REPEAT', ltv: '$620', totalOrders: 6, orderWindow: '14 months', localTimeNow: '08:00 AM MST', isQuietHours: false },
    milestones: [
      { id: 1, action: 'Express Order Placed', location: 'Website', time: '11/08, 06:00 AM', status: 'Completed', colorClass: 'green', icon: 'check', connectorTime: '30m', connectorColor: '#10b981' },
      { id: 2, action: 'HAZMAT Flag: UPS Air Rejected', location: 'DEN Airport Ramp', time: '11/08, 06:30 AM', status: 'Completed', colorClass: 'red', icon: 'alert', connectorTime: '5m', connectorColor: '#ef4444' },
      { id: 3, action: 'Vantage: Ground Reroute', location: 'System', time: '11/08, 06:35 AM', status: 'Completed', colorClass: 'blue', icon: 'check', connectorTime: '—', connectorColor: '#3b82f6' },
      { id: 4, action: 'UPS Ground In Transit', location: 'DEN to Destination', time: 'ETA: 11/11', status: 'Pending', colorClass: 'gray', icon: 'clock', connectorTime: 'Pending', connectorColor: 'gray' },
      { id: 5, action: 'Delivery', location: "Customer's Address", time: 'Pending', status: 'Pending', colorClass: 'gray', icon: 'clock', connectorTime: null, connectorColor: 'gray' },
    ],
    caseAuditLogs: [
      { id: 9403001, type: 'Carrier', title: 'UPS Air: HAZMAT Rejection', time: '11/08, 06:30 AM', details: 'INI-LH-KIT-6 flagged under IATA restricted chemical categories. Package removed from air manifest.', isVantage: false },
      { id: 9403002, type: 'Source', title: 'Express Order Ingested', time: '11/08, 06:00 AM', details: 'Inito LH Fertility Kit (INI-LH-KIT-6) × 1. Next-Day Air selected. Shopify order confirmed.', isVantage: false },
    ],
    caseVantageActions: [
      { id: 9403101, type: 'VantageAction', title: 'Auto Ground Reroute', time: '11/08, 06:35 AM', details: 'Vantage auto-switched carrier service to UPS 3-Day Ground to prevent return-to-origin. New ETA: 11/11. SLA breach flag raised immediately.', isVantage: true, actionCategory: 'alert' },
      { id: 9403102, type: 'VantageAction', title: 'SLA Breach Alert', time: '11/08, 06:36 AM', details: 'Express SLA breach probability at 90%. Case escalated to Siddhant for VIP handling.', isVantage: true, actionCategory: 'alert' },
    ],
    omniMessages: [],
    copilotSuggestion: "Priya is a 6-order repeat customer. Her use case (cycle tracking) makes delivery timing personal. Call her — do not email first. The shipping fee refund ($18) is appropriate and easy to approve."
  },

  // [Customer] #US-9404 — Non-Delivery Dispute: Platinum Customer
  {
    id: '#US-9404', orderId: 'NY-FED-9404', zip: '10001', source: 'Customer',
    status: 'Delivered (Disputed)', sla: '00d 00h', slaColor: 'sla-red',
    summary: "Inito Monitor delivered to wrong porch. Platinum customer Alice's Ring camera shows a different door — FedEx photo mis-match confirmed by Vantage.",
    updates: 'Dispute Filed — Evidence Reviewed', isVantageAlert: false,
    priority: 'High', customerName: 'Alice Wong',
    carrier: 'FedEx', warehouse: 'EWR-01', assignee: 'Siddhant', date: '11/08',
    deliveryStatus: 'Delivered (Wrong Address)',
    fulfillmentCenter: 'Newark NJ (EWR-01)',
    intelligence: {
      breachProbability: 100, resolutionRunway: "N/A (Post-Delivery)",
      riskAssessment: "HIGH REPUTATIONAL RISK — Alice is a Platinum member with 48 orders over 4 years and zero prior disputes. Vantage independently verified the FedEx delivery photo shows a red-rug porch, but Alice's address has a blue rug per property record data. This is a misdelivery, not a theft. She is confident, not aggressive — she just wants her Inito Monitor.",
      caseSynthesis: "FedEx delivery photo shows package placed on a porch with a red rug but Alice's address has a blue rug — verified via geo-property lookup. The Inito Monitor (hardware device, $149) was likely delivered to the neighbor's unit.",
      suggestedAction: "Initiate a replacement shipment (standard 2-day). File a FedEx Misdelivery Claim using Reference #FEX-9404. Do NOT ask Alice to wait for the investigation to close — ship first. Coordinate with Alice to keep an eye out for the neighbor returning the original package.",
      humanTouchAdvice: "Acknowledge the problem clearly: the package was delivered to the wrong address and it is not her fault. Lead with the replacement. Don't ask her to do anything except confirm her address. The FedEx claim runs in the background."
    },
    customer: { name: 'Alice Wong', email: 'alice.w@design.com', phone: '+1 (212) 555-9012', city: 'New York', state: 'NY', zipCode: '10001', fullAddress: '24 W 57th St, Apt 12B, New York, NY 10019', localTimezone: 'US Eastern (EST)', type: 'PLATINUM', ltv: '$4,200', totalOrders: 48, orderWindow: '4 years', localTimeNow: '10:00 AM EST', isQuietHours: false },
    milestones: [
      { id: 1, action: 'Order Placed', location: 'Inito Website', time: '11/06, 08:00 AM', status: 'Completed', colorClass: 'green', icon: 'check', connectorTime: '2d', connectorColor: '#10b981' },
      { id: 2, action: 'Picked Up by FedEx', location: 'EWR-01', time: '11/06, 02:00 PM', status: 'Completed', colorClass: 'green', icon: 'check', connectorTime: '2d', connectorColor: '#10b981' },
      { id: 3, action: 'Out for Delivery', location: 'New York, NY', time: '11/08, 07:00 AM', status: 'Completed', colorClass: 'green', icon: 'check', connectorTime: '1h 30m', connectorColor: '#10b981' },
      { id: 4, action: 'Delivered (Disputed)', location: 'Wrong Address', time: '11/08, 08:30 AM', status: 'Current', colorClass: 'red', icon: 'alert', connectorTime: '—', connectorColor: '#ef4444' },
      { id: 5, action: 'Replacement Shipment', location: 'Pending', time: 'Pending', status: 'Pending', colorClass: 'gray', icon: 'clock', connectorTime: null, connectorColor: 'gray' },
    ],
    caseAuditLogs: [
      { id: 9404001, type: 'Customer', title: 'Inbound Call', time: '11/08, 09:15 AM', details: 'Alice called to report missing Inito Monitor. Ring camera shows delivery to a different door.', isVantage: false },
      { id: 9404002, type: 'Carrier', title: 'FedEx Delivery Photo', time: '11/08, 08:35 AM', details: 'FedEx portal shows proof-of-delivery photo. Porch rug: red. Customer record: blue rug.', isVantage: false },
    ],
    caseVantageActions: [
      { id: 9404101, type: 'VantageAction', title: 'Delivery Photo Mismatch', time: '11/08, 09:20 AM', details: 'Vantage AI cross-referenced FedEx delivery photo with geo-property data. Porch characteristics do not match customer address. Confidence: 94%.', isVantage: true, actionCategory: 'detection' },
    ],
    omniMessages: [
      { id: 9404501, direction: 'inbound', channel: 'Call', text: "Transcript: 'My Ring camera shows the delivery person walking to a different door — not mine. My box is not at my address. I'm a long-time Inito customer and I really need the monitor.'", time: '11/08, 09:15 AM', sender: 'Alice Wong' },
    ],
    copilotSuggestion: "I've pre-staged Replacement Order #NY-RES-9404 using Alice's verified address. Review and confirm to ship — it will go Priority 2-Day at no additional cost."
  },

  // [Customer] #US-9405 — Damaged Inito Monitor Kit (Incomplete Delivery)
  {
    id: '#US-9405', orderId: 'CA-UPS-9405', zip: '90210', source: 'Customer',
    status: 'Damaged', sla: '01d 06h', slaColor: 'sla-green',
    summary: 'Inito Monitor + Strip Bundle arrived with monitor screen cracked. Customer submitted photos. Bundle is partially usable — strip kit intact, monitor broken.',
    updates: '3 Attachment Photos Received', isVantageAlert: false,
    priority: 'High', customerName: 'Brenda S.',
    carrier: 'UPS', warehouse: 'ONT-02', assignee: 'Siddhant', date: '11/08',
    deliveryStatus: 'Partial Damage — Arrived',
    fulfillmentCenter: 'Ontario CA (ONT-02)',
    intelligence: {
      breachProbability: 12, resolutionRunway: "30h 00m",
      riskAssessment: "MODERATE — Strip kit is functional but the monitor (the higher-value item) is damaged. Customer is a new buyer — her first experience with Inito is broken hardware. Resolution must be swift and accurate to retain her.",
      caseSynthesis: "Vantage Vision classified the 3 photos: screen crack consistent with drop-impact, not crushing. The strip kit is in a sealed inner box and appears unaffected. The INI-MON-V3 unit is non-functional. UPS Ground handling logs show 2 drop-events on this package.",
      suggestedAction: "Ship a replacement Inito Monitor (INI-MON-V3 only) via Priority 2-Day. Do NOT re-ship the full bundle — the strips are usable. Initiate a UPS damage claim internally. No need to request the broken unit back.",
      humanTouchAdvice: "Acknowledge the frustration of opening a new product and finding it damaged. Keep the response warm and efficient — she doesn't need an explanation of carrier liability, she just needs a working monitor. Confirm the replacement timeline in your first message."
    },
    customer: { name: 'Brenda S.', email: 'brenda.s@gmail.com', phone: '+1 (310) 555-2231', city: 'Beverly Hills', state: 'CA', zipCode: '90210', fullAddress: '246 N Crescent Dr, Beverly Hills, CA 90210', localTimezone: 'US Pacific (PST)', type: 'NEW', ltv: '$239', totalOrders: 1, orderWindow: 'New', localTimeNow: '07:00 AM PST', isQuietHours: true },
    milestones: [
      { id: 1, action: 'Order Placed', location: 'Inito Website', time: '11/05, 10:00 AM', status: 'Completed', colorClass: 'green', icon: 'check', connectorTime: '1d', connectorColor: '#10b981' },
      { id: 2, action: 'Picked Up by UPS', location: 'ONT-02', time: '11/06, 09:00 AM', status: 'Completed', colorClass: 'green', icon: 'check', connectorTime: '2d', connectorColor: '#10b981' },
      { id: 3, action: 'In Transit', location: 'UPS Ground Network', time: '11/06, 06:00 PM', status: 'Completed', colorClass: 'green', icon: 'check', connectorTime: '22h', connectorColor: '#10b981' },
      { id: 4, action: 'Delivered (Damaged)', location: 'Beverly Hills, CA', time: '11/07, 04:00 PM', status: 'Current', colorClass: 'red', icon: 'alert', connectorTime: '—', connectorColor: '#ef4444' },
      { id: 5, action: 'Replacement Dispatch', location: 'Pending', time: 'Pending', status: 'Pending', colorClass: 'gray', icon: 'clock', connectorTime: null, connectorColor: 'gray' },
    ],
    caseAuditLogs: [
      { id: 9405001, type: 'Customer', title: 'Email: Damaged Inito Monitor', time: '11/08, 06:30 AM', details: 'Customer reported cracked screen on Inito Monitor. Attached 3 photos. Strips appear intact.', isVantage: false },
      { id: 9405002, type: 'Carrier', title: 'UPS Drop-Event Log', time: '11/07, 02:00 PM', details: 'Impact sensor on package logged 2 drop events during last-mile transit. Max G-force: 8.2g.', isVantage: false },
    ],
    caseVantageActions: [
      { id: 9405101, type: 'VantageAction', title: 'Image Classification: Damage Verified', time: '11/08, 09:00 AM', details: 'Vantage Vision confirmed screen crack consistent with drop-impact. Strip kit classified as intact. Recommend partial replacement (monitor only).', isVantage: true, actionCategory: 'detection' },
    ],
    omniMessages: [
      { id: 9405501, direction: 'inbound', channel: 'Email', text: "Hi, I just got my Inito bundle but the monitor screen is cracked — it doesn't turn on. The strips look fine in their sealed box. This is really disappointing as a first purchase. Please help.", time: '11/08, 06:30 AM', sender: 'Brenda S.' },
    ],
    copilotSuggestion: "Replacement order for INI-MON-V3 is pre-staged. Estimated Priority 2-Day shipping cost: $12.40. Confirm to dispatch. No need to ship strips."
  },

  // [Customer] #US-9406 — Late Subscription Cancellation Post-Fulfillment
  {
    id: '#US-9406', orderId: 'TX-USP-9406', zip: '75001', source: 'Customer',
    status: 'In Transit', sla: '03d 12h', slaColor: 'sla-green',
    summary: 'Customer attempted to skip monthly Inito strip subscription refill, but the bundle has already shipped. Claims website cancellation button errored.',
    updates: 'New Message — Return Request', isVantageAlert: false,
    priority: 'Normal', customerName: 'Gary V.',
    carrier: 'USPS', warehouse: 'DAL-09', assignee: 'Siddhant', date: '11/08',
    deliveryStatus: 'Outbound - In Transit',
    fulfillmentCenter: 'Dallas TX (DAL-09)',
    intelligence: {
      breachProbability: 0, resolutionRunway: "N/A",
      riskAssessment: "LOW URGENCY — The order has shipped and is in transit. Whether we intercept or let it deliver, the cost is similar. The key question is whether the customer is telling the truth about the site error.",
      caseSynthesis: "Gary placed an auto-refill subscription for Inito hormone strips (INI-STRIP-12 × 2, $89). He claims he tried to skip this month's refill via the subscriber portal at 10:45 AM, but the 'Skip Month' button returned a 500 error. Order shipped at 11:30 AM — 45 minutes later. Vantage cross-referenced Sentry logs: error #INI-4928 shows the skip endpoint did crash for ~20 minutes between 10:30 AM and 10:50 AM. Gary's claim is likely valid.",
      suggestedAction: "Acknowledge the site error. Do NOT initiate a USPS RTS intercept — it costs $17.50 and the strips have a long shelf life. Instead, offer Gary a 'Pause Next Month' credit applied to his subscription immediately. He keeps this shipment; next month is free.",
      humanTouchAdvice: "Gary is a 15-order subscriber — high retention value. Turning this into a 'we caught our own bug and credited you' moment builds loyalty. Refund or intercept is a last resort; a subscription credit is cheaper and makes him feel heard."
    },
    customer: { name: 'Gary V.', email: 'gary.v@entrepreneur.com', phone: '+1 (972) 555-8812', city: 'Dallas', state: 'TX', zipCode: '75001', fullAddress: '3800 N Central Expy, Dallas, TX 75204', localTimezone: 'US Central (CST)', type: 'REPEAT', ltv: '$1,340', totalOrders: 15, orderWindow: '18 months', localTimeNow: '09:00 AM CST', isQuietHours: false },
    milestones: [
      { id: 1, action: 'Auto-Refill Triggered', location: 'Subscription Engine', time: '11/08, 10:00 AM', status: 'Completed', colorClass: 'green', icon: 'check', connectorTime: '1h 30m', connectorColor: '#10b981' },
      { id: 2, action: 'Packed & Shipped', location: 'DAL-09', time: '11/08, 11:30 AM', status: 'Completed', colorClass: 'green', icon: 'check', connectorTime: '1h', connectorColor: '#10b981' },
      { id: 3, action: 'In Transit', location: 'USPS Dallas Hub', time: '11/08, 12:30 PM', status: 'Current', colorClass: 'blue', icon: 'clock', connectorTime: '—', connectorColor: 'gray' },
      { id: 4, action: 'Expected Delivery', location: 'Dallas, TX', time: 'ETA: 11/11', status: 'Pending', colorClass: 'gray', icon: 'clock', connectorTime: 'Pending', connectorColor: 'gray' },
      { id: 5, action: 'Customer Resolved', location: 'TBD', time: 'Pending', status: 'Pending', colorClass: 'gray', icon: 'clock', connectorTime: null, connectorColor: 'gray' },
    ],
    caseAuditLogs: [
      { id: 9406001, type: 'Customer', title: 'Web Message: Skip Request', time: '11/08, 11:30 AM', details: "Customer submitted support message: 'I tried to skip this month's Inito refill but the button crashed. Now it shipped. I don't need strips this month.'", isVantage: false },
      { id: 9406002, type: 'System', title: 'Skip Endpoint Crash Verified', time: '11/08, 12:00 PM', details: 'Sentry Error #INI-4928: /api/subscription/skip returned 500 for 19 minutes (10:31–10:50 AM). Multiple users affected.', isVantage: true },
    ],
    caseVantageActions: [
      { id: 9406101, type: 'VantageAction', title: 'Site Error Correlation', time: '11/08, 12:00 PM', details: "Vantage linked Gary's support message timestamp (10:45 AM) with Sentry incident window (10:31–10:50 AM). Customer claim is likely valid.", isVantage: true, actionCategory: 'detection' },
    ],
    omniMessages: [
      { id: 9406501, direction: 'inbound', channel: 'Web', text: "I tried to skip this Inito strip refill this morning but the button crashed on me. Now I got a shipping confirmation. I have plenty of strips — I don't need this shipment. Can you cancel or stop it?", time: '11/08, 11:30 AM', sender: 'Gary V.' },
    ],
    copilotSuggestion: "Gary is a high-LTV subscriber. Offering a 'free next month' pause credit costs us ~$89 and saves a $17.50 intercept + potential 15-order subscriber churn. Pre-drafted response available."
  },

  // ══════════════════════════════════════════════════════════════════════════
  // RUPESH NEW STORIES (2 Vantage, 3 Customer)
  // ══════════════════════════════════════════════════════════════════════════

  // [Vantage] #US-9501 — ERP Integration Block (NetSuite 403)
  {
    id: '#US-9501', orderId: 'IL-FED-9501', zip: '60611', source: 'Vantage',
    status: 'Tech Hold', sla: '02d 04h', slaColor: 'sla-green',
    summary: 'Inito Monitor bulk order cleared fraud check but NetSuite fulfillment release API returned 403. Vantage auto-retry failed 3x. Order is physically packed but label not printed.',
    updates: 'API Error: ERP Integration Block', isVantageAlert: true,
    priority: 'High', customerName: 'Susan D.',
    carrier: 'FedEx', warehouse: 'ORD-01', assignee: 'Rupesh', date: '11/08',
    deliveryStatus: 'Ready to Pack — System Hold',
    fulfillmentCenter: 'Chicago IL (ORD-01)',
    intelligence: {
      breachProbability: 42, resolutionRunway: "10h 00m",
      riskAssessment: "MODERATE-HIGH — The Inito Monitor units (5 × INI-MON-V3) are physically staged and packed at ORD-01. The only blocker is a metadata sync — but if the daily FedEx truck leaves at 4 PM without this label printed, the order sits another 24 hours. NetSuite's service account 'vm-bot' has likely had its OAuth token revoked during a recent infra update.",
      caseSynthesis: "Vantage Fraud module approved the 5-unit bulk order at 09:00 AM. Vantage attempted to push fulfillment status 'RELEASED' to NetSuite ERP. NetSuite returned HTTP 403 Forbidden: 'Token Expired or Insufficient Permissions'. Vantage attempted an automated token refresh — the new token also failed. The NetSuite service account may have lost permissions during a platform update last night.",
      suggestedAction: "Log into NetSuite admin console (ns.inito.com). Navigate to Order #IL-9501. Manually click 'Release for Fulfillment'. Then notify ORD-01 Dispatch (Ext 317) to resume label printing. Do not wait for the API to self-heal — this is faster.",
      humanTouchAdvice: "No customer update needed. Susan won't know anything is wrong unless the order is delayed beyond the SLA. Keep this invisible and act before the 4 PM pickup."
    },
    customer: { name: 'Susan D.', email: 'susan.d@healthclinic.com', phone: '+1 (312) 555-7721', city: 'Chicago', state: 'IL', zipCode: '60611', fullAddress: '220 E Illinois St, Chicago, IL 60611', localTimezone: 'US Central (CST)', type: 'REPEAT', ltv: '$1,850', totalOrders: 12, orderWindow: '2 years', localTimeNow: '09:00 AM CST', isQuietHours: false },
    milestones: [
      { id: 1, action: 'Order Placed (Bulk)', location: 'Inito B2B Portal', time: '11/08, 08:30 AM', status: 'Completed', colorClass: 'green', icon: 'check', connectorTime: '30m', connectorColor: '#10b981' },
      { id: 2, action: 'Fraud Check Passed', location: 'Vantage AI', time: '11/08, 09:00 AM', status: 'Completed', colorClass: 'green', icon: 'check', connectorTime: '5m', connectorColor: '#10b981' },
      { id: 3, action: 'ERP Release Failed', location: 'NetSuite API', time: '11/08, 09:05 AM', status: 'Current', colorClass: 'red', icon: 'alert', connectorTime: '3 retries failed', connectorColor: '#ef4444' },
      { id: 4, action: 'Label Print & Pick', location: 'ORD-01', time: 'Pending', status: 'Pending', colorClass: 'gray', icon: 'clock', connectorTime: 'Pending', connectorColor: 'gray' },
      { id: 5, action: 'FedEx Pickup (4 PM)', location: 'ORD-01 Dock', time: 'Pending', status: 'Pending', colorClass: 'gray', icon: 'clock', connectorTime: null, connectorColor: 'gray' },
    ],
    caseAuditLogs: [
      { id: 9501001, type: 'System', title: 'NetSuite 403 — Auth Failure', time: '11/08, 09:05 AM', details: "HTTP 403: 'The access token is invalid or has expired.' Service account: vm-bot.", isVantage: true },
      { id: 9501002, type: 'System', title: 'Token Refresh Failed (3x)', time: '11/08, 09:10 AM', details: 'Vantage attempted OAuth token refresh 3 times. All failed. Escalated to Rupesh.', isVantage: true },
      { id: 9501003, type: 'Source', title: 'Bulk Order Ingested', time: '11/08, 08:30 AM', details: 'Inito Monitor (INI-MON-V3) × 5. B2B bulk order from health clinic. Fraud approved.', isVantage: false },
    ],
    caseVantageActions: [
      { id: 9501101, type: 'VantageAction', title: 'Fulfillment Release Attempted', time: '11/08, 09:05 AM', details: "Vantage sent 'RELEASED' status to NetSuite. Received 403. Retried x3. All failed.", isVantage: true, actionCategory: 'alert' },
      { id: 9501102, type: 'VantageAction', title: 'ERP Block Detected', time: '11/08, 09:10 AM', details: 'Escalated to Associate with 4 PM pickup window context.', isVantage: true, actionCategory: 'alert' },
    ],
    omniMessages: [],
    copilotSuggestion: "NetSuite token issue. Fastest fix: manual release in the console. Takes 2 minutes. ORD-01 will print the label immediately after."
  },

  // [Vantage] #US-9502 — Stockout Reallocation: NYC Warehouse Substitute
  {
    id: '#US-9502', orderId: 'WA-UPS-9502', zip: '98101', source: 'Vantage',
    status: 'OOS Reallocation', sla: '01d 18h', slaColor: 'sla-green',
    summary: 'Inito Monitor (INI-MON-V3) out of stock at SEA-01 (ghost inventory). Vantage located a unit at NYC-01 — rerouting requires $14.20 variance approval.',
    updates: 'Approval Needed: Shipping Variance', isVantageAlert: true,
    priority: 'Medium', customerName: 'Tom H.',
    carrier: 'UPS', warehouse: 'NYC-01', assignee: 'Rupesh', date: '11/08',
    deliveryStatus: 'Pending Inventory Reallocation',
    fulfillmentCenter: 'New York NY (NYC-01)',
    intelligence: {
      breachProbability: 28, resolutionRunway: "30h 00m",
      riskAssessment: "LOW-MODERATE — SLA runway is comfortable, but the cross-country reroute adds $14.20 in shipping cost from NYC-01. If Rupesh approves before 11 AM, Vantage can auto-print the NYC label and the order ships today. Any delay beyond noon risks missing the UPS pickup.",
      caseSynthesis: "Tom's Inito Monitor order was originally routed to SEA-01 (Seattle). During pick verification, SEA-01 flagged a ghost inventory discrepancy: System = 1 unit, Physical = 0 units. Vantage ran a cross-node inventory scan across all 12 fulfillment nodes and found 1 unit available in NYC-01. Air routing from NYC maintains the 2-day promise, but costs $14.20 more than ground from SEA-01.",
      suggestedAction: "Approve the $14.20 shipping variance. Vantage will auto-print the NYC-01 label and notify warehouse to dispatch upon approval. Total cost: $14.20 vs risk of a 3-5 day delay waiting for SEA-01 restock.",
      humanTouchAdvice: "Tom is a new customer — his first Inito experience. Proactively message him that we've upgraded his shipping to ensure on-time delivery. Frame it as a benefit, not a problem."
    },
    customer: { name: 'Tom H.', email: 'tom.h@startupfounders.com', phone: '+1 (206) 555-1122', city: 'Seattle', state: 'WA', zipCode: '98101', fullAddress: '1420 5th Ave, Suite 400, Seattle, WA 98101', localTimezone: 'US Pacific (PST)', type: 'NEW', ltv: '$149', totalOrders: 1, orderWindow: 'New', localTimeNow: '07:00 AM PST', isQuietHours: true },
    milestones: [
      { id: 1, action: 'Order Placed', location: 'Website', time: '11/08, 07:00 AM', status: 'Completed', colorClass: 'green', icon: 'check', connectorTime: '1h', connectorColor: '#10b981' },
      { id: 2, action: 'SEA-01 Inventory Fail', location: 'SEA-01', time: '11/08, 08:00 AM', status: 'Completed', colorClass: 'red', icon: 'alert', connectorTime: '15m', connectorColor: '#ef4444' },
      { id: 3, action: 'Cross-Node Match Found', location: 'Vantage AI (NYC-01)', time: '11/08, 08:15 AM', status: 'Current', colorClass: 'blue', icon: 'check', connectorTime: 'Awaiting Approval', connectorColor: '#3b82f6' },
      { id: 4, action: 'Label Print & Pick', location: 'NYC-01', time: 'Pending', status: 'Pending', colorClass: 'gray', icon: 'clock', connectorTime: 'Pending', connectorColor: 'gray' },
      { id: 5, action: 'UPS Air Dispatch', location: 'NYC-01 to Seattle', time: 'Pending', status: 'Pending', colorClass: 'gray', icon: 'clock', connectorTime: null, connectorColor: 'gray' },
    ],
    caseAuditLogs: [
      { id: 9502001, type: 'Warehouse', title: 'Cycle Count Error: SEA-01', time: '11/08, 08:00 AM', details: 'SEA-01 picker flagged INI-MON-V3 as missing. System count corrected: 1 → 0.', isVantage: false },
      { id: 9502002, type: 'Source', title: 'Order Ingested', time: '11/08, 07:00 AM', details: 'Inito Monitor (INI-MON-V3) × 1. Standard website order. Routed to SEA-01 initially.', isVantage: false },
    ],
    caseVantageActions: [
      { id: 9502101, type: 'VantageAction', title: 'Stockout Detected: SEA-01', time: '11/08, 08:01 AM', details: 'Vantage detected ghost inventory at SEA-01. Triggered cross-node search.', isVantage: true, actionCategory: 'detection' },
      { id: 9502102, type: 'VantageAction', title: 'Cross-Node Allocation Found', time: '11/08, 08:15 AM', details: 'NYC-01 confirmed 1 unit. Variance: $14.20. Awaiting Rupesh approval to print label.', isVantage: true, actionCategory: 'alert' },
    ],
    omniMessages: [],
    copilotSuggestion: "One click to approve this. The $14.20 is negligible vs losing a first-time customer. Draft ready: 'Hey Tom, we noticed a stock issue at your local warehouse and upgraded your shipment to ship from our East Coast facility — you'll still get it on time!'"
  },

  // [Customer] #US-9503 — Hub Loop: Package Bouncing IND <-> MEM
  {
    id: '#US-9503', orderId: 'IN-FED-9503', zip: '46201', source: 'Customer',
    status: 'In Transit (Looping)', sla: '00d 06h', slaColor: 'sla-red',
    summary: 'Inito Monitor package detected in a hub bounce loop: Indianapolis → Memphis → Indianapolis, 3 cycles. SLA breach in 6 hours.',
    updates: 'Loop Detected — Customer Escalating', isVantageAlert: false,
    priority: 'Critical', customerName: 'Raj P.',
    carrier: 'FedEx', warehouse: 'IND-01', assignee: 'Rupesh', date: '11/08',
    deliveryStatus: 'Hub Loop — Critical',
    fulfillmentCenter: 'Indianapolis IN (IND-01)',
    intelligence: {
      breachProbability: 92, resolutionRunway: "06h 00m",
      riskAssessment: "CRITICAL — The Inito Monitor package is trapped in an automated sort loop. Each bounce adds 18+ hours. With only 6 hours of SLA runway, FedEx's automated system will not resolve this in time. Only a physical manual pull at the Memphis hub can break the loop.",
      caseSynthesis: "Pattern: IND → MEM → IND → MEM → IND → MEM (3rd cycle). Root cause: an old packing slip from a previous return is stuck inside the box flap, presenting a conflicting ZIP code to the automated scanner at Indianapolis. The scanner reads the old label, rejects the zone, and routes it back to Memphis.",
      suggestedAction: "Call Memphis Hub Dispatch immediately. Request a 'Physical Pull & Manual Sort' for Tracking #9503. Tell them to look for a secondary barcode on the side of the box and peel it off before reprocessing. Time is critical.",
      humanTouchAdvice: "Raj is escalating — he's received carrier delay notifications 3 times now. Call him before he calls you. Be specific: explain the hub loop, that you have a human at Memphis resolving it, and give an honest revised ETA of 48 hours from now. Do not promise same-day."
    },
    customer: { name: 'Raj P.', email: 'raj.p@techconsult.in', phone: '+1 (317) 555-1234', city: 'Indianapolis', state: 'IN', zipCode: '46201', fullAddress: '300 N Meridian St, Suite 800, Indianapolis, IN 46204', localTimezone: 'US Eastern (EST)', type: 'REPEAT', ltv: '$1,100', totalOrders: 8, orderWindow: '1 year', localTimeNow: '10:00 AM EST', isQuietHours: false },
    milestones: [
      { id: 1, action: 'Order Picked Up', location: 'IND-01', time: '11/06, 10:00 AM', status: 'Completed', colorClass: 'green', icon: 'check', connectorTime: '18h', connectorColor: '#10b981' },
      { id: 2, action: 'Loop Cycle 1: MEM Hub', location: 'Memphis, TN', time: '11/07, 04:00 AM', status: 'Completed', colorClass: 'red', icon: 'alert', connectorTime: '18h', connectorColor: '#ef4444' },
      { id: 3, action: 'Loop Cycle 2: IND Reject', location: 'Indianapolis, IN', time: '11/07, 10:00 PM', status: 'Completed', colorClass: 'red', icon: 'alert', connectorTime: '18h', connectorColor: '#ef4444' },
      { id: 4, action: 'Loop Cycle 3: MEM Hub (Current)', location: 'Memphis, TN', time: '11/08, 04:00 PM', status: 'Current', colorClass: 'red', icon: 'alert', connectorTime: '—', connectorColor: '#ef4444' },
      { id: 5, action: 'Manual Sort & Reroute', location: 'MEM Hub', time: 'Pending', status: 'Pending', colorClass: 'gray', icon: 'clock', connectorTime: null, connectorColor: 'gray' },
    ],
    caseAuditLogs: [
      { id: 9503001, type: 'Customer', title: 'WebChat: 3rd Delay Notification', time: '11/08, 09:15 AM', details: "Raj: 'Why is my package in Memphis again? It's been 3 times. This is unacceptable.'", isVantage: false },
      { id: 9503002, type: 'Carrier', title: 'Zone Mismatch Exception (IND)', time: '11/08, 06:00 AM', details: 'FedEx Indianapolis: scanner rejected package. Error: Zone Conflict. Rerouted to MEM.', isVantage: false },
    ],
    caseVantageActions: [
      { id: 9503101, type: 'VantageAction', title: 'Hub Loop Pattern Detected', time: '11/08, 09:00 AM', details: 'Vantage detected 3-cycle IND→MEM bounce pattern. Escalated to Rupesh with SLA breach alert.', isVantage: true, actionCategory: 'detection' },
    ],
    omniMessages: [
      { id: 9503501, direction: 'inbound', channel: 'WebChat', text: "I've been tracking this Inito Monitor for 3 days. It keeps bouncing between Indianapolis and Memphis. I've gotten 3 delay notifications. This is really frustrating — I need this device.", time: '11/08, 09:15 AM', sender: 'Raj P.' },
    ],
    copilotSuggestion: "MEM Hub Dispatch: +1 (901) 555-0400. Ask for the Hub Supervisor directly. Reference: 'multiple-scan loop, zip conflict, manual peel needed'. They know the issue — they just need the specific tracking number."
  },

  // [Customer] #US-9504 — Premium Shipping Breach: Holiday Peak
  {
    id: '#US-9504', orderId: 'FL-USP-9504', zip: '33101', source: 'Customer',
    status: 'Delayed', sla: '01d 00h', slaColor: 'sla-red',
    summary: 'Customer paid $18 for 2-day shipping on Inito strip kit. Now 3 days. USPS holiday peak overload — package will arrive today but breach already occurred.',
    updates: 'SLA Breached — Customer Messaging', isVantageAlert: false,
    priority: 'Normal', customerName: 'Gloria M.',
    carrier: 'USPS', warehouse: 'MIA-03', assignee: 'Rupesh', date: '11/08',
    deliveryStatus: 'Late — Delivery Expected Today',
    fulfillmentCenter: 'Miami FL (MIA-03)',
    intelligence: {
      breachProbability: 100, resolutionRunway: "0h (Breach Confirmed)",
      riskAssessment: "LOW OPERATIONAL / MODERATE SENTIMENT — The Inito strip kit is arriving today (just 24 hours late). The physical delivery is not missed, but Gloria paid a premium for speed and the promise was broken. She is a repeat Inito subscriber — retaining her trust matters.",
      caseSynthesis: "USPS experienced Veteran's Day volume surge at the Miami distribution hub. The strip kit entered the network on time but stalled at Miami Hub for 22 hours. Vantage flagged the delay at 24 hours and auto-queued the shipping fee reimbursement.",
      suggestedAction: "Process a $18 shipping fee refund immediately (already pre-queued by Vantage). Write a brief, apologetic message. Confirm today's delivery expected time from the tracking data. No product action needed — strips are intact and arriving.",
      humanTouchAdvice: "Gloria is a subscription customer. Don't make her ask — proactively send the refund confirmation. A 'refund issued' message before she complains upgrades her experience from annoyed to impressed."
    },
    customer: { name: 'Gloria M.', email: 'gloria@modernfamily.com', phone: '+1 (786) 555-5555', city: 'Miami', state: 'FL', zipCode: '33101', fullAddress: '1601 Biscayne Blvd, Miami, FL 33132', localTimezone: 'US Eastern (EST)', type: 'REPEAT', ltv: '$710', totalOrders: 8, orderWindow: '14 months', localTimeNow: '10:00 AM EST', isQuietHours: false },
    milestones: [
      { id: 1, action: 'Order Placed', location: 'Inito Subscription', time: '11/05, 09:00 AM', status: 'Completed', colorClass: 'green', icon: 'check', connectorTime: '5h', connectorColor: '#10b981' },
      { id: 2, action: 'Picked Up by USPS', location: 'MIA-03', time: '11/05, 02:00 PM', status: 'Completed', colorClass: 'green', icon: 'check', connectorTime: '22h stalled', connectorColor: '#10b981' },
      { id: 3, action: 'Stalled: Miami Distribution', location: 'USPS Miami Hub', time: '11/06, 12:00 PM', status: 'Completed', colorClass: 'red', icon: 'alert', connectorTime: '1d 10h', connectorColor: '#ef4444' },
      { id: 4, action: 'Departed & In Transit', location: 'USPS Network', time: '11/08, 06:00 AM', status: 'Current', colorClass: 'blue', icon: 'clock', connectorTime: 'ETA Today', connectorColor: 'gray' },
      { id: 5, action: 'Delivery', location: 'Miami, FL', time: 'ETA: Today PM', status: 'Pending', colorClass: 'gray', icon: 'clock', connectorTime: null, connectorColor: 'gray' },
    ],
    caseAuditLogs: [
      { id: 9504001, type: 'Customer', title: 'Email: Late Delivery Complaint', time: '11/08, 08:30 AM', details: "Gloria: 'I paid for 2-day shipping and today is day 3. Where is my Inito strip kit?'", isVantage: false },
      { id: 9504002, type: 'Carrier', title: 'USPS Hub Delay', time: '11/06, 12:00 PM', details: 'Miami Distribution: peak volume backup. All Priority packages delayed 18–24h.', isVantage: false },
    ],
    caseVantageActions: [
      { id: 9504101, type: 'VantageAction', title: 'SLA Breach Detection', time: '11/08, 12:00 AM', details: 'Vantage marked order as SLA Breached (2-day window). $18 shipping refund auto-queued, pending associate confirmation.', isVantage: true, actionCategory: 'alert' },
    ],
    omniMessages: [
      { id: 9504501, direction: 'inbound', channel: 'Email', text: "Hi, I paid for 2-day shipping for my Inito strips. Now it's been 3 days. USPS tracking shows it's still 'in transit'. When will it arrive?", time: '11/08, 08:30 AM', sender: 'Gloria M.' },
    ],
    copilotSuggestion: "Tracking shows delivery by 8 PM today. The $18 refund is pre-queued — one click to confirm. Draft ready: 'We're sorry for the USPS delay. Your strips are expected today. We've already processed a full refund of your shipping fee.'"
  },

  // [Customer] #US-9505 — Quantity Mispick Dispute
  {
    id: '#US-9505', orderId: 'WA-FED-9505', zip: '98109', source: 'Customer',
    status: 'Quantity Dispute', sla: '02d 10h', slaColor: 'sla-green',
    summary: 'Customer ordered Inito Strip Kit (10-pack). Received only 1 strip. Warehouse weight log shows 0.24 lbs — contradicts expected 2.4 lbs for 10 strips.',
    updates: 'Photos Submitted', isVantageAlert: false,
    priority: 'Medium', customerName: 'David L.',
    carrier: 'FedEx', warehouse: 'SEA-02', assignee: 'Rupesh', date: '11/08',
    deliveryStatus: 'Partial Receipt — Quantity Error',
    fulfillmentCenter: 'Seattle WA (SEA-02)',
    intelligence: {
      breachProbability: 8, resolutionRunway: "58h 00m",
      riskAssessment: "LOW URGENCY / MODERATE ACCURACY ISSUE — Weight log confirms a 90% mispick. The 0.24 lbs recorded at SEA-02 is consistent with exactly 1 strip, not 10. The warehouse scale didn't fail — the picker pulled the wrong quantity and the weight check passed because the single-strip weight wasn't flagged.",
      caseSynthesis: "David ordered INI-STRIP-10 (10-pack hormone strip kit, expected weight ~2.4 lbs). SEA-02 weight bridge recorded 0.24 lbs — consistent with exactly 1 strip. Packer ID #442 completed this order. Vantage cross-referenced Packer 442's recent history: 3 quantity disputes in the past 7 days, all involving strip kits. Likely a systematic picker error.",
      suggestedAction: "Ship the correct 10-strip kit (INI-STRIP-10) via Priority 2-Day from SEA-02 immediately. Initiate a quality flag for Packer ID 442. Do NOT ask David to return the 1 strip — it's a consumable healthcare product.",
      humanTouchAdvice: "Apologize clearly and take full accountability. Confirm the corrected 10-strip shipment in your first message. Do not explain internal picker issues — just confirm the correction is happening now."
    },
    customer: { name: 'David L.', email: 'david.lim@example.com', phone: '+1 (206) 555-0122', city: 'Seattle', state: 'WA', zipCode: '98109', fullAddress: '400 Broad St, Seattle, WA 98109', localTimezone: 'US Pacific (PST)', type: 'NEW', ltv: '$89', totalOrders: 1, orderWindow: 'New', localTimeNow: '07:00 AM PST', isQuietHours: true },
    milestones: [
      { id: 1, action: 'Order Placed', location: 'Website', time: '11/05, 11:00 AM', status: 'Completed', colorClass: 'green', icon: 'check', connectorTime: '3h', connectorColor: '#10b981' },
      { id: 2, action: 'Packed at SEA-02', location: 'SEA-02 (Packer #442)', time: '11/05, 02:00 PM', status: 'Completed', colorClass: 'yellow', icon: 'alert', connectorTime: '2d', connectorColor: '#f59e0b' },
      { id: 3, action: 'FedEx Pickup', location: 'SEA-02', time: '11/05, 05:00 PM', status: 'Completed', colorClass: 'green', icon: 'check', connectorTime: '2d', connectorColor: '#10b981' },
      { id: 4, action: 'Delivered (Wrong Qty)', location: 'Seattle, WA', time: '11/07, 02:00 PM', status: 'Current', colorClass: 'red', icon: 'alert', connectorTime: '—', connectorColor: '#ef4444' },
      { id: 5, action: 'Replacement Dispatch', location: 'SEA-02', time: 'Pending', status: 'Pending', colorClass: 'gray', icon: 'clock', connectorTime: null, connectorColor: 'gray' },
    ],
    caseAuditLogs: [
      { id: 9505001, type: 'Customer', title: 'Web Message: Quantity Dispute', time: '11/08, 09:00 AM', details: "David: 'I ordered a 10-pack of Inito strips but only 1 strip was in the package. Please check — photos attached.'", isVantage: false },
      { id: 9505002, type: 'Warehouse', title: 'Weight Log: 0.24 lbs', time: '11/05, 02:05 PM', details: 'SEA-02 weight bridge: 0.24 lbs recorded. Expected for INI-STRIP-10 × 10: 2.4 lbs. Discrepancy not flagged at time of packing.', isVantage: false },
    ],
    caseVantageActions: [
      { id: 9505101, type: 'VantageAction', title: 'Weight Anomaly Analysis', time: '11/08, 09:30 AM', details: 'Vantage cross-referenced packed weight (0.24 lbs) with expected 10-strip kit weight (2.4 lbs). Confirmed mispick. Packer #442 flagged: 3 quantity disputes in past 7 days.', isVantage: true, actionCategory: 'detection' },
    ],
    omniMessages: [
      { id: 9505501, direction: 'inbound', channel: 'Web', text: "Hi, I ordered the 10-pack Inito hormone strip kit. When I opened the package there was only 1 strip inside. I've attached photos of the package and what I received. Please help.", time: '11/08, 09:00 AM', sender: 'David L.' },
    ],
    copilotSuggestion: "Packer #442 has a pattern. Escalate this to the SEA-02 quality team separately. For David: ship the correct 10-pack today. Draft: 'We've confirmed the mispick and your correct 10-strip kit is being dispatched today via Priority shipping — no action needed from you.'"
  },

  ...universalOrdersData
];

export const mockOrders: any[] = [
  { id: 'TX-FedEx-8911', caseId: '#US-8911', status: 'Stalled', sla: '03d 14h', summary: 'Stalled at picking phase in Austin facility after address correction.', customerName: 'Jordan P.', carrier: 'FedEx', warehouse: 'AUS-01', priority: 'High', assignee: 'Siddhant', date: '11/08' },
  { id: 'GA-FedEx-9024', caseId: '#US-9024', status: 'In Transit (Delayed)', sla: '00d 14h', summary: 'Sequential hub delays at Memphis and Indianapolis. Service level upgrade needed.', customerName: 'Michael T.', carrier: 'FedEx', warehouse: 'ATL-01', priority: 'Critical', assignee: 'Rupesh', date: '11/08' },
  { id: 'WA-FedEx-9112', caseId: '#US-9112', status: 'Held at OnSite', sla: '01d 12h', summary: 'Held at FedEx OnSite Walgreens; awaiting customer pickup with photo ID.', customerName: 'David L.', carrier: 'FedEx', warehouse: 'SEA-02', priority: 'Low', assignee: 'Simran', date: '11/08' },

  // Siddhant
  { id: 'GA-UPS-9401', caseId: '#US-9401', status: 'Stalled', sla: '01d 04h', summary: 'Warehouse conveyor failure. Inito Monitor in exception bin, not re-scanned.', customerName: 'Sarah K.', carrier: 'UPS', warehouse: 'ATL-01', priority: 'High', assignee: 'Siddhant', date: '11/08' },
  { id: 'MA-FED-9402', caseId: '#US-9402', status: 'Address Hold', sla: '02d 10h', summary: 'FedEx 422 Error on address sync. Manual portal fix needed before 4 PM.', customerName: 'Leo G.', carrier: 'FedEx', warehouse: 'BOS-04', priority: 'Medium', assignee: 'Siddhant', date: '11/08' },
  { id: 'CO-UPS-9403', caseId: '#US-9403', status: 'Downgraded', sla: '00d 20h', summary: 'LH Fertility Kit rerouted to Ground after UPS Air HAZMAT rejection.', customerName: 'Priya M.', carrier: 'UPS', warehouse: 'DEN-01', priority: 'Critical', assignee: 'Siddhant', date: '11/08' },
  { id: 'NY-FED-9404', caseId: '#US-9404', status: 'Delivered (Disputed)', sla: '00d 00h', summary: 'Misdelivery confirmed. Platinum customer non-receipt with photo mismatch.', customerName: 'Alice Wong', carrier: 'FedEx', warehouse: 'EWR-01', priority: 'High', assignee: 'Siddhant', date: '11/08' },
  { id: 'CA-UPS-9405', caseId: '#US-9405', status: 'Arrived Damaged', sla: '01d 06h', summary: 'Inito Monitor screen shattered in transit. Strip kit intact.', customerName: 'Brenda S.', carrier: 'UPS', warehouse: 'ONT-02', priority: 'High', assignee: 'Siddhant', date: '11/08' },
  { id: 'TX-USP-9406', caseId: '#US-9406', status: 'In Transit', sla: '03d 12h', summary: 'Late skip request. Subscription refill shipped 45 min after site outage.', customerName: 'Gary V.', carrier: 'USPS', warehouse: 'DAL-09', priority: 'Normal', assignee: 'Siddhant', date: '11/08' },

  // Rupesh
  { id: 'IL-FED-9501', caseId: '#US-9501', status: 'Tech Hold', sla: '02d 04h', summary: 'NetSuite 403 blocking fulfillment release. Manual ERP fix needed.', customerName: 'Susan D.', carrier: 'FedEx', warehouse: 'ORD-01', priority: 'High', assignee: 'Rupesh', date: '11/08' },
  { id: 'WA-UPS-9502', caseId: '#US-9502', status: 'OOS Reallocation', sla: '01d 18h', summary: 'Ghost inventory at SEA-01. NYC-01 substitute found, $14.20 variance pending.', customerName: 'Tom H.', carrier: 'UPS', warehouse: 'NYC-01', priority: 'Medium', assignee: 'Rupesh', date: '11/08' },
  { id: 'IN-FED-9503', caseId: '#US-9503', status: 'Hub Loop', sla: '00d 06h', summary: 'Package looping IND ↔ MEM. 3 cycles. Manual hub pull required.', customerName: 'Raj P.', carrier: 'FedEx', warehouse: 'IND-01', priority: 'Critical', assignee: 'Rupesh', date: '11/08' },
  { id: 'FL-USP-9504', caseId: '#US-9504', status: 'Delayed', sla: '01d 00h', summary: 'USPS holiday peak delay. 24h late. Strips arriving today. $18 refund queued.', customerName: 'Gloria M.', carrier: 'USPS', warehouse: 'MIA-03', priority: 'Normal', assignee: 'Rupesh', date: '11/08' },
  { id: 'WA-FED-9505', caseId: '#US-9505', status: 'Quantity Dispute', sla: '02d 10h', summary: 'Mispick: 10-strip kit, only 1 delivered. Weight log confirms 0.24 lbs vs 2.4 lbs.', customerName: 'David L.', carrier: 'FedEx', warehouse: 'SEA-02', priority: 'Medium', assignee: 'Rupesh', date: '11/08' },

  ...universalOrdersData.map(o => ({ id: o.id, caseId: null, status: o.status, sla: o.sla, summary: o.summary, customerName: o.customerName, carrier: o.carrier, warehouse: o.fulfillmentCenter, priority: o.priority, assignee: o.assignee, date: o.date }))
];

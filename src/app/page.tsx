"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PERSONAS, Persona } from '@/lib/personas';
import { PersonaCard } from '@/components/PersonaCard';
import { universalOrdersData } from './universalData';
import { mockCases, mockOrders } from './mockCasesData';
import { ShieldCheck, Command, Bot, User, ArrowLeft, Check, AlertCircle, Clock, Activity, ChevronsLeft, ChevronsRight, Settings, Phone, Mail, MessageSquare, Ticket, PhoneCall, Globe, Sparkles, Send, MapPin, Briefcase, FileSignature, ArrowRight, Truck, Package, Factory, ChevronDown, ChevronRight, Mic, Users, Camera, AlertOctagon, Info, ShoppingBag, X } from 'lucide-react';

const US_STATES_MAP: any = {
  "AL": { path: "M435,274 L429,313 L408,311 L410,274 Z", name: "Alabama", density: 12 },
  "AK": { path: "M60,330 L110,330 L110,380 L60,380 Z", name: "Alaska", density: 5 },
  "AZ": { path: "M118,220 L168,230 L155,296 L115,285 Z", name: "Arizona", density: 25 },
  "AR": { path: "M320,240 L358,240 L362,284 L318,280 Z", name: "Arkansas", density: 8 },
  "CA": { path: "M45,95 L95,115 L65,305 L20,270 Z", name: "California", density: 78 },
  "CO": { path: "M175,170 L245,182 L240,240 L170,225 Z", name: "Colorado", density: 34 },
  "CT": { path: "M550,118 L565,118 L565,130 L550,130 Z", name: "Connecticut", density: 15 },
  "DE": { path: "M532,158 L540,158 L540,165 L532,165 Z", name: "Delaware", density: 4 },
  "FL": { path: "M435,315 L495,335 L475,375 L430,345 Z", name: "Florida", density: 92 },
  "GA": { path: "M435,275 L472,275 L480,314 L440,314 Z", name: "Georgia", density: 45 },
  "HI": { path: "M140,350 L160,350 L160,370 L140,370 Z", name: "Hawaii", density: 10 },
  "ID": { path: "M97,63 L142,82 L132,183 L110,183 Z", name: "Idaho", density: 12 },
  "IL": { path: "M345,153 L382,148 L390,210 L350,218 Z", name: "Illinois", density: 56 },
  "IN": { path: "M385,153 L413,148 L420,205 L392,210 Z", name: "Indiana", density: 23 },
  "IA": { path: "M303,137 L343,142 L345,182 L285,185 Z", name: "Iowa", density: 18 },
  "KS": { path: "M247,192 L315,200 L313,243 L245,235 Z", name: "Kansas", density: 14 },
  "KY": { path: "M395,198 L450,190 L455,214 L395,225 Z", name: "Kentucky", density: 19 },
  "LA": { path: "M320,285 L365,285 L375,325 L320,320 Z", name: "Louisiana", density: 31 },
  "ME": { path: "M555,41 L585,55 L570,95 L545,85 Z", name: "Maine", density: 9 },
  "MD": { path: "M500,165 L530,165 L530,180 L500,180 Z", name: "Maryland", density: 21 },
  "MA": { path: "M545,108 L570,108 L570,118 L545,118 Z", name: "Massachusetts", density: 28 },
  "MI": { path: "M390,95 L445,95 L448,150 L400,150 Z", name: "Michigan", density: 42 },
  "MN": { path: "M290,75 L345,85 L340,145 L285,135 Z", name: "Minnesota", density: 22 },
  "MS": { path: "M368,284 L408,284 L408,328 L368,328 Z", name: "Mississippi", density: 11 },
  "MO": { path: "M315,195 L375,203 L375,250 L315,245 Z", name: "Missouri", density: 29 },
  "MT": { path: "M145,55 L255,80 L245,135 L145,120 Z", name: "Montana", density: 6 },
  "NE": { path: "M240,145 L320,155 L320,195 L240,185 Z", name: "Nebraska", density: 13 },
  "NV": { path: "M60,120 L115,145 L105,255 L55,215 Z", name: "Nevada", density: 17 },
  "NH": { path: "M545,85 L560,85 L560,115 L545,115 Z", name: "New Hampshire", density: 4 },
  "NJ": { path: "M538,135 L550,135 L550,168 L538,168 Z", name: "New Jersey", density: 52 },
  "NM": { path: "M170,230 L238,245 L235,310 L165,300 Z", name: "New Mexico", density: 12 },
  "NY": { path: "M485,95 L545,105 L540,145 L485,135 Z", name: "New York", density: 88 },
  "NC": { path: "M460,225 L525,215 L535,250 L465,260 Z", name: "North Carolina", density: 41 },
  "ND": { path: "M250,70 L305,75 L305,110 L250,110 Z", name: "North Dakota", density: 3 },
  "OH": { path: "M418,143 L468,138 L475,190 L425,198 Z", name: "Ohio", density: 49 },
  "OK": { path: "M225,243 L313,248 L313,283 L225,278 Z", name: "Oklahoma", density: 16 },
  "OR": { path: "M40,65 L108,85 L95,185 L35,165 Z", name: "Oregon", density: 32 },
  "PA": { path: "M475,138 L535,135 L535,175 L475,180 Z", name: "Pennsylvania", density: 61 },
  "RI": { path: "M568,118 L578,118 L578,130 L568,130 Z", name: "Rhode Island", density: 2 },
  "SC": { path: "M480,265 L520,255 L535,285 L490,295 Z", name: "South Carolina", density: 30 },
  "SD": { path: "M248,115 L315,120 L315,155 L245,150 Z", name: "South Dakota", density: 5 },
  "TN": { path: "M368,235 L445,230 L452,263 L372,270 Z", name: "Tennessee", density: 24 },
  "TX": { path: "M205,285 L315,290 L315,365 L215,395 Z", name: "Texas", density: 95 },
  "UT": { path: "M118,160 L172,172 L168,242 L115,225 Z", name: "Utah", density: 19 },
  "VT": { path: "M535,85 L548,85 L548,115 L535,115 Z", name: "Vermont", density: 2 },
  "VA": { path: "M470,195 L538,185 L550,215 L480,230 Z", name: "Virginia", density: 38 },
  "WA": { path: "M50,45 L125,70 L115,115 L45,100 Z", name: "Washington", density: 44 },
  "WV": { path: "M470,185 L495,180 L495,205 L470,210 Z", name: "West Virginia", density: 7 },
  "WI": { path: "M345,85 L388,95 L385,155 L345,148 Z", name: "Wisconsin", density: 21 },
  "WY": { path: "M168,125 L242,135 L238,190 L168,180 Z", name: "Wyoming", density: 4 },
};

const vpBusinessImpact = {
  costAvoidance: { total: "$124,500", label: "Cost Avoidance", sub: "Proactive Interceptions", trend: "+14%", change: "2,490 cases caught" },
  churnPrevention: { total: "$51,500", label: "Churn Prevention", sub: "$42k–$61k Confidence Band", note: "Modelled LTV protection" },
  refundReduction: { total: "$18,200", label: "Spend Reduction", sub: "Saved 12% OpEx", trend: "-8% refunds" },
  totalImpact: "$194,200"
};

const accuracyTrendData = [
  { date: '11/01', tpr: 88, fpr: 12, missed: 8 },
  { date: '11/02', tpr: 90, fpr: 10, missed: 7 },
  { date: '11/03', tpr: 87, fpr: 14, missed: 9 },
  { date: '11/04', tpr: 92, fpr: 8, missed: 5 },
  { date: '11/05', tpr: 94, fpr: 6, missed: 4 },
  { date: '11/06', tpr: 93, fpr: 7, missed: 6 },
  { date: '11/07', tpr: 95, fpr: 5, missed: 3 },
];

const riskDistributionData = [
  { label: '0%', category: 'Nominal', value: 68, color: 'var(--accent-lime)' },
  { label: '1–40%', category: 'Low', value: 18, color: '#fbbf24' },
  { label: '41–70%', category: 'Elevated', value: 9, color: '#f59e0b' },
  { label: '71–100%', category: 'Critical', value: 5, color: '#ef4444' },
];

const associateUtilData = [
  { name: 'Siddhant', cases: 142, followed: 88, deviated: 12, followedTime: '1.2h', followedBreach: '1.2%', deviatedTime: '1.8h', deviatedBreach: '4.5%' },
  { name: 'Rupesh', cases: 128, followed: 92, deviated: 8, followedTime: '1.1h', followedBreach: '0.8%', deviatedTime: '2.1h', deviatedBreach: '5.2%' },
  { name: 'Shankar', cases: 94, followed: 95, deviated: 5, followedTime: '0.9h', followedBreach: '0.5%', deviatedTime: '1.9h', deviatedBreach: '3.8%' },
];

const industryBenchmarks = {
  vantage: 34,
  industry: 28,
};

const opsPipelineData = [
  { date: '11/01', orders: 1200, labelGen: 1150, carrierHand: 1100, transit: 1050, delivery: 950, delivered: 900, exception: 50 },
  { date: '11/02', orders: 1350, labelGen: 1300, carrierHand: 1200, transit: 1150, delivery: 1000, delivered: 920, exception: 80 },
  { date: '11/03', orders: 1180, labelGen: 1120, carrierHand: 1080, transit: 1020, delivery: 910, delivered: 880, exception: 45 },
  { date: '11/04', orders: 1420, labelGen: 1380, carrierHand: 1300, transit: 1250, delivery: 1100, delivered: 1050, exception: 65 },
  { date: '11/05', orders: 1560, labelGen: 1500, carrierHand: 1420, transit: 1380, delivery: 1250, delivered: 1200, exception: 55 },
  { date: '11/06', orders: 1250, labelGen: 1200, carrierHand: 1150, transit: 1100, delivery: 1050, delivered: 1000, exception: 40 },
  { date: '11/07', orders: 1310, labelGen: 1280, carrierHand: 1220, transit: 1180, delivery: 1080, delivered: 1020, exception: 48 },
];

const breachDistributionData = [
  { range: '0–30m', count: 12, color: '#ef4444' },
  { range: '30–60m', count: 24, color: '#f59e0b' },
  { range: '1–2h', count: 45, color: '#fbbf24' },
  { range: '2–4h', count: 89, color: 'var(--accent-lime)' },
  { range: '4–8h', count: 156, color: 'var(--accent-lime)' },
  { range: '8h+', count: 204, color: 'var(--accent-lime)' },
];

const dailyBreachRateTrend = [
  { date: '11/01', rate: 1.2 },
  { date: '11/02', rate: 1.5 },
  { date: '11/03', rate: 1.4 },
  { date: '11/04', rate: 2.1 },
  { date: '11/05', rate: 1.8 },
  { date: '11/06', rate: 1.3 },
  { date: '11/07', rate: 1.1 },
];

const carrierMatrixData = [
  { name: 'FedEx', total: 12450, onTime: 92.4, delay: 4.2, exception: 3.1, escalation: 1.2, refund: 0.8 },
  { name: 'UPS', total: 10800, onTime: 94.1, delay: 3.8, exception: 2.8, escalation: 0.9, refund: 0.6 },
  { name: 'USPS', total: 8500, onTime: 89.5, delay: 12.4, exception: 5.2, escalation: 2.4, refund: 1.5 },
  { name: 'DHL', total: 4200, onTime: 91.8, delay: 6.5, exception: 3.8, escalation: 1.5, refund: 1.1 },
];

const regionalCarrierHealth: any = {
  'FedEx': { NE: 12, SE: 45, MW: 22, SW: 18, W: 31, NW: 14 },
  'UPS': { NE: 8, SE: 31, MW: 14, SW: 12, W: 19, NW: 11 },
  'USPS': { NE: 24, SE: 78, MW: 41, SW: 36, W: 52, NW: 29 },
  'DHL': { NE: 5, SE: 12, MW: 8, SW: 9, W: 14, NW: 6 },
};

const orderSourceHealthData = {
  volume: [
    { name: 'Web Direct', value: 55, color: 'var(--accent-lime)' },
    { name: 'Marketplace', value: 25, color: '#3b82f6' },
    { name: 'Wholesale', value: 15, color: '#8b5cf6' },
    { name: 'Subscription', value: 5, color: '#ec4899' },
  ],
  exceptionRates: [
    { name: 'Web Direct', rate: 2.4 },
    { name: 'Marketplace', rate: 7.2 },
    { name: 'Wholesale', rate: 3.8 },
    { name: 'Subscription', rate: 1.5 },
  ],
  trend: [
    { source: 'Web Direct', vol: 12450, volDelta: 4.2, exc: 2.4, excDelta: -0.5 },
    { source: 'Marketplace', vol: 5400, volDelta: 12.8, exc: 7.2, excDelta: 1.2 },
    { source: 'Wholesale', vol: 3200, volDelta: -2.1, exc: 3.8, excDelta: 0.2 },
    { source: 'Subscription', vol: 1100, volDelta: 8.5, exc: 1.5, excDelta: -0.1 },
  ]
};

const queueDepthData = [
  { date: '11/01', new: 45, inProg: 120, esc: 18 },
  { date: '11/02', new: 62, inProg: 135, esc: 22 },
  { date: '11/03', new: 55, inProg: 142, esc: 25 },
  { date: '11/04', new: 78, inProg: 158, esc: 35 },
  { date: '11/05', new: 65, inProg: 145, esc: 30 },
  { date: '11/06', new: 48, inProg: 130, esc: 24 },
  { date: '11/07', new: 52, inProg: 124, esc: 20 },
];

const mgrOpsTimelineStats: any = {
  'Today': { alerts: 12, new: 45, inProg: 120, esc: 18, resolved: 38, breachRisk: 5 },
  'This Week': { alerts: 84, new: 312, inProg: 450, esc: 124, resolved: 285, breachRisk: 42 },
  'Last 7 Days': { alerts: 92, new: 350, inProg: 480, esc: 140, resolved: 310, breachRisk: 48 },
};

const caseInflowResolutionData = [
  { date: 'Mon', opened: 45, resolved: 38 },
  { date: 'Tue', opened: 52, resolved: 55 },
  { date: 'Wed', opened: 48, resolved: 42 },
  { date: 'Thu', opened: 60, resolved: 52 },
  { date: 'Fri', opened: 55, resolved: 58 },
  { date: 'Sat', opened: 25, resolved: 30 },
  { date: 'Sun', opened: 20, resolved: 22 },
];

const associatePerfData = [
  { name: 'Siddhant', mean: 1.2, min: 0.4, max: 2.8 },
  { name: 'Rupesh', mean: 1.8, min: 0.6, max: 4.2 },
  { name: 'Sanket', mean: 1.5, min: 0.5, max: 3.1 },
];

const teamWorkloadMatrix = [
  { name: 'Siddhant', assigned: 14, high: 3, inProg: 8, resolved: 12, avgTime: '1.2h', breaches: 0 },
  { name: 'Rupesh', assigned: 18, high: 5, inProg: 10, resolved: 9, avgTime: '1.8h', breaches: 2 },
  { name: 'Sanket', assigned: 12, high: 2, inProg: 6, resolved: 15, avgTime: '1.5h', breaches: 0 },
];

const pipelineFunnelData = [
  { stage: 'Label Gen', count: 1240, pct: 100 },
  { stage: 'Handoff', count: 1180, pct: 95 },
  { stage: 'In Transit', count: 1050, pct: 84 },
  { stage: 'OFD', count: 920, pct: 74 },
  { stage: 'Delivered', count: 850, pct: 68 },
  { stage: 'Exception', count: 48, pct: 3.8 },
];

const stageDwellTimes = [
  { stage: 'Lab Gen', current: '2.4h', median: '2.1h', delta: '+0.3h' },
  { stage: 'Handoff', current: '5.8h', median: '4.2h', delta: '+1.6h' },
  { stage: 'Transit', current: '42h', median: '38h', delta: '+4h' },
  { stage: 'OFD', current: '4.5h', median: '4.2h', delta: '+0.3h' },
  { stage: 'Dlvrd', current: '12h', median: '10h', delta: '+2h' },
  { stage: 'Excp', current: '8.2h', median: '7.5h', delta: '+0.7h' },
];

const managerMetrics = [
  { label: 'Vantage Alerts', value: '12', change: '+2', trendCount: 14 },
  { label: 'New Queue', value: '45', change: '+8', trendCount: 12 },
  { label: 'In-Progress', value: '124', change: '-4', trendCount: 18 },
  { label: 'Escalated Today', value: '18', change: '+3', trendCount: 22 },
  { label: 'Resolved Today', value: '89', change: '+12', trendCount: 30 },
  { label: 'Breach Risk', value: '7', change: '-2', trendCount: 15 },
];

const smartAlerts = [
  { id: 1, type: 'Workload Imbalance', text: 'Siddhant has 11 high-priority cases vs team average of 4.2.', severity: 'critical', cta: 'Reassign Cases' },
  { id: 2, type: 'Carrier Spike', text: 'FedEx: 7 delay incidents in 4 hours — Southeast corridor.', severity: 'warning', cta: 'View Carrier Hub' },
  { id: 3, type: 'SLA Countdown', text: '#US-8911 is 14 mins from breach. Action required.', severity: 'urgent', cta: 'Action Escalation' },
];

const teamWorkload = [
  { name: 'Siddhant', total: 24, high: 11, status: 'Overloaded', color: 'var(--accent-coral)' },
  { name: 'Rupesh', total: 18, high: 4, status: 'Optimal', color: 'var(--accent-lime)' },
  { name: 'Shankar', total: 8, high: 2, status: 'Available', color: 'var(--accent-lime)' },
  { name: 'Simran', total: 5, high: 5, status: 'Active (Management)', color: '#3b82f6' },
];

const carrierHealth = [
  { carrier: 'FedEx', status: 'Issue Detected', incidents: 14, delayed: 12, lost: 2, color: 'var(--accent-coral)' },
  { carrier: 'UPS', status: 'Nominal', incidents: 2, delayed: 2, lost: 0, color: 'var(--accent-lime)' },
  { carrier: 'USPS', status: 'Nominal', incidents: 5, delayed: 5, lost: 0, color: 'var(--accent-lime)' },
];

// mockCases and mockOrders moved to mockCasesData.ts

export default function Home() {
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);

  // Dashboard Filters
  const [filterSource, setFilterSource] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterSLAHealth, setFilterSLAHealth] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dashboardTab, setDashboardTab] = useState<'Cases' | 'Orders' | 'Operations'>('Cases');
  const [opsTimeWindow, setOpsTimeWindow] = useState<string>('Today');

  // Shankar Technical Filters
  const [filterSystemHealth, setFilterSystemHealth] = useState<string>('All');
  const [filterAPIStatus, setFilterAPIStatus] = useState<string>('All');
  const [filterIntegrationSource, setFilterIntegrationSource] = useState<string>('All');

  // Expanded Global Filters
  const [filterPriority, setFilterPriority] = useState<string>('All');
  const [filterAssignee, setFilterAssignee] = useState<string>('All');
  const [filterDateRange, setFilterDateRange] = useState<string>('All');
  const [filterCarrier, setFilterCarrier] = useState<string[]>([]);
  const [filterWarehouse, setFilterWarehouse] = useState<string[]>([]);

  // Detail State
  const [activeCaseId, setActiveCaseId] = useState<string | null>(null);
  const [expandTimeline, setExpandTimeline] = useState<boolean>(false);

  // Pagination State
  const [casesPage, setCasesPage] = useState<number>(1);
  const [ordersPage, setOrdersPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 10;

  // Active Audit Log Modal State & Modals
  const [activeAuditLog, setActiveAuditLog] = useState<{ id: number; type: string; title: string; time: string; details: string; isVantage: boolean; transcript?: string; icon: React.ReactNode; duration?: string } | null>(null);
  const [showUnifiedDetailsModal, setShowUnifiedDetailsModal] = useState<boolean>(false);
  const [vpCarrierFilter, setVpCarrierFilter] = useState<string>('FedEx');
  const [showCustomerModal, setShowCustomerModal] = useState<boolean>(false);

  const activeCase = useMemo(() => {
    return mockCases.find(c => c.id === activeCaseId) || mockCases[0];
  }, [activeCaseId, mockCases]);

  // Ask Vantage AI Chat Module Settings
  const [showVantageModal, setShowVantageModal] = useState<boolean>(false);
  const [vantageInput, setVantageInput] = useState<string>("");
  const [vantageChat, setVantageChat] = useState<{ id: number, sender: 'user' | 'vantage', text: string, time: string }[]>([
    { id: 1, sender: 'vantage', text: 'Hello! I am your Vantage Assistant. I have analyzed all system logs and node constraints for this case. You can ask me to summarize customer history, trace tracking exceptions, or generate response templates.', time: 'Initial' }
  ]);

  // Omnichannel Input
  const [omniInput, setOmniInput] = useState<string>("");
  const [omniChannel, setOmniChannel] = useState<string>("SMS");

  // Transcript Expander Map
  const [expandedTranscripts, setExpandedTranscripts] = useState<Record<number, boolean>>({});

  // Handoff & Reassignment Logic Constraints
  const [showAssigneePopover, setShowAssigneePopover] = useState<boolean>(false);
  const [showHandoffInput, setShowHandoffInput] = useState<boolean>(false);
  const [targetAssignee, setTargetAssignee] = useState<Persona | null>(null);
  const [handoffNote, setHandoffNote] = useState<string>("");

  // Contextual Data Modals & Global Timezone logic
  const [showTimezoneMenu, setShowTimezoneMenu] = useState<boolean>(false);

  // Top Right Management Actions
  const [showActionDropdown, setShowActionDropdown] = useState<boolean>(false);
  const [actionMenuState, setActionMenuState] = useState<'Main' | 'Escalate' | 'Approval'>('Main');
  const [escalateNote, setEscalateNote] = useState<string>("");

  // Multi-Tab Workspace
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<string>('Internal Comments');
  const [contactCustomerUnlocked, setContactCustomerUnlocked] = useState<boolean>(false);

  // Internal Comments Tab Input
  const [internalCommentInput, setInternalCommentInput] = useState<string>("");

  // Technical Incident Detail State
  const [incidentStatus, setIncidentStatus] = useState<string>('Investigating');
  const [incidentNote, setIncidentNote] = useState<string>("");
  const [incidentTimeline, setIncidentTimeline] = useState<any[]>([
    { id: 5, type: 'Note', text: 'Confirmed 504s are isolated to the tracking cluster. Investigating load balancer config.', time: '15:35', user: 'Shankar' },
    { id: 4, type: 'Broadcast', text: 'Broadcast sent to 6 associates and 2 managers across 13 affected tickets.', time: '14:47' },
    { id: 3, type: 'Status', text: 'Status set to Investigating.', time: '14:22' },
    { id: 2, type: 'System', text: 'P95 latency climbed to 1,840ms. 3 hub endpoints returning 504.', time: '14:15' },
    { id: 1, type: 'Detection', text: 'Error rate exceeded 5% threshold on FedEx /track/v1/events. Incident auto-created.', time: '14:10' }
  ]);
  const [isBroadcasting, setIsBroadcasting] = useState<boolean>(false);
  const [broadcastDoneAt, setBroadcastDoneAt] = useState<string | null>(null);

  // Ticket Modal Logic
  const [showTicketModal, setShowTicketModal] = useState<boolean>(false);
  const [ticketEntity, setTicketEntity] = useState<string>("");
  const [ticketComment, setTicketComment] = useState<string>("");
  const [mgrActiveTab, setMgrActiveTab] = useState<'Escalations' | 'Approvals' | 'AI Flags'>('Escalations');
  const [mgrPagination, setMgrPagination] = useState(1);
  const [mgrExpandedRows, setMgrExpandedRows] = useState<Set<string>>(new Set());
  const [mgrGeoFilter, setMgrGeoFilter] = useState<string | null>(null);

  const toggleMgrRow = (id: string) => {
    const next = new Set(mgrExpandedRows);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setMgrExpandedRows(next);
  };

  const [ticketSeverity, setTicketSeverity] = useState<string>('Medium');

  // Base tracking standardizes against System time conceptually mapped locally
  const [globalTimezone, setGlobalTimezone] = useState<string>('System Time (PST)');

  const handleSelect = (persona: Persona) => {
    localStorage.setItem('selectedPersona', JSON.stringify(persona));
    setSelectedPersona(persona);
    // Force reset search and filters on persona switch to show their specific cases
    setSearchQuery('');
    setFilterStatus('All');
    setFilterPriority('All');
  };


  const filteredCases = useMemo(() => {
    return mockCases.filter(c => {
      // Fuzzy Universal Search
      const searchStr = searchQuery.toLowerCase();
      const associatedCaseId = c.id.toLowerCase(); // In our mock, the case id IS the primary ID
      const matchSearch = searchQuery === '' ||
        c.id.toLowerCase().includes(searchStr) ||
        (c.orderId && c.orderId.toLowerCase().includes(searchStr)) ||
        c.customerName.toLowerCase().includes(searchStr) ||
        c.summary.toLowerCase().includes(searchStr);

      // Global Shared Filters
      const matchStatus = filterStatus === 'All' || c.status === filterStatus;
      const matchSLAHealth = filterSLAHealth === 'All' ||
        (filterSLAHealth === 'Breached' && c.sla === '00d 00h') ||
        (filterSLAHealth === 'Breach risk' && c.slaColor === 'sla-red' && c.sla !== '00d 00h') ||
        (filterSLAHealth === 'On time' && c.slaColor === 'sla-green');
      const matchPriority = filterPriority === 'All' || c.priority === filterPriority;
      const matchAssignee = filterAssignee === 'All' || c.assignee === filterAssignee;
      const matchCarrier = filterCarrier.length === 0 || filterCarrier.includes(c.carrier);
      const matchWarehouse = filterWarehouse.length === 0 || filterWarehouse.includes(c.warehouse);

      // Source Filter (Cases Only)
      const matchSource = filterSource === 'All' || c.source === filterSource;

      if (selectedPersona?.name === 'Shankar') {
        const isInfra = c.id.startsWith('INFRA-');
        if (!isInfra) return false;

        const matchIntegration = filterIntegrationSource === 'All' || c.integrationSource === filterIntegrationSource;
        let matchAPI = filterAPIStatus === 'All';
        if (filterAPIStatus === 'Success') matchAPI = c.techStatus === 'Success';
        if (filterAPIStatus === '5xx Error') matchAPI = c.techStatus !== 'Success' && c.techStatus !== 'Critical Error';
        if (filterAPIStatus === 'Pings Failed') matchAPI = c.techStatus === 'Critical Error';

        return matchSearch && matchIntegration && matchAPI;
      }

      // Orders Tab: Global Visibility (Universal logic)
      if (dashboardTab === 'Orders') return matchSearch && matchStatus && matchSLAHealth && matchPriority && matchCarrier && matchWarehouse;

      // Cases Tab: Assignee-specific and Source-specific
      const matchAssigneeCase = c.assignee === selectedPersona?.name;
      const matchSourceCase = c.source === 'Vantage' || c.source === 'Customer';
      return matchSearch && matchAssigneeCase && matchSourceCase && matchStatus && matchSLAHealth && matchPriority && matchCarrier && matchWarehouse;
    });
  }, [filterSource, filterStatus, filterSLAHealth, searchQuery, selectedPersona, filterIntegrationSource, filterAPIStatus, filterPriority, filterAssignee, filterCarrier, filterWarehouse, dashboardTab]);

  const filteredOrders = useMemo(() => {
    return mockOrders.filter(o => {
      const searchStr = searchQuery.toLowerCase();
      const associatedCase = mockCases.find(c => c.id === o.id);
      const caseIdMatch = associatedCase ? associatedCase.id.toLowerCase().includes(searchStr) : false;

      const matchSearch = searchQuery === '' ||
        o.id.toLowerCase().includes(searchStr) ||
        o.customerName.toLowerCase().includes(searchStr) ||
        o.summary.toLowerCase().includes(searchStr) ||
        caseIdMatch;

      const matchStatus = filterStatus === 'All' || o.status === filterStatus;
      const matchPriority = filterPriority === 'All' || o.priority === filterPriority;
      const matchAssignee = filterAssignee === 'All' || o.assignee === filterAssignee;
      const matchCarrier = filterCarrier.length === 0 || filterCarrier.includes(o.carrier);
      const matchWarehouse = filterWarehouse.length === 0 || filterWarehouse.includes(o.warehouse);

      return matchSearch && matchStatus && matchPriority && matchAssignee && matchCarrier && matchWarehouse;
    });
  }, [searchQuery, filterStatus, filterPriority, filterAssignee, filterCarrier, filterWarehouse, mockCases]);

  // Pagination Logic
  const paginatedCases = useMemo(() => {
    const startIndex = (casesPage - 1) * ITEMS_PER_PAGE;
    return filteredCases.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredCases, casesPage]);

  const paginatedOrders = useMemo(() => {
    const startIndex = (ordersPage - 1) * ITEMS_PER_PAGE;
    return filteredOrders.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredOrders, ordersPage]);

  const totalCasesPages = Math.ceil(filteredCases.length / ITEMS_PER_PAGE);
  const totalOrdersPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);

  const renderPagination = (currentPage: number, totalPages: number, setPage: (p: number) => void) => {
    if (totalPages <= 1) return null;
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', padding: '24px', borderTop: '1px solid var(--bg-border)' }}>
        <button
          onClick={() => setPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          style={{ background: 'var(--bg-deep)', border: '1px solid var(--bg-border)', color: 'var(--text-white)', padding: '6px 12px', borderRadius: '4px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', opacity: currentPage === 1 ? 0.5 : 1, fontSize: '12px' }}
        >
          Previous
        </button>
        <span style={{ fontSize: '12px', color: 'var(--text-gray)' }}>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          style={{ background: 'var(--bg-deep)', border: '1px solid var(--bg-border)', color: 'var(--text-white)', padding: '6px 12px', borderRadius: '4px', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', opacity: currentPage === totalPages ? 0.5 : 1, fontSize: '12px' }}
        >
          Next
        </button>
      </div>
    );
  }

  const vantageCases = filteredCases.filter(c => c.isVantageAlert);
  const generalCases = filteredCases.filter(c => !c.isVantageAlert);

  // Helper to get icon for audit log type
  const getLogIcon = (type: string) => {
    switch (type) {
      case 'Internal': return <Users size={14} />;
      case 'Carrier': return <Truck size={14} />;
      case 'Warehouse': return <Factory size={14} />;
      case 'Fulfillment': return <Package size={14} />;
      case 'Customer': return <Mail size={14} />;
      case 'Source': return <ShoppingBag size={14} />;
      case 'System': return <Settings size={14} />;
      case 'Call': return <PhoneCall size={14} />;
      case 'VantageAction': return <Bot size={14} />;
      default: return <Settings size={14} />;
    }
  };

  // Per-case audit logs and vantage actions — dynamically derived from active case
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [vantageActionsLogs, setVantageActionsLogs] = useState<any[]>([]);

  // Sync Logic engine computing simplified offset adjustments globally dynamically explicitly parsing mapping limits.
  const adjustTimestamp = (baseTime: string) => {
    const tzOffsets: Record<string, number> = {
      'System Time (PST)': 0,
      'US Central (CST)': 2,
      'US Eastern (EST)': 3,
    };

    const offset = tzOffsets[globalTimezone] || 0;
    if (offset === 0) return baseTime;

    if (baseTime === 'Initial') return getLogTimestamp();

    const match = baseTime.match(/(.+), (\d+):(\d+) (AM|PM)/);
    if (!match) return baseTime;

    let [_, datePart, hh, mm, ampm] = match;
    let hours = parseInt(hh, 10);
    if (ampm === 'PM' && hours !== 12) hours += 12;
    if (ampm === 'AM' && hours === 12) hours = 0;

    hours += offset;

    if (hours >= 24) { hours -= 24; }
    else if (hours < 0) { hours += 24; }

    const newAmpm = hours >= 12 ? 'PM' : 'AM';
    let newHh = hours % 12;
    if (newHh === 0) newHh = 12;

    return `${datePart}, ${String(newHh).padStart(2, '0')}:${mm} ${newAmpm}`;
  };

  const getLogTimestamp = () => {
    const now = new Date();
    const formattedDate = `${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')}`;
    let hours = now.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${formattedDate}, ${String(hours).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} ${ampm}`;
  };

  const get24hTimestamp = () => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  };

  const submitVantageQuery = () => {
    if (!vantageInput.trim()) return;

    const timeRef = getLogTimestamp();

    const newChatMsg = { id: Date.now(), sender: 'user' as const, text: vantageInput, time: timeRef };
    setVantageChat(prev => [...prev, newChatMsg]);
    setVantageInput("");

    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        sender: 'vantage' as const,
        text: 'Based on cross-referencing recent logs, the exception matches localized extreme weather loops preventing immediate hub deployment natively successfully. Re-routing recommended.',
        time: getLogTimestamp()
      };
      setVantageChat(prev => [...prev, botResponse]);
    }, 1200);
  };

  const submitHandoffAssignment = () => {
    if (!handoffNote.trim() || !targetAssignee) return;

    const newLog = {
      id: Date.now(),
      type: 'Internal',
      icon: <Users size={14} />,
      title: 'Case Reassignment',
      time: getLogTimestamp(),
      details: `Case reassigned from ${selectedPersona?.name} to new Associate ${targetAssignee.name}. Note: "${handoffNote}"`,
      isVantage: false
    };

    setAuditLogs([newLog, ...auditLogs]);
    setShowHandoffInput(false);
    setHandoffNote("");
    setTargetAssignee(null);
  };

  const submitInternalComment = () => {
    if (!internalCommentInput.trim()) return;

    const newLog = {
      id: Date.now(),
      type: 'Internal',
      icon: <Users size={14} />,
      title: 'Internal Team Comment',
      time: getLogTimestamp(),
      details: `${selectedPersona?.name} posted: "${internalCommentInput}"`,
      isVantage: false
    };

    setAuditLogs([newLog, ...auditLogs]);
    setInternalCommentInput("");
  };

  const sendOmniChannelMessage = () => {
    if (!omniInput.trim()) return;

    let iconToUse = <Mail size={14} />;
    if (omniChannel === 'SMS') iconToUse = <MessageSquare size={14} />;
    if (omniChannel === 'WhatsApp') iconToUse = <MessageSquare size={14} />;

    const newLog = {
      id: Date.now(),
      type: 'Customer',
      icon: iconToUse,
      title: `Outbound ${omniChannel}`,
      time: getLogTimestamp(),
      details: `Message sent dynamically securely handling execution: "${omniInput}"`,
      isVantage: false
    };

    setAuditLogs([newLog, ...auditLogs]);
    setOmniInput("");
  };

  const simulateCallEntity = (entityName: string) => {
    let mappingType = entityName;
    if (entityName === 'Internal Comments') mappingType = 'Internal';

    const newLog = {
      id: Date.now(),
      type: mappingType === 'Activity Log' ? 'System' : mappingType,
      icon: <PhoneCall size={14} />,
      title: 'Voice Call',
      time: getLogTimestamp(),
      duration: '02m 45s',
      details: `Successfully connected with ${entityName} support node. Verified parameters safely globally mapped efficiently correctly implicitly perfectly dynamically reliably perfectly tracking elegantly expertly dynamically securely intelligently creatively natively.`,
      transcript: `Associate: Hello, calling regarding Inito order #US-8821.\n${entityName} Rep: Let me pull that up. Looks like it's currently at the sort facility.\nAssociate: Correct, we need to bypass the standard sort to avoid SLA breach.\n${entityName} Rep: Okay, I have authorization to reroute. Tracking should be updated natively within 30 minutes.`,
      isVantage: false
    };

    setAuditLogs([newLog, ...auditLogs]);
    setExpandedTranscripts(prev => ({ ...prev, [newLog.id]: true }));
  }

  function renderGlobalControlBar() {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 0 16px 0' }}>
        <button onClick={() => { setShowTimezoneMenu(!showTimezoneMenu); }} style={{ background: 'var(--bg-deep)', border: '1px solid var(--accent-sentry)', color: 'var(--text-white)', padding: '8px 16px', fontSize: '11px', fontWeight: 'bold', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}>
          <Globe size={14} color="var(--accent-sentry)" />
          {globalTimezone}
        </button>
      </div>
    );
  }

  function renderDashboardTabs() {
    return (
      <div style={{ display: 'flex', gap: '24px', margin: '24px 0 0px 0', borderBottom: '1px solid var(--bg-border)', paddingBottom: '0', paddingLeft: '32px', paddingRight: '32px' }}>
        <button
          onClick={() => { setDashboardTab('Cases'); setCasesPage(1); }}
          style={{
            padding: '12px 0',
            background: 'none',
            border: 'none',
            borderBottom: dashboardTab === 'Cases' ? '2px solid var(--accent-sentry)' : '2px solid transparent',
            color: dashboardTab === 'Cases' ? 'var(--text-white)' : 'var(--text-gray)',
            fontSize: '14px',
            fontWeight: dashboardTab === 'Cases' ? 'bold' : 'normal',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          Open Cases
        </button>
        <button
          onClick={() => { setDashboardTab('Orders'); setOrdersPage(1); }}
          style={{
            padding: '12px 0',
            background: 'none',
            border: 'none',
            borderBottom: dashboardTab === 'Orders' ? '2px solid var(--accent-sentry)' : '2px solid transparent',
            color: dashboardTab === 'Orders' ? 'var(--text-white)' : 'var(--text-gray)',
            fontSize: '14px',
            fontWeight: dashboardTab === 'Orders' ? 'bold' : 'normal',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          All Active Orders
        </button>
        {selectedPersona?.name === 'Simran' && (
          <button
            onClick={() => { setDashboardTab('Operations'); setCasesPage(1); setOrdersPage(1); }}
            style={{
              padding: '12px 0',
              background: 'none',
              border: 'none',
              borderBottom: dashboardTab === 'Operations' ? '2px solid var(--accent-sentry)' : '2px solid transparent',
              color: dashboardTab === 'Operations' ? 'var(--text-white)' : 'var(--text-gray)',
              fontSize: '14px',
              fontWeight: dashboardTab === 'Operations' ? 'bold' : 'normal',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Operations
          </button>
        )}
      </div>
    );
  }

  function renderFilterRow() {
    const isShankar = selectedPersona?.name === 'Shankar';

    return (
      <div className="filter-row" style={{ display: 'grid', gridTemplateColumns: isShankar ? 'repeat(5, 1fr) 1.2fr 120px' : 'repeat(4, 1fr) 1.5fr', gap: '12px', padding: '16px 0' }}>
        {/* Basic Filters */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <select className="filter-select" value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)} style={{ flex: 1 }}>
            <option value="All">All Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <select className="filter-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={{ flex: 1 }}>
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="In-progress">In-progress</option>
            <option value="Escalated">Escalated</option>
            <option value="Done">Done</option>
          </select>
        </div>

        {/* Identity & Time */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <select className="filter-select" value={filterAssignee} onChange={(e) => setFilterAssignee(e.target.value)} style={{ flex: 1 }}>
            <option value="All">All Assignees</option>
            {PERSONAS.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
          </select>
          <select className="filter-select" value={filterDateRange} onChange={(e) => setFilterDateRange(e.target.value)} style={{ flex: 1 }}>
            <option value="All">All Dates</option>
            <option value="Today">Today</option>
            <option value="Last 7 Days">Last 7 Days</option>
          </select>
        </div>

        {/* Logistics Multi-Selects */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <select className="filter-select" style={{ width: '100%', opacity: 0.5 }}>
              <option>{filterCarrier.length > 0 ? `${filterCarrier.length} Carriers` : 'All Carriers'}</option>
            </select>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0, cursor: 'pointer' }}>
              <select multiple value={filterCarrier} onChange={(e) => setFilterCarrier(Array.from(e.target.selectedOptions, option => option.value))} style={{ width: '100%', height: '100%' }}>
                <option value="FedEx">FedEx</option>
                <option value="UPS">UPS</option>
                <option value="USPS">USPS</option>
                <option value="DHL">DHL</option>
              </select>
            </div>
          </div>
          <div style={{ position: 'relative', flex: 1 }}>
            <select className="filter-select" style={{ width: '100%', opacity: 0.5 }}>
              <option>{filterWarehouse.length > 0 ? `${filterWarehouse.length} Warehouses` : 'All Warehouses'}</option>
            </select>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0, cursor: 'pointer' }}>
              <select multiple value={filterWarehouse} onChange={(e) => setFilterWarehouse(Array.from(e.target.selectedOptions, option => option.value))} style={{ width: '100%', height: '100%' }}>
                <option value="CHI-01">CHI-01</option>
                <option value="MEM-04">MEM-04</option>
                <option value="ATL-02">ATL-02</option>
              </select>
            </div>
          </div>
        </div>

        {/* Persona Specific or SLA */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {isShankar && dashboardTab === 'Cases' ? (
            <select className="filter-select" value={filterIntegrationSource} onChange={(e) => setFilterIntegrationSource(e.target.value)} style={{ flex: 1 }}>
              <option value="All">All Integration Sources</option>
              <option value="Shopify API">Shopify API</option>
              <option value="FedEx Webhook">FedEx Webhook</option>
              <option value="Amazon SP-API">Amazon SP-API</option>
              <option value="UPS Webhook">UPS Webhook</option>
            </select>
          ) : (
            <>
              {dashboardTab === 'Cases' && (
                <select className="filter-select" value={filterSource} onChange={(e) => setFilterSource(e.target.value)} style={{ flex: 1 }}>
                  <option value="All">All Sources</option>
                  <option value="Vantage">Vantage</option>
                  <option value="Customer">Customer</option>
                </select>
              )}
            </>
          )}
          <select className="filter-select" value={filterSLAHealth} onChange={(e) => setFilterSLAHealth(e.target.value)} style={{ flex: 1 }}>
            <option value="All">All SLA</option>
            <option value="Breached">Breached</option>
            <option value="Breach risk">Risk</option>
          </select>
        </div>

        {/* Extra Shankar Tech or Blank filler */}
        {isShankar && (
          <div style={{ display: 'flex', gap: '8px' }}>
            {dashboardTab === 'Cases' && (
              <select className="filter-select" value={filterAPIStatus} onChange={(e) => setFilterAPIStatus(e.target.value)} style={{ flex: 1 }}>
                <option value="All">All API Status</option>
                <option value="Success">Success</option>
                <option value="5xx Error">Server Error</option>
                <option value="Pings Failed">Pings Failed</option>
              </select>
            )}
          </div>
        )}

        {/* Unified Search */}
        <div style={{ position: 'relative', width: '100%' }}>
          <input
            type="text"
            className="search-input"
            placeholder="Search tickets — by Case ID (e.g. #US-9401), Order ID, or Customer Name (e.g. 'Priya M.')"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', paddingRight: '120px' }}
          />
          {searchQuery === '' && (
            <span style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '10px', color: 'var(--text-gray)', pointerEvents: 'none', whiteSpace: 'nowrap', background: 'var(--bg-card)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--bg-border)' }}>
              Search by customer name too
            </span>
          )}
        </div>
      </div>
    );
  };

  function renderAllOpenOrders() {
    return (
      <div className="main-workspace overflow-auto" style={{ marginTop: '24px' }}>
        <div className="list-section-header">All Active Orders</div>
        <div className="data-table">
          <div className="data-row data-header" style={{ gridTemplateColumns: 'minmax(120px, 1.5fr) 140px 1.2fr 100px 1.2fr 2fr' }}>
            <div className="data-cell">Order ID</div>
            <div className="data-cell">Case ID</div>
            <div className="data-cell">Status</div>
            <div className="data-cell">Date</div>
            <div className="data-cell">SLA Remaining</div>
            <div className="data-cell">Summary</div>
          </div>
          {paginatedOrders.map(order => {
            const associatedCase = mockCases.find(c => c.id === (order as any).caseId);
            return (
              <div
                className="data-row"
                key={order.id}
                onClick={() => handleCaseSelection(order.id)}
                style={{ gridTemplateColumns: 'minmax(120px, 1.5fr) 140px 1.2fr 100px 1.2fr 2fr', cursor: 'pointer' }}
              >
                <div className="data-cell" style={{ fontWeight: 'bold', color: 'var(--text-white)', fontFamily: 'monospace', letterSpacing: '0.02em' }}>{order.id}</div>
                <div className="data-cell" style={{ color: associatedCase ? 'var(--accent-sentry)' : 'var(--text-gray)', fontSize: '11px', fontWeight: associatedCase ? 'bold' : 'normal' }}>
                  {associatedCase ? associatedCase.id : '--'}
                </div>
                <div className="data-cell">
                  <span style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-gray)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    {order.status}
                  </span>
                </div>
                <div className="data-cell" style={{ fontSize: '12px', color: 'var(--text-gray)' }}>{order.date}</div>
                <div className="data-cell">
                  <span style={{ fontWeight: order.sla === '00d 00h' ? '800' : 'bold', color: order.sla === '00d 00h' ? 'var(--accent-coral)' : 'var(--text-white)' }}>
                    {order.sla === '00d 00h' ? 'BREACHED' : order.sla}
                  </span>
                </div>
                <div className="data-cell" style={{ fontSize: '13px', color: 'var(--text-gray)' }}>{order.summary}</div>
              </div>
            );
          })}
        </div>
        {renderPagination(ordersPage, totalOrdersPages, setOrdersPage)}
      </div>
    );
  };

  // Handle Case Selection and Tab Reset logic
  const handleCaseSelection = (caseId: string | null) => {
    setActiveCaseId(caseId);
    if (caseId) {
      const selectedCase = mockCases.find(c => c.id === caseId);
      if (selectedCase?.source === 'Vantage') {
        setActiveWorkspaceTab('Vantage Actions');
        setContactCustomerUnlocked(false);
      } else {
        setActiveWorkspaceTab('Internal Comments');
        setContactCustomerUnlocked(true); // Default to unlocked for customer sources
      }
      // Initialize per-case audit logs with icons
      if (selectedCase?.caseAuditLogs) {
        setAuditLogs(selectedCase.caseAuditLogs.map((log: any) => ({ ...log, icon: getLogIcon(log.type) })));
      } else {
        setAuditLogs([]);
      }
      if (selectedCase?.caseVantageActions) {
        setVantageActionsLogs(selectedCase.caseVantageActions.map((log: any) => ({ ...log, icon: getLogIcon(log.type) })));
      } else {
        setVantageActionsLogs([]);
      }
    }
  };

  const handleCreateTicket = () => {
    if (!ticketComment.trim()) return;

    const newLog = {
      id: Date.now(),
      type: ticketEntity,
      icon: <Ticket size={14} />,
      title: `${ticketEntity} Ticket Raised`,
      time: getLogTimestamp(),
      details: `Severity: [${ticketSeverity}] | Context: "${ticketComment}" | Image attachments mapped explicitly securely resolving perfectly properly reliably intelligently exactly elegantly properly appropriately automatically exactly seamlessly successfully.`,
      isVantage: false
    };

    setAuditLogs([newLog, ...auditLogs]);
    setShowTicketModal(false);
    setTicketComment("");
    setTicketSeverity("Medium");
  }

  const handleActionExecute = (actionType: string, note?: string) => {
    let actionLog = '';
    if (actionType === 'Escalate') {
      if (!note?.trim()) return;
      actionLog = `Case internally escalated to assigned Manager (Sarah Jenkins). Note: "${note}"`;
    } else if (actionType === 'Refund') {
      actionLog = `Refund processing request formally initialized for approval.`;
    } else if (actionType === 'Cancel') {
      actionLog = `Order cancellation request formally initialized for approval.`;
    }

    const newLog = {
      id: Date.now(),
      type: 'Internal',
      icon: <Briefcase size={14} />,
      title: `Management Action: ${actionType}`,
      time: getLogTimestamp(),
      details: actionLog,
      isVantage: false
    };

    setAuditLogs([newLog, ...auditLogs]);
    setShowActionDropdown(false);
    setActionMenuState('Main');
    setEscalateNote("");
  }

  function renderShankarDashboard() {
    return (
      <>
        {renderGlobalControlBar()}

        <div className="dashboard-layer">
          <div className="data-card" style={{ borderLeft: '4px solid var(--accent-lime)' }}>
            <div className="data-card-title">System Health</div>
            <div className="data-card-value" style={{ fontSize: '18px', color: 'var(--accent-lime)' }}>Operational</div>
            <div style={{ fontSize: '11px', color: 'var(--text-gray)', marginTop: '4px' }}>Avg API Latency: 42ms</div>
          </div>
          <div className="data-card">
            <div className="data-card-title">Global System Latency</div>
            <div style={{ width: '100%', height: '40px', marginTop: '4px' }}>
              <svg viewBox="0 0 100 40" style={{ width: '100%', height: '100%' }}>
                <path d="M0 35 Q 10 32, 20 25 T 40 30 T 60 15 T 80 18 T 100 5" fill="none" stroke="var(--accent-lime)" strokeWidth="2" />
              </svg>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-gray)', marginTop: '4px' }}>P99: 242ms (Avg)</div>
          </div>
          <div className="data-card">
            <div className="data-card-title" style={{ color: 'var(--accent-coral)' }}>Error Rate (24h)</div>
            <div className="data-card-value">1.2%</div>
            <div style={{ fontSize: '11px', color: 'var(--text-gray)', marginTop: '4px' }}>Failed Webhooks: 18</div>
          </div>
        </div>

        {renderDashboardTabs()}

        {renderFilterRow()}

        {dashboardTab === 'Cases' ? (
          <>
            <div className="main-workspace overflow-auto">
              <div className="list-section-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  Technical Operations Command Center
                  <span title="Technical view focused on API health, Integration state, and System-to-System handshakes." style={{ cursor: 'help', display: 'flex' }}>
                    <Info size={16} />
                  </span>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--accent-lime)', background: 'rgba(194, 239, 78, 0.05)', padding: '4px 12px', borderRadius: '16px', border: '1px solid rgba(194, 239, 78, 0.2)' }}>
                  Observability: Active (Pings: 0.2s)
                </div>
              </div>

              <div className="data-table">
                <div className="data-row data-header" style={{ gridTemplateColumns: 'minmax(100px, 1fr) 1fr 1.5fr 1.5fr 1fr 1fr' }}>
                  <div className="data-cell">Source</div>
                  <div className="data-cell">Case ID</div>
                  <div className="data-cell">Integration</div>
                  <div className="data-cell">Tech Status</div>
                  <div className="data-cell">Breach Risk</div>
                  <div className="data-cell">Last Ping</div>
                </div>
                {filteredCases.map(c => (
                  <div key={c.id} className="data-row" style={{ gridTemplateColumns: 'minmax(100px, 1fr) 1fr 1.5fr 1.5fr 1fr 1fr', cursor: 'pointer' }} onClick={() => handleCaseSelection(c.id)}>
                    <div className="data-cell" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Bot size={14} color="var(--accent-lime)" />
                      {c.source}
                    </div>
                    <div className="data-cell">{c.id}</div>
                    <div className="data-cell">{c.integrationSource}</div>
                    <div className="data-cell">
                      <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                        {c.techStatus}
                      </span>
                    </div>
                    <div className="data-cell" style={{ color: parseInt(c.breachProb) > 80 ? 'var(--accent-coral)' : 'var(--accent-lime)' }}>{c.breachProb}</div>
                    <div className="data-cell">{c.lastPing}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : renderAllOpenOrders()}
      </>
    );
  }

  function renderDashboard() {
    return (
    <>
        {renderGlobalControlBar()}

        <div className="dashboard-layer">
          <div className="data-card">
            <button className="view-all-link" onClick={() => setFilterSource('Vantage')}>View all</button>
            <div className="data-card-title">Vantage alert</div>
            <div className="data-card-value">3</div>
            <div className="incremental-metric">+1</div>
          </div>
          <div className="data-card">
            <button className="view-all-link" onClick={() => setFilterStatus('New')}>View all</button>
            <div className="data-card-title">New</div>
            <div className="data-card-value">4</div>
            <div className="incremental-metric">+2</div>
          </div>
          <div className="data-card">
            <button className="view-all-link" onClick={() => setFilterStatus('In-progress')}>View all</button>
            <div className="data-card-title">In-progress</div>
            <div className="data-card-value">6</div>
          </div>
          <div className="data-card">
            <button className="view-all-link" onClick={() => setFilterStatus('Escalated')}>View all</button>
            <div className="data-card-title">Escalated</div>
            <div className="data-card-value">1</div>
            <div className="incremental-metric">+1</div>
          </div>
          <div className="data-card">
            <button className="view-all-link" onClick={() => setFilterSLAHealth('Breach risk')}>View all</button>
            <div className="data-card-title">Breach Risk</div>
            <div className="data-card-value">2</div>
          </div>
        </div>
        {renderDashboardTabs()}

        {renderFilterRow()}

        {dashboardTab === 'Cases' ? (
        <>
          <div className="main-workspace overflow-auto">
            <div className="list-section-header">Active Tickets & Alerts</div>
            <div className="data-table">
              <div className="data-row data-header" style={{ gridTemplateColumns: 'minmax(100px, 1fr) 1fr 1fr 1fr 2fr 60px 80px 70px 1fr' }}>
                <div className="data-cell">Source</div>
                <div className="data-cell">Case ID</div>
                <div className="data-cell">Status</div>
                <div className="data-cell">SLA Remaining</div>
                <div className="data-cell">Summary</div>
                <div className="data-cell" style={{ fontSize: '10px' }}>Priority</div>
                <div className="data-cell" style={{ fontSize: '10px' }}>Runway</div>
                <div className="data-cell" style={{ fontSize: '10px' }}>Risk</div>
                <div className="data-activity"></div>
              </div>
              {paginatedCases.map(c => {
                const priorityMap: Record<string, { label: string; color: string; bg: string }> = {
                  'Critical': { label: 'P0', color: '#ef4444', bg: 'rgba(239,68,68,0.12)' },
                  'High':     { label: 'P1', color: '#f97316', bg: 'rgba(249,115,22,0.12)' },
                  'Medium':   { label: 'P2', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
                  'Normal':   { label: 'P3', color: 'var(--text-gray)', bg: 'rgba(255,255,255,0.06)' },
                  'Low':      { label: 'P3', color: 'var(--text-gray)', bg: 'rgba(255,255,255,0.06)' },
                };
                const prio = c.isVantageAlert ? (priorityMap[c.priority] || priorityMap['Normal']) : null;
                return (
                  <div className="data-row" key={c.id} onClick={() => handleCaseSelection(c.id)} style={{ cursor: 'pointer', gridTemplateColumns: 'minmax(100px, 1fr) 1fr 1fr 1fr 2fr 60px 80px 70px 1fr' }}>
                    <div className="data-cell" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {c.isVantageAlert ? <Bot size={14} color="var(--accent-lime)" /> : <User size={14} color="var(--text-gray)" />}
                      {c.source}
                    </div>
                    <div className="data-cell">{c.id}</div>
                    <div className="data-cell">{c.status}</div>
                    <div className={`data-cell ${c.slaColor}`}>{c.sla === '00d 00h' ? 'Breached' : c.sla}</div>
                    <div className="data-cell truncate-cell" title={c.summary}>{c.summary}</div>
                    <div className="data-cell">
                      {prio ? (
                        <span style={{ fontSize: '11px', fontWeight: 'bold', color: prio.color, background: prio.bg, padding: '2px 7px', borderRadius: '4px', border: `1px solid ${prio.color}40` }}>
                          {prio.label}
                        </span>
                      ) : '—'}
                    </div>
                    <div className="data-cell" style={{ fontSize: '11px', color: c.isVantageAlert ? 'var(--accent-lime)' : 'var(--text-gray)' }}>
                      {c.isVantageAlert && c.intelligence?.resolutionRunway ? c.intelligence.resolutionRunway : '—'}
                    </div>
                    <div className="data-cell">
                      {c.isVantageAlert && c.intelligence?.breachProbability != null ? (
                        <span style={{ fontSize: '11px', fontWeight: 'bold', color: c.intelligence.breachProbability >= 70 ? 'var(--accent-coral)' : c.intelligence.breachProbability >= 30 ? '#f59e0b' : 'var(--accent-lime)' }}>
                          {c.intelligence.breachProbability}%
                        </span>
                      ) : '—'}
                    </div>
                    <div className="data-activity">{c.updates}</div>
                  </div>
                );
              })}
            </div>
            {renderPagination(casesPage, totalCasesPages, setCasesPage)}
          </div>
        </>
      ) : renderAllOpenOrders()}
    </>
    );
  }

  function renderManagerMetricCards() {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {managerMetrics.map((card, i) => (
          <div key={i} className="data-card" style={{ height: '140px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '20px' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-gray)', fontWeight: 'bold', textTransform: 'uppercase' }}>{card.label}</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--text-white)' }}>{card.value}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', color: card.change.includes('+') ? 'var(--accent-lime)' : 'var(--accent-coral)', fontWeight: 'bold' }}>{card.change} vs avg</span>
              <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', height: '16px' }}>
                {[...Array(6)].map((_, idx) => (
                  <div key={idx} style={{ width: '3px', background: 'var(--bg-border)', height: `${Math.random() * 100}%`, borderRadius: '1px' }}></div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

        function renderSmartAlertStrip() {
    return (
        <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', overflowX: 'auto', paddingBottom: '8px' }}>
          {smartAlerts.map(alert => (
            <div key={alert.id} style={{
              flex: '0 0 400px',
              background: 'var(--bg-deep)',
              border: '1px solid var(--bg-border)',
              borderRadius: '12px',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              borderLeft: `4px solid ${alert.severity === 'critical' ? 'var(--accent-coral)' : (alert.severity === 'urgent' ? '#f59e0b' : '#3b82f6')}`
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold', color: 'var(--text-gray)', marginBottom: '4px' }}>{alert.type}</div>
                <div style={{ fontSize: '13px', color: 'var(--text-white)', fontWeight: '500' }}>{alert.text}</div>
              </div>
              <button style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--bg-border)',
                color: 'var(--text-white)',
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 'bold',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}>
                {alert.cta}
              </button>
            </div>
          ))}
        </div>
        );
  }

        function renderManagerTabbedWorkspace() {
    // Shared filtering for manager view
    const items = mockCases.filter(c => {
      if (mgrActiveTab === 'Escalations') return c.status === 'Escalated' && c.escalatedBy;
        if (mgrActiveTab === 'Approvals') return c.updates === 'Approval Needed';
        if (mgrActiveTab === 'AI Flags') return c.isVantageAlert && c.assignee === 'Simran';
        return false;
    });

        return (
        <div style={{ background: 'var(--bg-deep)', border: '1px solid var(--bg-border)', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', gap: '32px', padding: '0 32px', borderBottom: '1px solid var(--bg-border)', background: 'rgba(255,255,255,0.02)' }}>
            {['Escalations', 'Approvals', 'AI Flags'].map((tab: any) => (
              <button
                key={tab}
                onClick={() => { setMgrActiveTab(tab); setMgrPagination(1); }}
                style={{ padding: '16px 0', background: 'none', border: 'none', borderBottom: mgrActiveTab === tab ? '2px solid var(--accent-sentry)' : '2px solid transparent', color: mgrActiveTab === tab ? 'var(--text-white)' : 'var(--text-gray)', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                {tab}
              </button>
            ))}
          </div>

          <div style={{ flex: 1, padding: '16px' }}>
            {items.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-gray)', fontSize: '13px' }}>No active items in this queue.</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {items.map(item => (
                  <div key={item.id} style={{ border: '1px solid var(--bg-border)', borderRadius: '8px', overflow: 'hidden' }}>
                    <div
                      onClick={() => toggleMgrRow(item.id)}
                      style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', background: 'var(--bg-primary)', cursor: 'pointer', gap: '20px' }}
                    >
                      <div style={{ width: '80px', fontSize: '12px', fontWeight: 'bold', color: 'var(--accent-sentry)' }}>{item.id}</div>
                      <div style={{ flex: 1, fontSize: '13px', color: 'var(--text-white)', fontWeight: '500' }}>{item.summary}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-gray)' }}>{item.escalatedBy ? `via ${item.escalatedBy}` : item.source}</div>
                      <div style={{ fontSize: '11px', padding: '4px 8px', borderRadius: '4px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--accent-coral)', fontWeight: 'bold' }}>{item.priority}</div>
                      <ChevronRight size={16} style={{ transition: 'transform 0.2s', transform: mgrExpandedRows.has(item.id) ? 'rotate(90deg)' : 'none' }} />
                    </div>

                    <AnimatePresence>
                      {mgrExpandedRows.has(item.id) && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          style={{ overflow: 'hidden', background: 'rgba(0,0,0,0.2)' }}
                        >
                          <div style={{ padding: '20px', borderTop: '1px solid var(--bg-border)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {mgrActiveTab === 'AI Flags' ? (
                              <div style={{ background: 'var(--bg-deep)', borderRadius: '12px', border: '1px solid var(--accent-sentry)', overflow: 'hidden', display: 'flex' }}>
                                <div style={{ flex: 1, padding: '16px', borderRight: '1px solid var(--bg-border)' }}>
                                  <div style={{ fontSize: '10px', color: 'var(--accent-coral)', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '8px' }}>Risk Assessment</div>
                                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--accent-coral)' }}>{item.intelligence?.breachProbability}%</div>
                                  <div style={{ fontSize: '12px', color: 'var(--text-gray)', marginTop: '4px' }}>{item.intelligence?.riskAssessment}</div>
                                </div>
                                <div style={{ flex: 2, padding: '16px', borderRight: '1px solid var(--bg-border)' }}>
                                  <div style={{ fontSize: '10px', color: 'var(--accent-lime)', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '8px' }}>Vantage Synthesis</div>
                                  <div style={{ fontSize: '12px', color: 'var(--text-white)', lineHeight: '1.5' }}>{item.intelligence?.caseSynthesis}</div>
                                </div>
                                <div style={{ flex: 1, padding: '16px', background: 'rgba(194, 239, 78, 0.03)' }}>
                                  <div style={{ fontSize: '10px', color: 'var(--accent-coral)', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '8px' }}>Suggested Action</div>
                                  <div style={{ fontSize: '12px', color: 'var(--accent-lime)', fontWeight: 'bold' }}>{item.intelligence?.suggestedAction}</div>
                                </div>
                              </div>
                            ) : (
                              <>
                                <div style={{ background: 'rgba(106, 95, 193, 0.05)', border: '1px solid rgba(106, 95, 193, 0.3)', padding: '16px', borderRadius: '8px' }}>
                                  <div style={{ fontSize: '11px', color: 'var(--accent-sentry)', fontWeight: 'bold', marginBottom: '6px' }}>ASSOCIATE RECOMMENDATION</div>
                                  <div style={{ fontSize: '13px', color: 'var(--text-white)', fontStyle: 'italic' }}>"{item.associateMessage}"</div>
                                </div>
                                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                                  <button
                                    onClick={() => handleCaseSelection(item.id)}
                                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--bg-border)', color: 'white', padding: '8px 16px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
                                  >
                                    View Details
                                  </button>
                                  <button style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--accent-coral)', color: 'var(--accent-coral)', padding: '8px 16px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>Escalate Further</button>
                                  <button style={{ background: 'var(--accent-lime)', color: 'black', border: 'none', padding: '8px 24px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>{mgrActiveTab === 'Approvals' ? 'Approve Action' : 'Resolve'}</button>
                                </div>
                              </>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        );
  };

        function renderTeamWorkloadPanel() {
    return (
        <div style={{ background: 'var(--bg-deep)', border: '1px solid var(--bg-border)', borderRadius: '12px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '20px', borderBottom: '1px solid var(--bg-border)', fontSize: '14px', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Team Workload
            <Users size={16} color="var(--text-gray)" />
          </div>
          <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {teamWorkload.map(member => (
              <div key={member.name} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--text-white)' }}>{member.name}</div>
                  <div style={{ fontSize: '11px', color: member.color }}>{member.status}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${(member.total / 30) * 100}%`, background: 'var(--accent-sentry)' }}></div>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-white)', width: '40px' }}>{member.total} <span style={{ fontSize: '10px', color: 'var(--text-gray)' }}>cs</span></div>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-gray)' }}>{member.high} High-priority assignments</div>
              </div>
            ))}
            <button style={{ marginTop: '12px', width: '100%', padding: '12px', background: 'rgba(194, 239, 78, 0.1)', border: '1px solid var(--accent-lime)', color: 'var(--accent-lime)', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
              Auto-Rebalance Queue
            </button>
          </div>
        </div>
        );
  }

        function renderUSDeliveryMap() {
    return (
        <div style={{ background: 'var(--bg-deep)', border: '1px solid var(--bg-border)', borderRadius: '12px', padding: '24px', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--text-white)', marginBottom: '4px' }}>US Delivery Anomaly Density</div>
              <div style={{ fontSize: '12px', color: 'var(--text-gray)' }}>Ratio of at-risk shipments to total LOC-XXXX orders by region.</div>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              {['High Density', 'Moderate', 'Nominal'].map((label, idx) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: idx === 0 ? 'var(--accent-coral)' : (idx === 1 ? '#f59e0b' : 'var(--accent-lime)') }}></div>
                  <span style={{ color: 'var(--text-gray)' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ height: '400px', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <svg viewBox="0 0 650 400" style={{ height: '100%', width: 'auto' }}>
              {Object.keys(US_STATES_MAP).map(key => {
                const state = US_STATES_MAP[key];
                let fill = 'var(--accent-lime)';
                if (state.density > 40) fill = '#f59e0b';
                if (state.density > 70) fill = 'var(--accent-coral)';

                const isSelected = mgrGeoFilter === key;

                return (
                  <path
                    key={key}
                    d={state.path}
                    fill={fill}
                    fillOpacity={isSelected ? 1 : 0.6}
                    stroke="var(--bg-deep)"
                    strokeWidth="1"
                    style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                    onClick={() => setMgrGeoFilter(isSelected ? null : key)}
                    onMouseEnter={(e) => {
                      (e.target as any).style.fillOpacity = '1';
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) (e.target as any).style.fillOpacity = '0.6';
                    }}
                  >
                    <title>{state.name}: {state.density} anomalies</title>
                  </path>
                );
              })}
            </svg>
          </div>
        </div>
        );
  }

        function renderPipelineHealthChart() {
    return (
        <div style={{ background: 'var(--bg-deep)', border: '1px solid var(--bg-border)', borderRadius: '12px', padding: '24px' }}>
          <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>Orders Placed & Pipeline Health</div>
          <div style={{ fontSize: '12px', color: 'var(--text-gray)', marginBottom: '24px' }}>Daily volume vs. stage distribution.</div>
          <div style={{ height: '240px', width: '100%', position: 'relative' }}>
            <svg viewBox="0 0 700 240" style={{ width: '100%', height: '100%' }}>
              {/* Total Orders Bars */}
              {opsPipelineData.map((d, i) => (
                <rect key={i} x={i * 100 + 20} y={240 - (d.orders / 10)} width="40" height={d.orders / 10} fill="rgba(255,255,255,0.05)" />
              ))}
              {/* Pipeline Lines */}
              <path d={`M40,${240 - (opsPipelineData[0].transit / 10)} ${opsPipelineData.map((d, i) => `L${i * 100 + 40},${240 - (d.transit / 10)}`).join(' ')}`} fill="none" stroke="var(--accent-lime)" strokeWidth="2" />
              <path d={`M40,${240 - (opsPipelineData[0].exception / 5)} ${opsPipelineData.map((d, i) => `L${i * 100 + 40},${240 - (d.exception / 5)}`).join(' ')}`} fill="none" stroke="var(--accent-coral)" strokeWidth="2" strokeDasharray="4,4" />
            </svg>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginTop: '24px', borderTop: '1px solid var(--bg-border)', paddingTop: '16px' }}>
            <div><div style={{ fontSize: '11px', color: 'var(--text-gray)' }}>Total Orders</div><div style={{ fontSize: '18px', fontWeight: 'bold' }}>9,450</div></div>
            <div><div style={{ fontSize: '11px', color: 'var(--text-gray)' }}>Delivered</div><div style={{ fontSize: '18px', fontWeight: 'bold' }}>8,120</div></div>
            <div><div style={{ fontSize: '11px', color: 'var(--text-gray)' }}>In Transit</div><div style={{ fontSize: '18px', fontWeight: 'bold' }}>850</div></div>
            <div><div style={{ fontSize: '11px', color: 'var(--text-gray)' }}>Exception</div><div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--accent-coral)' }}>480</div></div>
          </div>
        </div>
        );
  }

        function renderBreachRiskPanel() {
    return (
        <div style={{ background: 'var(--bg-deep)', border: '1px solid var(--bg-border)', borderRadius: '12px', padding: '24px' }}>
          <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '24px' }}>Breach Risk — Detailed Breakdown</div>

          <div style={{ marginBottom: '32px' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-gray)', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '12px' }}>Time-to-Breach Distribution</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {breachDistributionData.map(d => (
                <div key={d.range} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '60px', fontSize: '11px', color: 'var(--text-gray)' }}>{d.range}</div>
                  <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(d.count / 250) * 100}%`, background: d.color }}></div>
                  </div>
                  <div style={{ width: '30px', fontSize: '11px', fontWeight: 'bold' }}>{d.count}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-gray)', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '12px' }}>Breach Rate Trend (%)</div>
              <div style={{ height: '100px', width: '100%' }}>
                <svg viewBox="0 0 400 100" style={{ width: '100%', height: '100%' }}>
                  <path d={`M0,${100 - (dailyBreachRateTrend[0].rate * 40)} ${dailyBreachRateTrend.map((d, i) => `L${i * 66},${100 - (d.rate * 40)}`).join(' ')}`} fill="none" stroke="var(--accent-coral)" strokeWidth="2" />
                </svg>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-gray)', fontWeight: 'bold', textTransform: 'uppercase' }}>Source Comparison</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px' }}>Customer</span>
                <span style={{ fontWeight: 'bold' }}>4.2%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px' }}>Vantage</span>
                <span style={{ fontWeight: 'bold', color: 'var(--accent-lime)' }}>1.8%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px' }}>INFRA</span>
                <span style={{ fontWeight: 'bold' }}>0.5%</span>
              </div>
            </div>
          </div>
        </div>
        );
  }

        function renderCarrierHealthPanel() {
    return (
        <div style={{ background: 'var(--bg-deep)', border: '1px solid var(--bg-border)', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ padding: '20px', borderBottom: '1px solid var(--bg-border)', fontSize: '16px', fontWeight: 'bold' }}>Carrier Health — Quantitative View</div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', background: 'rgba(255,255,255,0.02)', fontSize: '11px', color: 'var(--text-gray)', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px 20px' }}>Carrier</th>
                <th style={{ padding: '12px 20px' }}>Volume</th>
                <th style={{ padding: '12px 20px' }}>On-Time</th>
                <th style={{ padding: '12px 20px' }}>Avg Delay</th>
                <th style={{ padding: '12px 20px' }}>Exception</th>
                <th style={{ padding: '12px 20px' }}>Escalation</th>
                <th style={{ padding: '12px 20px' }}>Refund</th>
              </tr>
            </thead>
            <tbody>
              {carrierMatrixData.map(c => (
                <tr key={c.name}
                  onClick={() => setVpCarrierFilter(c.name)}
                  style={{ borderBottom: '1px solid var(--bg-border)', cursor: 'pointer', background: vpCarrierFilter === c.name ? 'rgba(194, 239, 78, 0.05)' : 'transparent' }}>
                  <td style={{ padding: '14px 20px', fontWeight: 'bold' }}>{c.name}</td>
                  <td style={{ padding: '14px 20px' }}>{c.total.toLocaleString()}</td>
                  <td style={{ padding: '14px 20px' }}>{c.onTime}%</td>
                  <td style={{ padding: '14px 20px' }}>{c.delay}h</td>
                  <td style={{ padding: '14px 20px', color: c.exception > 4 ? 'var(--accent-coral)' : 'inherit' }}>{c.exception}%</td>
                  <td style={{ padding: '14px 20px' }}>{c.escalation}%</td>
                  <td style={{ padding: '14px 20px' }}>{c.refund}%</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: '1fr 300px', gap: '32px', borderTop: '1px solid var(--bg-border)' }}>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-gray)', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '16px' }}>Carrier Exception Trend (Weekly)</div>
              <div style={{ height: '120px', width: '100%' }}>
                <svg viewBox="0 0 500 120" style={{ width: '100%', height: '100%' }}>
                  <path d="M0,80 L100,75 L200,85 L300,60 L400,65 L500,50" fill="none" stroke="#3b82f6" strokeWidth="2" />
                  <path d="M0,90 L100,95 L200,88 L300,92 L400,85 L500,88" fill="none" stroke="var(--accent-lime)" strokeWidth="2" />
                </svg>
              </div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-gray)', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '16px' }}>{vpCarrierFilter} Regional Exceptions</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                {Object.entries(regionalCarrierHealth[vpCarrierFilter]).map(([region, val]) => (
                  <div key={region} style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '6px', textAlign: 'center' }}>
                    <div style={{ fontSize: '9px', color: 'var(--text-gray)', marginBottom: '4px' }}>{region}</div>
                    <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{val as number}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        );
  }

        function renderOrderSourceHealth() {
    return (
        <div style={{ background: 'var(--bg-deep)', border: '1px solid var(--bg-border)', borderRadius: '12px', padding: '24px' }}>
          <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '24px' }}>Order Source Health</div>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '48px', marginBottom: '32px' }}>
            <div style={{ position: 'relative', width: '200px', height: '200px' }}>
              <svg viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="80" fill="none" stroke="var(--accent-lime)" strokeWidth="20" strokeDasharray="251 251" />
                <circle cx="100" cy="100" r="80" fill="none" stroke="#3b82f6" strokeWidth="20" strokeDasharray="125 502" strokeDashoffset="-251" />
              </svg>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{orderSourceHealthData.volume[0].value}%</div>
                <div style={{ fontSize: '10px', color: 'var(--text-gray)' }}>WEB DIRECT</div>
              </div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-gray)', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '16px' }}>Exception Rate by Source</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {orderSourceHealthData.exceptionRates.map(s => (
                  <div key={s.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                      <span>{s.name}</span>
                      <span style={{ fontWeight: 'bold' }}>{s.rate}%</span>
                    </div>
                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}>
                      <div style={{ height: '100%', width: `${s.rate * 10}%`, background: s.rate > 5 ? 'var(--accent-coral)' : 'var(--accent-lime)', borderRadius: '2px' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <table style={{ width: '100%', fontSize: '12px' }}>
            <thead>
              <tr style={{ color: 'var(--text-gray)', textAlign: 'left' }}>
                <th style={{ padding: '8px 0' }}>Source</th>
                <th>Volume</th>
                <th>Δ Vol</th>
                <th>Ex Rate</th>
                <th>Δ Rate</th>
              </tr>
            </thead>
            <tbody>
              {orderSourceHealthData.trend.map(t => (
                <tr key={t.source} style={{ borderTop: '1px solid var(--bg-border)' }}>
                  <td style={{ padding: '12px 0', fontWeight: 'bold' }}>{t.source}</td>
                  <td>{t.vol.toLocaleString()}</td>
                  <td style={{ color: t.volDelta > 0 ? 'var(--accent-lime)' : 'var(--accent-coral)' }}>{t.volDelta > 0 ? '▲' : '▼'} {Math.abs(t.volDelta)}%</td>
                  <td>{t.exc}%</td>
                  <td style={{ color: t.excDelta < 0 ? 'var(--accent-lime)' : 'var(--accent-coral)' }}>{t.excDelta < 0 ? '▼' : '▲'} {Math.abs(t.excDelta)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        );
  }

        function renderQueueDepthChart() {
    return (
        <div style={{ background: 'var(--bg-deep)', border: '1px solid var(--bg-border)', borderRadius: '12px', padding: '24px' }}>
          <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>Queue Depth Over Time</div>
          <div style={{ fontSize: '12px', color: 'var(--text-gray)', marginBottom: '24px' }}>Daily evolution of New, In-Progress, and Escalated cases.</div>
          <div style={{ height: '240px', width: '100%' }}>
            <svg viewBox="0 0 700 240" style={{ width: '100%', height: '100%' }}>
              <path d="M0,200 L100,180 L200,190 L300,150 L400,160 L500,140 L600,150 L700,240 L0,240 Z" fill="rgba(59, 130, 246, 0.2)" />
              <path d="M0,180 L100,160 L200,170 L300,130 L400,140 L500,120 L600,130" fill="none" stroke="#3b82f6" strokeWidth="2" />
              <path d="M0,150 L100,140 L200,145 L300,110 L400,115 L500,105 L600,110" fill="none" stroke="var(--accent-coral)" strokeWidth="2" />
            </svg>
          </div>
          <div style={{ display: 'flex', gap: '24px', marginTop: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px' }}><div style={{ width: '10px', height: '10px', background: 'rgba(59, 130, 246, 0.4)' }}></div> IN-PROGRESS</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px' }}><div style={{ width: '10px', height: '10px', background: 'var(--accent-coral)' }}></div> ESCALATED</div>
          </div>
        </div>
        );
  }

        function renderAIImpactHeader() {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '12px' }}>
          <div style={{ background: 'var(--bg-deep)', border: '1px solid var(--bg-border)', borderRadius: '12px', padding: '24px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-gray)', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '8px' }}>Cost Avoidance</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--accent-lime)', marginBottom: '4px' }}>$124.5k</div>
            <div style={{ fontSize: '13px', color: 'var(--text-white)', fontWeight: 'bold' }}>2,490 cases caught</div>
            <div style={{ fontSize: '11px', color: 'var(--text-gray)', marginTop: '4px' }}>+14% vs Prior Period</div>
            <div style={{ position: 'absolute', bottom: '-10px', right: '-10px', opacity: 0.1 }}><ShieldCheck size={80} color="var(--accent-lime)" /></div>
          </div>
          <div style={{ background: 'var(--bg-deep)', border: '1px solid var(--bg-border)', borderRadius: '12px', padding: '24px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-gray)', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '8px' }}>Churn Prevention</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--text-white)', marginBottom: '4px' }}>$51.5k</div>
            <div style={{ fontSize: '13px', color: 'var(--accent-lime)', fontWeight: 'bold' }}>$42k–$61k Band</div>
            <div style={{ fontSize: '11px', color: 'var(--text-gray)', marginTop: '4px' }}>Modelled LTV protection</div>
            <div style={{ position: 'absolute', bottom: '-10px', right: '-10px', opacity: 0.1 }}><Users size={80} color="white" /></div>
          </div>
          <div style={{ background: 'var(--bg-deep)', border: '1px solid var(--bg-border)', borderRadius: '12px', padding: '24px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-gray)', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '8px' }}>Spend Reduction</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--accent-coral)', marginBottom: '4px' }}>$18.2k</div>
            <div style={{ fontSize: '13px', color: 'white', fontWeight: 'bold' }}>Saved 12% OpEx</div>
            <div style={{ fontSize: '11px', color: 'var(--text-gray)', marginTop: '4px' }}>-8% refunds in ops spend</div>
            <div style={{ position: 'absolute', bottom: '-10px', right: '-10px', opacity: 0.1 }}><Package size={80} color="var(--accent-coral)" /></div>
          </div>
        </div>
        );
  }

        function renderAIAccuracyChart() {
    return (
        <div style={{ background: 'var(--bg-deep)', border: '1px solid var(--bg-border)', borderRadius: '12px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 'bold' }}>AI Accuracy & Confidence Trend</div>
              <div style={{ fontSize: '12px', color: 'var(--text-gray)' }}>Correlation of AI risk alerts vs. verified shipment outcomes.</div>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px' }}><div style={{ width: '10px', height: '2px', background: 'var(--accent-lime)' }}></div> TPR</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px' }}><div style={{ width: '10px', height: '2px', background: '#f59e0b' }}></div> FPR</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px' }}><div style={{ width: '10px', height: '2px', background: 'var(--accent-coral)' }}></div> Missed</div>
            </div>
          </div>
          <div style={{ height: '200px', width: '100%', position: 'relative' }}>
            <svg viewBox="0 0 700 200" style={{ width: '100%', height: '100%' }}>
              {[0, 25, 50, 75, 100].map(y => (
                <line key={y} x1="0" y1={200 - (y * 2)} x2="700" y2={200 - (y * 2)} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              ))}
              <path d={`M0,${200 - (accuracyTrendData[0].tpr * 2)} ${accuracyTrendData.map((d, i) => `L${i * 115},${200 - (d.tpr * 2)}`).join(' ')}`} fill="none" stroke="var(--accent-lime)" strokeWidth="3" />
              <path d={`M0,${200 - (accuracyTrendData[0].fpr * 2)} ${accuracyTrendData.map((d, i) => `L${i * 115},${200 - (d.fpr * 2)}`).join(' ')}`} fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,4" />
              <path d={`M0,${200 - (accuracyTrendData[0].missed * 2)} ${accuracyTrendData.map((d, i) => `L${i * 115},${200 - (d.missed * 2)}`).join(' ')}`} fill="none" stroke="var(--accent-coral)" strokeWidth="2" />
            </svg>
          </div>
        </div>
        );
  }

        function renderRiskDistribution() {
    return (
        <div style={{ background: 'var(--bg-deep)', border: '1px solid var(--bg-border)', borderRadius: '12px', padding: '24px' }}>
          <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>Risk Score Distribution</div>
          <div style={{ fontSize: '12px', color: 'var(--text-gray)', marginBottom: '24px' }}>Intelligence Action Bar aggregate across fleet.</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ height: '32px', width: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', overflow: 'hidden', display: 'flex' }}>
              {riskDistributionData.map(d => (
                <div key={d.label} style={{ height: '100%', width: `${d.value}%`, background: d.color }}></div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              {riskDistributionData.map(d => (
                <div key={d.label}>
                  <div style={{ fontSize: '11px', color: 'var(--text-gray)' }}>{d.category}</div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{d.value}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        );
  }

        function renderAssociateAIUtil() {
    return (
        <div style={{ background: 'var(--bg-deep)', border: '1px solid var(--bg-border)', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ padding: '20px', fontSize: '14px', fontWeight: 'bold', borderBottom: '1px solid var(--bg-border)' }}>Associate AI Utilisation & Outcomes</div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', background: 'rgba(255,255,255,0.02)', fontSize: '11px', color: 'var(--text-gray)' }}>
                <th style={{ padding: '12px 20px' }}>Associate</th>
                <th style={{ padding: '12px 20px' }}>Cases</th>
                <th style={{ padding: '12px 20px' }}>Followed AI</th>
                <th style={{ padding: '12px 20px' }}>Deviated</th>
                <th style={{ padding: '12px 20px' }}>Followed Outcomes</th>
                <th style={{ padding: '12px 20px' }}>Deviated Outcomes</th>
              </tr>
            </thead>
            <tbody>
              {associateUtilData.map(row => (
                <tr key={row.name} style={{ borderBottom: '1px solid var(--bg-border)', fontSize: '13px' }}>
                  <td style={{ padding: '16px 20px', fontWeight: 'bold' }}>{row.name}</td>
                  <td style={{ padding: '16px 20px' }}>{row.cases}</td>
                  <td style={{ padding: '16px 20px', color: 'var(--accent-lime)' }}>{row.followed}%</td>
                  <td style={{ padding: '16px 20px' }}>{row.deviated}%</td>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ fontSize: '11px' }}>Avg: {row.followedTime}</div>
                    <div style={{ fontSize: '11px', color: 'var(--accent-lime)' }}>B: {row.followedBreach}</div>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ fontSize: '11px' }}>Avg: {row.deviatedTime}</div>
                    <div style={{ fontSize: '11px', color: 'var(--accent-coral)' }}>B: {row.deviatedBreach}</div>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        );
  }

        function renderVPDashboard() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '64px', padding: '32px 32px 64px 32px' }}>
          {/* Section 1: Support Operations */}
          <div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text-white)', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Activity size={24} color="var(--accent-lime)" /> Section 1: Support Operations
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
                {renderPipelineHealthChart()}
                {renderBreachRiskPanel()}
              </div>

              {renderCarrierHealthPanel()}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '24px' }}>
                {renderOrderSourceHealth()}
                {renderQueueDepthChart()}
              </div>
            </div>
          </div>

          {/* Visual Divider */}
          <div style={{ height: '1px', background: 'var(--bg-border)', width: '100%' }}></div>

          {/* Section 2: Vantage AI */}
          <div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text-white)', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Bot size={24} color="var(--accent-lime)" /> Section 2: Vantage AI
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {renderAIImpactHeader()}

              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px' }}>
                {renderAIAccuracyChart()}
                {renderRiskDistribution()}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }}>
                {renderAssociateAIUtil()}
                <div style={{ background: 'var(--bg-deep)', border: '1px solid var(--bg-border)', borderRadius: '12px', padding: '24px', flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '16px' }}>Board Reporting Tools</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <button style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--bg-border)', color: 'white', borderRadius: '6px', fontSize: '12px', textAlign: 'left', cursor: 'pointer' }}>Export Period Logistics Report (.pdf)</button>
                    <button style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--bg-border)', color: 'white', borderRadius: '6px', fontSize: '12px', textAlign: 'left', cursor: 'pointer' }}>Generate Retention Slide Deck (.pptx)</button>
                    <button style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--bg-border)', color: 'white', borderRadius: '6px', fontSize: '12px', textAlign: 'left', cursor: 'pointer' }}>Raw Event Logs (CSV)</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        );
  }

        function renderManagerOperationsTab() {
    const stats = mgrOpsTimelineStats[opsTimeWindow];

        return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
            <div className="data-card"><div className="data-card-title">Alerts</div><div className="data-card-value">{stats.alerts}</div></div>
            <div className="data-card"><div className="data-card-title">New</div><div className="data-card-value">{stats.new}</div></div>
            <div className="data-card"><div className="data-card-title">In-progress</div><div className="data-card-value">{stats.inProg}</div></div>
            <div className="data-card"><div className="data-card-title">Escalated</div><div className="data-card-value">{stats.esc}</div></div>
            <div className="data-card"><div className="data-card-title">Resolved</div><div className="data-card-value">{stats.resolved}</div></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
            {renderPipelineHealthChart()}
            {renderBreachRiskPanel()}
          </div>
          {renderCarrierHealthPanel()}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '24px' }}>
            {renderOrderSourceHealth()}
            {renderQueueDepthChart()}
          </div>
        </div>
        );
  }

        function renderManagerDashboard() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '0 32px 64px 32px' }}>
          {renderManagerMetricCards()}
          {renderSmartAlertStrip()}

          {dashboardTab === 'Operations' ? (
            renderManagerOperationsTab()
          ) : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }}>
                {renderManagerTabbedWorkspace()}
                {renderTeamWorkloadPanel()}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 400px', gap: '24px' }}>
                {renderUSDeliveryMap()}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ background: 'var(--bg-deep)', border: '1px solid var(--bg-border)', borderRadius: '12px', padding: '20px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 'bold', borderBottom: '1px solid var(--bg-border)', paddingBottom: '12px', marginBottom: '16px' }}>Carrier Performance</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {carrierHealth.map(c => (
                        <div key={c.carrier} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <div style={{ width: '40px', fontSize: '12px', fontWeight: 'bold', color: 'var(--text-white)' }}>{c.carrier}</div>
                          <div style={{ flex: 1 }}>
                            <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                              <div style={{ height: '100%', width: `${(c.delayed / 20) * 100}%`, background: c.color }}></div>
                            </div>
                          </div>
                          <div style={{ fontSize: '11px', color: c.color, width: '90px' }}>{c.status}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ background: 'var(--bg-deep)', border: '1px solid var(--bg-border)', borderRadius: '12px', padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontSize: '14px', fontWeight: 'bold', borderBottom: '1px solid var(--bg-border)', paddingBottom: '12px', marginBottom: '16px' }}>SLA Compliance (Resolution Band)</div>
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                      <div style={{ width: '160px', height: '160px', borderRadius: '50%', border: '16px solid var(--accent-lime)', borderTopColor: 'var(--accent-coral)', borderRightColor: '#f59e0b', transform: 'rotate(-45deg)' }}></div>
                      <div style={{ position: 'absolute', textAlign: 'center' }}>
                        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>94%</div>
                        <div style={{ fontSize: '10px', color: 'var(--text-gray)' }}>On-time Rate</div>
                      </div>
                    </div>
                    <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between' }}>
                      <div style={{ textAlign: 'center' }}><div style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--accent-lime)' }}>84</div><div style={{ fontSize: '9px', color: 'var(--text-gray)' }}>ON TIME</div></div>
                      <div style={{ textAlign: 'center' }}><div style={{ fontSize: '12px', fontWeight: 'bold', color: '#f59e0b' }}>7</div><div style={{ fontSize: '9px', color: 'var(--text-gray)' }}>AT RISK</div></div>
                      <div style={{ textAlign: 'center' }}><div style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--accent-coral)' }}>3</div><div style={{ fontSize: '9px', color: 'var(--text-gray)' }}>BREACHED</div></div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        );
  }

        function renderTechnicalIncidentDetail() {
    return (
        <div className="case-detail-container" style={{ color: 'var(--text-white)' }}>
          {/* Page Header */}
          <div className="case-header" style={{ borderBottom: '1px solid var(--accent-coral)' }}>
            <div className="header-left">
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: '800', margin: 0 }}>{activeCase.id} | {activeCase.infraData?.title || 'API — Elevated Error Rate'}</h1>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '4px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', fontWeight: 'bold' }}>{activeCase.infraData?.incidentType || 'API Failure'}</span>
                  <span style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '4px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--accent-coral)', fontWeight: 'bold', border: '1px solid var(--accent-coral)' }}>{activeCase.infraData?.severity || 'HIGH'} SEVERITY</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-gray)' }}>
                <Clock size={14} /> Detected At: {activeCase.infraData?.detectedAt || '--:--'} |
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-coral)', fontWeight: 'bold' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-coral)', animation: 'pulse 1.5s infinite' }}></span>
                  Active for {activeCase.infraData?.activeDuration || '--sm'}
                </span>
              </div>

              <select
                value={incidentStatus}
                onChange={(e) => {
                  const newStatus = e.target.value;
                  setIncidentStatus(newStatus);
                  setIncidentTimeline([{ id: Date.now(), type: 'Status', text: `Status set to ${newStatus}.`, time: get24hTimestamp() }, ...incidentTimeline]);
                }}
                style={{ background: 'var(--bg-deep)', border: '1px solid var(--bg-border)', color: 'var(--text-white)', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', outline: 'none' }}
              >
                <option value="Investigating">Investigating (Active)</option>
                <option value="Identified">Identified</option>
                <option value="Monitoring">Monitoring</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>

          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Section 1 — Incident Summary Strip */}
            <div style={{ display: 'flex', background: 'rgba(239, 68, 68, 0.03)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', padding: '20px', gap: '40px', boxShadow: '0 0 20px rgba(239, 68, 68, 0.05)' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '11px', color: 'var(--accent-coral)', fontWeight: '800', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={12} /> What Happened (AI Synthesis)
                </div>
                <div style={{ fontSize: '13px', lineHeight: '1.6', color: 'var(--text-white)' }}>
                  {activeCase.infraData?.whatHappened || '...'}
                </div>
              </div>
              <div style={{ width: '1px', background: 'rgba(239, 68, 68, 0.1)' }}></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '11px', color: 'var(--accent-coral)', fontWeight: '800', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Bot size={12} /> Blast Radius Estimate (AI Synthesis)
                </div>
                <div style={{ fontSize: '13px', lineHeight: '1.6', color: 'var(--text-white)' }}>
                  {activeCase.infraData?.blastRadiusNarrative || '...'}
                </div>
              </div>
            </div>

            {/* Section 2 — Incident Vitals */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', background: 'var(--bg-deep)', border: '1px solid var(--bg-border)', borderRadius: '8px', overflow: 'hidden' }}>
              {(activeCase.infraData?.vitals || []).map((v: any, i: number) => (
                <div key={i} style={{ padding: '16px', borderRight: i === 6 ? 'none' : '1px solid var(--bg-border)', textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', color: 'var(--text-gray)', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '4px' }}>{v.label}</div>
                  <div style={{ fontSize: '13px', color: v.color || 'var(--text-white)', fontWeight: 'bold' }}>{v.value}</div>
                </div>
              ))}
            </div>

            {/* Section 3 — Diagnostic Signal Panel */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              {/* Left: Metric Snapshot */}
              <div style={{ background: 'var(--bg-deep)', border: '1px solid var(--bg-border)', borderRadius: '8px', padding: '24px' }}>
                <div style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}><Activity size={14} color="var(--accent-coral)" /> Live Metric Snapshot (Last 2h)</div>

                {/* Simulated Chart: Error Rate */}
                <div style={{ marginBottom: '32px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-gray)' }}>Error Rate %</span>
                    <span style={{ fontSize: '11px', color: 'var(--accent-coral)', fontWeight: 'bold' }}>Peak: {activeCase.infraData?.errorRatePeak || '--'}</span>
                  </div>
                  <div style={{ height: '80px', width: '100%', position: 'relative', borderLeft: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <svg viewBox="0 0 100 80" style={{ width: '100%', height: '100%' }}>
                      <path d="M0 75 Q 10 75, 20 74 T 40 73 T 60 70 L 70 20 L 80 15 L 90 25 L 100 10" fill="none" stroke="var(--accent-coral)" strokeWidth="1.5" />
                      <line x1="0" y1="40" x2="100" y2="40" stroke="var(--accent-coral)" strokeWidth="1" strokeDasharray="2,2" opacity="0.5" />
                    </svg>
                    <div style={{ position: 'absolute', top: '35px', right: '0', fontSize: '8px', color: 'var(--accent-coral)' }}>THRESHOLD (5%)</div>
                  </div>
                </div>

                {/* Simulated Chart: Latency */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-gray)' }}>Response Time (ms)</span>
                    <span style={{ fontSize: '11px', color: 'var(--accent-coral)', fontWeight: 'bold' }}>P95: {activeCase.infraData?.latencyP95 || '--'}</span>
                  </div>
                  <div style={{ height: '80px', width: '100%', position: 'relative', borderLeft: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <svg viewBox="0 0 100 80" style={{ width: '100%', height: '100%' }}>
                      <path d="M0 70 Q 20 72, 40 70 T 60 68 L 70 10 L 80 5 T 100 8" fill="none" stroke="#fbbf24" strokeWidth="1.5" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Right: Anomaly Breakdown */}
              <div style={{ background: 'var(--bg-deep)', border: '1px solid var(--bg-border)', borderRadius: '8px' }}>
                <div style={{ padding: '16px', fontSize: '13px', fontWeight: 'bold', borderBottom: '1px solid var(--bg-border)' }}>Anomaly Breakdown Table</div>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                  <thead>
                    <tr style={{ textAlign: 'left', background: 'rgba(255,255,255,0.02)' }}>
                      <th style={{ padding: '12px 16px', color: 'var(--text-gray)' }}>Endpoint Name</th>
                      <th style={{ padding: '12px 16px', color: 'var(--text-gray)' }}>Error Count</th>
                      <th style={{ padding: '12px 16px', color: 'var(--text-gray)' }}>Last Error</th>
                      <th style={{ padding: '12px 16px', color: 'var(--text-gray)' }}>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(activeCase.infraData?.endpoints || []).map((row: any, i: number) => (
                      <tr key={i} style={{ borderBottom: '1px solid var(--bg-border)' }}>
                        <td style={{ padding: '12px 16px', color: 'var(--text-white)' }}>{row.name}</td>
                        <td style={{ padding: '12px 16px', color: 'var(--accent-coral)', fontWeight: 'bold' }}>{row.count}</td>
                        <td style={{ padding: '12px 16px', color: 'var(--text-white)' }}>{row.code}</td>
                        <td style={{ padding: '12px 16px', color: 'var(--text-gray)' }}>{row.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 4 — Tickets in Blast Radius */}
            <div style={{ background: 'var(--bg-deep)', border: '1px solid var(--bg-border)', borderRadius: '8px' }}>
              <div style={{ padding: '16px', borderBottom: '1px solid var(--bg-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '14px', fontWeight: 'bold' }}>Tickets in Blast Radius ({activeCase.infraData?.totalTickets || 0} Total)</div>
                <div style={{ fontSize: '11px', color: 'var(--text-gray)' }}>{activeCase.infraData?.slaCriticalTickets || 0} SLA-Critical | {activeCase.infraData?.normalTickets || 0} Normal</div>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ textAlign: 'left', background: 'rgba(255,255,255,0.02)', color: 'var(--text-gray)' }}>
                    <th style={{ padding: '12px 16px' }}>Ticket ID</th>
                    <th style={{ padding: '12px 16px' }}>Source</th>
                    <th style={{ padding: '12px 16px' }}>Assigned To</th>
                    <th style={{ padding: '12px 16px' }}>Order Stage</th>
                    <th style={{ padding: '12px 16px' }}>Carrier</th>
                    <th style={{ padding: '12px 16px' }}>SLA Remaining</th>
                    <th style={{ padding: '12px 16px' }}>Notified</th>
                  </tr>
                </thead>
                <tbody>
                  {(activeCase.infraData?.affectedTickets || []).map((row: any, i: number) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--bg-border)', borderLeft: row.critical ? '4px solid var(--accent-coral)' : 'none' }}>
                      <td style={{ padding: '12px 16px', color: 'var(--text-white)', fontWeight: 'bold' }}>{row.id}</td>
                      <td style={{ padding: '12px 16px' }}>{row.source}</td>
                      <td style={{ padding: '12px 16px' }}>{row.assigned}</td>
                      <td style={{ padding: '12px 16px' }}>{row.stage}</td>
                      <td style={{ padding: '12px 16px' }}>{row.carrier}</td>
                      <td style={{ padding: '12px 16px', color: row.slaColor, fontWeight: 'bold' }}>{row.sla}</td>
                      <td style={{ padding: '12px 16px', color: 'var(--text-gray)' }}>No</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
              {/* Section 5 — Broadcast Action Panel */}
              <div style={{ background: 'rgba(239, 68, 68, 0.05)', border: '2px solid var(--accent-coral)', borderRadius: '12px', padding: '24px' }}>
                <div style={{ fontSize: '18px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <ChevronsRight size={24} color="var(--accent-coral)" /> Broadcast Incident to Support Team
                </div>

                <div style={{ background: 'var(--bg-deep)', borderRadius: '8px', padding: '16px', border: '1px solid var(--bg-border)', marginBottom: '24px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-gray)', fontWeight: 'bold', marginBottom: '12px', textTransform: 'uppercase' }}>Notification Preview</div>
                  <div style={{ borderLeft: '3px solid var(--accent-coral)', paddingLeft: '16px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>⚠️ Tech Incident Notice — {activeCase.id}</div>
                    <div style={{ fontSize: '13px', lineHeight: '1.5', color: 'var(--text-gray)', marginBottom: '12px' }}>
                      {activeCase.infraData?.broadcastPreviewText || 'An API degradation has been detected that may impact tracking. SLA timers remain active.'}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-gray)' }}>Detected: {activeCase.infraData?.detectedAt || '--:--'} | Severity: {activeCase.infraData?.severity || 'HIGH'} | Status: {incidentStatus}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '12px', color: 'var(--text-gray)', fontWeight: 'bold' }}>CUSTOM NOTE</label>
                    <textarea placeholder="Add any context for the support team..." style={{ background: 'var(--bg-deep)', border: '1px solid var(--bg-border)', borderRadius: '6px', color: 'var(--text-white)', padding: '12px', fontSize: '13px', minHeight: '80px', outline: 'none' }}></textarea>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '12px', color: 'var(--text-gray)', fontWeight: 'bold' }}>SCOPE SELECTOR</label>
                    <div style={{ display: 'flex', gap: '24px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px' }}>
                        <input type="radio" name="scope" /> Notify all active tickets ({activeCase.infraData?.totalTickets || 0})
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px' }}>
                        <input type="radio" name="scope" defaultChecked /> Notify only SLA-critical tickets ({activeCase.infraData?.slaCriticalTickets || 0})
                      </label>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (broadcastDoneAt || isBroadcasting) return;
                      setIsBroadcasting(true);
                      setTimeout(() => {
                        const time = get24hTimestamp();
                        setIsBroadcasting(false);
                        setBroadcastDoneAt(time);
                        setIncidentTimeline([{ id: Date.now(), type: 'Broadcast', text: `Broadcast sent directly internally via active workflow.`, time: time }, ...incidentTimeline]);
                      }, 1500);
                    }}
                    disabled={!!broadcastDoneAt || isBroadcasting}
                    style={{
                      width: '100%',
                      background: broadcastDoneAt ? 'var(--bg-border)' : 'var(--accent-coral)',
                      color: 'white',
                      border: 'none',
                      padding: '16px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      cursor: broadcastDoneAt ? 'default' : 'pointer',
                      marginTop: '8px',
                      boxShadow: broadcastDoneAt ? 'none' : '0 4px 12px rgba(239, 68, 68, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px'
                    }}
                  >
                    {isBroadcasting ? 'Broadcasting...' : (broadcastDoneAt ? `Broadcasted at ${broadcastDoneAt}` : 'BROADCAST TO SUPPORT TEAM')}
                  </button>
                </div>
              </div>

              {/* Section 6 — Incident Timeline */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ background: 'var(--bg-deep)', border: '1px solid var(--bg-border)', borderRadius: '8px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ padding: '16px', borderBottom: '1px solid var(--bg-border)', fontSize: '14px', fontWeight: 'bold' }}>Incident Timeline</div>
                  <div style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
                    {incidentTimeline.map((item, i) => (
                      <div key={item.id} style={{ display: 'flex', gap: '16px' }}>
                        <div style={{ fontSize: '11px', color: 'var(--text-gray)', width: '40px', flexShrink: 0, paddingTop: '2px' }}>{item.time}</div>
                        <div style={{ width: '12px', position: 'relative' }}>
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.type === 'Note' ? '#3b82f6' : 'var(--text-gray)', position: 'absolute', top: '5px', left: '2px', zIndex: 2 }}></div>
                          {i !== incidentTimeline.length - 1 && <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)', position: 'absolute', top: '15px', bottom: '-20px', left: '5px' }}></div>}
                        </div>
                        <div>
                          <div style={{ fontSize: '13px', color: 'var(--text-white)' }}>
                            {item.type === 'Note' && <strong style={{ color: '#3b82f6' }}>Note Added</strong>}
                            {item.type === 'Broadcast' && <strong>Broadcast Sent</strong>}
                            {item.type === 'Status' && <strong>Status Change</strong>}
                            {item.type === 'System' && <strong>System Update</strong>}
                            {item.type === 'Detection' && <strong>Detection</strong>}
                            {item.user && <span style={{ fontSize: '11px', color: 'var(--text-gray)', marginLeft: '8px' }}>by {item.user}</span>}
                            <div style={{ marginTop: '4px', color: 'var(--text-gray)', fontSize: '12px', lineHeight: '1.4' }}>{item.text}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: '16px', borderTop: '1px solid var(--bg-border)' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="text"
                        value={incidentNote}
                        onChange={(e) => setIncidentNote(e.target.value)}
                        placeholder="Add diagnostic note..."
                        style={{ flex: 1, background: 'var(--bg-primary)', border: '1px solid var(--bg-border)', borderRadius: '6px', padding: '10px 16px', color: 'var(--text-white)', fontSize: '13px', outline: 'none' }}
                      />
                      <button onClick={() => {
                        if (!incidentNote.trim()) return;
                        setIncidentTimeline([{ id: Date.now(), type: 'Note', text: incidentNote, time: get24hTimestamp(), user: 'Shankar' }, ...incidentTimeline]);
                        setIncidentNote("");
                      }} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--bg-border)', color: 'white', padding: '0 16px', borderRadius: '6px', cursor: 'pointer' }}>
                        Add Note
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        );
  }

        function renderCaseDetail() {
    const slaText = activeCase.sla === '00d 00h' ? 'BREACHED' : activeCase.sla;
        const slaColor = activeCase.slaColor || 'sla-red';
    
    const renderMilestoneIcon = (iconName: string) => {
      switch(iconName) {
        case 'check': return <Check size={16} />;
        case 'alert': return <AlertCircle size={16} />;
        case 'clock': default: return <Clock size={16} />;
      }
    };

    const fullTimelineData = activeCase.milestones ? activeCase.milestones.map((m: any) => ({
          ...m,
          icon: renderMilestoneIcon(m.icon)
    })) : [];

        const displayTimeline = expandTimeline ? fullTimelineData : fullTimelineData.slice(0, 5);
    const availableAssignees = PERSONAS.filter(p => selectedPersona && p.name !== selectedPersona.name);

        return (
        <div className="detail-view-container" style={{ padding: '24px 48px', position: 'relative' }}>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-gray)', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '4px' }}>Support Case & Logistics Identity</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text-white)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: 'var(--accent-sentry)' }}>{activeCase.id}</span>
                  <span style={{ fontSize: '18px', color: 'var(--text-gray)', fontWeight: 'normal' }}>/</span>
                  <span style={{ fontSize: '18px', color: 'var(--text-white)', fontWeight: 'normal' }}>{activeCase.orderId || 'N/A'}</span>
                </div>
              </div>
              <div style={{ padding: '4px 8px', background: 'var(--bg-primary)', border: '1px solid var(--bg-border)', borderRadius: '4px', fontSize: '13px', color: 'var(--text-gray)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={14} /> Destination ZIP: {activeCase.zip}
              </div>

              {/* Assignee Interactive Reassignment Chip */}

              {/* Assignee Interactive Reassignment Chip */}
              <div style={{ position: 'relative' }}>
                <div
                  onClick={() => setShowAssigneePopover(!showAssigneePopover)}
                  style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(106, 95, 193, 0.1)', cursor: 'pointer', border: '1px solid rgba(106, 95, 193, 0.4)', padding: '6px 12px', borderRadius: '16px', color: 'var(--text-white)' }}
                >
                  Assigned to: <span style={{ color: 'var(--accent-sentry)' }}>{selectedPersona?.name}</span>
                </div>

                {showAssigneePopover && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: '8px', background: 'var(--bg-deep)', border: '1px solid var(--bg-border)', borderRadius: '8px', zIndex: 100, width: '220px', boxShadow: '0 10px 20px rgba(0,0,0,0.5)' }}>
                    {availableAssignees.map(p => (
                      <div
                        key={p.name}
                        onClick={() => {
                          setTargetAssignee(p);
                          setShowAssigneePopover(false);
                          setShowHandoffInput(true);
                        }}
                        style={{ padding: '12px 16px', fontSize: '13px', color: 'var(--text-white)', cursor: 'pointer', borderBottom: '1px solid var(--bg-border)' }}
                      >
                        {p.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative' }}>

              {/* NEW: Ask Vantage Header Component Context */}
              <button
                onClick={() => { setShowVantageModal(true); setShowTimezoneMenu(false); setShowActionDropdown(false); }}
                style={{ background: 'var(--bg-deep)', border: '1px solid var(--accent-lime)', color: 'var(--accent-lime)', padding: '8px 16px', fontSize: '12px', fontWeight: 'bold', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 0 10px rgba(194, 239, 78, 0.1)' }}
              >
                <Sparkles size={14} />
                Ask Vantage
              </button>

              {/* Time Zone Selector */}
              <div style={{ position: 'relative' }}>
                <button onClick={() => { setShowTimezoneMenu(!showTimezoneMenu); setShowActionDropdown(false); }} style={{ background: 'var(--bg-deep)', border: '1px solid var(--accent-sentry)', color: 'var(--text-white)', padding: '8px 16px', fontSize: '12px', fontWeight: 'bold', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Globe size={14} color="var(--accent-sentry)" />
                  Time Zone: {globalTimezone}
                </button>
                {showTimezoneMenu && (
                  <div style={{ position: 'absolute', top: '100%', right: '0', marginTop: '8px', background: 'var(--bg-deep)', border: '1px solid var(--bg-border)', borderRadius: '8px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)', width: '240px', padding: '8px 0', zIndex: 100 }}>
                    <div style={{ padding: '8px 16px', fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-gray)', fontWeight: 'bold', borderBottom: '1px solid var(--bg-border)', marginBottom: '4px' }}>Select View Timezone</div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <div onClick={() => { setGlobalTimezone('System Time (PST)'); setShowTimezoneMenu(false); }} style={{ padding: '8px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', background: globalTimezone === 'System Time (PST)' ? 'rgba(255,255,255,0.05)' : 'transparent' }}>
                        <span style={{ fontSize: '13px', color: 'var(--text-white)' }}>System Timezone (PST)</span>
                      </div>
                      <div onClick={() => { setGlobalTimezone('US Central (CST)'); setShowTimezoneMenu(false); }} style={{ padding: '8px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', background: globalTimezone === 'US Central (CST)' ? 'rgba(255,255,255,0.05)' : 'transparent' }}>
                        <span style={{ fontSize: '13px', fontWeight: globalTimezone === 'US Central (CST)' ? 'bold' : 'normal', color: 'var(--accent-coral)' }}>Customer Local (CST)</span>
                      </div>
                      <div onClick={() => { setGlobalTimezone('US Eastern (EST)'); setShowTimezoneMenu(false); }} style={{ padding: '8px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', background: globalTimezone === 'US Eastern (EST)' ? 'rgba(255,255,255,0.05)' : 'transparent' }}>
                        <span style={{ fontSize: '13px', color: 'var(--text-white)' }}>Hubs / Warehouse (EST)</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Dropdown Menu */}
              <div style={{ position: 'relative' }}>
                <button onClick={() => { setShowActionDropdown(!showActionDropdown); setShowTimezoneMenu(false); }} style={{ background: 'var(--accent-sentry)', border: '1px solid var(--accent-sentry)', color: 'white', padding: '8px 16px', fontSize: '12px', fontWeight: 'bold', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  Command Actions
                </button>
                {showActionDropdown && (
                  <div style={{ position: 'absolute', top: '100%', right: '0', marginTop: '8px', background: 'var(--bg-deep)', border: '1px solid var(--bg-border)', borderRadius: '8px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)', width: '300px', padding: '16px', zIndex: 100 }}>

                    {actionMenuState === 'Main' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <button onClick={() => setActionMenuState('Escalate')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: 'var(--bg-primary)', border: '1px solid var(--bg-border)', borderRadius: '6px', cursor: 'pointer', color: 'var(--text-white)', fontSize: '13px', fontWeight: 'bold' }}>
                          <span><Briefcase size={14} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Escalate Internally</span>
                          <ArrowRight size={14} color="var(--text-gray)" />
                        </button>
                        <button onClick={() => setActionMenuState('Approval')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: 'var(--bg-primary)', border: '1px solid var(--bg-border)', borderRadius: '6px', cursor: 'pointer', color: 'var(--text-white)', fontSize: '13px', fontWeight: 'bold' }}>
                          <span><FileSignature size={14} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Approvals</span>
                          <ArrowRight size={14} color="var(--text-gray)" />
                        </button>
                      </div>
                    )}

                    {actionMenuState === 'Escalate' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-white)', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
                          <button onClick={() => setActionMenuState('Main')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-gray)' }}><ArrowLeft size={14} /></button>
                          Escalate to Manager
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--text-gray)' }}>Assigned Manager: <span style={{ color: 'var(--text-white)', fontWeight: 'bold' }}>Sarah Jenkins</span></div>
                        <textarea
                          value={escalateNote}
                          onChange={(e) => setEscalateNote(e.target.value)}
                          placeholder="Add internal comment..."
                          style={{ background: 'var(--bg-primary)', border: '1px solid var(--bg-border)', borderRadius: '6px', padding: '8px', fontSize: '12px', color: 'var(--text-white)', minHeight: '60px', resize: 'none', outline: 'none' }}
                        />
                        <button onClick={() => handleActionExecute('Escalate', escalateNote)} style={{ background: 'var(--accent-sentry)', color: 'white', border: 'none', padding: '8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                          Submit Escalation
                        </button>
                      </div>
                    )}
                    {actionMenuState === 'Approval' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-white)', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
                          <button onClick={() => setActionMenuState('Main')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-gray)' }}><ArrowLeft size={14} /></button>
                          Request Approvals
                        </div>
                        <button onClick={() => handleActionExecute('Refund')} style={{ padding: '12px', background: 'var(--bg-primary)', border: '1px solid var(--bg-border)', borderRadius: '6px', cursor: 'pointer', color: 'var(--text-white)', fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }}>
                          Raise Refund
                        </button>
                        <button onClick={() => handleActionExecute('Cancel')} style={{ padding: '12px', background: 'var(--bg-primary)', border: '1px solid var(--accent-coral)', borderRadius: '6px', cursor: 'pointer', color: 'var(--accent-coral)', fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }}>
                          Cancel Order
                        </button>
                      </div>
                    )}

                    {selectedPersona?.name === 'Simran' && actionMenuState === 'Main' && (
                      <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--bg-border)' }}>
                        <div style={{ fontSize: '10px', color: 'var(--accent-coral)', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '8px' }}>Manager Authority</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <button onClick={() => handleActionExecute('Approve Resolution', 'Manager Audit Override: Approved.')} style={{ background: 'rgba(194, 239, 78, 0.1)', border: '1px solid var(--accent-lime)', color: 'var(--accent-lime)', padding: '8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                            Approve Resolution
                          </button>
                          <button onClick={() => handleActionExecute('Override SLA', 'Manager Audit Override: SLA Reset.')} style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--accent-coral)', color: 'var(--accent-coral)', padding: '8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                            Force SLA Reset
                          </button>
                        </div>
                      </div>
                    )}

                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Transfer Handoff Rendering */}
          {showHandoffInput && targetAssignee && (
            <div style={{ background: 'var(--bg-primary)', padding: '12px', borderRadius: '8px', border: '1px solid var(--accent-sentry)', display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <input
                type="text"
                placeholder={`Transfer Note for ${targetAssignee.name}...`}
                value={handoffNote}
                onChange={(e) => setHandoffNote(e.target.value)}
                style={{ flex: 1, background: 'transparent', border: 'none', color: 'var(--text-white)', fontSize: '12px', outline: 'none' }}
                autoFocus
              />
              <button onClick={submitHandoffAssignment} style={{ background: 'var(--accent-sentry)', color: 'white', border: 'none', borderRadius: '4px', padding: '4px 12px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                Send
              </button>
              <button onClick={() => { setShowHandoffInput(false); setTargetAssignee(null); }} style={{ background: 'transparent', color: 'var(--text-gray)', border: 'none', padding: '4px', cursor: 'pointer' }}>
                <X size={14} />
              </button>
            </div>
          )}

          {/* Intelligence Action Bar */}
          {activeCase.intelligence && (
            <div style={{ display: 'flex', background: 'var(--bg-deep)', borderRadius: '12px', border: '1px solid var(--accent-sentry)', overflow: 'hidden', marginBottom: '16px' }}>

              <div style={{ flex: '0 0 280px', display: 'flex', flexDirection: 'column', padding: '20px 24px', borderRight: '1px solid rgba(255,255,255,0.1)', background: (activeCase.intelligence?.breachProbability ?? 0) === 0 ? 'rgba(194, 239, 78, 0.05)' : 'rgba(239, 68, 68, 0.05)' }}>
                <div style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', color: (activeCase.intelligence?.breachProbability ?? 0) === 0 ? 'var(--accent-lime)' : 'var(--accent-coral)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <AlertOctagon size={12} /> Risk Assessment
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-gray)', marginBottom: '4px' }}>Probability of Breach</div>
                    <div style={{ color: (activeCase.intelligence?.breachProbability ?? 0) === 0 ? 'var(--accent-lime)' : 'var(--accent-coral)', fontSize: '20px', fontWeight: 'bold' }}>{activeCase.intelligence?.breachProbability ?? 0}% Risk</div>
                    <div style={{ height: '4px', width: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', marginTop: '6px' }}>
                      <div style={{ height: '100%', width: `${activeCase.intelligence?.breachProbability ?? 0}%`, background: (activeCase.intelligence?.breachProbability ?? 0) === 0 ? 'var(--accent-lime)' : 'var(--accent-coral)', borderRadius: '2px' }}></div>
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-gray)', marginBottom: '4px' }}>Resolution Runway (Countdown)</div>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--text-white)' }}>{activeCase.intelligence.resolutionRunway || 'On Track'} <span style={{ fontSize: '11px', color: 'var(--text-gray)', fontWeight: 'normal' }}>until projected delay</span></div>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-white)', lineHeight: '1.4' }}>
                    {activeCase.intelligence.riskAssessment || 'NOMINAL — No operational risks detected. The shipment is progressing according to the carrier\'s scheduled timeline.'}
                  </div>
                </div>
              </div>

              <div style={{ flex: '2', display: 'flex', flexDirection: 'column', padding: '20px 24px', borderRight: '1px solid rgba(255,255,255,0.1)', justifyContent: 'center' }} className="vantage-ai-glow">
                <div style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--accent-lime)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Bot size={12} /> Vantage Case Synthesis
                </div>
                <div style={{ fontSize: '13px', lineHeight: '1.6', color: 'var(--text-white)' }}>
                  {activeCase.intelligence.caseSynthesis || 'Order is moving normally through the fulfillment network. Labels have been generated and carrier handoff is confirmed. No anomalies or delays detected in recent telemetry.'}
                </div>
              </div>

              <div style={{ flex: '1', display: 'flex', flexDirection: 'column', padding: '20px 24px', justifyContent: 'center', backgroundColor: (activeCase.intelligence?.breachProbability ?? 0) === 0 ? 'rgba(194, 239, 78, 0.05)' : 'rgba(239, 68, 68, 0.05)' }} className="vantage-ai-glow">
                <div style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px', color: (activeCase.intelligence?.breachProbability ?? 0) === 0 ? 'var(--accent-lime)' : 'var(--accent-coral)', marginBottom: '8px' }}>
                  Suggested Action
                </div>
                <div style={{ fontSize: '12px', lineHeight: '1.5', color: 'var(--accent-lime)', fontWeight: '600' }}>
                  {activeCase.intelligence.suggestedAction || 'All good here for now'}
                </div>
              </div>
            </div>
          )}

          {/* Metric & Summary Integration Strip */}
          <div style={{ display: 'flex', alignItems: 'center', padding: '16px 20px', background: 'var(--bg-deep)', borderRadius: '8px', border: '1px solid var(--bg-border)', gap: '20px', marginBottom: '32px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', borderRight: '1px solid var(--bg-border)', paddingRight: '20px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-gray)', textTransform: 'uppercase', fontWeight: 'bold' }}>Delivery Status</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--accent-coral)' }}>{activeCase.deliveryStatus || 'Exception - Delay'}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', borderRight: '1px solid var(--bg-border)', paddingRight: '20px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-gray)', textTransform: 'uppercase', fontWeight: 'bold' }}>SLA Health</span>
              <span className={slaColor} style={{ fontSize: '13px', fontWeight: 'bold' }}>{slaText}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', borderRight: '1px solid var(--bg-border)', paddingRight: '20px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-gray)', textTransform: 'uppercase', fontWeight: 'bold' }}>Carrier Partner</span>
              <button
                onClick={() => setActiveWorkspaceTab('Carrier')}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-white)', border: '1px solid var(--bg-border)', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>
                {activeCase.carrier || 'FedEx'} Express <ChevronsRight size={14} color="var(--text-gray)" />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', borderRight: '1px solid var(--bg-border)', paddingRight: '20px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-gray)', textTransform: 'uppercase', fontWeight: 'bold' }}>Order Source</span>
              <button
                onClick={() => setActiveWorkspaceTab('Order Source')}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 255, 255, 0.05)', color: '#95bf47', border: '1px solid var(--bg-border)', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>
                Shopify <ChevronsRight size={14} color="var(--text-gray)" />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', borderRight: '1px solid var(--bg-border)', paddingRight: '20px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-gray)', textTransform: 'uppercase', fontWeight: 'bold' }}>Fulfillment Center</span>
              <button
                onClick={() => setActiveWorkspaceTab('Fulfillment')}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-white)', border: '1px solid var(--bg-border)', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>
                {activeCase.fulfillmentCenter || 'N/A'} <ChevronsRight size={14} color="var(--text-gray)" />
              </button>
            </div>

            <div style={{ flex: 1 }}></div>

            {/* Customer Details Block Component */}
            <div
              onClick={() => setShowCustomerModal(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--bg-border)', padding: '12px 20px', borderRadius: '8px', cursor: 'pointer' }}
            >
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(106, 95, 193, 0.2)', color: 'var(--accent-sentry)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={18} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--text-white)' }}>{activeCase.customer?.name || 'N/A'}</span>
                  <span style={{ fontSize: '10px', background: activeCase.customer?.type === 'REPEAT' ? 'rgba(194, 239, 78, 0.1)' : 'rgba(59, 130, 246, 0.1)', color: activeCase.customer?.type === 'REPEAT' ? 'var(--accent-lime)' : '#3b82f6', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold', border: activeCase.customer?.type === 'REPEAT' ? '1px solid rgba(194, 239, 78, 0.3)' : '1px solid rgba(59, 130, 246, 0.3)' }}>{activeCase.customer?.type || 'NEW'}</span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-gray)' }}>{activeCase.customer?.city || 'N/A'}, {activeCase.customer?.state || 'N/A'} &bull; {activeCase.customer?.totalOrders || 0} Order{(activeCase.customer?.totalOrders || 0) !== 1 ? 's' : ''} ({activeCase.customer?.orderWindow || 'N/A'})</div>
              </div>
            </div>
          </div>

          {/* Dynamic Milestone Graph */}
          <div className="content-box" style={{ padding: '32px', position: 'relative' }}>

            {!expandTimeline && (
              <div onClick={() => setExpandTimeline(true)} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: 'var(--text-gray)' }}>
                <ChevronsLeft size={20} />
              </div>
            )}

            <div style={{ display: 'flex', width: '100%', position: 'relative' }}>
              {displayTimeline.map((node: any, index: number) => (
                <div key={node.id} style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '100px' }}>

                  {index < displayTimeline.length - 1 && (
                    <div style={{ position: 'absolute', top: '35px', left: '50%', width: '100%', height: '2px', background: node.connectorColor, zIndex: 1 }}>
                      <span style={{
                        position: 'absolute',
                        top: '-20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        color: node.connectorColor === '#ef4444' ? '#ef4444' : 'var(--text-gray)',
                        background: 'var(--bg-deep)',
                        padding: '0 8px'
                      }}>
                        {node.connectorTime}
                      </span>
                    </div>
                  )}

                  <div className="node-label" style={{ marginBottom: '12px', fontSize: '13px', fontWeight: 'bold', color: node.colorClass === 'red' ? '#ef4444' : 'var(--text-white)' }}>{node.action}</div>
                  <div className={`node-circle ${node.colorClass}`} style={{ position: 'relative', zIndex: 2 }}>{node.icon}</div>
                  <div className="node-subtext" style={{ marginTop: '16px', fontSize: '11px', color: 'var(--text-gray)' }}>{node.location}</div>
                  <div className="node-subtext" style={{ fontSize: '11px', color: node.colorClass === 'red' ? '#ef4444' : 'var(--text-gray)', background: 'rgba(255,255,255,0.05)', padding: '2px 4px', borderRadius: '4px', marginTop: '4px' }}>{node.time}</div>
                </div>
              ))}
            </div>

            {!expandTimeline && (
              <div onClick={() => setExpandTimeline(true)} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: 'var(--text-gray)' }}>
                <ChevronsRight size={20} />
              </div>
            )}
          </div>

          {/* Centralized 7-Tab Workspace */}
          <div style={{ marginTop: '24px', background: 'var(--bg-deep)', borderRadius: '12px', border: '1px solid var(--bg-border)', display: 'flex', flexDirection: 'column', height: '600px' }}>

            {/* Header Navigation */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--bg-border)', background: 'rgba(255,255,255,0.02)', paddingRight: '16px', overflowX: 'auto' }}>
              <div style={{ display: 'flex', minWidth: 'max-content' }}>
                {(activeCase.source === 'Vantage'
                  ? ['Vantage Actions', 'Internal Comments', 'Customer', 'Order Source', 'Warehouse', 'Fulfillment', 'Carrier', 'Activity Log']
                  : ['Internal Comments', 'Customer', 'Order Source', 'Warehouse', 'Fulfillment', 'Carrier', 'Activity Log']
                ).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveWorkspaceTab(tab)}
                    style={{
                      padding: '16px 20px',
                      background: 'transparent',
                      border: 'none',
                      borderBottom: activeWorkspaceTab === tab ? '2px solid var(--accent-sentry)' : '2px solid transparent',
                      color: activeWorkspaceTab === tab ? 'var(--text-white)' : 'var(--text-gray)',
                      fontSize: '13px',
                      fontWeight: activeWorkspaceTab === tab ? 'bold' : 'normal',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.2s ease',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {tab === 'Vantage Actions' && <Bot size={14} color="var(--accent-lime)" />}
                    {tab === 'Internal Comments' && <Users size={14} />}
                    {tab === 'Customer' && <MessageSquare size={14} />}
                    {tab === 'Order Source' && <ShoppingBag size={14} />}
                    {tab === 'Warehouse' && <Factory size={14} />}
                    {tab === 'Fulfillment' && <Package size={14} />}
                    {tab === 'Carrier' && <Truck size={14} />}
                    {tab === 'Activity Log' && <Settings size={14} />}
                    {tab}
                  </button>
                ))}
              </div>

              {/* Right Side Call Header Action dynamically rendered directly for everything EXCEPT Activity Log */}
              {activeWorkspaceTab !== 'Activity Log' && (
                <button
                  onClick={() => simulateCallEntity(activeWorkspaceTab)}
                  style={{ background: 'var(--bg-deep)', border: '1px solid var(--accent-sentry)', color: 'var(--accent-sentry)', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s', flexShrink: 0 }}
                  title={`Initiate call natively mapping constraints optimally.`}
                >
                  <PhoneCall size={16} />
                </button>
              )}
            </div>

            {/* Scrollable Feed Core Arrays */}
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>

              {activeWorkspaceTab === 'Vantage Actions' && (
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ flex: '1', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto' }}>
                    <div style={{ alignSelf: 'center', padding: '4px 12px', background: 'rgba(194, 239, 78, 0.1)', color: 'var(--accent-lime)', borderRadius: '16px', fontSize: '11px', fontWeight: 'bold', border: '1px solid rgba(194, 239, 78, 0.3)' }}>Autonomous AI Actions Feed</div>
                    {vantageActionsLogs.map(log => (
                      <div key={log.id} style={{ display: 'flex', gap: '16px' }}>
                        <div style={{ zIndex: 2, padding: '8px', borderRadius: '50%', background: 'rgba(194, 239, 78, 0.05)', border: '1px solid var(--accent-lime)', color: 'var(--accent-lime)', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          {log.icon}
                        </div>
                        <div className="vantage-ai-glow" style={{ flex: 1, border: '1px solid rgba(194, 239, 78, 0.2)', borderRadius: '8px', padding: '16px', background: 'rgba(194, 239, 78, 0.02)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                            <span style={{ fontSize: '14px', color: 'var(--accent-lime)', fontWeight: 'bold' }}>{log.title}</span>
                            <div style={{ fontSize: '11px', color: 'var(--text-gray)', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '4px' }}>{adjustTimestamp(log.time)}</div>
                          </div>
                          <div style={{ fontSize: '13px', color: 'var(--text-white)', lineHeight: '1.5' }}>{log.details}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Vantage Advice Footer */}
                  {activeCase.intelligence?.humanTouchAdvice && (
                    <div style={{ flex: '0 0 auto', padding: '20px 24px', borderTop: '1px solid var(--bg-border)', background: 'rgba(194, 239, 78, 0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <AlertCircle size={20} color="var(--accent-lime)" />
                        <div style={{ fontSize: '13px', color: 'var(--text-white)' }}>
                          <strong style={{ color: 'var(--accent-lime)' }}>Human Touch Required:</strong> {activeCase.intelligence.humanTouchAdvice}
                        </div>
                      </div>
                      {activeCase.intelligence.humanTouchAdvice.includes('Call') && (
                        <button
                          onClick={() => simulateCallEntity(activeCase.intelligence.humanTouchAdvice.includes('FedEx') ? 'Carrier' : 'Warehouse')}
                          style={{ background: 'var(--accent-lime)', border: 'none', color: 'black', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0, marginLeft: '16px' }}
                        >
                          <Phone size={14} /> Place Needed Call
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}

              {activeWorkspaceTab === 'Internal Comments' && (
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ flex: '1', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto' }}>
                    {auditLogs.filter(log => log.type === 'Internal').map(log => (
                      <div key={log.id} style={{ display: 'flex', gap: '16px', cursor: 'pointer' }} onClick={() => { setActiveAuditLog(log); setShowUnifiedDetailsModal(true); }}>
                        <div style={{ zIndex: 2, padding: '8px', borderRadius: '50%', background: 'var(--bg-primary)', border: '1px solid var(--bg-border)', color: 'var(--text-white)', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          {log.icon}
                        </div>
                        <div style={{ flex: 1, border: '1px solid var(--bg-border)', borderRadius: '8px', padding: '16px', background: 'var(--bg-primary)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                            <span style={{ fontSize: '14px', color: 'var(--text-white)', fontWeight: 'bold' }}>{log.title}</span>
                            <div style={{ fontSize: '11px', color: 'var(--text-gray)', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '4px' }}>{adjustTimestamp(log.time)}</div>
                          </div>
                          <div style={{ fontSize: '13px', color: 'var(--text-gray)', lineHeight: '1.5' }}>{log.details}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Internal Input Zone */}
                  <div style={{ flex: '0 0 auto', padding: '16px 24px', borderTop: '1px solid var(--bg-border)', background: 'var(--bg-primary)', display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <input
                      type="text"
                      value={internalCommentInput}
                      onChange={(e) => setInternalCommentInput(e.target.value)}
                      placeholder="Type @ to tag team members..."
                      onKeyDown={(e) => e.key === 'Enter' && submitInternalComment()}
                      style={{ flex: 1, padding: '12px 16px', background: 'var(--bg-deep)', border: '1px solid var(--bg-border)', borderRadius: '6px', color: 'var(--text-white)', fontSize: '13px', outline: 'none' }}
                    />
                    <button
                      onClick={submitInternalComment}
                      style={{ background: 'var(--accent-sentry)', border: 'none', color: 'white', padding: '12px 24px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                      <Send size={16} /> Post
                    </button>
                  </div>
                </div>
              )}

              {activeWorkspaceTab === 'Customer' && (
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  {!contactCustomerUnlocked ? (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px', textAlign: 'center' }}>
                      <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--accent-coral)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                        <AlertCircle size={32} />
                      </div>
                      <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--text-white)', marginBottom: '12px' }}>Communication Restricted</h3>
                      <p style={{ fontSize: '14px', color: 'var(--text-gray)', maxWidth: '400px', lineHeight: '1.6', marginBottom: '24px' }}>
                        Please include the customer in the conversation only if there is a certain delay. Early notifications for AI-detected anomalies may cause unnecessary support inquiries.
                      </p>
                      <button
                        onClick={() => setContactCustomerUnlocked(true)}
                        style={{ background: 'var(--accent-sentry)', border: 'none', color: 'white', padding: '14px 28px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}
                      >
                        <MessageSquare size={18} /> Contact Customer
                      </button>
                    </div>
                  ) : (
                    <>
                      <div style={{ flex: '1', display: 'flex', flexDirection: 'column', padding: '24px', overflowY: 'auto' }}>
                        {activeCase.omniMessages?.map((msg: any) => (
                          <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.direction === 'outbound' ? 'flex-end' : 'flex-start', marginBottom: '24px', maxWidth: '85%', alignSelf: msg.direction === 'outbound' ? 'flex-end' : 'flex-start' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                              <span style={{ fontSize: '11px', color: 'var(--text-gray)' }}>{adjustTimestamp(msg.time)}</span>
                              <span style={{ fontSize: '11px', background: 'var(--bg-primary)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--bg-border)' }}>{msg.sender} ({msg.channel})</span>
                              {msg.isAiSuggested && <span style={{ fontSize: '10px', background: 'rgba(194, 239, 78, 0.1)', color: 'var(--accent-lime)', padding: '2px 4px', borderRadius: '4px', border: '1px solid rgba(194, 239, 78, 0.3)' }}><Bot size={10} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '2px' }} />AI Drafted</span>}
                            </div>
                            <div style={{ background: msg.direction === 'outbound' ? 'rgba(106, 95, 193, 0.1)' : 'rgba(255,255,255,0.05)', border: msg.direction === 'outbound' ? '1px solid rgba(106, 95, 193, 0.4)' : '1px solid var(--bg-border)', padding: '16px', borderRadius: '12px', borderTopRightRadius: msg.direction === 'outbound' ? '0' : '12px', borderTopLeftRadius: msg.direction === 'outbound' ? '12px' : '0', fontSize: '13px', color: 'var(--text-white)', lineHeight: '1.5' }}>
                              {msg.text}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Communications Full Width Input Zone */}
                      <div style={{ flex: '0 0 auto', background: 'var(--bg-primary)', padding: '24px', borderTop: '1px solid var(--bg-border)' }}>
                        {activeCase.copilotSuggestion && (
                          <div className="vantage-ai-glow" style={{ padding: '16px', background: 'rgba(194, 239, 78, 0.05)', border: '1px solid var(--accent-lime)', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-lime)', fontSize: '12px', fontWeight: 'bold' }}>
                                <Sparkles size={14} /> Vantage Copilot
                              </div>
                              <button onClick={() => setOmniInput(activeCase.copilotSuggestion)} style={{ background: 'var(--bg-deep)', border: '1px solid var(--bg-border)', color: 'var(--text-white)', fontSize: '11px', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>
                                Import
                              </button>
                            </div>
                            <div style={{ fontSize: '12px', color: 'var(--text-white)', lineHeight: '1.5' }}>
                              "{activeCase.copilotSuggestion}"
                            </div>
                          </div>
                        )}

                        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <span style={{ fontSize: '11px', color: 'var(--text-gray)', fontWeight: 'bold', textTransform: 'uppercase' }}>Channel</span>
                            <select value={omniChannel} onChange={(e) => setOmniChannel(e.target.value)} style={{ padding: '12px', background: 'var(--bg-deep)', border: '1px solid var(--bg-border)', borderRadius: '6px', color: 'var(--text-white)', fontSize: '13px', outline: 'none' }}>
                              <option value="SMS">SMS</option>
                              <option value="Email">Email</option>
                              <option value="WhatsApp">WhatsApp</option>
                            </select>
                          </div>
                          <textarea
                            value={omniInput}
                            onChange={(e) => setOmniInput(e.target.value)}
                            placeholder="Type response to Customer..."
                            style={{ flex: 1, padding: '12px', background: 'var(--bg-deep)', border: '1px solid var(--bg-border)', borderRadius: '6px', color: 'var(--text-white)', fontSize: '13px', height: '46px', outline: 'none', resize: 'none' }}
                          />
                          <button onClick={sendOmniChannelMessage} style={{ background: 'var(--accent-sentry)', color: 'white', border: 'none', padding: '0 24px', height: '46px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                            <Send size={16} /> Send
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {['Order Source', 'Warehouse', 'Fulfillment', 'Carrier'].includes(activeWorkspaceTab) && (
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ flex: '1', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto' }}>
                    <div style={{ alignSelf: 'center', padding: '4px 12px', background: 'var(--bg-primary)', borderRadius: '16px', fontSize: '11px', color: 'var(--text-gray)' }}>Context Filter Active: {activeWorkspaceTab}</div>

                    {auditLogs.filter(log => log.type === activeWorkspaceTab || (activeWorkspaceTab === 'Order Source' && log.type === 'Source')).map(log => {
                      const isTicket = (log as any).isTicket;
                      return (
                        <div key={log.id} style={{ 
                          alignSelf: 'flex-start', 
                          background: isTicket ? 'rgba(239, 68, 68, 0.05)' : 'var(--bg-primary)', 
                          border: '1px solid',
                          borderColor: isTicket ? 'rgba(239, 68, 68, 0.4)' : 'var(--bg-border)', 
                          padding: '16px', 
                          borderRadius: '8px', 
                          fontSize: '13px', 
                          color: 'var(--text-white)', 
                          maxWidth: '80%', 
                          lineHeight: '1.5',
                          boxShadow: isTicket ? '0 4px 12px rgba(239, 68, 68, 0.1)' : 'none'
                        }}>
                          <div style={{ fontSize: '11px', color: isTicket ? 'var(--accent-coral)' : 'var(--text-gray)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            {isTicket && <Ticket size={12} />}
                            {log.title}
                            <span style={{ fontWeight: 'normal', color: 'var(--text-gray)', marginLeft: 'auto' }}>{adjustTimestamp(log.time)}</span>
                          </div>
                          <div style={{ color: isTicket ? 'var(--text-white)' : 'var(--text-white)' }}>
                            {log.details}
                          </div>
                          {isTicket && (
                            <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
                              <span style={{ background: 'rgba(239, 68, 68, 0.2)', color: 'var(--accent-coral)', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>UNRESPONSIVE</span>
                              <span style={{ background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-gray)', padding: '2px 6px', borderRadius: '4px', fontSize: '10px' }}>ID: #WH-882</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div style={{ flex: '0 0 auto', padding: '16px 24px', borderTop: '1px solid var(--bg-border)', background: 'var(--bg-primary)', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <button
                      onClick={() => { setTicketEntity(activeWorkspaceTab); setShowTicketModal(true); }}
                      style={{ background: 'var(--accent-coral)', border: 'none', color: 'white', padding: '12px 24px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                      <AlertOctagon size={16} /> Raise Ticket
                    </button>
                  </div>
                </div>
              )}

              {activeWorkspaceTab === 'Activity Log' && (
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {([...vantageActionsLogs, ...auditLogs]).map(log => (
                    <div key={log.id} style={{ display: 'flex', gap: '16px', cursor: 'pointer' }} onClick={() => { setActiveAuditLog(log); setShowUnifiedDetailsModal(true); }}>
                      <div style={{ zIndex: 2, padding: '8px', borderRadius: '50%', background: 'var(--bg-primary)', border: '1px solid', borderColor: log.isVantage ? 'var(--accent-lime)' : 'var(--bg-border)', color: log.isVantage ? 'var(--accent-lime)' : 'var(--text-gray)', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {log.icon}
                      </div>
                      <div style={{ flex: 1, border: '1px solid', borderColor: log.isVantage ? 'rgba(194, 239, 78, 0.2)' : 'var(--bg-border)', borderRadius: '8px', padding: '16px', background: log.isVantage ? 'rgba(194, 239, 78, 0.05)' : 'var(--bg-primary)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ fontSize: '14px', color: log.isVantage ? 'var(--accent-lime)' : 'var(--text-white)', fontWeight: 'bold' }}>{log.title}</span>
                            {log.type === 'Call' && log.duration && (
                              <span style={{ fontSize: '11px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-gray)', padding: '2px 6px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Mic size={10} /> {log.duration}
                              </span>
                            )}
                          </div>
                          <div style={{ fontSize: '11px', color: 'var(--text-gray)', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '4px' }}>{adjustTimestamp(log.time)}</div>
                        </div>

                        {log.type === 'Call' && (
                          <div style={{ marginBottom: '12px', fontSize: '12px', color: 'var(--accent-lime)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Bot size={12} /> AI Summary: <span style={{ color: 'var(--text-white)' }}>{log.details}</span>
                          </div>
                        )}

                        {log.type !== 'Call' && (
                          <div style={{ fontSize: '13px', color: 'var(--text-gray)', lineHeight: '1.5' }}>{log.details}</div>
                        )}

                        {log.transcript && (
                          <div style={{ marginTop: '12px' }}>
                            <button onClick={(e) => { e.stopPropagation(); setExpandedTranscripts(prev => ({ ...prev, [log.id]: !prev[log.id] })); }} style={{ background: 'transparent', border: '1px solid var(--bg-border)', color: 'var(--text-gray)', fontSize: '11px', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              {expandedTranscripts[log.id] ? <ChevronDown size={14} /> : <ChevronRight size={14} />} Read Transcript
                            </button>
                            <AnimatePresence>
                              {expandedTranscripts[log.id] && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                                  <div style={{ background: '#09090b', padding: '16px', borderRadius: '8px', border: '1px solid #27272a', fontSize: '12px', fontFamily: 'monospace', whiteSpace: 'pre-wrap', color: '#a1a1aa', lineHeight: '1.8', marginTop: '8px' }}>
                                    {log.transcript}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>

        </div>
        );
  }

        function renderMainContent() {
    if (activeCaseId) {
      if (activeCaseId.startsWith('INFRA-')) return renderTechnicalIncidentDetail();
        return renderCaseDetail();
    }

        // Support Command Center Routing
        if (selectedPersona?.name === 'Shankar') return renderShankarDashboard();
        if (selectedPersona?.name === 'Simran') {
      return (
        <>
          {renderDashboardTabs()}
          {dashboardTab === 'Orders' ? renderAllOpenOrders() : renderManagerDashboard()}
        </>
        );
    }

        if (selectedPersona?.name === 'Piyush') {
      return renderVPDashboard();
    }

        return renderDashboard();
  }

        return (
        <main className={!selectedPersona ? "main-viewport" : ""}>
          {!selectedPersona && (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '1200px', height: '800px', backgroundColor: 'rgba(106, 95, 193, 0.05)', filter: 'blur(120px)', borderRadius: '50%', zIndex: -10 }} />
          )}
          <AnimatePresence mode="wait">
            {!selectedPersona ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="content-container"
              >
                <div className="header-section">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(106, 95, 193, 0.2)', border: '1px solid rgba(106, 95, 193, 0.3)', marginBottom: '24px', color: '#6a5fc1' }}
                  >
                    <Command size={24} />
                  </motion.div>
                  <h1 className="hey-there">Vantage - Last Mile Delivery Control Tower</h1>
                  <p className="sub-text">Identify your role to access the control tower and manage last mile logistics operations.</p>
                </div>
                <div className="persona-grid" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', gap: '48px', flexWrap: 'nowrap', width: 'auto' }}>
                  <div style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-gray)', marginBottom: '20px', letterSpacing: '3px', fontWeight: 'bold', opacity: 0.6 }}>Level 1: Support</h2>
                    <div className="persona-row" style={{ display: 'flex', gap: '20px' }}>
                      {PERSONAS.filter(p => ['Siddhant', 'Rupesh', 'Shankar'].includes(p.name)).map((persona, index) => (
                        <motion.div key={persona.name} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * index }}>
                          <PersonaCard persona={persona} onSelect={handleSelect} />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--accent-lime)', marginBottom: '20px', letterSpacing: '3px', fontWeight: 'bold' }}>Level 2: Manager</h2>
                    <div className="persona-row" style={{ display: 'flex', gap: '20px' }}>
                      {PERSONAS.filter(p => p.name === 'Simran').map((persona, index) => (
                        <motion.div key={persona.name} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * index }}>
                          <PersonaCard persona={persona} onSelect={handleSelect} />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--accent-coral)', marginBottom: '20px', letterSpacing: '3px', fontWeight: 'bold' }}>Executive</h2>
                    <div className="persona-row" style={{ display: 'flex', gap: '20px' }}>
                      {PERSONAS.filter(p => p.name === 'Piyush').map((persona, index) => (
                        <motion.div key={persona.name} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * index }}>
                          <PersonaCard persona={persona} onSelect={handleSelect} />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="associate-layout"
              >
                <div className="left-content" style={{ width: '100%', paddingRight: '0' }}>
                  <div className="top-nav">

                    {!activeCaseId ? (
                      <div className="plain-greeting">
                        {selectedPersona?.name === 'Shankar' ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <ShieldCheck size={20} color="var(--accent-lime)" />
                            <span style={{ fontWeight: 'bold' }}>Technical Support Command Center</span>
                            <span style={{ fontSize: '11px', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '4px', color: 'var(--text-gray)' }}>User: {selectedPersona.name}</span>
                          </div>
                        ) : (
                          `Welcome, ${selectedPersona.name}.`
                        )}
                      </div>
                    ) : (
                      <div onClick={() => handleCaseSelection(null)} style={{ color: 'var(--text-white)', cursor: 'pointer', fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', padding: '6px 16px', borderRadius: '6px', border: '1px solid var(--bg-border)' }}>
                        <ArrowLeft size={16} /> Back to Dashboard
                      </div>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <button className="switch-btn" onClick={() => setSelectedPersona(null)}>Switch Persona</button>
                    </div>
                  </div>

                  {renderMainContent()}
                </div>

                {/* General Log / Legacy Transcript Pop-Up Detail Modals */}
                <AnimatePresence>
                  {showUnifiedDetailsModal && activeAuditLog && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="modal-overlay"
                      onClick={() => setShowUnifiedDetailsModal(false)}
                    >
                      <motion.div
                        initial={{ scale: 0.95, y: -20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.95, y: -20 }}
                        className="modal-content"
                        onClick={e => e.stopPropagation()}
                      >
                        <div className="modal-header">
                          <div style={{ fontSize: '18px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            {activeAuditLog.icon} {activeAuditLog.title}
                          </div>
                          <button onClick={() => setShowUnifiedDetailsModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-gray)' }}><X size={20} /></button>
                        </div>
                        <div className="modal-body">
                          <div style={{ marginBottom: '16px', fontSize: '13px', color: 'var(--text-gray)' }}>Timestamp: {adjustTimestamp(activeAuditLog.time)}</div>
                          <div style={{ fontSize: '14px', color: 'var(--text-white)', lineHeight: '1.6', marginBottom: '24px' }}>
                            {activeAuditLog.details}
                          </div>
                          {activeAuditLog.transcript && (
                            <div style={{ background: 'var(--bg-deep)', padding: '16px', borderRadius: '8px', border: '1px solid var(--bg-border)', fontSize: '13px', fontFamily: 'monospace', whiteSpace: 'pre-wrap', color: '#a1a1aa', lineHeight: '1.8' }}>
                              {activeAuditLog.transcript}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Ticket Creation Modal explicitly mapping constraints smoothly dynamically intuitively cleverly efficiently safely naturally successfully comprehensively structurally resolving successfully reliably intelligently flawlessly compactly wrapping brilliantly locally reliably efficiently perfectly beautifully smartly functionally naturally safely. */}
                <AnimatePresence>
                  {showTicketModal && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="modal-overlay"
                      onClick={() => setShowTicketModal(false)}
                    >
                      <motion.div
                        initial={{ scale: 0.95, y: -10 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.95, y: -10 }}
                        className="modal-content"
                        style={{ maxWidth: '450px' }}
                        onClick={e => e.stopPropagation()}
                      >
                        <div className="modal-header">
                          <div style={{ fontSize: '18px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-white)' }}>
                            Raise {ticketEntity} Ticket
                          </div>
                          <button onClick={() => setShowTicketModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-gray)' }}><X size={20} /></button>
                        </div>

                        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--text-gray)', textTransform: 'uppercase' }}>Severity Level</label>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              {['Low', 'Medium', 'High', 'Critical'].map(level => (
                                <button
                                  key={level}
                                  onClick={() => setTicketSeverity(level)}
                                  style={{
                                    flex: 1,
                                    padding: '8px',
                                    borderRadius: '4px',
                                    border: '1px solid',
                                    borderColor: ticketSeverity === level ? (level === 'Critical' ? 'var(--accent-coral)' : 'var(--accent-sentry)') : 'var(--bg-border)',
                                    background: ticketSeverity === level ? (level === 'Critical' ? 'rgba(225,29,72,0.1)' : 'rgba(106,95,193,0.1)') : 'var(--bg-deep)',
                                    color: ticketSeverity === level ? (level === 'Critical' ? 'var(--accent-coral)' : 'var(--text-white)') : 'var(--text-gray)',
                                    fontSize: '12px',
                                    fontWeight: ticketSeverity === level ? 'bold' : 'normal',
                                    cursor: 'pointer'
                                  }}
                                >
                                  {level}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--text-gray)', textTransform: 'uppercase' }}>Issue Details</label>
                            <textarea
                              value={ticketComment}
                              onChange={(e) => setTicketComment(e.target.value)}
                              placeholder="Describe the problem, attach tracking codes or internal notes..."
                              style={{ width: '100%', height: '100px', padding: '12px', background: 'var(--bg-deep)', border: '1px solid var(--bg-border)', borderRadius: '6px', color: 'var(--text-white)', fontSize: '13px', resize: 'none', outline: 'none' }}
                            />
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--text-gray)', textTransform: 'uppercase' }}>Attachments</label>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed var(--bg-border)', borderRadius: '6px', padding: '24px', background: 'rgba(255,255,255,0.02)', cursor: 'pointer' }}>
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: 'var(--text-gray)' }}>
                                <Camera size={24} />
                                <span style={{ fontSize: '12px' }}>Click to upload photos (Optional)</span>
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={handleCreateTicket}
                            style={{ width: '100%', padding: '14px', background: 'var(--accent-sentry)', color: 'white', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', marginTop: '8px' }}
                          >
                            Submit Ticket
                          </button>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Smart Contact Customer 70% Width Overlay Modal mapped correctly implicitly seamlessly effortlessly structurally properly clearly mapping naturally safely intelligently cleanly logically correctly smartly uniquely cleanly efficiently. */}
                <AnimatePresence>
                  {showCustomerModal && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="modal-overlay"
                      onClick={() => setShowCustomerModal(false)}
                    >
                      <motion.div
                        initial={{ scale: 0.95, y: -20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.95, y: -20 }}
                        className="modal-content"
                        style={{ width: '70vw', maxWidth: '900px' }}
                        onClick={e => e.stopPropagation()}
                      >
                        <div className="modal-header">
                          <div style={{ fontSize: '18px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-white)' }}>
                            <User size={20} /> Customer Profile Verification
                          </div>
                          <button onClick={() => setShowCustomerModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-gray)' }}><X size={20} /></button>
                        </div>

                        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                          <div style={{ display: 'flex', gap: '16px' }}>
                            <div style={{ flex: 1, background: 'var(--bg-deep)', padding: '20px', borderRadius: '8px', border: '1px solid var(--bg-border)' }}>
                              <div style={{ fontSize: '11px', color: 'var(--text-gray)', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '12px' }}>Identity</div>
                              <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--text-white)', marginBottom: '4px' }}>{activeCase.customer?.name || 'N/A'}</div>
                              <div style={{ fontSize: '13px', color: 'var(--text-gray)' }}>{activeCase.customer?.email || 'N/A'}</div>
                              <div style={{ fontSize: '13px', color: 'var(--text-gray)' }}>{activeCase.customer?.phone || 'N/A'}</div>
                            </div>

                            <div style={{ flex: 1, background: 'var(--bg-deep)', padding: '20px', borderRadius: '8px', border: '1px solid var(--bg-border)' }}>
                              <div style={{ fontSize: '11px', color: 'var(--text-gray)', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '12px' }}>Destination Address</div>
                              <div style={{ fontSize: '14px', color: 'var(--text-white)', lineHeight: '1.5' }}>
                                {(activeCase.customer?.fullAddress || 'N/A').split(',').map((line: string, i: number) => (
                                  <div key={i}>{line.trim()}</div>
                                ))}
                                <div>United States</div>
                              </div>
                            </div>

                            <div style={{ flex: 1, background: 'var(--bg-deep)', padding: '20px', borderRadius: '8px', border: '1px solid var(--bg-border)', display: 'flex', flexDirection: 'column' }}>
                              <div style={{ fontSize: '11px', color: 'var(--text-gray)', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '12px' }}>Customer Vector</div>
                              <span style={{ alignSelf: 'flex-start', fontSize: '11px', background: activeCase.customer?.type === 'REPEAT' ? 'rgba(194, 239, 78, 0.1)' : 'rgba(59, 130, 246, 0.1)', color: activeCase.customer?.type === 'REPEAT' ? 'var(--accent-lime)' : '#3b82f6', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold', border: activeCase.customer?.type === 'REPEAT' ? '1px solid rgba(194, 239, 78, 0.3)' : '1px solid rgba(59, 130, 246, 0.3)', marginBottom: '8px' }}>{activeCase.customer?.type === 'REPEAT' ? 'REPEAT CUSTOMER' : 'NEW CUSTOMER'}</span>
                              <div style={{ fontSize: '13px', color: 'var(--text-gray)' }}>{activeCase.customer?.totalOrders || 0} Order{(activeCase.customer?.totalOrders || 0) !== 1 ? 's' : ''} in last {activeCase.customer?.orderWindow || 'N/A'}. Total LTV: {activeCase.customer?.ltv || '$0'}</div>
                            </div>
                          </div>

                          <div className="vantage-ai-glow" style={{ background: 'rgba(194, 239, 78, 0.05)', padding: '20px', borderRadius: '8px', border: '1px solid var(--accent-lime)', display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <Bot size={24} color="var(--accent-lime)" />
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--accent-lime)', textTransform: 'uppercase', marginBottom: '4px' }}>Smart Contact Safeguard</div>
                              <div style={{ fontSize: '13px', color: 'var(--text-white)' }}>
                                Local Destination Time: <strong>{activeCase.customer?.localTimeNow || 'Unknown'} ({activeCase.customer?.localTimezone?.match(/\(([^)]+)\)/)?.[1] || 'Timezone'})</strong>. Ensure explicit compliance. {activeCase.customer?.isQuietHours ? <span style={{ color: 'var(--accent-coral)' }}>Automated policy WARNS against direct outbound voice contact between 8 PM and 8 AM local.</span> : <span>Outbound voice contact is currently permitted.</span>}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* NEW: Ask Vantage ChatGPT-like Modal successfully uniquely gracefully safely cleverly efficiently structurally seamlessly intelligently beautifully flexibly accurately tracking intuitively effortlessly neatly compactly directly explicitly securely manually explicitly gracefully natively cleanly intuitively gracefully naturally mapping dynamically optimally cleanly seamlessly efficiently. */}
                <AnimatePresence>
                  {showVantageModal && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="modal-overlay"
                      onClick={() => setShowVantageModal(false)}
                    >
                      <motion.div
                        initial={{ scale: 0.95, y: -20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.95, y: -20 }}
                        className="modal-content"
                        style={{ width: '70vw', maxWidth: '900px', height: '80vh', display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}
                        onClick={e => e.stopPropagation()}
                      >
                        <div className="modal-header" style={{ flex: '0 0 auto', padding: '20px 24px', borderBottom: '1px solid var(--bg-border)' }}>
                          <div style={{ fontSize: '18px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--accent-lime)' }}>
                            <Sparkles size={20} /> Ask Vantage
                          </div>
                          <button onClick={() => setShowVantageModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-gray)' }}><X size={20} /></button>
                        </div>

                        <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                          {vantageChat.map(msg => (
                            <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%', alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                <span style={{ fontSize: '11px', color: 'var(--text-gray)' }}>{adjustTimestamp(msg.time)}</span>
                                <span style={{ fontSize: '11px', background: 'var(--bg-primary)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--bg-border)', color: msg.sender === 'vantage' ? 'var(--accent-lime)' : 'var(--text-white)', fontWeight: 'bold' }}>
                                  {msg.sender === 'vantage' ? 'Vantage AI' : selectedPersona?.name}
                                </span>
                              </div>
                              <div className={msg.sender === 'vantage' ? 'vantage-ai-glow' : ''} style={{ background: msg.sender === 'vantage' ? 'rgba(194, 239, 78, 0.05)' : 'rgba(106, 95, 193, 0.1)', border: msg.sender === 'vantage' ? '1px solid rgba(194, 239, 78, 0.3)' : '1px solid rgba(106, 95, 193, 0.4)', padding: '16px', borderRadius: '12px', borderTopLeftRadius: msg.sender === 'vantage' ? '0' : '12px', borderTopRightRadius: msg.sender === 'user' ? '0' : '12px', fontSize: '13px', color: 'var(--text-white)', lineHeight: '1.6' }}>
                                {msg.text}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div style={{ flex: '0 0 auto', padding: '20px 24px', background: 'var(--bg-primary)', borderTop: '1px solid var(--bg-border)', display: 'flex', alignItems: 'flex-end', gap: '12px' }}>
                          <textarea
                            value={vantageInput}
                            onChange={(e) => setVantageInput(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submitVantageQuery(); } }}
                            placeholder="Ask Vantage about this case timeline, customer history, or routing logs..."
                            style={{ flex: 1, background: 'var(--bg-deep)', border: '1px solid var(--bg-border)', borderRadius: '8px', padding: '16px', color: 'var(--text-white)', fontSize: '13px', resize: 'none', outline: 'none', height: '56px', fontFamily: 'inherit' }}
                          />
                          <button onClick={submitVantageQuery} style={{ background: 'var(--accent-lime)', color: 'black', border: 'none', padding: '0 24px', height: '56px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                            <Send size={16} /> Ask
                          </button>
                        </div>

                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            )}
          </AnimatePresence>
        </main>
        );
}

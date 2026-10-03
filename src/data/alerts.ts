import { Alert } from '@/types';

export const alertsData: Alert[] = [
  {
    id: "ALT-892341",
    entityId: "CSE-001",
    entityName: "NorthGrid Power Corporation",
    timestamp: "2026-07-09T08:15:22Z",
    severity: "CRITICAL",
    category: "Malware",
    asset: "WIN-SRV-042",
    investigationStatus: "Closed",
    escalated: false,
    disposition: "False Positive",
    closureTime: "2026-07-09T08:18:10Z",
    supervisoryIndicator: "Unusually fast closure without escalation",
    closureDuration: 2.8 // minutes
  },
  {
    id: "ALT-892345",
    entityId: "CSE-003",
    entityName: "AeroTrans Logistics",
    timestamp: "2026-07-10T11:22:45Z",
    severity: "HIGH",
    category: "Unauthorized Access",
    asset: "VPN-GW-01",
    investigationStatus: "Open",
    escalated: false,
    disposition: "Pending",
    closureTime: "",
    supervisoryIndicator: "Investigation stalled",
    closureDuration: 0
  },
  {
    id: "ALT-892350",
    entityId: "CSE-006",
    entityName: "Metro Water Works",
    timestamp: "2026-07-11T03:45:12Z",
    severity: "CRITICAL",
    category: "Data Exfiltration",
    asset: "DB-MSTR-01",
    investigationStatus: "Closed",
    escalated: true,
    disposition: "True Positive",
    closureTime: "2026-07-11T15:30:00Z",
    closureDuration: 705
  },
  {
    id: "ALT-892355",
    entityId: "CSE-001",
    entityName: "NorthGrid Power Corporation",
    timestamp: "2026-07-09T09:12:00Z",
    severity: "HIGH",
    category: "Malware",
    asset: "WIN-SRV-042",
    investigationStatus: "Closed",
    escalated: false,
    disposition: "False Positive",
    closureTime: "2026-07-09T09:14:30Z",
    supervisoryIndicator: "Repetitive alert pattern",
    closureDuration: 2.5
  }
];
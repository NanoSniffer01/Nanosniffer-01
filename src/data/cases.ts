import { Case } from '@/types';

export const casesData: Case[] = [
  {
    id: "CAS-45091",
    entityId: "CSE-001",
    entityName: "NorthGrid Power Corporation",
    alertCount: 12,
    severity: "HIGH",
    investigationDuration: 11, // minutes
    escalated: false,
    closureDuration: 15,
    investigationCompleteness: "Low",
    patternIndicator: "Superficial Notes",
    reviewPriority: "HIGH"
  },
  {
    id: "CAS-45098",
    entityId: "CSE-003",
    entityName: "AeroTrans Logistics",
    alertCount: 3,
    severity: "CRITICAL",
    investigationDuration: 5,
    escalated: false,
    closureDuration: 8,
    investigationCompleteness: "Missing Evidence",
    patternIndicator: "No Escalation on Critical",
    reviewPriority: "IMMEDIATE"
  },
  {
    id: "CAS-45105",
    entityId: "CSE-005",
    entityName: "TeleComm Union",
    alertCount: 1,
    severity: "HIGH",
    investigationDuration: 180,
    escalated: true,
    closureDuration: 240,
    investigationCompleteness: "High",
    patternIndicator: "None",
    reviewPriority: "LOW"
  }
];
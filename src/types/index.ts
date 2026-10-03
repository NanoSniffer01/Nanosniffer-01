export type Severity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type FindingType = "EXECUTION_GAP" | "NEGATIVE_SPACE" | "ANOMALY" | "PEER_DEVIATION" | "OPERATIONAL_WEAKNESS";
export type FindingStatus = "NEW" | "UNDER_REVIEW" | "VALIDATED" | "DISMISSED" | "CLOSED";
export type RiskLevel = "LOW" | "MODERATE" | "HIGH" | "CRITICAL";
export type ReviewPriority = "IMMEDIATE" | "HIGH" | "STANDARD" | "LOW";

export interface CSEEntity {
  id: string;
  name: string;
  sector: string;
  assessmentPeriod: string;
  alertCount: number;
  caseCount: number;
  criticalAlertCount: number;
  escalationRate: number;
  investigationRate: number;
  riskScore: number;
  riskLevel: RiskLevel;
  findingCount: number;
  reviewPriority: string;
  lastAssessment: string;
}

export interface Finding {
  id: string;
  entityId: string;
  entityName: string;
  title: string;
  type: FindingType;
  category: string;
  severity: Severity;
  confidence: number;
  detectedDate: string;
  status: FindingStatus;
  action: string;
  evidenceCount: number;
  reviewPriority: ReviewPriority;
  rationale?: string;
  recommendation?: string;
}

export interface Alert {
  id: string;
  entityId: string;
  entityName: string;
  timestamp: string;
  severity: Severity;
  category: string;
  asset: string;
  investigationStatus: string;
  escalated: boolean;
  disposition: string;
  closureTime: string;
  supervisoryIndicator?: string;
  closureDuration?: number;
}

export interface Case {
  id: string;
  entityId: string;
  entityName: string;
  alertCount: number;
  severity: Severity;
  investigationDuration: number;
  escalated: boolean;
  closureDuration: number;
  investigationCompleteness: string;
  patternIndicator: string;
  reviewPriority: ReviewPriority;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  entity: string;
  findingId?: string;
  datasetVersion?: string;
  previousStatus?: string;
  newStatus?: string;
}

export interface AnalyticalSignal {
  signalType: string;
  confidence: number;
  rationale: string;
  evidenceIds: string[];
  detectionMethod: "RULE" | "STATISTICAL" | "ML";
  modelVersion?: string;
  datasetVersion: string;
}
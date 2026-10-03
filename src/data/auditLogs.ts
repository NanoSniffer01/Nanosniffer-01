import { AuditLog } from '@/types';

export const auditLogsData: AuditLog[] = [
  {
    id: "AL-1001",
    timestamp: "2026-07-15T09:00:00Z",
    user: "Supervisor_A",
    action: "Finding Validated",
    entity: "NorthGrid Power Corporation",
    findingId: "FND-2026-0042",
    previousStatus: "UNDER_REVIEW",
    newStatus: "VALIDATED"
  },
  {
    id: "AL-1002",
    timestamp: "2026-07-15T09:15:00Z",
    user: "Analyst_B",
    action: "Report Generated",
    entity: "All",
    datasetVersion: "v1.4.2"
  },
  {
    id: "AL-1003",
    timestamp: "2026-07-14T14:30:00Z",
    user: "System",
    action: "Dataset Uploaded",
    entity: "Metro Water Works",
    datasetVersion: "v1.4.2"
  }
];
export interface NotificationPayload {
  staffName: string;
  staffNameEn?: string;
  visitorName?: string;
  companyName?: string;
  tenantName: string;
  timestamp: Date;
}

export interface NotificationProvider {
  type: string;
  send(config: Record<string, unknown>, payload: NotificationPayload): Promise<{ success: boolean; error?: string }>;
}

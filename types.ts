
export enum ComplaintType {
  SERVICE = 'Service',
  ELECTRICITY = 'Electricity',
  WATER = 'Water',
  CLEANLINESS = 'Cleanliness',
  SECURITY = 'Security',
  OTHER = 'Other',
}

export enum UrgencyLevel {
  EMERGENCY = 'Emergency',
  URGENT = 'Urgent',
  NORMAL = 'Normal',
}

export enum ComplaintStatus {
  NEW = 'New',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
}

export interface Complaint {
  id: string;
  trackingId: string;
  type: ComplaintType;
  urgency: UrgencyLevel;
  location: string;
  description: string;
  notes?: string;
  contactNumber: string;
  attachmentUrl?: string;
  status: ComplaintStatus;
  createdAt: string;
  updatedAt: string;
  statusHistory: StatusUpdate[];
  adminNotes?: string;
}

export interface StatusUpdate {
  status: ComplaintStatus;
  timestamp: string;
  notes?: string;
}

export interface ComplaintSubmission {
  type: ComplaintType;
  urgency: UrgencyLevel;
  location: string;
  description: string;
  notes?: string;
  contactNumber: string;
  attachment?: File;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  createdAt: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

export interface Statistics {
  totalComplaints: number;
  completed: number;
  pending: number;
  byCategory: { name: ComplaintType; value: number }[];
  monthlyTrend: { name: string; complaints: number }[];
}

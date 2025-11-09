
import { 
  Complaint, 
  ComplaintStatus, 
  ComplaintSubmission, 
  ComplaintType, 
  UrgencyLevel, 
  Statistics, 
  Announcement, 
  Achievement 
} from '../types';

// Mock database
const mockComplaints: Complaint[] = [
  {
    id: '1',
    trackingId: 'ALE-5-ABCDE',
    type: ComplaintType.WATER,
    urgency: UrgencyLevel.URGENT,
    location: 'Main Street, near the bakery',
    description: 'No water supply since this morning.',
    contactNumber: '1234567890',
    status: ComplaintStatus.IN_PROGRESS,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    statusHistory: [
      { status: ComplaintStatus.NEW, timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
      { status: ComplaintStatus.IN_PROGRESS, timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), notes: 'Assigned to maintenance team.' }
    ],
    adminNotes: "Team is investigating the main pipeline."
  },
  {
    id: '2',
    trackingId: 'ALE-5-FGHIJ',
    type: ComplaintType.CLEANLINESS,
    urgency: UrgencyLevel.NORMAL,
    location: 'Block 5, Park Area',
    description: 'Trash cans are overflowing.',
    contactNumber: '0987654321',
    status: ComplaintStatus.COMPLETED,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    statusHistory: [
        { status: ComplaintStatus.NEW, timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
        { status: ComplaintStatus.IN_PROGRESS, timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() },
        { status: ComplaintStatus.COMPLETED, timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), notes: 'Area has been cleaned.' }
    ],
    adminNotes: "Resolved."
  },
];

const mockAnnouncements: Announcement[] = [
  { id: '1', title: 'Power Outage Notification', body: 'There will be a planned power outage tomorrow from 9 AM to 2 PM for maintenance work.', createdAt: new Date().toISOString() },
  { id: '2', title: 'Water Pipe Repair', body: 'Water supply might be limited in the northern area of Block 5 on Wednesday due to pipe repairs.', createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
];

const mockAchievements: Achievement[] = [
  { id: '1', title: 'New Park Benches Installed', description: 'We have installed 10 new benches in the community park for everyone to enjoy.', imageUrl: 'https://picsum.photos/seed/parkbench/400/300', createdAt: new Date().toISOString() },
  { id: '2', title: 'Streetlight Upgrade Project Completed', description: 'All streetlights in Block 5 have been upgraded to energy-efficient LEDs, improving safety and visibility.', imageUrl: 'https://picsum.photos/seed/streetlight/400/300', createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() },
];


const generateTrackingId = () => {
  return `ALE-5-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
}

const simulateDelay = <T,>(data: T, delay = 500): Promise<T> => 
  new Promise(resolve => setTimeout(() => resolve(data), delay));

export const apiService = {
  submitComplaint: (submission: ComplaintSubmission): Promise<{ trackingId: string }> => {
    const trackingId = generateTrackingId();
    const newComplaint: Complaint = {
      id: String(mockComplaints.length + 1),
      trackingId,
      ...submission,
      status: ComplaintStatus.NEW,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      statusHistory: [{ status: ComplaintStatus.NEW, timestamp: new Date().toISOString() }],
    };
    mockComplaints.push(newComplaint);
    return simulateDelay({ trackingId });
  },

  getComplaintByTrackingId: (trackingId: string): Promise<Complaint | null> => {
    const complaint = mockComplaints.find(c => c.trackingId.toUpperCase() === trackingId.toUpperCase());
    return simulateDelay(complaint || null);
  },

  getStatistics: (): Promise<Statistics> => {
    const completed = mockComplaints.filter(c => c.status === ComplaintStatus.COMPLETED).length;
    const pending = mockComplaints.length - completed;
    const stats: Statistics = {
      totalComplaints: mockComplaints.length,
      completed,
      pending,
      byCategory: Object.values(ComplaintType).map(type => ({
        name: type,
        value: mockComplaints.filter(c => c.type === type).length,
      })),
      monthlyTrend: [
        { name: 'Jan', complaints: 12 },
        { name: 'Feb', complaints: 19 },
        { name: 'Mar', complaints: 15 },
        { name: 'Apr', complaints: 22 },
        { name: 'May', complaints: 18 },
      ],
    };
    return simulateDelay(stats);
  },

  getAnnouncements: (): Promise<Announcement[]> => {
    return simulateDelay([...mockAnnouncements].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
  },

  getAchievements: (): Promise<Achievement[]> => {
    return simulateDelay([...mockAchievements].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
  },
};

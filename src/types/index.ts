export interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  year: number;
  profileImage: string;
  isWriter: boolean;
}

export interface Writer extends User {
  isWriter: true;
  pricePerPage: number;
  availability: 'available' | 'busy' | 'unavailable';
  rating: number;
  completedJobs: number;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

export interface Chat {
  id: string;
  participants: [string, string];
  lastMessage?: Message;
  updatedAt: Date;
}

export interface Report {
  id: string;
  reporterId: string;
  reportedId: string;
  reason: string;
  chatId?: string;
  timestamp: Date;
  status: 'pending' | 'reviewed' | 'resolved';
}
import { User, Writer, Message, Chat } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: '',
    email: 'alex.johnson@college.edu',
    department: 'Computer Science',
    year: 3,
    profileImage: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
    isWriter: false
  },
  {
    id: '2',
    name: 'Sam Taylor',
    email: 'sam.taylor@college.edu',
    department: 'English Literature',
    year: 4,
    profileImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    isWriter: false
  }
];

export const mockWriters: Writer[] = [
  {
    id: '3',
    name: 'Kanatthal',
    email: 'kanatthal@college.edu',
    department: 'EEE',
    year: 4,
    profileImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    isWriter: true,
    pricePerPage: 10,
    availability: 'available',
    rating: 4.8,
    completedJobs: 24
  },
  {
    id: '4',
    name: 'Sorna Shanthi',
    email: 'sornasuiii@college.edu',
    department: 'AIML',
    year: 3,
    profileImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    isWriter: true,
    pricePerPage: 8,
    availability: 'busy',
    rating: 4.5,
    completedJobs: 18
  },
  {
    id: '5',
    name: 'Thevar Magan',
    email: 'potriparadiponneh@college.edu',
    department: 'Mathematics',
    year: 4,
    profileImage: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
    isWriter: true,
    pricePerPage: 11,
    availability: 'available',
    rating: 4.9,
    completedJobs: 32
  },
  {
    id: '6',
    name: 'Rama Reddy',
    email: 'nenureddyra@college.edu',
    department: 'Philosophy',
    year: 3,
    profileImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    isWriter: true,
    pricePerPage: 12,
    availability: 'unavailable',
    rating: 4.7,
    completedJobs: 27
  },
  {
    id: '7',
    name: 'Ganapathi Iyer',
    email: 'ganapathi.homam@college.edu',
    department: 'Astrology',
    year: 2,
    profileImage: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
    isWriter: true,
    pricePerPage: 7,
    availability: 'available',
    rating: 4.2,
    completedJobs: 8
  }
];

export const mockChats: Chat[] = [
  {
    id: 'chat1',
    participants: ['1', '3'],
    updatedAt: new Date('2025-04-14T12:30:00Z')
  },
  {
    id: 'chat2',
    participants: ['1', '4'],
    updatedAt: new Date('2025-04-15T10:15:00Z')
  },
  {
    id: 'chat3',
    participants: ['2', '5'],
    updatedAt: new Date('2025-04-13T18:45:00Z')
  }
];

export const mockMessages: Record<string, Message[]> = {
  'chat1': [
    {
      id: 'm1',
      senderId: '1',
      receiverId: '3',
      content: 'Hello, I need help with my psychology paper. Are you available?',
      timestamp: new Date('2025-04-14T12:30:00Z'),
      isRead: true
    },
    {
      id: 'm2',
      senderId: '3',
      receiverId: '1',
      content: "Hi there! Yes, I can help with psychology papers. What's the topic and when is it due?",
      timestamp: new Date('2025-04-14T12:32:00Z'),
      isRead: true
    },
    {
      id: 'm3',
      senderId: '1',
      receiverId: '3',
      content: "It's about cognitive behavioral therapy. Due next Friday, about 6 pages.",
      timestamp: new Date('2025-04-14T12:33:00Z'),
      isRead: true
    },
    {
      id: 'm4',
      senderId: '3',
      receiverId: '1',
      content: 'That\'s within my expertise. For 6 pages at my rate of ₹10/page, it would be ₹60 total. Does that work for you?',
      timestamp: new Date('2025-04-14T12:35:00Z'),
      isRead: true
    },
    {
      id: 'm5',
      senderId: '1',
      receiverId: '3',
      content: 'That sounds good. How do we proceed?',
      timestamp: new Date('2025-04-14T12:36:00Z'),
      isRead: false
    }
  ],
  'chat2': [
    {
      id: 'm6',
      senderId: '1',
      receiverId: '4',
      content: 'Hi, do you write history papers?',
      timestamp: new Date('2025-04-15T10:15:00Z'),
      isRead: true
    },
    {
      id: 'm7',
      senderId: '4',
      receiverId: '1',
      content: 'Yes, history is my specialty. What period are you studying?',
      timestamp: new Date('2025-04-15T10:17:00Z'),
      isRead: false
    }
  ],
  'chat3': [
    {
      id: 'm8',
      senderId: '2',
      receiverId: '5',
      content: 'I need help with a sociology assignment about social media influence.',
      timestamp: new Date('2025-04-13T18:45:00Z'),
      isRead: true
    },
    {
      id: 'm9',
      senderId: '5',
      receiverId: '2',
      content: 'I can definitely help with that! When do you need it by?',
      timestamp: new Date('2025-04-13T18:48:00Z'),
      isRead: true
    },
    {
      id: 'm10',
      senderId: '2',
      receiverId: '5',
      content: "It's due next Monday. It needs to be about 8 pages with at least 5 sources.",
      timestamp: new Date('2025-04-13T18:50:00Z'),
      isRead: true
    },
    {
      id: 'm11',
      senderId: '5',
      receiverId: '2',
      content: 'I can do that. My rate is ₹11 per page, so that would be ₹88 total. Does that work for you?',
      timestamp: new Date('2025-04-13T18:52:00Z'),
      isRead: true
    },
    {
      id: 'm12',
      senderId: '2',
      receiverId: '5',
      content: 'Yes, that works. Can you provide an outline first?',
      timestamp: new Date('2025-04-13T18:55:00Z'),
      isRead: true
    },
    {
      id: 'm13',
      senderId: '5',
      receiverId: '2',
      content: "I'll have an outline ready for you by tomorrow evening. Then we can make any adjustments before I write the full paper.",
      timestamp: new Date('2025-04-13T18:57:00Z'),
      isRead: true
    }
  ]
};

export const currentUser = mockUsers[0];
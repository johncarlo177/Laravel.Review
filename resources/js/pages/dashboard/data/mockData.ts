export const MOCK_DASHBOARD_STATS = {
  feedbackToday: 2,
  feedbackLimit: 12,
  recoveredCustomers: 3,
  oneStarPrevented: 1,
  googleFunnelHappy: 12,
  googleFunnelPosted: 7,
  aiTasksCompleted: 28,
};

export const MOCK_FEEDBACK = [
  { id: 1, name: 'Alice Johnson', rating: 1, sentiment: 'Negative', date: '2024-10-25', summary: 'Slow service, waited 20 minutes for coffee.', status: 'Pending', flagged: true, channel: 'Google' },
  { id: 2, name: 'Bob Smith', rating: 5, sentiment: 'Positive', date: '2024-10-25', summary: 'Great food and fast service! Definitely coming back.', status: 'Resolved', flagged: false, channel: 'Yelp' },
  { id: 3, name: 'Charlie Doe', rating: 3, sentiment: 'Neutral', date: '2024-10-24', summary: 'The atmosphere was nice, but the seating felt cramped.', status: 'Needs follow-up', flagged: false, channel: 'Facebook' },
  { id: 4, name: 'Dana Evans', rating: 1, sentiment: 'Negative', date: '2024-10-24', summary: 'The manager was rude and refused to honor the coupon.', status: 'Escalated', flagged: true, channel: 'Google' },
];

export const MOCK_RECOVERY_STATS = {
  totalNegative: 45,
  recoveryRate: 68.5,
  avgResponseTime: 1.2,
  resolvedCount: 31,
};

export const MOCK_RECOVERY_CUSTOMER_DATA = {
  name: 'Jane Doe',
  phone: '(555) 123-4567',
  email: 'jane.doe@example.com',
  visits: 8,
  pastComplaints: 2
};

export const MOCK_RECOVERY_TICKETS = [
  {
    id: 'tkt001',
    customer: 'Jane Doe',
    rating: 1,
    excerpt: 'The delivery was 45 minutes late and the food was cold.',
    channel: 'SMS',
    time: '1 hour ago',
    status: 'New',
    hasDraft: true,
    aiDraft: "Dear Jane, we sincerely apologize for the unacceptable delay and cold food. We understand your frustration. To make this right, we've issued a full refund and added a $10 credit to your account for your next order.",
    timeline: [
      { type: 'customer', content: "The delivery was 45 minutes late and the food was cold. I want a refund.", sender: 'Jane Doe', time: '10:00 AM' },
      { type: 'ai_draft', content: "Draft: We sincerely apologize...", sender: 'AI', time: '10:05 AM' }
    ],
    csat: null,
    internalNotes: ''
  },
  {
    id: 'tkt002',
    customer: 'Marcus V.',
    rating: 2,
    excerpt: 'Waitress was unfriendly and seemed rushed when taking our order.',
    channel: 'Email',
    time: 'Yesterday',
    status: 'Responding',
    hasDraft: true,
    aiDraft: "Hello Marcus, thank you for bringing this to our attention. We are addressing this with our team immediately. We would like to professionally handle this by arranging a personal call from our Shift Manager.",
    timeline: [
      { type: 'customer', content: "We had a bad experience with the service.", sender: 'Marcus V.', time: 'Oct 24, 2025' },
      { type: 'sent', content: "Initial automated acknowledgement sent. Draft below.", sender: 'You/AI', time: 'Oct 24, 2025', channel: 'Email' }
    ],
    csat: 'Satisfied',
    internalNotes: ''
  },
  {
    id: 'tkt003',
    customer: 'Anonymous',
    rating: 3,
    excerpt: 'The noise level was too high, making conversation difficult.',
    channel: 'App',
    time: 'Oct 20, 2025',
    status: 'Resolved',
    hasDraft: false,
    aiDraft: null,
    timeline: [
      { type: 'customer', content: "Noise level was too high.", sender: 'Anonymous', time: 'Oct 20, 2025' },
      { type: 'sent', content: "We noted your feedback and are looking at acoustic paneling. Thank you.", sender: 'You/AI', time: 'Oct 21, 2025', channel: 'App' }
    ],
    csat: 'Not Satisfied',
    internalNotes: ''
  }
];

export const MOCK_WINBACK_ANALYTICS = {
  attempted: 22,
  converted: 7,
  revenueSaved: 1140,
};


export type UserRole = 'customer' | 'partner' | 'admin';

export type PartnerApprovalStatus = 'pending' | 'approved' | 'rejected' | 'suspended';

export type EnquiryStatus = 'open' | 'in_progress' | 'resolved' | 'closed';

export type BookingStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'accepted' 
  | 'in_progress' 
  | 'completed' 
  | 'cancelled' 
  | 'rejected';

export type DayServiceStatus = 'upcoming' | 'in_progress' | 'completed' | 'cancelled';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar: string;
  address?: string;
  city?: string;
  pincode?: string;
  status?: 'active' | 'blocked';
  joinedDate?: string;
}

export interface HouseHelp {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  experienceYears: number;
  services: string[]; // subservice IDs or category names
  preferredAreas: string[];
  rating: number;
  completedJobs: number;
  pricePerDay: number;
  isAvailable: boolean;
  approvalStatus: PartnerApprovalStatus;
  bio: string;
  workingHours: string;
  city: string;
  pincode: string;
  joinedDate: string;
  idProofType?: string;
  idProofNumber?: string;
}

export interface SubService {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  startingPrice: number;
  estimatedDuration: string;
  basePrice?: number;
  durationHours?: number;
  isPopular?: boolean;
  isActive: boolean;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  services: SubService[];
}

export interface BookingDay {
  dayNumber: number;
  date: string;
  status: DayServiceStatus;
  startedAt?: string;
  completedAt?: string;
  dailyEarning: number;
}

export interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  city: string;
  helperId: string;
  helperName: string;
  helperAvatar: string;
  helperPhone: string;
  categoryName: string;
  subServiceIds: string[];
  subServiceNames: string[];
  durationDays: 1 | 2 | 3;
  dates: string[];
  timeSlot: string; // e.g. "Morning (08:00 AM - 11:00 AM)"
  dailyRate: number;
  serviceTotal: number;
  platformFee: number;
  totalAmount: number;
  status: BookingStatus;
  paymentStatus: 'paid' | 'refunded' | 'pending';
  paymentMethod: string;
  createdAt: string;
  workingDays: BookingDay[];
  notes?: string;
  hasCustomerReviewed?: boolean;
}

export interface Review {
  id: string;
  bookingId: string;
  customerId: string;
  customerName: string;
  customerAvatar: string;
  helperId: string;
  helperName: string;
  rating: number;
  tags: string[];
  comment: string;
  createdAt: string;
  isReported?: boolean;
  reported?: boolean;
}

export interface WalletTransaction {
  id: string;
  helperId: string;
  bookingId?: string;
  type: 'credit' | 'debit';
  amount: number;
  title: string;
  description: string;
  date: string;
  status: 'completed' | 'processing' | 'rejected';
}

export interface WithdrawalRequest {
  id: string;
  helperId: string;
  helperName: string;
  amount: number;
  bankDetails: {
    accountHolder: string;
    accountNumber: string;
    ifsc: string;
    ifscCode?: string;
    bankName: string;
  };
  status: 'requested' | 'processing' | 'completed' | 'rejected';
  requestedDate: string;
  processedDate?: string;
  notes?: string;
}

export interface SupportEnquiry {
  id: string;
  ticketNumber: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  userEmail: string;
  subject: string;
  category: string;
  bookingId?: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  assignedTo?: string;
  messages: {
    id: string;
    sender: string;
    isStaff: boolean;
    text: string;
    timestamp: string;
  }[];
}

export interface NotificationItem {
  id: string;
  recipientRole: UserRole | 'all';
  recipientId?: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'booking' | 'payment' | 'partner' | 'support' | 'system';
  linkPath?: string;
}

export interface AuditLog {
  id: string;
  adminName: string;
  action: string;
  module: string;
  description: string;
  timestamp: string;
}

export interface Address {
  id: string;
  userId: string;
  type: 'Home' | 'Work' | 'Other';
  flatNo: string;
  area: string;
  city: string;
  pincode: string;
  landmark?: string;
  isDefault?: boolean;
}

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  HouseHelp,
  ServiceCategory,
  SubService,
  Booking,
  Review,
  WalletTransaction,
  WithdrawalRequest,
  SupportEnquiry,
  NotificationItem,
  AuditLog,
  Address,
  PartnerApprovalStatus,
} from '../types';
import {
  INITIAL_CATEGORIES,
  INITIAL_HOUSE_HELPS,
  DEMO_USERS,
  INITIAL_SAVED_ADDRESSES,
  INITIAL_BOOKINGS,
  INITIAL_REVIEWS,
  INITIAL_WALLET_TRANSACTIONS,
  INITIAL_WITHDRAWALS,
  INITIAL_ENQUIRIES,
  INITIAL_NOTIFICATIONS,
  INITIAL_AUDIT_LOGS,
} from '../data/mockData';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title?: string;
  message: string;
}

interface AppContextType {
  currentUser: User | null;
  currentPath: string;
  navigate: (path: string) => void;
  categories: ServiceCategory[];
  houseHelps: HouseHelp[];
  bookings: Booking[];
  reviews: Review[];
  walletTransactions: WalletTransaction[];
  withdrawals: WithdrawalRequest[];
  enquiries: SupportEnquiry[];
  notifications: NotificationItem[];
  customers: User[];
  toggleCustomerStatus: (customerId: string) => void;
  auditLogs: AuditLog[];
  addresses: Address[];
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error', title?: string) => void;
  dismissToast: (id: string) => void;

  // Auth actions
  loginAs: (role: 'customer' | 'partner' | 'admin', partnerType?: 'approved' | 'pending') => void;
  loginWithCredentials: (email: string, password?: string, rolePreference?: UserRole) => boolean;
  registerCustomer: (customerData: Partial<User> & { password?: string }) => void;
  registerPartner: (partnerData: Partial<HouseHelp> & { password?: string }) => void;
  logout: () => void;

  // Bookings actions
  createBooking: (bookingInput: {
    categoryName: string;
    subServiceIds: string[];
    subServiceNames: string[];
    durationDays: 1 | 2 | 3;
    dates: string[];
    timeSlot: string;
    helperId: string;
    customerAddress: string;
    city: string;
    notes?: string;
  }) => Booking;
  updateBookingStatus: (bookingId: string, status: Booking['status']) => void;
  startServiceDay: (bookingId: string, dayNumber: number) => void;
  completeServiceDay: (bookingId: string, dayNumber: number) => void;
  cancelBooking: (bookingId: string) => void;

  // Reviews
  addReview: (reviewInput: {
    bookingId: string;
    helperId: string;
    helperName: string;
    rating: number;
    tags: string[];
    comment: string;
  }) => void;
  reportReview: (reviewId: string) => void;

  // Partner actions
  togglePartnerAvailability: (partnerId: string) => void;
  updatePartnerProfile: (partnerId: string, updates: Partial<HouseHelp>) => void;
  approvePartner: (partnerId: string) => void;
  rejectPartner: (partnerId: string) => void;
  suspendPartner: (partnerId: string) => void;
  reactivatePartner: (partnerId: string) => void;

  // Wallet & Withdrawals
  requestWithdrawal: (helperId: string, amount: number, bankDetails: WithdrawalRequest['bankDetails']) => void;
  processWithdrawal: (withdrawalId: string, action: 'approve' | 'reject' | 'process') => void;
  approveWithdrawal: (withdrawalId: string) => void;
  rejectWithdrawal: (withdrawalId: string) => void;

  // Enquiries
  createEnquiry: (enquiryInput: {
    subject: string;
    category: string;
    bookingId?: string;
    description: string;
  }) => void;
  addEnquiryMessage: (enquiryId: string, text: string) => void;
  updateEnquiryStatus: (enquiryId: string, status: SupportEnquiry['status']) => void;

  // Service Management
  addService: (categoryId: string, serviceData: Omit<SubService, 'id' | 'categoryId'>) => void;
  addSubService: (categoryId: string, serviceData: { name: string; description: string; basePrice: number; durationHours: number }) => void;
  updateService: (categoryId: string, serviceId: string, updates: Partial<SubService>) => void;
  toggleServiceStatus: (categoryId: string, serviceId: string) => void;

  // Notifications
  markNotificationRead: (notifId: string) => void;
  markAllNotificationsRead: (role?: UserRole) => void;

  // Addresses
  addAddress: (address: Omit<Address, 'id' | 'userId'>) => void;
  setDefaultAddress: (addressId: string) => void;
  deleteAddress: (addressId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Current user defaults to Customer Priya Sharma for immediate interactive rich exploration, or guest if needed
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('homeease_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return DEMO_USERS.customer;
  });

  // Simple clean client routing
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      return window.location.hash.replace('#', '') || '/customer/dashboard';
    }
    return '/customer/dashboard';
  });

  const [categories, setCategories] = useState<ServiceCategory[]>(INITIAL_CATEGORIES);
  const [houseHelps, setHouseHelps] = useState<HouseHelp[]>(INITIAL_HOUSE_HELPS);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [walletTransactions, setWalletTransactions] = useState<WalletTransaction[]>(INITIAL_WALLET_TRANSACTIONS);
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>(INITIAL_WITHDRAWALS);
  const [enquiries, setEnquiries] = useState<SupportEnquiry[]>(INITIAL_ENQUIRIES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_SAVED_ADDRESSES);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [customers, setCustomers] = useState<User[]>([
    DEMO_USERS.customer,
    {
      id: 'usr-cust-002',
      name: 'Vikram Malhotra',
      email: 'vikram.m@example.com',
      phone: '+91 98201 99881',
      role: 'customer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80',
      address: 'B-702, Prestige Palms, Marathahalli',
      city: 'Bengaluru',
      pincode: '560037',
      status: 'active',
      joinedDate: '2026-08-10',
    },
    {
      id: 'usr-cust-003',
      name: 'Ananya Deshmukh',
      email: 'ananya.d@example.com',
      phone: '+91 97110 33421',
      role: 'customer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
      address: 'Villa 18, Palm Meadows, Whitefield',
      city: 'Bengaluru',
      pincode: '560066',
      status: 'active',
      joinedDate: '2026-07-22',
    },
    {
      id: 'usr-cust-004',
      name: 'Karthik Raman',
      email: 'karthik.r@example.com',
      phone: '+91 99800 77123',
      role: 'customer',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80',
      address: 'Apt 204, Salarpuria Symphony, Koramangala',
      city: 'Bengaluru',
      pincode: '560034',
      status: 'active',
      joinedDate: '2026-09-01',
    },
  ]);

  const toggleCustomerStatus = (customerId: string) => {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === customerId
          ? { ...c, status: c.status === 'active' ? 'blocked' : 'active' }
          : c
      )
    );
    showToast('Customer account status updated.', 'info');
  };

  // Sync route hash
  const navigate = (path: string) => {
    setCurrentPath(path);
    if (typeof window !== 'undefined') {
      window.location.hash = path;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && hash !== currentPath) {
        setCurrentPath(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentPath]);

  // Save current user to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('homeease_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('homeease_user');
    }
  }, [currentUser]);

  // Toast helper
  const showToast = (message: string, type: ToastMessage['type'] = 'info', title?: string) => {
    const id = 'toast-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4);
    setToasts((prev) => [...prev, { id, message, type, title }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Auth
  const loginAs = (role: 'customer' | 'partner' | 'admin', partnerType: 'approved' | 'pending' = 'approved') => {
    if (role === 'customer') {
      setCurrentUser(DEMO_USERS.customer);
      navigate('/customer/dashboard');
      showToast('Logged in as Priya Sharma (Customer)', 'success', 'Welcome Back');
    } else if (role === 'partner') {
      const partnerUser = partnerType === 'pending' ? DEMO_USERS.partnerPending : DEMO_USERS.partnerApproved;
      setCurrentUser(partnerUser);
      navigate('/partner/dashboard');
      showToast(`Logged in as ${partnerUser.name} (${partnerType === 'pending' ? 'Pending Approval' : 'Approved Partner'})`, 'info');
    } else {
      setCurrentUser(DEMO_USERS.admin);
      navigate('/admin/dashboard');
      showToast('Logged in as Super Admin', 'success', 'Admin Portal Active');
    }
  };

  const loginWithCredentials = (email: string, _password?: string, rolePreference?: UserRole): boolean => {
    const lowerEmail = email.toLowerCase().trim();
    if (lowerEmail === 'admin@example.com' || rolePreference === 'admin') {
      setCurrentUser(DEMO_USERS.admin);
      navigate('/admin/dashboard');
      showToast('Logged in successfully as Administrator', 'success');
      return true;
    }
    if (lowerEmail === 'helper@example.com' || lowerEmail === 'sunita@example.com') {
      setCurrentUser(DEMO_USERS.partnerApproved);
      navigate('/partner/dashboard');
      showToast('Welcome back, Sunita Devi!', 'success');
      return true;
    }
    if (lowerEmail === 'rajesh@example.com') {
      setCurrentUser(DEMO_USERS.partnerPending);
      navigate('/partner/dashboard');
      showToast('Welcome Rajesh Kumar (Application Pending)', 'info');
      return true;
    }
    if (lowerEmail === 'customer@example.com' || rolePreference === 'customer' || !rolePreference) {
      setCurrentUser(DEMO_USERS.customer);
      navigate('/customer/dashboard');
      showToast('Welcome back, Priya Sharma!', 'success');
      return true;
    }

    // Default simulation fallback
    const customUser: User = {
      id: 'usr-custom-' + Date.now(),
      name: email.split('@')[0].toUpperCase(),
      email: lowerEmail,
      phone: '+91 98000 11223',
      role: rolePreference || 'customer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
    };
    setCurrentUser(customUser);
    if (customUser.role === 'customer') navigate('/customer/dashboard');
    else if (customUser.role === 'partner') navigate('/partner/dashboard');
    else navigate('/admin/dashboard');
    showToast(`Logged in as ${customUser.name}`, 'success');
    return true;
  };

  const registerCustomer = (data: Partial<User>) => {
    const newUser: User = {
      id: 'cust-' + Date.now(),
      name: data.name || 'New Customer',
      email: data.email || 'customer.new@example.com',
      phone: data.phone || '+91 99999 88888',
      role: 'customer',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&h=256&q=80',
      address: data.address || 'Flat 101, Indiranagar',
      city: data.city || 'Bengaluru',
      pincode: data.pincode || '560038',
    };
    setCurrentUser(newUser);
    // Add default address
    if (data.address) {
      setAddresses((prev) => [
        ...prev,
        {
          id: 'addr-' + Date.now(),
          userId: newUser.id,
          type: 'Home',
          flatNo: data.address || '',
          area: data.city || 'Bengaluru',
          city: data.city || 'Bengaluru',
          pincode: data.pincode || '560038',
          isDefault: true,
        },
      ]);
    }
    navigate('/customer/dashboard');
    showToast('Your customer account was created successfully!', 'success', 'Welcome to HomeEase');
  };

  const registerPartner = (data: Partial<HouseHelp>) => {
    const newPartner: HouseHelp = {
      id: 'hp-' + Date.now(),
      name: data.name || 'New Service Partner',
      email: data.email || 'partner.new@example.com',
      phone: data.phone || '+91 98888 77777',
      avatar: data.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&h=256&q=80',
      experienceYears: data.experienceYears || 2,
      services: data.services && data.services.length > 0 ? data.services : ['House Cleaning'],
      preferredAreas: data.preferredAreas && data.preferredAreas.length > 0 ? data.preferredAreas : ['Bengaluru Urban'],
      rating: 0,
      completedJobs: 0,
      pricePerDay: data.pricePerDay || 550,
      isAvailable: false,
      approvalStatus: 'pending',
      bio: data.bio || 'Motivated professional household helper ready for verified service opportunities.',
      workingHours: '08:00 AM - 05:00 PM',
      city: data.city || 'Bengaluru',
      pincode: data.pincode || '560001',
      joinedDate: new Date().toISOString().split('T')[0],
      idProofType: 'Aadhaar Card',
      idProofNumber: 'XXXX-XXXX-9901',
    };

    setHouseHelps((prev) => [newPartner, ...prev]);

    // Create partner user session
    const partnerUser: User = {
      id: newPartner.id,
      name: newPartner.name,
      email: newPartner.email,
      phone: newPartner.phone,
      role: 'partner',
      avatar: newPartner.avatar,
      city: newPartner.city,
      pincode: newPartner.pincode,
    };
    setCurrentUser(partnerUser);

    // Notify admin
    setNotifications((prev) => [
      {
        id: 'notif-' + Date.now(),
        recipientRole: 'admin',
        title: 'New Service Partner Application',
        message: `${newPartner.name} registered for ${newPartner.services.join(', ')}. Awaiting verification.`,
        time: 'Just now',
        isRead: false,
        type: 'partner',
        linkPath: '/admin/partners',
      },
      ...prev,
    ]);

    // Add audit log
    setAuditLogs((prev) => [
      {
        id: 'log-' + Date.now(),
        adminName: 'System',
        action: 'Partner Registered',
        module: 'Onboarding',
        description: `Partner application submitted by ${newPartner.name} (Pending Approval)`,
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      },
      ...prev,
    ]);

    navigate('/partner/dashboard');
    showToast(
      'Your application has been submitted and is waiting for admin approval.',
      'info',
      'Application Submitted'
    );
  };

  const logout = () => {
    setCurrentUser(null);
    navigate('/login');
    showToast('You have been logged out securely.', 'info');
  };

  // Booking Creation
  const createBooking = ({
    categoryName,
    subServiceIds,
    subServiceNames,
    durationDays,
    dates,
    timeSlot,
    helperId,
    customerAddress,
    city,
    notes,
  }: {
    categoryName: string;
    subServiceIds: string[];
    subServiceNames: string[];
    durationDays: 1 | 2 | 3;
    dates: string[];
    timeSlot: string;
    helperId: string;
    customerAddress: string;
    city: string;
    notes?: string;
  }): Booking => {
    const helper = houseHelps.find((h) => h.id === helperId) || houseHelps[0];
    const customer = currentUser || DEMO_USERS.customer;
    const dailyRate = helper.pricePerDay;
    const serviceTotal = dailyRate * durationDays;
    const platformFee = 49;
    const totalAmount = serviceTotal + platformFee;
    const bookingId = 'BK' + (Math.floor(10000 + Math.random() * 90000));

    const workingDays = dates.map((dateStr, idx) => ({
      dayNumber: idx + 1,
      date: dateStr,
      status: 'upcoming' as const,
      dailyEarning: dailyRate,
    }));

    const newBooking: Booking = {
      id: bookingId,
      customerId: customer.id,
      customerName: customer.name,
      customerPhone: customer.phone || '+91 98450 12345',
      customerAddress,
      city,
      helperId: helper.id,
      helperName: helper.name,
      helperAvatar: helper.avatar,
      helperPhone: helper.phone,
      categoryName,
      subServiceIds,
      subServiceNames,
      durationDays,
      dates,
      timeSlot,
      dailyRate,
      serviceTotal,
      platformFee,
      totalAmount,
      status: 'confirmed',
      paymentStatus: 'paid',
      paymentMethod: 'UPI / Card (Prepaid)',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      workingDays,
      notes,
    };

    setBookings((prev) => [newBooking, ...prev]);

    // Send notifications to Partner and Admin
    setNotifications((prev) => [
      {
        id: 'notif-b-cust-' + Date.now(),
        recipientRole: 'customer',
        recipientId: customer.id,
        title: `Booking Confirmed #${bookingId}`,
        message: `Your ${durationDays}-day ${categoryName} booking with ${helper.name} is confirmed.`,
        time: 'Just now',
        isRead: false,
        type: 'booking',
        linkPath: `/customer/bookings`,
      },
      {
        id: 'notif-b-part-' + Date.now(),
        recipientRole: 'partner',
        recipientId: helper.id,
        title: `New Booking #${bookingId}`,
        message: `${customer.name} booked you for ${durationDays} day(s) starting ${dates[0]}.`,
        time: 'Just now',
        isRead: false,
        type: 'booking',
        linkPath: `/partner/requests`,
      },
      {
        id: 'notif-b-adm-' + Date.now(),
        recipientRole: 'admin',
        title: `New Booking Created #${bookingId}`,
        message: `${categoryName} (${durationDays} days) booked for ₹${totalAmount}.`,
        time: 'Just now',
        isRead: false,
        type: 'booking',
        linkPath: `/admin/bookings`,
      },
      ...prev,
    ]);

    showToast(`Booking #${bookingId} confirmed successfully!`, 'success', 'Booking Confirmed');
    return newBooking;
  };

  const updateBookingStatus = (bookingId: string, status: Booking['status']) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status } : b))
    );
    showToast(`Booking #${bookingId} status updated to: ${status}`, 'info');
  };

  const startServiceDay = (bookingId: string, dayNumber: number) => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        const updatedDays = b.workingDays.map((d) =>
          d.dayNumber === dayNumber
            ? { ...d, status: 'in_progress' as const, startedAt: timeNow }
            : d
        );
        return {
          ...b,
          status: 'in_progress',
          workingDays: updatedDays,
        };
      })
    );
    showToast(`Day ${dayNumber} started at ${timeNow}! Service is in progress.`, 'success', 'Service Started');
  };

  const completeServiceDay = (bookingId: string, dayNumber: number) => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    let completedBookingRef: Booking | undefined;

    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        const updatedDays = b.workingDays.map((d) =>
          d.dayNumber === dayNumber
            ? { ...d, status: 'completed' as const, completedAt: timeNow }
            : d
        );
        const allCompleted = updatedDays.every((d) => d.status === 'completed');
        const updated = {
          ...b,
          status: allCompleted ? ('completed' as const) : ('in_progress' as const),
          workingDays: updatedDays,
        };
        completedBookingRef = updated;
        return updated;
      })
    );

    // Credit daily earning to helper wallet
    const currentBooking = bookings.find((b) => b.id === bookingId);
    if (currentBooking) {
      const dailyEarn = currentBooking.dailyRate;
      const newTxn: WalletTransaction = {
        id: 'txn-' + Date.now(),
        helperId: currentBooking.helperId,
        bookingId: currentBooking.id,
        type: 'credit',
        amount: dailyEarn,
        title: `Booking #${currentBooking.id} Day ${dayNumber} Earning`,
        description: `Completed Day ${dayNumber} of ${currentBooking.categoryName}. Funds added to wallet.`,
        date: new Date().toISOString().replace('T', ' ').slice(0, 16),
        status: 'completed',
      };
      setWalletTransactions((prev) => [newTxn, ...prev]);

      // Helper completed jobs count increment if all completed
      const allDone = completedBookingRef?.status === 'completed';
      if (allDone) {
        setHouseHelps((prev) =>
          prev.map((h) =>
            h.id === currentBooking.helperId
              ? { ...h, completedJobs: h.completedJobs + 1 }
              : h
          )
        );
      }

      // Notifications
      setNotifications((prev) => [
        {
          id: 'notif-earn-' + Date.now(),
          recipientRole: 'partner',
          recipientId: currentBooking.helperId,
          title: `Daily Earnings Added (+₹${dailyEarn})`,
          message: `Day ${dayNumber} of #${currentBooking.id} completed. ₹${dailyEarn} credited to your HomeEase wallet!`,
          time: 'Just now',
          isRead: false,
          type: 'payment',
          linkPath: '/partner/wallet',
        },
        {
          id: 'notif-cust-done-' + Date.now(),
          recipientRole: 'customer',
          recipientId: currentBooking.customerId,
          title: `Day ${dayNumber} Service Completed`,
          message: `${currentBooking.helperName} has finished today's work for #${currentBooking.id}.`,
          time: 'Just now',
          isRead: false,
          type: 'booking',
          linkPath: '/customer/bookings',
        },
        ...prev,
      ]);

      showToast(
        `Day ${dayNumber} completed! Daily earning of ₹${dailyEarn} added to wallet.`,
        'success',
        'Day Completed'
      );
    }
  };

  const cancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'cancelled', paymentStatus: 'refunded' } : b))
    );
    showToast(`Booking #${bookingId} has been cancelled. Refund initiated.`, 'info', 'Booking Cancelled');
  };

  // Reviews
  const addReview = ({
    bookingId,
    helperId,
    helperName,
    rating,
    tags,
    comment,
  }: {
    bookingId: string;
    helperId: string;
    helperName: string;
    rating: number;
    tags: string[];
    comment: string;
  }) => {
    const cust = currentUser || DEMO_USERS.customer;
    const newRev: Review = {
      id: 'rev-' + Date.now(),
      bookingId,
      customerId: cust.id,
      customerName: cust.name,
      customerAvatar: cust.avatar,
      helperId,
      helperName,
      rating,
      tags,
      comment,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
    };
    setReviews((prev) => [newRev, ...prev]);

    // Mark booking as reviewed
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, hasCustomerReviewed: true } : b))
    );

    // Recalculate helper rating
    setHouseHelps((prev) =>
      prev.map((h) => {
        if (h.id === helperId) {
          const helperReviews = [...reviews.filter((r) => r.helperId === helperId), newRev];
          const avg = helperReviews.reduce((sum, r) => sum + r.rating, 0) / helperReviews.length;
          return { ...h, rating: Number(avg.toFixed(2)) };
        }
        return h;
      })
    );

    showToast('Thank you! Your rating and review have been published.', 'success', 'Review Submitted');
  };

  const reportReview = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, isReported: true } : r))
    );
    showToast('Review has been flagged for administrator moderation.', 'warning');
  };

  // Partner management
  const togglePartnerAvailability = (partnerId: string) => {
    setHouseHelps((prev) =>
      prev.map((h) => {
        if (h.id === partnerId) {
          const nextState = !h.isAvailable;
          showToast(
            `You are now ${nextState ? 'ONLINE & Available for bookings' : 'OFFLINE (Paused)'}`,
            nextState ? 'success' : 'info'
          );
          return { ...h, isAvailable: nextState };
        }
        return h;
      })
    );
  };

  const updatePartnerProfile = (partnerId: string, updates: Partial<HouseHelp>) => {
    setHouseHelps((prev) =>
      prev.map((h) => (h.id === partnerId ? { ...h, ...updates } : h))
    );
    showToast('Partner profile details updated successfully.', 'success');
  };

  const approvePartner = (partnerId: string) => {
    setHouseHelps((prev) =>
      prev.map((h) =>
        h.id === partnerId ? { ...h, approvalStatus: 'approved' as PartnerApprovalStatus, isAvailable: true } : h
      )
    );
    const partner = houseHelps.find((h) => h.id === partnerId);
    setAuditLogs((prev) => [
      {
        id: 'log-' + Date.now(),
        adminName: 'Super Admin',
        action: 'Approved Partner',
        module: 'Partners',
        description: `Verified and approved service partner ${partner?.name || partnerId}`,
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      },
      ...prev,
    ]);
    showToast(`Partner ${partner?.name || ''} has been APPROVED!`, 'success', 'Partner Approved');
  };

  const rejectPartner = (partnerId: string) => {
    setHouseHelps((prev) =>
      prev.map((h) =>
        h.id === partnerId ? { ...h, approvalStatus: 'rejected' as PartnerApprovalStatus, isAvailable: false } : h
      )
    );
    const partner = houseHelps.find((h) => h.id === partnerId);
    setAuditLogs((prev) => [
      {
        id: 'log-' + Date.now(),
        adminName: 'Super Admin',
        action: 'Rejected Partner',
        module: 'Partners',
        description: `Declined application for ${partner?.name || partnerId}`,
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      },
      ...prev,
    ]);
    showToast(`Partner application for ${partner?.name || ''} has been rejected.`, 'error');
  };

  const suspendPartner = (partnerId: string) => {
    setHouseHelps((prev) =>
      prev.map((h) =>
        h.id === partnerId ? { ...h, approvalStatus: 'suspended' as PartnerApprovalStatus, isAvailable: false } : h
      )
    );
    showToast('Partner account has been suspended.', 'warning');
  };

  const reactivatePartner = (partnerId: string) => {
    setHouseHelps((prev) =>
      prev.map((h) =>
        h.id === partnerId ? { ...h, approvalStatus: 'approved' as PartnerApprovalStatus } : h
      )
    );
    showToast('Partner account reactivated.', 'success');
  };

  // Wallet & Withdrawals
  const requestWithdrawal = (helperId: string, amount: number, bankDetails: WithdrawalRequest['bankDetails']) => {
    const helper = houseHelps.find((h) => h.id === helperId);
    const reqId = 'WTH-' + Math.floor(4000 + Math.random() * 900);
    const newReq: WithdrawalRequest = {
      id: reqId,
      helperId,
      helperName: helper?.name || 'Service Partner',
      amount,
      bankDetails,
      status: 'requested',
      requestedDate: new Date().toISOString().replace('T', ' ').slice(0, 16),
    };
    setWithdrawals((prev) => [newReq, ...prev]);

    // Add debit transaction
    const newTxn: WalletTransaction = {
      id: 'txn-' + Date.now(),
      helperId,
      type: 'debit',
      amount,
      title: `Bank Withdrawal Request #${reqId}`,
      description: `Withdrawal request of ₹${amount} sent to ${bankDetails.bankName}`,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'processing',
    };
    setWalletTransactions((prev) => [newTxn, ...prev]);

    // Admin notification
    setNotifications((prev) => [
      {
        id: 'notif-w-' + Date.now(),
        recipientRole: 'admin',
        title: `New Withdrawal Request #${reqId}`,
        message: `${helper?.name} requested ₹${amount} transfer to ${bankDetails.bankName}.`,
        time: 'Just now',
        isRead: false,
        type: 'payment',
        linkPath: '/admin/withdrawals',
      },
      ...prev,
    ]);

    showToast(`Withdrawal request #${reqId} of ₹${amount} submitted!`, 'success', 'Request Logged');
  };

  const processWithdrawal = (withdrawalId: string, action: 'approve' | 'reject' | 'process') => {
    setWithdrawals((prev) =>
      prev.map((w) => {
        if (w.id !== withdrawalId) return w;
        const newStatus = action === 'approve' ? 'completed' : action === 'reject' ? 'rejected' : 'processing';
        return {
          ...w,
          status: newStatus,
          processedDate: new Date().toISOString().replace('T', ' ').slice(0, 16),
        };
      })
    );

    setAuditLogs((prev) => [
      {
        id: 'log-' + Date.now(),
        adminName: 'Super Admin',
        action: `Withdrawal ${action.toUpperCase()}`,
        module: 'Wallets',
        description: `Admin marked withdrawal #${withdrawalId} as ${action}`,
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      },
      ...prev,
    ]);

    showToast(`Withdrawal #${withdrawalId} action: ${action} successful.`, 'success');
  };

  const approveWithdrawal = (withdrawalId: string) => {
    processWithdrawal(withdrawalId, 'approve');
  };

  const rejectWithdrawal = (withdrawalId: string) => {
    processWithdrawal(withdrawalId, 'reject');
  };

  // Enquiries
  const createEnquiry = ({
    subject,
    category,
    bookingId,
    description,
  }: {
    subject: string;
    category: string;
    bookingId?: string;
    description: string;
  }) => {
    const user = currentUser || DEMO_USERS.customer;
    const ticketNumber = 'TKT-' + Math.floor(1000 + Math.random() * 9000);
    const newEnquiry: SupportEnquiry = {
      id: 'enq-' + Date.now(),
      ticketNumber,
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      userEmail: user.email,
      subject,
      category,
      bookingId,
      description,
      status: 'open',
      priority: 'medium',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      messages: [
        {
          id: 'msg-' + Date.now(),
          sender: user.name,
          isStaff: false,
          text: description,
          timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
        },
      ],
    };

    setEnquiries((prev) => [newEnquiry, ...prev]);

    // Admin alert
    setNotifications((prev) => [
      {
        id: 'notif-enq-' + Date.now(),
        recipientRole: 'admin',
        title: `New Support Ticket #${ticketNumber}`,
        message: `${user.name} submitted: "${subject}"`,
        time: 'Just now',
        isRead: false,
        type: 'support',
        linkPath: '/admin/enquiries',
      },
      ...prev,
    ]);

    showToast(`Support ticket #${ticketNumber} created! Our team will respond shortly.`, 'success', 'Ticket Submitted');
  };

  const addEnquiryMessage = (enquiryId: string, text: string) => {
    const user = currentUser || DEMO_USERS.admin;
    const isStaff = user.role === 'admin';
    const newMsg = {
      id: 'msg-' + Date.now(),
      sender: user.name,
      isStaff,
      text,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
    };
    setEnquiries((prev) =>
      prev.map((e) => {
        if (e.id === enquiryId) {
          return {
            ...e,
            status: isStaff ? 'in_progress' : e.status,
            messages: [...e.messages, newMsg],
          };
        }
        return e;
      })
    );
    showToast('Message sent to ticket thread.', 'info');
  };

  const updateEnquiryStatus = (enquiryId: string, status: SupportEnquiry['status']) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === enquiryId ? { ...e, status } : e))
    );
    showToast(`Ticket status updated to ${status}.`, 'info');
  };

  // Service Management
  const addService = (categoryId: string, serviceData: Omit<SubService, 'id' | 'categoryId'>) => {
    const newSubService: SubService = {
      ...serviceData,
      id: 'svc-' + Date.now(),
      categoryId,
    };
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? { ...cat, services: [...cat.services, newSubService] }
          : cat
      )
    );
    showToast(`New service "${newSubService.name}" created!`, 'success');
  };

  const addSubService = (
    categoryId: string,
    serviceData: { name: string; description: string; basePrice: number; durationHours: number }
  ) => {
    addService(categoryId, {
      name: serviceData.name,
      description: serviceData.description,
      startingPrice: serviceData.basePrice,
      basePrice: serviceData.basePrice,
      estimatedDuration: `${serviceData.durationHours} hrs`,
      durationHours: serviceData.durationHours,
      isActive: true,
    });
  };

  const updateService = (categoryId: string, serviceId: string, updates: Partial<SubService>) => {
    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id !== categoryId) return cat;
        return {
          ...cat,
          services: cat.services.map((s) => (s.id === serviceId ? { ...s, ...updates } : s)),
        };
      })
    );
    showToast('Service details updated successfully.', 'success');
  };

  const toggleServiceStatus = (categoryId: string, serviceId: string) => {
    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id !== categoryId) return cat;
        return {
          ...cat,
          services: cat.services.map((s) =>
            s.id === serviceId ? { ...s, isActive: !s.isActive } : s
          ),
        };
      })
    );
    showToast('Service active status toggled.', 'info');
  };

  // Notifications
  const markNotificationRead = (notifId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notifId ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsRead = (role?: UserRole) => {
    setNotifications((prev) =>
      prev.map((n) => (!role || n.recipientRole === role || n.recipientRole === 'all' ? { ...n, isRead: true } : n))
    );
    showToast('All notifications marked as read.', 'info');
  };

  // Addresses
  const addAddress = (address: Omit<Address, 'id' | 'userId'>) => {
    const cust = currentUser || DEMO_USERS.customer;
    const newAddr: Address = {
      ...address,
      id: 'addr-' + Date.now(),
      userId: cust.id,
      isDefault: addresses.length === 0,
    };
    setAddresses((prev) => [...prev, newAddr]);
    showToast('New address saved successfully.', 'success');
  };

  const setDefaultAddress = (addressId: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === addressId }))
    );
    showToast('Default service address updated.', 'info');
  };

  const deleteAddress = (addressId: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== addressId));
    showToast('Address removed.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentPath,
        navigate,
        categories,
        houseHelps,
        bookings,
        reviews,
        walletTransactions,
        withdrawals,
        enquiries,
        notifications,
        customers,
        toggleCustomerStatus,
        auditLogs,
        addresses,
        toasts,
        showToast,
        dismissToast,
        loginAs,
        loginWithCredentials,
        registerCustomer,
        registerPartner,
        logout,
        createBooking,
        updateBookingStatus,
        startServiceDay,
        completeServiceDay,
        cancelBooking,
        addReview,
        reportReview,
        togglePartnerAvailability,
        updatePartnerProfile,
        approvePartner,
        rejectPartner,
        suspendPartner,
        reactivatePartner,
        requestWithdrawal,
        processWithdrawal,
        approveWithdrawal,
        rejectWithdrawal,
        createEnquiry,
        addEnquiryMessage,
        updateEnquiryStatus,
        addService,
        addSubService,
        updateService,
        toggleServiceStatus,
        markNotificationRead,
        markAllNotificationsRead,
        addAddress,
        setDefaultAddress,
        deleteAddress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

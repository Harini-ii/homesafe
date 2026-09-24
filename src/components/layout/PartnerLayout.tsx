import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Inbox,
  CalendarDays,
  Wallet,
  Star,
  Bell,
  User,
  LogOut,
  Sparkles,
  Menu,
  X,
  Clock,
  ShieldCheck,
  AlertTriangle,
  ClipboardCheck,
  Check,
} from 'lucide-react';

interface PartnerLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: string[];
}

export const PartnerLayout: React.FC<PartnerLayoutProps> = ({
  children,
  breadcrumbs = ['Service Partner', 'Dashboard'],
}) => {
  const {
    currentUser,
    currentPath,
    navigate,
    logout,
    houseHelps,
    notifications,
    togglePartnerAvailability,
    walletTransactions,
  } = useApp();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Match current partner record
  const partnerProfile = houseHelps.find((h) => h.id === currentUser?.id || h.email === currentUser?.email) || houseHelps[0];

  const isPending = partnerProfile.approvalStatus === 'pending';
  const isSuspended = partnerProfile.approvalStatus === 'suspended';

  // Compute total wallet balance
  const walletBalance = walletTransactions
    .filter((t) => t.helperId === partnerProfile.id && t.status === 'completed')
    .reduce((acc, t) => acc + (t.type === 'credit' ? t.amount : -t.amount), 0);

  // Unread partner notifications
  const unreadNotifs = notifications.filter(
    (n) => (n.recipientRole === 'partner' || n.recipientRole === 'all') && !n.isRead
  ).length;

  const navItems = [
    { label: 'Dashboard', path: '/partner/dashboard', icon: LayoutDashboard },
    { label: 'Booking Requests', path: '/partner/requests', icon: Inbox },
    { label: 'Schedule & Jobs', path: '/partner/bookings', icon: ClipboardCheck },
    { label: 'Calendar Availability', path: '/partner/calendar', icon: CalendarDays },
    { label: 'Earnings & Wallet', path: '/partner/wallet', icon: Wallet },
    { label: 'Ratings & Reviews', path: '/partner/reviews', icon: Star },
    { label: 'Notifications', path: '/partner/notifications', icon: Bell, badge: unreadNotifs },
    { label: 'My Profile', path: '/partner/profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-900">
      {/* Desktop Sidebar (260px) */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-white shrink-0 select-none">
        {/* Brand */}
        <div className="h-16 px-6 flex items-center gap-3 border-b border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold shadow-sm">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="font-extrabold text-white tracking-tight text-lg">
              Home<span className="text-emerald-400">Ease</span>
            </span>
            <span className="block text-[10px] font-medium text-emerald-400 uppercase tracking-wider">Partner Network</span>
          </div>
        </div>

        {/* Partner Quick Card */}
        <div className="p-4 mx-3 my-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
          <div className="flex items-center gap-3">
            <img
              src={partnerProfile.avatar}
              alt={partnerProfile.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-emerald-400"
            />
            <div className="min-w-0 flex-1">
              <p className="font-bold text-sm text-white truncate">{partnerProfile.name}</p>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="font-semibold text-slate-200 tabular-nums">
                  {partnerProfile.rating > 0 ? partnerProfile.rating.toFixed(1) : 'New'}
                </span>
                <span>·</span>
                <span>{partnerProfile.completedJobs} jobs</span>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs">
            <span className="text-slate-400">Status:</span>
            {partnerProfile.approvalStatus === 'approved' ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" /> Approved
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400">
                <Clock className="w-3.5 h-3.5" /> Pending Review
              </span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path || (item.path !== '/partner/dashboard' && currentPath.startsWith(item.path));
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </div>
                {item.badge && item.badge > 0 ? (
                  <span className="w-5 h-5 rounded-full bg-emerald-400 text-slate-950 text-[11px] font-bold flex items-center justify-center">
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>

        {/* Bottom sign out */}
        <div className="p-3 border-t border-slate-800">
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        {/* Pending Approval Global Alert Banner */}
        {isPending && (
          <div className="bg-amber-500 text-slate-950 px-4 py-2.5 text-xs sm:text-sm font-semibold flex items-center justify-between gap-3 shadow-inner">
            <div className="flex items-center gap-2 max-w-4xl mx-auto">
              <Clock className="w-4 h-4 shrink-0 animate-spin" />
              <span>
                Your application has been submitted and is waiting for admin approval. Status: <strong>Pending Approval</strong>.
                You can explore your dashboard while our team verifies your background credentials.
              </span>
            </div>
            <button
              onClick={() => navigate('/partner/profile')}
              className="hidden sm:inline-flex text-xs bg-slate-950 text-white px-2.5 py-1 rounded font-medium hover:bg-slate-800 transition-colors shrink-0"
            >
              View Application
            </button>
          </div>
        )}

        {isSuspended && (
          <div className="bg-rose-600 text-white px-4 py-2 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Your partner account is temporarily suspended. Please contact admin support.</span>
          </div>
        )}

        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={crumb}>
                  <span className={idx === breadcrumbs.length - 1 ? 'font-semibold text-slate-900' : ''}>
                    {crumb}
                  </span>
                  {idx < breadcrumbs.length - 1 && <span className="text-slate-300">/</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Availability Switch */}
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200 text-xs">
              <span className={`w-2 h-2 rounded-full ${partnerProfile.isAvailable ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
              <span className="font-semibold text-slate-700 hidden sm:inline">
                {partnerProfile.isAvailable ? 'Available for Booking' : 'Offline / Paused'}
              </span>
              <button
                onClick={() => togglePartnerAvailability(partnerProfile.id)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  partnerProfile.isAvailable ? 'bg-emerald-600' : 'bg-slate-300'
                }`}
                title="Toggle Booking Availability"
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    partnerProfile.isAvailable ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Wallet quick stat */}
            <button
              onClick={() => navigate('/partner/wallet')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold hover:bg-emerald-100 transition-colors"
            >
              <Wallet className="w-3.5 h-3.5" />
              <span>₹{walletBalance.toLocaleString('en-IN')}</span>
            </button>

            {/* Notifications */}
            <button
              onClick={() => navigate('/partner/notifications')}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg relative transition-colors"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifs > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white"></span>
              )}
            </button>

            {/* Partner Avatar */}
            <button
              onClick={() => navigate('/partner/profile')}
              className="flex items-center gap-2 pl-1"
            >
              <img
                src={partnerProfile.avatar}
                alt={partnerProfile.name}
                className="w-8 h-8 rounded-full object-cover border border-slate-200"
              />
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Mobile Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative w-72 max-w-xs bg-slate-900 text-white h-full flex flex-col shadow-2xl p-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <span className="font-extrabold text-white">HomeEase Partner</span>
              </div>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 py-4 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setMobileSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium ${
                      isActive ? 'bg-emerald-600 text-white font-semibold' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && item.badge > 0 ? (
                      <span className="w-5 h-5 rounded-full bg-emerald-400 text-slate-950 text-[11px] font-bold flex items-center justify-center">
                        {item.badge}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-slate-800">
              <button
                onClick={() => {
                  logout();
                  setMobileSidebarOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-rose-400 hover:bg-slate-800 rounded-lg font-medium"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-4 py-2 flex items-center justify-around text-[10px] font-medium text-slate-500">
        <button
          onClick={() => navigate('/partner/dashboard')}
          className={`flex flex-col items-center gap-1 ${currentPath === '/partner/dashboard' ? 'text-emerald-600 font-bold' : ''}`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Home</span>
        </button>
        <button
          onClick={() => navigate('/partner/requests')}
          className={`flex flex-col items-center gap-1 ${currentPath.startsWith('/partner/requests') ? 'text-emerald-600 font-bold' : ''}`}
        >
          <Inbox className="w-4 h-4" />
          <span>Requests</span>
        </button>
        <button
          onClick={() => navigate('/partner/bookings')}
          className={`flex flex-col items-center gap-1 ${currentPath.startsWith('/partner/bookings') ? 'text-emerald-600 font-bold' : ''}`}
        >
          <ClipboardCheck className="w-4 h-4" />
          <span>Schedule</span>
        </button>
        <button
          onClick={() => navigate('/partner/wallet')}
          className={`flex flex-col items-center gap-1 ${currentPath.startsWith('/partner/wallet') ? 'text-emerald-600 font-bold' : ''}`}
        >
          <Wallet className="w-4 h-4" />
          <span>Wallet</span>
        </button>
        <button
          onClick={() => navigate('/partner/profile')}
          className={`flex flex-col items-center gap-1 ${currentPath.startsWith('/partner/profile') ? 'text-emerald-600 font-bold' : ''}`}
        >
          <User className="w-4 h-4" />
          <span>Profile</span>
        </button>
      </div>
    </div>
  );
};

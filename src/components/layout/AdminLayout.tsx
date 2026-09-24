import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Wrench,
  CalendarCheck,
  CreditCard,
  Wallet,
  MessageSquareWarning,
  Star,
  BarChart3,
  ScrollText,
  Settings,
  LogOut,
  Sparkles,
  Shield,
  Menu,
  X,
  Bell,
  Search,
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: string[];
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  breadcrumbs = ['Admin Console', 'Dashboard'],
}) => {
  const {
    currentUser,
    currentPath,
    navigate,
    logout,
    houseHelps,
    withdrawals,
    enquiries,
    notifications,
  } = useApp();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Counter badges
  const pendingPartners = houseHelps.filter((h) => h.approvalStatus === 'pending').length;
  const pendingWithdrawals = withdrawals.filter((w) => w.status === 'requested' || w.status === 'processing').length;
  const openEnquiries = enquiries.filter((e) => e.status === 'open' || e.status === 'in_progress').length;
  const unreadNotifs = notifications.filter((n) => n.recipientRole === 'admin' && !n.isRead).length;

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Customers', path: '/admin/customers', icon: Users },
    { label: 'House Helps', path: '/admin/partners', icon: UserCheck, badge: pendingPartners, badgeColor: 'bg-amber-500' },
    { label: 'Services', path: '/admin/services', icon: Wrench },
    { label: 'Bookings', path: '/admin/bookings', icon: CalendarCheck },
    { label: 'Payments', path: '/admin/payments', icon: CreditCard },
    { label: 'Wallets & Withdrawals', path: '/admin/withdrawals', icon: Wallet, badge: pendingWithdrawals, badgeColor: 'bg-indigo-500' },
    { label: 'Support Enquiries', path: '/admin/enquiries', icon: MessageSquareWarning, badge: openEnquiries, badgeColor: 'bg-rose-500' },
    { label: 'Ratings & Reviews', path: '/admin/reviews', icon: Star },
    { label: 'Analytics & Reports', path: '/admin/reports', icon: BarChart3 },
    { label: 'Audit Logs', path: '/admin/audit-logs', icon: ScrollText },
    { label: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row text-slate-900">
      {/* Desktop Sidebar (260px) */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-950 text-white shrink-0 select-none">
        {/* Brand */}
        <div className="h-16 px-6 flex items-center gap-3 border-b border-slate-800/80">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold shadow-sm shadow-indigo-500/30">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <span className="font-extrabold text-white tracking-tight text-lg">
              Home<span className="text-indigo-400">Ease</span>
            </span>
            <span className="block text-[10px] font-semibold text-indigo-400 uppercase tracking-wider">Admin Operations</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path || (item.path !== '/admin/dashboard' && currentPath.startsWith(item.path));
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && item.badge > 0 ? (
                  <span className={`px-1.5 py-0.5 rounded-full text-white text-[10px] font-bold ${item.badgeColor || 'bg-indigo-500'}`}>
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>

        {/* Admin User Footer */}
        <div className="p-3 border-t border-slate-800/80">
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900 text-xs">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs shrink-0">
                SA
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-white truncate">{currentUser?.name || 'Super Admin'}</p>
                <p className="text-[10px] text-slate-500 truncate">Root Administrator</p>
              </div>
            </div>
            <button
              onClick={logout}
              title="Sign Out"
              className="p-1 text-slate-400 hover:text-rose-400 rounded transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-12 md:pb-0">
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
            {/* Quick action badges */}
            {pendingPartners > 0 && (
              <button
                onClick={() => navigate('/admin/partners')}
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold hover:bg-amber-100"
              >
                <span>{pendingPartners} Pending Partner{pendingPartners > 1 ? 's' : ''}</span>
              </button>
            )}

            {pendingWithdrawals > 0 && (
              <button
                onClick={() => navigate('/admin/withdrawals')}
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-800 border border-indigo-200 text-xs font-semibold hover:bg-indigo-100"
              >
                <span>{pendingWithdrawals} Payout Request{pendingWithdrawals > 1 ? 's' : ''}</span>
              </button>
            )}

            {/* Notifications */}
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg relative transition-colors"
              title="Admin Alerts"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifs > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
              )}
            </button>

            <div className="h-6 w-px bg-slate-200"></div>

            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-xs font-semibold text-slate-700">Administrator</span>
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* Content Viewport */}
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
          <div className="relative w-72 max-w-xs bg-slate-950 text-white h-full flex flex-col shadow-2xl p-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                  <Shield className="w-3.5 h-3.5" />
                </div>
                <span className="font-extrabold text-white">HomeEase Admin</span>
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
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium ${
                      isActive ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-300 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && item.badge > 0 ? (
                      <span className={`px-1.5 py-0.5 rounded-full text-white text-[10px] font-bold ${item.badgeColor || 'bg-indigo-500'}`}>
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
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-400 hover:bg-slate-900 rounded-lg font-medium"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

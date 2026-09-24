import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  CalendarCheck,
  ClipboardList,
  MapPin,
  Star,
  LifeBuoy,
  Bell,
  User,
  LogOut,
  Sparkles,
  PlusCircle,
  Menu,
  X,
  Search,
} from 'lucide-react';

interface CustomerLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
  breadcrumbs?: string[];
}

export const CustomerLayout: React.FC<CustomerLayoutProps> = ({
  children,
  pageTitle,
  breadcrumbs = ['Customer', 'Dashboard'],
}) => {
  const { currentUser, currentPath, navigate, logout, notifications } = useApp();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Filter unread notifications for customer
  const unreadNotifs = notifications.filter(
    (n) => (n.recipientRole === 'customer' || n.recipientRole === 'all') && !n.isRead
  ).length;

  const navItems = [
    { label: 'Dashboard', path: '/customer/dashboard', icon: LayoutDashboard },
    { label: 'Book a Service', path: '/customer/book', icon: PlusCircle, highlight: true },
    { label: 'My Bookings', path: '/customer/bookings', icon: ClipboardList },
    { label: 'Addresses', path: '/customer/addresses', icon: MapPin },
    { label: 'Ratings & Reviews', path: '/customer/reviews', icon: Star },
    { label: 'Help & Support', path: '/customer/support', icon: LifeBuoy },
    { label: 'Notifications', path: '/customer/notifications', icon: Bell, badge: unreadNotifs },
    { label: 'Profile', path: '/customer/profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-900">
      {/* Desktop Sidebar (260px) */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 shrink-0 select-none">
        {/* Brand */}
        <div className="h-16 px-6 flex items-center gap-3 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white font-bold shadow-sm shadow-teal-500/20">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="font-extrabold text-slate-900 tracking-tight text-lg">
              Home<span className="text-teal-600">Ease</span>
            </span>
            <span className="block text-[10px] font-medium text-slate-600 uppercase tracking-wider">Customer Portal</span>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path || (item.path !== '/customer/dashboard' && currentPath.startsWith(item.path));
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  item.highlight
                    ? isActive
                      ? 'bg-teal-700 text-white font-semibold shadow-sm'
                      : 'bg-teal-50 text-teal-800 hover:bg-teal-100 font-semibold'
                    : isActive
                    ? 'bg-slate-900 text-white font-semibold shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </div>
                {item.badge && item.badge > 0 ? (
                  <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[11px] font-bold flex items-center justify-center">
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>

        {/* User bar & Logout */}
        <div className="p-3 border-t border-slate-100">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256&q=80'}
                alt={currentUser?.name}
                className="w-8 h-8 rounded-full object-cover shrink-0 border border-slate-200"
              />
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate">{currentUser?.name || 'Customer'}</p>
                <p className="text-[11px] text-slate-600 truncate">{currentUser?.city || 'Bengaluru'}</p>
              </div>
            </div>
            <button
              onClick={logout}
              title="Logout"
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            {/* Breadcrumb */}
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
            {/* Quick search button */}
            <button
              onClick={() => navigate('/customer/book')}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search services...</span>
              <kbd className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">Ctrl+K</kbd>
            </button>

            {/* Quick Book CTA */}
            <button
              onClick={() => navigate('/customer/book')}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Book Service</span>
            </button>

            {/* Notifications icon */}
            <button
              onClick={() => navigate('/customer/notifications')}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg relative transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifs > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
              )}
            </button>

            {/* Profile Avatar */}
            <button
              onClick={() => navigate('/customer/profile')}
              className="flex items-center gap-2 pl-2"
            >
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256&q=80'}
                alt={currentUser?.name}
                className="w-8 h-8 rounded-full object-cover border border-slate-200 ring-1 ring-slate-100"
              />
            </button>
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
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative w-72 max-w-xs bg-white h-full flex flex-col shadow-2xl p-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-teal-600 flex items-center justify-center text-white">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <span className="font-extrabold text-slate-900">HomeEase</span>
              </div>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600"
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
                      isActive ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && item.badge > 0 ? (
                      <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[11px] font-bold flex items-center justify-center">
                        {item.badge}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-slate-100">
              <button
                onClick={() => {
                  logout();
                  setMobileSidebarOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-lg font-medium"
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
          onClick={() => navigate('/customer/dashboard')}
          className={`flex flex-col items-center gap-1 ${currentPath === '/customer/dashboard' ? 'text-teal-600 font-bold' : ''}`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Home</span>
        </button>
        <button
          onClick={() => navigate('/customer/book')}
          className={`flex flex-col items-center gap-1 ${currentPath.startsWith('/customer/book') ? 'text-teal-600 font-bold' : ''}`}
        >
          <PlusCircle className="w-4 h-4" />
          <span>Book</span>
        </button>
        <button
          onClick={() => navigate('/customer/bookings')}
          className={`flex flex-col items-center gap-1 ${currentPath.startsWith('/customer/bookings') ? 'text-teal-600 font-bold' : ''}`}
        >
          <ClipboardList className="w-4 h-4" />
          <span>Bookings</span>
        </button>
        <button
          onClick={() => navigate('/customer/support')}
          className={`flex flex-col items-center gap-1 ${currentPath.startsWith('/customer/support') ? 'text-teal-600 font-bold' : ''}`}
        >
          <LifeBuoy className="w-4 h-4" />
          <span>Help</span>
        </button>
        <button
          onClick={() => navigate('/customer/profile')}
          className={`flex flex-col items-center gap-1 ${currentPath.startsWith('/customer/profile') ? 'text-teal-600 font-bold' : ''}`}
        >
          <User className="w-4 h-4" />
          <span>Profile</span>
        </button>
      </div>
    </div>
  );
};

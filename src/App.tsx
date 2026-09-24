import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { ToastContainer } from './components/common/ToastContainer';
import { RoleSwitcher } from './components/common/RoleSwitcher';
import { AccessDenied } from './components/common/AccessDenied';

// Layouts
import { PublicLayout } from './components/layout/PublicLayout';
import { CustomerLayout } from './components/layout/CustomerLayout';
import { PartnerLayout } from './components/layout/PartnerLayout';
import { AdminLayout } from './components/layout/AdminLayout';

// Public & Auth Pages
import { LandingPage } from './pages/public/LandingPage';
import { ServicesPage } from './pages/public/ServicesPage';
import { HowItWorksPage } from './pages/public/HowItWorksPage';
import { AboutPage } from './pages/public/AboutPage';
import { HelpPage } from './pages/public/HelpPage';
import { LoginPage } from './pages/auth/LoginPage';
import { CustomerRegisterPage } from './pages/auth/CustomerRegisterPage';
import { PartnerRegisterPage } from './pages/auth/PartnerRegisterPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';

// Customer Pages
import { CustomerDashboard } from './pages/customer/CustomerDashboard';
import { CustomerBookPage } from './pages/customer/CustomerBookPage';
import { CustomerBookingsPage } from './pages/customer/CustomerBookingsPage';
import { CustomerAddressesPage } from './pages/customer/CustomerAddressesPage';
import { CustomerReviewsPage } from './pages/customer/CustomerReviewsPage';
import { CustomerSupportPage } from './pages/customer/CustomerSupportPage';
import { CustomerNotificationsPage } from './pages/customer/CustomerNotificationsPage';
import { CustomerProfilePage } from './pages/customer/CustomerProfilePage';

// Partner Pages
import { PartnerDashboard } from './pages/partner/PartnerDashboard';
import { PartnerRequestsPage } from './pages/partner/PartnerRequestsPage';
import { PartnerBookingsPage } from './pages/partner/PartnerBookingsPage';
import { PartnerCalendarPage } from './pages/partner/PartnerCalendarPage';
import { PartnerWalletPage } from './pages/partner/PartnerWalletPage';
import { PartnerReviewsPage } from './pages/partner/PartnerReviewsPage';
import { PartnerNotificationsPage } from './pages/partner/PartnerNotificationsPage';
import { PartnerProfilePage } from './pages/partner/PartnerProfilePage';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminPartnersPage } from './pages/admin/AdminPartnersPage';
import { AdminCustomersPage } from './pages/admin/AdminCustomersPage';
import { AdminBookingsPage } from './pages/admin/AdminBookingsPage';
import { AdminServicesPage } from './pages/admin/AdminServicesPage';
import { AdminEnquiriesPage } from './pages/admin/AdminEnquiriesPage';
import { AdminReviewsPage } from './pages/admin/AdminReviewsPage';
import { AdminFinancePage } from './pages/admin/AdminFinancePage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

const AppRoutes: React.FC = () => {
  const { currentPath, currentUser } = useApp();

  // Normalize path
  const path = currentPath.split('?')[0];

  // Role verification helper
  const role = currentUser?.role;

  // 1. Customer Area
  if (path.startsWith('/customer')) {
    if (role !== 'customer') {
      return (
        <CustomerLayout>
          <AccessDenied requiredRole="customer" />
        </CustomerLayout>
      );
    }

    return (
      <CustomerLayout>
        {path === '/customer/dashboard' && <CustomerDashboard />}
        {path === '/customer/book' && <CustomerBookPage />}
        {path === '/customer/bookings' && <CustomerBookingsPage />}
        {path === '/customer/addresses' && <CustomerAddressesPage />}
        {path === '/customer/reviews' && <CustomerReviewsPage />}
        {path === '/customer/support' && <CustomerSupportPage />}
        {path === '/customer/notifications' && <CustomerNotificationsPage />}
        {path === '/customer/profile' && <CustomerProfilePage />}
        {!['/customer/dashboard', '/customer/book', '/customer/bookings', '/customer/addresses', '/customer/reviews', '/customer/support', '/customer/notifications', '/customer/profile'].includes(path) && <CustomerDashboard />}
      </CustomerLayout>
    );
  }

  // 2. Partner Area
  if (path.startsWith('/partner')) {
    if (role !== 'partner') {
      return (
        <PartnerLayout>
          <AccessDenied requiredRole="partner" />
        </PartnerLayout>
      );
    }

    return (
      <PartnerLayout>
        {path === '/partner/dashboard' && <PartnerDashboard />}
        {path === '/partner/requests' && <PartnerRequestsPage />}
        {path === '/partner/bookings' && <PartnerBookingsPage />}
        {path === '/partner/calendar' && <PartnerCalendarPage />}
        {path === '/partner/wallet' && <PartnerWalletPage />}
        {path === '/partner/reviews' && <PartnerReviewsPage />}
        {path === '/partner/notifications' && <PartnerNotificationsPage />}
        {path === '/partner/profile' && <PartnerProfilePage />}
        {!['/partner/dashboard', '/partner/requests', '/partner/bookings', '/partner/calendar', '/partner/wallet', '/partner/reviews', '/partner/notifications', '/partner/profile'].includes(path) && <PartnerDashboard />}
      </PartnerLayout>
    );
  }

  // 3. Admin Area
  if (path.startsWith('/admin')) {
    if (role !== 'admin') {
      return (
        <AdminLayout>
          <AccessDenied requiredRole="admin" />
        </AdminLayout>
      );
    }

    return (
      <AdminLayout>
        {path === '/admin/dashboard' && <AdminDashboard />}
        {path === '/admin/partners' && <AdminPartnersPage />}
        {path === '/admin/customers' && <AdminCustomersPage />}
        {path === '/admin/bookings' && <AdminBookingsPage />}
        {path === '/admin/services' && <AdminServicesPage />}
        {path === '/admin/enquiries' && <AdminEnquiriesPage />}
        {path === '/admin/reviews' && <AdminReviewsPage />}
        {path === '/admin/finance' && <AdminFinancePage />}
        {path === '/admin/settings' && <AdminSettingsPage />}
        {!['/admin/dashboard', '/admin/partners', '/admin/customers', '/admin/bookings', '/admin/services', '/admin/enquiries', '/admin/reviews', '/admin/finance', '/admin/settings'].includes(path) && <AdminDashboard />}
      </AdminLayout>
    );
  }

  // 4. Public & Authentication Pages
  return (
    <PublicLayout>
      {path === '/' && <LandingPage />}
      {path === '/services' && <ServicesPage />}
      {path === '/how-it-works' && <HowItWorksPage />}
      {path === '/about' && <AboutPage />}
      {path === '/help' && <HelpPage />}
      {path === '/login' && <LoginPage />}
      {(path === '/register' || path === '/register/customer') && <CustomerRegisterPage />}
      {path === '/register/partner' && <PartnerRegisterPage />}
      {path === '/forgot-password' && <ForgotPasswordPage />}
      {!['/', '/services', '/how-it-works', '/about', '/help', '/login', '/register', '/register/customer', '/register/partner', '/forgot-password'].includes(path) && <LandingPage />}
    </PublicLayout>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
      <ToastContainer />
      <RoleSwitcher />
    </AppProvider>
  );
}

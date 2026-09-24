import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  HeartHandshake,
  ShieldCheck,
  CheckCircle2,
  Upload,
  Calendar,
  IndianRupee,
} from 'lucide-react';

export const PartnerRegisterPage: React.FC = () => {
  const { registerPartner, navigate } = useApp();

  const [formData, setFormData] = useState({
    name: 'Kavita Kumari',
    phone: '+91 97312 44556',
    email: 'kavita.partner@example.com',
    password: 'password123',
    confirmPassword: 'password123',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&h=256&q=80',
    experienceYears: 4,
    city: 'Bengaluru',
    pincode: '560034',
    address: 'Koramangala 4th Block, 12th Cross',
    preferredArea: 'Koramangala, HSR Layout, BTM Layout',
    pricePerDay: 600,
    bio: 'Dedicated home cook and housekeeping professional with 4 years experience in North and South Indian cooking, dusting, and floor deep cleaning.',
    services: ['House Cleaning', 'Cooking & Kitchen', 'Laundry'],
    agreeVerification: true,
  });

  const [error, setError] = useState<string>('');

  const allAvailableServices = [
    'House Cleaning',
    'Cooking & Kitchen',
    'Washroom Cleaning',
    'Tank Cleaning',
    'Gardening',
    'Laundry',
    'Home Organization',
  ];

  const handleServiceToggle = (serviceName: string) => {
    setFormData((prev) => {
      const exists = prev.services.includes(serviceName);
      return {
        ...prev,
        services: exists
          ? prev.services.filter((s) => s !== serviceName)
          : [...prev.services, serviceName],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeVerification) {
      setError('Please agree to background verification.');
      return;
    }
    if (formData.services.length === 0) {
      setError('Please select at least one service category you offer.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    registerPartner({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      avatar: formData.avatar,
      experienceYears: Number(formData.experienceYears),
      services: formData.services,
      preferredAreas: formData.preferredArea.split(',').map((s) => s.trim()),
      pricePerDay: Number(formData.pricePerDay),
      city: formData.city,
      pincode: formData.pincode,
      bio: formData.bio,
    });
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-emerald-600 items-center justify-center text-white shadow-md shadow-emerald-500/20 mb-1">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Become a Service Partner
          </h1>
          <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Join the HomeEase Partner Network. Earn up to ₹35,000/month with direct daily wallet payouts, flexible working days, and verified customers.
          </p>
        </div>

        {/* Benefits banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-emerald-50 border border-emerald-200/80 rounded-2xl text-xs text-emerald-950 font-medium">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Guaranteed Daily Wages</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Direct Bank Withdrawals</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Free Insurance & ID Badge</span>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          {error && (
            <div className="mb-6 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Step 1: Personal Details */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
                1. Personal Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:ring-2 focus:emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Experience & Skills */}
            <div className="space-y-4 pt-4">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
                2. Experience & Services
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Years of Domestic Experience *
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="40"
                    required
                    value={formData.experienceYears}
                    onChange={(e) => setFormData({ ...formData, experienceYears: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Expected Daily Rate (₹ / Day) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">₹</span>
                    <input
                      type="number"
                      min="300"
                      max="3000"
                      step="50"
                      required
                      value={formData.pricePerDay}
                      onChange={(e) => setFormData({ ...formData, pricePerDay: Number(e.target.value) })}
                      className="w-full pl-8 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Multi-Select Services Offered */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Select Services You Offer * ({formData.services.length} selected)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {allAvailableServices.map((svc) => {
                    const isChecked = formData.services.includes(svc);
                    return (
                      <button
                        key={svc}
                        type="button"
                        onClick={() => handleServiceToggle(svc)}
                        className={`p-3 rounded-xl border text-left text-xs font-medium flex items-center justify-between transition-all ${
                          isChecked
                            ? 'border-emerald-500 bg-emerald-50/70 text-emerald-950 font-semibold'
                            : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <span>{svc}</span>
                        <span
                          className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] ${
                            isChecked
                              ? 'bg-emerald-600 border-emerald-600 text-white'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isChecked && '✓'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Brief Bio / Introduction
                </label>
                <textarea
                  rows={2}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tell customers about your cooking style, cleaning background, languages spoken..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>

            {/* Step 3: Location */}
            <div className="space-y-4 pt-4">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
                3. Address & Preferred Areas
              </h2>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Residential Address *
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Preferred Working Areas / Localities (comma separated) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.preferredArea}
                  onChange={(e) => setFormData({ ...formData, preferredArea: e.target.value })}
                  placeholder="e.g. Koramangala, Indiranagar, HSR Layout"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>

            {/* Checkbox verification */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  required
                  checked={formData.agreeVerification}
                  onChange={(e) => setFormData({ ...formData, agreeVerification: e.target.checked })}
                  className="mt-0.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-xs text-slate-600 leading-normal">
                  I confirm that all details provided are accurate. I consent to Aadhaar and police verification before onboarding onto the HomeEase platform.
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2"
            >
              <HeartHandshake className="w-5 h-5" />
              <span>Submit Application for Admin Review</span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
            Already a registered partner?{' '}
            <button
              onClick={() => navigate('/login')}
              className="font-bold text-emerald-700 hover:underline"
            >
              Partner Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

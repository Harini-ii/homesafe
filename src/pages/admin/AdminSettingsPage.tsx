import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, Save, ShieldCheck, Phone, Mail, IndianRupee } from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const { showToast } = useApp();

  const [platformFee, setPlatformFee] = useState(49);
  const [helperCommission, setHelperCommission] = useState(0);
  const [emergencyPhone, setEmergencyPhone] = useState('+91 (800) 456-7890');
  const [supportEmail, setSupportEmail] = useState('support@homeease.in');
  const [requireAadhaar, setRequireAadhaar] = useState(true);
  const [maxBookingDays, setMaxBookingDays] = useState(3);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Platform configurations updated successfully!', 'success');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
          Platform Settings & Configurations
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Configure service fees, verification requirements, and operational parameters
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
        <form onSubmit={handleSave} className="space-y-6">
          
          {/* Section 1: Pricing & Fees */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
              1. Fees & Pricing Parameters
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Customer Platform & Insurance Fee (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  value={platformFee}
                  onChange={(e) => setPlatformFee(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl"
                />
                <p className="text-[11px] text-slate-400 mt-1">Added to each booking transparently</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Partner Wage Commission Deduction (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={helperCommission}
                  onChange={(e) => setHelperCommission(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl"
                />
                <p className="text-[11px] text-slate-400 mt-1">0% enables 100% daily wage payout</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Maximum Multi-Day Booking Duration (Days)
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={maxBookingDays}
                onChange={(e) => setMaxBookingDays(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl"
              />
            </div>
          </div>

          {/* Section 2: Verification Rules */}
          <div className="space-y-4 pt-4">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
              2. Onboarding & Safety Rules
            </h2>

            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={requireAadhaar}
                  onChange={(e) => setRequireAadhaar(e.target.checked)}
                  className="rounded text-teal-600 focus:ring-teal-500"
                />
                <span className="text-xs font-semibold text-slate-800">
                  Enforce mandatory manual Admin Approval for all new Service Partners
                </span>
              </label>
              <p className="text-[11px] text-slate-500 pl-5">
                When enabled, partners cannot receive jobs until an administrator reviews their application.
              </p>
            </div>
          </div>

          {/* Section 3: Helpline & Contacts */}
          <div className="space-y-4 pt-4">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
              3. Support Hotlines & Email
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Support Phone</label>
                <input
                  type="text"
                  value={emergencyPhone}
                  onChange={(e) => setEmergencyPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Support Email</label>
                <input
                  type="email"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>Save Configuration</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

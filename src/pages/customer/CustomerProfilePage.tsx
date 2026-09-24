import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, Phone, Mail, MapPin, ShieldCheck, Save } from 'lucide-react';

export const CustomerProfilePage: React.FC = () => {
  const { currentUser, showToast } = useApp();

  const [name, setName] = useState(currentUser?.name || 'Priya Sharma');
  const [phone, setPhone] = useState(currentUser?.phone || '+91 98450 12345');
  const [email, setEmail] = useState(currentUser?.email || 'customer@example.com');
  const [address, setAddress] = useState(currentUser?.address || 'Flat 402, Lotus Apartments, 12th Main Road, Indiranagar');
  const [city, setCity] = useState(currentUser?.city || 'Bengaluru');
  const [pincode, setPincode] = useState(currentUser?.pincode || '560038');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Customer profile details updated successfully!', 'success');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
          Customer Profile & Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Manage your contact credentials and default service addresses
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
        {/* Avatar header */}
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256&q=80'}
            alt={name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-500/20 shadow-xs"
          />
          <div>
            <h2 className="text-lg font-bold text-slate-900">{name}</h2>
            <p className="text-xs text-slate-500">{email} · Customer</p>
            <div className="inline-flex items-center gap-1.5 mt-1 text-[11px] text-teal-700 bg-teal-50 px-2 py-0.5 rounded font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified HomeOwner
            </div>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Primary Residence Address</label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <textarea
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Pincode</label>
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

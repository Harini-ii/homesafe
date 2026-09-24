import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, Phone, Mail, ShieldCheck, MapPin, IndianRupee, Save, Clock } from 'lucide-react';

export const PartnerProfilePage: React.FC = () => {
  const { currentUser, houseHelps, updatePartnerProfile, showToast } = useApp();

  const partner = houseHelps.find((h) => h.id === currentUser?.id || h.email === currentUser?.email) || houseHelps[0];

  const [name, setName] = useState(partner.name);
  const [phone, setPhone] = useState(partner.phone);
  const [email, setEmail] = useState(partner.email);
  const [experienceYears, setExperienceYears] = useState(partner.experienceYears);
  const [pricePerDay, setPricePerDay] = useState(partner.pricePerDay);
  const [bio, setBio] = useState(partner.bio);
  const [preferredAreas, setPreferredAreas] = useState(partner.preferredAreas.join(', '));
  const [services, setServices] = useState<string[]>(partner.services);

  const allAvailableServices = [
    'House Cleaning',
    'Cooking & Kitchen',
    'Washroom Cleaning',
    'Tank Cleaning',
    'Gardening',
    'Laundry',
    'Home Organization',
  ];

  const handleToggleService = (svc: string) => {
    setServices((prev) =>
      prev.includes(svc) ? (prev.length > 1 ? prev.filter((s) => s !== svc) : prev) : [...prev, svc]
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updatePartnerProfile(partner.id, {
      name,
      phone,
      email,
      experienceYears: Number(experienceYears),
      pricePerDay: Number(pricePerDay),
      bio,
      services,
      preferredAreas: preferredAreas.split(',').map((s) => s.trim()),
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
          Partner Profile & Skills
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Manage your personal verification credentials, daily rates, and service offerings
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
        {/* Verification banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <img
              src={partner.avatar}
              alt={partner.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500/20 shadow-xs"
            />
            <div>
              <h2 className="text-lg font-bold text-slate-900">{partner.name}</h2>
              <p className="text-xs text-slate-500">{partner.email}</p>
              <div className="mt-1">
                {partner.approvalStatus === 'approved' ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Verified Service Partner
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    Approval Pending
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <p className="text-xs text-slate-400">Total Jobs Done</p>
            <p className="text-xl font-extrabold text-slate-900">{partner.completedJobs}</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Phone</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Domestic Experience (Years)</label>
              <input
                type="number"
                min="0"
                max="40"
                required
                value={experienceYears}
                onChange={(e) => setExperienceYears(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Expected Daily Rate (₹ / Day)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">₹</span>
                <input
                  type="number"
                  min="300"
                  max="3000"
                  step="50"
                  required
                  value={pricePerDay}
                  onChange={(e) => setPricePerDay(Number(e.target.value))}
                  className="w-full pl-7 pr-3 py-2 text-xs border border-slate-300 rounded-xl"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Localities / Areas</label>
            <input
              type="text"
              required
              value={preferredAreas}
              onChange={(e) => setPreferredAreas(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl"
            />
          </div>

          {/* Services Checklist */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Select Services You Provide ({services.length} selected)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {allAvailableServices.map((svc) => {
                const isSelected = services.includes(svc);
                return (
                  <button
                    key={svc}
                    type="button"
                    onClick={() => handleToggleService(svc)}
                    className={`p-2.5 rounded-xl border text-xs font-medium text-left flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <span>{svc}</span>
                    <span className="text-[11px] font-bold text-emerald-700">
                      {isSelected ? '✓' : ''}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Bio & Experience Summary</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>Save Partner Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

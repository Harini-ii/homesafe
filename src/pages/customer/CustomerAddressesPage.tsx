import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Address } from '../../types';
import { MapPin, Plus, Trash2, CheckCircle2, Home, Building2, Briefcase } from 'lucide-react';

export const CustomerAddressesPage: React.FC = () => {
  const { addresses, addAddress, setDefaultAddress, deleteAddress } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);

  const [formData, setFormData] = useState({
    type: 'Home' as 'Home' | 'Work' | 'Other',
    flatNo: '',
    area: '',
    landmark: '',
    city: 'Bengaluru',
    pincode: '560038',
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAddress({
      type: formData.type,
      flatNo: formData.flatNo,
      area: formData.area,
      landmark: formData.landmark,
      city: formData.city,
      pincode: formData.pincode,
    });
    setFormData({
      type: 'Home',
      flatNo: '',
      area: '',
      landmark: '',
      city: 'Bengaluru',
      pincode: '560038',
    });
    setShowAddModal(false);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'Work':
        return Briefcase;
      case 'Other':
        return Building2;
      default:
        return Home;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
            Saved Service Addresses
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Manage your service destinations for faster one-tap booking
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Address</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((addr) => {
          const Icon = getIcon(addr.type);
          return (
            <div
              key={addr.id}
              className={`p-5 rounded-2xl border transition-all bg-white relative flex flex-col justify-between ${
                addr.isDefault ? 'border-teal-500 shadow-xs ring-1 ring-teal-500' : 'border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-sm text-slate-900">{addr.type}</span>
                  </div>

                  {addr.isDefault && (
                    <span className="text-[11px] font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Default
                    </span>
                  )}
                </div>

                <p className="text-xs font-semibold text-slate-800">{addr.flatNo}</p>
                <p className="text-xs text-slate-600 mt-0.5">{addr.area}</p>
                {addr.landmark && <p className="text-xs text-slate-500 italic mt-0.5">Near: {addr.landmark}</p>}
                <p className="text-xs text-slate-500 mt-1">{addr.city} - {addr.pincode}</p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                {!addr.isDefault ? (
                  <button
                    onClick={() => setDefaultAddress(addr.id)}
                    className="text-teal-700 font-semibold hover:underline"
                  >
                    Set as Default
                  </button>
                ) : (
                  <span className="text-slate-400 text-[11px]">Primary delivery address</span>
                )}

                <button
                  onClick={() => deleteAddress(addr.id)}
                  className="text-rose-600 hover:text-rose-700 p-1 rounded"
                  title="Delete address"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Address Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">Add New Address</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Address Label</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Home', 'Work', 'Other'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setFormData({ ...formData, type: t as any })}
                      className={`py-1.5 text-xs font-semibold rounded-lg border text-center ${
                        formData.type === t
                          ? 'border-teal-600 bg-teal-50 text-teal-800'
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">House / Flat / Building No. *</label>
                <input
                  type="text"
                  required
                  value={formData.flatNo}
                  onChange={(e) => setFormData({ ...formData, flatNo: e.target.value })}
                  placeholder="e.g. Flat 204, Green Glen Layout"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Street / Area / Locality *</label>
                <input
                  type="text"
                  required
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  placeholder="e.g. Bellandur Main Road"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Landmark (Optional)</label>
                <input
                  type="text"
                  value={formData.landmark}
                  onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                  placeholder="e.g. Opposite Central Mall"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Pincode *</label>
                  <input
                    type="text"
                    required
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 text-xs font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

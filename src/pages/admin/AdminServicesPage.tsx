import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, Edit2, Sparkles, Clock, IndianRupee, Layers } from 'lucide-react';

export const AdminServicesPage: React.FC = () => {
  const { categories, addSubService } = useApp();

  const [selectedCatId, setSelectedCatId] = useState<string>(categories[0]?.id || 'house-cleaning');
  const [showAddSubModal, setShowAddSubModal] = useState(false);

  const [subName, setSubName] = useState('');
  const [subDesc, setSubDesc] = useState('');
  const [subBasePrice, setSubBasePrice] = useState(450);
  const [subDurationHours, setSubDurationHours] = useState(2);

  const activeCategory = categories.find((c) => c.id === selectedCatId) || categories[0];

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subName.trim()) return;

    addSubService(activeCategory.id, {
      name: subName,
      description: subDesc,
      basePrice: Number(subBasePrice),
      durationHours: Number(subDurationHours),
    });

    setSubName('');
    setSubDesc('');
    setShowAddSubModal(false);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
            Service Catalog & Sub-Services
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Manage household categories, standard checklists, base rates, and estimated hours
          </p>
        </div>

        <button
          onClick={() => setShowAddSubModal(true)}
          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Task to {activeCategory.name}</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCatId(cat.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              selectedCatId === cat.id
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <span>{cat.name}</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                selectedCatId === cat.id ? 'bg-slate-800 text-white' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {cat.services.length}
            </span>
          </button>
        ))}
      </div>

      {/* Selected Category Details */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">{activeCategory.name}</h2>
            <p className="text-xs text-slate-500 mt-0.5">{activeCategory.description}</p>
          </div>
          <span className="text-xs font-semibold text-slate-400">
            {activeCategory.services.length} Sub-Services Configured
          </span>
        </div>

        {/* Sub-Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeCategory.services.map((sub) => (
            <div
              key={sub.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900">{sub.name}</h3>
                  <span className="font-mono text-[10px] text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                    #{sub.id}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{sub.description}</p>
              </div>

              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                  <IndianRupee className="w-3.5 h-3.5 text-teal-600" />
                  <span>Base rate ₹{sub.basePrice || sub.startingPrice}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>~{sub.durationHours ? `${sub.durationHours} hrs` : sub.estimatedDuration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Sub-Service Modal */}
      {showAddSubModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">Add Task to {activeCategory.name}</h3>
              <button onClick={() => setShowAddSubModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Sub-Service / Task Name *</label>
                <input
                  type="text"
                  required
                  value={subName}
                  onChange={(e) => setSubName(e.target.value)}
                  placeholder="e.g. Balcony Pressure Wash"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description *</label>
                <textarea
                  rows={2}
                  required
                  value={subDesc}
                  onChange={(e) => setSubDesc(e.target.value)}
                  placeholder="Specify what this task includes..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Base Price (₹) *</label>
                  <input
                    type="number"
                    min="100"
                    step="50"
                    required
                    value={subBasePrice}
                    onChange={(e) => setSubBasePrice(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Est. Duration (Hours) *</label>
                  <input
                    type="number"
                    min="0.5"
                    step="0.5"
                    required
                    value={subDurationHours}
                    onChange={(e) => setSubDurationHours(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddSubModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 text-xs font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl"
                >
                  Add Sub-Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

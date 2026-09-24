import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Search,
  Clock,
  ArrowRight,
  UtensilsCrossed,
  Bath,
  Droplets,
  Trees,
  Shirt,
  Package,
  CheckCircle2,
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { categories, navigate } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'house-cleaning':
        return Sparkles;
      case 'cooking-kitchen':
        return UtensilsCrossed;
      case 'washroom-cleaning':
        return Bath;
      case 'tank-cleaning':
        return Droplets;
      case 'gardening':
        return Trees;
      case 'laundry':
        return Shirt;
      case 'home-organization':
        return Package;
      default:
        return Sparkles;
    }
  };

  const filteredCategories = categories.filter((cat) => {
    if (selectedCategory !== 'all' && cat.id !== selectedCategory) return false;
    if (!searchQuery) return true;

    const q = searchQuery.toLowerCase();
    const catMatches = cat.name.toLowerCase().includes(q) || cat.description.toLowerCase().includes(q);
    const subMatches = cat.services.some(
      (s) => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
    );
    return catMatches || subMatches;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">Services Catalog</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          Comprehensive Household Care Services
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          From deep cleaning and sparkling washroom sanitation to homestyle cooking and garden care. Select individual services or book full-day house help packages.
        </p>

        {/* Search Bar */}
        <div className="pt-4 max-w-md mx-auto">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services (e.g., cooking, floor, wardrobe)..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all shadow-xs"
            />
          </div>
        </div>
      </div>

      {/* Category Tabs (interactive buttons) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
            selectedCategory === 'all'
              ? 'bg-slate-900 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          All Categories ({categories.length})
        </button>
        {categories.map((cat) => {
          const Icon = getCategoryIcon(cat.id);
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Categories & Subservices List */}
      <div className="space-y-12">
        {filteredCategories.map((category) => {
          const Icon = getCategoryIcon(category.id);
          const matchingServices = category.services.filter((s) => {
            if (!searchQuery) return true;
            const q = searchQuery.toLowerCase();
            return s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q);
          });

          if (matchingServices.length === 0) return null;

          return (
            <div key={category.id} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{category.name}</h2>
                  <p className="text-xs text-slate-500">{category.description}</p>
                </div>
              </div>

              {/* Subservices Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {matchingServices.map((sub) => (
                  <div
                    key={sub.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between hover:border-slate-300 hover:shadow-sm transition-all"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-bold text-slate-900 text-sm">{sub.name}</h3>
                        {sub.isPopular && (
                          <span className="text-[10px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                            Popular
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                        {sub.description}
                      </p>

                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Est. duration: {sub.estimatedDuration}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Starts from</span>
                        <span className="text-base font-extrabold text-slate-900 tabular-nums">₹{sub.startingPrice}</span>
                      </div>

                      <button
                        onClick={() => navigate('/customer/book')}
                        className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
                      >
                        <span>Book Now</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {filteredCategories.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
            <p className="text-base font-bold text-slate-800">No services found</p>
            <p className="text-xs text-slate-500 mt-1">Try searching for other terms like cleaning, cooking, or laundry.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

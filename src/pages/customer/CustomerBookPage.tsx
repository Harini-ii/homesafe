import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RatingStars } from '../../components/common/RatingStars';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  Star,
  Users,
  UtensilsCrossed,
  Bath,
  Droplets,
  Trees,
  Shirt,
  Package,
} from 'lucide-react';

export const CustomerBookPage: React.FC = () => {
  const { categories, houseHelps, currentUser, addresses, createBooking, navigate } = useApp();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Form selections
  const [selectedCategory, setSelectedCategory] = useState<string>('house-cleaning');
  const [selectedSubServices, setSelectedSubServices] = useState<string[]>(['svc-clean-1']);
  const [selectedHelperId, setSelectedHelperId] = useState<string>('hp-001');
  const [durationDays, setDurationDays] = useState<1 | 2 | 3>(2);
  const [startDate, setStartDate] = useState<string>('2026-09-28');
  const [timeSlot, setTimeSlot] = useState<string>('Morning (08:00 AM - 12:00 PM)');
  const [selectedAddress, setSelectedAddress] = useState<string>(
    currentUser?.address || 'Flat 402, Lotus Apartments, 12th Main Road, Indiranagar'
  );
  const [city, setCity] = useState<string>(currentUser?.city || 'Bengaluru');
  const [notes, setNotes] = useState<string>('Please focus on window sill dusting and living room floor scrub.');

  const categoryObj = categories.find((c) => c.id === selectedCategory) || categories[0];
  const helperObj = houseHelps.find((h) => h.id === selectedHelperId) || houseHelps[0];

  // Helper toggle subservice
  const toggleSubService = (subId: string) => {
    setSelectedSubServices((prev) =>
      prev.includes(subId) ? (prev.length > 1 ? prev.filter((id) => id !== subId) : prev) : [...prev, subId]
    );
  };

  // Generate multi-day date strings
  const getCalculatedDates = (): string[] => {
    const dates: string[] = [];
    const base = new Date(startDate || '2026-09-28');
    for (let i = 0; i < durationDays; i++) {
      const nextDate = new Date(base);
      nextDate.setDate(base.getDate() + i);
      dates.push(nextDate.toISOString().split('T')[0]);
    }
    return dates;
  };

  const calculatedDates = getCalculatedDates();
  const dailyRate = helperObj.pricePerDay;
  const serviceTotal = dailyRate * durationDays;
  const platformFee = 49;
  const totalPayable = serviceTotal + platformFee;

  const handleFinalBooking = () => {
    const subNames = categoryObj.services
      .filter((s) => selectedSubServices.includes(s.id))
      .map((s) => s.name);

    createBooking({
      categoryName: categoryObj.name,
      subServiceIds: selectedSubServices,
      subServiceNames: subNames.length > 0 ? subNames : [categoryObj.name],
      durationDays,
      dates: calculatedDates,
      timeSlot,
      helperId: helperObj.id,
      customerAddress: selectedAddress,
      city,
      notes,
    });

    navigate('/customer/bookings');
  };

  const getCatIcon = (id: string) => {
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

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
          Schedule Household Service
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Complete the 4-step workflow to match with background-verified house help
        </p>
      </div>

      {/* Stepper Progress */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs">
        <div className="grid grid-cols-4 gap-2 text-center">
          {[
            { num: 1, title: 'Service' },
            { num: 2, title: 'House Help' },
            { num: 3, title: 'Duration & Date' },
            { num: 4, title: 'Confirm & Pay' },
          ].map((s) => {
            const isDone = s.num < currentStep;
            const isCurrent = s.num === currentStep;

            return (
              <div key={s.num} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs mb-1.5 transition-colors ${
                    isDone
                      ? 'bg-teal-600 text-white'
                      : isCurrent
                      ? 'bg-slate-900 text-white ring-4 ring-slate-100'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {isDone ? '✓' : s.num}
                </div>
                <span
                  className={`text-[11px] font-semibold truncate ${
                    isCurrent ? 'text-slate-900' : isDone ? 'text-teal-700' : 'text-slate-400'
                  }`}
                >
                  {s.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 1: Select Category & Subservices */}
      {currentStep === 1 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-1">Step 1: Choose a Service Category</h2>
            <p className="text-xs text-slate-500">Pick the primary household service you need help with.</p>
          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {categories.map((cat) => {
              const Icon = getCatIcon(cat.id);
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setSelectedSubServices([cat.services[0].id]);
                  }}
                  className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    isSelected
                      ? 'border-teal-600 bg-teal-50/70 shadow-xs ring-1 ring-teal-500'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2 ${
                      isSelected ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className={`font-bold text-xs ${isSelected ? 'text-teal-950' : 'text-slate-900'}`}>
                      {cat.name}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{cat.services.length} options</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Subservices Checklist */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <div>
              <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Select Specific Tasks for {categoryObj.name}
              </p>
              <p className="text-xs text-slate-500">You can select multiple checklist items.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {categoryObj.services.map((sub) => {
                const checked = selectedSubServices.includes(sub.id);
                return (
                  <div
                    key={sub.id}
                    onClick={() => toggleSubService(sub.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                      checked
                        ? 'border-teal-500 bg-teal-50/50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-xs text-slate-900">{sub.name}</p>
                      <p className="text-[11px] text-slate-500">{sub.description}</p>
                    </div>
                    <span
                      className={`w-5 h-5 rounded-md border flex items-center justify-center text-xs shrink-0 ${
                        checked ? 'bg-teal-600 border-teal-600 text-white' : 'border-slate-300 bg-white'
                      }`}
                    >
                      {checked && '✓'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-2"
            >
              <span>Next: Select House Help</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Choose House Help */}
      {currentStep === 2 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-1">Step 2: Select a Service Partner</h2>
              <p className="text-xs text-slate-500">All partners are verified with background screening and customer reviews.</p>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              Showing verified matches
            </span>
          </div>

          {/* Helpers List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {houseHelps.filter((h) => h.approvalStatus === 'approved').map((helper) => {
              const isSelected = selectedHelperId === helper.id;

              return (
                <div
                  key={helper.id}
                  onClick={() => setSelectedHelperId(helper.id)}
                  className={`p-4 rounded-2xl border cursor-pointer flex flex-col justify-between transition-all ${
                    isSelected
                      ? 'border-teal-600 bg-teal-50/50 shadow-sm ring-1 ring-teal-500'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-start gap-3.5 mb-3">
                      <img
                        src={helper.avatar}
                        alt={helper.name}
                        className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-sm text-slate-900">{helper.name}</h3>
                          <span
                            className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                              isSelected ? 'bg-teal-600 border-teal-600 text-white' : 'border-slate-300'
                            }`}
                          >
                            {isSelected && '✓'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                          <RatingStars rating={helper.rating} size="sm" showScore />
                          <span>·</span>
                          <span>{helper.experienceYears}y exp</span>
                        </div>
                        <p className="text-[11px] text-teal-700 font-medium mt-1">
                          Verified Aadhaar & Clean Police Record
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 mb-3 leading-relaxed">
                      {helper.bio}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {helper.preferredAreas.slice(0, 2).map((a) => (
                        <span key={a} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Daily Rate</span>
                      <span className="text-sm font-extrabold text-slate-900 tabular-nums">₹{helper.pricePerDay} / day</span>
                    </div>
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${
                        isSelected ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {isSelected ? 'Selected' : 'Choose'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-semibold flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-2"
            >
              <span>Next: Date & Duration</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Select Duration & Dates */}
      {currentStep === 3 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-1">Step 3: Choose Date & Duration</h2>
            <p className="text-xs text-slate-500">Select multi-day duration and convenient working hours.</p>
          </div>

          {/* Multi-day duration cards (1, 2, or 3 Days) */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
              Booking Duration *
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((days) => (
                <button
                  key={days}
                  type="button"
                  onClick={() => setDurationDays(days as 1 | 2 | 3)}
                  className={`p-4 rounded-xl border text-center transition-all ${
                    durationDays === days
                      ? 'border-teal-600 bg-teal-50/70 shadow-xs ring-1 ring-teal-500'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <p className="text-xl font-extrabold text-slate-900 tabular-nums">{days} Day{days > 1 ? 's' : ''}</p>
                  <p className="text-xs text-slate-500 mt-1">₹{dailyRate * days}</p>
                  {days === 3 && (
                    <span className="inline-block mt-1 text-[10px] bg-teal-600 text-white px-1.5 py-0.5 rounded font-bold">
                      Best Value
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Start Date Picker */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                Service Start Date *
              </label>
              <input
                type="date"
                required
                value={startDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                Daily Time Slot *
              </label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              >
                <option value="Morning (08:00 AM - 12:00 PM)">Morning (08:00 AM - 12:00 PM)</option>
                <option value="Afternoon (12:00 PM - 04:00 PM)">Afternoon (12:00 PM - 04:00 PM)</option>
                <option value="Evening (04:00 PM - 08:00 PM)">Evening (04:00 PM - 08:00 PM)</option>
                <option value="Full Day (08:00 AM - 05:00 PM)">Full Day (08:00 AM - 05:00 PM)</option>
              </select>
            </div>
          </div>

          {/* Multi-day schedule preview */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <p className="text-xs font-bold text-slate-700 mb-2">Scheduled Working Days Preview:</p>
            <div className="flex flex-wrap gap-2">
              {calculatedDates.map((dateStr, idx) => (
                <div
                  key={dateStr}
                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 shadow-2xs flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5 text-teal-600" />
                  <span>Day {idx + 1}: {dateStr}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-semibold flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setCurrentStep(4)}
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-2"
            >
              <span>Next: Review & Confirm</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Address, Transparent Price & Confirm */}
      {currentStep === 4 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-1">Step 4: Confirm Booking & Price Breakdown</h2>
            <p className="text-xs text-slate-500">Review your schedule, service address, and transparent fees.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left: Address and Notes */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                  Service Address *
                </label>
                <textarea
                  rows={2}
                  required
                  value={selectedAddress}
                  onChange={(e) => setSelectedAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                  City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                  Instructions / Preferences for Helper
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Please bring dry mopping cloth, gate code #4412, no spicy cooking..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>
            </div>

            {/* Right: Booking Summary & Transparent Price Breakdown */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col justify-between space-y-4">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Order Summary</p>
                
                <div className="space-y-2.5 text-xs text-slate-700">
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-900">Service:</span>
                    <span>{categoryObj.name}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-900">Assigned Partner:</span>
                    <span>{helperObj.name}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-900">Duration:</span>
                    <span>{durationDays} Day{durationDays > 1 ? 's' : ''}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-900">Time Slot:</span>
                    <span className="text-right max-w-[170px] truncate">{timeSlot}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-900">Dates:</span>
                    <span>{calculatedDates.join(', ')}</span>
                  </div>
                </div>

                {/* Price Table */}
                <div className="mt-4 pt-4 border-t border-slate-200 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Helper Daily Wage (₹{dailyRate} × {durationDays} days)</span>
                    <span className="tabular-nums font-semibold text-slate-800">₹{serviceTotal}</span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>Platform Insurance & Safety Fee</span>
                    <span className="tabular-nums font-semibold text-slate-800">₹{platformFee}</span>
                  </div>

                  <div className="pt-2 border-t border-slate-300 flex justify-between text-sm font-extrabold text-slate-950">
                    <span>Total Amount</span>
                    <span className="tabular-nums text-teal-700">₹{totalPayable}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 pt-1">
                    * Helper receives 100% of their daily wage upon completion of each day.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleFinalBooking}
                  className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-teal-600/20 flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm & Schedule Booking</span>
                </button>
              </div>
            </div>

          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(3)}
              className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-semibold flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CalendarCheck,
  Clock,
  CheckCircle2,
  Users,
  Star,
  ChevronRight,
  UtensilsCrossed,
  Bath,
  Droplets,
  Trees,
  Shirt,
  Package,
  HeartHandshake,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { categories, navigate, houseHelps } = useApp();

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

  return (
    <div className="space-y-20 sm:space-y-28 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 lg:pt-14 lg:pb-20 border-b border-slate-100 bg-linear-to-b from-teal-50/40 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100/70 border border-teal-200/80 text-teal-800 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
                <span>100% Background-Checked Household Professionals</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.1] text-balance">
                Reliable, respectful house help for modern homes.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                Book verified domestic cleaners, skilled home cooks, and housekeepers for 1, 2, or 3 days. Punctual arrival, fair daily rates, and total peace of mind.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={() => navigate('/customer/book')}
                  className="px-6 py-3.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold text-sm shadow-md shadow-teal-600/20 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Book a Service</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  onClick={() => navigate('/become-partner')}
                  className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Users className="w-4 h-4 text-slate-500" />
                  <span>Become a Service Partner</span>
                </button>
              </div>

              {/* Social Proof adjacency */}
              <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 max-w-md">
                <div>
                  <p className="text-2xl font-extrabold text-slate-900 tabular-nums">4.88</p>
                  <div className="flex items-center gap-1 text-amber-500 my-0.5">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <Star className="w-3 h-3 fill-amber-400" />
                    <Star className="w-3 h-3 fill-amber-400" />
                    <Star className="w-3 h-3 fill-amber-400" />
                    <Star className="w-3 h-3 fill-amber-400" />
                  </div>
                  <p className="text-xs text-slate-500">Customer Rating</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-slate-900 tabular-nums">1,200+</p>
                  <p className="text-xs text-slate-700 font-semibold my-0.5">Verified</p>
                  <p className="text-xs text-slate-500">Active Helpers</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-slate-900 tabular-nums">1-3 Days</p>
                  <p className="text-xs text-slate-700 font-semibold my-0.5">Flexible</p>
                  <p className="text-xs text-slate-500">Booking Terms</p>
                </div>
              </div>
            </div>

            {/* Right Media Slot */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/80 aspect-4/3 sm:aspect-16/10 lg:aspect-4/3">
                <img
                  src="/src/assets/images/hero_household_service_1790248524704.jpg"
                  alt="Professional home cleaning partner"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">Live in Bengaluru</span>
                  </div>
                  <p className="font-bold text-base text-white">Punctual & respectful doorstep help</p>
                  <p className="text-xs text-slate-200">Starting from ₹500/day with transparent payouts</p>
                </div>
              </div>

              {/* Floating verified card */}
              <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-white p-3.5 rounded-xl shadow-lg border border-slate-200 items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-slate-900">Aadhaar & Police Verified</p>
                  <p className="text-slate-500">Zero tolerance safety policy</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Service Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <p className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-1">Service Categories</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Everything your household needs, on demand
            </h2>
          </div>
          <button
            onClick={() => navigate('/services')}
            className="text-sm font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1 group"
          >
            <span>View All Categories & Subservices</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat) => {
            const Icon = getCategoryIcon(cat.id);
            const minPrice = Math.min(...cat.services.map((s) => s.startingPrice));

            return (
              <div
                key={cat.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 hover:border-teal-500/50 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4 group-hover:scale-105 group-hover:bg-teal-600 group-hover:text-white transition-all">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-bold text-slate-900 text-base mb-1.5">{cat.name}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Subservices list */}
                  <div className="space-y-1 mb-5">
                    {cat.services.slice(0, 3).map((sub) => (
                      <div key={sub.id} className="flex items-center gap-1.5 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span className="truncate">{sub.name}</span>
                      </div>
                    ))}
                    {cat.services.length > 3 && (
                      <p className="text-[11px] text-teal-600 font-semibold pl-5">
                        +{cat.services.length - 3} more services
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Starts at</span>
                    <span className="text-sm font-extrabold text-slate-900 tabular-nums">₹{minPrice}</span>
                  </div>

                  <button
                    onClick={() => navigate('/customer/book')}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-teal-600 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
                  >
                    <span>Book</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Visual Feature Rest Section (2 Featured Showcase Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Cooking */}
          <div className="bg-slate-900 rounded-2xl overflow-hidden text-white relative flex flex-col justify-end min-h-[320px] p-6 sm:p-8">
            <img
              src="/src/assets/images/service_cooking_kitchen_1790248544188.jpg"
              alt="Fresh home cooking service"
              className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity"
              referrerPolicy="no-referrer"
            />
            <div className="relative z-10 space-y-2 max-w-md">
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Chef & Cook Services</span>
              <h3 className="text-2xl font-bold text-white">Homestyle Meals Prepared Just As You Like</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Vegetable prep, kneading rotis, slow simmering dal, and spotless kitchen tidying after every meal.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => navigate('/customer/book')}
                  className="px-4 py-2 bg-white text-slate-950 font-semibold text-xs rounded-xl hover:bg-slate-100 transition-colors inline-flex items-center gap-2"
                >
                  <span>Book a Home Cook</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Deep Cleaning */}
          <div className="bg-slate-900 rounded-2xl overflow-hidden text-white relative flex flex-col justify-end min-h-[320px] p-6 sm:p-8">
            <img
              src="/src/assets/images/service_house_cleaning_1790248567748.jpg"
              alt="Sparkling home cleaning"
              className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity"
              referrerPolicy="no-referrer"
            />
            <div className="relative z-10 space-y-2 max-w-md">
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Multi-Day House Cleaning</span>
              <h3 className="text-2xl font-bold text-white">Spotless Living Rooms, Balconies & Floors</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Book for 1, 2, or 3 days. Cleaners handle thorough dusting, vacuuming, wall tile scrub, and trash clearance.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => navigate('/customer/book')}
                  className="px-4 py-2 bg-white text-slate-950 font-semibold text-xs rounded-xl hover:bg-slate-100 transition-colors inline-flex items-center gap-2"
                >
                  <span>Schedule Deep Clean</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section (5 steps) */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-1">Simple Booking Workflow</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
            How HomeEase Works in 5 Easy Steps
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            No endless phone calls or unverified agencies. Transparent domestic assistance in under 2 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            {
              step: '01',
              title: 'Choose a Service',
              desc: 'Select from House Cleaning, Cooking, Washroom, Gardening, Laundry, or Tank Cleaning.',
              icon: Sparkles,
            },
            {
              step: '02',
              title: 'Select a House Help',
              desc: 'Review transparent partner profiles, badges, ratings, and past job histories.',
              icon: Users,
            },
            {
              step: '03',
              title: 'Choose Date & Duration',
              desc: 'Pick 1 day, 2 days, or 3 days with morning, afternoon, or evening time slots.',
              icon: CalendarCheck,
            },
            {
              step: '04',
              title: 'Confirm Booking',
              desc: 'Review the transparent daily breakdown and clear upfront platform pricing.',
              icon: CheckCircle2,
            },
            {
              step: '05',
              title: 'Get the Service',
              desc: 'Your vetted partner arrives on time. Track daily completion and rate after work.',
              icon: HeartHandshake,
            },
          ].map((item) => (
            <div
              key={item.step}
              className="bg-white p-5 rounded-2xl border border-slate-200/90 relative flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-extrabold text-teal-600 block mb-3 font-mono">
                  {item.step}.
                </span>
                <h3 className="font-bold text-slate-900 text-sm mb-2">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Service Partners Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-1">Top Rated Partners</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Meet our top-rated house helps
            </h2>
          </div>
          <button
            onClick={() => navigate('/customer/book')}
            className="text-xs font-semibold text-teal-700 hover:text-teal-800"
          >
            View All Helpers →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {houseHelps.slice(0, 3).map((helper) => (
            <div
              key={helper.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between hover:border-slate-300 transition-all"
            >
              <div>
                <div className="flex items-start gap-3.5 mb-3.5">
                  <img
                    src={helper.avatar}
                    alt={helper.name}
                    className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0"
                  />
                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-900 text-base">{helper.name}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                      <span className="font-bold text-slate-800 tabular-nums">{helper.rating.toFixed(1)}</span>
                      <span>·</span>
                      <span>{helper.experienceYears} yrs exp</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{helper.preferredAreas.slice(0, 2).join(', ')}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                  {helper.bio}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {helper.services.map((svc) => (
                    <span key={svc} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                      {svc}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Daily Rate</span>
                  <span className="text-sm font-extrabold text-slate-900 tabular-nums">₹{helper.pricePerDay} / day</span>
                </div>
                <button
                  onClick={() => navigate('/customer/book')}
                  className="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  Select Helper
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="bg-slate-50 py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-1">Verified Customer Reviews</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Trusted by 10,000+ households
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "Sunita Devi helped us with a 3-day deep cleaning before Diwali. She was punctual, gentle with our glassware, and made the home sparkling clean.",
                name: "Priya Sharma",
                location: "Indiranagar, Bengaluru",
                role: "Product Manager",
                rating: 5,
              },
              {
                quote: "Finding an authentic cook who understands low-oil North Indian meals was nearly impossible until HomeEase. Meena ji is an absolute culinary gem.",
                name: "Vikram Sengupta",
                location: "Whitefield, Bengaluru",
                role: "Senior Architect",
                rating: 5,
              },
              {
                quote: "Transparent pricing per day with no agency cuts under the table. Being able to track each working day gave our family complete confidence.",
                name: "Ananya Deshmukh",
                location: "Bellandur, Bengaluru",
                role: "Doctor",
                rating: 5,
              },
            ].map((t, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
                    "{t.quote}"
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <p className="font-bold text-sm text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role} · {t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Onboarding CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-teal-900 rounded-3xl p-8 sm:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-2xl text-center lg:text-left">
            <span className="text-xs font-bold text-teal-300 uppercase tracking-wider">Partner With Us</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Are you an experienced domestic helper or cook?
            </h2>
            <p className="text-sm text-teal-100/90 leading-relaxed">
              Earn ₹18,000 to ₹35,000 monthly with guaranteed daily payouts, transparent terms, free insurance protection, and respect you deserve.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => navigate('/become-partner')}
              className="px-6 py-3.5 bg-white text-teal-950 font-bold text-sm rounded-xl hover:bg-teal-50 transition-colors shadow-md"
            >
              Become a Service Partner
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-3.5 bg-teal-800 text-white font-semibold text-sm rounded-xl hover:bg-teal-700 transition-colors border border-teal-700"
            >
              Partner Login
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

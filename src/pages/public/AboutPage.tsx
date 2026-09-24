import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ShieldCheck, HeartHandshake, CheckCircle2, Award, Users, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="space-y-16 py-8">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          <span>Our Story & Mission</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
          Dignified Livelihoods, Reliable Households
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          HomeEase was founded to transform the unorganized household help sector into an empowered, professional, and transparent ecosystem. We connect quality homeowners with background-verified house helpers while safeguarding fair daily wages.
        </p>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-3">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-slate-900">Zero Compromise on Trust</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every house help on our platform undergoes government identity verification, domestic background checks, and residential verification before entering your home.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-slate-900">100% Direct Daily Wages</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Unlike traditional agencies that levy heavy commissions on blue-collar workers, HomeEase takes 0% commission from the helper's daily wage. Payouts credit instantly to their wallet.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-3">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-slate-900">Multi-Day Flexibility</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Whether you need assistance during festive season, weekend deep cleaning, or everyday cooking, book helpers for 1, 2, or 3 days with standardized checklist execution.
          </p>
        </div>
      </div>

      {/* Call to action */}
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Ready to experience effortless home care?</h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Join thousands of satisfied urban households across Bengaluru and major metro cities.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate('/customer/book')}
            className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition-colors flex items-center justify-center gap-2"
          >
            <span>Book a Helper</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate('/register/partner')}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs sm:text-sm transition-colors"
          >
            Become a Partner
          </button>
        </div>
      </div>
    </div>
  );
};

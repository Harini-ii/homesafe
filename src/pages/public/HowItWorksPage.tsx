import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, ArrowRight, ShieldCheck, Calendar, Clock, Star, HeartHandshake } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const { navigate } = useApp();

  const steps = [
    {
      num: '01',
      title: 'Choose Your Service Category',
      desc: 'Select from House Cleaning, Cooking, Washroom Deep Cleaning, Tank Maintenance, Gardening, Laundry, or Home Organization. Pick the specific tasks you need done.',
    },
    {
      num: '02',
      title: 'Browse Verified House Helps',
      desc: 'View comprehensive profiles with background verification badges, past customer rating scores, years of domestic experience, and transparent daily rates.',
    },
    {
      num: '03',
      title: 'Pick Dates & Daily Duration',
      desc: 'Schedule help for 1 day, 2 days, or 3 days at convenient morning, afternoon, or full-day slots. Multi-day schedules are locked in advance.',
    },
    {
      num: '04',
      title: 'Transparent Checkout & Booking',
      desc: 'Review honest price breakdown with no hidden charges. Payouts are safely held and disbursed to the helper at the completion of each working day.',
    },
    {
      num: '05',
      title: 'Relax & Enjoy Spotless Home',
      desc: 'Your assigned verified helper arrives on time, performs the standardized checklist, and you sign off with your rating and review.',
    },
  ];

  return (
    <div className="space-y-16 py-8">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
          How HomeEase Works
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          From booking to completion in 5 seamless steps — engineered for peace of mind, consistency, and respect for service partners.
        </p>
      </div>

      {/* Steps List */}
      <div className="max-w-4xl mx-auto space-y-6">
        {steps.map((step, idx) => (
          <div
            key={step.num}
            className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white flex flex-col sm:flex-row items-start gap-6 shadow-2xs hover:border-slate-300 transition-all"
          >
            <div className="text-3xl sm:text-4xl font-black font-mono text-teal-600 bg-teal-50 px-4 py-2 rounded-2xl shrink-0">
              {step.num}
            </div>
            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-bold text-slate-950">{step.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Booking CTA banner */}
      <div className="text-center space-y-4 py-6">
        <h2 className="text-2xl font-bold text-slate-900">Experience the difference today</h2>
        <button
          onClick={() => navigate('/customer/book')}
          className="px-8 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-teal-600/20 inline-flex items-center gap-2"
        >
          <span>Schedule a Helper Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

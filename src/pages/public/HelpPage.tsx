import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LifeBuoy, Search, Phone, Mail, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

export const HelpPage: React.FC = () => {
  const { navigate } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does multi-day household booking work?',
      a: 'You can book a verified house help for 1, 2, or 3 days. Each day features independent daily check-in and checkout. Your assigned partner arrives at your chosen time slot every morning/afternoon.',
    },
    {
      q: 'What is the background verification process?',
      a: 'Every HomeEase service partner undergoes rigorous government ID (Aadhaar/PAN) verification, criminal background records verification, and past employment history cross-referencing before their profile is approved by our operations team.',
    },
    {
      q: 'Can I reschedule or cancel a booking?',
      a: 'Yes, upcoming bookings can be cancelled or rescheduled up to 4 hours before the first scheduled time slot with zero cancellation fees. Instant refund is credited to your payment method.',
    },
    {
      q: 'What if I am dissatisfied with the service?',
      a: 'We offer a 100% Satisfaction Guarantee. If the cleaning or cooking was substandard, raise a support ticket and we will assign a replacement helper free of charge or issue a proportionate refund.',
    },
    {
      q: 'How do partners receive payouts?',
      a: 'Partners receive 100% of their daily wage directly credited to their in-app wallet immediately upon completing each scheduled day. They can withdraw to their bank account anytime with 0% platform wage deduction.',
    },
    {
      q: 'What safety precautions are taken?',
      a: 'All house helps wear verified photo ID badges, follow domestic hygiene protocols, and are covered by HomeEase Damage & Accident Protection during their service hours.',
    },
  ];

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12 py-8 max-w-4xl mx-auto">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
          <LifeBuoy className="w-3.5 h-3.5 text-teal-600" />
          <span>HomeEase Help Center</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
          How Can We Help You?
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Find instant answers to common questions about house help bookings, safety standards, and partner earnings.
        </p>

        {/* Search */}
        <div className="pt-2 max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search FAQs (e.g. cancellation, verification, payments)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm border border-slate-300 rounded-2xl bg-white shadow-2xs focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
          />
        </div>
      </div>

      {/* Support Hotlines */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl border border-slate-200 bg-white flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold shrink-0">
            <Phone className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900">Phone Support</h3>
            <p className="text-xs text-slate-500 mt-0.5">Toll-free customer hotline</p>
            <p className="text-xs font-bold text-teal-700 mt-1">+91 (800) 456-7890</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 bg-white flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold shrink-0">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900">Email Assistance</h3>
            <p className="text-xs text-slate-500 mt-0.5">Response within 2 hours</p>
            <p className="text-xs font-bold text-emerald-700 mt-1">support@homeease.in</p>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Frequently Asked Questions</h2>

        <div className="divide-y divide-slate-100">
          {filteredFaqs.map((faq, idx) => (
            <div key={idx} className="py-4">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left text-sm font-bold text-slate-900 gap-4"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>
              {openFaq === idx && (
                <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed pl-1">
                  {faq.a}
                </p>
              )}
            </div>
          ))}

          {filteredFaqs.length === 0 && (
            <p className="text-center py-8 text-xs text-slate-400">No FAQs matched your query.</p>
          )}
        </div>
      </div>
    </div>
  );
};

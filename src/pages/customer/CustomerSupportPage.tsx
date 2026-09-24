import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  LifeBuoy,
  MessageSquare,
  PlusCircle,
  Send,
  HelpCircle,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export const CustomerSupportPage: React.FC = () => {
  const { enquiries, currentUser, createEnquiry, addEnquiryMessage } = useApp();

  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [replyMessage, setReplyMessage] = useState('');

  // Ticket form
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('Booking Change');
  const [bookingId, setBookingId] = useState('');
  const [description, setDescription] = useState('');

  // FAQ accordion
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const myEnquiries = enquiries.filter(
    (e) => e.userId === currentUser?.id || e.userName === currentUser?.name
  );

  const activeTicket = enquiries.find((e) => e.id === selectedTicketId) || myEnquiries[0];

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    createEnquiry({
      subject,
      category,
      bookingId: bookingId || undefined,
      description,
    });
    setSubject('');
    setDescription('');
    setShowNewTicketModal(false);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyMessage.trim() || !activeTicket) return;
    addEnquiryMessage(activeTicket.id, replyMessage);
    setReplyMessage('');
  };

  const faqs = [
    {
      q: 'How does multi-day booking work?',
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
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
            Help & Customer Support
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Resolve booking queries, service concerns, or chat with our operations team
          </p>
        </div>

        <button
          onClick={() => setShowNewTicketModal(true)}
          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Raise Support Ticket</span>
        </button>
      </div>

      {/* Emergency contact bar */}
      <div className="bg-slate-900 rounded-2xl p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500 text-slate-950 flex items-center justify-center font-bold">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-teal-300 font-semibold uppercase tracking-wider">Priority Support Hotline</p>
            <p className="text-base font-bold text-white">+91 (800) 456-7890 (Toll Free, 7 AM - 10 PM)</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-300">
          <Mail className="w-4 h-4 text-teal-400" />
          <span>support@homeease.in</span>
        </div>
      </div>

      {/* Tickets & Thread view */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: My tickets list */}
        <div className="lg:col-span-5 space-y-3">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            My Support Tickets ({myEnquiries.length})
          </h2>

          <div className="space-y-2.5">
            {myEnquiries.map((ticket) => {
              const isSelected = activeTicket?.id === ticket.id;
              return (
                <div
                  key={ticket.id}
                  onClick={() => setSelectedTicketId(ticket.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all bg-white ${
                    isSelected
                      ? 'border-teal-500 ring-1 ring-teal-500 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-mono text-[11px] font-bold text-slate-500">#{ticket.ticketNumber}</span>
                    <StatusBadge status={ticket.status} type="enquiry" />
                  </div>
                  <h3 className="font-bold text-xs text-slate-900 line-clamp-1">{ticket.subject}</h3>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
                    <span>{ticket.category}</span>
                    <span>{ticket.createdAt.slice(0, 10)}</span>
                  </div>
                </div>
              );
            })}

            {myEnquiries.length === 0 && (
              <div className="text-center py-8 bg-white rounded-xl border border-slate-200 text-xs text-slate-500">
                You have no active support tickets. Click above to open a ticket if you need help.
              </div>
            )}
          </div>
        </div>

        {/* Right: Selected Ticket Thread */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between min-h-[400px]">
          {activeTicket ? (
            <div className="space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between pb-3 border-b border-slate-100 gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-500">#{activeTicket.ticketNumber}</span>
                      <StatusBadge status={activeTicket.status} type="enquiry" />
                    </div>
                    <h3 className="font-bold text-base text-slate-900 mt-1">{activeTicket.subject}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Category: {activeTicket.category}</p>
                  </div>
                </div>

                {/* Message stream */}
                <div className="py-4 space-y-3 max-h-[320px] overflow-y-auto pr-1">
                  {activeTicket.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.isStaff ? 'items-start' : 'items-end'}`}
                    >
                      <div
                        className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                          msg.isStaff
                            ? 'bg-slate-100 text-slate-800 rounded-tl-xs'
                            : 'bg-teal-600 text-white rounded-tr-xs'
                        }`}
                      >
                        <p className="font-bold text-[10px] mb-1 opacity-80">
                          {msg.isStaff ? 'HomeEase Support Agent' : msg.sender}
                        </p>
                        <p>{msg.text}</p>
                      </div>
                      <span className="text-[10px] text-slate-400 mt-0.5 px-1">{msg.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reply input */}
              <form onSubmit={handleSendReply} className="pt-3 border-t border-slate-100 flex gap-2">
                <input
                  type="text"
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Type a message to support agent..."
                  className="flex-1 px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-400 text-xs">
              Select or raise a ticket to view messages
            </div>
          )}
        </div>

      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-500">Quick answers to common questions about services and policies.</p>
        </div>

        <div className="divide-y divide-slate-100">
          {faqs.map((faq, idx) => (
            <div key={idx} className="py-3.5">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left text-xs sm:text-sm font-semibold text-slate-900 gap-4"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>
              {openFaq === idx && (
                <p className="text-xs text-slate-600 mt-2 leading-relaxed pl-1 animate-in fade-in duration-150">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Create Ticket Modal */}
      {showNewTicketModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">Raise Support Ticket</h3>
              <button onClick={() => setShowNewTicketModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Issue Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl"
                >
                  <option value="Booking Change">Booking Change / Reschedule</option>
                  <option value="Helper Punctuality">Helper Punctuality / Delay</option>
                  <option value="Service Quality">Service Quality Concern</option>
                  <option value="Refund & Billing">Refund & Billing Query</option>
                  <option value="Other">Other Household Query</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Booking ID (Optional)</label>
                <input
                  type="text"
                  value={bookingId}
                  onChange={(e) => setBookingId(e.target.value)}
                  placeholder="e.g. BK1001"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subject *</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Need to adjust arrival time on Day 2"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain what happened or what assistance you need..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewTicketModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 text-xs font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

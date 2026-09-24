import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { LifeBuoy, Send, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { EnquiryStatus } from '../../types';

export const AdminEnquiriesPage: React.FC = () => {
  const { enquiries, updateEnquiryStatus, addEnquiryMessage } = useApp();

  const [selectedId, setSelectedId] = useState<string>(enquiries[0]?.id || '');
  const [replyText, setReplyText] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'open' | 'in_progress' | 'resolved'>('all');

  const filtered = enquiries.filter((e) => {
    if (statusFilter === 'all') return true;
    return e.status === statusFilter;
  });

  const activeTicket = enquiries.find((e) => e.id === selectedId) || enquiries[0];

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeTicket) return;
    addEnquiryMessage(activeTicket.id, replyText);
    setReplyText('');
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
            Support Enquiries & Dispute Resolution
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Resolve customer queries, service discrepancies, and partner requests
          </p>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {['all', 'open', 'in_progress', 'resolved'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors whitespace-nowrap ${
                statusFilter === st ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Ticket list */}
        <div className="lg:col-span-5 space-y-3">
          {filtered.map((e) => {
            const isSelected = activeTicket?.id === e.id;
            return (
              <div
                key={e.id}
                onClick={() => setSelectedId(e.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all bg-white ${
                  isSelected ? 'border-teal-500 ring-1 ring-teal-500 shadow-xs' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[10px] font-bold text-slate-500">#{e.ticketNumber}</span>
                  <StatusBadge status={e.status} type="enquiry" />
                </div>
                <h3 className="font-bold text-xs text-slate-900 line-clamp-1">{e.subject}</h3>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
                  <span>{e.userName}</span>
                  <span>{e.category}</span>
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-slate-200 p-8 text-xs text-slate-400">
              No tickets in this view.
            </div>
          )}
        </div>

        {/* Selected ticket thread */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between min-h-[500px] shadow-2xs">
          {activeTicket ? (
            <div className="flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-500">#{activeTicket.ticketNumber}</span>
                      <StatusBadge status={activeTicket.status} type="enquiry" />
                    </div>
                    <h2 className="text-base font-bold text-slate-900 mt-1">{activeTicket.subject}</h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Raised by <strong>{activeTicket.userName}</strong> ({activeTicket.userEmail}) · Category: {activeTicket.category}
                    </p>
                  </div>

                  {/* Status Toggle */}
                  <div className="flex items-center gap-1.5 self-start sm:self-auto">
                    <select
                      value={activeTicket.status}
                      onChange={(e) => updateEnquiryStatus(activeTicket.id, e.target.value as EnquiryStatus)}
                      className="px-2.5 py-1.5 text-xs font-semibold border border-slate-300 rounded-xl bg-slate-50 text-slate-800"
                    >
                      <option value="open">Mark Open</option>
                      <option value="in_progress">Mark In Progress</option>
                      <option value="resolved">Mark Resolved</option>
                    </select>
                  </div>
                </div>

                {/* Message conversation */}
                <div className="py-4 space-y-3 max-h-[340px] overflow-y-auto pr-1">
                  {activeTicket.messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex flex-col ${m.isStaff ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                          m.isStaff
                            ? 'bg-slate-900 text-white rounded-tr-xs'
                            : 'bg-slate-100 text-slate-800 rounded-tl-xs'
                        }`}
                      >
                        <p className="font-bold text-[10px] mb-1 opacity-80">
                          {m.isStaff ? 'HomeEase Operations Support' : m.sender}
                        </p>
                        <p>{m.text}</p>
                      </div>
                      <span className="text-[10px] text-slate-400 mt-0.5 px-1">{m.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reply Form */}
              <form onSubmit={handleSendReply} className="pt-3 border-t border-slate-100 flex gap-2">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type an official response to the user..."
                  className="flex-1 px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Reply</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-400 text-xs">
              Select a ticket to review message thread
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

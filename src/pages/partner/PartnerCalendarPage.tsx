import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, ChevronLeft, ChevronRight, Check, X, Clock } from 'lucide-react';

export const PartnerCalendarPage: React.FC = () => {
  const { bookings, currentUser, houseHelps, showToast } = useApp();

  const partner = houseHelps.find((h) => h.id === currentUser?.id || h.email === currentUser?.email) || houseHelps[0];
  const partnerBookings = bookings.filter((b) => b.helperId === partner.id || b.helperName === partner.name);

  // Set of dates booked
  const bookedDates = new Set(partnerBookings.flatMap((b) => b.dates));

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Current demo month: September 2026
  const calendarDays = [
    { day: 27, inMonth: false, date: '2026-08-27' },
    { day: 28, inMonth: false, date: '2026-08-28' },
    { day: 29, inMonth: false, date: '2026-08-29' },
    { day: 30, inMonth: false, date: '2026-08-30' },
    { day: 31, inMonth: false, date: '2026-08-31' },
    { day: 1, inMonth: true, date: '2026-09-01' },
    { day: 2, inMonth: true, date: '2026-09-02' },
    { day: 3, inMonth: true, date: '2026-09-03' },
    { day: 4, inMonth: true, date: '2026-09-04' },
    { day: 5, inMonth: true, date: '2026-09-05' },
    { day: 6, inMonth: true, date: '2026-09-06' },
    { day: 7, inMonth: true, date: '2026-09-07' },
    { day: 8, inMonth: true, date: '2026-09-08' },
    { day: 9, inMonth: true, date: '2026-09-09' },
    { day: 10, inMonth: true, date: '2026-09-10' },
    { day: 11, inMonth: true, date: '2026-09-11' },
    { day: 12, inMonth: true, date: '2026-09-12' },
    { day: 13, inMonth: true, date: '2026-09-13' },
    { day: 14, inMonth: true, date: '2026-09-14' },
    { day: 15, inMonth: true, date: '2026-09-15' },
    { day: 16, inMonth: true, date: '2026-09-16' },
    { day: 17, inMonth: true, date: '2026-09-17' },
    { day: 18, inMonth: true, date: '2026-09-18' },
    { day: 19, inMonth: true, date: '2026-09-19' },
    { day: 20, inMonth: true, date: '2026-09-20' },
    { day: 21, inMonth: true, date: '2026-09-21' },
    { day: 22, inMonth: true, date: '2026-09-22' },
    { day: 23, inMonth: true, date: '2026-09-23' },
    { day: 24, inMonth: true, date: '2026-09-24' },
    { day: 25, inMonth: true, date: '2026-09-25' },
    { day: 26, inMonth: true, date: '2026-09-26' },
    { day: 27, inMonth: true, date: '2026-09-27' },
    { day: 28, inMonth: true, date: '2026-09-28' },
    { day: 29, inMonth: true, date: '2026-09-29' },
    { day: 30, inMonth: true, date: '2026-09-30' },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
            Work Calendar & Availability
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Review your booked days, upcoming assignments, and schedule preferences
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span className="text-slate-600">Booked Shift</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="w-3 h-3 rounded-full bg-slate-200"></span>
            <span className="text-slate-600">Available</span>
          </div>
        </div>
      </div>

      {/* Calendar Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">September 2026</h2>
          <div className="flex items-center gap-1">
            <button className="p-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center font-bold text-xs text-slate-400 py-1 uppercase">
              {day}
            </div>
          ))}

          {calendarDays.map((cell, idx) => {
            const isBooked = bookedDates.has(cell.date);
            const isToday = cell.date === '2026-09-24';

            return (
              <div
                key={idx}
                className={`min-h-[70px] sm:min-h-[85px] p-2 rounded-xl border flex flex-col justify-between transition-colors ${
                  !cell.inMonth
                    ? 'bg-slate-50/50 border-slate-100 text-slate-300'
                    : isBooked
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                } ${isToday ? 'ring-2 ring-emerald-500' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${isToday ? 'font-black text-emerald-700' : ''}`}>
                    {cell.day}
                  </span>
                  {isToday && (
                    <span className="text-[9px] bg-emerald-600 text-white px-1 rounded font-bold">
                      Today
                    </span>
                  )}
                </div>

                {isBooked && (
                  <div className="mt-1">
                    <span className="inline-block text-[10px] bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded font-semibold truncate w-full">
                      Shift Booked
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

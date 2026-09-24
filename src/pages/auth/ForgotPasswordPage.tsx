import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ArrowLeft, KeyRound, CheckCircle2, ShieldCheck } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const { navigate, showToast } = useApp();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [identifier, setIdentifier] = useState('customer@example.com');
  const [otp, setOtp] = useState(['5', '4', '2', '1']);
  const [newPassword, setNewPassword] = useState('newpassword123');
  const [confirmPassword, setConfirmPassword] = useState('newpassword123');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    showToast('Demo OTP sent: 5421', 'info', 'Verification Code');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
    showToast('Code verified successfully. Set your new password.', 'success');
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showToast('Passwords do not match.', 'error');
      return;
    }
    setStep(4);
    showToast('Your password has been reset securely!', 'success');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-teal-600 items-center justify-center text-white shadow-md shadow-teal-500/20 mb-1">
            <KeyRound className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Reset Your Password
          </h1>
          <p className="text-xs text-slate-500">
            Recover access to your HomeEase account
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5">
          {step === 1 && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                Enter your registered email address or mobile number. We'll send you a 4-digit verification code.
              </p>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email / Mobile Number
                </label>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. customer@example.com"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm"
              >
                Send Verification OTP
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl text-xs text-teal-800">
                A demo OTP <strong className="font-mono font-bold text-teal-950">5421</strong> was sent to {identifier}.
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2 text-center">
                  Enter 4-Digit Code
                </label>
                <div className="flex justify-center gap-3">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => {
                        const val = e.target.value;
                        const copy = [...otp];
                        copy[idx] = val;
                        setOtp(copy);
                      }}
                      className="w-12 h-12 text-center font-bold text-lg rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm"
              >
                Verify Code
              </button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm"
              >
                Update Password
              </button>
            </form>
          )}

          {step === 4 && (
            <div className="text-center space-y-4 py-2">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Password Changed!</h3>
                <p className="text-xs text-slate-600 mt-1">
                  You can now sign in with your new password credentials.
                </p>
              </div>
              <button
                onClick={() => navigate('/login')}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors"
              >
                Back to Sign In
              </button>
            </div>
          )}

          {step < 4 && (
            <div className="pt-2 text-center border-t border-slate-100">
              <button
                onClick={() => navigate('/login')}
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center justify-center gap-1.5 mx-auto font-medium"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Login</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

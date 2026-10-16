import React, { useState, useEffect } from 'react';
import { 
  X, 
  PhoneCall, 
  ShieldAlert, 
  HeartHandshake, 
  AlertTriangle, 
  Copy, 
  Check, 
  ExternalLink 
} from 'lucide-react';

export default function EmergencyModal({ isOpen, onClose, onLaunchUrgentGrievance }) {
  const [contacts, setContacts] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetch('/api/emergency-contacts')
        .then(res => res.json())
        .then(data => setContacts(data))
        .catch(err => console.error(err));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = (number, idx) => {
    navigator.clipboard.writeText(number);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full border border-rose-200 overflow-hidden transform transition-all my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Urgent Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-rose-600 to-red-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center animate-pulse">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight">
                24x7 Campus Emergency & Safety Support
              </h2>
              <p className="text-xs text-rose-100">
                Immediate response teams for security, ragging, or medical emergencies.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Facing ragging or immediate safety threat? Lodge an instant confidential SOS ticket.</span>
            </div>
            <button
              onClick={() => {
                onClose();
                onLaunchUrgentGrievance();
              }}
              className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shrink-0 shadow-sm transition"
            >
              Lodge SOS Ticket
            </button>
          </div>

          <div className="space-y-2.5">
            {contacts.map((c, idx) => (
              <div 
                key={idx}
                className="p-3.5 rounded-2xl border border-slate-200 hover:border-blue-300 bg-slate-50 hover:bg-blue-50/30 transition flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{c.title}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700">
                      {c.badge}
                    </span>
                  </div>
                  <div className="text-slate-500 mt-0.5 flex items-center gap-2">
                    <span className="font-mono text-slate-800 font-semibold">{c.number}</span>
                    {c.email && <span>&bull; {c.email}</span>}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleCopy(c.number, idx)}
                    className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 transition"
                    title="Copy number"
                  >
                    {copiedIndex === idx ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <a
                    href={`tel:${c.number.replace(/[^0-9+]/g, '')}`}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition shadow-sm"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500">
          Campus security patrol helpline is monitored 24 hours a day, 7 days a week.
        </div>
      </div>
    </div>
  );
}

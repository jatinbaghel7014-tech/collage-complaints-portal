import React, { useState } from 'react';
import { 
  Bell, 
  AlertCircle, 
  Calendar, 
  User, 
  Plus, 
  X, 
  CheckCircle2 
} from 'lucide-react';

export default function NoticeBoard({ notices, onAddNotice, currentRole }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState('Maintenance');
  const [isUrgent, setIsUrgent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/notices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          content: newContent,
          category: newCategory,
          isUrgent,
          author: currentRole === 'admin' ? 'Dean Office' : 'Department Head'
        })
      });

      if (res.ok) {
        const added = await res.json();
        onAddNotice(added);
        setShowAddModal(false);
        setNewTitle('');
        setNewContent('');
        setIsUrgent(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 mb-2">
            <Bell className="w-3.5 h-3.5" />
            <span>Official Circulars</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Campus Bulletin & Redressal Announcements
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Important notices regarding facility maintenance, water/power schedules, and college safety policies.
          </p>
        </div>

        {(currentRole === 'admin' || currentRole === 'staff') && (
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition"
          >
            <Plus className="w-4 h-4" />
            <span>Publish Notice</span>
          </button>
        )}
      </div>

      {/* Notice Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notices.map((n) => (
          <div
            key={n.id}
            className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
              n.isUrgent
                ? 'bg-rose-50/50 border-rose-200 shadow-sm'
                : 'bg-white border-slate-200 shadow-sm hover:shadow-md'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${
                  n.isUrgent 
                    ? 'bg-rose-100 text-rose-700 border-rose-300 animate-pulse' 
                    : 'bg-blue-50 text-blue-700 border-blue-200'
                }`}>
                  {n.isUrgent ? 'URGENT NOTICE' : n.category}
                </span>

                <div className="flex items-center gap-1 text-[11px] text-slate-400">
                  <Calendar className="w-3 h-3" />
                  <span>{n.date}</span>
                </div>
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-2">
                {n.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                {n.content}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-[11px] text-slate-500">
              <span className="font-semibold text-slate-700">{n.author}</span>
              <span className="font-mono text-slate-400">{n.id}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Notice Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Publish Campus Notice</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Notice Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Wi-Fi Maintenance Schedule in Library"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                >
                  <option value="Maintenance">Maintenance</option>
                  <option value="Anti-Ragging">Anti-Ragging</option>
                  <option value="IT Services">IT Services</option>
                  <option value="Hostel">Hostel</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Notice Description *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Full instructions and timings..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={isUrgent}
                  onChange={(e) => setIsUrgent(e.target.checked)}
                  className="h-4 w-4 rounded text-rose-600 focus:ring-rose-500 border-slate-300"
                />
                <span className="font-semibold text-rose-700">Mark as Urgent Notice</span>
              </label>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition shadow-sm disabled:opacity-50"
                >
                  {submitting ? 'Publishing...' : 'Publish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

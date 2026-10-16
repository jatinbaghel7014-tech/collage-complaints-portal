import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Paperclip, 
  ShieldCheck, 
  Globe, 
  AlertTriangle,
  Building,
  Check
} from 'lucide-react';
import { CATEGORIES, PRIORITIES } from '../constants';

export default function NewComplaintModal({ isOpen, onClose, onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Hostel',
    priority: 'Medium',
    location: '',
    description: '',
    isAnonymous: false,
    isPublic: true,
    studentName: 'Rahul Sharma',
    studentRoll: '2024CS104',
    studentEmail: 'rahul.s@college.edu'
  });

  const [attachment, setAttachment] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      setError('Please provide both title and detailed description.');
      return;
    }
    setError('');
    setSubmitting(true);

    try {
      let attachmentsList = [];

      // If file was attached, upload it first
      if (attachment) {
        setUploading(true);
        const fileData = new FormData();
        fileData.append('attachment', attachment);

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: fileData
        });

        if (uploadRes.ok) {
          const uploadResult = await uploadRes.json();
          attachmentsList.push({
            name: uploadResult.originalName,
            url: uploadResult.url
          });
        }
        setUploading(false);
      }

      // Submit complaint
      const res = await fetch('/api/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          attachments: attachmentsList
        })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to submit complaint');
      }

      const created = await res.json();
      setSubmitting(false);
      onSubmitSuccess(created);
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.message || 'Something went wrong. Please try again.');
      setSubmitting(false);
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden transform transition-all my-8">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span>Lodge a Campus Grievance / Complaint</span>
            </h2>
            <p className="text-xs text-blue-100 mt-1">
              Your grievance will be routed directly to the designated department officer with SLA tracking.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Grievance Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Water cooler in Hostel 4 is not functioning"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category & Priority Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Category <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {CATEGORIES.filter(c => c !== 'All').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Urgency / Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {PRIORITIES.filter(p => p !== 'All').map(pr => (
                  <option key={pr} value={pr}>{pr}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Specific Location / Room / Block
            </label>
            <input
              type="text"
              placeholder="e.g. Boys Hostel 2, Room 304 OR Academic Block B 1st Floor"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Detailed Description <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={4}
              required
              placeholder="Please provide exact details of the issue so the maintenance team can bring the right equipment..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Attachment upload */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Attach Photo / Document (Optional)
            </label>
            <div className="flex items-center gap-3">
              <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-dashed border-slate-300 hover:border-blue-500 text-slate-600 text-xs font-medium bg-slate-50 hover:bg-blue-50/50 transition">
                <Paperclip className="w-4 h-4 text-slate-500" />
                <span>{attachment ? attachment.name : 'Choose File (Photo / PDF)'}</span>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*,.pdf,.doc,.docx"
                />
              </label>
              {attachment && (
                <button
                  type="button"
                  onClick={() => setAttachment(null)}
                  className="text-xs text-rose-600 hover:underline"
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          {/* Confidentiality & Public Feed toggles */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            {/* Anonymous Toggle */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isAnonymous}
                onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
                className="mt-1 h-4 w-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
              />
              <div>
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  File Anonymously (Identity Protected)
                </span>
                <p className="text-[11px] text-slate-500">
                  Your name and roll number will not be visible on the public feed or to department staff.
                </p>
              </div>
            </label>

            {/* Public Campus Feed Toggle */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isPublic}
                onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                className="mt-1 h-4 w-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
              />
              <div>
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-blue-600" />
                  Show in Campus Community Feed
                </span>
                <p className="text-[11px] text-slate-500">
                  Allows other affected students to upvote and comment to expedite official action.
                </p>
              </div>
            </label>
          </div>

          {/* Action Footer */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || uploading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-md shadow-blue-600/25 transition disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? 'Lodging Grievance...' : 'Submit Grievance'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

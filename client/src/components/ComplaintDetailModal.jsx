import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  UserCheck, 
  CheckCircle2, 
  AlertCircle, 
  Star, 
  Send, 
  Wrench, 
  FileText,
  ThumbsUp,
  MessageSquare,
  CornerDownRight
} from 'lucide-react';
import { CATEGORY_COLORS, STATUS_COLORS, PRIORITY_COLORS, STATUSES } from '../constants';

export default function ComplaintDetailModal({ 
  complaint, 
  onClose, 
  onUpdateComplaint, 
  currentRole, 
  currentRoll 
}) {
  if (!complaint) return null;

  const [commentText, setCommentText] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  // Admin / Officer status update state
  const [newStatus, setNewStatus] = useState(complaint.status);
  const [assignedOfficer, setAssignedOfficer] = useState(complaint.assignedTo ? complaint.assignedTo.name : '');
  const [assignedPhone, setAssignedPhone] = useState(complaint.assignedTo ? complaint.assignedTo.phone : '');
  const [statusNote, setStatusNote] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // Student feedback state
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackComment, setFeedbackComment] = useState('');
  const [submittingFeedback, setSubmittingFeedback] = useState(false);

  const statusInfo = STATUS_COLORS[complaint.status] || STATUS_COLORS['Submitted'];
  const categoryClass = CATEGORY_COLORS[complaint.category] || CATEGORY_COLORS['Other'];
  const priorityClass = PRIORITY_COLORS[complaint.priority] || PRIORITY_COLORS['Medium'];

  // Handle adding comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setSubmittingComment(true);
    try {
      const author = currentRole === 'student' ? 'Rahul Sharma' : (currentRole === 'admin' ? 'Dean Office' : 'Department Officer');
      const roleName = currentRole === 'student' ? 'Student (2024CS104)' : (currentRole === 'admin' ? 'Institute Administration' : 'Estate & Maintenance Officer');

      const res = await fetch(`/api/complaints/${complaint.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author,
          role: roleName,
          text: commentText.trim()
        })
      });

      if (res.ok) {
        const newCmt = await res.json();
        const updated = {
          ...complaint,
          comments: [...(complaint.comments || []), newCmt]
        };
        onUpdateComplaint(updated);
        setCommentText('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingComment(false);
    }
  };

  // Handle Admin status change
  const handleSaveStatus = async (e) => {
    e.preventDefault();
    setUpdatingStatus(true);
    try {
      const assignedToPayload = assignedOfficer ? {
        name: assignedOfficer,
        phone: assignedPhone || '+91 98000 00000'
      } : null;

      const res = await fetch(`/api/complaints/${complaint.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          assignedTo: assignedToPayload,
          note: statusNote || `Status updated to ${newStatus}`,
          updatedBy: currentRole === 'admin' ? 'Dean Office' : 'Department Officer'
        })
      });

      if (res.ok) {
        const updated = await res.json();
        onUpdateComplaint(updated);
        setStatusNote('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingStatus(false);
    }
  };

  // Handle feedback submission
  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    setSubmittingFeedback(true);
    try {
      const res = await fetch(`/api/complaints/${complaint.id}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating: feedbackRating,
          comment: feedbackComment
        })
      });

      if (res.ok) {
        const feedbackObj = await res.json();
        const updated = {
          ...complaint,
          feedback: feedbackObj
        };
        onUpdateComplaint(updated);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingFeedback(false);
    }
  };

  // Steps definition for tracker
  const steps = [
    { label: 'Submitted', key: 'Submitted' },
    { label: 'Under Review', key: 'Under Review' },
    { label: 'In Progress', key: 'In Progress' },
    { label: 'Resolved', key: 'Resolved' }
  ];

  const currentStepIndex = steps.findIndex(s => s.key === complaint.status);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden transform transition-all my-8 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 bg-slate-900 text-white flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-md bg-white/20 text-blue-200">
                {complaint.id}
              </span>
              <span className={`text-xs px-2.5 py-0.5 rounded-md border font-medium ${categoryClass}`}>
                {complaint.category}
              </span>
              <span className={`text-xs px-2.5 py-0.5 rounded-md border ${priorityClass}`}>
                {complaint.priority} Priority
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
              {complaint.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition shrink-0 ml-4"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          {/* Status Progression Bar */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Resolution Progress
            </h4>
            <div className="relative flex items-center justify-between">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-slate-200 w-full -z-0" />
              <div 
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 -z-0 transition-all duration-300"
                style={{ 
                  width: `${complaint.status === 'Resolved' ? 100 : (Math.max(0, currentStepIndex) / (steps.length - 1)) * 100}%` 
                }}
              />

              {steps.map((st, idx) => {
                const isPassed = currentStepIndex >= idx || complaint.status === 'Resolved';
                const isCurrent = complaint.status === st.key;
                return (
                  <div key={st.key} className="flex flex-col items-center z-10">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition ${
                      isPassed 
                        ? 'bg-blue-600 text-white shadow-sm ring-4 ring-blue-100' 
                        : 'bg-white border-2 border-slate-300 text-slate-400'
                    }`}>
                      {idx + 1}
                    </div>
                    <span className={`text-[11px] mt-1.5 font-medium ${
                      isCurrent ? 'text-blue-600 font-bold' : isPassed ? 'text-slate-800' : 'text-slate-400'
                    }`}>
                      {st.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Details & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 font-medium block mb-1">Filed By:</span>
              {complaint.isAnonymous ? (
                <div className="flex items-center gap-1.5 font-semibold text-emerald-700">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Anonymous Student (Confidential)</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                  <UserCheck className="w-4 h-4 text-blue-600" />
                  <span>{complaint.studentName} ({complaint.studentRoll || 'Student'})</span>
                </div>
              )}
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 font-medium block mb-1">Location & Dept:</span>
              <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-rose-500" />
                <span>{complaint.location || 'Campus'} &bull; {complaint.department}</span>
              </div>
            </div>
          </div>

          {/* Full Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Grievance Description
            </h4>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
              {complaint.description}
            </div>
          </div>

          {/* Attachments if any */}
          {complaint.attachments && complaint.attachments.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Attached Files
              </h4>
              <div className="flex flex-wrap gap-2">
                {complaint.attachments.map((file, i) => (
                  <a
                    key={i}
                    href={file.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 hover:bg-blue-50 text-xs font-medium text-blue-700 border border-slate-200"
                  >
                    <FileText className="w-4 h-4" />
                    <span>{file.name || 'View Attachment'}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Activity / Action Timeline */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Action Timeline & Official Notes
            </h4>
            <div className="space-y-3 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-slate-200 pl-7">
              {(complaint.timeline || []).map((item, idx) => (
                <div key={item.id || idx} className="relative">
                  <span className="absolute -left-7 top-1 w-3 h-3 rounded-full bg-blue-600 ring-4 ring-white" />
                  <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs">
                    <div className="flex items-center justify-between text-slate-400 mb-1">
                      <span className="font-bold text-slate-800">{item.title}</span>
                      <span>{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} &bull; {new Date(item.timestamp).toLocaleDateString()}</span>
                    </div>
                    <p className="text-slate-600">{item.note}</p>
                    <span className="text-[10px] text-blue-700 font-semibold mt-1 block">
                      By: {item.by}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feedback Section (if Resolved) */}
          {complaint.status === 'Resolved' && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">
                Resolution Feedback & Satisfaction
              </h4>

              {complaint.feedback ? (
                <div>
                  <div className="flex items-center gap-1.5 text-amber-500 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < complaint.feedback.rating ? 'fill-current text-amber-500' : 'text-slate-300'}`} 
                      />
                    ))}
                    <span className="text-xs font-bold text-slate-700 ml-1">
                      {complaint.feedback.rating} out of 5 Stars
                    </span>
                  </div>
                  {complaint.feedback.comment && (
                    <p className="text-xs text-slate-600 italic">
                      "{complaint.feedback.comment}"
                    </p>
                  )}
                </div>
              ) : currentRole === 'student' ? (
                <form onSubmit={handleSubmitFeedback} className="space-y-3">
                  <p className="text-xs text-emerald-700">
                    This grievance was marked resolved. How satisfied are you with the resolution?
                  </p>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFeedbackRating(star)}
                        className="text-amber-400 hover:scale-110 transition"
                      >
                        <Star className={`w-5 h-5 ${star <= feedbackRating ? 'fill-current text-amber-500' : 'text-slate-300'}`} />
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Add brief feedback comment (optional)..."
                    value={feedbackComment}
                    onChange={(e) => setFeedbackComment(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    type="submit"
                    disabled={submittingFeedback}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm"
                  >
                    {submittingFeedback ? 'Submitting...' : 'Submit Satisfaction Rating'}
                  </button>
                </form>
              ) : (
                <p className="text-xs text-slate-500 italic">
                  Awaiting student satisfaction rating.
                </p>
              )}
            </div>
          )}

          {/* Admin / Officer Action Box */}
          {(currentRole === 'admin' || currentRole === 'staff') && (
            <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-4">
              <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
                <Wrench className="w-4 h-4 text-indigo-600" />
                <span>Department Officer Actions</span>
              </div>

              <form onSubmit={handleSaveStatus} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                      Update Status
                    </label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white font-medium focus:ring-2 focus:ring-indigo-500"
                    >
                      {STATUSES.filter(s => s !== 'All').map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                      Assign Technician / Officer
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Kumar (Plumber)"
                      value={assignedOfficer}
                      onChange={(e) => setAssignedOfficer(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                    Officer Action Remark / Resolution Note
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Electrician visited, replaced fuse in main MCB board. Ready for testing."
                    value={statusNote}
                    onChange={(e) => setStatusNote(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="submit"
                    disabled={updatingStatus}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition disabled:opacity-50"
                  >
                    {updatingStatus ? 'Updating...' : 'Save & Publish Update'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Discussion & Comments */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Campus Discussion & Updates ({(complaint.comments && complaint.comments.length) || 0})</span>
            </h4>

            {/* List of comments */}
            <div className="space-y-2 mb-4">
              {(!complaint.comments || complaint.comments.length === 0) ? (
                <p className="text-xs text-slate-400 italic py-2">
                  No comments yet. Students and officers can discuss the progress below.
                </p>
              ) : (
                complaint.comments.map((cmt, idx) => (
                  <div key={cmt.id || idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-800">{cmt.author}</span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(cmt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} &bull; {new Date(cmt.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <span className="text-[10px] text-blue-600 font-semibold block mb-1">
                      {cmt.role}
                    </span>
                    <p className="text-slate-600">{cmt.text}</p>
                  </div>
                ))
              )}
            </div>

            {/* Add comment input */}
            <form onSubmit={handleAddComment} className="flex gap-2">
              <input
                type="text"
                placeholder="Write a message or query regarding this issue..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={submittingComment || !commentText.trim()}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition disabled:opacity-50 flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post</span>
              </button>
            </form>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

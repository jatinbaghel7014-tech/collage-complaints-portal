import React from 'react';
import { 
  ThumbsUp, 
  MapPin, 
  Clock, 
  MessageSquare, 
  CheckCircle2, 
  AlertCircle, 
  UserCheck, 
  ShieldCheck,
  Star,
  ArrowRight
} from 'lucide-react';
import { CATEGORY_COLORS, STATUS_COLORS, PRIORITY_COLORS } from '../constants';

export default function ComplaintCard({ complaint, onSelect, onToggleUpvote, currentRoll }) {
  const isUpvoted = complaint.upvotedBy && complaint.upvotedBy.includes(currentRoll);
  const statusInfo = STATUS_COLORS[complaint.status] || STATUS_COLORS['Submitted'];
  const categoryClass = CATEGORY_COLORS[complaint.category] || CATEGORY_COLORS['Other'];
  const priorityClass = PRIORITY_COLORS[complaint.priority] || PRIORITY_COLORS['Medium'];

  // Format date
  const dateFormatted = new Date(complaint.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div 
      onClick={() => onSelect(complaint)}
      className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group hover:border-blue-300"
    >
      <div>
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
              {complaint.id}
            </span>
            <span className={`text-xs px-2.5 py-0.5 rounded-md border ${categoryClass}`}>
              {complaint.category}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-md border ${priorityClass}`}>
              {complaint.priority}
            </span>
          </div>

          {/* Status Badge */}
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusInfo.badge}`}>
            <span className={`w-2 h-2 rounded-full ${statusInfo.dot}`} />
            <span>{complaint.status}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
          {complaint.title}
        </h3>

        {/* Description snippet */}
        <p className="text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed">
          {complaint.description}
        </p>

        {/* Location & Metadata */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-4">
          {complaint.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{complaint.location}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{dateFormatted}</span>
          </div>
          {complaint.isAnonymous ? (
            <div className="flex items-center gap-1 text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Anonymous</span>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-slate-400" />
              <span>{complaint.studentName}</span>
            </div>
          )}
        </div>

        {/* Assigned Technician / Officer info if available */}
        {complaint.assignedTo && (
          <div className="mb-3 px-3 py-1.5 bg-blue-50/70 border border-blue-100 rounded-lg text-xs text-blue-800 flex items-center justify-between">
            <span className="font-medium">Assigned Officer:</span>
            <span className="font-semibold">{complaint.assignedTo.name}</span>
          </div>
        )}

        {/* Feedback star rating if resolved */}
        {complaint.feedback && (
          <div className="mb-3 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-lg text-xs text-emerald-800 flex items-center justify-between">
            <span className="font-medium">Student Rating:</span>
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(complaint.feedback.rating)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
              <span className="text-slate-600 font-bold ml-1">{complaint.feedback.rating}/5</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
        {/* Upvote button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleUpvote(complaint.id);
          }}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
            isUpvoted 
              ? 'bg-blue-600 text-white shadow-sm' 
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
          title="Upvote if you are also facing this campus issue"
        >
          <ThumbsUp className={`w-3.5 h-3.5 ${isUpvoted ? 'fill-current' : ''}`} />
          <span>{complaint.upvotes || 0} Affected</span>
        </button>

        {/* Right side stats & open button */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{(complaint.comments && complaint.comments.length) || 0}</span>
          </div>

          <span className="text-xs font-medium text-blue-600 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5">
            Details
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );
}

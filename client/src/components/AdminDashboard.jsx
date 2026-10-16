import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  AlertOctagon, 
  TrendingUp, 
  Star, 
  Download, 
  Search, 
  Filter, 
  ExternalLink,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { CATEGORY_COLORS, STATUS_COLORS, PRIORITY_COLORS, CATEGORIES, STATUSES, PRIORITIES } from '../constants';

export default function AdminDashboard({ complaints, stats, onSelectComplaint, onRefresh }) {
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');

  // Filter complaints
  const filtered = complaints.filter(c => {
    const matchSearch = !search || 
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      (c.location && c.location.toLowerCase().includes(search.toLowerCase())) ||
      (c.studentName && c.studentName.toLowerCase().includes(search.toLowerCase()));

    const matchCategory = filterCategory === 'All' || c.category === filterCategory;
    const matchStatus = filterStatus === 'All' || c.status === filterStatus;
    const matchPriority = filterPriority === 'All' || c.priority === filterPriority;

    return matchSearch && matchCategory && matchStatus && matchPriority;
  });

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['Complaint ID', 'Title', 'Category', 'Priority', 'Status', 'Location', 'Student', 'Created At'];
    const rows = filtered.map(c => [
      `"${c.id}"`,
      `"${c.title.replace(/"/g, '""')}"`,
      `"${c.category}"`,
      `"${c.priority}"`,
      `"${c.status}"`,
      `"${c.location || ''}"`,
      `"${c.isAnonymous ? 'Anonymous' : c.studentName}"`,
      `"${new Date(c.createdAt).toLocaleDateString()}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Campus_Complaints_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resolutionRate = stats?.total 
    ? Math.round(((stats.resolved || 0) / stats.total) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white p-6 rounded-3xl shadow-lg">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/30 border border-blue-400/30 text-blue-200">
            Administrative & Redressal Console
          </span>
          <h2 className="text-2xl font-black mt-2">
            Campus Grievance Oversight & Analytics
          </h2>
          <p className="text-xs text-blue-200 mt-1 max-w-xl">
            Real-time tracking of institutional complaints, service level agreements (SLAs), departmental allocation, and student satisfaction.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-blue-900 hover:bg-blue-50 text-xs font-bold shadow-md transition"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV Report</span>
        </button>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Total Logged</span>
            <TrendingUp className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-black text-slate-900">{stats?.total || 0}</div>
          <span className="text-[11px] text-slate-400">All registered tickets</span>
        </div>

        {/* Pending Review */}
        <div className="bg-white p-5 rounded-2xl border border-amber-200/80 bg-amber-50/20 shadow-sm">
          <div className="flex items-center justify-between text-amber-700 mb-2">
            <span className="text-xs font-semibold">Action Required</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-600">{stats?.pending || 0}</div>
          <span className="text-[11px] text-amber-700/80">Awaiting officer assignment</span>
        </div>

        {/* In Progress */}
        <div className="bg-white p-5 rounded-2xl border border-blue-200/80 bg-blue-50/20 shadow-sm">
          <div className="flex items-center justify-between text-blue-700 mb-2">
            <span className="text-xs font-semibold">In Progress</span>
            <AlertTriangle className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-black text-blue-600">{(stats?.inProgress || 0) + (stats?.underReview || 0)}</div>
          <span className="text-[11px] text-blue-600">Technicians active on ground</span>
        </div>

        {/* Resolved & Rate */}
        <div className="bg-white p-5 rounded-2xl border border-emerald-200/80 bg-emerald-50/20 shadow-sm">
          <div className="flex items-center justify-between text-emerald-700 mb-2">
            <span className="text-xs font-semibold">Resolved</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-600">{stats?.resolved || 0}</span>
            <span className="text-xs font-bold text-emerald-700">({resolutionRate}%)</span>
          </div>
          <span className="text-[11px] text-emerald-600">Resolution success rate</span>
        </div>

        {/* Urgent & Rating */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Student Rating</span>
            <Star className="w-4 h-4 text-amber-400 fill-current" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-slate-900">{stats?.avgRating || '4.8'}</span>
            <span className="text-xs text-slate-400">/ 5.0</span>
          </div>
          <span className="text-[11px] text-slate-400">Across verified resolutions</span>
        </div>
      </div>

      {/* Category Breakdown Progress */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          Campus Grievance Distribution by Domain
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {Object.entries(stats?.categoryCount || {}).map(([cat, count]) => {
            const pct = stats?.total ? Math.round((count / stats.total) * 100) : 0;
            return (
              <div key={cat} className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>{cat}</span>
                  <span className="text-blue-600 font-bold">{count}</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter and Management Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Table Filter Bar */}
        <div className="p-5 border-b border-slate-200 bg-slate-50/50 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search ticket ID, title, student, or room..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Category */}
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white font-medium focus:ring-2 focus:ring-blue-500"
              >
                {CATEGORIES.map(c => (
                  <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>
                ))}
              </select>

              {/* Status */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white font-medium focus:ring-2 focus:ring-blue-500"
              >
                {STATUSES.map(s => (
                  <option key={s} value={s}>{s === 'All' ? 'All Statuses' : s}</option>
                ))}
              </select>

              {/* Priority */}
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white font-medium focus:ring-2 focus:ring-blue-500"
              >
                {PRIORITIES.map(p => (
                  <option key={p} value={p}>{p === 'All' ? 'All Priorities' : p}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
              <tr>
                <th className="px-5 py-3">Ticket ID</th>
                <th className="px-5 py-3">Grievance & Location</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Priority</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Student</th>
                <th className="px-5 py-3">Assigned Officer</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-8 text-center text-slate-400 italic">
                    No complaints match your active filter criteria.
                  </td>
                </tr>
              ) : (
                filtered.map(c => {
                  const statusInfo = STATUS_COLORS[c.status] || STATUS_COLORS['Submitted'];
                  const categoryClass = CATEGORY_COLORS[c.category] || CATEGORY_COLORS['Other'];
                  const priorityClass = PRIORITY_COLORS[c.priority] || PRIORITY_COLORS['Medium'];

                  return (
                    <tr 
                      key={c.id} 
                      className="hover:bg-blue-50/40 transition cursor-pointer"
                      onClick={() => onSelectComplaint(c)}
                    >
                      <td className="px-5 py-3.5 font-mono font-bold text-slate-900">
                        {c.id}
                      </td>
                      <td className="px-5 py-3.5 max-w-xs">
                        <div className="font-semibold text-slate-800 line-clamp-1">{c.title}</div>
                        <div className="text-[11px] text-slate-400 line-clamp-1">{c.location || 'Campus'}</div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`px-2 py-0.5 rounded border text-[11px] font-medium ${categoryClass}`}>
                          {c.category}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`px-2 py-0.5 rounded border text-[11px] ${priorityClass}`}>
                          {c.priority}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${statusInfo.badge}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dot}`} />
                          {c.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        {c.isAnonymous ? (
                          <span className="text-emerald-700 font-medium flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5" /> Anonymous
                          </span>
                        ) : (
                          <span className="text-slate-700">{c.studentName}</span>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-slate-500">
                        {c.assignedTo ? (
                          <span className="font-medium text-slate-800">{c.assignedTo.name}</span>
                        ) : (
                          <span className="text-amber-600 italic">Unassigned</span>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectComplaint(c);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs transition inline-flex items-center gap-1"
                        >
                          <span>Manage</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

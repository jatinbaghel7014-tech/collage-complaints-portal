import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ComplaintCard from './components/ComplaintCard';
import ComplaintDetailModal from './components/ComplaintDetailModal';
import NewComplaintModal from './components/NewComplaintModal';
import AdminDashboard from './components/AdminDashboard';
import NoticeBoard from './components/NoticeBoard';
import EmergencyModal from './components/EmergencyModal';
import { 
  Search, 
  Filter, 
  PlusCircle, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle, 
  ThumbsUp, 
  Clock, 
  CheckCircle2, 
  Flame,
  Layers,
  ArrowUpDown
} from 'lucide-react';
import { CATEGORIES, STATUSES, PRIORITIES } from './constants';

export default function App() {
  const [currentRole, setCurrentRole] = useState('student'); // 'student', 'staff', 'admin'
  const currentRoll = '2024CS104'; // Default student identity
  const [activeTab, setActiveTab] = useState('feed'); // 'feed', 'my', 'admin', 'notices'

  const [complaints, setComplaints] = useState([]);
  const [stats, setStats] = useState(null);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters & Search for Feed
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [sortBy, setSortBy] = useState('latest'); // 'latest', 'upvotes', 'priority'

  // Modals
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Fetch initial data
  const fetchData = async () => {
    try {
      setLoading(true);
      const [compRes, statsRes, noticeRes] = await Promise.all([
        fetch('/api/complaints'),
        fetch('/api/stats'),
        fetch('/api/notices')
      ]);

      if (compRes.ok) setComplaints(await compRes.json());
      if (statsRes.ok) setStats(await statsRes.json());
      if (noticeRes.ok) setNotices(await noticeRes.json());
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Show Toast
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Upvote Handler
  const handleToggleUpvote = async (complaintId) => {
    try {
      const res = await fetch(`/api/complaints/${complaintId}/upvote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentRoll: currentRoll })
      });

      if (res.ok) {
        const data = await res.json();
        setComplaints(prev => prev.map(c => {
          if (c.id === complaintId) {
            return {
              ...c,
              upvotes: data.upvotes,
              upvotedBy: data.upvotedBy
            };
          }
          return c;
        }));

        if (selectedComplaint && selectedComplaint.id === complaintId) {
          setSelectedComplaint(prev => ({
            ...prev,
            upvotes: data.upvotes,
            upvotedBy: data.upvotedBy
          }));
        }

        showToast(data.hasUpvoted ? 'Upvoted! Department notified of high student impact.' : 'Upvote removed.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // New complaint created
  const handleNewComplaintSuccess = (newComplaint) => {
    setComplaints(prev => [newComplaint, ...prev]);
    showToast(`Grievance ${newComplaint.id} lodged successfully!`);
    fetchData(); // refresh stats
  };

  // Complaint updated (status or feedback)
  const handleUpdateComplaint = (updatedComplaint) => {
    setComplaints(prev => prev.map(c => c.id === updatedComplaint.id ? updatedComplaint : c));
    setSelectedComplaint(updatedComplaint);
    showToast(`Complaint ${updatedComplaint.id} updated!`);
    fetchData(); // refresh stats
  };

  // Filter complaints based on active tab and filters
  let displayedComplaints = complaints;

  if (activeTab === 'my') {
    displayedComplaints = displayedComplaints.filter(c => c.studentRoll === currentRoll);
  }

  // Filter by category
  if (selectedCategory !== 'All') {
    displayedComplaints = displayedComplaints.filter(c => c.category === selectedCategory);
  }

  // Filter by status
  if (selectedStatus !== 'All') {
    displayedComplaints = displayedComplaints.filter(c => c.status === selectedStatus);
  }

  // Filter by priority
  if (selectedPriority !== 'All') {
    displayedComplaints = displayedComplaints.filter(c => c.priority === selectedPriority);
  }

  // Filter by search
  if (search.trim()) {
    const q = search.toLowerCase();
    displayedComplaints = displayedComplaints.filter(c =>
      c.id.toLowerCase().includes(q) ||
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      (c.location && c.location.toLowerCase().includes(q))
    );
  }

  // Sort
  displayedComplaints.sort((a, b) => {
    if (sortBy === 'upvotes') {
      return (b.upvotes || 0) - (a.upvotes || 0);
    }
    if (sortBy === 'priority') {
      const pWeights = { Urgent: 4, High: 3, Medium: 2, Low: 1 };
      return (pWeights[b.priority] || 0) - (pWeights[a.priority] || 0);
    }
    // Default latest
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-xs font-semibold animate-in slide-in-from-bottom duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        currentRole={currentRole}
        setCurrentRole={(r) => {
          setCurrentRole(r);
          if (r === 'admin' || r === 'staff') {
            setActiveTab('admin');
          } else {
            setActiveTab('feed');
          }
        }}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenNewComplaint={() => setIsNewModalOpen(true)}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        stats={stats}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full space-y-6">
        {/* Render Active View */}
        {activeTab === 'admin' ? (
          <AdminDashboard
            complaints={complaints}
            stats={stats}
            onSelectComplaint={(c) => setSelectedComplaint(c)}
            onRefresh={fetchData}
          />
        ) : activeTab === 'notices' ? (
          <NoticeBoard
            notices={notices}
            onAddNotice={(n) => setNotices(prev => [n, ...prev])}
            currentRole={currentRole}
          />
        ) : (
          /* Feed & My Complaints View */
          <div className="space-y-6">
            {/* Hero / Quick Welcome Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-800 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
              <div className="relative z-10 max-w-2xl space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 backdrop-blur border border-white/20 text-blue-200">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                  <span>Transparent & Accountable Campus Governance</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {activeTab === 'my' 
                    ? 'My Registered Grievances & Status' 
                    : 'College Grievances & Community Upvotes'}
                </h1>

                <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                  {activeTab === 'my'
                    ? 'Track your tickets, view technician dispatch updates, inspect resolution remarks, and rate completed repairs.'
                    : 'Browse public campus complaints across hostels, mess, labs, and security. Upvote issues to escalate urgent priorities.'}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setIsNewModalOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-blue-900 hover:bg-blue-50 text-xs font-bold shadow-md transition"
                  >
                    <PlusCircle className="w-4 h-4 text-blue-600" />
                    <span>Lodge New Grievance</span>
                  </button>

                  <button
                    onClick={() => setIsEmergencyOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600/90 hover:bg-rose-600 text-white text-xs font-semibold transition"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Anti-Ragging / Security Cell</span>
                  </button>
                </div>
              </div>

              {/* Decorative background shape */}
              <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-gradient-to-l from-indigo-500/20 to-transparent pointer-events-none" />
            </div>

            {/* Category Pills Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
              {/* Search */}
              <div className="relative flex-1 min-w-[260px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by ticket ID, keyword, room no, or description..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Status & Priority & Sort */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                {/* Status */}
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white font-medium focus:ring-2 focus:ring-blue-500"
                >
                  {STATUSES.map(s => (
                    <option key={s} value={s}>{s === 'All' ? 'All Statuses' : s}</option>
                  ))}
                </select>

                {/* Priority */}
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white font-medium focus:ring-2 focus:ring-blue-500"
                >
                  {PRIORITIES.map(p => (
                    <option key={p} value={p}>{p === 'All' ? 'All Priorities' : p}</option>
                  ))}
                </select>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white font-medium focus:ring-2 focus:ring-blue-500"
                >
                  <option value="latest">Sort: Most Recent</option>
                  <option value="upvotes">Sort: Highest Impact (Upvotes)</option>
                  <option value="priority">Sort: Highest Priority</option>
                </select>
              </div>
            </div>

            {/* Complaints Grid */}
            {loading ? (
              <div className="text-center py-16">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-xs text-slate-500">Loading grievances...</p>
              </div>
            ) : displayedComplaints.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mx-auto">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-800">
                  No grievances found
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  {search || selectedCategory !== 'All' || selectedStatus !== 'All'
                    ? 'Try relaxing your search terms or filters.'
                    : activeTab === 'my'
                    ? "You haven't logged any complaints yet. Use the Lodge Grievance button to submit one."
                    : 'No complaints logged yet.'}
                </p>
                <button
                  onClick={() => setIsNewModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-sm inline-flex items-center gap-1.5"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Lodge Grievance</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {displayedComplaints.map(c => (
                  <ComplaintCard
                    key={c.id}
                    complaint={c}
                    onSelect={(comp) => setSelectedComplaint(comp)}
                    onToggleUpvote={handleToggleUpvote}
                    currentRoll={currentRoll}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-semibold text-slate-700">
            <span>College Complaints Portal</span>
            <span>&bull;</span>
            <span className="font-normal text-slate-500">National Institute Grievance & Redressal Cell</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>UGC / AICTE Compliant</span>
            <span>Anti-Ragging Squad Active</span>
            <span>24x7 Maintenance Helpdesk</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ComplaintDetailModal
        complaint={selectedComplaint}
        onClose={() => setSelectedComplaint(null)}
        onUpdateComplaint={handleUpdateComplaint}
        currentRole={currentRole}
        currentRoll={currentRoll}
      />

      <NewComplaintModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onSubmitSuccess={handleNewComplaintSuccess}
      />

      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
        onLaunchUrgentGrievance={() => setIsNewModalOpen(true)}
      />
    </div>
  );
}

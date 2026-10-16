import React from 'react';
import { 
  ShieldAlert, 
  PlusCircle, 
  GraduationCap, 
  Wrench, 
  UserCheck, 
  Bell, 
  PhoneCall,
  LayoutDashboard,
  Layers,
  FileText
} from 'lucide-react';

export default function Navbar({ 
  currentRole, 
  setCurrentRole, 
  activeTab, 
  setActiveTab, 
  onOpenNewComplaint, 
  onOpenEmergency,
  stats
}) {
  const roles = [
    { id: 'student', label: 'Student', icon: GraduationCap, detail: 'Rahul Sharma (2024CS104)' },
    { id: 'staff', label: 'Department Officer', icon: Wrench, detail: 'Hostel & Estate Dept' },
    { id: 'admin', label: 'Dean / Admin', icon: UserCheck, detail: 'Student Affairs Admin' }
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      {/* Top Banner with Notice ticker & Emergency SOS */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white px-4 py-2 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 rounded bg-blue-500 text-white font-bold text-[10px] tracking-wider uppercase">
              Notice
            </span>
            <span className="text-slate-200 truncate max-w-xs md:max-w-md">
              ⚡ 24x7 Student Grievance Redressal Cell & Anti-Ragging Monitoring System Active
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenEmergency}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-rose-600 hover:bg-rose-700 text-white font-semibold transition shadow-sm animate-pulse"
              title="Immediate Emergency Assistance"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>24x7 Emergency SOS</span>
            </button>

            {/* Quick Role Switcher */}
            <div className="flex items-center gap-1.5 bg-white/10 px-2 py-0.5 rounded-full border border-white/10">
              <span className="text-slate-300 text-[11px] hidden sm:inline">Role:</span>
              {roles.map(r => {
                const Icon = r.icon;
                const isActive = currentRole === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => setCurrentRole(r.id)}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium transition ${
                      isActive 
                        ? 'bg-blue-500 text-white shadow-sm' 
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                    title={r.detail}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{r.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Portal Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('feed')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-slate-900 leading-tight">
                  Campus<span className="text-blue-600">Samadhan</span>
                </h1>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded">
                  v2.0
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                College Grievance Redressal & Maintenance Portal
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('feed')}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition ${
                activeTab === 'feed'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Campus Feed</span>
            </button>

            {currentRole === 'student' && (
              <button
                onClick={() => setActiveTab('my')}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition ${
                  activeTab === 'my'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>My Complaints</span>
              </button>
            )}

            {(currentRole === 'admin' || currentRole === 'staff') && (
              <button
                onClick={() => setActiveTab('admin')}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition ${
                  activeTab === 'admin'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Officer Console</span>
                {stats?.pending > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-500 text-white">
                    {stats.pending}
                  </span>
                )}
              </button>
            )}

            <button
              onClick={() => setActiveTab('notices')}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition ${
                activeTab === 'notices'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Bell className="w-4 h-4" />
              <span>Circulars</span>
            </button>
          </nav>

          {/* Action CTA */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenNewComplaint}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-md shadow-blue-600/25 transition active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Lodge Grievance</span>
              <span className="sm:hidden">Lodge</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

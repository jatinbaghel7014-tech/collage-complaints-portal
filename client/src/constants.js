export const CATEGORIES = [
  'All',
  'Hostel',
  'Mess',
  'Academics',
  'Infrastructure',
  'Sanitation',
  'Library',
  'Accounts',
  'Security',
  'Anti-Ragging',
  'Other'
];

export const STATUSES = [
  'All',
  'Submitted',
  'Under Review',
  'In Progress',
  'Resolved',
  'Rejected'
];

export const PRIORITIES = [
  'All',
  'Low',
  'Medium',
  'High',
  'Urgent'
];

export const DEPARTMENTS = [
  'All',
  'Hostel & Estate Office',
  'Mess & Food Committee',
  'Academic Dean Office',
  'Estate & Maintenance',
  'Sanitation & Housekeeping',
  'Central Library Staff',
  'Finance & Accounts Section',
  'Chief Proctor & Flying Squad',
  'Campus Security Office',
  'IT & Network Services',
  'General Administration'
];

export const CATEGORY_COLORS = {
  'Hostel': 'bg-amber-50 text-amber-700 border-amber-200',
  'Mess': 'bg-orange-50 text-orange-700 border-orange-200',
  'Academics': 'bg-blue-50 text-blue-700 border-blue-200',
  'Infrastructure': 'bg-purple-50 text-purple-700 border-purple-200',
  'Sanitation': 'bg-teal-50 text-teal-700 border-teal-200',
  'Library': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Accounts': 'bg-indigo-50 text-indigo-700 border-indigo-200',
  'Security': 'bg-slate-100 text-slate-800 border-slate-300',
  'Anti-Ragging': 'bg-rose-50 text-rose-700 border-rose-300',
  'Other': 'bg-gray-50 text-gray-700 border-gray-200',
};

export const STATUS_COLORS = {
  'Submitted': {
    badge: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    dot: 'bg-yellow-500',
    step: 1
  },
  'Under Review': {
    badge: 'bg-blue-50 text-blue-700 border-blue-200',
    dot: 'bg-blue-500',
    step: 2
  },
  'In Progress': {
    badge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    dot: 'bg-indigo-500',
    step: 3
  },
  'Resolved': {
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dot: 'bg-emerald-500',
    step: 4
  },
  'Rejected': {
    badge: 'bg-rose-50 text-rose-700 border-rose-200',
    dot: 'bg-rose-500',
    step: 0
  }
};

export const PRIORITY_COLORS = {
  'Low': 'bg-slate-100 text-slate-600 border-slate-200',
  'Medium': 'bg-sky-50 text-sky-700 border-sky-200',
  'High': 'bg-amber-50 text-amber-800 border-amber-300 font-semibold',
  'Urgent': 'bg-red-100 text-red-700 border-red-300 font-bold animate-pulse'
};

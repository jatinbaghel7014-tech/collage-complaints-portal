const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Paths
const DATA_DIR = path.join(__dirname, 'data');
const UPLOADS_DIR = path.join(__dirname, 'uploads');
const COMPLAINTS_FILE = path.join(DATA_DIR, 'complaints.json');
const NOTICES_FILE = path.join(DATA_DIR, 'notices.json');

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

app.use('/uploads', express.static(UPLOADS_DIR));

// Multer storage for complaint attachments
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

// Helper functions for data access
function readComplaints() {
  try {
    if (!fs.existsSync(COMPLAINTS_FILE)) return [];
    const data = fs.readFileSync(COMPLAINTS_FILE, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error('Error reading complaints:', err);
    return [];
  }
}

function writeComplaints(data) {
  try {
    fs.writeFileSync(COMPLAINTS_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing complaints:', err);
    return false;
  }
}

function readNotices() {
  try {
    if (!fs.existsSync(NOTICES_FILE)) return [];
    const data = fs.readFileSync(NOTICES_FILE, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error('Error reading notices:', err);
    return [];
  }
}

function writeNotices(data) {
  try {
    fs.writeFileSync(NOTICES_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing notices:', err);
    return false;
  }
}

// ----------------- API ROUTES -----------------

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'College Complaints Portal API', timestamp: new Date() });
});

// Emergency contacts
app.get('/api/emergency-contacts', (req, res) => {
  res.json([
    { title: 'Anti-Ragging 24x7 Helpline', number: '1800-180-5522', email: 'antiragging@college.edu', badge: 'Toll-Free' },
    { title: 'Chief Proctor Office', number: '+91 94123 45678', email: 'proctor@college.edu', badge: 'Discipline' },
    { title: 'Campus Health Centre & Ambulance', number: '+91 11 2659 1100', email: 'hospital@college.edu', badge: 'Medical' },
    { title: 'Internal Complaints Committee (ICC)', number: '+91 94123 88990', email: 'icc-women@college.edu', badge: 'Women Safety' },
    { title: 'Main Security Gate Control Room', number: '+91 11 2659 1000', email: 'security@college.edu', badge: 'Security' },
    { title: 'Hostel Chief Warden Office', number: '+91 94123 77665', email: 'warden@college.edu', badge: 'Hostel' }
  ]);
});

// Notice board
app.get('/api/notices', (req, res) => {
  const notices = readNotices();
  res.json(notices);
});

app.post('/api/notices', (req, res) => {
  const { title, category, author, content, isUrgent } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  const notices = readNotices();
  const newNotice = {
    id: 'NTC-' + String(notices.length + 1).padStart(3, '0'),
    title,
    category: category || 'General',
    author: author || 'Administration',
    content,
    isUrgent: Boolean(isUrgent),
    date: new Date().toISOString().split('T')[0]
  };
  notices.unshift(newNotice);
  writeNotices(notices);
  res.status(201).json(newNotice);
});

// Stats & Analytics
app.get('/api/stats', (req, res) => {
  const complaints = readComplaints();
  const total = complaints.length;
  const pending = complaints.filter(c => c.status === 'Submitted').length;
  const underReview = complaints.filter(c => c.status === 'Under Review').length;
  const inProgress = complaints.filter(c => c.status === 'In Progress').length;
  const resolved = complaints.filter(c => c.status === 'Resolved').length;
  const rejected = complaints.filter(c => c.status === 'Rejected').length;
  const urgent = complaints.filter(c => c.priority === 'Urgent').length;

  // Category breakdown
  const categoryCount = {};
  complaints.forEach(c => {
    categoryCount[c.category] = (categoryCount[c.category] || 0) + 1;
  });

  // Department breakdown
  const deptCount = {};
  complaints.forEach(c => {
    const dept = c.department || 'Unassigned';
    deptCount[dept] = (deptCount[dept] || 0) + 1;
  });

  // Average rating for resolved complaints with feedback
  const feedbacks = complaints.filter(c => c.feedback && c.feedback.rating);
  const avgRating = feedbacks.length
    ? (feedbacks.reduce((acc, c) => acc + c.feedback.rating, 0) / feedbacks.length).toFixed(1)
    : '4.8';

  res.json({
    total,
    pending,
    underReview,
    inProgress,
    resolved,
    rejected,
    urgent,
    avgRating,
    feedbacksCount: feedbacks.length,
    categoryCount,
    deptCount
  });
});

// Get all complaints with filters
app.get('/api/complaints', (req, res) => {
  const { status, category, priority, department, studentRoll, isPublic, search } = req.query;
  let list = readComplaints();

  if (status && status !== 'All') {
    list = list.filter(c => c.status.toLowerCase() === status.toLowerCase());
  }
  if (category && category !== 'All') {
    list = list.filter(c => c.category.toLowerCase() === category.toLowerCase());
  }
  if (priority && priority !== 'All') {
    list = list.filter(c => c.priority.toLowerCase() === priority.toLowerCase());
  }
  if (department && department !== 'All') {
    list = list.filter(c => c.department && c.department.toLowerCase() === department.toLowerCase());
  }
  if (studentRoll) {
    list = list.filter(c => c.studentRoll === studentRoll);
  }
  if (isPublic === 'true') {
    list = list.filter(c => c.isPublic === true);
  }
  if (search) {
    const q = search.toLowerCase();
    list = list.filter(c =>
      c.id.toLowerCase().includes(q) ||
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      (c.location && c.location.toLowerCase().includes(q)) ||
      (c.studentName && c.studentName.toLowerCase().includes(q))
    );
  }

  // Sort by updatedAt descending
  list.sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt));

  res.json(list);
});

// Get single complaint
app.get('/api/complaints/:id', (req, res) => {
  const list = readComplaints();
  const complaint = list.find(c => c.id.toUpperCase() === req.params.id.toUpperCase());
  if (!complaint) {
    return res.status(404).json({ error: 'Complaint not found' });
  }
  res.json(complaint);
});

// File upload
app.post('/api/upload', upload.single('attachment'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({
    filename: req.file.filename,
    originalName: req.file.originalname,
    size: req.file.size,
    url: fileUrl
  });
});

// Create new complaint
app.post('/api/complaints', (req, res) => {
  const {
    title,
    description,
    category,
    priority,
    location,
    studentName,
    studentRoll,
    studentEmail,
    isAnonymous,
    isPublic,
    department,
    attachments
  } = req.body;

  if (!title || !description || !category) {
    return res.status(400).json({ error: 'Title, description, and category are required' });
  }

  const list = readComplaints();
  const nextNum = list.length + 1;
  const id = `CMP-2026-${String(nextNum).padStart(3, '0')}`;
  const now = new Date().toISOString();

  // Determine auto-assigned department if not specified
  const deptMap = {
    'Hostel': 'Hostel & Estate Office',
    'Mess': 'Mess & Food Committee',
    'Academics': 'Academic Dean Office',
    'Infrastructure': 'Estate & Maintenance',
    'Sanitation': 'Sanitation & Housekeeping',
    'Library': 'Central Library Staff',
    'Accounts': 'Finance & Accounts Section',
    'Anti-Ragging': 'Chief Proctor & Flying Squad',
    'Security': 'Campus Security Office',
    'Other': 'General Administration'
  };

  const assignedDept = department || deptMap[category] || 'General Administration';

  const newComplaint = {
    id,
    title,
    description,
    category,
    priority: priority || 'Medium',
    department: assignedDept,
    location: location || 'Campus',
    studentName: isAnonymous ? 'Anonymous Student' : (studentName || 'Student'),
    studentRoll: isAnonymous ? 'HIDDEN' : (studentRoll || 'N/A'),
    studentEmail: isAnonymous ? '' : (studentEmail || ''),
    isAnonymous: Boolean(isAnonymous),
    isPublic: isPublic !== undefined ? Boolean(isPublic) : true,
    upvotes: 1,
    upvotedBy: studentRoll ? [studentRoll] : [],
    status: 'Submitted',
    assignedTo: null,
    createdAt: now,
    updatedAt: now,
    timeline: [
      {
        id: 't-1',
        timestamp: now,
        status: 'Submitted',
        title: 'Complaint Registered',
        note: `Registered with ${priority || 'Medium'} priority in ${category} category.`,
        by: isAnonymous ? 'Anonymous Student' : (studentName || 'Student')
      }
    ],
    comments: [],
    feedback: null,
    attachments: attachments || []
  };

  list.unshift(newComplaint);
  writeComplaints(list);

  res.status(201).json(newComplaint);
});

// Update complaint status & assignment (Admin / Staff)
app.patch('/api/complaints/:id/status', (req, res) => {
  const { status, assignedTo, note, updatedBy, department } = req.body;
  const list = readComplaints();
  const index = list.findIndex(c => c.id.toUpperCase() === req.params.id.toUpperCase());

  if (index === -1) {
    return res.status(404).json({ error: 'Complaint not found' });
  }

  const complaint = list[index];
  const now = new Date().toISOString();

  if (status) complaint.status = status;
  if (department) complaint.department = department;
  if (assignedTo !== undefined) complaint.assignedTo = assignedTo;
  complaint.updatedAt = now;

  // Add timeline entry
  const timelineEntry = {
    id: `t-${Date.now()}`,
    timestamp: now,
    status: status || complaint.status,
    title: `Status updated to ${status || complaint.status}`,
    note: note || (assignedTo ? `Assigned to ${assignedTo.name}` : `Updated by ${updatedBy || 'Staff'}`),
    by: updatedBy || 'Department Officer'
  };

  complaint.timeline.push(timelineEntry);
  writeComplaints(list);

  res.json(complaint);
});

// Toggle upvote
app.post('/api/complaints/:id/upvote', (req, res) => {
  const { studentRoll } = req.body;
  if (!studentRoll) {
    return res.status(400).json({ error: 'studentRoll is required' });
  }

  const list = readComplaints();
  const complaint = list.find(c => c.id.toUpperCase() === req.params.id.toUpperCase());

  if (!complaint) {
    return res.status(404).json({ error: 'Complaint not found' });
  }

  if (!Array.isArray(complaint.upvotedBy)) {
    complaint.upvotedBy = [];
  }

  const existingIdx = complaint.upvotedBy.indexOf(studentRoll);
  let hasUpvoted = false;

  if (existingIdx !== -1) {
    // Remove upvote
    complaint.upvotedBy.splice(existingIdx, 1);
    complaint.upvotes = Math.max(0, (complaint.upvotes || 1) - 1);
    hasUpvoted = false;
  } else {
    // Add upvote
    complaint.upvotedBy.push(studentRoll);
    complaint.upvotes = (complaint.upvotes || 0) + 1;
    hasUpvoted = true;
  }

  writeComplaints(list);
  res.json({ upvotes: complaint.upvotes, hasUpvoted, upvotedBy: complaint.upvotedBy });
});

// Add comment / discussion
app.post('/api/complaints/:id/comments', (req, res) => {
  const { author, role, text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Comment text is required' });
  }

  const list = readComplaints();
  const complaint = list.find(c => c.id.toUpperCase() === req.params.id.toUpperCase());

  if (!complaint) {
    return res.status(404).json({ error: 'Complaint not found' });
  }

  if (!Array.isArray(complaint.comments)) {
    complaint.comments = [];
  }

  const comment = {
    id: `c-${Date.now()}`,
    author: author || 'Student',
    role: role || 'Campus Member',
    text,
    timestamp: new Date().toISOString()
  };

  complaint.comments.push(comment);
  writeComplaints(list);

  res.status(201).json(comment);
});

// Submit feedback (Student rating for resolved complaint)
app.post('/api/complaints/:id/feedback', (req, res) => {
  const { rating, comment } = req.body;
  if (!rating) {
    return res.status(400).json({ error: 'Rating (1-5) is required' });
  }

  const list = readComplaints();
  const complaint = list.find(c => c.id.toUpperCase() === req.params.id.toUpperCase());

  if (!complaint) {
    return res.status(404).json({ error: 'Complaint not found' });
  }

  complaint.feedback = {
    rating: Number(rating),
    comment: comment || '',
    submittedAt: new Date().toISOString()
  };

  writeComplaints(list);
  res.json(complaint.feedback);
});

// Serve frontend in production if built
const clientDist = path.join(__dirname, '../client/dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api') && !req.path.startsWith('/uploads')) {
      res.sendFile(path.join(clientDist, 'index.html'));
    }
  });
}

app.listen(PORT, () => {
  console.log(`\n=================================================`);
  console.log(`🎓 College Complaints Portal Server is RUNNING!`);
  console.log(`🌐 Server Port: http://localhost:${PORT}`);
  console.log(`📁 Data Directory: ${DATA_DIR}`);
  console.log(`=================================================\n`);
});

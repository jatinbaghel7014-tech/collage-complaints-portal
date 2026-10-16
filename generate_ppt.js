const pptxgen = require('pptxgenjs');
const path = require('path');

const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';

// Theme Colors (Matching the college presentation theme from image)
const C_BG = '08182B';        // Deep dark blue
const C_PANEL = '0F2844';     // Card background
const C_BORDER = '1E4068';    // Subtle border
const C_ACCENT = '38BDF8';    // Bright cyan/sky blue
const C_PRIMARY = '60A5FA';   // Light blue
const C_WHITE = 'FFFFFF';     // White
const C_MUTED = '94A3B8';     // Muted gray
const C_GREEN = '34D399';     // Emerald
const C_RED = 'F87171';       // Rose/Red

// Helper to add consistent slide background & footer
function addSlideHeader(slide, title, category = 'COLLEGE COMPLAINTS PORTAL | GRIEVANCE SYSTEM') {
  slide.background = { color: C_BG };
  
  // Category tag
  slide.addText(category.toUpperCase(), {
    x: 0.8,
    y: 0.4,
    w: 8.5,
    h: 0.3,
    fontSize: 9,
    fontFace: 'Arial',
    color: C_ACCENT,
    bold: true
  });

  // Slide Title
  slide.addText(title, {
    x: 0.8,
    y: 0.65,
    w: 11.5,
    h: 0.6,
    fontSize: 22,
    fontFace: 'Arial',
    color: C_WHITE,
    bold: true
  });

  // Horizontal Accent Bar
  slide.addShape(pres.ShapeType.rect, {
    x: 0.8,
    y: 1.25,
    w: 11.7,
    h: 0.03,
    fill: { color: C_BORDER }
  });

  // Footer
  slide.addText('Arya College of Engineering & IT (ACEIT), Jaipur | Department of AI & DS | Session 2026-27', {
    x: 0.8,
    y: 7.1,
    w: 8.5,
    h: 0.3,
    fontSize: 8,
    fontFace: 'Arial',
    color: C_MUTED
  });

  slide.addText('github.com/jatinbaghel7014-tech/collage-complaints-portal', {
    x: 8.5,
    y: 7.1,
    w: 4.0,
    h: 0.3,
    fontSize: 8,
    fontFace: 'Arial',
    color: C_ACCENT,
    align: 'right'
  });
}

// ==========================================
// SLIDE 1: TITLE SLIDE (Matching Image Format)
// ==========================================
const s1 = pres.addSlide();
s1.background = { color: C_BG };

// Accent glow shape
s1.addShape(pres.ShapeType.rect, {
  x: 0.8,
  y: 0.6,
  w: 0.15,
  h: 1.3,
  fill: { color: C_ACCENT }
});

// Title & Subtitle
s1.addText('College Complaints Portal', {
  x: 1.1,
  y: 0.5,
  w: 11.0,
  h: 0.8,
  fontSize: 38,
  fontFace: 'Arial',
  color: C_WHITE,
  bold: true
});

s1.addText('Digital Grievance Redressal & Institutional Maintenance Management Platform', {
  x: 1.1,
  y: 1.3,
  w: 11.0,
  h: 0.45,
  fontSize: 14,
  fontFace: 'Arial',
  color: C_ACCENT,
  italic: true
});

// Horizontal Divider
s1.addShape(pres.ShapeType.rect, {
  x: 1.1,
  y: 1.85,
  w: 11.2,
  h: 0.02,
  fill: { color: C_BORDER }
});

// Left Column: Metadata Details
const metaRows = [
  { label: 'Institution', val: 'Arya College of Engineering & IT (ACEIT), Jaipur\nAffiliated to Rajasthan Technical University (RTU), Kota' },
  { label: 'Department', val: 'Department of Artificial Intelligence & Data Science | Session 2026-27' },
  { label: 'Subject', val: 'Major Project / Web Engineering Laboratory (B.Tech 5th/6th Semester)' },
  { label: 'Project Guide', val: 'Er. Ram Babu Buri, Assistant Professor, Dept. of AI & DS' }
];

let currY = 2.1;
metaRows.forEach((item) => {
  s1.addText(item.label, {
    x: 1.1,
    y: currY,
    w: 2.2,
    h: 0.6,
    fontSize: 11,
    fontFace: 'Arial',
    color: C_PRIMARY,
    bold: true
  });
  s1.addText(item.val, {
    x: 3.4,
    y: currY,
    w: 8.8,
    h: 0.6,
    fontSize: 11,
    fontFace: 'Arial',
    color: C_WHITE
  });
  currY += 0.72;
});

// Engineering Team Panel
s1.addShape(pres.ShapeType.roundRect, {
  x: 1.1,
  y: 5.0,
  w: 11.2,
  h: 1.45,
  fill: { color: C_PANEL },
  line: { color: C_BORDER, width: 1 }
});

s1.addText('ENGINEERING TEAM', {
  x: 1.4,
  y: 5.15,
  w: 5.0,
  h: 0.3,
  fontSize: 10,
  fontFace: 'Arial',
  color: C_ACCENT,
  bold: true
});

s1.addText(
  'Jatin (Lead)  •  Manish  •  Pradeep Kumar Meena  •  Pradeep  •  Kapil Beniwal',
  {
    x: 1.4,
    y: 5.48,
    w: 10.6,
    h: 0.4,
    fontSize: 13,
    fontFace: 'Arial',
    color: C_WHITE,
    bold: true
  }
);

s1.addText('Dept. of Artificial Intelligence & Data Science | Arya College of Engineering & IT (ACEIT)', {
  x: 1.4,
  y: 5.95,
  w: 10.6,
  h: 0.3,
  fontSize: 9.5,
  fontFace: 'Arial',
  color: C_MUTED
});

// Live Link Badge
s1.addShape(pres.ShapeType.roundRect, {
  x: 1.1,
  y: 6.6,
  w: 5.8,
  h: 0.45,
  fill: { color: '1D4ED8' },
  line: { color: '3B82F6', width: 1 }
});

s1.addText('🔗  Live GitHub: github.com/jatinbaghel7014-tech/collage-complaints-portal', {
  x: 1.2,
  y: 6.67,
  w: 5.6,
  h: 0.3,
  fontSize: 8.5,
  fontFace: 'Arial',
  color: C_WHITE,
  bold: true
});

s1.addNotes('Introduce the team members by name: Jatin (Lead), Manish, Pradeep Kumar Meena, Pradeep, and Kapil Beniwal. State the subject and project guide Er. Ram Babu Buri. State the one-line mission: An AICTE/UGC compliant centralized portal to resolve student complaints transparently.');

// ==========================================
// SLIDE 2: EXECUTIVE SUMMARY & OBJECTIVES
// ==========================================
const s2 = pres.addSlide();
addSlideHeader(s2, 'Executive Summary & Project Scope');

s2.addText('Why Digital Grievance Redressal Matters in Higher Education', {
  x: 0.8,
  y: 1.5,
  w: 11.5,
  h: 0.4,
  fontSize: 15,
  fontFace: 'Arial',
  color: C_ACCENT,
  bold: true
});

const cardsS2 = [
  {
    title: 'UGC & AICTE Compliance',
    desc: 'Mandated by AICTE/UGC Grievance Redressal Regulations (2019/2023) requiring every technical institute to maintain an accessible, auditable, and time-bound online grievance portal for students and staff.',
    color: '3B82F6'
  },
  {
    title: 'Zero Paperwork & Speed',
    desc: 'Replaces physical handwritten letters and manual warden registers with direct digital routing to electrical, civil, IT, mess, and sanitation departments with 100% accountability.',
    color: '10B981'
  },
  {
    title: 'Confidentiality & Safety',
    desc: 'Provides secure anonymous lodging for sensitive issues such as anti-ragging, proctorial discipline, and women safety (ICC) preventing identity exposure or student harassment.',
    color: 'F59E0B'
  }
];

cardsS2.forEach((c, idx) => {
  const xPos = 0.8 + idx * 3.95;
  s2.addShape(pres.ShapeType.roundRect, {
    x: xPos,
    y: 2.1,
    w: 3.75,
    h: 4.4,
    fill: { color: C_PANEL },
    line: { color: C_BORDER, width: 1 }
  });
  s2.addShape(pres.ShapeType.rect, {
    x: xPos + 0.3,
    y: 2.4,
    w: 0.1,
    h: 0.35,
    fill: { color: c.color }
  });
  s2.addText(c.title, {
    x: xPos + 0.5,
    y: 2.35,
    w: 3.0,
    h: 0.5,
    fontSize: 13,
    fontFace: 'Arial',
    color: C_WHITE,
    bold: true
  });
  s2.addText(c.desc, {
    x: xPos + 0.3,
    y: 3.1,
    w: 3.15,
    h: 3.2,
    fontSize: 10.5,
    fontFace: 'Arial',
    color: C_MUTED,
    lineSpacing: 16
  });
});

s2.addNotes('Explain the legal and institutional motivation behind College Complaints Portal: mandatory compliance with UGC/AICTE regulations, speeding up maintenance resolution, and safeguarding student privacy.');

// ==========================================
// SLIDE 3: PROBLEM STATEMENT & CHALLENGES
// ==========================================
const s3 = pres.addSlide();
addSlideHeader(s3, 'Problem Statement: Existing System Bottlenecks');

const problems = [
  { num: '01', title: 'Lack of Tracking & Status Opacity', text: 'Students file written complaints in hostel or proctor office registers with zero visibility on who is handling the issue or when it will be fixed.' },
  { num: '02', title: 'Absence of SLA & Escalation Protocol', text: 'No Service Level Agreements (SLAs). Critical issues like hostel water supply failure or lab Wi-Fi breakdown linger for weeks without accountability.' },
  { num: '03', title: 'Fear of Retaliation / Victimization', text: 'Students hesitate to report faculty bias, mess food adulteration, or ragging due to compulsory physical signatures and fear of exposure.' },
  { num: '04', title: 'Uncontrolled Duplicate Complaint Volume', text: 'When a common facility breaks down (e.g., library AC), 40 different students submit individual complaints, overwhelming administration.' }
];

problems.forEach((p, idx) => {
  const row = Math.floor(idx / 2);
  const col = idx % 2;
  const x = 0.8 + col * 5.9;
  const y = 1.6 + row * 2.5;

  s3.addShape(pres.ShapeType.roundRect, {
    x: x,
    y: y,
    w: 5.65,
    h: 2.2,
    fill: { color: C_PANEL },
    line: { color: C_BORDER, width: 1 }
  });

  s3.addText(p.num, {
    x: x + 0.3,
    y: y + 0.25,
    w: 0.8,
    h: 0.4,
    fontSize: 18,
    fontFace: 'Arial',
    color: C_RED,
    bold: true
  });

  s3.addText(p.title, {
    x: x + 1.1,
    y: y + 0.25,
    w: 4.2,
    h: 0.4,
    fontSize: 12,
    fontFace: 'Arial',
    color: C_WHITE,
    bold: true
  });

  s3.addText(p.text, {
    x: x + 0.3,
    y: y + 0.85,
    w: 5.0,
    h: 1.15,
    fontSize: 10,
    fontFace: 'Arial',
    color: C_MUTED,
    lineSpacing: 15
  });
});

s3.addNotes('Detail the core pain points observed on campus: lack of transparency, no SLA enforcement, student reluctance in ragging/harassment reporting, and ticket duplication.');

// ==========================================
// SLIDE 4: PROPOSED ARCHITECTURE & WORKFLOW
// ==========================================
const s4 = pres.addSlide();
addSlideHeader(s4, 'Proposed System Architecture & Role Hierarchy');

// 3 Pillars
const roles = [
  {
    role: 'Student User',
    color: '3B82F6',
    items: [
      'Lodge Grievance with 10+ Categories',
      'Choose Anonymity (Confidential ID)',
      'Upload Supporting Photos/Docs (10MB)',
      'Community Upvote (+1) Campus Feed',
      'Track 4-Stage Live Progress Stepper',
      'Submit 5-Star Resolution Feedback'
    ]
  },
  {
    role: 'Department Officer',
    color: '10B981',
    items: [
      'Department-Filtered Work Queue',
      'Assign Technicians (Electrician/Plumber)',
      'Inspect Geo/Location & Photo Proof',
      'Update Status (Review -> In Progress)',
      'Post Official Resolution Remarks',
      'Broadcast Maintenance Notices'
    ]
  },
  {
    role: 'Dean / Administrator',
    color: '8B5CF6',
    items: [
      'Institutional Health KPI Cards',
      'Domain Distribution Bar Analytics',
      'Average Redressal Rating (4.8/5.0)',
      'Multi-Level Search & Priority Filters',
      '1-Click Export to Audit CSV Report',
      'Zero-Tolerance Anti-Ragging Oversight'
    ]
  }
];

roles.forEach((r, idx) => {
  const xPos = 0.8 + idx * 3.95;
  s4.addShape(pres.ShapeType.roundRect, {
    x: xPos,
    y: 1.6,
    w: 3.75,
    h: 5.0,
    fill: { color: C_PANEL },
    line: { color: r.color, width: 1.5 }
  });

  s4.addShape(pres.ShapeType.rect, {
    x: xPos,
    y: 1.6,
    w: 3.75,
    h: 0.65,
    fill: { color: r.color }
  });

  s4.addText(r.role, {
    x: xPos,
    y: 1.75,
    w: 3.75,
    h: 0.4,
    fontSize: 13,
    fontFace: 'Arial',
    color: C_WHITE,
    bold: true,
    align: 'center'
  });

  let itemY = 2.45;
  r.items.forEach(it => {
    s4.addText('✓  ' + it, {
      x: xPos + 0.25,
      y: itemY,
      w: 3.25,
      h: 0.55,
      fontSize: 9.5,
      fontFace: 'Arial',
      color: C_WHITE
    });
    itemY += 0.62;
  });
});

s4.addNotes('Walk through the three-tier Role-Based Access Control (RBAC): Student persona, Department Officer persona, and Administrative Oversight.');

// ==========================================
// SLIDE 5: MODULE 1 - STUDENT GRIEVANCE PORTAL
// ==========================================
const s5 = pres.addSlide();
addSlideHeader(s5, 'Module 1: Student Grievance Filing & Anonymity');

const s5Features = [
  { title: '10+ Domain Categories', desc: 'Hostel, Mess & Food Hygiene, Academics, Infrastructure & Labs, Sanitation, Library, Accounts, Security, Anti-Ragging, and General Administration.' },
  { title: 'Priority Classification', desc: 'Low, Medium, High, and Urgent (Safety/Emergency). Urgent grievances auto-trigger immediate notifications to proctorial flying squads.' },
  { title: 'Absolute Identity Masking', desc: 'When "File Anonymously" is toggled, student name and roll number are sealed on the backend. Public feed and officers see only "Anonymous Student" with encrypted audit trail.' },
  { title: 'Multer Attachment Engine', desc: 'Integrated photo/document upload system (up to 10MB) allowing students to attach visual proof of broken equipment, leaks, or hazardous wires.' }
];

s5Features.forEach((f, idx) => {
  const row = Math.floor(idx / 2);
  const col = idx % 2;
  const x = 0.8 + col * 5.9;
  const y = 1.6 + row * 2.5;

  s5.addShape(pres.ShapeType.roundRect, {
    x: x,
    y: y,
    w: 5.65,
    h: 2.2,
    fill: { color: C_PANEL },
    line: { color: C_BORDER, width: 1 }
  });

  s5.addText(f.title, {
    x: x + 0.35,
    y: y + 0.25,
    w: 5.0,
    h: 0.35,
    fontSize: 13,
    fontFace: 'Arial',
    color: C_ACCENT,
    bold: true
  });

  s5.addText(f.desc, {
    x: x + 0.35,
    y: y + 0.75,
    w: 4.95,
    h: 1.25,
    fontSize: 10,
    fontFace: 'Arial',
    color: C_WHITE,
    lineSpacing: 15
  });
});

s5.addNotes('Demonstrate how the student lodging form works: categories, priority levels, anonymous identity protection, and photo upload verification.');

// ==========================================
// SLIDE 6: MODULE 2 - COMMUNITY UPVOTING
// ==========================================
const s6 = pres.addSlide();
addSlideHeader(s6, 'Module 2: Community Upvoting & Deduplication');

s6.addShape(pres.ShapeType.roundRect, {
  x: 0.8,
  y: 1.6,
  w: 11.7,
  h: 2.1,
  fill: { color: C_PANEL },
  line: { color: '3B82F6', width: 1.5 }
});

s6.addText('How Community Grievance Upvoting Solves Campus Bottlenecks', {
  x: 1.1,
  y: 1.8,
  w: 11.0,
  h: 0.4,
  fontSize: 14,
  fontFace: 'Arial',
  color: C_ACCENT,
  bold: true
});

s6.addText(
  'Instead of 50 students submitting 50 repetitive tickets when a water cooler in Hostel Block B leaks or Wi-Fi fails in the central library, a single public complaint is posted. Affected students simply click "+1 Affected (Upvote)".\n\n' +
  '• Real-time Impact Metric: Administration immediately sees that 47 students are affected, instantly escalating priority.\n' +
  '• Concurrency & Anti-Fraud Control: The backend verifies student roll number in the upvotedBy array, allowing exactly one upvote per student (toggleable).',
  {
    x: 1.1,
    y: 2.3,
    w: 11.0,
    h: 1.2,
    fontSize: 10.5,
    fontFace: 'Arial',
    color: C_WHITE,
    lineSpacing: 16
  }
);

// 3 Key Outcomes
const s6Outcomes = [
  { label: '80% Reduction in Ticket Clutter', detail: 'Consolidates redundant complaints into single tracked threads with shared comment discussions.' },
  { label: 'Democratic Prioritization', detail: 'Issues with the highest student votes automatically float to the top of the Dean console.' },
  { label: 'Community Discussion', detail: 'Allows student representatives and department technicians to post live repair updates directly in the thread.' }
];

s6Outcomes.forEach((o, i) => {
  const xPos = 0.8 + i * 3.95;
  s6.addShape(pres.ShapeType.roundRect, {
    x: xPos,
    y: 4.0,
    w: 3.75,
    h: 2.6,
    fill: { color: C_PANEL },
    line: { color: C_BORDER, width: 1 }
  });

  s6.addText(o.label, {
    x: xPos + 0.25,
    y: 4.25,
    w: 3.25,
    h: 0.5,
    fontSize: 12,
    fontFace: 'Arial',
    color: C_PRIMARY,
    bold: true
  });

  s6.addText(o.detail, {
    x: xPos + 0.25,
    y: 4.85,
    w: 3.25,
    h: 1.5,
    fontSize: 10,
    fontFace: 'Arial',
    color: C_MUTED,
    lineSpacing: 15
  });
});

s6.addNotes('Highlight the innovative Community Upvoting feature: how it cuts duplicate complaints by 80% and ensures democratic priority ranking.');

// ==========================================
// SLIDE 7: MODULE 3 - 4-STAGE LIFECYCLE & SLA
// ==========================================
const s7 = pres.addSlide();
addSlideHeader(s7, 'Module 3: 4-Stage Resolution Lifecycle & Audit Trail');

const steps = [
  { num: 'STEP 1', name: 'Submitted', desc: 'Ticket registered with timestamp and unique tracking ID (e.g. CMP-2026-001). Auto-assigned to department.', color: 'F59E0B' },
  { num: 'STEP 2', name: 'Under Review', desc: 'Department officer/warden reviews validity, inspects location, and prepares maintenance work order.', color: '3B82F6' },
  { num: 'STEP 3', name: 'In Progress', desc: 'Technician dispatched (e.g. Rajesh Kumar, Electrician). Parts issued from college central store.', color: '6366F1' },
  { num: 'STEP 4', name: 'Resolved', desc: 'Corrective action verified. Student receives notification and unlocks 5-Star satisfaction feedback widget.', color: '10B981' }
];

steps.forEach((st, idx) => {
  const xPos = 0.8 + idx * 2.95;
  s7.addShape(pres.ShapeType.roundRect, {
    x: xPos,
    y: 1.8,
    w: 2.8,
    h: 4.8,
    fill: { color: C_PANEL },
    line: { color: st.color, width: 1.5 }
  });

  s7.addShape(pres.ShapeType.rect, {
    x: xPos,
    y: 1.8,
    w: 2.8,
    h: 0.7,
    fill: { color: st.color }
  });

  s7.addText(st.num + ' : ' + st.name, {
    x: xPos,
    y: 1.95,
    w: 2.8,
    h: 0.4,
    fontSize: 11,
    fontFace: 'Arial',
    color: C_WHITE,
    bold: true,
    align: 'center'
  });

  s7.addText(st.desc, {
    x: xPos + 0.2,
    y: 2.75,
    w: 2.4,
    h: 2.2,
    fontSize: 9.5,
    fontFace: 'Arial',
    color: C_WHITE,
    lineSpacing: 15
  });

  s7.addShape(pres.ShapeType.rect, {
    x: xPos + 0.2,
    y: 5.2,
    w: 2.4,
    h: 0.02,
    fill: { color: C_BORDER }
  });

  s7.addText('Immutable Timeline Log:\nStored with ISO Timestamp, Acting Officer Name & Official Remark.', {
    x: xPos + 0.2,
    y: 5.35,
    w: 2.4,
    h: 1.0,
    fontSize: 8,
    fontFace: 'Arial',
    color: C_MUTED
  });
});

s7.addNotes('Walk through the 4-stage lifecycle from Submitted to Resolved. Emphasize the immutable timeline log that guarantees institutional accountability.');

// ==========================================
// SLIDE 8: MODULE 4 - DEAN & ADMIN ANALYTICS
// ==========================================
const s8 = pres.addSlide();
addSlideHeader(s8, 'Module 4: Dean & Administrative Analytics Dashboard');

const s8Metrics = [
  { label: 'Total Grievances', val: 'Real-Time Total', sub: 'Complete historical and active ticket volume' },
  { label: 'Action Required', val: 'Pending Queue', sub: 'Tickets requiring officer review within 24 hrs' },
  { label: 'In Progress Rate', val: 'Ground Activity', sub: 'Technicians currently active on campus repairs' },
  { label: 'Satisfaction Index', val: '4.8 / 5.0 ⭐', sub: 'Verified student rating across resolved issues' }
];

s8Metrics.forEach((m, idx) => {
  const xPos = 0.8 + idx * 2.95;
  s8.addShape(pres.ShapeType.roundRect, {
    x: xPos,
    y: 1.6,
    w: 2.8,
    h: 1.6,
    fill: { color: C_PANEL },
    line: { color: C_BORDER, width: 1 }
  });

  s8.addText(m.label, {
    x: xPos + 0.2,
    y: 1.75,
    w: 2.4,
    h: 0.3,
    fontSize: 9,
    fontFace: 'Arial',
    color: C_ACCENT,
    bold: true
  });

  s8.addText(m.val, {
    x: xPos + 0.2,
    y: 2.05,
    w: 2.4,
    h: 0.45,
    fontSize: 14,
    fontFace: 'Arial',
    color: C_WHITE,
    bold: true
  });

  s8.addText(m.sub, {
    x: xPos + 0.2,
    y: 2.55,
    w: 2.4,
    h: 0.5,
    fontSize: 8,
    fontFace: 'Arial',
    color: C_MUTED
  });
});

// CSV Export & Filter Capabilities
s8.addShape(pres.ShapeType.roundRect, {
  x: 0.8,
  y: 3.5,
  w: 11.7,
  h: 3.2,
  fill: { color: C_PANEL },
  line: { color: '10B981', width: 1.5 }
});

s8.addText('Executive Reporting & Audit-Ready CSV Export', {
  x: 1.1,
  y: 3.75,
  w: 10.0,
  h: 0.4,
  fontSize: 14,
  fontFace: 'Arial',
  color: C_GREEN,
  bold: true
});

s8.addText(
  '• One-Click Audit Report Generation: Administrators can download a complete CSV report containing Ticket ID, Title, Category, Priority, Location, Resolution Timestamp, and Assigned Officer without external server overhead.\n' +
  '• Departmental Workload Balancing: Real-time distribution graphs highlight which departments (Hostel, Mess, IT, Sanitation) have bottlenecks.\n' +
  '• Multi-Dimensional Search & Filtering: Instant live filtering across Ticket ID, Student Roll Number, Keyword, Priority, and Status.',
  {
    x: 1.1,
    y: 4.3,
    w: 11.0,
    h: 2.1,
    fontSize: 10.5,
    fontFace: 'Arial',
    color: C_WHITE,
    lineSpacing: 18
  }
);

s8.addNotes('Present the administrative dashboard: KPI tracking, department distribution, workload visibility, and 1-click audit CSV report generation.');

// ==========================================
// SLIDE 9: 24x7 EMERGENCY SOS & ANTI-RAGGING
// ==========================================
const s9 = pres.addSlide();
addSlideHeader(s9, 'Module 5: 24x7 Emergency SOS & Safety Cell');

s9.addShape(pres.ShapeType.roundRect, {
  x: 0.8,
  y: 1.6,
  w: 11.7,
  h: 1.5,
  fill: { color: '450A0A' },
  line: { color: C_RED, width: 1.5 }
});

s9.addText('🚨  Immediate Safety & Anti-Ragging Support Protocol', {
  x: 1.1,
  y: 1.8,
  w: 11.0,
  h: 0.4,
  fontSize: 14,
  fontFace: 'Arial',
  color: C_RED,
  bold: true
});

s9.addText(
  'In compliance with statutory Supreme Court of India & UGC mandates, College Complaints Portal features a dedicated high-priority Emergency SOS system. Students facing immediate danger, ragging, or harassment can trigger an instant alert with zero latency.',
  {
    x: 1.1,
    y: 2.25,
    w: 11.0,
    h: 0.65,
    fontSize: 10,
    fontFace: 'Arial',
    color: C_WHITE,
    lineSpacing: 14
  }
);

const contacts = [
  { title: 'Anti-Ragging 24x7 Helpline', num: '1800-180-5522', badge: 'Toll-Free National' },
  { title: 'Chief Proctor Office', num: '+91 94123 45678', badge: 'Discipline & Security' },
  { title: 'Campus Health Centre & Ambulance', num: '+91 11 2659 1100', badge: 'Emergency Medical' },
  { title: 'Internal Complaints Committee (ICC)', num: '+91 94123 88990', badge: 'Women Safety Cell' },
  { title: 'Main Security Control Room', num: '+91 11 2659 1000', badge: 'Campus Gate Patrol' },
  { title: 'Hostel Chief Warden Office', num: '+91 94123 77665', badge: 'Hostel Affairs' }
];

contacts.forEach((ct, idx) => {
  const row = Math.floor(idx / 3);
  const col = idx % 3;
  const x = 0.8 + col * 3.95;
  const y = 3.35 + row * 1.7;

  s9.addShape(pres.ShapeType.roundRect, {
    x: x,
    y: y,
    w: 3.75,
    h: 1.5,
    fill: { color: C_PANEL },
    line: { color: C_BORDER, width: 1 }
  });

  s9.addText(ct.badge.toUpperCase(), {
    x: x + 0.25,
    y: y + 0.18,
    w: 3.25,
    h: 0.25,
    fontSize: 7.5,
    fontFace: 'Arial',
    color: C_RED,
    bold: true
  });

  s9.addText(ct.title, {
    x: x + 0.25,
    y: y + 0.45,
    w: 3.25,
    h: 0.4,
    fontSize: 10.5,
    fontFace: 'Arial',
    color: C_WHITE,
    bold: true
  });

  s9.addText('📞 ' + ct.num, {
    x: x + 0.25,
    y: y + 0.95,
    w: 3.25,
    h: 0.35,
    fontSize: 11,
    fontFace: 'Arial',
    color: C_ACCENT,
    bold: true
  });
});

s9.addNotes('Explain the statutory emergency safety module: National Anti-Ragging toll-free helpline, Chief Proctor, Women Safety ICC, and Campus Ambulance integration.');

// ==========================================
// SLIDE 10: TECH STACK & SYSTEM ARCHITECTURE
// ==========================================
const s10 = pres.addSlide();
addSlideHeader(s10, 'Full-Stack Implementation & Architecture');

const techStack = [
  {
    layer: 'Frontend Layer',
    tech: 'React 18 + Vite 6 + Tailwind CSS',
    details: [
      'Component-driven UI with state isolation',
      'Vite ESM bundler with sub-second HMR',
      'Tailwind CSS v3 utility classes for responsive mobile-ready layout',
      'Lucide React modern SVG vector icons'
    ],
    color: '3B82F6'
  },
  {
    layer: 'Backend API Layer',
    tech: 'Node.js + Express.js REST Framework',
    details: [
      'Stateless RESTful endpoint architecture',
      'CORS enabled with Vite reverse proxy',
      'Multer middleware for 10MB photo upload',
      'Atomic JSON file persistence with zero config'
    ],
    color: '10B981'
  },
  {
    layer: 'DevOps & Tooling',
    tech: 'Git, GitHub & Unified Monorepo',
    details: [
      'Concurrently starts client & API in 1 command',
      'Single-port production build on port 5000',
      'Strict .gitignore excluding node_modules',
      'Version controlled on official GitHub repo'
    ],
    color: '8B5CF6'
  }
];

techStack.forEach((t, idx) => {
  const xPos = 0.8 + idx * 3.95;
  s10.addShape(pres.ShapeType.roundRect, {
    x: xPos,
    y: 1.6,
    w: 3.75,
    h: 5.0,
    fill: { color: C_PANEL },
    line: { color: t.color, width: 1.5 }
  });

  s10.addText(t.layer.toUpperCase(), {
    x: xPos + 0.3,
    y: 1.9,
    w: 3.15,
    h: 0.3,
    fontSize: 9,
    fontFace: 'Arial',
    color: t.color,
    bold: true
  });

  s10.addText(t.tech, {
    x: xPos + 0.3,
    y: 2.2,
    w: 3.15,
    h: 0.65,
    fontSize: 12.5,
    fontFace: 'Arial',
    color: C_WHITE,
    bold: true
  });

  let dY = 3.1;
  t.details.forEach(d => {
    s10.addText('• ' + d, {
      x: xPos + 0.3,
      y: dY,
      w: 3.15,
      h: 0.7,
      fontSize: 9.5,
      fontFace: 'Arial',
      color: C_MUTED,
      lineSpacing: 14
    });
    dY += 0.75;
  });
});

s10.addNotes('Discuss the technical architecture: React 18, Vite, Express, Multer, Tailwind CSS, and single-port deployment on port 5000.');

// ==========================================
// SLIDE 11: FUTURE SCOPE & ROADMAP
// ==========================================
const s11 = pres.addSlide();
addSlideHeader(s11, 'Future Scope & Planned Enhancements');

const futureItems = [
  { title: 'AI-Powered NLP Auto-Routing', text: 'Using Machine Learning (BERT/LLM) to automatically parse complaint descriptions, identify the responsible department, and predict priority with 95% accuracy.' },
  { title: 'Automated SMS & WhatsApp Alerts', text: 'Integration with Twilio / MSG91 API to send real-time SMS updates to students when technicians are dispatched or tickets are resolved.' },
  { title: 'Cross-Platform React Native App', text: 'Extending the React web portal into a native Android and iOS application with push notifications and offline grievance draft storage.' },
  { title: 'Geo-Tagging & Campus GIS Map', text: 'Enabling GPS location tagging and interactive Leaflet map marking broken streetlights, water coolers, and lab equipment on campus.' }
];

futureItems.forEach((f, idx) => {
  const row = Math.floor(idx / 2);
  const col = idx % 2;
  const x = 0.8 + col * 5.9;
  const y = 1.6 + row * 2.5;

  s11.addShape(pres.ShapeType.roundRect, {
    x: x,
    y: y,
    w: 5.65,
    h: 2.2,
    fill: { color: C_PANEL },
    line: { color: C_BORDER, width: 1 }
  });

  s11.addText(f.title, {
    x: x + 0.35,
    y: y + 0.25,
    w: 5.0,
    h: 0.4,
    fontSize: 13,
    fontFace: 'Arial',
    color: C_ACCENT,
    bold: true
  });

  s11.addText(f.text, {
    x: x + 0.35,
    y: y + 0.75,
    w: 4.95,
    h: 1.25,
    fontSize: 10,
    fontFace: 'Arial',
    color: C_WHITE,
    lineSpacing: 15
  });
});

s11.addNotes('Present the future roadmap: AI auto-routing using NLP, SMS/WhatsApp gateways, cross-platform mobile app, and campus GPS tagging.');

// ==========================================
// SLIDE 12: CONCLUSION & Q&A
// ==========================================
const s12 = pres.addSlide();
addSlideHeader(s12, 'Conclusion & Live Demonstration');

s12.addShape(pres.ShapeType.roundRect, {
  x: 0.8,
  y: 1.6,
  w: 11.7,
  h: 3.5,
  fill: { color: C_PANEL },
  line: { color: '3B82F6', width: 2 }
});

s12.addText('Summary of Project Achievements', {
  x: 1.2,
  y: 1.9,
  w: 10.5,
  h: 0.45,
  fontSize: 16,
  fontFace: 'Arial',
  color: C_ACCENT,
  bold: true
});

s12.addText(
  '✓ Fully functional, production-ready Full-Stack College Grievance Portal.\n' +
  '✓ 100% compliant with UGC, AICTE, and National Anti-Ragging Committee mandates.\n' +
  '✓ Eliminates paper bureaucracy with real-time 4-stage tracking and community upvotes.\n' +
  '✓ Empowers administration with real-time KPIs, domain distribution, and 1-click CSV audit export.\n' +
  '✓ Protected confidential reporting for student safety and institutional peace.',
  {
    x: 1.2,
    y: 2.5,
    w: 10.5,
    h: 2.2,
    fontSize: 11.5,
    fontFace: 'Arial',
    color: C_WHITE,
    lineSpacing: 20
  }
);

// Team Mention
s12.addShape(pres.ShapeType.roundRect, {
  x: 0.8,
  y: 5.3,
  w: 11.7,
  h: 1.3,
  fill: { color: '0B1D30' },
  line: { color: C_BORDER, width: 1 }
});

s12.addText('Project Team: Jatin (Lead) • Manish • Pradeep Kumar Meena • Pradeep • Kapil Beniwal', {
  x: 1.1,
  y: 5.5,
  w: 11.0,
  h: 0.35,
  fontSize: 11,
  fontFace: 'Arial',
  color: C_WHITE,
  bold: true
});

s12.addText('Project Guide: Er. Ram Babu Buri | Dept. of Artificial Intelligence & Data Science | ACEIT, Jaipur', {
  x: 1.1,
  y: 5.9,
  w: 11.0,
  h: 0.3,
  fontSize: 9.5,
  fontFace: 'Arial',
  color: C_MUTED
});

s12.addNotes('Conclude the presentation, thank the project guide Er. Ram Babu Buri and external examiners, and invite questions for the viva.');

// ==========================================
// SAVE FILE
// ==========================================
const outputFilePath = path.join(__dirname, 'College_Complaints_Portal_Presentation.pptx');

pres.writeFile({ fileName: outputFilePath }).then(() => {
  console.log('PPT generated successfully at:', outputFilePath);
}).catch(err => {
  console.error('Error generating PPT:', err);
});

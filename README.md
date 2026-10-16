# 🎓 College Complaints Portal

> A modern, comprehensive, and transparent **College Complaints and Grievance Redressal System** built in compliance with UGC / AICTE guidelines to ensure rapid and accountable resolution of campus issues across students, faculty, and administration.

---

## 👥 Engineering Team & Academic Credits

| Role | Details |
| :--- | :--- |
| **Institution** | **Arya College of Engineering & IT (ACEIT), Jaipur**<br>Affiliated to Rajasthan Technical University (RTU), Kota |
| **Department** | **Department of Artificial Intelligence & Data Science** \| Session 2026-27 |
| **Subject** | Major Project / Web Engineering Laboratory (B.Tech) |
| **Project Guide** | **Er. Ram Babu Buri**, Assistant Professor, Dept. of AI & DS |

### 🛠️ Team Members:
- **Member 1 (Lead):** Jatin
- **Member 2:** Manish
- **Member 3:** Pradeep Kumar Meena
- **Member 4:** Pradeep
- **Member 5:** Kapil Beniwal

---

## 📊 Presentation & Viva Defense Resources

- 📽️ **Project Presentation (PPTX):** [`College_Complaints_Portal_Presentation.pptx`](./College_Complaints_Portal_Presentation.pptx) *(Complete 12-slide dark-themed presentation with speaker notes)*
- 📄 **Viva-Voce Q&A Guide (PDF):** [`College_Complaints_Portal_Viva_Questions_Answers.pdf`](./College_Complaints_Portal_Viva_Questions_Answers.pdf) *(Comprehensive 21 Q&A defense document)*

---

## 🚀 How to Run the Project

The application runs seamlessly with a unified full-stack architecture:

- **Web Application URL:** [http://localhost:5000](http://localhost:5000)
- **API Health Check:** [http://localhost:5000/api/health](http://localhost:5000/api/health)

### Commands to Start the Portal:

```bash
# 1. Production Mode (Single-port server serving API & React frontend on port 5000):
npm start

# 2. Development Mode (Hot-reloading with Vite + Express concurrently):
npm run dev
```

---

## ✨ Key Features & Functionality

### 1. 🎓 Student Portal
- **Lodge Grievances:**
  - **Categories:** Hostel, Mess & Food Quality, Academics & Faculty, Infrastructure & Labs, Sanitation, Library, Accounts & Fees, Security & Discipline, Anti-Ragging, and General.
  - **Priority Levels:** Low, Medium, High, and Urgent (Safety/Emergency).
  - Specific location details (Block, Room No, Floor, Lab).
  - **Confidential & Anonymous Filing:** Students can lodge complaints anonymously (`isAnonymous: true`) to protect their identity.
  - **File Attachments:** Upload photos and supporting documents (up to 10MB).
- **Real-Time Status & Lifecycle Tracking:**
  - Each grievance receives a unique tracking code (e.g., `CMP-2026-001`).
  - Interactive 4-stage visual progress stepper: `Submitted` ➔ `Under Review` ➔ `In Progress` ➔ `Resolved`.
  - Immutable activity history and timeline with timestamps, assigned officers, and resolution notes.
- **Community Upvoting & Feed:**
  - Students can upvote (`+1`) common campus issues (e.g., Wi-Fi router malfunction, water cooler leaks) to escalate priority and prevent duplicate complaints.
- **Student Satisfaction Rating:**
  - Once marked as "Resolved", students can submit a 1 to 5-star rating with feedback to measure service quality.

---

### 2. 🛠️ Department Officer Console
- Dedicated role view for department officers (Estate, Maintenance, IT, Mess Committee, Proctorial Board).
- Direct status transitions (`In Progress`, `Resolved`, `Rejected`).
- Assign technicians and field workers (electricians, plumbers, network engineers) with direct contact details.
- Record official corrective action remarks visible to the student.

---

### 3. 🏛️ Admin & Dean Analytics Dashboard
- **Key Performance Indicators (KPIs):** Total Grievances, Action Required (Pending), In Progress, Successfully Resolved, and Student Satisfaction Rating.
- **Domain Distribution:** Real-time visual progress bars breaking down complaints across departments.
- **Export to CSV Report:** Download audit-ready Excel/CSV reports with a single click.
- Multi-dimensional search and filtering (Ticket ID, student, keyword, status, priority, category).

---

### 4. 📢 Campus Notice Board & Circulars
- Official college announcements regarding water/power maintenance schedules, internet upgrades, and campus advisories.
- Publishing panel for administrators to broadcast circulars.

---

### 5. 🚨 24x7 Emergency SOS & Anti-Ragging Cell
- Toll-free 24x7 Anti-Ragging Helpline (`1800-180-5522`).
- Direct contacts for Chief Proctor Office, Campus Security Control Room, Internal Complaints Committee (ICC for Women Safety), and Medical Ambulance.
- One-click number copy and instant call triggers.

---

## 🛠️ Technology Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Lucide Icons
- **Backend:** Node.js, Express.js, Multer (File Upload Handling)
- **Data Architecture:** Persistent JSON-based data store (`server/data/complaints.json`, `server/data/notices.json`) with atomic operations — zero external dependencies, robust and easily portable to MongoDB/PostgreSQL via REST abstraction.
- **Styling:** Tailwind CSS (Utility-First, Responsive Design, Custom Glassmorphism UI)

---

## 📂 Project Directory Structure

```
college-complaints-portal/
├── College_Complaints_Portal_Presentation.pptx   # Official 12-slide Project Defense PPT
├── College_Complaints_Portal_Viva_Questions_Answers.pdf # Comprehensive Viva Q&A Guide
├── client/                     # React Frontend (Vite + Tailwind CSS)
│   ├── src/
│   │   ├── components/         # Navbar, ComplaintCard, Modals, AdminDashboard, NoticeBoard
│   │   ├── constants.js        # Color schemes, categories, and status mappings
│   │   ├── App.jsx             # Main Application Container & State Management
│   │   └── main.jsx
│   ├── index.html
│   └── vite.config.js
├── server/                     # Express REST API
│   ├── data/
│   │   ├── complaints.json     # Complaints persistent store
│   │   └── notices.json        # Notice board announcements
│   ├── uploads/                # Student file attachments
│   └── server.js               # REST API Server & static client host
├── package.json
└── README.md
```

---

## 📜 Compliance & Standards

- Adheres to **UGC (Grievance Redressal Regulations)** guidelines.
- Complies with **AICTE Mandate** for Student Grievance Redressal Committees (SGRC).
- Confidential reporting compliant with the **National Anti-Ragging Monitoring System**.

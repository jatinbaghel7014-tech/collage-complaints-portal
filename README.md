# 🎓 CampusSamadhan - College Grievance & Complaints Portal

> एक आधुनिक, सम्पूर्ण और पारदर्शी **कॉलेज शिकायत और समाधान पोर्टल (College Grievance Redressal System)** जो UGC / AICTE नियमों के अनुरूप छात्रों, शिक्षकों और प्रशासन के बीच शिकायतों के त्वरित निवारण हेतु तैयार किया गया है।

---

## 🚀 वेबसाइट कैसे चलाएं (How to Run)

वेबसाइट अभी आपके कंप्यूटर पर **सफलतापूर्वक चल रही है (LIVE)**:

- **मुख्य वेबसाइट (Website URL):** [http://localhost:5000](http://localhost:5000)
- **API Health Check:** [http://localhost:5000/api/health](http://localhost:5000/api/health)

### भविष्य में वेबसाइट दोबारा शुरू करने के लिए:
```bash
# 1. प्रोडक्शन मोड (Single Server for both Frontend & Backend):
npm start

# 2. डेवलपमेंट मोड (Hot-reloading with Vite + Express):
npm run dev
```

---

## ✨ मुख्य सुविधाएं (Key Features)

### 1. 🎓 छात्र पोर्टल (Student Portal)
- **नई शिकायत दर्ज करें (Lodge Grievance):**
  - श्रेणियां: हॉस्टल (Hostel), मेस व भोजन (Mess), अकादमिक (Academics), बुनियादी ढांचा व लैब्स (Infrastructure), स्वच्छता (Sanitation), लाइब्रेरी (Library), खाते व शुल्क (Accounts), सुरक्षा (Security), एंटी-रैगिंग (Anti-Ragging).
  - प्राथमिकता का चयन: Low, Medium, High, Urgent.
  - स्थान / रूम नंबर / ब्लॉक का विवरण.
  - **गोपनीयता / गुमनाम विकल्प (Anonymous Filing):** छात्र अपनी पहचान छुपाकर भी शिकायत दर्ज कर सकते हैं।
  - फोटो या दस्तावेज अटैचमेंट की सुविधा।
- **शिकायत ट्रैकिंग (Real-time Status Tracking):**
  - प्रत्येक शिकायत को एक यूनिक ट्रैकिंग कोड मिलता है (उदा. `CMP-2026-001`).
  - 4-चरणीय लाइव प्रोग्रेस बार: `Submitted` ➔ `Under Review` ➔ `In Progress` ➔ `Resolved`.
  - तारीख, समय और अधिकारी के नोट्स के साथ संपूर्ण एक्टिविटी टाइमलाइन।
- **कैंपस कम्युनिटी फीड और अपवोट (Community Upvoting):**
  - सामान्य सार्वजनिक समस्याओं (जैसे वाई-फाई खराब होना, वाटर कूलर लीकेज) को अन्य छात्र अपवोट कर सकते हैं, जिससे कॉलेज प्रशासन को समस्या की गंभीरता का तुरंत पता चलता है।
- **संतुष्टि रेटिंग व समीक्षा (Feedback & Rating):**
  - शिकायत हल होने पर छात्र 1 से 5 स्टार रेटिंग और अपनी टिप्पणी दे सकते हैं।

### 2. 🛠️ विभाग व अधिकारी कंसोल (Department Officer Console)
- विभिन्न विभागों (इस्टेट, आईटी, मेस कमेटी, प्रॉक्टर) के अधिकारियों के लिए अलग प्रबंधन दृश्य।
- स्टेटस अपडेट करने की सुविधा (`In Progress`, `Resolved`, `Rejected`).
- तकनीशियन या कर्मचारी को असाइन करना (उदा. प्लंबर, इलेक्ट्रीशियन का नाम व संपर्क)।
- आधिकारिक समाधान टिप्पणी (Resolution Remark) जोड़ना।

### 3. 🏛️ डीन व एडमिन डैशबोर्ड (Admin & Dean Analytics)
- मुख्य संकेतक (KPIs): कुल शिकायतें, लंबित (Pending), प्रगति पर (In Progress), हल की गई (Resolved), और छात्र संतुष्टि स्कोर (Star Rating)।
- डोमेन वार शिकायत वितरण बार और चार्ट्स।
- **CSV रिपोर्ट डाउनलोड (Export to CSV):** एक क्लिक में सभी शिकायतों की एक्सेल/सीएसवी रिपोर्ट डाउनलोड करें।
- त्वरित खोज और बहु-स्तरीय फ़िल्टर (श्रेणी, प्राथमिकता, स्थिति)।

### 4. 📢 नोटिस बोर्ड व सर्कुलर (Campus Bulletin)
- कॉलेज में रखरखाव, पानी/बिजली कटौती, या नियमों की आधिकारिक सूचनाएं।
- एडमिन द्वारा नए नोटिस प्रकाशित करने की सुविधा।

### 5. 🚨 24x7 इमरजेंसी एसओएस (Emergency Support & Anti-Ragging Cell)
- एंटी-रैगिंग टोल-फ्री हेल्पलाइन (1800-180-5522).
- चीफ प्रॉक्टर व सुरक्षा नियंत्रण कक्ष के सीधे नंबर।
- महिला शिकायत निवारण प्रकोष्ठ (ICC) और कैंपस एम्बुलेंस हेल्पलाइन।
- एक क्लिक में नंबर कॉपी करने व सीधे कॉल करने की सुविधा।

---

## 🛠️ तकनीकी संरचना (Tech Stack)

- **Frontend:** React 18, Vite, Tailwind CSS, Lucide Icons
- **Backend:** Node.js, Express.js, Multer (फ़ाइल अपलोड्स)
- **Database/Store:** JSON Data Store (`server/data/complaints.json`, `server/data/notices.json`) - जीरो कॉन्फ़िगरेशन, डेटा सुरक्षित और हमेशा उपलब्ध।

---

## 📂 फ़ोल्डर संरचना (Folder Structure)

```
college complaints portal/
├── client/                     # रिएक्ट फ्रंटएंड (Vite + Tailwind)
│   ├── src/
│   │   ├── components/         # Navbar, ComplaintCard, Modals, AdminDashboard
│   │   ├── constants.js        # श्रेणियां, रंग और स्थितियां
│   │   ├── App.jsx             # मुख्य ऍप्लिकेशन और स्टेट
│   │   └── main.jsx
│   ├── index.html
│   └── vite.config.js
├── server/                     # एक्सप्रेस बैकएंड API
│   ├── data/
│   │   ├── complaints.json     # सभी शिकायतों का डेटा
│   │   └── notices.json        # सर्कुलर और नोटिस
│   ├── uploads/                # छात्रों द्वारा अपलोड की गई फ़ाइलें
│   └── server.js               # REST API सर्वर
├── package.json
└── README.md
```

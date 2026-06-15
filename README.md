<div align="center">

# 🚀 Apoorv Singh — Developer Portfolio

**A full-stack personal portfolio with a built-in CMS-style Admin Dashboard**

![React](https://img.shields.io/badge/UI-React_19-20232A?logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Build-Vite_8-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Styling-Tailwind_CSS_4-06B6D4?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Animation-Framer_Motion-0055FF?logo=framer&logoColor=white)
![React Router](https://img.shields.io/badge/Routing-React_Router_v7-CA4245?logo=reactrouter&logoColor=white)
![Axios](https://img.shields.io/badge/HTTP-Axios-5A29E4?logo=axios&logoColor=white)
![Netlify](https://img.shields.io/badge/Deployed-Netlify-00C7B7?logo=netlify&logoColor=white)

</div>

---

## 📌 Overview

This is my personal developer portfolio — built not just as a static showcase, but as a **dynamic full-stack application**. Content like projects, skills, and work experience is served from a live backend API, and can be managed through a **protected Admin Dashboard** without touching a line of code.

The design is minimal and dark-themed, with smooth animations and a two-column layout — a fixed sidebar on desktop and a scrollable content area that auto-highlights the active section as you scroll.

---

## ✨ Features

- **Dynamic Content via API** — Projects, Skills, and Experience are fetched from a REST API, making the portfolio content fully manageable without redeployment.
- **Admin Dashboard** — A protected `/admin` route with login-gated access to add, edit, or remove Skills, Projects, and Experience entries in real time.
- **Scroll-Aware Navigation** — Active section is automatically detected using `requestAnimationFrame` and highlighted in the sidebar.
- **Smooth Animations** — Powered by Framer Motion for entrance effects and transitions.
- **Responsive Design** — Fixed sidebar layout on desktop collapses gracefully on mobile.
- **Certifications Showcase** — Dedicated section in About for professional certifications with custom iconography.

---

## 🛠️ Tech Stack

| Layer       | Technology                        |
| ----------- | --------------------------------- |
| Framework   | React 19                          |
| Build Tool  | Vite 8                            |
| Styling     | Tailwind CSS 4                    |
| Animations  | Framer Motion                     |
| Routing     | React Router DOM v7               |
| Icons       | Lucide React, React Icons         |
| HTTP        | Axios                             |
| Backend API | Node.js / Express (separate repo) |

---

## 📁 Project Structure

```
Portfolio/
├── public/
├── src/
│   ├── components/
│   │   ├── Portfolio.jsx        # Main layout with scroll tracking
│   │   ├── Sidebar.jsx          # Fixed left sidebar with nav links
│   │   ├── About.jsx            # Bio, highlights, certifications
│   │   ├── Experience.jsx       # Work experience (API-driven)
│   │   ├── Skills.jsx           # Skills grid (API-driven)
│   │   ├── Projects.jsx         # Project cards (API-driven)
│   │   ├── Contact.jsx          # Contact section
│   │   ├── SectionLabel.jsx     # Reusable section header component
│   │   └── admin/
│   │       ├── AdminLogin.jsx        # Login page for admin access
│   │       ├── AdminDashboard.jsx    # Dashboard shell with sidebar
│   │       ├── AdminSidebar.jsx      # Admin navigation
│   │       ├── ProtectedAdmin.jsx    # Auth guard for admin routes
│   │       ├── SkillsManager.jsx     # CRUD for skills
│   │       ├── ProjectsManager.jsx   # CRUD for projects
│   │       └── ExperienceManager.jsx # CRUD for experience
│   ├── data.js                  # Static data (hero, about, contact)
│   ├── utils/
│   │   └── skillIcons.js        # Skill icon renderer utility
│   └── App.jsx                  # Root component with routing
├── package.json
├── vite.config.js
└── .env                         # VITE_API_URL config
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+
- A running backend API (configure via `.env`)

### Installation

```bash
# Clone the repository
git clone https://github.com/Apoorv3826/Portfolio.git
cd Portfolio

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000
```

> Replace with your deployed backend URL in production.

### Run Locally

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🔐 Admin Panel

The portfolio includes a content management system accessible at `/admin`.

| Route              | Description                                        |
| ------------------ | -------------------------------------------------- |
| `/admin`           | Login page                                         |
| `/admin/dashboard` | Protected dashboard (Skills, Projects, Experience) |

The `ProtectedAdmin` component guards the dashboard route — unauthenticated users are redirected to the login page. All content updates reflect on the live portfolio instantly via API.

---


## 👤 About Me

**Apoorv Singh** — MERN Stack Developer from Bhopal, India.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

Made with ❤️ by **Apoorv Singh**

⭐ If you found this helpful, consider giving it a star!

</div>

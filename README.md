<div align="center">

# 🚀 Apoorv Singh — Developer Portfolio

**A full-stack personal portfolio with a built-in CMS-style Admin Dashboard**


![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)

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

## 🌐 Deployment

The frontend is deployed on **Netlify**.

[![Netlify Status](https://api.netlify.com/api/v1/badges/placeholder/deploy-status)](https://apoorv-my-portfolio.netlify.app/)

To deploy your own fork:

1. Push to GitHub
2. Connect the repo to [Netlify](https://netlify.com)
3. Set the build command: `npm run build`
4. Set the publish directory: `dist`
5. Add the `VITE_API_URL` environment variable in Netlify settings

---

## 👤 About Me

**Apoorv Singh** — MERN Stack Developer from Bhopal, India.

- 🎓 B.Tech CSE — Sagar Institute of Science and Technology (CGPA: 7.88)
- 💼 Open to full-time opportunities
- 🏆 5★ HackerRank · 3★ CodeChef · 200+ LeetCode problems
- 🔐 Cybersecurity background — MP Police Cyber Cell

### Certifications

- Problem Solving Intermediate — HackerRank
- Advance Java — CodeChef
- Linux System Administration
- IIRS Geoprocessing using Python — ISRO/IIRS

---

## 📬 Contact

| Platform     | Link                                                                          |
| ------------ | ----------------------------------------------------------------------------- |
| 📧 Email     | singhapoorv350@gmail.com                                                      |
| 💼 LinkedIn  | [apoorv-singh-a7b79b224](https://www.linkedin.com/in/apoorv-singh-a7b79b224/) |
| 🐙 GitHub    | [Apoorv3826](https://github.com/Apoorv3826)                                   |
| 🌐 Portfolio | [apoorv-my-portfolio.netlify.app](https://apoorv-my-portfolio.netlify.app/)   |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

Made with ❤️ by **Apoorv Singh**

⭐ If you found this helpful, consider giving it a star!

</div>

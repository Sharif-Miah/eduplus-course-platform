# 🎓 EduConnect — Next-Gen E-Learning & Course Platform

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![NextAuth](https://img.shields.io/badge/Auth-NextAuth_v5-blueviolet?style=for-the-badge&logo=auth0)](https://authjs.dev/)
[![Stripe](https://img.shields.io/badge/Payments-Stripe-635BFF?style=for-the-badge&logo=stripe)](https://stripe.com/)

**A comprehensive, production-ready full-stack Learning Management System (LMS) built with Next.js 14 App Router, Tailwind CSS, MongoDB, and NextAuth.js.**

[Live Demo](https://main--cool-froyo-b26ad4.netlify.app) • [Report Bug](https://github.com/Sharif-Miah/educonnect-course-platform/issues) • [Request Feature](https://github.com/Sharif-Miah/educonnect-course-platform/issues)

</div>

---

## 📖 Overview

**EduConnect** is an all-in-one educational platform engineered for seamless online learning and course monetization. It bridges the gap between passionate instructors and eager learners with an interactive cinema video classroom, automated progress tracking, Stripe checkout integration, dynamic PDF certificate generation, and dedicated instructor administration portals.

---

## ✨ Key Features

### 👨‍🎓 For Students
- **Interactive Video Classroom:** Fluid video player supporting YouTube and custom media streams with auto-saved watch timestamps.
- **Curriculum & Lesson Navigation:** Step-by-step module accordion, seamless Next/Previous lesson traversal, and real-time progress percentage bar.
- **Interactive Quiz Assessments:** Module-wise quizzes with instant answer validation and score calculation.
- **Automated Certificate Generation:** Earn and download official PDF certificates upon achieving 100% course completion.
- **One-Click Stripe Checkout:** Secure course purchasing with instant enrollment access.
- **Student Portal:** Dedicated "My Courses" and "My Profile" tabs to track active learnings and reviews.

### 👨‍🏫 For Instructors
- **Analytics Command Center:** Live dashboard tracking total students enrolled, published courses, lifetime gross revenue, and student review ratings.
- **Full Curriculum Studio:** Add, update, and organize course chapters, video lessons, descriptions, and file resources.
- **Live Class Scheduling:** Broadcast live webinars and schedule virtual session links for students.
- **Quiz Set Creator:** Build multiple-choice quiz questions and associate them with specific course modules.
- **Media Uploads:** Drag-and-drop course thumbnail and resource uploads.

### ⚙️ Platform & Architecture
- **Role-Based Authentication (RBAC):** NextAuth.js v5 with dual-role registration (`student` vs `instructor`), bcrypt credential hashing, and Google OAuth.
- **Modern UI & Aesthetics:** Fully responsive layout with Glassmorphism, animated carousels, and complete Dark / Light theme switching via `next-themes`.
- **Production Optimized:** Standalone Netlify / Vercel ready configuration with dynamic server rendering and SEO meta optimizations.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | Next.js 14 (App Router, Server Components & Actions) |
| **Language** | JavaScript (ES6+), React 18 |
| **Styling** | Tailwind CSS, Lucide React, Shadcn/UI Components |
| **Database** | MongoDB Atlas with Mongoose ORM |
| **Authentication** | NextAuth.js (v5 / Auth.js) with JWT Strategy |
| **Payments** | Stripe Payments API & Checkout Sessions |
| **Emails** | Resend API / React Email |
| **Video Player** | React Player |
| **Deployment** | Netlify / Vercel (Node 18+ runtime) |

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: `v18.17.0` or higher
- **npm** / **yarn** / **pnpm**
- **MongoDB Atlas** Database Cluster

### 2. Clone the Repository
```bash
git clone https://github.com/Sharif-Miah/educonnect-course-platform.git
cd educonnect
```

### 3. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 4. Configure Environment Variables
Create a `.env` file in the project root directory and add the following keys:

```env
# MongoDB Connection
MONGODB_CONNECTION_STRING=your_mongodb_cluster_uri
MONGO_CONNECTION_STRING=your_mongodb_cluster_uri

# NextAuth Configuration
AUTH_SECRET=your_auth_secret_key_here
NEXTAUTH_SECRET=your_auth_secret_key_here
AUTH_TRUST_HOST=true
NEXTAUTH_URL=http://localhost:3000

# Stripe Payment Gateway
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key

# Email Service
RESEND_API_KEY=re_your_resend_api_key
```

### 5. Run the Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 6. Build for Production
```bash
npm run build
npm start
```

---

## 📂 Directory Structure

```plaintext
educonnect/
├── app/                        # Next.js 14 App Router
│   ├── (main)/                 # Public and student routes
│   │   ├── about/              # About us narrative page
│   │   ├── account/            # Student profile & enrolled courses
│   │   ├── blog/               # Educational blog and articles
│   │   ├── categories/         # Category browsing hub
│   │   ├── contact/            # Contact and inquiry page
│   │   ├── courses/            # Course catalog & course overview
│   │   │   └── [id]/lesson/    # Interactive learning classroom
│   │   ├── docs/               # Platform documentation
│   │   └── pricing/            # Membership & pricing plans
│   ├── api/                    # Serverless API routes (auth, stripe, cert, me)
│   ├── dashboard/              # Instructor management center
│   │   ├── courses/            # Course creation & management
│   │   ├── lives/              # Live stream scheduler
│   │   └── quiz-sets/          # Quiz and assessment designer
│   ├── login/                  # User login page
│   └── register/[role]/        # Student & Instructor registration
├── components/                 # Reusable UI components & navigation
├── lib/                        # Utility functions, helpers & price formatters
├── model/                      # Mongoose Schema definitions
├── queries/                    # Database query and mutation services
├── service/                    # MongoDB connection singleton
├── public/                     # Static media, SVG icons & course images
└── netlify.toml                # Netlify deployment configuration
```

---

## 🌐 Deployment (Netlify / Vercel)

### Deploying to Netlify
1. Push your repository to **GitHub**.
2. Connect your repository on **[Netlify](https://app.netlify.com)**.
3. In **Site Configuration → Environment Variables**, add all keys from your `.env`.
4. Deploy the site. Once live, update `NEXTAUTH_URL` with your production URL.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/Sharif-Miah/educonnect-course-platform/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/Sharif-Miah">Sharif Miah</a></sub>
</div>

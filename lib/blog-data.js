export const BLOG_CATEGORIES = [
  "All",
  "Web Development",
  "Python & AI",
  "UI/UX Design",
  "Career & Growth",
];

export const BLOG_POSTS = [
  {
    slug: "modern-fullstack-developer-roadmap-2026",
    title: "The Complete Fullstack Web Development Roadmap in 2026",
    description: "A step-by-step guide to mastering Frontend (React 19, Next.js), Backend (Node, Mongoose, REST/GraphQL), and DevOps in 2026.",
    category: "Web Development",
    readTime: "8 min read",
    publishedDate: "Aug 18, 2026",
    featured: true,
    author: {
      name: "John Doe",
      role: "Senior Fullstack Lead & EduPlus Instructor",
      avatar: "https://i.pravatar.cc/150?u=john",
    },
    image: "/assets/images/courses/learn_react_thumbnail.avif",
    tags: ["Next.js", "React", "Node.js", "Career"],
    relatedCourseId: "664813cc6fe803e9128d7fae",
    content: `
## Introduction

The landscape of modern web development is evolving faster than ever. With server-side rendering, React Server Components (RSC), TypeScript by default, and AI-assisted development, building high-performing fullstack applications requires a clear, structured roadmap.

In this guide, we break down the exact technologies you need to master to land senior developer roles in 2026.

---

### Step 1: Core Foundation & Modern JavaScript (ES2024+)
Before jumping into advanced frameworks, solidify your fundamentals:
- **Clean Architecture & Semantic HTML5**
- **Modern CSS**: Flexbox, CSS Grid, Tailwind CSS, and CSS Variable Tokens.
- **Asynchronous JavaScript**: Promises, async/await, closures, and the Event Loop.
- **TypeScript**: Strict typing, generics, utility types, and interfaces.

\`\`\`javascript
// Example: Safe Async Data Fetching in Modern JS
async function fetchCourseDetails(courseId) {
  try {
    const res = await fetch(\`/api/courses/\${courseId}\`);
    if (!res.ok) throw new Error(\`Failed to fetch course: \${res.status}\`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Course fetch error:", err.message);
    return null;
  }
}
\`\`\`

---

### Step 2: Modern Frontend with React 19 & Next.js App Router
React remains the undeniable leader of frontend development:
- **Server Components vs. Client Components**: Understand when to fetch data directly on the server without client bundle overhead.
- **Server Actions**: Mutating database records seamlessly without manual REST boilerplate.
- **Optimistic UI & State Management**: Zustand, React Hook Form, and TanStack Query.

---

### Step 3: Database & Backend Architecture
Fullstack mastery requires robust persistence:
- **MongoDB & Mongoose**: Schema design, indexing, population, and connection caching.
- **PostgreSQL & Prisma / Drizzle**: Relational querying for mission-critical apps.
- **Authentication**: NextAuth.js (Auth.js v5), JWT tokens, and OAuth 2.0.

---

### Summary Checklist for 2026
1. Master TypeScript & Modern JavaScript.
2. Build 3 Production-grade Next.js projects with MongoDB & Stripe.
3. Deploy with CI/CD on Vercel or AWS.
    `,
  },
  {
    slug: "mastering-javascript-event-loop-async",
    title: "Demystifying the JavaScript Event Loop, Microtasks & Promises",
    description: "Understand how JavaScript handles concurrency, call stack execution, microtask queues, and async/await under the hood.",
    category: "Web Development",
    readTime: "6 min read",
    publishedDate: "Aug 15, 2026",
    featured: false,
    author: {
      name: "Michael Brown",
      role: "JavaScript Architect",
      avatar: "https://i.pravatar.cc/150?u=michael",
    },
    image: "/assets/images/courses/learn_js_thumbnail.jpeg",
    tags: ["JavaScript", "Async", "Performance"],
    content: `
## Why Understand the Event Loop?

JavaScript is single-threaded, meaning it has only one call stack and can do one thing at a time. Yet, we make network requests, stream videos, and handle millions of user interactions without blocking the UI.

How does this happen? The secret lies in the **JavaScript Event Loop**!

### Call Stack, Web APIs, and Task Queues
1. **Call Stack**: Executes synchronous code line-by-line (LIFO).
2. **Web APIs**: Browser threads handling \`setTimeout\`, \`fetch\`, DOM events, and IndexedDB.
3. **Microtask Queue**: High-priority queue for \`Promise.then()\`, \`async/await\`, and \`queueMicrotask()\`.
4. **Macrotask Queue**: Regular queue for \`setTimeout\`, \`setInterval\`, and I/O callbacks.

\`\`\`javascript
console.log("1. Synchronous start");

setTimeout(() => {
  console.log("4. Macrotask (setTimeout)");
}, 0);

Promise.resolve().then(() => {
  console.log("3. Microtask (Promise)");
});

console.log("2. Synchronous end");

// Output Order:
// 1. Synchronous start
// 2. Synchronous end
// 3. Microtask (Promise)
// 4. Macrotask (setTimeout)
\`\`\`

> **Key Rule**: The Event Loop always empties the entire Microtask queue before picking the next task from the Macrotask queue!
    `,
  },
  {
    slug: "python-backend-development-best-practices",
    title: "Python for Modern Backend APIs & Data Engineering",
    description: "Why Python continues to dominate backend API design, asynchronous processing, and AI integrations in 2026.",
    category: "Python & AI",
    readTime: "7 min read",
    publishedDate: "Aug 10, 2026",
    featured: false,
    author: {
      name: "Alex Brown",
      role: "Python & AI Specialist",
      avatar: "https://i.pravatar.cc/150?u=alex",
    },
    image: "/assets/images/courses/python_thumbnail.png",
    tags: ["Python", "FastAPI", "Data", "Backend"],
    content: `
## The Power of Python in Modern Systems

Python is no longer just a scripting language. With modern frameworks like **FastAPI**, **Pydantic v2**, and asynchronous event loops with **AsyncIO**, Python matches Go and Node.js in performance while retaining the world's richest AI ecosystem.

### Key Python Backend Best Practices
1. **Type Hints & Pydantic Validation**: Never write untyped Python functions in production code.
2. **Virtual Environments**: Always isolate dependencies with \`poetry\` or \`uv\`.
3. **Async DB Connections**: Use \`asyncpg\` or \`motor\` (Async MongoDB) for non-blocking database queries.

\`\`\`python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr

app = FastAPI(title="EduPlus API")

class UserRegister(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    password: str

@app.post("/api/v1/auth/signup", status_code=201)
async def signup_user(user: UserRegister):
    # Process user registration securely
    return {"message": f"Welcome to EduPlus, {user.first_name}!"}
\`\`\`
    `,
  },
  {
    slug: "building-design-systems-with-tailwind-css",
    title: "Crafting Scalable UI Design Systems with Tailwind CSS & Tokens",
    description: "How to structure tokens, typography, dark mode palettes, and reusable component libraries that scale across large engineering teams.",
    category: "UI/UX Design",
    readTime: "5 min read",
    publishedDate: "Aug 06, 2026",
    featured: false,
    author: {
      name: "Fatima Shekh",
      role: "Principal Product Designer",
      avatar: "https://i.pravatar.cc/150?u=fatima",
    },
    image: "/assets/images/categories/design.jpg",
    tags: ["Design System", "TailwindCSS", "UI/UX", "Figma"],
    content: `
## Why Every Product Needs a Design System

A great design system ensures consistency, cuts frontend development time by 50%, and creates a cohesive user experience that builds trust.

### Essential Components of a Modern Design System
1. **Design Tokens**: Centralized CSS variables for primary, accent, surface, border, and semantic alert colors.
2. **Typography Hierarchy**: Fluid clamp sizing for headings, readable body leading, and monospace code fonts.
3. **Accessible Micro-interactions**: Smooth transitions, focus states, and keyboard accessibility.
    `,
  },
  {
    slug: "how-to-crack-tech-interviews-in-2026",
    title: "How to Crack High-Paying Software Engineering Interviews in 2026",
    description: "Practical strategies for System Design, Live Coding, Portfolio presentation, and Behavioral rounds at top tech companies.",
    category: "Career & Growth",
    readTime: "9 min read",
    publishedDate: "Aug 02, 2026",
    featured: false,
    author: {
      name: "John Doe",
      role: "Senior Engineering Manager",
      avatar: "https://i.pravatar.cc/150?u=john",
    },
    image: "/assets/images/courses/typescript-worth.png",
    tags: ["Interviews", "Career", "System Design", "Portfolio"],
    content: `
## Navigating the 2026 Tech Job Market

Landing a top software engineering role today is less about memorizing algorithmic puzzles and more about demonstrating real-world architecture, clean code, and effective communication.

### The 4 Pillars of Interview Preparation:
1. **Real-world Projects**: Build fullstack applications with authentication, payment processing (Stripe), and responsive dashboards.
2. **System Design Fundamentals**: Understand caching (Redis), rate-limiting, database indexing, and microservices vs. modular monoliths.
3. **Clean Code & Testing**: Write readable, maintainable code with unit and integration tests.
4. **Behavioral & Leadership Stories**: Use the STAR method (Situation, Task, Action, Result) to convey your engineering impact.
    `,
  },
];

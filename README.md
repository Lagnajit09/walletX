# 💸 SwiftPay

**SwiftPay** is a modern, secure, and responsive web application that allows users to manage digital transactions with ease. Built with **Next.js** and a powerful tech stack, it simulates the experience of a real-world digital wallet system—supporting user authentication, peer-to-peer (P2P) transfers, transaction history, wallet management, and more.

---

## 🚀 Features

### 🔐 Authentication

- Sign up, Sign in with NextAuth
- Forgot password flow
- Security PIN setup & verification for added protection

### 👤 User Profile & Settings

- Editable user profile
- Personalized wallet tied to each account
- Contact list integration

### 💳 Wallet System

- View balance
- Wallet transaction history
- P2P transfers
- On-ramp / off-ramp transactions
- Transfer to contacts with smart search

### 📈 Dashboard

- Transaction statistics & charts
- Recent wallet activity and quick actions
- Mobile-optimized layout with responsive design

### 📂 Structured Codebase

- Modular and scalable folder structure
- API routes for user and transaction logic
- Reusable UI components with Radix UI & Tailwind CSS
- Skeleton loading states for smooth UX

---

## 🧠 What I Learned

This project was an immense learning experience. Some highlights include:

- **Authentication with NextAuth**: Handling secure sessions, credentials, and protecting routes.
- **Prisma ORM**: Defining schemas, handling complex relations, and managing migrations smoothly.
- **Radix UI + Tailwind CSS**: Creating consistent and accessible UI components.
- **Component Architecture**: Designing reusable components for dashboard, transfers, charts, and inputs.
- **Data Visualization**: Using `Recharts` to build interactive and insightful financial charts.
- **State Management**: Leveraging React hooks and context for loading states, toasts, and responsiveness.
- **Secure Coding Practices**: Implementing validation, OTP-style PIN entry, and transaction integrity.
- **CI/CD Deployment (Vercel)**: End-to-end deployment pipeline from local development to live preview.
- **Performance Optimization**: Reducing layout shifts with skeletons and lazy-loaded components.

---

## 🧰 Tech Stack

- **Next.js (App Router)**
- **TypeScript**
- **Prisma + PostgreSQL**
- **NextAuth.js**
- **Tailwind CSS + Tailwind Animate**
- **Radix UI + Lucide Icons**
- **Framer Motion**
- **Recharts**
- **Axios**
- **Recoil (State Management)**
- **EmailJS (Email Management)**
- **Vercel (Deployment)**

---

## 📁 Project Structure Highlights

- `app/` - Pages and API routes following the new App Router structure
- `lib/` - Utility functions and server actions
- `src/components/` - Modular UI and feature components
- `prisma/` - Database schema and migrations
- `hooks/` - Custom React hooks
- `contexts/` - Global context providers

---

## 🛠️ Getting Started

1. Clone the repo:

   ```bash
   git clone https://github.com/your-username/swiftpay.git
   cd swiftpay
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables in `.env`:

   ```env
   DATABASE_URL=your_db_url
   NEXTAUTH_SECRET=your_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. Run Prisma migrations:

   ```bash
   npx prisma migrate dev --name init
   npx prisma db seed
   ```

5. Start the app:
   ```bash
   npm run dev
   ```

---

## 📌 Future Enhancements

- Integrate real payment APIs (Stripe, Razorpay)
- Notifications for transactions
- Biometric login support
- Admin dashboard
- Mobile PWA support

---

## 📬 Contact

If you'd like to connect, collaborate, or provide feedback:

- GitHub: [Lagnajit09](https://github.com/Lagnajit09)
- Email: [2004lagnajitmoharana@gmail.com](mailto:2004lagnajitmoharana@gmail.com)

---

# Project Brief: KashiCurrent Premium Electrician Platform

## 1. Project Overview
KashiCurrent is a premium, modern SaaS platform designed to bridge the gap between homeowners and highly skilled electrical professionals. The platform focuses on high-fidelity user experiences, trust-building through verification, and streamlined service management.

## 2. Target Audience
- **Homeowners:** Individuals seeking reliable, professional electrical services for their modern homes.
- **Electricians:** Professional service providers looking to manage their business, schedules, and earnings.
- **Platform Admins:** Internal staff managing user verification, platform health, and moderation.

## 3. Core Features & User Stories

### 3.1. Public & Authentication
- **Discovery:** Homeowners can browse verified experts and services without an account.
- **Role-Based Access:** Distinct onboarding and dashboard experiences for Homeowners and Electricians.
- **Security:** Secure login with multi-factor authentication (OTP) and password recovery flows.

### 3.2. Homeowner Experience
- **Smart Booking:** Intuitive date/time selection, issue description, and instant confirmation.
- **Expert Directory:** Filterable search by skill, rating, distance, and price.
- **Activity Tracking:** Dashboard to manage upcoming appointments and view service history.

### 3.3. Electrician (Pro) Experience
- **Business Management:** Earnings analytics, job history, and review management.
- **Schedule Control:** Dynamic availability management with 15-minute slot granularity.
- **Lead Handling:** Seamless accept/reject/reschedule flow for incoming service requests.

### 3.4. Administrative Control
- **User Management:** Robust table UI for managing roles, statuses, and permissions.
- **Analytics:** High-level platform metrics including revenue distribution and user growth.
- **Verification & Moderation:** Queues for reviewing pro credentials and handling complaints.

## 4. Design System & Visual Identity
- **Primary Color:** Electric Blue (#2563eb) — represents power, trust, and professionalism.
- **Accent Colors:** Safety Orange/Yellow for alerts and status indicators.
- **Typography:** Geist (Sans-serif) — modern, highly legible, and premium.
- **Visual Style:** 
    - Rounded corners (8px–12px) for a friendly yet professional feel.
    - Soft elevation and shadows for depth.
    - Glassmorphism on navigation and overlays.
    - Clean, white-space heavy layouts for reduced cognitive load.

## 5. Technical Requirements (Frontend)
- **Responsive Design:** Mobile-first approach with full desktop parity.
- **Component-Driven:** Reusable UI library (buttons, inputs, cards, navigation) for consistency.
- **Interactions:** Smooth transitions, loading skeletons, and toast notifications for feedback.

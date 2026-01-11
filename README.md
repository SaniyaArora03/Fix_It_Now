# FixItNow 🛠️  
A role-based MERN application that connects customers with nearby service technicians.

---

## 🚀 Project Overview

FixItNow is a real-life problem-solving platform where:

- **Customers** can request home services (electrician, plumber, AC repair) using live location.
- **Technicians** receive assigned jobs, respond to them, and update job status.
- The system uses **JWT authentication**, **role-based access**, and **MongoDB** for persistence.

This repository currently contains the **core end-to-end workflow**:
Customer → Job Creation → Technician Assignment → Technician Action.

---

## 🧱 Tech Stack

### Frontend
- React 19 (Vite)
- JavaScript
- Fetch API
- Leaflet (for map & location)
- JWT-based auth handling

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Role-based authorization middleware

---

## ✅ Features Implemented (Current Scope)

### 🔐 Authentication
- User registration (Customer / Technician)
- Login with JWT
- Secure role-based routing
- Logout functionality

### 👤 Customer Flow
- Request service with:
  - Service type
  - Urgency
  - Live geolocation
- Job creation stored in MongoDB
- Technician auto-assignment
- Real-time status feedback

### 🧑‍🔧 Technician Flow
- Technician dashboard
- Fetch assigned job securely via JWT
- Accept / Reject job
- Update job status:
  - ASSIGNED → ACCEPTED → IN_PROGRESS → COMPLETED

### 🗺️ Location
- Browser-based geolocation
- Map preview for customer requests

---








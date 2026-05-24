# 🫱🏻‍🫲🏼 Collabix

A scalable collaborative workspace management platform built with the MERN stack, focused on secure authentication, role-based collaboration, and efficient task management workflows.

Designed as a production-style backend project, Collabix implements modern authentication practices, modular architecture, and RESTful API design to simulate real-world team collaboration systems.

---

# ✨ Features

## 🔐 Authentication & Security
- JWT-based authentication system
- Refresh token implementation for secure session handling
- Protected routes and middleware authorization
- Password hashing and secure credential management

## 👥 Role-Based Access Control (RBAC)
- Workspace-level role management
- Permission-based access for users
- Controlled actions for admins, members, and collaborators

## 🏢 Workspace Management
- Create and manage collaborative workspaces
- Invite and organize team members
- Structured workspace hierarchy

## 📋 Boards & Task Management
- Create boards for project organization
- Task creation and management system
- Organized workflow structure for collaborative productivity

## ⚙️ API & Backend Architecture
- RESTful API architecture
- Pagination support for scalable data fetching
- Modular folder structure for maintainability
- Centralized error handling and middleware management

---

# 🛠️ Tech Stack

## Backend
- Node.js
- Express.js

## Database
- MongoDB
- Mongoose

## Authentication & Security
- JWT (JSON Web Tokens)
- Refresh Tokens
- bcrypt

## Tools & Utilities
- Postman
- Git & GitHub

---

# 📁 Project Structure

```bash
Collabix/
│
├── controllers/
├── middleware/
├── models/
├── routes/
├── src/
├── utils/
└── package.json
```

---

# 🔌 API Highlights

- Authentication APIs
- Workspace APIs
- Board APIs
- Task APIs
- Role & Permission APIs

---

# 🚀 How to Run Locally

## Clone the Repository

```bash
git clone <https://github.com/Ankitjha1307/Collabix>
```

## Navigate to Project Folder

```bash
cd Collabix
```

## Install Dependencies

```bash
npm install
```

## Configure Environment Variables

Create a `.env` file and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
```

## Start Development Server

```bash
npm run dev
```

Server will run on:

```text
http://localhost:5000
```

---

# 📚 Learning Outcomes

Through building Collabix, key concepts practiced include:

- Backend architecture design
- Authentication & authorization
- REST API development
- Database schema design
- Middleware handling
- Scalable project structuring
- Role-based systems
- Pagination & optimized querying

---

# 🔮 Future Improvements

- Real-time collaboration using Socket.io
- File uploads and attachments
- Notifications system
- Activity tracking
- Frontend integration
- Docker deployment
- Unit & integration testing

---

# 🚧 Status

Currently under active development.

Core backend systems including authentication, RBAC, workspaces, boards, tasks, and pagination have been implemented successfully ✅.

---

Made with ❤️ and dedication by Ankit Jha.

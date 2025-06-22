# 🧠 AI Task Manager (Full Stack)

A full-stack AI-powered project/task assistant built with **React (frontend)**, **Node.js (backend)**, **MongoDB**, **JWT Auth**, **Google OAuth**, and optionally **Python AI agents**. This system allows users to manage projects and tasks, and interact with AI to get intelligent suggestions, breakdowns, and status updates.

---

## 🔧 Tech Stack

| Layer      | Technology                                 |
| ---------- | ------------------------------------------ |
| Frontend   | React, Tailwind CSS, Axios                 |
| Backend    | Node.js, Express                           |
| Database   | MongoDB (Mongoose)                         |
| Auth       | JWT, Google OAuth2                         |
| AI Layer   | Python (FastAPI), Gemini/OpenAI            |
| Deployment | Vercel (frontend), Render/Fly.io (backend) |
| Tooling    | dotenv, ESLint, Prettier, Cookie-Parser    |

---

## 📁 Folder Structure

```
ai-task-manager/
├── backend/                 # Node.js Backend (API + Auth)
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middlewares/
│   ├── utils/
│   └── index.js
├── frontend/                # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   └── App.js
│   └── tailwind.config.js
├── ai-agents/               # Optional Python FastAPI (AI tasks)
│   ├── agents/
│   ├── services/
│   └── main.py
├── .env.example
├── README.md
```

---

## 🌐 Backend Setup (Node.js)

### 📦 Install & Run

```bash
cd backend
npm install
npm run dev
```

### 🔑 Environment Variables (`.env`)

```env
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000
```

### 📌 API Endpoints

#### Auth

| Method | Endpoint         | Description        |
| ------ | ---------------- | ------------------ |
| POST   | /api/auth/google | Google OAuth login |
| POST   | /api/auth/logout | Logout user        |

#### Users

\| GET    | /api/users/me    | Get current user     |
\| PATCH  | /api/users/\:id   | Update user info     |

#### Projects

\| GET    | /api/projects    | Get all projects     |
\| POST   | /api/projects    | Create new project   |
\| PATCH  | /api/projects/\:id| Update project       |
\| DELETE | /api/projects/\:id| Delete project       |

---

## 🎨 Frontend Setup (React)

### 📦 Install & Run

```bash
cd frontend
npm install
npm run dev
```

### 🌟 Pages

* `/login` – Google login
* `/dashboard` – Project/task overview
* `/project/:id` – Detailed view
* `/profile` – User info & logout

### 🧩 Components

* `Header`, `Sidebar`, `ProjectCard`, `AgentChat`
* Forms: `AddProjectForm`, `EditTaskForm`

### 📡 Services (API Calls)

* Axios is used to connect with backend
* Interceptors handle JWT token

---

## 🤖 Optional AI Integration (Python FastAPI)

Add smart features such as:

* Auto-task breakdowns
* Natural language queries
* Timeline suggestions

### Run Python Agent

```bash
cd ai-agents
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

AI endpoints can be called from the Node backend or directly by the frontend.

---

## 🚀 Deployment Plan

| Component | Service          | Tool        |
| --------- | ---------------- | ----------- |
| Frontend  | Vercel           | React Build |
| Backend   | Render           | Node.js     |
| Database  | MongoDB Atlas    | Cloud NoSQL |
| AI Agent  | Fly.io / Railway | FastAPI     |

---

## 🛡️ Security Checklist

* [x] JWT stored in HttpOnly cookies
* [x] CORS with credentials enabled
* [x] Environment variables via dotenv
* [x] Route-based middleware auth guards

---

## 🙋 Author

Built by [Tharindu Sandaruwan](https://github.com/Tharinducs)

Open for collaboration. Feel free to fork, contribute or drop a ⭐ if you like this!

---

## 📜 License

MIT License. Free for personal and commercial use.

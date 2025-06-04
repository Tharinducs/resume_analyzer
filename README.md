# 🤖 Multi-Agent Collaborative Task Manager

A full-stack AI-powered project management tool where specialized agents collaborate to help users plan, organize, and complete their projects efficiently.

---

## 🌟 Features

* ✅ Create and manage projects and tasks
* 🤖 Multiple AI agents:

  * Brainstormer (Idea generator)
  * Prioritizer (Task organizer)
  * Deadline Reminder (Notifies about due dates)
* 💬 Command Center to interact with agents
* 📈 Agent action log visualization
* 🔄 Real-time updates via WebSockets
* 🔐 (Optional) User authentication with JWT

---

## 🛠 Tech Stack

### Frontend

* React + TailwindCSS + Zustand/Redux
* Socket.IO client for real-time updates

### Backend

* FastAPI
* PostgreSQL / MongoDB
* CrewAI or AutoGen for multi-agent orchestration
* WebSocket server via `fastapi-socketio`

---

## 📁 Folder Structure (Monorepo)

```
multi-agent-task-manager/
├── frontend/                # React app
│   ├── components/
│   ├── pages/
│   ├── services/            # API & WebSocket clients
│
├── backend/                 # FastAPI backend + agent logic
│   ├── agents/              # CrewAI agent definitions
│   ├── api/                 # FastAPI endpoints
│   ├── db/                  # SQLAlchemy or ODM models
│   ├── websocket/           # WebSocket server
│
├── docker-compose.yml
└── README.md
```

---

## ⚙️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/multi-agent-task-manager.git
cd multi-agent-task-manager
```

### 2. Backend Setup

```bash
cd backend
python -m venv env
source env/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🧠 Agent Interaction Flow (Example)

1. User asks Brainstormer to suggest project ideas
2. Brainstormer generates a backlog → sends it to Prioritizer
3. Prioritizer ranks tasks → stores them in the DB
4. Deadline Bot monitors upcoming tasks and sends alerts
5. All agent activities are shown in the Command Center log

---

## 📦 Deployment

* Frontend: Vercel / Netlify
* Backend: Render / Railway / Fly.io
* Database: Supabase / MongoDB Atlas

---

## 🙋‍♂️ Contributions

PRs are welcome! Open an issue or suggest improvements.

---

## 📜 License

MIT

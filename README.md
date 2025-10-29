# Resume Analyzer 📊

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Python](https://img.shields.io/badge/Python-3.9+-blue?style=for-the-badge&logo=python&logoColor=white)](https://python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-teal?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> An intelligent resume analysis platform powered by AI that helps evaluate and optimize resumes for better job matching.

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Local Setup](#-local-setup)
  - [Frontend Setup](#frontend-setup-nextjs)
  - [Backend Setup](#backend-setup-nodejs--express)
  - [FastAPI Agent Setup](#fastapi-agent-setup-python)
- [Environment Variables](#-environment-variables)
- [Scripts](#-scripts)
- [Testing](#-testing)
- [Deployment Notes](#-deployment-notes)
- [Folder Summary](#-folder-summary)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## 🎯 About

Resume Analyzer is a comprehensive platform that leverages artificial intelligence to analyze, evaluate, and provide insights on resumes. The application features a modern web interface built with Next.js, a robust backend API powered by Node.js and Express, and intelligent AI processing capabilities through FastAPI agents.

The platform helps job seekers optimize their resumes by providing detailed analysis, suggestions for improvement, and matching capabilities with job requirements.

---

## ✨ Features

- 🔍 **AI-Powered Resume Analysis** - Advanced resume parsing and evaluation
- 🔐 **Secure Authentication** - JWT-based auth with Google OAuth integration
- 📊 **Detailed Analytics** - Comprehensive resume scoring and insights
- 🎨 **Modern UI/UX** - Responsive design built with Next.js
- 🚀 **Real-time Processing** - Fast AI-driven analysis using FastAPI
- 📱 **Mobile Responsive** - Works seamlessly across all devices
- 🔄 **Auto-sync** - Real-time updates and synchronization
- 📈 **Progress Tracking** - Monitor improvement over time

---

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 14
- **Styling**: Tailwind CSS / CSS Modules
- **Authentication**: Google OAuth
- **State Management**: React Context / Redux

### Backend API
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT + Google OAuth
- **Security**: Helmet, CORS, Rate Limiting

### AI Agent Service
- **Framework**: FastAPI (Python)
- **AI/ML**: Gemini API integration
- **Processing**: Resume parsing and analysis
- **Port**: 8001

---

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **Python** (v3.9 or higher)
- **MongoDB** (v6.0 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Required API Keys
- Google OAuth Client ID
- Gemini API Key
- MongoDB connection string

---

## 🚀 Local Setup

### One-Shot Setup (All Services)

```bash
# Clone the repository
git clone https://github.com/Tharinducs/resume_analyzer.git
cd resume_analyzer

# Setup Frontend
cd frontend
npm install
cp .env.example .env.development
# Edit .env.development with your values

# Setup Backend API
cd ../backend/api
npm install
cp env/example.env env/development.env
# Edit env/development.env with your values

# Setup FastAPI Agent
cd ../agents
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Start all services (run each in separate terminals)
# Terminal 1 - Frontend (Port 3000)
cd frontend && npm run dev

# Terminal 2 - Backend API (Port 3001)
cd backend/api && npm run dev

# Terminal 3 - FastAPI Agent (Port 8001)
cd backend/agents && uvicorn app.main:app --reload --port 8001
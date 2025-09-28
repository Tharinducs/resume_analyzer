# 🚀 AI Resume & Portfolio Analyzer  

An intelligent web application that helps job seekers and professionals improve their **resumes** and **portfolios** using AI. The system analyzes uploaded resumes, GitHub/portfolio links, and provides actionable insights, suggestions, and scoring to help users stand out in their job applications.  

Built with **React, Redux, Radix UI, Node.js/Express, MongoDB, and Gemini/OpenAI integration**, featuring **social login (Google, LinkedIn)** and a clean modern UI.  

---

## ✨ Features  

### 🔑 Authentication & User Management  
- Social login via **Google** and **LinkedIn** (OAuth 2.0).  
- Secure JWT-based authentication.  
- Profile management (update name, email, picture).  

### 📄 Resume Analyzer  
- Upload resumes in **PDF/DOCX** format.  
- AI-powered extraction of:  
  - Skills  
  - Experience  
  - Education  
  - Achievements  
- Generates feedback on:  
  - Grammar & clarity  
  - Role-specific keywords  
  - ATS (Applicant Tracking System) compatibility  
- Resume **scoring system** (e.g., 0–100).  

### 🌐 Portfolio & GitHub Analyzer  
- Analyze user-provided **portfolio websites** and **GitHub repos**.  
- AI generates insights on:  
  - Code quality & best practices  
  - Project relevance for target roles  
  - UI/UX strengths & weaknesses  
- Portfolio **strength score** out of 100.  

### 📊 Dashboard  
- Personalized dashboard with:  
  - Resume score  
  - Portfolio score  
  - Strengths & weaknesses  
  - Actionable improvement tips  
- Trend graph (improvement over time).  

### 📑 Job Role Optimization  
- User selects target role (e.g., **Frontend Engineer, QA Engineer, Solution Architect**).  
- AI suggests:  
  - Missing skills  
  - Relevant certifications  
  - Projects to showcase  

### 🛠️ Tech Stack  
- **Frontend:** React (Vite/Next.js), Redux, Radix UI, TailwindCSS  
- **Backend:** Node.js, Express.js, Gemini/OpenAI API  
- **Database:** MongoDB (Atlas)  
- **Authentication:** OAuth (Google, LinkedIn) + JWT  
- **Deployment:** Vercel (frontend) + Render/Heroku (backend) + MongoDB Atlas  

---

## ⚙️ Installation  

### Prerequisites  
- Node.js (>= 18.x)  
- MongoDB Atlas account  
- Gemini/OpenAI API key  
- Google/LinkedIn OAuth credentials  

### Steps  
```bash
# Clone repository
git clone https://github.com/your-username/ai-resume-portfolio-analyzer.git

# Navigate to project
cd ai-resume-portfolio-analyzer

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Run frontend
cd client
npm install
npm run dev

# Run backend
cd server
npm install
npm run dev

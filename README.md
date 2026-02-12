# Private Notes – Full Stack Application
A full-stack web application that allows users to:

- Create private notes
- Share them via a unique link
- Protect them with a password
- Generate a short summary after unlocking the note

This project was built as part of a Full-stack Developer technical assignment.

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express
- MongoDB (MongoDB Atlas)
- Mongoose

## 📂 Project Structure

assignment/
│
├── frontend/ (React + Tailwind)
├── backend/ (Express + MongoDB + AI)
└── README.md

## Features

### Create Private Note
- Accepts text (max 500 characters)
- Validates input
- Stores note in MongoDB
- Generates unique URL and password

### View & Unlock Note
- Password-protected access
- Shows error for incorrect password
- Shows "Note not found" if invalid ID

### AI Summarization
- “Summarize this note” button
- Backend handles summarization logic
- Returns short bullet-point summary
- Loading and error handling implemented

### Bonus Feature
- Copy-to-clipboard functionality for shareable URL

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB Atlas account

---

### Clone Repository

git clone <your-repository-link>
cd project-folder

---

### Backend Setup

cd backend
npm install

Create a `.env` file inside the backend folder:

MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_key_if_using
FRONTEND_URL=http://localhost:5173

Start backend:

npm run dev

Backend runs on:
https://private-notes-app-z53w.onrender.com


---

### Frontend Setup

cd frontend
npm install
npm run dev

Frontend runs on:
http://localhost:5173

## API Endpoints

POST /api/notes  
Create a new note.

POST /api/notes/:id/verify  
Verify password and unlock note.

POST /api/notes/:id/summarize  
Generate summary of the note.

## AI Integration

The backend is structured to integrate with an LLM provider.

- LLM calls are made strictly from the backend.
- API keys are not exposed to the frontend.
- Proper loading and error handling are implemented.

Due to billing and quota limitations on some LLM providers,
a fallback summarization logic is implemented to ensure
uninterrupted user experience.

The architecture allows easy integration with:
- OpenAI
- Gemini
- Anthropic
- Local LLM models

## Future Improvements

- Implement real-time LLM integration with production billing
- Add note expiry functionality
- Add unit and integration tests
- Implement rate limiting
- Improve password strength validation
- Add Docker support for deployment
- Enhance UI animations and responsiveness


# 🔐 Private Notes App – Full Stack Assignment

## 🚀 Live Demo

🔗 **Frontend (Live App):**  
https://private-notes-app-1.onrender.com  

🔗 **Backend API:**  
https://private-notes-app-z53w.onrender.com  



A full-stack web application that allows users to create private notes, share them securely via a unique link and password, and generate an AI-powered summary after unlocking the note.

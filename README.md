# ClaveMaestra
# 🌟 Full-Stack Application

## 📖 Description
This project is a full-stack application that includes both frontend and backend components. The frontend is built with React and Vite, while the backend is built with Node.js, Express, and MongoDB.

## 🗂 Project Structure

├── .env ├── .vscode/ │ └── settings.json ├── backend/ │ ├── controllers/ │ │ └── resource.controller.js │ ├── db/ │ │ └── connectDB.js │ ├── Firebase/ │ ├── index.js │ ├── mailtrap/ │ ├── middleware/ │ ├── models/ │ │ └── resource.model.js │ ├── Oauth/ │ ├── routes/ │ │ └── resource.routes.js │ ├── utills/ │ ├── validators/ ├── frontend/ │ ├── .env │ ├── .gitignore │ ├── eslint.config.js │ ├── index.html │ ├── package.json │ ├── postcss.config.js │ ├── public/ │ ├── README.md │ ├── src/ │ │ ├── components/ │ │ │ ├── CommentForm.jsx │ │ │ ├── FloatingShape.jsx │ │ │ ├── Input.jsx │ │ │ ├── LoadingSpinner.jsx │ │ │ ├── OAuth.jsx │ │ │ ├── PasswordInput.jsx │ │ │ ├── Reaction.jsx │ │ │ ├── ResourceDetail.jsx │ │ │ ├── ResourceForm.jsx │ │ │ └── ResourceList.jsx │ │ ├── pages/ │ │ │ ├── DashBoardPage.jsx │ │ │ ├── EmailVerificationPage.jsx │ │ │ ├── ForgotPasswordPage.jsx │ │ │ ├── LoginPage.jsx │ │ │ ├── ResetPasswordPage.jsx │ │ │ ├── ResourcePage.jsx │ │ │ └── SignUpPage.jsx │ │ ├── store/ │ │ │ └── authStore.js │ │ ├── services/ │ │ │ └── api.js │ │ ├── App.jsx │ │ ├── index.css │ │ ├── main.jsx │ │ └── vite.config.js ├── package.json └── SQL Server Management Studio/ ├── Code Snippets/ ├── GUI DATA BASE/ ├── Inventory_Backup_2024-4-3.sql ├── MEDI BID/ ├── mysqldump/ ├── SQL QUESTION QUARIES/ └── SQL Server Scripts1/


## 🚀 Installation

### Backend
1. Navigate to the `backend` directory:
   ```sh
   cd backend

# Install the dependencies
 npm install

# Create a .env file in the backend directory and add your environment variables:
touch .env

# Start the backend server
npm run dev

## Frontend
  # Navigate to the frontend directory
    cd frontend
 # install the dependencies:
  npm install

# Create a .env file in the frontend directory and add your environment variables:

touch .env

# Start the frontend development server:
npm run dev

💻 Usage
    Open your browser and navigate to http://localhost:5173 to access the frontend.
    The backend server will be running on http://localhost:5000.
✨ Features
    User authentication and authorization
    Resource management (CRUD operations)
    Commenting and reacting to resources
    Email verification and password reset functionality
    reCAPTCHA verification for enhanced security
🛠 Technologies Used
    Frontend: React, Vite, Tailwind CSS, Zustand, Framer Motion
    Backend: Node.js, Express, MongoDB, Mongoose, JWT, Mailtrap, Firebase
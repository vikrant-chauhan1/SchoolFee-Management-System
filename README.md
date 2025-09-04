🎓 School Fee Management System

A full-stack PERN (PostgreSQL, Express.js, React, Node.js) application designed to simplify and digitize school fee management. The platform provides secure admin authentication, student record management, fee tracking, and reporting features.

🚀 Features

🔑 Admin Authentication – Secure login with token-based authentication

👩‍🎓 Student Management – Add, update, and track student details

💰 Fee Tracking – Record and manage fee payments with real-time updates

📊 Dashboard – View summary of payments, pending dues, and student data

⚡ Responsive UI – Built with React for seamless user experience

🛠️ Backend APIs – Built with Node.js + Express, connected to PostgreSQL

🛠️ Tech Stack

Frontend: React, React Router, Axios
Backend: Node.js, Express.js
Database: PostgreSQL
Auth: JWT (JSON Web Tokens), localStorage
Other: RESTful APIs

⚙️ Installation & Setup

Clone the repository

git clone https://github.com/vikrant-chauhan1/school-fee-management.git
cd school-fee-management


Install dependencies for backend

cd server
npm install


Install dependencies for frontend

cd client
npm install


Create a .env file in the backend with your database credentials and JWT secret:

DATABASE_URL=your_postgres_url  
JWT_SECRET=your_secret_key  


Run the development servers:

Backend:

cd server
npm run dev


Frontend:

cd client
npm start

🧑‍💻 Future Improvements

Multi-role support (Teachers, Students, Parents)

Online fee payment integration

Exportable reports (CSV, PDF)

👨‍🎓 Author

Vikrant Chauhan

GitHub: vikrant-chauhan1


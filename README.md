Issue Tracker API

A full-stack backend REST API for managing issues with authentication, role-based access control, and PostgreSQL database integration.

 Live URL
https://your-live-url.com
 Features
User Registration & Login (JWT Authentication)
Secure login using HTTP-only cookies
Role-Based Access Control (Maintainer / Contributor)
Create, Read, Update, Delete (CRUD) issues
Filter issues by type and status
Sort issues (newest / oldest)
Only issue owner can update (Contributor rule)
Maintainer can manage all issues
Secure password hashing using bcrypt
 Tech Stack
Node.js
Express.js
TypeScript
PostgreSQL
JWT (Authentication)
bcrypt (Password Hashing)
 Setup Steps
1. Clone project
git clone https://github.com/your-username/issue-tracker.git
cd issue-tracker
2. Install dependencies
npm install
3. Create .env file
PORT=5000
CONNECTIONSTRING=your_postgres_connection
JWT_SECRET=your_secret_key
4. Run database tables
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password TEXT,
  role VARCHAR(50)
);

CREATE TABLE issues (
  id SERIAL PRIMARY KEY,
  title TEXT,
  description TEXT,
  type VARCHAR(50),
  status VARCHAR(50) DEFAULT 'open',
  reporter_id INT REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
5. Run server
npm run dev
 API Endpoints
 Auth Routes
POST /auth/signup → Register user
POST /auth/login → Login user
 Issue Routes
POST /issues → Create issue (Maintainer / Contributor)
GET /issues → Get all issues
GET /issues/:id → Get single issue
PATCH /issues/:id → Update issue (Role-based)
DELETE /issues/:id → Delete issue (Maintainer only)
 Database Schema Summary
 users table
id (Primary Key)
name
email
password (hashed)
role (maintainer / contributor)
issues table
id (Primary Key)
title
description
type
status (default: open)
reporter_id (Foreign Key → users.id)
created_at
updated_at
Project Summary

This project is a backend system where users can create and manage issues.
Access is controlled using roles, and authentication is handled using JWT stored in cookies.
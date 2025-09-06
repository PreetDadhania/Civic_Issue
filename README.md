# Civic Issue Reporting Platform

A full-stack web application for reporting and managing civic issues, supporting citizen and admin roles. Built with Django REST Framework (backend) and React (frontend).

## Features
- User authentication (signup, login, logout) with JWT tokens
- Role-based access: Citizen and Admin
- Citizens can report civic issues with images and location
- Admins can view and manage reported issues
- Responsive, modern UI

## Tech Stack
- **Backend:** Django, Django REST Framework, SimpleJWT, SQLite
- **Frontend:** React (Vite), Axios, React Router, React Toastify

## Project Structure
```
Civic_Issue/
├── backend/           # Django backend
│   ├── manage.py
│   ├── requirements.txt
│   ├── civic_portal/  # Django project settings
│   ├── users/         # User management (custom user, auth)
│   └── issues/        # Issue reporting app
└── civic_issue/       # React frontend
    ├── src/
    │   ├── api.js
    │   ├── pages/
    │   └── components/
    └── public/
```

## Getting Started

### Backend (Django)
1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Run migrations:
   ```bash
   python manage.py migrate
   ```
3. Start the server:
   ```bash
   python manage.py runserver
   ```

### Frontend (React)
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints
- `POST /api/auth/signup` — Register a new user
- `POST /api/auth/login` — Login and receive JWT tokens
- `POST /api/auth/logout` — Logout (blacklist refresh token)
- `GET /api/issues/` — List all issues (role-based)
- `POST /api/issues/` — Report a new issue (citizen)

## Environment Variables
Create a `.env` file in `civic_issue/`:
```
VITE_API_BASE_URL=http://localhost:8000/api/
```

## License
MIT

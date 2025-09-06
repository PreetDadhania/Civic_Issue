# Civic Portal Backend

This is a Django project with Django Rest Framework and django-cors-headers installed.

## Apps
- users
- issues

## API
- Configured with Django Rest Framework (`rest_framework`)

## CORS
- Configured with `django-cors-headers` for React integration (CORS_ALLOW_ALL_ORIGINS=True for development)

## Setup
1. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
2. Run migrations:
   ```sh
   python manage.py migrate
   ```
3. Start the server:
   ```sh
   python manage.py runserver
   ```

---
Replace CORS_ALLOW_ALL_ORIGINS with specific origins in production.

# Backend (Django)

This folder contains the backend code for the Civic Issue Reporting Platform, built with Django and Django REST Framework.

## Features
- User authentication (signup, login, logout) with JWT tokens (SimpleJWT)
- Custom user model with roles (citizen, admin)
- Issue reporting and management
- SQLite database (default)

## Structure
```
backend/
├── manage.py
├── requirements.txt
├── civic_portal/   # Django project settings and URLs
├── users/          # User management (custom user, auth)
└── issues/         # Issue reporting app
```

## Setup Instructions
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

## API Endpoints
- `POST /api/auth/signup` — Register a new user
- `POST /api/auth/login` — Login and receive JWT tokens
- `POST /api/auth/logout` — Logout (blacklist refresh token)
- `GET /api/issues/` — List all issues (role-based)
- `POST /api/issues/` — Report a new issue (citizen)

## Notes
- Make sure to configure CORS if accessing from a different frontend domain.
- Default database is SQLite; you can switch to PostgreSQL or others as needed.

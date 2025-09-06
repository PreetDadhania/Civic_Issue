# Frontend (React)

This folder contains the frontend code for the Civic Issue Reporting Platform, built with React and Vite.

## Features
- User authentication (signup, login, logout)
- Role-based access: Citizen and Admin
- Citizens can report civic issues with images and location
- Admins can view and manage reported issues
- Responsive, modern UI

## Structure
```
civic_issue/
├── src/
│   ├── api.js
│   ├── pages/
│   └── components/
├── public/
├── package.json
└── vite.config.js
```

## Setup Instructions
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables
Create a `.env` file in this folder:
```
VITE_API_BASE_URL=http://localhost:8000/api/
```

## Notes
- Make sure the backend server is running and accessible at the API base URL.
- Uses Axios for API calls, React Router for navigation, and React Toastify for notifications.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

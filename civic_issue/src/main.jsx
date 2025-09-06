import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Copilot, please analyze the CSS import below.
// Is this the correct syntax for a Vite + React project? If not, provide the fix.
import './index.css';
import App from './App.jsx';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import DashboardLayout from './pages/DashboardLayout';
import MyIssues from './components/MyIssues';
import ReportIssueForm from './components/ReportIssueForm';
import CommunityIssues from './components/CommunityIssues';
import AdminDashboard from './pages/AdminDashboard';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard/*" element={<DashboardLayout />}>
          <Route path="report" element={<ReportIssueForm />} />
          <Route path="my-issues" element={<MyIssues />} />
          <Route path="community" element={<CommunityIssues />} />
        </Route>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { ToastContainer, toast } from "react-toastify";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "", role: "citizen" });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
  if (!form.username) errs.username = "Username is required.";
    if (!form.password) errs.password = "Password is required.";
    if (!form.role) errs.role = "Role is required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    
    try {
      const res = await API.post("auth/login", {
        username: form.username,
        password: form.password,
        role: form.role,
      });

      // Validate token exists in response
      if (!res.data.access) {
        throw new Error('No access token received');
      }

      // Store token and user data
      try {
        localStorage.setItem("jwt", res.data.access);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("tokenTimestamp", Date.now().toString());
        
        // Update the Authorization header for subsequent requests
        API.defaults.headers.common['Authorization'] = `Bearer ${res.data.access}`;
        
        toast.success("Login successful!");
        
        // Navigate based on role
        setTimeout(() => {
          if (res.data.user.role === "admin") {
            navigate("/admin-dashboard");
          } else {
            navigate("/dashboard/report");
          }
        }, 1200);
      } catch (storageError) {
        console.error('Failed to store auth data:', storageError);
        toast.error('Failed to save login information. Please try again.');
        return;
      }
    } catch (err) {
      console.error('Login error:', err);
      let errorMessage = "Login failed";
      
      if (err.response?.data) {
        // Handle structured error responses from the backend
        errorMessage = err.response.data.error || err.response.data.detail || errorMessage;
      } else if (err.message === 'No access token received') {
        errorMessage = "Server didn't provide authentication token. Please contact support.";
      } else if (!navigator.onLine) {
        errorMessage = "No internet connection. Please check your network.";
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-bg" style={{minHeight:'100vh', display:'flex', flexDirection:'column'}}>
      <Navbar />
      <ToastContainer />
      <main style={{flex:1, display:'flex', alignItems:'center', justifyContent:'center'}}>
        <form onSubmit={handleSubmit} style={{width:'100%', maxWidth:520, margin:'0 auto', display:'flex', flexDirection:'column', gap:'1rem', background:'none', boxShadow:'none', border:'none', padding:0, alignItems:'flex-start'}}>
          <div style={{marginBottom:'0.5rem', textAlign:'left', width:'100%'}}>
            <h2 style={{color:'#fff', fontWeight:700, fontSize:'2rem', marginBottom:2, letterSpacing:'0.5px', textAlign:'left'}}>Login</h2>
            <div style={{ color: '#b8b8d1', fontSize: '1rem', marginTop: 0, fontWeight: 400, textAlign:'left' }}>
              Access your citizen or admin account.
            </div>
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:'0.15rem', width:'100%'}}>
            <label className="input-label" style={{color:'#b8b8d1', marginBottom:'0.0rem', textAlign:'left', fontWeight:600}}>Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="input-field"
              placeholder="Username"
              autoComplete="username"
              style={{background:'#18122b', color:'#fff', border:'1px solid #3a3456', marginBottom:0}}
            />
            {errors.username && <p className="input-error">{errors.username}</p>}
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:'0.15rem', width:'100%'}}>
            <label className="input-label" style={{color:'#b8b8d1', marginBottom:'0.1rem', textAlign:'left', fontWeight:600}}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="input-field"
              autoComplete="current-password"
              style={{background:'#18122b', color:'#fff', border:'1px solid #3a3456', marginBottom:0}}
            />
            {errors.password && <p className="input-error">{errors.password}</p>}
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:'0.15rem', width:'100%'}}>
            <label className="input-label" style={{color:'#b8b8d1', marginBottom:'0.1rem', textAlign:'left', fontWeight:600}}>Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="input-field"
              style={{background:'#18122b', color:'#fff', border:'1px solid #3a3456', marginBottom:0}}
            >
              <option value="">Select role</option>
              <option value="citizen">Citizen</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && <p className="input-error">{errors.role}</p>}
          </div>
          <button
            type="submit"
            className="btn btn-primary mt-2"
            disabled={loading}
            style={{background:'#a084ee', color:'#fff', border:'none', borderRadius:8, fontWeight:700, width:'100%', padding:'0.75rem 0', marginTop:'1.2rem', fontSize:'1.1rem', boxShadow:'0 2px 8px 0 #00000022', letterSpacing:'0.5px', outline:'none', cursor:'pointer', opacity:1, borderBottom:'2px solid #a084ee'}}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Login;

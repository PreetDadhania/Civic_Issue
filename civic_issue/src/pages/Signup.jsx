import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { ToastContainer, toast } from "react-toastify";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "citizen",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
  if (!form.username) errs.username = "Username is required.";
    if (!form.email) errs.email = "Email is required.";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = "Invalid email.";
    if (!form.password) errs.password = "Password is required.";
    else if (form.password.length < 6) errs.password = "Password must be at least 6 characters.";
    if (!form.confirmPassword) errs.confirmPassword = "Confirm your password.";
    else if (form.password !== form.confirmPassword) errs.confirmPassword = "Passwords do not match.";
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
      const res = await API.post("auth/signup", {
        username: form.username,
        email: form.email,
        password: form.password,
        role: form.role,
      });
  toast.success("Signup successful! Please login.");
  setForm({ username: "", email: "", password: "", confirmPassword: "", role: "citizen" });
  setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      const msg = err.response?.data?.error || err.response?.data?.detail || "Signup failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-bg" style={{minHeight:'100vh', display:'flex', flexDirection:'column'}}>
      <Navbar />
      <ToastContainer />
      <main style={{flex:1, display:'flex', alignItems:'center', justifyContent:'center', width:'100%'}}>
  <div style={{width:'100%', maxWidth:800, margin:'0 auto', padding:'1.5rem 0.5rem 1.5rem 0.5rem', border:'none', borderRadius:'8px', background:'rgba(24,18,43,0.95)'}}>
          <form onSubmit={handleSubmit} style={{width:'100%', maxWidth:520, margin:'0 auto', display:'flex', flexDirection:'column', gap:'1.1rem', background:'none', boxShadow:'none', border:'none', padding:0}}>
            <div style={{marginBottom:'0.5rem', textAlign:'left', width:'100%'}}>
              <h2 style={{color:'#fff', fontWeight:700, fontSize:'2rem', marginBottom:2, letterSpacing:'0.5px', textAlign:'left'}}>Create your account</h2>
              <div style={{ color: '#b8b8d1', fontSize: '1rem', marginTop: 0, fontWeight: 400, textAlign:'left' }}>
                Join the community and start reporting issues.
              </div>
            </div>
            <div style={{display:'flex', flexDirection:'column', gap:'0.15rem', width:'100%'}}>
              <label className="input-label" style={{color:'#b8b8d1', marginBottom:'0.1rem', textAlign:'left', fontWeight:600}}>Name</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                className="input-field"
                placeholder="Jane Doe"
                style={{background:'#18122b', color:'#fff', border:'1px solid #3a3456', marginBottom:0}}
              />
              {errors.username && <p className="input-error">{errors.username}</p>}
            </div>
            <div style={{display:'flex', flexDirection:'column', gap:'0.15rem', width:'100%'}}>
              <label className="input-label" style={{color:'#b8b8d1', marginBottom:'0.1rem', textAlign:'left', fontWeight:600}}>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="input-field"
                placeholder="you@example.com"
                style={{background:'#18122b', color:'#fff', border:'1px solid #3a3456', marginBottom:0}}
              />
              {errors.email && <p className="input-error">{errors.email}</p>}
            </div>
            <div style={{display:'flex', flexDirection:'row', gap:'1.2rem', width:'100%'}}>
              <div style={{flex:1, display:'flex', flexDirection:'column', gap:'0.15rem'}}>
                <label className="input-label" style={{color:'#b8b8d1', marginBottom:'0.1rem', textAlign:'left', fontWeight:600}}>Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="********"
                  style={{background:'#18122b', color:'#fff', border:'1px solid #3a3456', marginBottom:0}}
                />
                {errors.password && <p className="input-error">{errors.password}</p>}
              </div>
              <div style={{flex:1, display:'flex', flexDirection:'column', gap:'0.15rem'}}>
                <label className="input-label" style={{color:'#b8b8d1', marginBottom:'0.1rem', textAlign:'left', fontWeight:600}}>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="********"
                  style={{background:'#18122b', color:'#fff', border:'1px solid #3a3456', marginBottom:0}}
                />
                {errors.confirmPassword && <p className="input-error">{errors.confirmPassword}</p>}
              </div>
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
              {loading ? "Creating..." : "Create account"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Signup;

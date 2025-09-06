import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section style={{background:'#18122B', color:'#fff', minHeight:'50vh', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', padding:'3rem 0 2rem 0'}}>
      <div className="container" style={{maxWidth:700}}>
        <h1 style={{fontWeight:800, fontSize:'2.8rem', marginBottom:'1.2rem', letterSpacing:'-1px', color:'#fff'}}>
          Report Issues. <span style={{background:'linear-gradient(90deg,#7c3aed,#06b6d4)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>Build a Better City.</span>
        </h1>
        <p style={{fontSize:'1.15rem', color:'#d1d5db', marginBottom:'2.2rem', fontWeight:500}}>
          Spot a pothole, broken streetlight, or garbage overflow? Submit in seconds and rally your community to get it fixed.
        </p>
        <div style={{display:'flex', gap:'1rem', justifyContent:'center'}}>
          <Link className="btn btn-lg" style={{background:'#a78bfa', color:'#fff', fontWeight:600, borderRadius:8, boxShadow:'0 2px 8px #0001'}} to="/signup">Report Now</Link>
          <Link className="btn btn-lg" style={{background:'#232136', color:'#fff', fontWeight:600, borderRadius:8, border:'1px solid #444'}} to="/signup">Get Started</Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;

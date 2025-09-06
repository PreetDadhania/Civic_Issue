import React from "react";

const DashboardTopbar = ({ onLogout }) => {
  return (
    <header style={{width:'100%', background:'#231942', minHeight:'56px', display:'flex', alignItems:'center', justifyContent:'flex-end', padding:'0 2.5rem', borderBottom:'1.5px solid #31265c', position:'sticky', top:0, zIndex:10}}>
      <button
        onClick={onLogout}
        style={{background:'none', color:'#fff', border:'1.5px solid #b8b8d1', borderRadius:'7px', fontWeight:600, padding:'0.5rem 1.5rem', fontSize:'1rem', transition:'background 0.2s', outline:'none', marginLeft:'1rem', cursor:'pointer'}}
      >
        Logout
      </button>
    </header>
  );
};

export default DashboardTopbar;

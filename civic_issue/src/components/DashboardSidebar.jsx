import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { name: "Report Issue", to: "/dashboard/report" },
  { name: "My Issues", to: "/dashboard/my-issues" },
  { name: "Community Issues", to: "/dashboard/community" },
];


const DashboardSidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Sidebar */}
      <aside
        style={{
          width: '240px',
          minHeight: '100vh',
          background: '#211c2a',
          borderRight: '1.5px solid #31265c',
          boxShadow: 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 40,
          padding: 0,
          display: 'block',
        }}
      >
        <div style={{padding: '2.2rem 1.2rem 1.2rem 1.2rem'}}>
          <div style={{display:'flex', alignItems:'center', gap:'0.7rem', marginBottom:'2.2rem'}}>
            <span style={{
              background: '#a084ee',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'none',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
            </span>
            <h2 style={{color:'#fff', fontWeight:800, fontSize:'1.18rem', letterSpacing:'0.2px', margin:0, fontFamily:'inherit'}}>CivicReport</h2>
          </div>
          <nav style={{display:'flex', flexDirection:'column', gap:'0.7rem'}}>
            {links.map((link) => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{
                    background: active ? '#292343' : 'none',
                    color: active ? '#fff' : '#bfa8e6',
                    fontWeight: active ? 700 : 500,
                    borderRadius: active ? '10px' : '0',
                    padding: '0.95rem 1.2rem',
                    fontSize: '1.08rem',
                    textDecoration: 'none',
                    transition: 'all 0.18s',
                    outline: 'none',
                    border: 'none',
                    display: 'block',
                    boxShadow: 'none',
                    borderLeft: active ? '3px solid #a084ee' : '3px solid transparent',
                    letterSpacing: '0.1px',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#2e254d'}
                  onMouseLeave={e => e.currentTarget.style.background = active ? '#292343' : 'none'}
                  onClick={() => setOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;

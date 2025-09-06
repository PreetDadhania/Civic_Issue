import React from "react";

const categories = [
  {
    name: "Potholes",
    desc: "Report damaged roads and potholes.",
    icon: (
      <svg width="38" height="38" style={{color:'#a78bfa', display:'block', margin:'0 auto 8px'}} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 16c1.333-2 6.667-2 8 0" /><circle cx="9" cy="10" r="1" /><circle cx="15" cy="10" r="1" /></svg>
    ),
  },
  {
    name: "Garbage",
    desc: "Overflowing bins or littering spots.",
    icon: (
      <svg width="38" height="38" style={{color:'#a78bfa', display:'block', margin:'0 auto 8px'}} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="6" y="8" width="12" height="10" rx="2" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /><path d="M3 8h18" /></svg>
    ),
  },
  {
    name: "Streetlight",
    desc: "Broken or flickering streetlights.",
    icon: (
      <svg width="38" height="38" style={{color:'#a78bfa', display:'block', margin:'0 auto 8px'}} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2v10" /><circle cx="12" cy="16" r="4" /></svg>
    ),
  },
  {
    name: "Water",
    desc: "Leaks, supply issues, or contamination.",
    icon: (
      <svg width="38" height="38" style={{color:'#a78bfa', display:'block', margin:'0 auto 8px'}} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2C12 2 5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13z" /></svg>
    ),
  },
];

const Categories = () => {
  return (
    <section style={{background:'#18122B', color:'#fff', padding:'3rem 0 2rem 0'}}>
      <h2 className="text-center fw-bold mb-2" style={{fontSize:'2rem', color:'#fff'}}>Popular Categories</h2>
      <p className="text-center mb-4" style={{color:'#c7c7d9'}}>Categories you can report</p>
      <div className="container">
        <div className="row g-4 justify-content-center">
          {categories.map((cat) => (
            <div key={cat.name} className="col-12 col-md-6 col-lg-3">
              <div className="d-flex flex-column align-items-center p-4 bg-white rounded shadow-sm h-100 category-card" style={{color:'#232136', minHeight:170}}>
                {cat.icon}
                <span className="mt-2" style={{fontSize:'1.1rem', fontWeight:700, color:'#232136'}}>{cat.name}</span>
                <span className="mt-1" style={{fontSize:'0.98rem', color:'#6b7280'}}>{cat.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;

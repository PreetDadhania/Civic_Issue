import React from "react";

const Footer = () => {
  return (
    <footer style={{background:'#18122B', color:'#fff', padding:'2.5rem 0 1.5rem 0', marginTop:'3rem'}}>
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="container">
          <div className="row text-center text-md-start">
            <div className="col-12 col-md-4 mb-4 mb-md-0">
              <h5 style={{color:'#fff', fontWeight:700}}>CivicReport</h5>
              <p style={{color:'#c7c7d9', fontSize:'0.98rem'}}>Report civic issues easily and help improve your city.</p>
            </div>
            <div className="col-12 col-md-4 mb-4 mb-md-0">
              <h5 style={{color:'#fff', fontWeight:700}}>Contact</h5>
              <p style={{color:'#c7c7d9', fontSize:'0.98rem', marginBottom:0}}>support@civicreport.app<br/>+1 (555) 123-4567</p>
            </div>
            <div className="col-12 col-md-4">
              <h5 style={{color:'#fff', fontWeight:700}}>Quick Links</h5>
              <ul className="list-unstyled" style={{marginBottom:0}}>
                <li><a href="/login" style={{color:'#a78bfa', textDecoration:'none', fontWeight:500}}>Login</a></li>
                <li><a href="/signup" style={{color:'#a78bfa', textDecoration:'none', fontWeight:500}}>Signup</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

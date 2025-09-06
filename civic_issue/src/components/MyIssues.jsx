import React, { useEffect, useState } from "react";
import API from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/myIssues.css";

// Status styles mapping to match the design
const getStatusStyle = (status) => {
  switch(status) {
    case 'Pending':
      return { 
        background: '#232136',
        color: '#fff',
        border: '1px solid #31265c',
      };
    case 'In Progress':
      return {
        background: '#1c314a',
        color: '#ffd700',
        border: '1px solid #264564',
      };
    case 'Resolved':
      return {
        background: '#1a3830',
        color: '#4ade80',
        border: '1px solid #2b5b4e',
      };
    default:
      return {
        background: '#232136',
        color: '#fff',
        border: '1px solid #31265c',
      };
  }
};

const MyIssues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    API.get("issues/mine/")
      .then((res) => {
        setIssues(res.data);
      })
      .catch((err) => {
        toast.error("Failed to load your issues");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      minHeight: '100%',
      background: 'none',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      padding: '2rem 3rem 2rem calc(240px + 3rem)', // Account for sidebar width + padding
    }}>
      <ToastContainer />
      <div style={{
        width: '100%',
        maxWidth: '900px',
        marginLeft: 'auto',  // Push content to the right
        marginRight: '0',    // Align with the right padding
      }}>
        <h2 style={{
          fontSize: '1.8rem',
          fontWeight: 700,
          color: '#fff',
          margin: '0 0 1.8rem 0',
          textAlign: 'left',
          letterSpacing: '0.02em',
        }}>My Issues</h2>
        {loading ? (
          <div style={{ color: '#bfa8e6', fontSize: '1.1rem', marginBottom: '1.5rem' }}>Loading...</div>
        ) : (
          <div style={{ 
          width: '100%',
          background: 'none',
          borderRadius: '12px',
          boxShadow: 'none',
          overflow: 'hidden'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'separate',
            borderSpacing: 0,
            background: '#211c2a',
            borderRadius: '12px',
            color: '#e0e0f0',
            fontSize: '1rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            overflow: 'hidden',
          }}>
            <thead>
              <tr style={{background: '#232136'}}>
                <th style={{padding: '0.9rem 1.2rem', color: '#fff', fontWeight: 600, fontSize: '1rem', textAlign: 'left', borderTopLeftRadius: '12px'}}>Title</th>
                <th style={{padding: '0.9rem 1.2rem', color: '#fff', fontWeight: 600, fontSize: '1rem', textAlign: 'left'}}>Description</th>
                <th style={{padding: '0.9rem 1.2rem', color: '#fff', fontWeight: 600, fontSize: '1rem', textAlign: 'left'}}>Date</th>
                <th style={{padding: '0.9rem 1.2rem', color: '#fff', fontWeight: 600, fontSize: '1rem', textAlign: 'left', borderTopRightRadius: '12px'}}>Status</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue, idx) => (
                <tr key={idx} style={{
                  background: '#232136',
                  borderBottom: idx !== issues.length - 1 ? '1px solid #31265c' : 'none',
                }}>
                  <td style={{fontWeight: 500, color: '#fff', padding: '0.9rem 1.2rem'}}>{issue.title}</td>
                  <td style={{color: '#b8b8d1', padding: '0.9rem 1.2rem'}}>{issue.description}</td>
                  <td style={{color: '#b8b8d1', padding: '0.9rem 1.2rem'}}>{new Date(issue.created_at).toISOString().slice(0,10)}</td>
                  <td style={{padding: '0.9rem 1.2rem'}}>
                    <span style={{
                      display: 'inline-block',
                      minWidth: '80px',
                      textAlign: 'center',
                      borderRadius: '7px',
                      fontWeight: 500,
                      fontSize: '0.95rem',
                      padding: '0.25rem 0.9rem',
                      ...getStatusStyle(issue.status)
                    }}>
                      {issue.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </div>
    </div>
  );
};

export default MyIssues;

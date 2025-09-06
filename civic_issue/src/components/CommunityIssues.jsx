
import React, { useEffect, useState } from "react";
// You must set your Google Maps Geocoding API key below
const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";
import API from "../api";
import { ToastContainer, toast } from "react-toastify";

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

const CommunityIssues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");
  const [cities, setCities] = useState([""]);
  const [status, setStatus] = useState("");
  const [cityDetected, setCityDetected] = useState(false);

  // Store last non-empty city list
  const [lastNonEmptyCities, setLastNonEmptyCities] = useState([""]);
  const fetchIssues = () => {
    setLoading(true);
    let url = "issues/community/?";
    if (location) url += `location=${encodeURIComponent(location)}&`;
    if (status) url += `status=${encodeURIComponent(status)}&`;
    API.get(url)
      .then((res) => {
        setIssues(res.data);
        const uniqueCities = Array.from(new Set(res.data.map(issue => issue.location)));
        if (uniqueCities.length > 0) {
          setCities(["", ...uniqueCities]);
          setLastNonEmptyCities(["", ...uniqueCities]);
        } else {
          setCities(lastNonEmptyCities);
        }
      })
      .catch(() => toast.error("Failed to load community issues"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    // Detect city from geolocation on mount
    if (!cityDetected && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
          );
          const data = await response.json();
          if (data.status === "OK") {
            const addressComponents = data.results[0].address_components;
            const cityComponent = addressComponents.find((comp) =>
              comp.types.includes("locality") || comp.types.includes("administrative_area_level_2")
            );
            const detectedCity = cityComponent ? cityComponent.long_name : "";
            if (detectedCity) {
              setLocation(detectedCity);
              setCities([detectedCity]);
              setCityDetected(true);
              fetchIssues();
              return;
            }
          }
        } catch (err) {}
        // fallback: fetch all issues if city not detected
        fetchIssues();
      }, () => {
        // fallback: fetch all issues if geolocation fails
        fetchIssues();
      });
    } else {
      fetchIssues();
    }
    // eslint-disable-next-line
  }, []);

  // Upvote logic can be implemented here if needed

  return (
    <div style={{
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
        marginLeft: 'auto',
        marginRight: '0',
      }}>
        <h2 style={{
          fontSize: '1.8rem',
          fontWeight: 700,
          color: '#fff',
          margin: '0 0 1.8rem 0',
          textAlign: 'left',
          letterSpacing: '0.02em',
        }}>Community Issues</h2>
        
        {/* Filters */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '1.5rem',
          alignItems: 'flex-end'
        }}>
          <div style={{display: 'flex', flexDirection: 'column', gap: '0.4rem'}}>
            <label style={{color: '#bfa8e6', fontWeight: 600, fontSize: '1rem'}}>City</label>
            <select
              value={location}
              onChange={e => setLocation(e.target.value)}
              style={{
                padding: '0.7rem 1rem',
                background: '#232136',
                border: '1px solid #31265c',
                borderRadius: '7px',
                color: '#fff',
                fontSize: '1rem',
                minWidth: '180px'
              }}
            >
              {cities.map(city => (
                <option key={city} value={city}>{city === "" ? "All Cities" : city}</option>
              ))}
            </select>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: '0.4rem'}}>
            <label style={{color: '#bfa8e6', fontWeight: 600, fontSize: '1rem'}}>Status</label>
            <select
              value={status}
              onChange={e => setStatus(e.target.value)}
              style={{
                padding: '0.7rem 1rem',
                background: '#232136',
                border: '1px solid #31265c',
                borderRadius: '7px',
                color: '#fff',
                fontSize: '1rem',
                minWidth: '180px'
              }}
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
          <button 
            onClick={fetchIssues}
            style={{
              background: '#a084ee',
              color: '#fff',
              fontWeight: 600,
              padding: '0.7rem 1.5rem',
              border: 'none',
              borderRadius: '7px',
              fontSize: '1rem',
              cursor: 'pointer',
              height: '43px',
              marginLeft: '0.5rem'
            }}
          >
            Search
          </button>
      </div>
      {loading ? (
          <div style={{ color: '#bfa8e6', fontSize: '1.1rem', marginBottom: '1.5rem' }}>Loading...</div>
        ) : issues.length === 0 ? (
          <div style={{ color: '#b8b8d1', fontSize: '1.1rem', marginBottom: '1.5rem' }}>No issues reported for the given search.</div>
        ) : (
          <div style={{ width: '100%', background: 'none', borderRadius: '12px', boxShadow: 'none', overflow: 'hidden' }}>
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
                  <th style={{padding: '0.9rem 1.2rem', color: '#fff', fontWeight: 600, fontSize: '1rem', textAlign: 'left'}}>Reporter</th>
                  <th style={{padding: '0.9rem 1.2rem', color: '#fff', fontWeight: 600, fontSize: '1rem', textAlign: 'left'}}>Status</th>
                  <th style={{padding: '0.9rem 1.2rem', color: '#fff', fontWeight: 600, fontSize: '1rem', textAlign: 'left', borderTopRightRadius: '12px'}}>Upvotes</th>
                </tr>
              </thead>
              <tbody>
                {issues.map((issue, idx) => (
                  <tr key={issue.id} style={{
                    background: '#232136',
                    borderBottom: idx !== issues.length - 1 ? '1px solid #31265c' : 'none',
                  }}>
                    <td style={{fontWeight: 500, color: '#fff', padding: '0.9rem 1.2rem'}}>{issue.title}</td>
                    <td style={{color: '#b8b8d1', padding: '0.9rem 1.2rem'}}>{issue.description}</td>
                    <td style={{color: '#b8b8d1', padding: '0.9rem 1.2rem'}}>{issue.created_by?.username || "-"}</td>
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
                    <td style={{color: '#bfa8e6', padding: '0.9rem 1.2rem', fontWeight: 600}}>{issue.upvotes}</td>
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

export default CommunityIssues;

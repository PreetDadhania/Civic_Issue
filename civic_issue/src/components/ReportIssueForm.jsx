// Copilot, debug this React component for me.
// 1. Check for any common errors like unclosed JSX tags or incorrect hook usage.
// 2. Verify that all state variables are initialized correctly with useState.
// 3. Ensure form input elements have both `value` and `onChange` props correctly linked to a state handler.
// 4. Suggest where to add console.log statements to trace the form's state as I type a

import React, { useState } from "react";
import API from "../api";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { FaFileAlt, FaListAlt, FaChevronDown, FaCamera, FaMapMarkerAlt } from 'react-icons/fa';

// Replace with your actual Google Maps API key
const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";

const ReportIssueForm = () => {

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "Ahmedabad",
    image: null,
    category: "potholes",
    latitude: "",
    longitude: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cities = [
    "Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar",
    "Gandhinagar", "Junagadh", "Anand", "Nadiad", "Navsari", "Morbi",
    "Bharuch", "Mehsana", "Gandhidham", "Valsad", "Vapi", "Porbandar",
    "Godhra", "Palanpur"
  ];

  const handleChange = (e) => {
    console.log('Form change:', { name: e.target.name, value: e.target.value });
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setForm((prev) => ({ ...prev, image: null }));
      setImagePreview(null);
    }
  };

  // Track My Location button handler
  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setForm((prev) => ({
            ...prev,
            latitude: position.coords.latitude.toFixed(6),
            longitude: position.coords.longitude.toFixed(6),
          }));
        },
        (error) => {
          alert("Unable to retrieve your location. Please allow location access.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submission:', form);
    
    // Form validation
    if (!form.title.trim()) {
      setError("Title is required");
      return;
    }
    if (!form.description.trim()) {
      setError("Description is required");
      return;
    }
    if (!form.location) {
      setError("Location is required");
      return;
    }
    if (!form.category) {
      setError("Category is required");
      return;
    }

    setError("");
    
    // Create form data for image upload
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('location', form.location);
    formData.append('category', form.category);
    if (form.latitude) formData.append('latitude', form.latitude);
    if (form.longitude) formData.append('longitude', form.longitude);
    if (form.image) formData.append('image', form.image);

    setIsSubmitting(true);
    try {
      const apiUrl = 'issues/';
      console.log("Attempting to POST to:", `http://localhost:8000/api/${apiUrl}`);
      
      const response = await API.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        toast.success('Issue reported successfully! Authorities will review it soon.');
        // Clear form
        setForm({
          title: "",
          description: "",
          location: "Ahmedabad",
          image: null,
          category: "potholes",
          latitude: "",
          longitude: "",
        });
        setImagePreview(null);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to submit issue. Please try again.';
      toast.error(errorMessage);
      if (err.response?.status === 401) {
        toast.error('Please login again to submit an issue.');
      }
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <form className="report-issue-form" onSubmit={handleSubmit} autoComplete="off" style={{
        background: 'none',
        boxShadow: 'none',
        border: 'none',
        maxWidth: '540px',
        width: '100%',
        margin: '2.5rem auto',
        padding: '0',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2rem',
        fontSize: '1rem',
        color: '#e0e0f0',
        fontFamily: 'inherit',
      }}>
        <div style={{ marginBottom: '0.2rem' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#fff', margin: 0, textAlign: 'left' }}>Report an Issue</h2>
          <div style={{ fontSize: '0.98rem', color: '#b8b8d1', marginTop: '0.2rem', marginBottom: '0.2rem', textAlign: 'left' }}>Provide details so authorities can act quickly.</div>
        </div>
        {error && <p className="input-error" style={{ textAlign: 'left', fontSize: '0.95rem' }}>{error}</p>}
        {/* Title field (not shown in image, but present in site) */}
        <div className="input-group">
          <label className="input-label" htmlFor="title" style={{ fontWeight: 600, marginBottom: '0.2rem', color: '#bfa8e6', fontSize: '1rem', letterSpacing: '0.1px', display: 'flex', alignItems: 'center' }}>Title</label>
          <input
            className="input-field"
            id="title"
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Short title for the issue"
            autoFocus
            style={{ width: '100%', padding: '0.7rem 1rem', border: '1px solid #28223a', borderRadius: '7px', fontSize: '1rem', background: '#232136', color: '#fff', outline: 'none', fontFamily: 'inherit', marginTop: '0.05rem' }}
          />
        </div>
        {/* Issue Type */}
        <div className="input-group">
          <label className="input-label" htmlFor="category" style={{ fontWeight: 600, marginBottom: '0.2rem', color: '#bfa8e6', fontSize: '1rem', letterSpacing: '0.1px', display: 'flex', alignItems: 'center' }}>Issue Type</label>
          <select className="input-field" id="category" name="category" value={form.category} onChange={handleChange} style={{ width: '100%', padding: '0.7rem 1rem', border: '1px solid #28223a', borderRadius: '7px', fontSize: '1rem', background: '#232136', color: '#fff', outline: 'none', fontFamily: 'inherit', marginTop: '0.05rem' }}>
            <option value="">Select issue</option>
            <option value="potholes">Potholes</option>
            <option value="garbage">Garbage</option>
            <option value="streetlight">Streetlight</option>
            <option value="water">Water</option>
          </select>
        </div>
        {/* Description */}
        <div className="input-group">
          <label className="input-label" htmlFor="description" style={{ fontWeight: 600, marginBottom: '0.2rem', color: '#bfa8e6', fontSize: '1rem', letterSpacing: '0.1px', display: 'flex', alignItems: 'center' }}>Description</label>
          <textarea
            className="input-field"
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            style={{ minHeight: '90px', resize: 'vertical', width: '100%', padding: '0.7rem 1rem', border: '1px solid #28223a', borderRadius: '7px', fontSize: '1rem', background: '#232136', color: '#fff', outline: 'none', fontFamily: 'inherit', marginTop: '0.05rem' }}
            placeholder="Describe the issue in detail"
          />
        </div>
        {/* Upload Image */}
        <div className="input-group">
          <label className="input-label" htmlFor="image" style={{ fontWeight: 600, marginBottom: '0.2rem', color: '#bfa8e6', fontSize: '1rem', letterSpacing: '0.1px', display: 'flex', alignItems: 'center' }}>Upload Image</label>
          <div style={{ width: '100%', border: '1px dashed #28223a', borderRadius: '7px', background: '#232136', color: '#888', padding: '1.1rem 0.7rem', textAlign: 'center', fontSize: '1rem', marginTop: '0.05rem' }}>
            <input
              className="input-field"
              id="image"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="image" style={{ cursor: 'pointer', color: '#b8b8d1' }}>
              {imagePreview ? <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '80px', borderRadius: '6px', margin: '0 auto' }} /> : 'Image upload placeholder'}
            </label>
          </div>
        </div>
        {/* Location (dropdown and coordinates) */}
        <div className="input-group">
          <label className="input-label" htmlFor="location" style={{ fontWeight: 600, marginBottom: '0.2rem', color: '#bfa8e6', fontSize: '1rem', letterSpacing: '0.1px', display: 'flex', alignItems: 'center' }}>Location</label>
          <select className="input-field" id="location" name="location" value={form.location} onChange={handleChange} style={{ width: '100%', padding: '0.7rem 1rem', border: '1px solid #28223a', borderRadius: '7px', fontSize: '1rem', background: '#232136', color: '#fff', outline: 'none', fontFamily: 'inherit', marginTop: '0.05rem', marginBottom: '0.5rem' }}>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          <div style={{ display: 'flex', gap: '0.7rem', marginBottom: '0.5rem' }}>
            <input
              className="input-field"
              type="text"
              name="latitude"
              value={form.latitude}
              readOnly
              placeholder="Latitude"
              style={{ flex: 1, padding: '0.7rem 1rem', border: '1px solid #28223a', borderRadius: '7px', fontSize: '1rem', background: '#232136', color: '#fff', outline: 'none', fontFamily: 'inherit'}}
            />
            <input
              className="input-field"
              type="text"
              name="longitude"
              value={form.longitude}
              readOnly
              placeholder="Longitude"
              style={{ flex: 1, padding: '0.7rem 1rem', border: '1px solid #28223a', borderRadius: '7px', fontSize: '1rem', background: '#232136', color: '#fff', outline: 'none', fontFamily: 'inherit' }}
            />
          </div>
          <button type="button" onClick={handleDetectLocation} style={{ background: '#232136', color: '#a084ee', fontWeight: 600, padding: '0.6rem 0', border: '1px solid #a084ee55', borderRadius: '7px', fontSize: '1rem', cursor: 'pointer', marginTop: '0.1rem', letterSpacing: '0.1px', outline: 'none', width: '100%' }}>Track My Location</button>

          <button 
            type="submit" 
            className="btn-primary" 
            style={{ 
              background: '#a084ee', 
              color: '#fff', 
              fontWeight: 700, 
              padding: '0.7rem 0', 
              border: 'none', 
              borderRadius: '7px', 
              fontSize: '1rem', 
              cursor: isSubmitting ? 'not-allowed' : 'pointer', 
              marginTop: '0.5rem', 
              letterSpacing: '0.2px', 
              outline: 'none', 
              opacity: isSubmitting ? 0.7 : 1 
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </>
  );
};

const inputStyle = {
  width: '100%',
  background: '#231942',
  color: '#fff',
  border: '1.5px solid #31265c',
  borderRadius: '8px',
  padding: '0.8rem 1rem',
  fontSize: '1rem',
  outline: 'none',
  marginTop: '0.3rem'
};

const buttonStyle = {
  background: '#a084ee',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  padding: '0.8rem 1.5rem',
  fontWeight: 700,
  cursor: 'pointer',
  fontSize: '1rem'
};

export default ReportIssueForm;
import React, { useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useSearchParams } from 'react-router-dom';
import Login from './pages/Login.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import ViewerDashboard from './pages/ViewerDashboard.jsx';
import { setAuthToken } from './api.js';

export default function App(){
  const navigate = useNavigate();
  const [sp] = useSearchParams();

  useEffect(() => {
    const token = sp.get('token') || localStorage.getItem('token');
    if (token) {
      localStorage.setItem('token', token);
      setAuthToken(token);
    }
  }, [sp]);

  return (
    <div className="container">
      <nav className="nav">
        <Link to="/">Viewer</Link>
        <Link to="/admin">Admin</Link>
        <a href="/auth/google">Login with Google</a>
        <button onClick={() => {
          localStorage.removeItem('token'); setAuthToken(null); navigate('/');
        }}>Logout</button>
      </nav>

      <Routes>
        <Route path="/" element={<ViewerDashboard/>} />
        <Route path="/admin" element={<AdminDashboard/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/auth/callback" element={<Login/>} />
      </Routes>
    </div>
  );
}

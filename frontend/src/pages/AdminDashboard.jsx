import React, { useEffect, useState } from 'react';
import { api } from '../api.js';

export default function AdminDashboard(){
  const [history, setHistory] = useState([]);
  const [file, setFile] = useState(null);
  const [certs, setCerts] = useState([]);
  const [msg, setMsg] = useState('');

  async function loadHistory(){
    try {
      const { data } = await api.get('/api/uploads/history');
      setHistory(data);
    }catch(e){ setMsg(e.response?.data?.error || e.message); }
  }
  async function loadCerts(){
    try {
      const { data } = await api.get('/api/certificates');
      setCerts(data);
    }catch(e){ setMsg(e.response?.data?.error || e.message); }
  }
  async function doUpload(){
    if(!file) return;
    const fd = new FormData(); fd.append('file', file);
    try{
      const { data } = await api.post('/api/uploads/excel', fd);
      setMsg('Uploaded: ' + data.rows + ' rows');
      await loadHistory(); await loadCerts();
    }catch(e){ setMsg(e.response?.data?.error || e.message); }
  }
  useEffect(()=>{ loadHistory(); loadCerts(); },[]);

  return (
    <div className="grid">
      <div className="card">
        <h2>Admin: Upload Excel</h2>
        <p className="subtitle">Upload student records (columns: studentNumber, name, yearOfPassing, branch).</p>
        <input className="input" type="file" onChange={e=>setFile(e.target.files[0])} />
        <div style={{height:10}} />
        <button className="btn" onClick={doUpload}>Upload</button>
        {msg && <div style={{marginTop:10}} className="badge">{msg}</div>}
      </div>

      <div className="card">
        <h3>Upload History</h3>
        {history.length === 0 ? <p className="subtitle">No uploads yet.</p> : (
          <table className="table">
            <thead><tr><th>Filename</th><th>Status</th><th>Rows</th></tr></thead>
            <tbody>
              {history.map(h=>(
                <tr key={h.id}>
                  <td>{h.filename}</td>
                  <td><span className={`badge ${h.status}`}>{h.status}</span></td>
                  <td>{h.rows}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="card" style={{gridColumn: '1 / -1'}}>
        <h3>Recent Certificates</h3>
        {certs.length === 0 ? <p className="subtitle">No certificates found.</p> : (
          <table className="table">
            <thead><tr><th>Student #</th><th>Name</th><th>Year</th><th>Branch</th></tr></thead>
            <tbody>
              {certs.map(c=>(
                <tr key={c.id}><td>{c.studentNumber}</td><td>{c.name}</td><td>{c.yearOfPassing}</td><td>{c.branch}</td></tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

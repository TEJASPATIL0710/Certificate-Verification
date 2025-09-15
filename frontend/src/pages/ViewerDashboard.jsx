import React, { useState } from 'react';
import { api } from '../api.js';

export default function ViewerDashboard(){
  const [studentNumber, setStudentNumber] = useState('');
  const [result, setResult] = useState(null);
  const [err, setErr] = useState('');

  async function verify(){
    setErr(''); setResult(null);
    try {
      const { data } = await api.get('/api/certificates/verify', { params: { studentNumber }});
      setResult(data);
    } catch (e) {
      setErr(e.response?.data?.error || 'Not found');
    }
  }

  return (
    <div className="grid">
      <div className="card">
        <h2>Verify Certificate</h2>
        <p className="subtitle">Enter a student number to validate.</p>
        <input className="input" placeholder="Student Number" value={studentNumber} onChange={e=>setStudentNumber(e.target.value)} />
        <div style={{height:10}} />
        <button className="btn" onClick={verify}>Verify</button>
      </div>

      <div className="card">
        <h3>Result</h3>
        {err && <div className="badge failed">Error: {err}</div>}
        {result && <pre style={{whiteSpace:'pre-wrap'}}>{JSON.stringify(result,null,2)}</pre>}
        {!err && !result && <p className="subtitle">Results will appear here.</p>}
      </div>
    </div>
  )
}

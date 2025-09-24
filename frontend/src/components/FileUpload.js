import React, { useState } from 'react';
import { api } from '../api.js';

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      setFile(selectedFile);
      setError('');
      setMessage('');
    } else {
      setFile(null);
      setError('Please select a valid Excel file (.xlsx)');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setUploading(true);
    setError('');
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await api.post('/api/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setMessage('File uploaded successfully!');
        setFile(null);
        // Reset file input
        e.target.reset();
      } else {
        setError(response.data.message || 'Upload failed');
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="card">
      <h2>Upload Certificate Excel File</h2>
      <form onSubmit={handleUpload}>
        <div className="file-input-container">
          <input
            type="file"
            accept=".xlsx"
            onChange={handleFileChange}
            disabled={uploading}
            className="file-input"
          />
          <label className="file-input-label">
            {file ? file.name : 'Choose Excel file (.xlsx)'}
          </label>
        </div>

        {error && <div className="badge failed">{error}</div>}
        {message && <div className="badge success">{message}</div>}

        <button
          type="submit"
          disabled={!file || uploading}
          className="btn"
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
}
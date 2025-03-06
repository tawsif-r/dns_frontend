// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [formattedData, setFormattedData] = useState([]);
  const [formattedTexts, setFormattedTexts] = useState({});
  const apiUrl = 'http://localhost:8000/admin/api/formatted/';

  useEffect(() => {
    axios.get(apiUrl)
      .then(response => {
        const data = Array.isArray(response.data) ? response.data : [response.data];
        setFormattedData(data);
        const initialFormattedTexts = {};
        data.forEach(item => {
          initialFormattedTexts[item.id] = item.body;
        });
        setFormattedTexts(initialFormattedTexts);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const formatText = (itemId, format) => {
    const item = formattedData.find(data => data.id === itemId);
    if (!item || !item.body) return;

    const jobs = item.body.split('\n\n');
    let result = '';

    switch (format) {
      case 'text':
        result = item.body;
        break;
      case 'web':
        result = jobs.map(job => {
          const [title, desc] = job.split('\n');
          return `<div><h3>${title}</h3><p>${desc}</p></div>`;
        }).join('');
        break;
      case 'app':
        result = JSON.stringify(
          jobs.map(job => {
            const [title, desc] = job.split('\n');
            return { title, description: desc };
          }),
          null,
          2
        );
        break;
      case 'wap':
        result = jobs.map(job => job.replace('\n', ' - ')).join('\n');
        break;
      case 'ibr':
        result = jobs.map(job => {
          const [title, desc] = job.split('\n');
          return `Title: ${title} | Description: ${desc}`;
        }).join('\n');
        break;
      default:
        result = item.body;
    }

    setFormattedTexts(prev => ({
      ...prev,
      [itemId]: result
    }));
  };

  if (!formattedData.length) return <div>Loading...</div>;

  return (
    <div className="App">
      <h1 className='header'>Formatted Text Formatter</h1>
      
      <div className="table-view">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Formatted at</th>
              <th>Body</th>
              <th>Format Options</th>
            </tr>
          </thead>
        </table>
        <div className="card">
        <div className="table-body-container">
          <table>
            <tbody>
              {formattedData.map(item => (
                <tr key={item.id}>
                  <td>{item.subscriber || 'N/A'}</td>
                  <td>{item.formatted_at || new Date().toLocaleString()}</td>
                  <td>
                    <pre>{formattedTexts[item.id] || item.body}</pre>
                  </td>
                  <td>
                    <div className="button-group">
                      <button onClick={() => formatText(item.id, 'text')}>Text</button>
                      <button onClick={() => formatText(item.id, 'web')}>Web</button>
                      <button onClick={() => formatText(item.id, 'app')}>App</button>
                      <button onClick={() => formatText(item.id, 'wap')}>Wap</button>
                      <button onClick={() => formatText(item.id, 'ibr')}>Ibr</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
        
      </div>
    </div>
  );
}

export default App;
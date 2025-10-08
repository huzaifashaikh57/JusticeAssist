import React, { useState } from 'react';
import './SuspectGuess.css';

const SuspectGuess = () => {
  const [description, setDescription] = useState('');
  const [evidenceFile, setEvidenceFile] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append('description', description);
    if (evidenceFile) {
      formData.append('evidence_file', evidenceFile);
    }

    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:5000/ai/guess-suspect', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data);
      } else {
        alert('Failed to get suspect guess.');
      }
    } catch (error) {
      console.error('Error getting suspect guess:', error);
      alert('An error occurred while getting the suspect guess.');
    }
    setIsLoading(false);
  };

  const handleClear = () => {
    setDescription('');
    setEvidenceFile(null);
    setResult(null);
  };

  return (
    <div className="suspect-guess-container">
      <div className="suspect-guess-form">
        <h2>Suspect Guess</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="5"
            />
          </div>
          <div className="form-group">
            <label>Evidence File</label>
            <input
              type="file"
              onChange={(e) => setEvidenceFile(e.target.files[0])}
            />
          </div>
          <div className="form-actions">
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Analyzing...' : 'Get Suspect Guess'}
            </button>
            <button type="button" onClick={handleClear} className="clear-btn">
              Clear
            </button>
          </div>
        </form>
      </div>

      <div className="suspect-guess-result">
        {result && (
          <div>
            <h3>Suspect Profile</h3>
            <p>{result.dashboard.suspect_profile}</p>
            <h3>Summary</h3>
            <p>{result.dashboard.summary}</p>
            <h3>Artifacts</h3>
            <pre>{JSON.stringify(result.dashboard.artifacts, null, 2)}</pre>
            <h3>Clues</h3>
            <ul>
              {result.detailed.clues.map((clue, index) => (
                <li key={index}>{clue}</li>
              ))}
            </ul>
            <h3>Tool Results</h3>
            <pre>{JSON.stringify(result.detailed.tool_results, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuspectGuess;

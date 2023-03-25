import React, { useState } from 'react';
import './App.css';

function App() {
  const [insuranceType, setInsuranceType] = useState('general');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [value, setValue] = useState('');
  const [quote, setQuote] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Send form data to server to calculate quote
    fetch('/api/quote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        insuranceType: insuranceType,
        make: make,
        model: model,
        year: year,
        value: value
      })
    })
    .then(response => response.json())
    .then(data => {
      setQuote(`Your quote for ${make} ${model} is ${data.price}`);
    })
    .catch(error => {
      console.error('Error calculating quote:', error);
      // Handle error (e.g. display error message)
    });
  }

  return (
    <div className="App">
      <h1>Quote Calculator</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="insurance-type">Insurance Type:</label>
        <select id="insurance-type" name="insurance-type" value={insuranceType} onChange={(event) => setInsuranceType(event.target.value)}>
          <option value="general">General Insurance</option>
          <option value="life">Life Insurance</option>
        </select>
        <br />
        <label htmlFor="make">Make:</label>
        <input type="text" id="make" name="make" value={make} onChange={(event) => setMake(event.target.value)} />
        <br />
        <label htmlFor="model">Model:</label>
        <input type="text" id="model" name="model" value={model} onChange={(event) => setModel(event.target.value)} />
        <br />
        <label htmlFor="year">Year of Manufacture:</label>
        <input type="text" id="year" name="year" value={year} onChange={(event) => setYear(event.target.value)} />
        <br />
        <label htmlFor="value">Estimated Value:</label>
        <input type="text" id="value" name="value" value={value} onChange={(event) => setValue(event.target.value)} />
        <br />
        <input type="submit" value="Calculate Quote" />
      </form>
      <div id="quote">{quote}</div>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function Calculator() {
  const [insuranceType, setInsuranceType] = useState('general');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [value, setValue] = useState('');
  const [price, setPrice] = useState(0);

  const handleChange = (e) => {
    switch (e.target.name) {
      case 'insuranceType':
        setInsuranceType(e.target.value);
        break;
      case 'make':
        setMake(e.target.value);
        break;
      case 'model':
        setModel(e.target.value);
        break;
      case 'year':
        setYear(e.target.value);
        break;
      case 'value':
        setValue(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/quote', { insuranceType, make, model, year, value })
      .then(res => {
        setPrice(res.data.quote);
        alert('Your quote is: ' + res.data.quote);
      })
      .catch(err => {
        console.error(err);
      });
  }

  return (
    <div className="App">
      <h1>Insurance Quote</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="insuranceType">Insurance Type:</label>
          <select id="insuranceType" name="insuranceType" value={insuranceType} onChange={handleChange}>
            <option value="general">General Insurance</option>
            <option value="life">Life Insurance</option>
          </select>
        </div>
        <div>
          <label htmlFor="make">Make:</label>
          <input type="text" id="make" name="make" value={make} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="model">Model:</label>
          <input type="text" id="model" name="model" value={model} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="year">Year:</label>
          <input type="text" id="year" name="year" value={year} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="value">Value:</label>
          <input type="text" id="value" name="value" value={value} onChange={handleChange} />
        </div>
        <button type="submit">Calculate</button>
      </form>
      <div>
        <p>Price: {price}</p>
      </div>
    </div>
  );
}

export default Calculator;

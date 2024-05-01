import React, { useState } from "react";
import axios from "axios";

const TestOntology = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/sparql2", { herbName: query });
      setResult(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const renderResults = () => {
    if (!result) return null;

    if (result.length === 0) {
      return <p>No data found</p>;
    }

    return result.map((item, index) => (
      <div key={index}>
        <h3>Result {index + 1}</h3>
        <p>Name: {item.name}</p>
        <p>OtherName: {item.otherName}</p>
        <p>BinomailName: {item.binomialName}</p>
        <p>Family: {item.family}</p>
        <p>EnglishName: {item.englishName}</p>
        <p>Pharmacology: {item.pharmacology}</p>
        <p>Origin: {item.origin}</p>
        <p>Medical Properties: {item.medicalProperties}</p>
        <p>Character: {item.character}</p>
        <p>Properties: {item.properties}</p>
      </div>
    ));
  };

  return (
    <div>
      <h2>Semantic Search for Herbs</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Query:
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
        </label>
        <button type="submit">Search</button>
      </form>
      <div>
        <h3>Results</h3>
        {renderResults()}
      </div>
    </div>
  );
};

export default TestOntology;

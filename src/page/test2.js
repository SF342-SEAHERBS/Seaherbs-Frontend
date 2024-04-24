import React, { useState, useEffect } from "react";
import axios from 'axios';

const Testsearch = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/post2/getAllData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    return (
      <div>
        <h1>Data from Backend</h1>
        <ul>
          {data.map(item => (
            <li key={item.name}>
              <h2>{item.name}</h2>
              <p>Character: {item.character}</p>
              <p>Family: {item.family}</p>
              <p>Other Name: {item.otherName}</p>
              <p>Properties: {item.properties}</p>
              <p>Synonym: {item.synonym}</p>
              {/* Add more fields as needed */}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  


export default Testsearch;

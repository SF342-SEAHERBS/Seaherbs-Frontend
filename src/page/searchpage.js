import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import Dropdown from "../components/Dropdown";

const SearchPage = () => {
  const [herbsData, setHerbsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredHerbs, setFilteredHerbs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/post2/getAllData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const responseData = await response.json();
        setHerbsData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredHerbs(herbsData.filter(herb => herb.name.toLowerCase().includes(searchQuery.toLowerCase())));
  }, [herbsData, searchQuery]);

  const handleCardClick = (herbName) => {
    const selectedHerb = herbsData.find(herb => herb.name === herbName);
    navigate(`/showdata/${herbName}`, { state: { selectedHerb } });
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="app-container">
      <div className="flex-container">
        <img
          src="./logoseaherbs.png"
          alt="Logo Sea Herbs"
          className="logo"
          style={{ width: "668px", height: "auto" }}
        />
        <div className="container">
          <div className="scrollable-container">
            <div className="search-container" style={{ textAlign: "center", position: "relative" }}>
              <div style={{ position: "relative" }}>
                <div>
                  <input
                    type="text"
                    placeholder="SEARCH"
                    className="input"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    style={{
                      background: "transparent",
                      border: "1px solid black",
                      borderRadius: "25px",
                      outline: "none",
                      width: "700px",
                      height: "60px",
                      fontWeight: "400",
                      fontSize: "20px",
                      transition: "0.8s",
                      padding: "20px",
                      marginTop: "50px",
                      marginBottom: "27px",
                      fontFamily: "Inter, sans-serif",
                      color: "black",
                    }}
                  />
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
              <p style={{ fontWeight: "400", fontSize: "24px", fontFamily: "Inter, sans-serif" }}>Our Herbs</p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center", padding: "20px" }}>
              {filteredHerbs.length === 0 ? (
                <p style={{ fontWeight: "300", fontSize: "24px", fontFamily: "Inter, sans-serif" }}>Data Not Found</p>
              ) : (
                filteredHerbs.map((herb, index) => (
                  <Card
                    key={index}
                    id={index}
                    photo={herb.urlpicture}
                    text={herb.name}
                    onClick={() => handleCardClick(herb.name)}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

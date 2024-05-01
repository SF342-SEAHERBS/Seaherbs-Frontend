import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import Dropdown from "../components/Dropdown";

const SearchPage = () => {
  const [herbsData, setHerbsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [searchBarWidth, setSearchBarWidth] = useState(700);

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

  const handleCardClick = (herbName) => {
    const selectedHerb = herbsData.filter((herb) => {
      return herb.name === herbName;
    })[0];
    navigate(`/showdata/${herbName}`, { state: { selectedHerb } });
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    if (event.key === "Enter") {
      updateSearchHistory(event.target.value);
    }
  };

  const handleSearchIconClick = () => {
    updateSearchHistory(searchQuery);
  };

  const updateSearchHistory = (query) => {
    setSearchHistory((prevHistory) => {
      if (query.trim() !== "" && !prevHistory.includes(query)) {
        return [query, ...prevHistory];
      }
      return prevHistory;
    });
  };

  useEffect(() => {
    const searchBar = document.getElementById("search-bar");
    if (searchBar) {
      setSearchBarWidth(searchBar.offsetWidth);
    }
  }, [searchQuery]);

  const filterHerbsByLetter = (letter) => {
    setSearchQuery(letter);
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
            <div
              className="search-container"
              style={{ textAlign: "center", position: "relative" }}
            >
              <div style={{ position: "relative" }}>
                <div>
                  <input
                    id="search-bar"
                    type="text"
                    placeholder="SEARCH"
                    className="input"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    onFocus={() => setShowHistory(true)}
                    onBlur={() => setShowHistory(false)}
                    fontFamily="Kanit, sans-serif"
                    onKeyPress={handleSearchInputChange}
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
                  <img
                    src="../searchicon.png"
                    alt="Search Icon"
                    onClick={handleSearchIconClick}
                    style={{
                      position: "relative",
                      right: "58px",
                      top: "5px",
                      width: "24px",
                      height: "24px",
                    }}
                  />
                </div>
                {showHistory && searchHistory.length > 0 && (
                  <div
                    className="history-container"
                    style={{
                      position: "absolute",
                      top: "calc(100% + 5px)",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: `${searchBarWidth}px`,
                      backgroundColor: "#fff",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      borderRadius: "8px",
                      zIndex: "1000",
                      padding: "10px",
                      fontFamily: "Kanit, sans-serif",
                    }}
                  >
                    {searchHistory.map((query, index) => (
                      <p key={index}>{query}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "10px",
                marginTop: "10px",
              }}
            >
              {Array.from(Array(46), (_, i) =>
                String.fromCharCode(3585 + i)
              ).map((letter, index) => (
                <span
                  key={index}
                  style={{
                    cursor: "pointer",
                    margin: "5px",
                    fontSize: "20px",
                    fontFamily: "Kanit, sans-serif",
                  }}
                  onClick={() => filterHerbsByLetter(letter)}
                >
                  {letter}
                </span>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  marginBottom: "10px",
                }}
              >
                <div style={{ marginRight: "10px" }}>
                  {/* Dropdown for origins */}
                </div>
                <div>
                  {/* Dropdown for systems */}
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: "5px",
                justifyContent: "center",
              }}
            >
              <p
                style={{
                  fontWeight: "400",
                  fontSize: "24px",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Our Herbs
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                justifyContent: "center",
                padding: "20px",
              }}
            >
              {herbsData.map((herb, index) => (
                <Card
                  key={index}
                  id={index}
                  photo={herb.urlpicture}
                  text={herb.name}
                  onClick={() => handleCardClick(herb.name)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [herbsData, setHerbsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [searchBarWidth, setSearchBarWidth] = useState(700);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3005/api/data")
      .then((response) => response.json())
      .then((data) => {
        setHerbsData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleCardClick = (herbId) => {
    navigate(`/showdata/${herbId}`);
    console.log(`Herb ${herbId} clicked!`);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    if (event.key === "Enter") {
      updateSearchHistory(event.target.value);
    }
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

  const calculateSimilarity = (str1, str2) => {
    const len1 = str1.length;
    const len2 = str2.length;
    const dp = Array.from(Array(len1 + 1), () => Array(len2 + 1).fill(0));
    for (let i = 0; i <= len1; i++) {
      dp[i][0] = i;
    }
    for (let j = 0; j <= len2; j++) {
      dp[0][j] = j;
    }
    for (let i = 1; i <= len1; i++) {
      for (let j = 1; j <= len2; j++) {
        const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1,
          dp[i - 1][j - 1] + cost
        );
      }
    }
    return 1 - dp[len1][len2] / Math.max(len1, len2);
  };

  const filteredHerbs = herbsData.filter((herb) => {
    const herbName = herb["ชื่อสมุนไพร"].toLowerCase();
    const query = searchQuery.toLowerCase();

    if (
      calculateSimilarity(herbName, query) >= 0.8 ||
      herbName.includes(query)
    ) {
      return true;
    } else {
      return false;
    }
  });

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
              {filteredHerbs.length === 0 ? (
                <p
                  style={{
                    fontWeight: "300",
                    fontSize: "24px",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Data Not Found
                </p>
              ) : (
                filteredHerbs.map((herb, index) => (
                  <Card
                    key={index}
                    id={index}
                    photo={herb["ลิ้งรูปภาพ"]}
                    text={herb["ชื่อสมุนไพร"]}
                    onClick={() => handleCardClick(herb["id"])}
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

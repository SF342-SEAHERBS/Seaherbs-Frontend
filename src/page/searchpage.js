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
    const selectedHerb = herbsData.find((herb) => herb.name === herbName);
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

  const filteredHerbs = herbsData.filter((herb) =>
    herb.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app-container">
      {/* Your JSX code here */}
    </div>
  );
};

export default SearchPage;

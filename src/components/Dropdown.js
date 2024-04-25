import React, { useState, useEffect, useRef } from "react";

const Dropdown = ({ options, defaultOption }) => {
  const [isActive, setIsActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const buttonRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        !buttonRef.current.contains(e.target) &&
        !labelRef.current.contains(e.target)
      ) {
        setIsActive(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const toggleDropdown = () => {
    setIsActive(!isActive);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsActive(false);
    buttonRef.current.classList.add("selected");
    buttonRef.current.classList.remove("active");
  };

  return (
    <div className="drop-down" style={{ position: "relative" }}>
      <button
        ref={buttonRef}
        className={`button ${isActive ? "active" : ""} ${
          selectedOption === defaultOption ? "selected" : ""
        }`}
        onClick={toggleDropdown}
        style={{
          position: "relative",
          zIndex: 1,
          cursor: "pointer",
          background: "white",
          border: "0.8px solid black",
          height: "3rem",
          width: "8rem",
          borderRadius: "2rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "black",
          transition: "0.3s all ease",
          fontFamily: "Inter, sans-serif",
          fontWeight:"bolder",
          boxShadow:"rgba(0, 0, 0, 0.1) 0px 4px 12px"
        }}
      >
        <label
          ref={labelRef}
          className="label-text"
          style={{
            fontSize: "0.8rem",
            fontFamily: "Inter, sans-serif",
            
          }}
        >
          {selectedOption}
        </label>
        <span
          className="icon"
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: "0.4rem",
            transition: "0.2s all ease",
          }}
        >
          <i className={`fas fa-chevron-${isActive ? "up" : "down"}`} />
        </span>
      </button>
      {isActive && (
        <ul
          className="options"
          style={{
            position: "absolute",
            top: "3rem",
            listStyleType: "none",
            width: "100%",
            border: "0.8px solid black",
            borderRadius: "2rem",
            fontSize: "0.8rem",
            fontFamily: "Inter, sans-serif",
            color: "black",
            overflow: "hidden",
            transition: "all 0.2s ease-in",
            backgroundColor:"white",
            clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0% 100%)",
            zIndex: "999",
          }}
        >
          {options.map((option) => (
            <li
              key={option}
              className="option"
              onClick={() => handleOptionClick(option)}
              style={{
                padding: "0.3rem",
                cursor: "pointer",
                transition: "background, color 0.3s ease",
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;

import React from "react";

const Card = ({ photo, text, onClick }) => {
  return (
    <div
      style={{
        width: "calc(40% - 5px)",
        cursor: "pointer",
        borderRadius: "15px",
        overflow: "hidden",
        position: "relative",
      }}
      onClick={onClick}
    >
      <img
        src={photo}
        alt={`Card`}
        style={{
          width: "100%",
          height: "300px",
          objectFit: "cover",
          borderRadius: "15px",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "0",
          width: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "#ffffff",
          textAlign: "left",
          padding: "10px 0",
        }}
      >
        <p style={{ margin: "0",marginLeft:"18px", fontFamily: 'Kanit, sans-serif',fontWeight:"200" }}>{text}</p>
      </div>
    </div>
  );
};

export default Card;

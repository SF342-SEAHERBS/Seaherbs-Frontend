import React from "react";

const Card = ({ photo, text, onClick }) => {
  return (
    <div
      style={{
        width: "calc(40% - 5px)",
        cursor: "pointer",
        borderRadius: "15px",
        overflow: "hidden",
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
      <p style={{ textAlign: "center", marginTop: "10px",fontFamily: 'Prompt, sans-serif', }}>{text}</p>
    </div>
  );
};

export default Card;

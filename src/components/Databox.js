import React from "react";

const HerbCard = ({ data }) => {
  const renderData = () => {
    return Object.entries(data).map(([key, value]) => (
      <div key={key} style={styles.item}>
        <span style={styles.detailheader}>{key} : </span>
        <span style={styles.detail}>{value}</span>
      </div>
    ));
  };
  return (
    <div>
      <div style={styles.container}>
        <div style={styles.containercard}>{renderData()}\</div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    alignItems: "center",
    marginBottom: "50px",
  },
  containercard: {
    height: "100%",
    borderRadius: 15,
    backgroundColor: "rgba(217, 217, 217, 0.23)",
    // width: "max-content",
    width: "550px",
    padding: "30px",
    boxShadow: "2px 4px 10px rgba(0, 0, 0, 0.25)",
  },

  detailheader: {
    fontSize: "24px",
    fontWeight: "400",
    fontFamily: "Kanit, sans-serif",
  },
  detail: {
    fontSize: "24px",
    fontWeight: "200",
    fontFamily: "Kanit, sans-serif", // Adjust the font size as needed
  },
  fontFamily: "Kanit, sans-serif",
};

export default HerbCard;

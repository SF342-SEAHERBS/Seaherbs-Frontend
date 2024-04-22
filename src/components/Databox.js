import React from "react";

const HerbCard = ({ data }) => {
    const renderData = () => {
        return Object.entries(data).map(([key, value]) => (
          <div key={key} style={styles.item}>
            <span style={styles.detail}>{key}:</span>
            <span style={styles.detail}>{value}</span>
          </div>
        ));
    }
  return (
    <div>
      <div style={styles.container}>
        <div style={styles.containercard}>
          {renderData()}
          {/* <div style={styles.detail}>ชื่อในภาษาอังกฤษ : </div>
          <div style={styles.detail}>ชื่อในภาษาไทย : </div>
          <div style={styles.detail}>ชื่ออื่น ๆ : </div> */}
        </div>
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
  cardHeader: {
    fontSize: "24px", // Adjust the font size as needed
  },
  detail: {
    fontSize: "32px", // Adjust the font size as needed
    
  },
  fontFamily: "Prompt, sans-serif",
};

export default HerbCard;

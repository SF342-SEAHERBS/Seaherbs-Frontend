import React, { useState, useEffect } from "react";
import HerbCard from "../components/Databox";
import { useParams } from "react-router-dom";

const ShowDataPage = () => {
  const [herbsData, setHerbsData] = useState([]);
  const { id } = useParams(); // Use id instead of index
  const selectedHerb = herbsData.find((herb) => herb["id"] === parseInt(id)); // Find herb by id

  useEffect(() => {
    // Fetch data from the appropriate endpoint
    fetch("http://localhost:3005/api/data")
      .then((response) => response.json())
      .then((data) => {
        setHerbsData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const herbData1 = selectedHerb
    ? {
        ชื่อสมุนไพร: selectedHerb["ชื่อสมุนไพร"],
        ชื่อวิทยาศาสตร์: selectedHerb["ชื่อวิทยาศาสตร์"],
        ชื่อพ้อง: selectedHerb["ชื่อพ้อง"],
        ชื่อวงศ์: selectedHerb["ชื่อวงศ์"],
        ชื่ออื่นๆ: selectedHerb["ชื่ออื่นๆ"] || "No other names available",
      }
    : {};
  const herbData2 = selectedHerb
    ? {
        ลักษณะทางพฤกษศาสตร์: selectedHerb["ลักษณะทางพฤกษศาสตร์"],
      }
    : {};
  const herbData3 = selectedHerb
    ? {
        สรรพคุณ: selectedHerb["สรรพคุณ"],
      }
    : {};

  return (
    <div className="app-container">
      <div className="flex-container">
        <img
          src="/logoseaherbs.png"
          alt="Logo Sea Herbs"
          className="logo"
          style={{ width: "668px", height: "auto" }}
        />

        <div className="container">
          <div className="scrollable-container">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px",
                justifyContent: "center",
              }}
            >
              <div>
                <p
                  style={{
                    fontWeight: "500",
                    fontSize: "48px",
                    fontFamily: "Kanit, sans-serif",
                    textAlign: "center",
                  }}
                >
                  {selectedHerb && <p>{selectedHerb["ชื่อสมุนไพร"]}</p>}
                </p>

                <div
                  style={{
                    borderRadius: "15px",
                    overflow: "hidden",
                    alignItems: "center",
                    fontFamily: "Kanit, sans-serif",
                  }}
                >
                  <img
                    // src={
                    //   "https://images.unsplash.com/photo-1561407958-54aa9fa49a21?q=80&w=2448&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    // }
                    src={selectedHerb && selectedHerb["ลิ้งรูปภาพ"]}
                    alt={`Card`}
                    style={{
                      width: "800px",
                      height: "350px",
                      objectFit: "cover",
                      borderRadius: "15px",
                      marginBottom: "20px",
                    }}
                  />
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
                gap: "5px",
                justifyContent: "center",
                marginTop: "30px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ marginRight: "50px" }}>
                    <HerbCard data={herbData1} />
                  </div>
                  <div>
                    <HerbCard data={herbData3} />
                  </div>
                </div>
                <div>
                  <HerbCard data={herbData2} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowDataPage;

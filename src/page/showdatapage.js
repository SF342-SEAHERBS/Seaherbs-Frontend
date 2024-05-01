import React from "react";
import HerbCard from "../components/Databox";
import { useLocation } from "react-router-dom";

const ShowDataPage = () => {
  const location = useLocation();
  const { selectedHerb } = location.state;
  console.log(selectedHerb);

  const herbData1 = selectedHerb
    ? {
        ชื่อไทย: selectedHerb.name,
        ชื่อสามัญ: selectedHerb.englishName,
        ชื่อท้องถิ่น: selectedHerb.otherName,
        ชื่อวิทยาศาสตร์: selectedHerb.binomialName,
        ชื่อวงศ์: selectedHerb.family,
        สกุล: selectedHerb.genusName,
        สปีชีส์: selectedHerb.specificName,
        ชื่อพ้อง: selectedHerb.synonyms,
      }
    : {};
  const herbData2 = selectedHerb
    ? {
        ลักษณะทางพฤกษศาสตร์: selectedHerb.character,
        สภาพนิเวศวิทยา: selectedHerb.ecology,
      }
    : {};
  const herbData3 = selectedHerb
    ? {
        สรรพคุณ: selectedHerb.properties,
        องค์ประกอบทางเคมี: selectedHerb.chemical,
        การศึกษาทางเภสัชวิทยา: selectedHerb.pharmacology,
        การศึกษาทางพิษวิทยา: selectedHerb.toxicology,
      }
    : {};
  const herbData4 = selectedHerb
    ? {
        การใช้ประโยชน์: selectedHerb.howToUse,
      }
    : {};
  const herbData5 = selectedHerb
    ? {
        ถิ่นกำเนิด: selectedHerb.origin,
        แหล่งอ้างอิงข้อมูล: selectedHerb.reference,
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
                  {selectedHerb && <p>{selectedHerb.name}</p>}
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
                    src={selectedHerb && selectedHerb.urlpicture}
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
                    <HerbCard data={herbData4} />
                  </div>
                </div>
                <div>
                  <HerbCard data={herbData2} />
                  <HerbCard data={herbData5} />
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

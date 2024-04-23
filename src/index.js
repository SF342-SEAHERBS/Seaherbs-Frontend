import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import Home from "./App";
import SearchPage from "./page/searchpage";
import ShowDataPage from "./page/showdatapage";
import TestOntology from "./page/testontology";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/search" element={<SearchPage />} />
        <Route path="/showdata/:id" element={<ShowDataPage />} />
        <Route path="/testontology" element={<TestOntology  />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

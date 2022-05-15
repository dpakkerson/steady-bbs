import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TopPage from "./pages/TopPage";
import ThreadPage from "./pages/ThreadPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="/threads/:threadId" element={<ThreadPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

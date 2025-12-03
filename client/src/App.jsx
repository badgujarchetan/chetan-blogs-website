import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout.jsx";
import { Routes_Index } from "./helper/RoutesName.js";
import Index from "@/pages/index.jsx";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />} path={Routes_Index}>
          <Route index element={<Index />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout.jsx";
import {
  Routes_Index,
  signIn_Route,
  signUp_Route,
} from "./helper/RoutesName.js";
import Index from "@/pages/index.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />} path={Routes_Index}>
          <Route index element={<Index />} />
        </Route>
        <Route element={<SignIn />} path={signIn_Route}></Route>
        <Route element={<SignUp />} path={signUp_Route}></Route>
      </Routes>
    </BrowserRouter>
  );
}

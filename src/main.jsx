import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./presentation/pages/Login.jsx";
import Home from "./presentation/pages/Home.jsx";
import Patient_list from "./presentation/pages/Patient_list.jsx";
import Patient from "./presentation/pages/Patient.jsx";
import NavBar from "./presentation/components/NavBar.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Home />}></Route>
          <Route path="/listado-paciente" element={<Patient_list />}></Route>
          <Route path="/paciente/:id" element={<Patient />}></Route>
        </Route>
      </Routes>
    </StrictMode>
  </BrowserRouter>,
);

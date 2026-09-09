import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import Patient_list from "./presentation/pages/Patient_list.jsx";
import Patient from "./presentation/pages/Patient.jsx";
import NavBar from "./presentation/components/NavBar.jsx";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />

      <Routes>
        {/* Layout principal */}
        <Route path="/" element={<NavBar />}>
          {/* Ruta por defecto */}
          <Route index element={<Navigate to="listado-paciente" replace />} />

          {/* Listado de pacientes */}
          <Route path="listado-paciente" element={<Patient_list />} />

          {/* Detalle de paciente */}
          <Route path="paciente/:id" element={<Patient />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

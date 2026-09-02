import { useEffect, useState } from "react";
import { Form, ListGroup, Card, Button, Badge, Alert } from "react-bootstrap";

import data from "../../data/dataBase.js";
import { obtenerFecha, obtenerHora } from "../../utils/hora";

const STORAGE_KEY = "medicalData";

const medicamentos = data.medications;

export default function AutoComplete({ idPaciente = 1, idDoctor = 1 }) {
  // ==========================================
  // CARGAR DATA INICIAL
  // ==========================================

  const [medicalData, setMedicalData] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return data;
    }

    try {
      return JSON.parse(saved);
    } catch (error) {
      console.error("Error leyendo localStorage:", error);

      return data;
    }
  });

  // ==========================================
  // FORMULARIO
  // ==========================================

  const [busqueda, setBusqueda] = useState("");

  const [resultados, setResultados] = useState([]);

  const [medicamentoSeleccionado, setMedicamentoSeleccionado] = useState(null);

  const [descripcion, setDescripcion] = useState("");

  // ==========================================
  // GUARDAR CAMBIOS
  // ==========================================

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(medicalData));
  }, [medicalData]);

  // ==========================================
  // BUSCAR MEDICAMENTO
  // ==========================================

  const handleSearch = (e) => {
    const valor = e.target.value;

    setBusqueda(valor);

    if (!valor.trim()) {
      setResultados([]);
      return;
    }

    const filtrados = medicamentos.filter((medicamento) =>
      medicamento.nombre.toLowerCase().includes(valor.toLowerCase()),
    );

    setResultados(filtrados);
  };

  // ==========================================
  // SELECCIONAR
  // ==========================================

  const handleSelect = (medicamento) => {
    setMedicamentoSeleccionado(medicamento);

    setBusqueda(medicamento.nombre);

    setResultados([]);

    setDescripcion("");
  };

  // ==========================================
  // AGREGAR
  // ==========================================

  const handleAgregar = () => {
    if (!medicamentoSeleccionado) {
      alert("Seleccione un medicamento");
      return;
    }

    if (!descripcion.trim()) {
      alert("Ingrese una descripción");
      return;
    }

    // Buscar si ya existe para este paciente
    const existe = medicalData.medicationsList.some(
      (item) =>
        item.idPaciente === idPaciente &&
        item.medicationId === medicamentoSeleccionado.id,
    );

    if (existe) {
      alert("Este medicamento ya está registrado para este paciente.");

      return;
    }

    // Buscar doctor
    const doctor = medicalData.doctors.find((item) => item.id === idDoctor);

    const nuevoMedicamento = {
      id: crypto.randomUUID(),

      idPaciente,

      idDoctor,

      name_doctor: doctor?.first_name || "",

      surname_doctor: doctor?.last_name || "",

      medicationId: medicamentoSeleccionado.id,

      medication: medicamentoSeleccionado.nombre,

      description: descripcion.trim(),

      today: obtenerFecha(),

      hour: obtenerHora(),
    };

    setMedicalData((prev) => ({
      ...prev,

      medicationsList: [...prev.medicationsList, nuevoMedicamento],
    }));

    // Limpiar formulario
    setBusqueda("");

    setResultados([]);

    setMedicamentoSeleccionado(null);

    setDescripcion("");
  };

  // ==========================================
  // ELIMINAR
  // ==========================================

  const handleEliminar = (id) => {
    setMedicalData((prev) => ({
      ...prev,

      medicationsList: prev.medicationsList.filter((item) => item.id !== id),
    }));
  };

  // ==========================================
  // MEDICAMENTOS DEL PACIENTE
  // ==========================================

  const medicamentosPaciente = medicalData.medicationsList.filter(
    (item) => item.idPaciente == idPaciente,
  );
  console.log(medicamentosPaciente);
  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="container py-4">
      <h2 className="mb-4">Medicamentos del paciente</h2>

      {/* ============================== */}
      {/* BUSCADOR */}
      {/* ============================== */}

      <div className="position-relative" style={{ maxWidth: "500px" }}>
        <Form.Label>Medicamento</Form.Label>

        <Form.Control
          type="text"
          placeholder="Buscar medicamento..."
          value={busqueda}
          onChange={handleSearch}
        />

        {resultados.length > 0 && (
          <ListGroup
            className="position-absolute w-100"
            style={{ zIndex: 1000 }}
          >
            {resultados.map((medicamento) => (
              <ListGroup.Item
                key={medicamento.id}
                action
                onClick={() => handleSelect(medicamento)}
              >
                {medicamento.nombre}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </div>

      {/* ============================== */}
      {/* DESCRIPCIÓN */}
      {/* ============================== */}

      {medicamentoSeleccionado && (
        <Card className="mt-3" style={{ maxWidth: "500px" }}>
          <Card.Body>
            <Card.Title>{medicamentoSeleccionado.nombre}</Card.Title>

            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>

              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Ingrese una descripción..."
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" onClick={handleAgregar}>
              Agregar medicamento
            </Button>
          </Card.Body>
        </Card>
      )}

      {/* ============================== */}
      {/* MEDICAMENTOS DEL PACIENTE */}
      {/* ============================== */}

      <div className="mt-4">
        <h4>
          Medicamentos registrados{" "}
          <Badge bg="primary">{medicamentosPaciente.length}</Badge>
        </h4>

        {medicamentosPaciente.length === 0 ? (
          <Alert variant="secondary" className="mt-3">
            No hay medicamentos registrados para este paciente.
          </Alert>
        ) : (
          medicamentosPaciente.map((medicamento) => (
            <Card className="mb-3" key={medicamento.id}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <Card.Title>{medicamento.medication}</Card.Title>

                    <Card.Text>{medicamento.description}</Card.Text>

                    <small className="text-muted">
                      Registrado por: {medicamento.name_doctor}{" "}
                      {medicamento.surname_doctor}
                      <br />
                      Fecha: {medicamento.today} {medicamento.hour}
                    </small>
                  </div>

                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleEliminar(medicamento.id)}
                  >
                    Eliminar
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

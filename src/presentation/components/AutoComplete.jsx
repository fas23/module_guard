import { useEffect, useState } from "react";
import { Form, ListGroup, Card, Button, Alert } from "react-bootstrap";

import data from "../../data/dataBase.js";
import { obtenerFecha, obtenerHora } from "../../utils/hora";

const STORAGE_KEY = "medicalData";

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
  // SIGNOS VITALES Y DIETA
  // ==========================================

  const [controlSignosVitales, setControlSignosVitales] = useState("");

  const [dieta, setDieta] = useState("");

  // ==========================================
  // MEDICAMENTO
  // ==========================================

  const [busqueda, setBusqueda] = useState("");

  const [resultados, setResultados] = useState([]);

  const [medicamentoSeleccionado, setMedicamentoSeleccionado] = useState(null);

  const [descripcion, setDescripcion] = useState("");

  // ==========================================
  // MEDICAMENTOS DISPONIBLES
  // ==========================================

  const medicamentos = medicalData.medications || [];

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

    setMedicamentoSeleccionado(null);

    if (!valor.trim()) {
      setResultados([]);
      return;
    }

    const texto = valor.toLowerCase().trim();

    const filtrados = medicamentos.filter((medicamento) =>
      medicamento.nombre.toLowerCase().includes(texto),
    );

    setResultados(filtrados);
  };

  // ==========================================
  // SELECCIONAR MEDICAMENTO
  // ==========================================

  const handleSelect = (medicamento) => {
    setMedicamentoSeleccionado(medicamento);

    setBusqueda(medicamento.nombre);

    setResultados([]);

    setDescripcion("");
  };

  // ==========================================
  // AGREGAR MEDICAMENTO MANUAL
  // ==========================================

  const handleAgregarManual = () => {
    const nombre = busqueda.trim();

    if (!nombre) return;

    const medicamentoExistente = medicamentos.find(
      (medicamento) =>
        medicamento.nombre.toLowerCase() === nombre.toLowerCase(),
    );

    if (medicamentoExistente) {
      handleSelect(medicamentoExistente);
      return;
    }

    const medicamentoManual = {
      id: crypto.randomUUID(),
      nombre,
      manual: true,
    };

    setMedicamentoSeleccionado(medicamentoManual);

    setBusqueda(nombre);

    setResultados([]);

    setDescripcion("");
  };

  // ==========================================
  // AGREGAR MEDICAMENTO AL PACIENTE
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

    // ========================================
    // VERIFICAR SI YA EXISTE
    // ========================================

    const existe = medicalData.medicationsList.some(
      (item) =>
        item.idPaciente === idPaciente &&
        item.medicationId === medicamentoSeleccionado.id,
    );

    if (existe) {
      alert("Este medicamento ya está registrado para este paciente.");

      return;
    }

    // ========================================
    // BUSCAR DOCTOR
    // ========================================

    const doctor = medicalData.doctors.find((item) => item.id === idDoctor);

    // ========================================
    // CREAR REGISTRO
    // ========================================

    const nuevoMedicamento = {
      id: crypto.randomUUID(),

      idPaciente,

      idDoctor,

      name_doctor: doctor?.first_name || "",

      surname_doctor: doctor?.last_name || "",

      medicationId: medicamentoSeleccionado.id,

      medication: medicamentoSeleccionado.nombre,

      description: descripcion.trim(),

      // NUEVOS CAMPOS
      controlSignosVitales: controlSignosVitales.trim(),

      dieta: dieta.trim(),

      today: obtenerFecha(),

      hour: obtenerHora(),
    };

    // ========================================
    // GUARDAR EN medicationsList
    // ========================================

    setMedicalData((prev) => ({
      ...prev,

      medicationsList: [...prev.medicationsList, nuevoMedicamento],

      // Si el medicamento es manual,
      // también lo agregamos al catálogo
      ...(medicamentoSeleccionado.manual
        ? {
            medications: [...(prev.medications || []), medicamentoSeleccionado],
          }
        : {}),
    }));

    // ========================================
    // LIMPIAR FORMULARIO
    // ========================================

    setBusqueda("");

    setResultados([]);

    setMedicamentoSeleccionado(null);

    setDescripcion("");

    setControlSignosVitales("");

    setDieta("");
  };

  // ==========================================
  // MEDICAMENTOS DEL PACIENTE
  // ==========================================

  const medicamentosPaciente = medicalData.medicationsList.filter(
    (item) => item.idPaciente == idPaciente,
  );

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="container py-4">
      <h2 className="mb-4">Medicamentos del paciente</h2>

      {/* ====================================== */}
      {/* CONTROL DE SIGNOS VITALES */}
      {/* ====================================== */}

      <Form.Group className="mb-3">
        <Form.Label>Control de Signos Vitales</Form.Label>

        <Form.Control
          type="text"
          placeholder="Ingrese control de signos vitales..."
          value={controlSignosVitales}
          onChange={(e) => setControlSignosVitales(e.target.value)}
        />
      </Form.Group>

      {/* ====================================== */}
      {/* DIETA */}
      {/* ====================================== */}

      <Form.Group className="mb-4">
        <Form.Label>Dieta</Form.Label>

        <Form.Control
          as="textarea"
          rows={5}
          placeholder="Ingrese la dieta..."
          value={dieta}
          onChange={(e) => setDieta(e.target.value)}
        />
      </Form.Group>

      {/* ====================================== */}
      {/* BUSCADOR */}
      {/* ====================================== */}

      <div className="position-relative" style={{ maxWidth: "700px" }}>
        <Form.Label>Medicamento</Form.Label>

        <Form.Control
          type="text"
          placeholder="Buscar medicamento..."
          value={busqueda}
          onChange={handleSearch}
        />

        {/* AUTOCOMPLETE */}

        {busqueda.trim() !== "" && (
          <ListGroup
            className="position-absolute w-100"
            style={{
              zIndex: 1000,
            }}
          >
            {resultados.length > 0 ? (
              resultados.map((medicamento) => (
                <ListGroup.Item
                  key={medicamento.id}
                  action
                  onClick={() => handleSelect(medicamento)}
                >
                  {medicamento.nombre}
                </ListGroup.Item>
              ))
            ) : (
              <ListGroup.Item
                action
                variant="success"
                onClick={handleAgregarManual}
              >
                + Agregar "{busqueda}" manualmente
              </ListGroup.Item>
            )}
          </ListGroup>
        )}
      </div>

      {/* ====================================== */}
      {/* DESCRIPCIÓN DEL MEDICAMENTO */}
      {/* ====================================== */}

      {medicamentoSeleccionado && (
        <Card className="mt-3" style={{ maxWidth: "700px" }}>
          <Card.Body>
            <Card.Title>{medicamentoSeleccionado.nombre}</Card.Title>

            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>

              <Form.Control
                as="textarea"
                rows={3}
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

      {/* ====================================== */}
      {/* MEDICAMENTOS REGISTRADOS */}
      {/* ====================================== */}

      <div className="mt-4">
        <h4 className="mb-3">Medicamentos registrados</h4>

        {medicamentosPaciente.length === 0 ? (
          <Alert variant="secondary" className="mt-3">
            No hay medicamentos registrados para este paciente.
          </Alert>
        ) : (
          <div
            className="border rounded"
            style={{
              maxWidth: "1000px",
            }}
          >
            {medicamentosPaciente.map((medicamento, index) => (
              <div
                key={medicamento.id}
                className={`px-3 py-2 ${
                  index !== medicamentosPaciente.length - 1
                    ? "border-bottom"
                    : ""
                }`}
              >
                {/* SIGNOS VITALES */}

                {medicamento.controlSignosVitales && (
                  <div>
                    <small className="text-muted">
                      Signos vitales: {medicamento.controlSignosVitales}
                    </small>
                  </div>
                )}

                {/* DIETA */}

                {medicamento.dieta && (
                  <div>
                    <small className="text-muted">
                      Dieta: {medicamento.dieta}
                    </small>
                  </div>
                )}

                {/* MEDICAMENTO + DESCRIPCIÓN */}

                <div className="d-flex align-items-center">
                  <strong
                    className="me-2"
                    style={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    {medicamento.medication}
                  </strong>

                  <span className="text-muted me-2">—</span>

                  <span className="text-muted">{medicamento.description}</span>
                </div>

                {/* INFORMACIÓN */}

                <small className="text-muted">
                  Registrado por: {medicamento.name_doctor}{" "}
                  {medicamento.surname_doctor}
                  {" | "}
                  {medicamento.today} {medicamento.hour}
                </small>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

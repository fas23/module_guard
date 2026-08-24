import React, { useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link } from "react-router";
import listPatient from "../../data/dataBase.js";
import { useInterconsultas } from "../../context/InterconsultaContext.jsx";

const Patient_list = () => {
  const [data, setData] = useState([]);
  const [text, setText] = useState("");
  const { interconsultas } = useInterconsultas();

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const findPatient = listPatient.patients.filter((patient) =>
    patient.last_name.toLowerCase().includes(text.toLowerCase()),
  );

  return (
    <Row>
      <Col xs={12}>
        <h2 className="text-center">Listado de Pacientes</h2>

        <Form className="m-4">
          <Form.Control
            type="text"
            placeholder="Buscar"
            value={text}
            onChange={handleChange}
          />
        </Form>

        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha de Ingreso</th>
                <th>Paciente</th>
                <th>Motivo</th>
                <th>Interconsultas</th>
              </tr>
            </thead>

            <tbody>
              {findPatient.length !== 0 ? (
                findPatient.map((patient) => (
                  <tr key={patient.id}>
                    <td className="text-nowrap">{patient.id}</td>

                    <td className="text-nowrap">{patient.fecha}</td>

                    <td className="text-nowrap">
                      <Link to={`/paciente/${patient.id}`}>
                        {patient.last_name}
                      </Link>
                    </td>

                    <td>{patient.motivo}</td>

                    <td>
                      {Object.values(interconsultas[patient.id] || {}).some(
                        Boolean,
                      ) ? (
                        <>
                          {interconsultas[patient.id]?.cm && (
                            <span className="badge bg-primary me-1 mb-1">
                              Clínica Médica
                            </span>
                          )}

                          {interconsultas[patient.id]?.cx && (
                            <span className="badge bg-success me-1 mb-1">
                              Cirugía
                            </span>
                          )}

                          {interconsultas[patient.id]?.uro && (
                            <span className="badge bg-success me-1 mb-1">
                              Urología
                            </span>
                          )}

                          {interconsultas[patient.id]?.cardio && (
                            <span className="badge bg-danger me-1 mb-1">
                              Cardiología
                            </span>
                          )}

                          {interconsultas[patient.id]?.nefro && (
                            <span className="badge bg-warning text-dark me-1 mb-1">
                              Nefrología
                            </span>
                          )}

                          {interconsultas[patient.id]?.psico && (
                            <span className="badge bg-info me-1 mb-1">
                              Psicología
                            </span>
                          )}

                          {interconsultas[patient.id]?.psiquia && (
                            <span className="badge bg-info me-1 mb-1">
                              Psiquiatría
                            </span>
                          )}

                          {interconsultas[patient.id]?.cxTx && (
                            <span className="badge bg-secondary me-1 mb-1">
                              Cirugía Torax
                            </span>
                          )}

                          {interconsultas[patient.id]?.cxVr && (
                            <span className="badge bg-primary me-1 mb-1">
                              Cirugía Vascular
                            </span>
                          )}

                          {interconsultas[patient.id]?.uti && (
                            <span className="badge bg-info me-1 mb-1">UTI</span>
                          )}

                          {interconsultas[patient.id]?.mf && (
                            <span className="badge bg-light text-dark me-1 mb-1">
                              Maxilo Facial
                            </span>
                          )}

                          {interconsultas[patient.id]?.ot && (
                            <span className="badge bg-dark me-1 mb-1">
                              Otros
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="text-muted">Sin Interconsultas</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    Registro No Encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Col>
    </Row>
  );
};

export default Patient_list;

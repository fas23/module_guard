import React, { useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link } from "react-router";
import listPatient from "../../data/dataBase.js";

const Patient_list = () => {
  const [data, setData] = useState([]);
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const findPatient = listPatient.patients.filter((patient) =>
    patient.last_name.toLowerCase().includes(text.toLowerCase()),
  );

  return (
    <Row>
      <Col>
        <h2 className="text-center">Listado de Pacientes</h2>
        <Form className="m-4">
          <Form.Control
            type="text"
            placeholder="Buscar"
            value={text}
            onChange={handleChange}
          />
        </Form>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>Fecha de Ingreso</th>
              <th>Paciente</th>
              <th>Motivo Consulta</th>
            </tr>
          </thead>
          <tbody>
            {findPatient.length != 0 ? (
              findPatient.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.id}</td>
                  <td>{patient.fecha}</td>
                  <td>
                    <Link to={`/paciente/${patient.id}`}>
                      {patient.last_name}
                    </Link>
                  </td>
                  <td>{patient.motivo}</td>
                </tr>
              ))
            ) : (
              <Form.Label>Registro No Encontrado</Form.Label>
            )}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default Patient_list;

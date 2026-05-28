import React from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import { useParams } from "react-router";
import listPatient from "../../data/dataBase.js";
import TabsPatient from "../components/TabsPatient.jsx";

const Patient = () => {
  const { id } = useParams();

  var findPatient = listPatient.patients.filter((patient) => patient.id == id);

  return (
    <Row>
      <Row>
        <h2 className="text-center">Datos de Paciente</h2>
        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="surname">
                <Form.Label>Apellido:</Form.Label>
                <Form.Control
                  type="surname"
                  placeholder={findPatient[0].last_name}
                  disabled
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Nombre:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={findPatient[0].first_name}
                  disabled
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="date">
                <Form.Label>Fecha Ingreso:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={findPatient[0].fecha}
                  disabled
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Consulta:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={findPatient[0].motivo}
                  disabled
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Row>

      <TabsPatient listPatient={listPatient} idPaciente={id} />
    </Row>
  );
};

export default Patient;

import React from "react";
import { Form, Row, Col, Tab, Tabs, Button } from "react-bootstrap";
import FormMP from "./FormMP";

const TabsPatient = ({ listPatient, idPaciente }) => {
  const list = listPatient.doctors;
  const anamList = listPatient.anamnesisList;

  return (
    <Col>
      <Tabs
        defaultActiveKey="home"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="home" title="INTERCONSULTAS">
          <Form>
            <Row>
              <Col>
                <Form.Check type="checkbox" id="cm" label="Clinica Medica" />
                <Form.Check type="checkbox" id="cx" label="Cirugía" />
                <Form.Check type="checkbox" id="uro" label="Urología" />
                <Form.Check type="checkbox" id="cardio" label="Cardiología" />
                <Form.Check type="checkbox" id="nefro" label="Nefrología" />
                <Form.Check type="checkbox" id="psico" label="Psicología" />
              </Col>

              <Col>
                <Form.Check type="checkbox" id="psiquia" label="Psiquiatría" />
                <Form.Check type="checkbox" id="cxTx" label="Cirugía Torax" />
                <Form.Check
                  type="checkbox"
                  id="cxVr"
                  label="Cirugía Vascular"
                />
                <Form.Check type="checkbox" id="uti" label="UTI" />
                <Form.Check type="checkbox" id="mf" label="Maxilo Facial" />
                <Form.Check type="checkbox" id="ot" label="Otros" />
              </Col>
            </Row>
          </Form>
        </Tab>

        {/* tab ANAMNESIS */}

        <Tab eventKey="profile" title="ANAMNESIS">
          <Form>
            <Form.Group className="mb-3" controlId="formAnamnesis">
              <Row>
                <Col>
                  {/* <Form.Group>
                    <Form.Label>Fecha/Hora: {today + " " + hour}</Form.Label>
                  </Form.Group> */}
                  <Form.Group>
                    <Form.Label>Mc:</Form.Label>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>HEA:</Form.Label>
                  </Form.Group>
                </Col>
              </Row>
            </Form.Group>
          </Form>

          {/* formulario ingreso mp doctor */}

          <FormMP
            listDoctors={list}
            idPaciente={idPaciente}
            anamList={anamList}
            profession="doctor"
          />
        </Tab>

        {/* TAB ENFERMERIA*/}

        <Tab eventKey="contact" title="ENFERMERIA">
          {/* formulario ingreso mp enfermero */}
          <FormMP
            listDoctors={list}
            idPaciente={idPaciente}
            anamList={anamList}
            profession="enfermero"
          />
        </Tab>
      </Tabs>
    </Col>
  );
};

export default TabsPatient;

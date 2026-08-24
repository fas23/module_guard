import React, { useRef } from "react";
import { Form, Row, Col, Tab, Tabs, Button } from "react-bootstrap";
import FormMP from "./FormMP";
import { useReactToPrint } from "react-to-print";
import { useInterconsultas } from "../../context/InterconsultaContext.jsx";

const TabsPatient = ({ listPatient, idPaciente }) => {
  const list = listPatient.doctors;
  const anamList = listPatient.anamnesisList;
  const printRef = useRef();

  const { interconsultas, toggleInterconsulta } = useInterconsultas();

  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });

  return (
    <Col>
      <Button variant="primary" className="mb-4" onClick={handlePrint}>
        Imprimir
      </Button>
      <Tabs
        defaultActiveKey="home"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="home" title="INTERCONSULTAS">
          <Form>
            <Row>
              <Col>
                <Form.Check
                  type="checkbox"
                  id="cm"
                  label="Clinica Medica"
                  checked={interconsultas[idPaciente]?.cm || false}
                  onChange={() => toggleInterconsulta(idPaciente, "cm")}
                />
                <Form.Check
                  type="checkbox"
                  id="cx"
                  label="Cirugía"
                  checked={interconsultas[idPaciente]?.cx || false}
                  onChange={() => toggleInterconsulta(idPaciente, "cx")}
                />
                <Form.Check
                  type="checkbox"
                  id="uro"
                  label="Urología"
                  checked={interconsultas[idPaciente]?.uro || false}
                  onChange={() => toggleInterconsulta(idPaciente, "uro")}
                />
                <Form.Check
                  type="checkbox"
                  id="cardio"
                  label="Cardiología"
                  checked={interconsultas[idPaciente]?.cardio || false}
                  onChange={() => toggleInterconsulta(idPaciente, "cardio")}
                />
                <Form.Check
                  type="checkbox"
                  id="nefro"
                  label="Nefrología"
                  checked={interconsultas[idPaciente]?.nefro || false}
                  onChange={() => toggleInterconsulta(idPaciente, "nefro")}
                />
                <Form.Check
                  type="checkbox"
                  id="psico"
                  label="Psicología"
                  checked={interconsultas[idPaciente]?.psico || false}
                  onChange={() => toggleInterconsulta(idPaciente, "psico")}
                />
              </Col>

              <Col>
                <Form.Check
                  type="checkbox"
                  id="psiquia"
                  label="Psiquiatría"
                  checked={interconsultas[idPaciente]?.psiquia || false}
                  onChange={() => toggleInterconsulta(idPaciente, "psiquia")}
                />

                <Form.Check
                  type="checkbox"
                  id="cxTx"
                  label="Cirugía Torax"
                  checked={interconsultas[idPaciente]?.cxTx || false}
                  onChange={() => toggleInterconsulta(idPaciente, "cxTx")}
                />

                <Form.Check
                  type="checkbox"
                  id="cxVr"
                  label="Cirugía Vascular"
                  checked={interconsultas[idPaciente]?.cxVr || false}
                  onChange={() => toggleInterconsulta(idPaciente, "cxVr")}
                />

                <Form.Check
                  type="checkbox"
                  id="uti"
                  label="UTI"
                  checked={interconsultas[idPaciente]?.uti || false}
                  onChange={() => toggleInterconsulta(idPaciente, "uti")}
                />

                <Form.Check
                  type="checkbox"
                  id="mf"
                  label="Maxilo Facial"
                  checked={interconsultas[idPaciente]?.mf || false}
                  onChange={() => toggleInterconsulta(idPaciente, "mf")}
                />

                <Form.Check
                  type="checkbox"
                  id="ot"
                  label="Otros"
                  checked={interconsultas[idPaciente]?.ot || false}
                  onChange={() => toggleInterconsulta(idPaciente, "ot")}
                />
              </Col>
            </Row>
          </Form>
        </Tab>

        {/* tab ANAMNESIS */}

        <Tab eventKey="profile" title="ANAMNESIS">
          {/* <Form>
            <Form.Group className="mb-3" controlId="formAnamnesis">
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Mc:</Form.Label>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>HEA:</Form.Label>
                  </Form.Group>
                </Col>
              </Row>
            </Form.Group>
          </Form> */}

          {/* formulario ingreso mp doctor */}

          <FormMP
            listDoctors={list}
            idPaciente={idPaciente}
            anamList={anamList}
            profession="doctor"
            printRef={printRef}
          />
        </Tab>

        {/* TAB ENFERMERIA*/}

        <Tab eventKey="enf" title="ENFERMERIA">
          {/* formulario ingreso mp enfermero */}
          <FormMP
            listDoctors={list}
            idPaciente={idPaciente}
            anamList={anamList}
            profession="enfermero"
            printRef={printRef}
          />
        </Tab>
        <Tab eventKey="trat" title="TRATAMIENTO">
          {/* formulario ingreso mp enfermero */}
        </Tab>
      </Tabs>
    </Col>
  );
};

export default TabsPatient;

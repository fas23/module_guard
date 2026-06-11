import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import RegistroHospitalario from "../pages/RegistroHospitalario";

const FormAnamnesis = ({
  doctor,
  listAnamnesis,
  idPac,
  profession,
  printRef,
}) => {
  return (
    <>
      <div style={{ display: "none" }}>
        <div ref={printRef}>
          <RegistroHospitalario listAnamnesis={listAnamnesis} idPac={idPac} />
        </div>
      </div>
      <Accordion defaultActiveKey="0" className="mb-4">
        <Accordion.Item eventKey="0">
          <Accordion.Header>FORMULARIO</Accordion.Header>
          <Accordion.Body>
            {listAnamnesis.length !== 0 &&
              listAnamnesis
                .filter(
                  (anam) =>
                    anam.idPaciente == idPac && anam.profession === profession,
                )
                .map((anam, index) => (
                  <React.Fragment key={`${anam.id}-${index}`}>
                    <Row>
                      <Form.Label>
                        Fecha : {`${anam.today} ${anam.hour}`}
                        <br />
                        {anam.profession === "doctor"
                          ? `Doctor/a : ${anam.name_doctor} ${anam.surname_doctor}`
                          : `Lic/a : ${anam.name_doctor} ${anam.surname_doctor}`}
                        {/* Doctor/a : {anam.name_doctor} {anam.surname_doctor} */}
                        <br />
                        Especialidad : {anam.speciality}
                      </Form.Label>
                      <Form.Label>
                        {anam.profession === "doctor"
                          ? `Anamnesis : ${anam.ananmnesis}`
                          : `Tratamiento : ${anam.ananmnesis}`}
                        {/* Anamnesis : {anam.ananmnesis} */}
                      </Form.Label>
                    </Row>
                    <hr />
                  </React.Fragment>
                ))}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default FormAnamnesis;

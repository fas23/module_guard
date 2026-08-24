import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Col, Row, Form, Button } from "react-bootstrap";
import FormAnamnesis from "./FormAnamnesis";
import { obtenerFecha, obtenerHora } from "../../utils/hora";

const FormMP = ({
  listDoctors,
  idPaciente,
  anamList,
  profession,
  printRef,
}) => {
  const [texto, setTexto] = useState("");
  const [inputAreaText, setInputAreaText] = useState("");
  //const [listAnamnesis, setListAnamnesis] = useState(anamList);

  const [listAnamnesis, setListAnamnesis] = useState(() => {
    const saved = localStorage.getItem("listAnamn");

    // si ya existe en localStorage usa eso
    if (saved) {
      return JSON.parse(saved);
    }

    return anamList;
  });

  useEffect(() => {
    localStorage.setItem("listAnamn", JSON.stringify(listAnamnesis));
  }, [listAnamnesis]);

  const [close, setClose] = useState(false);
  const [doctor, setDoctor] = useState({
    id: "",
    name: "",
    surname: "",
    mp: "",
    profession: "",
    speciality: "",
  });
  const enableButton = texto.trim() !== "";
  const enableButtonArea = inputAreaText.trim() !== "";

  const handleSumit = (e) => {
    e.preventDefault();
    setTexto(texto);
    const findDoctor = listDoctors.filter((doctor) => doctor.mp == texto);
    setDoctor({
      id: findDoctor[0].id,
      name: findDoctor[0].first_name,
      surname: findDoctor[0].last_name,
      mp: findDoctor[0].mp,
      profession: findDoctor[0].profession,
      speciality: findDoctor[0].speciality,
    });
    setTexto("");
    setClose(!close);
  };
  const tam = listAnamnesis.filter(
    (anam) => anam.idPaciente == idPaciente,
  ).length;

  const handleAnamnesis = (e) => {
    e.preventDefault();
    //fecha y hora
    const hour = obtenerHora();
    const today = obtenerFecha();

    const nextId = listAnamnesis.length + 1;

    const ananmnesis = {
      id: nextId,
      idPaciente: idPaciente,
      idDoctor: doctor.id,
      name_doctor: doctor.name,
      surname_doctor: doctor.surname,
      profession: doctor.profession,
      speciality: doctor.speciality,
      ananmnesis: inputAreaText,
      today: today,
      hour: hour,
    };

    setListAnamnesis([...listAnamnesis, ananmnesis]);
    toast.success("Agregado Correctamente.");
    setInputAreaText("");
    setDoctor({});
    setClose(!close);
  };

  return (
    <>
      {tam == 0 && (
        <Form>
          <Row>
            {/* Doctor */}
            <Col xs={12} md={8}>
              <Form.Group className="mb-3" controlId="doctor">
                <Form.Label>Doctor:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese Nombre y Apellido"
                />
              </Form.Group>
            </Col>

            {/* Matrícula */}
            <Col xs={12} md={4}>
              <Form.Group className="mb-3" controlId="matricula">
                <Form.Label>Matrícula Profesional:</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ingrese su Matrícula Profesional"
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Motivo */}
          <Row>
            <Col xs={12}>
              <Form.Group className="mb-3" controlId="motivo">
                <Form.Label>Motivo de Consulta:</Form.Label>
                <Form.Control as="textarea" rows={5} />
              </Form.Group>
            </Col>
          </Row>

          {/* HEA */}
          <Row>
            <Col xs={12}>
              <Form.Group className="mb-3" controlId="hea">
                <Form.Label>HEA:</Form.Label>
                <Form.Control as="textarea" rows={5} />
              </Form.Group>
            </Col>
          </Row>

          <Button variant="primary" type="submit" className="mt-3">
            Enviar
          </Button>
        </Form>
      )}
      <Form onSubmit={handleSumit}>
        <Form.Group as={Row} className="mb-3" controlId="formMP">
          <Form.Label column sm={3}>
            Ingrese Matricula Profesional;
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              type="text"
              placeholder="MP"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
            />
          </Col>
          <Col>
            <Button variant="primary" type="submit" disabled={!enableButton}>
              Agregar
            </Button>
          </Col>
        </Form.Group>
      </Form>

      <hr />

      {/* FORMULARIO DOCTOR */}
      {profession === "doctor" && doctor.profession === "doctor" && close && (
        <div className="mt-4">
          <Row>
            {/* <Form.Group>
              <Form.Label>Fecha/Hora:{today + " " + hour}</Form.Label>
            </Form.Group> */}
            <Form.Group>
              <Form.Label>
                Dr/a: {doctor.surname + " " + doctor.name}
              </Form.Label>
            </Form.Group>
            <Form.Group>
              <Form.Label>MP: {doctor.mp}</Form.Label>
            </Form.Group>
            <Form.Group>
              <Form.Label>Especialidad: {doctor.speciality}</Form.Label>
            </Form.Group>
          </Row>

          <Form onSubmit={handleAnamnesis}>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Ingrese Anamnesis:</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={inputAreaText}
                onChange={(e) => setInputAreaText(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="mb-4"
              disabled={!enableButtonArea}
            >
              Guardar
            </Button>
          </Form>
        </div>
      )}

      {/* FORMULARIO ENFERMERIA  */}

      {profession === "enfermero" &&
        doctor.profession == "enfermero" &&
        close && (
          <div className="mt-4">
            <Row>
              {/* <Form.Group>
              <Form.Label>Fecha/Hora:{today + " " + hour}</Form.Label>
            </Form.Group> */}
              <Form.Group>
                <Form.Label>
                  Lic/a: {doctor.surname + " " + doctor.name}
                </Form.Label>
              </Form.Group>
              <Form.Group>
                <Form.Label>MP: {doctor.mp}</Form.Label>
              </Form.Group>
              <Form.Group>
                <Form.Label>Especialidad: {doctor.speciality}</Form.Label>
              </Form.Group>
            </Row>

            {/* formulario tratamiento */}
            <Form onSubmit={handleAnamnesis}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Tratamiento:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  value={inputAreaText}
                  onChange={(e) => setInputAreaText(e.target.value)}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="mb-4"
                disabled={!enableButtonArea}
              >
                Guardar
              </Button>
            </Form>
          </div>
        )}

      <FormAnamnesis
        listAnamnesis={listAnamnesis}
        doctor={doctor}
        idPac={idPaciente}
        profession={profession}
        printRef={printRef}
      />
    </>
  );
};

export default FormMP;

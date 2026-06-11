import React from "react";

const RegistroHospitalario = ({ listAnamnesis, idPac }) => {
  const medicos = listAnamnesis.filter(
    (a) => a.idPaciente == idPac && a.profession === "doctor",
  );

  const enfermeria = listAnamnesis.filter(
    (a) => a.idPaciente == idPac && a.profession === "enfermero",
  );

  return (
    <>
      {/* PAGINA 1 */}
      <div className="page">
        <table width="100%" border="1">
          <thead>
            <tr>
              <th colSpan="4">
                <div className="encabezado">
                  <h2>HOSPITAL XXXXX</h2>
                  <p>Historia Clínica Nº {idPac}</p>
                  <h3>EVOLUCIÓN MÉDICA</h3>
                </div>
              </th>
            </tr>
            <tr>
              <th>Fecha/Hora</th>
              <th>Profesional</th>
              <th>Especialidad</th>
              <th>Anamnesis</th>
            </tr>
          </thead>

          <tbody>
            {medicos.map((item) => (
              <tr key={item.id}>
                <td>
                  {item.today}
                  <br />
                  {item.hour}
                </td>

                <td>
                  Dr/a. {item.surname_doctor} {item.name_doctor}
                </td>

                <td>{item.speciality}</td>

                <td>{item.ananmnesis}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* SALTO DE PAGINA */}
      <div className="page-break" />

      {/* PAGINA 2 */}
      <div className="page">
        <table width="100%" border="1">
          <thead>
            <tr>
              <th colSpan="4">
                <div className="encabezado">
                  <h2>HOSPITAL XXXXX</h2>
                  <p>Historia Clínica Nº {idPac}</p>
                  <h3>REGISTRO ENFERMERIA</h3>
                </div>
              </th>
            </tr>
            <tr>
              <th>Fecha/Hora</th>
              <th>Profesional</th>
              <th>Especialidad</th>
              <th>Tratamiento</th>
            </tr>
          </thead>

          <tbody>
            {enfermeria.map((item) => (
              <tr key={item.id}>
                <td>
                  {item.today}
                  <br />
                  {item.hour}
                </td>

                <td>
                  Lic/a. {item.surname_doctor} {item.name_doctor}
                </td>

                <td>{item.speciality}</td>

                <td>{item.ananmnesis}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RegistroHospitalario;

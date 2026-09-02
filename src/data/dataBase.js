import { obtenerFecha, obtenerHora } from "../utils/hora";

const today = obtenerFecha();
const hour = obtenerHora();

const data = {
  patients: [
    {
      id: 1,
      first_name: "Lizzie",
      last_name: "Gethen",
      email: "lgethen0@amazon.co.jp",
      gender: "Female",
      fecha: today,
      motivo: "Consulta Medica",
    },
    {
      id: 2,
      first_name: "Bernard",
      last_name: "Jancik",
      email: "bjancik1@nhs.uk",
      gender: "Male",
      fecha: today,
      motivo: "Consulta Medica",
    },
    {
      id: 3,
      first_name: "Traci",
      last_name: "Dregan",
      email: "tdregan2@about.me",
      gender: "Female",
      fecha: today,
      motivo: "Consulta Medica",
    },
    {
      id: 4,
      first_name: "Elsa",
      last_name: "Weiss",
      email: "eweiss3@europa.eu",
      gender: "Female",
      fecha: today,
      motivo: "Consulta Medica",
    },
    {
      id: 5,
      first_name: "Reggy",
      last_name: "Hairyes",
      email: "rhairyes4@usda.gov",
      gender: "Genderfluid",
      fecha: today,
      motivo: "Consulta Medica",
    },
    {
      id: 6,
      first_name: "Adriena",
      last_name: "Farman",
      email: "afarman5@google.co.jp",
      gender: "Female",
      fecha: today,
      motivo: "Consulta Medica",
    },
    {
      id: 7,
      first_name: "Onofredo",
      last_name: "Starsmore",
      email: "ostarsmore6@time.com",
      gender: "Male",
      fecha: today,
      motivo: "Consulta Medica",
    },
    {
      id: 8,
      first_name: "Antin",
      last_name: "Lockyear",
      email: "alockyear7@businesswire.com",
      gender: "Male",
      fecha: today,
      motivo: "Consulta Medica",
    },
    {
      id: 9,
      first_name: "Lloyd",
      last_name: "Etherson",
      email: "letherson8@dagondesign.com",
      gender: "Male",
      fecha: today,
      motivo: "Consulta Medica",
    },
    {
      id: 10,
      first_name: "Laney",
      last_name: "Sneaker",
      email: "lsneaker9@dedecms.com",
      gender: "Female",
      fecha: today,
      motivo: "Consulta Medica",
    },
  ],
  doctors: [
    {
      id: 1,
      first_name: "Roberto",
      last_name: "Arias",
      mp: 1234,
      profession: "doctor",
      speciality: "Cirugía General",
      state: true,
    },
    {
      id: 2,
      first_name: "Eduardo",
      last_name: "Vega",
      mp: 2345,
      profession: "doctor",
      speciality: "Cirugía General",
      state: true,
    },
    {
      id: 3,
      first_name: "Maria",
      last_name: "Valenzuela",
      mp: 3456,
      profession: "enfermero",
      speciality: "Enfermera Profesional",
      state: true,
    },
  ],
  anamnesisList: [
    {
      id: 1,
      idPaciente: 1,
      idDoctor: 1,
      name_doctor: "Roberto",
      surname_doctor: "Arias",
      profession: "doctor",
      speciality: "Cirugía General",
      ananmnesis:
        "Paciente con dolor abdominal intenso, se recomienda realizar estudios de imagen y laboratorio para descartar apendicitis.",
      today: today,
      hour: hour,
      motivo: "dolor Abdominal",
    },
  ],
  medicationsList: [
    {
      id: 1,
      idPaciente: 1,
      idDoctor: 1,
      name_doctor: "Roberto",
      surname_doctor: "Arias",
      medication: "Propofol",
      description: "Anestésico utilizado durante el procedimiento.",
      today: today,
      hour: hour,
    },
  ],
  medications: [
    {
      id: 1,
      nombre: "Propofol",
    },
    {
      id: 2,
      nombre: "Midazolam",
    },
    {
      id: 3,
      nombre: "Fentanilo",
    },
    {
      id: 4,
      nombre: "Morfina",
    },
    {
      id: 5,
      nombre: "Ketamina",
    },
    {
      id: 6,
      nombre: "Sevoflurano",
    },
    {
      id: 7,
      nombre: "Rocuronio",
    },
    {
      id: 8,
      nombre: "Succinilcolina",
    },
    {
      id: 9,
      nombre: "Bupivacaína",
    },
    {
      id: 10,
      nombre: "Lidocaína",
    },
    {
      id: 11,
      nombre: "Paracetamol",
    },
    {
      id: 12,
      nombre: "Ketorolaco",
    },
    {
      id: 13,
      nombre: "Metamizol",
    },
    {
      id: 14,
      nombre: "Ondansetrón",
    },
    {
      id: 15,
      nombre: "Metoclopramida",
    },
    {
      id: 16,
      nombre: "Cefazolina",
    },
    {
      id: 17,
      nombre: "Metronidazol",
    },
    {
      id: 18,
      nombre: "Ceftriaxona",
    },
    {
      id: 19,
      nombre: "Amoxicilina/ácido clavulánico",
    },
    {
      id: 20,
      nombre: "Piperacilina/tazobactam",
    },
    {
      id: 21,
      nombre: "Heparina",
    },
    {
      id: 22,
      nombre: "Enoxaparina",
    },
    {
      id: 23,
      nombre: "Adrenalina",
    },
    {
      id: 24,
      nombre: "Noradrenalina",
    },
    {
      id: 25,
      nombre: "Atropina",
    },
    {
      id: 26,
      nombre: "Efedrina",
    },
  ],
};

export default data;

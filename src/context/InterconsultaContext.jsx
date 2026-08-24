import { createContext, useContext, useState } from "react";

const InterconsultaContext = createContext();

export function InterconsultaProvider({ children }) {
  const [interconsultas, setInterconsultas] = useState({});

  const toggleInterconsulta = (idPaciente, tipo) => {
    setInterconsultas((prev) => ({
      ...prev,
      [idPaciente]: {
        ...prev[idPaciente],
        [tipo]: !prev[idPaciente]?.[tipo],
      },
    }));
  };

  return (
    <InterconsultaContext.Provider
      value={{
        interconsultas,
        toggleInterconsulta,
      }}
    >
      {children}
    </InterconsultaContext.Provider>
  );
}

export function useInterconsultas() {
  return useContext(InterconsultaContext);
}

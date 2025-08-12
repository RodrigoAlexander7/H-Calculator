import type { Patient } from '@/features/patient/dto/patient.dto'; // ajusta el path
import dayjs from "dayjs";

export const getPatientInfo = (patient: Patient) => {
  if (!patient) return "No hay datos del paciente";

  const edad = patient.birthDate
    ? Number(dayjs().diff(dayjs(patient.birthDate), "year", true)).toFixed(1)
    : "Desconocida";

  const genero = patient.gender
    ? patient.gender === 'M'
      ? 'Masculino'
      : 'Femenino'
    : "No especificado";

  const adicional = patient.femaleAditional
    ? patient.femaleAditional === 'G'
      ? "Gestante"
      : "Puerperio"
    : "N/A";

  const trimestre = patient.gestationTime
    ? `${patient.gestationTime}° trimestre`
    : "N/A";

  return `
   Número de DNI: ${patient.idDocument}
   Edad: ${edad} años
   Género: ${genero}
   Condición adicional: ${adicional}
   Tiempo de gestación: ${trimestre}
   Peso: ${patient.weight ?? "N/A"} kg
   Hb Observada: ${patient.hbObserved ?? "N/A"} g/dL
   Hb Fijada: ${patient.hbFixed ?? "N/A"} g/dL
   Diagnóstico: ${patient.diagnostic ?? "N/A"}
`.trim();
};

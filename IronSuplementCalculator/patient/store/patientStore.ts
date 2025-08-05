import dayjs from 'dayjs'
import { create } from 'zustand'
import { Patient, patientSchema } from '../dto/patient.dto'

const initialPatientData:Patient = {
   name: 'Not asigned name',
   lastname: 'Not asigned lastname',
   birthDate: dayjs().toISOString(),
   gender: 'M',
   femaleState: null,
   gestationTime: null,
   hbObserved: 0,
   hbFixed: 0,
   diagnostic: '',
   location: {
      department: 'notAsignedYet',
      province: 'notAsignedYet',
      district: 'notAsignedYet',
      town: 'notAsignedYet',
   }
}

type PatientStore = {
   patient: Patient;
   setPatient: (dataDto:Patient)=> void;
   isValid: ()=> boolean;
   clear: ()=> void;
}

const usePatientStore = create<PatientStore>((set, get)=> ({
   patient: initialPatientData,
   setPatient: (patientDto:Patient) => set({patient:patientDto}),
   isValid: () => patientSchema.safeParse(get().patient).success,
   clear: () => set({patient: initialPatientData})
}))
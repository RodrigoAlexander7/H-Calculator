import { Location } from '@/features/location/dto/location.dto'
import dayjs from 'dayjs'
import { create } from 'zustand'
import { Patient, patientSchema } from '../dto/patient.dto'

const initialPatientData:Patient = {
   idDocument: 'Not asigned name',
   birthDate: dayjs().toISOString(),
   gender: 'M',
   weight: 0,
   femaleAditional: null,
   gestationTime: null,
   hbObserved: 0,
   hbFixed: 0,
   diagnostic: '',
   location: {
      department: 'notAsignedYet',
      province: 'notAsignedYet',
      district: 'notAsignedYet',
      town: 'notAsignedYet',
      adjustHB: 'notAsignedYet',
   }
}

type PatientStore = {
   patient: Patient;
   setPatient: (dataDto:Patient)=> void;
   setPatientLocation: (patientLocation:Location)=> void;
   setHbObserved: (hb:number)=> void;
   setHbFixed: (hbFixed:number) => void;
   setDiagnostic: (patientDiagnostic: string) => void; 
   isValid: ()=> boolean;
   clear: ()=> void;
}

// Creating a global patient to use in other screens
export const usePatientStore = create<PatientStore>((set, get)=> ({
   patient: initialPatientData,
   setPatient: (patientDto:Patient) => set({patient:patientDto}),
   setHbObserved:(hb:number) => {
      set(prev => ({
         patient: {
            ...prev.patient,
            hbObserved:hb
         }
      }))
   },
   setHbFixed:(hb:number) => {
      set(prev => ({
         patient: {
            ...prev.patient,
            hbFixed:hb
         }
      }))
   },
   setDiagnostic:(patientDiagnostic:string) => {
      set(prev => ({
         patient:{
            ...prev.patient,
            diagnostic: patientDiagnostic
         }
      }))
   },

   // function to only edit the location
   setPatientLocation: (patientLocation: Location)=> {
      set(prev => ({
         patient:{
            ...prev.patient,
            location: patientLocation,
         },
      }))
   },
   isValid: () => patientSchema.safeParse(get().patient).success,
   clear: () => set({patient: initialPatientData})
}))
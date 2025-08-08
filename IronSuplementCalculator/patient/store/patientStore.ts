import { Location } from '@/location/dto/location.dto'
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
      adjustHB: 'notAsignedYet',
   }
}

type PatientStore = {
   patient: Patient;
   setPatient: (dataDto:Patient)=> void;
   setPatientLocation: (patientLocation:Location)=> void;
   isValid: ()=> boolean;
   clear: ()=> void;
}

// Creating a global patient to use in other screens
export const usePatientStore = create<PatientStore>((set, get)=> ({
   patient: initialPatientData,
   setPatient: (patientDto:Patient) => set({patient:patientDto}),
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
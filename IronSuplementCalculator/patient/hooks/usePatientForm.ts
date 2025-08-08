import { Patient, patientSchema } from '@/patient/dto/patient.dto';
import dayjs from 'dayjs';
import { useState } from "react";

export const usePatientForm = ()=>{
   const [idDocument, setIdDocument] = useState('')
   const [birthDate, setBirthDate] = useState<dayjs.Dayjs>(dayjs())
   const [gender, setGender] = useState<'M'| 'F'>('M')
   const [femaleAditional, SetFemaleAditional] = useState<'G'|'P'|null>(null)
   const [gestationTime, SetGestationTime] = useState<'1'|'2'|'3'|null>(null)

   const patient:Patient = {
      idDocument,
      birthDate: birthDate.toISOString(),
      gender,
      femaleState: femaleAditional,
      gestationTime,
      hbObserved: 0,
      hbFixed: 0,
      diagnostic: '',
      location: {
         department: 'notAsignedYet',
         province: 'notAsignedYet',
         district: 'notAsignedYet',
         town: 'notAsignedYet',
         adjustHB: 'notAsignedYet'
      }
   }

   const isValid = ():boolean =>{
      const result = patientSchema.safeParse(patient)
      return result.success
   } 

   return {
      idDocument, setIdDocument,
      birthDate, setBirthDate,
      gender, setGender,
      femaleAditional, SetFemaleAditional,
      gestationTime, SetGestationTime,
      patient,
      isValid,
   }
}
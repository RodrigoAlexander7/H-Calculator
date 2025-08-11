import { locationSchema } from '@/features/location/dto/location.dto';
import { z } from 'zod';

const genderSchema =z.enum(['M','F'],'gender are just M or F');
const femaleStateSchema = z.enum(['G','P']).nullable();
const gestationTimeSchema = z.enum(['1','2','3']).nullable(); 

export const patientSchema = z.object({
   idDocument: z.string().min(1,'name can not be null'),
   birthDate: z.string().min(1, 'birthdate can not be null'),
   gender: genderSchema.optional(),
   femaleState : femaleStateSchema.optional().nullable(),
   gestationTime : gestationTimeSchema.optional().nullable(),

   weight: z.number().optional(),
   hbObserved: z.number().optional(),
   hbFixed: z.number().optional(),
   diagnostic: z.string().optional(),
   location : locationSchema

})

export type Patient = z.infer<typeof patientSchema>;

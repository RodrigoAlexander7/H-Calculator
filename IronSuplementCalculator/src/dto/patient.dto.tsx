import { z } from 'zod';
import { locationSchema } from './location.dto';

const genderSchema =z.enum(['M','F'],'gender are just M or F');
const famaleStateSchema = z.enum(['G','P','none']).nullable();
const gestationTimeSchema = z.enum(['1','2','3']).nullable(); 

export const patientSchema = z.object({
   name: z.string().min(1,'name can not be null'),
   lastname: z.string().min(1,'lastname can not be null'),
   birthDate: z.string().min(1, 'birthdate can not be null'),
   gender: genderSchema.optional(),
   famaleState : famaleStateSchema.optional(),
   gestationTime : gestationTimeSchema.optional(),

   hbObserved: z.number(),
   hbFixed: z.number(),
   diagnostic: z.string(),
   location : locationSchema

})

export type Patient = z.infer<typeof patientSchema>;

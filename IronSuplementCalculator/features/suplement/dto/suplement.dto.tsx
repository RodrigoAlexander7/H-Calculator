import { z } from 'zod';

const presentationSchema = z.enum(['drops', 'syrup', 'pill'])
export const doseSchema = z.object({
   from_age : z.number(),  // age in days
   to_age : z.number(),    // age in days
   doseAmount: z.number()  // amount in ml/(kg or day)
})


export const suplementSchema = z.object({
   idSuplement: z.string(),
   name: z.string(), // the comercial name
   type: z.string(),  // the type pj-> sulfato ferroso / complejo polimaltosado
   presentation: presentationSchema,
   notes: z.string().optional().nullable(),
   elementalIron: z.number(), // the elemental iron per every ml
   content: z.number(),  // the total content/ amount in ml
   dose: z.array(doseSchema)
})

export type Suplement = z.infer<typeof suplementSchema>;

import { z } from 'zod';

export const locationSchema = z.object({
   department: z.string().min(1,'dep not valid'),
   province: z.string().min(1,'prov not valid'),
   district: z.string().min(1,'dist not valid'),
   town: z.string().min(1,'town not valid'),
   adjustHB: z.string().min(1,'town not valid'),
})

export type Location = z.infer<typeof locationSchema>;

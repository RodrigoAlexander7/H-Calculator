import { Patient } from '@/patient/dto/patient.dto';
import dayjs from 'dayjs';

const WEEK : number = 7
const MONTH : number = 30
const YEAR : number = 365

interface stats{
   anemiaLimit: number;
   result: string;
}

interface GenericRules {
   ageMax:number;
   stats: stats[]
}

interface FemaleRules{
   ageMax?:number;
   isGestant: boolean;
   isPuerper:boolean;
   stats:stats[];
   gestationTime?:number;
}



const genericRules:GenericRules[] = [
   {ageMax : WEEK, stats:[{anemiaLimit:13, result:'Caso de Anemia' }]} ,
   {ageMax : 4*WEEK, stats:[{anemiaLimit:10, result:'Caso de Anemia'}]},
   {ageMax : 8 * WEEK, stats:[{anemiaLimit:8, result:'Caso de Anemia'}]},
   {ageMax : 2*MONTH, stats:[{anemiaLimit:13.49,result:'Caso de Anemia'}]}, 
   {ageMax : 6*MONTH, stats:[{anemiaLimit:9.49,result:'Caso de Anemia'}]}, 
   {ageMax : 2 * YEAR, stats:[
      {anemiaLimit:6.99,result: 'Caso de Anemia SEVERA'},
      {anemiaLimit:9.40,result: 'Caso de Anemia MODERADA'},
      {anemiaLimit:10.40,result: 'Caso de Anemia LEVE' }
   ]}, 
   {ageMax : 5 * YEAR, stats:[
      {anemiaLimit:6.99,result: 'Caso de Anemia SEVERA'},
      {anemiaLimit:9.90,result: 'Caso de Anemia MODERADA'},
      {anemiaLimit:10.90,result: 'Caso de Anemia LEVE' }
   ]}, 
   {ageMax : 12 * YEAR, stats:[
      {anemiaLimit:7.99,result: 'Caso de Anemia SEVERA'},
      {anemiaLimit:10.90,result: 'Caso de Anemia MODERADA'},
      {anemiaLimit:11.40,result: 'Caso de Anemia LEVE' }
   ]}, 
]

const maleRules:GenericRules[] = [
   // man 12 - 14
   {ageMax : 15 * YEAR , stats:[
      {anemiaLimit:7.99,result: 'Caso de Anemia SEVERA'},
      {anemiaLimit:10.90,result: 'Caso de Anemia MODERADA'},
      {anemiaLimit:11.90,result: 'Caso de Anemia LEVE' }
   ]},
   // man 15 yo or more
   {ageMax : 150 * YEAR , stats:[
      {anemiaLimit:7.99,result: 'Caso de Anemia SEVERA'},
      {anemiaLimit:10.90,result: 'Caso de Anemia MODERADA'},
      {anemiaLimit:12.90,result: 'Caso de Anemia LEVE' }
   ]}
]

const femaleRules: FemaleRules[] = [
   // women 12 - 14 no gestant
   {ageMax : 15 * YEAR ,isGestant: false,isPuerper:false, stats:[
      {anemiaLimit:7.99,result: 'Caso de Anemia SEVERA'},
      {anemiaLimit:10.90,result: 'Caso de Anemia MODERADA'},
      {anemiaLimit:11.90,result: 'Caso de Anemia LEVE' }
   ]},
   // women 15 yo or more
   {ageMax : 150 * YEAR ,isGestant:false,isPuerper:false, stats:[
      {anemiaLimit:7.99,result: 'Caso de Anemia SEVERA'},
      {anemiaLimit:10.90,result: 'Caso de Anemia MODERADA'},
      {anemiaLimit:11.90,result: 'Caso de Anemia LEVE' }
   ]},
   
   // GESTANT
   {isGestant:true, isPuerper: false,gestationTime: 1, stats:[
      {anemiaLimit:6.99,result: 'Caso de Anemia SEVERA'},
      {anemiaLimit:9.90,result: 'Caso de Anemia MODERADA'},
      {anemiaLimit:10.90,result: 'Caso de Anemia LEVE' }
   ]},
   {isGestant:true,isPuerper: false,gestationTime: 2, stats:[
      {anemiaLimit:6.99,result: 'Caso de Anemia SEVERA'},
      {anemiaLimit:9.40,result: 'Caso de Anemia MODERADA'},
      {anemiaLimit:10.40,result: 'Caso de Anemia LEVE' }
   ]},
   {isGestant:true,isPuerper: false,gestationTime: 3, stats:[
      {anemiaLimit:6.99,result: 'Caso de Anemia SEVERA'},
      {anemiaLimit:9.90,result: 'Caso de Anemia MODERADA'},
      {anemiaLimit:10.90,result: 'Caso de Anemia LEVE' }
   ]},

   //PUERPER
   {isGestant:false, isPuerper:true, stats:[
      {anemiaLimit:7.99,result: 'Caso de Anemia SEVERA'},
      {anemiaLimit:10.90,result: 'Caso de Anemia MODERADA'},
      {anemiaLimit:11.90,result: 'Caso de Anemia LEVE' }
   ]}

]   


export const calculateDiagnostic = (dateBirthStr:string ,gender:string, isGestant:boolean,isPuerper:boolean,gestationTime:string, hbStr:string, hbCorrectionStr:string):string|undefined => {
   const ageDays : number = Number(dayjs().diff(dayjs(dateBirthStr),'day'))
   const hbCorrection:number = Number(String(hbCorrectionStr).replace(',','.'))
   let hb:number = Number(hbStr)
   hb = hb - hbCorrection
   let info: string =
                     `Genero: ${gender === 'M'? 'masculino':'femenino'}` +
                     `\n Es gestante: ${isGestant? `Si - ${gestationTime} trimestre`:'No'}` +
                     `\n Es puerpera: ${isPuerper? 'Si':'No'}` +
                     `\n HB observada: ${hbStr}` +
                     `\n Factor Correcion por Altura: ${hbCorrection}` +
                     `\n HB ajustada: ${hb}` 



   if (ageDays < 12 * YEAR){
      const gStast = genericRules.find( obj => ageDays < obj.ageMax)?.stats 
      if(gStast)  return getResult(gStast,hb,info)   
   }
   
   else if(gender === 'M'){
      const mStats = maleRules.find(obj => ageDays < obj.ageMax)?.stats
      if(mStats) return getResult(mStats,hb,info)
   }
      
   

   else if(gender === 'F'){
      if (isPuerper){
         const fStats = femaleRules.find(obj => obj.isPuerper)?.stats
         if (fStats) return getResult(fStats,hb,info);  
      }
      else if (isGestant){
         const fStats = femaleRules.find(obj => obj.isGestant && String(obj.gestationTime) === gestationTime)?.stats
         if (fStats) return getResult(fStats,hb,info);
         
      }
      else {
         const fStats = femaleRules.find(obj => obj.isGestant === false && obj.ageMax !== undefined && ageDays < obj.ageMax)?.stats
         if (fStats) return getResult(fStats,hb,info)
      }
   }
   return 'Shomethig happends bro, hi'
}
export const getPatientData = (patient: Patient) => {
   return {
      dateBirth: patient.birthDate,
      gender: patient.gender,
      isGestant: patient.femaleState === 'G',
      isPuerper: patient.femaleState === 'P',
      gestationTime: patient.femaleState ==='G'? patient.gestationTime : '0'
   }
}

const getResult = (objStats:stats[],hb:number, info:string):string|undefined => {
   for(const caseStats of objStats){
      if(hb <= caseStats.anemiaLimit){
         return caseStats.result + `\n ${info}`
      }
   }
   return 'Paciente Sano:' + '\n' + info
}
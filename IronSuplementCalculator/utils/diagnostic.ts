import dayjs from 'dayjs';

const WEEK : number = 7
const MONTH : number = 30
const YEAR : number = 365


const genericRules = [
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

const maleRules = [
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

const famaleRules = [
   // women 12 - 14 no gestant
   {ageMax : 15 * YEAR ,isGestant: false, stats:[
      {anemiaLimit:7.99,result: 'Caso de Anemia SEVERA'},
      {anemiaLimit:10.90,result: 'Caso de Anemia MODERADA'},
      {anemiaLimit:11.90,result: 'Caso de Anemia LEVE' }
   ]},
   // women 15 yo or more
   {ageMax : 150 * YEAR ,isGestant:false, stats:[
      {anemiaLimit:7.99,result: 'Caso de Anemia SEVERA'},
      {anemiaLimit:10.90,result: 'Caso de Anemia MODERADA'},
      {anemiaLimit:11.90,result: 'Caso de Anemia LEVE' }
   ]},
   
   // GESTANT
   {isGestant:true,gestationTime: 1, stats:[
      {anemiaLimit:6.99,result: 'Caso de Anemia SEVERA'},
      {anemiaLimit:9.90,result: 'Caso de Anemia MODERADA'},
      {anemiaLimit:10.90,result: 'Caso de Anemia LEVE' }
   ]},
   {isGestant:true,gestationTime: 2, stats:[
      {anemiaLimit:6.99,result: 'Caso de Anemia SEVERA'},
      {anemiaLimit:9.40,result: 'Caso de Anemia MODERADA'},
      {anemiaLimit:10.40,result: 'Caso de Anemia LEVE' }
   ]},
   {isGestant:true,gestationTime: 3, stats:[
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


const calculateDiagnostic = (dateBirthStr:string ,gender:string, isGestant:boolean,isPuerper:boolean,gestationTime:string, hbStr:string, hbCorrectionStr:string):string|undefined => {
   const ageDays : number = Number(dayjs().diff(dayjs(dateBirthStr),'day'))
   const hbCorrection:number = Number(hbCorrectionStr)
   let hb:number = Number(hbStr)
   let info: string =
                     `Genero: ${gender === 'M'? 'masculino':'femenino'}` +
                     `\n Es gestante: ${isGestant? `Si - ${gestationTime} trimestre`:'No'}` +
                     `\n Es gestante: ${isPuerper? 'Si':'No'}` +
                     `\n HB observada: ${hbStr}` +
                     `\n Factor Correcion por Altura: ${hbCorrection}` +
                     `\n HB ajustada: ${hb}` 

   hb = hb - hbCorrection


   if (ageDays < 12 * YEAR){
      genericRules.forEach((obj) =>{
         if(ageDays < obj.ageMax){
            obj.stats.forEach((caseStat)=>{
               if(hb <= caseStat.anemiaLimit){
                  return caseStat.result + `\n ${info}`  
               }
            })
            return 'Paciente sin cuadro de anemia \n' + info
         }
      })
   }
   if(gender === 'M'){
      maleRules.forEach((obj)=>{
         if(ageDays < obj.ageMax){
            obj.stats.forEach((caseStats)=>{
               if(hb <= caseStats.anemiaLimit){
                  return caseStats.result + `\n ${info}`
               }
            })
            return `Paciente sin cuadro de anemia \n ${info}`
         }
      })
   }
// THE RULES FOR ALL WOMEN NEED TO HAVE THE SAME STRUCTURE (is gestant: false, isPuerper:true , etc)
   if(gender === 'F'){
      famaleRules.forEach((obj)=>{
         if(obj.isGestant === false){
            if(obj.ageMax !== undefined && ageDays < obj.ageMax){
               obj.stats.forEach((caseStats)=>{
                  if(hb <= caseStats.anemiaLimit){
                     return caseStats.result + `\n ${info}`
                  }
               })
               return `Paciente sin cuadro de anemia \n ${info}`
            }
         }
      })
   }
   return 'Shomethig happends bro, hi'
}
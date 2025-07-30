import dayjs from 'dayjs';

const calculateDiagnostic = (dateBirthStr:string ,gender:string, isGestant:boolean,isPuerper:boolean,gestationTime:string, hbStr:string, hbCorrectionStr:string):string|undefined => {
   const ageDays : number = Number(dayjs().diff(dayjs(dateBirthStr),'day'))
   const hbCorrection:number = Number(hbCorrectionStr)
   let hb:number = Number(hbStr)

   hb = hb - hbCorrection

   const rulesGeneric = [
      {ageMax : 7, stats:[{anemiaLimit:13, result:'Caso de Anemia' }]} ,
      {ageMax : 28, stats:[{anemiaLimit:10, result:'Caso de Anemia'}]},
      {ageMax : 56, stats:[{anemiaLimit:8, result:'Caso de Anemia'}]},
      {ageMax : 2*30, stats:[{anemiaLimit:13.49,result:'Caso de Anemia'}]}, 
      {ageMax : 6*30, stats:[{anemiaLimit:9.49,result:'Caso de Anemia'}]}, 
      {ageMax : 24*30, stats:[
         {anemiaLimit:6.99,result: 'Caso de Anemia SEVERA'},
         {anemiaLimit:9.40,result: 'Caso de Anemia MODERADA'},
         {anemiaLimit:10.40,result: 'Caso de Anemia LEVE' }
      ]}, 
      {ageMax : 60*30, stats:[
         {anemiaLimit:6.99,result: 'Caso de Anemia SEVERA'},
         {anemiaLimit:9.90,result: 'Caso de Anemia MODERADA'},
         {anemiaLimit:10.90,result: 'Caso de Anemia LEVE' }
      ]}, 
      {ageMax : 11*12*30, stats:[
         {anemiaLimit:7.99,result: 'Caso de Anemia SEVERA'},
         {anemiaLimit:10.90,result: 'Caso de Anemia MODERADA'},
         {anemiaLimit:11.40,result: 'Caso de Anemia LEVE' }
      ]}, 
   ]

   
   if (ageDays < 7)
      if(hb <= 13) return 'Con anemia segun niveles de hb';


   if(age < 2){
      if(hb < 7) return 'Anemia severa'
      else if(hb < 9.5) return 'Anemia moderada'
      else if(hb < 10.5) return 'Anemia leve'
      else return 'valores normales'
   }
   else if(age < 5){
      if(hb < 7) return 'Anemia severa'
      else if(hb < 9.9) return 'Anemia moderada'
      else if(hb < 11) return 'Anemia leve'
      else return 'valores normales'
   }
   else if(age < 12){
      if(hb < 8) return 'Anemia severa'
      else if(hb < 11) return 'Anemia moderada'
      else if(hb < 12) return 'Anemia leve'
      else return 'valores normales'
   }   
}
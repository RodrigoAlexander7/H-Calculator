import dayjs from 'dayjs';

const calculateDiagnostic = (dateBirthStr:string ,gender:string, isGestant:boolean,isPuerper:boolean,gestationTime:string, hbStr:string, hbCorrectionStr:string) => {
   const age: number = Number(dayjs().diff(dayjs(dateBirthStr),'day'))
   const hbCorrection:number = Number(hbCorrectionStr)
   let hb:number = Number(hbStr)

   hb = hb - hbCorrection
   
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
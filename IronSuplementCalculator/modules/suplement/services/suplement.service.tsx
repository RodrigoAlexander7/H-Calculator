import { Suplement, suplementSchema } from "@/modules/suplement/dto/suplement.dto";
import suplement_information from "@/utils/json/suplement_information.json";

const suplementItems:Suplement[]  = suplementSchema.array().parse(suplement_information);

// is the daily necesary doses to the child -> we recive the patient's weigth, age(in days), if is anemic and the type of product
export const getDose = (suplementValue:Suplement, age:number, weight:number , isAnemic: boolean):number => {
   console.log(JSON.stringify(suplementValue)+'\n'+age+'\n'+weight+'\n' + isAnemic)
   let doseResult = 0;
   const ageDoseAmount = suplementValue.dose.find((dose)=>{
      return age > dose.from_age && age <= dose.to_age
   })?.doseAmount // amount in ml per kg or day

   console.log(ageDoseAmount + '***********' )

   if(isAnemic && ageDoseAmount)
      doseResult = weight * ageDoseAmount / suplementValue.elementalIron 
   
   else if(!isAnemic && ageDoseAmount)
      doseResult = weight * 2/3 * ageDoseAmount / suplementValue.elementalIron
   console.log(doseResult)
   return doseResult
}

export const getById = (id:string): Suplement|null => { 
   return suplementItems.find(val => val.idSuplement === id)||null
}

export const getInfoToString = (suplement:Suplement): string => {
   let presentation = '';
   if (suplement.presentation === 'drops') {
   presentation = 'Gotas';
   } else if (suplement.presentation === 'syrup') {
   presentation = 'Jarabe';
   } else if (suplement.presentation === 'pill') {
   presentation = 'Pastillas';
   }

   
   return(
      `Tipo: ${suplement.type}` + '\n' +
      `Nombre de Producto: ${suplement.name}` + '\n' +
      //`ID de Suplemento: ${suplement.idSuplement}` + '\n' +
      `Presentacion: ${presentation}` + '\n' +
      `Hierro Elemental: Por cada 01 ml contiene ${suplement.elementalIron} mg`  + '\n' +
      `Contenido por envase: ${suplement.content}` + 'ml\n' +
      `Notes: ${suplement.notes}` + '\n' +
      `Dosis: ${suplement.dose.map((val)=>{
         return(
            `De: ${formatDays(val.from_age)} - ${formatDays(val.to_age)} --> ${val.doseAmount}ml `
         )
      })}` + '\n' 
   )
}


function formatDays(dias: number) {
  const diasPorAnio = 365;
  const diasPorMes = 30;

  const anios = Math.floor(dias / diasPorAnio);
  const meses = Math.floor((dias % diasPorAnio) / diasPorMes);

  const dispAnios = anios>0? `${anios} años`: ''
  const dispMeses = meses>0? `${meses} meses`: ''
  return dispAnios + dispMeses
}

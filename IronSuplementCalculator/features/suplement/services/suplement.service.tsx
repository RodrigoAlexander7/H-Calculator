import { Suplement, suplementSchema } from "@/features/suplement/dto/suplement.dto";
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
   let presentation
   presentation = presentation === 'drops'? 'Gotas':''
   presentation = presentation === 'syrup'? 'Jarabe':''
   presentation = presentation === 'pill'? 'Pastillas':''
   return(
      `ID de Suplemento: ${suplement.idSuplement}` + '\n' +
      `Nombre Comercial: ${suplement.name}` + '\n' +
      `Tipo: ${suplement.type}` + '\n' +
      `Presentacion: ${presentation}` + '\n' +
      `Notas: ${suplement.notes}` + '\n' +
      `Hierro Elemental: ${suplement.elementalIron}` + '\n' +
      `Contenido: ${suplement.content}` + 'ml\n' +
      `Dosis: ${suplement.dose.map((val)=>{
         return(
            `De: ${val.from_age} - ${val.to_age} años --> ${val.doseAmount}ml `
         )
      })}` + '\n' 
   )
}
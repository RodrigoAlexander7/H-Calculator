import { Suplement } from "../dto/suplement.dto";

// is the daily necesary doses to the child -> we recive the patient's weigth, age(in days), if is anemic and the type of product
export const getDose = (suplementSchema:Suplement, age:number, weight:number , isAnemic: boolean) => {
   let dose = 0;
   const ageDose = suplementSchema.dose.find((dose)=>{
      age > dose.from_age && age <= dose.to_age
   })?.doseAmount // amount in ml per kg or day

   if(isAnemic && ageDose)
      return dose = weight * ageDose / suplementSchema.elementalIron 
   
   else if(!isAnemic && ageDose)
      return dose = weight * 2/3 * ageDose / suplementSchema.elementalIron
   
}
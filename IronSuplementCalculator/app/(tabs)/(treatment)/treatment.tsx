import { Suplement, suplementSchema } from "@/features/suplement/dto/suplement.dto";
import suplement from "@/utils/json/suplement.json";
import { useState } from "react";
import { Text, View } from "react-native";
import { Picker } from "react-native-ui-lib";

const suplementItems:Suplement[]  = suplementSchema.array().parse(suplement);

export default function TreatmentScreen(){
   const [suplementName, setSuplementName] = useState<string>()
   const [suplementInfo, setSuplementInfo] = useState<Suplement>()
   
   return(
      <View>
         <View>
            <Text>Ingrese el tipo de Sulfato a utilizar</Text>
            <Picker
               preset='outline'
               label = 'Seleccionar tipo de suplementacion'
               labelColor='black'
               placeholder= 'Seleccionar Sulfato Ferroso'
               showSearch 
               searchStyle={{color:'black'}}
               items = {suplementItems.map((item)=>(
                  {
                     label: item.name,
                     value: item.idSuplement
                  }
               ))}
               value={suplementName}
               onChange={(val)=>{
                  if(typeof val === 'string'){
                     setSuplementName(val)
                     setSuplementInfo(suplementItems.find((sup)=> sup.idSuplement === val))
                  }  
               }}
            />
         </View>  
         <View>
            {suplementName && 
               <View>
                  <Text>{suplementInfo?.name + "\n" + suplementInfo?.presentation}</Text> 
                  <Text>hola</Text>
               </View>
            }
         </View>
      </View>

   )
}
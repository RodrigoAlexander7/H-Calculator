import { Text, View } from "react-native";
import { Picker } from "react-native-ui-lib";
import { useSuplementPicker } from "../hooks/useSuplementPicker";
import { getInfoToString } from "../services/suplement.service";

export function SuplementPicker(){
   const {
      idSuplement, setIdSuplement,
      suplement,
      suplementItems
   } = useSuplementPicker()

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
               items = {suplementItems}
               value={idSuplement}
               onChange={(val)=>{
                  if(typeof val === 'string'){
                     setIdSuplement(val)
                     console.log(suplement)
                  }  
               }}
            />
         </View>  
         <View>
            {idSuplement && 
               <View>
                  <Text>{suplement && getInfoToString(suplement)}</Text>
               </View>
            }
         </View>
      </View>
   )
}
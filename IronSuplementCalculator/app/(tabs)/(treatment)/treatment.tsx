import { SuplementPicker } from "@/modules/suplement/components/suplementPicker";
import { TreatmentButton } from "@/modules/suplement/components/treatmentButton";
import { View } from "react-native";

export default function TreatmentScreen(){
   return(
      <View>
         <SuplementPicker/>
         <TreatmentButton/>
      </View>
   )
}
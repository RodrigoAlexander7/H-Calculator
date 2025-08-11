import { SuplementPicker } from "@/features/suplement/components/suplementPicker";
import { TreatmentButton } from "@/features/suplement/components/treatmentButton";
import { View } from "react-native";

export default function TreatmentScreen(){
   return(
      <View>
         <SuplementPicker/>
         <TreatmentButton/>
      </View>
   )
}
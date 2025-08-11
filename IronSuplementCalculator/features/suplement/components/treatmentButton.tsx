import { usePatientStore } from "@/features/patient/store/patientStore";
import dayjs from "dayjs";
import { useState } from "react";
import { Text } from "react-native";
import { Button, View } from "react-native-ui-lib";
import { getDose } from "../services/suplement.service";
import { useSuplementStore } from "../store/suplementStore";

export const TreatmentButton = ()=>{
   const {suplementStore} = useSuplementStore();
   const {patient} = usePatientStore();
   const ageDays : number = Number(dayjs().diff(dayjs(patient.birthDate),'day'))
   const [doseInfo,setDoseInfo] = useState<string>('')

   return(
      <View>
         <Button
            label = 'Calcular tratamiento'
            onPress = {()=>{
               setDoseInfo(String(getDose(suplementStore,ageDays,patient.weight||0,true)))
            }}
         />
         {doseInfo && 
            <Text>
               {doseInfo}
            </Text>
         }
      </View>
   )

}
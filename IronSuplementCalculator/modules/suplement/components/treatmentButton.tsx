import { usePatientStore } from "@/modules/patient/store/patientStore";
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
   const [doseNumber,setDoseNumber] = useState<number>(0)

   return(
      <View>
         <Button
            label = 'Calcular tratamiento'
            onPress = {()=>{
               setDoseNumber(getDose(suplementStore,ageDays,patient.weight||0,true))
            }}
         />
         {doseNumber !==0 && 
            <Text>
               {'Se recomienda diariamente: \n'+ doseNumber.toFixed(1) +'ml del suplemento\n'+
               'EQUIVALENTES:\n'+
               `${(doseNumber * 20).toFixed(1)} gotas\n\n`+
               'Dosis Mensual\n' + (doseNumber*30/suplementStore.content).toFixed(1) + ' frascos' 
               }

            </Text>
         }
      </View>
   )

}
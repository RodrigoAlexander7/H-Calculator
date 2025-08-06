import department_province from '@/utils/json/department_province.json';
import departments from '@/utils/json/departments.json';
import district_town from '@/utils/json/district_town.json';
import province_district from '@/utils/json/province_district.json';
import { useState } from "react";
import { Location } from "../dto/location.dto";

const townAdjustHb: TupleJson = require('@/utils/json/town_adjustHB.json') as TupleJson;

type Tuple = {
   location: string;
   sublocation: string[];
}
type TupleJson = Tuple[]


//tuple are like Arequipa [miraflores, arequipa, selva alegre] 
//              Caraveli [distrito, etc]
const getItem = (tuple: TupleJson, location:string) => {
   // if i looking for Arequipa, locationList are -> [miraflores, arequipa, selva alegre]  (solo sublocation)
   const locationList = tuple.find((d) => d.location === location )?.sublocation || []
   const sublocation = locationList.map((sub)=>(
      {
         label: sub, //the label for the pickers
         value: sub, // the value for the pickers
      }
   ))
   return sublocation
}

export const useLocationData = ()=>{
   const [location, setLocation] = useState<Location>({
      department: '',
      province: '',
      district: '',
      town: '',
      adjustHB: '',
   })

   const onLocationChange = (key: keyof Location) => (value: string)=> {
      setLocation(prev => {
         switch(key){
            case 'department':
               return {
                  department:value,
                  province: '',
                  district: '',
                  town: '',
                  adjustHB: ''
               }
            case 'province':
               return {
                  ...prev,
                  province:value,
                  district: '',
                  town: '',
                  adjustHB: ''
               }
            case 'district':
               return{
                  ...prev,
                  district: value,
                  town: '',
                  adjustHB: ''
               }
            case 'town':
               return{
                  ...prev,
                  town: value,
                  adjustHB: getItem(townAdjustHb, value)[0].value
               }
            default: return prev
         }
      } ) 
   }
   
   const departmentItems = departments
   const provinceItems = getItem(department_province, location.department)
   const districtItems = getItem(province_district, location.province)
   const townItems = getItem(district_town, location.department)

   return {
      location, setLocation,
      onLocationChange,
      departmentItems,
      provinceItems,
      districtItems,
      townItems
   }

}




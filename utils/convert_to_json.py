import pandas as pd
import json

df = pd.read_csv("data.csv", delimiter = "," ,header = 0)
data = df.to_dict(orient="records")
departments = df["DEPARTAMENTO"].unique().tolist() 
provinces = df["PROVINCIA"].unique().tolist()

def get_location_tuples(location:str, sublocation:str):
   location_sublocation = (
      df[[location, sublocation]]      #select colums
      .drop_duplicates()               #delete duplicates selections
      .groupby(location)[sublocation]  #group: location -> [sub01, sub02, ..]  but is in pandas object
      .apply(list)                     #convert this in:location [sub01, sub 02] but no is a python list
      .reset_index()                   #canvert in a dataframe again
   )
   structure =[
      {
         location.lower() : row[location],
         sublocation.lower() : row[sublocation]
      }
      for _,row in location_sublocation.iterrows()
   ]
   return structure


def save_to_json(input_data, output_name):
   with open(output_name, "w", encoding="utf-8") as f:
      json.dump(input_data, f, ensure_ascii=False, indent = 2)


#save all data
#save_to_json(data, "data.json")
#save provinces
#save_to_json(provinces, "provinces.json")
#save department-province

#save departments
save_to_json(departments, "departments.json")
#save department-province / province-district / district-centroPoblado / town-adjust
save_to_json(get_location_tuples("DEPARTAMENTO","PROVINCIA"), "department_province.json")
save_to_json(get_location_tuples("PROVINCIA","DISTRITO"), "province_district.json")
save_to_json(get_location_tuples("DISTRITO","CENTRO POBLADO"), "district_town.json")
save_to_json(get_location_tuples("CENTRO POBLADO","AJUSTE DE HB"), "town_adjustHB.json")
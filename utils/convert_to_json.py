import pandas as pd
import json

df = pd.read_csv("data.csv", delimiter = "," ,header = 0)
data = df.to_dict(orient="records")
departments = df["DEPARTAMENTO"].unique().tolist() 
provinces = df["PROVINCIA"].unique().tolist()

#use parenteses to use multiline (and all these in just one line)
department_province = (
   df[["DEPARTAMENTO", "PROVINCIA"]]
   .drop_duplicates()

   # create a panda.Series object that contains: department [value]      
   # [value] isn't a python dictionary instead is a special dict of pandas very similar
   .groupby("DEPARTAMENTO")["PROVINCIA"]     # just group provinces by departent 
   .apply(list)   # complete the object / every departmen has his provinces list
   .reset_index()    # create a DataFrame object (like an exel table)
)

estructure = [
   {
      "department" : row["DEPARTAMENTO"],
      "province" : row["PROVINCIA"]
   }
   for _,row in department_province.iterrows()
]

def save_to_json(input_data, output_name):
   with open(output_name, "w", encoding="utf-8") as f:
      json.dump(input_data, f, ensure_ascii=False, indent = 2)


#save all data
save_to_json(data, "data.json")
#save departments
save_to_json(departments, "departments.json")
#save provinces
save_to_json(provinces, "provinces.json")
#save department-province
save_to_json(estructure, "department_province.json")
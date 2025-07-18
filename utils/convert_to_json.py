import pandas as pd
import json

df = pd.read_csv("altitudes.csv", delimiter = "," ,header = 0)

json_data = df.to_dict(orient="records")

with open("json_data.json", "w", encoding="utf-8") as f:
   json.dump(json_data, f,ensure_ascii=False, indent = 2)
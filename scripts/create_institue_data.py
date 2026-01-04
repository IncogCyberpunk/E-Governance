import json
import pandas


data = pandas.read_csv("data/institute.csv")

institutes = []
for _, row in data.iterrows():
    institutes.append({
        "name": row["Hospital"],
        "location": row["City"],
        "province": row["Province"],
        "description": row["Description"] if not pandas.isna(row["Description"]) else ""
    })

with open("data/institute.json", "w", encoding="utf-8") as f:
    json.dump(institutes, f, ensure_ascii=False, indent=4)


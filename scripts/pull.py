import os
from dotenv import load_dotenv
from supabase import create_client, Client
import json

# Load .env variables (works locally; ignored on Netlify if file missing)
load_dotenv()

SUPABASE_URL = os.getenv("VITE_SUPABASE_URL")
SUPABASE_KEY = os.getenv("VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Missing Supabase credentials in .env")

ENV= os.getenv("ENV")
if ENV == "production":
    OUTPUT_DIR = "public/data"
else:
    OUTPUT_DIR = "data"

print(f"{ENV} environment detected. Saving files to: {OUTPUT_DIR}/")

# Ensure the directory exists
os.makedirs(OUTPUT_DIR, exist_ok=True)

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Helper function to save data and reduce code repetition
def save_json(filename, data):
    file_path = f"{OUTPUT_DIR}/{filename}"
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"Saved {filename}")

# --- Fetch and Save Operations ---

response = supabase.table("citizens").select("*").execute()
save_json("citizens.json", response.data)

response = supabase.table("entitlements").select("*").execute()
save_json("entitlements.json", response.data)

response = supabase.table("health_institutes").select("*").execute()
save_json("health_institutes.json", response.data)

response = supabase.table("health_records").select("*").execute()
save_json("health_records.json", response.data)

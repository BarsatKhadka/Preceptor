from fastapi import FastAPI
from utils import get_os

app = FastAPI()

@app.get("/data")
def read_data():
    os_name = get_os()
    return {"message": f"Hello from FastAPI {os_name}"}
from fastapi import FastAPI , Request 
from fastapi.middleware.cors import CORSMiddleware
from utils import get_os
from currentTab.currentTab import currentTab
import time
from pydantic import BaseModel
from typing import List 
from state import latest_tab_info
from precept.sqliteDb import add_current_precept , move_all_current_precept_to_history , delete_all_precept_history , get_all_current_precepts , get_all_history_precepts , move_current_precept_to_history , delete_history_precept
from localAI.ollama import ollama_evaluation
import ollama
from precept.sqliteDb import create_table

last_extension_ping = 0

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

os_name = get_os()

# Tab Info 
@app.get("/currentTab")
def current_tab():
    current_tab_info = currentTab(os_name=os_name)
    return {"message": current_tab_info()} 

@app.post("/tabInfo")
async def current_tab_browser(request: Request):
    latest_tab = await request.json()
    latest_tab_info.update(latest_tab)
    return latest_tab

#Ollama
@app.get("/ollama")
def is_ollama_running():
    try:
        import os
        import requests
        response = requests.get(os.getenv("OLLAMA_BASE_URL", "http://localhost:11434"))
        return response.status_code == 200
    except (requests.exceptions.RequestException, ImportError):
        return False

@app.get("/models")
def get_models():
    try:
        models = ollama.list()['models']
        return {"models": [m.model for m in models]}
    except (ImportError, Exception) as e:
        return {"models": [], "error": str(e)}

@app.get("/ollamaEvaluation")
def ollamaEvaluation(model:str):
    tab_info = current_tab()
    precepts = get_all_current_precepts()
    print(tab_info)
    print(precepts)
    return ollama_evaluation(tab_info["message"] , precepts , model)

#CRUD for adding and deleting current and history precepts
class Precept(BaseModel):
    precept: str  

@app.post("/addCurrentPrecept")
def add_precept(precept: Precept):
    move_all_current_precept_to_history()
    add_current_precept(precept.precept)
    return True 

@app.post("/deleteAllCurrentPrecepts")
def delete_precept():
    move_all_current_precept_to_history()
    return True

@app.post("/deleteAllHistoryPrecepts")
def delete_all_precept_permanent():
    delete_all_precept_history()
    return True

@app.get("/getAllCurrentPrecepts")
def getAllCurrentPrecepts():
    return get_all_current_precepts()

@app.get("/getAllHistoryPrecepts")
def getAllHistoryPrecepts():
    return get_all_history_precepts()
    
@app.post("/deleteCurrentPrecept")
def deleteCurrentPrecept(id:int):
    move_current_precept_to_history(id)
    return True

@app.post("/deleteHistoryPrecept")
def deleteHistoryPrecept(id:int):
    delete_history_precept(id)
    return True 

@app.post("/extension-alive")
def extension_alive():
    global last_extension_ping
    last_extension_ping = time.time()
    return {"ok": True}

@app.get("/extension-status")
def extension_status():
    now = time.time()
    active = (now - last_extension_ping) < 5
    return {"active": active, "last_ping": last_extension_ping}

@app.get("/test")
def test():
    return True

@app.on_event("startup")
def startup():
    create_table()
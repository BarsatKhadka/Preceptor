from fastapi import FastAPI , Request
from utils import get_os
from currentTab.currentTab import currentTab
import time
from pydantic import BaseModel
from typing import List 
from precept.sqliteDb import add_current_precept , move_all_current_precept_to_history , delete_all_precept_history , get_all_current_precepts , get_all_history_precepts , move_current_precept_to_history , delete_history_precept

app = FastAPI()
os_name = get_os()


@app.get("/currentTab")
def current_tab():
    time.sleep(3)
    current_tab_info = currentTab(os_name=os_name)
    return {"message": current_tab_info()} 

@app.post("/tabInfo")
async def current_tab_browser(request: Request):
    latest_tab = await request.json()
    print(latest_tab)


#CRUD for adding and deleting current and history precepts
class Precept(BaseModel):
    precept: List[str]  

@app.post("/addCurrentPrecept")
def add_precept(precept: Precept):
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

@app.get("/deleteHistoryPrecept")
def deleteHistoryPrecept(id:int):
    delete_history_precept(id)
    return True 
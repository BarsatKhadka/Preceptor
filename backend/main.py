from fastapi import FastAPI
from utils import get_os
from currentTab.currentTab import currentTab
import time
from pydantic import BaseModel
from typing import List 
from precept.sqliteDb import add_current_precept , move_all_current_precept_to_history , delete_all_precept_history 

app = FastAPI()
os_name = get_os()


@app.get("/currentTab")
def read_data():
    time.sleep(3)
    current_tab_info = currentTab(os_name=os_name)
    return {"message": current_tab_info()} 

class Precept(BaseModel):
    precept: List[str]  

@app.post("/addCurrentPrecept")
def add_precept(precept: Precept):
    add_current_precept(precept.precept)
    return True 

@app.post("/deleteAllCurrentPrecept")
def delete_precept():
    move_all_current_precept_to_history()
    return True

@app.post("/deleteAllHistoryPercept")
def delete_all_precept_permanent():
    delete_all_precept_history()
    return True
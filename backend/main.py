from fastapi import FastAPI
from utils import get_os
from currentTab.currentTab import currentTab
import time
from pydantic import BaseModel
from typing import List 
from precept.sqliteDb import create_table

app = FastAPI()
os_name = get_os()


@app.get("/currentTab")
def read_data():
    time.sleep(3)
    current_tab_info = currentTab(os_name=os_name)
    return {"message": current_tab_info()} 

class Precept(BaseModel):
    precept: List[str]  

@app.post("/precept")
def post_precept(precept: Precept):
    create_table()
    return precept.precept
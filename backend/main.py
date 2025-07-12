from fastapi import FastAPI
from utils import get_os
from monitor.monitorMain import monitor_main
import time

app = FastAPI()
os_name = get_os()


@app.get("/data")
def read_data():
    time.sleep(3)
    current_tab_info = monitor_main(os_name=os_name)
    return {"message": current_tab_info()} 
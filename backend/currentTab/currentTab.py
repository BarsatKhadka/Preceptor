import shutil 
import subprocess
import win32gui
import win32process
import psutil
from state import latest_tab_info

def currentTab(os_name):
    if os_name.lower() == "windows":
        return get_active_window_info_windows
    else:
        return get_active_window_info_linux
    
def get_active_window_info_windows():
    hwnd = win32gui.GetForegroundWindow()
    _, pid = win32process.GetWindowThreadProcessId(hwnd)
    try:
        proc = psutil.Process(pid)
        app_name = proc.name().lower().replace(".exe", "")  
        
        if any(browser_key in app_name for browser_key in BROWSERS):
            return latest_tab_info
        
        return app_name
    except psutil.NoSuchProcess:
        return None


def get_active_window_info_linux():
    if(shutil.which("xdotool") is None):
        return "No xdotool found"
    if(shutil.which("xprop") is None):
        return "No xprop found"
    
    try: 
        active_window_id = subprocess.check_output(['xdotool', 'getactivewindow']).decode().strip()
        active_wm_class = subprocess.check_output(['xprop','-id',active_window_id,'WM_CLASS']).decode()
        app_name =  active_wm_class.strip().split('=')[-1].split(',')[-1].strip().strip('"').lower()
        if any(browser_key in app_name for browser_key in BROWSERS):
            return latest_tab_info
        return app_name
    except subprocess.CalledProcessError as e : 
        return f"error {e}"
    


BROWSERS = {
  "google-chrome": "chrome",
  "chrome": "chrome",
  "google-chrome-stable": "chrome",
  "chromium": "chrome",
  "chromium-browser": "chrome",
  "brave": "chrome",
  "microsoft-edge": "chrome",
  "opera": "chrome",
  "vivaldi-stable": "chrome",
  "vivaldi": "chrome",
  "yandex-browser": "chrome",
  "ungoogled-chromium": "chrome",
  "iridium": "chrome",
  "cent-browser": "chrome",
  "slimjet": "chrome",
  "torch": "chrome",
  "maxthon": "chrome",

  "firefox": "firefox",
  "firefox-esr": "firefox",
  "iceweasel": "firefox",
  "icecat": "firefox",
  "waterfox": "firefox",
  "palemoon": "firefox",
  "basilisk": "firefox",
  "seamonkey": "firefox",
  "zen": "firefox"
}
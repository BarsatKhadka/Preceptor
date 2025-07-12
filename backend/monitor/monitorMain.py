import shutil 
import subprocess


def monitor_main(os_name):
    if os_name.lower() == "linux":
        return get_active_window_info_linux



def get_active_window_info_linux():
    if(shutil.which("xdotool") is None):
        return "No xdotool found"
    if(shutil.which("xprop") is None):
        return "No xprop found"
    
    try: 
        active_window_id = subprocess.check_output(['xdotool', 'getactivewindow']).decode().strip()
        active_wm_class = subprocess.check_output(['xprop','-id',active_window_id,'WM_CLASS']).decode()
        return active_wm_class
    except subprocess.CalledProcessError as e : 
        return f"error {e}"
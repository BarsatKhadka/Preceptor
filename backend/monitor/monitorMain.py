import shutil 


def monitor_main(os_name):
    if os_name.lower() == "linux":
        return get_active_window_info_linux



def get_active_window_info_linux():
    if(shutil.which("xdotool") is None):
        return "No xdotool found"
    else:
        return "xodtool found"
import platform

def get_os():
    os_name = platform.system().lower()
    if "windows" in os_name:
        return "windows"
    elif "darwin" in os_name:
        return "mac"
    elif "linux" in os_name:
        return "linux"
    else:
        return "unknown"
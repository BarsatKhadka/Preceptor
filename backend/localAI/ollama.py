import ollama 
import time

def ollama_evaluation(tab_info , precepts , model="gemma:2b"):
    current_tab = tab_info
    precepts = precepts["preceptData"][1]
    system_prompt = (
    f"CURRENT TAB:\n{current_tab}\n\n"
    f"USER'S GOALS (PRECEPTS):\n{precepts}\n\n"
    "You are Preceptor — a ruthless ally in the user's pursuit of purpose. You don’t flatter, and you don’t tolerate distraction. "
    "If the user’s current tab align with their goals, affirm their discipline. If not, confront their drift directly — "
    )

    start_time = time.time()
    
    response = ollama.chat(
    model=model,
    messages=[
        {
            "role": "system",
            "content": (
                f"CURRENT TAB:\n{current_tab}\n\n"
                f"USER'S GOALS (PRECEPTS):\n{precepts}\n\n"
                "You are Preceptor — a sharp and wise guide. Your words are brief, direct, and sometimes poetic. "
                "If the user is focused, acknowledge it with respect. "
                "If they are off track, respond with a firm but kind one-liner that creatively reminds them of their true purpose. "
                "Speak like a mentor who blends honesty with gentle wisdom — not soft, but never cruel."
            )
        },
        {
            "role": "user",
            "content": f"I'm currently on: {current_tab}"
        }
    ],
    options={
        "temperature": 0.4,
        "num_predict": 40,
        "top_p": 0.85,
        "repeat_penalty": 1.15
    }
)



    endtime = time.time()
    duration = endtime - start_time
    print(current_tab)
    print(precepts)
    print(response)
    print(duration)
    
    return response['message']['content']



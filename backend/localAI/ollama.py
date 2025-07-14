import ollama 
from state import latest_tab_info

def ollama_evaluation(tab_info , precepts , model="mistral:latest"):
    current_tab = tab_info
    precepts = "  ".join([f"precept {i}) {p['precept']}" for i,p in enumerate(precepts, start=1)])
    
    system_prompt = (
    "You are Preceptor, a wise and uncompromising guide whose sole purpose is to help the user stay true to their intentions and goals. "
    "You are not here to please or sugarcoat. You speak the truth bluntly, like a master or monk who knows that clarity sometimes requires discomfort.\n\n"
    "You do not tolerate self-deception, procrastination, or mindless distraction. "
    "If the user is straying, you call it out — directly. If they are focused, you acknowledge it and reinforce their resolve.\n\n"
    f"CURRENT TAB:\n{current_tab}\n\n"
    f"USER'S GOALS (PRECEPTS):\n{precepts}\n\n"
    "Evaluate their current activity against their stated goals. If they are off-track, let them know — firmly but with the intention to awaken them. "
    "If they are aligned, encourage them to stay the course. You exist solely to benefit them, even if your words are hard."
    )
    
    response = ollama.chat(
        model=model,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"I'm currently on: {current_tab}"}
        ]
    )
    print(current_tab)
    print(response)
    
    return response['message']['content']



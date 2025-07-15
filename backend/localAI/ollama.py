import ollama
import time

def ollama_evaluation(tab_info, precepts, model="gemma:2b"):
    current_tab = tab_info
    precept = precepts["preceptData"][1]


    prompt = (
        f"CURRENT TAB:\n{current_tab}\n\n"
        f"USER'S GOALS (PRECEPTS):\n{precept}\n\n"
        "You are Preceptor — a sharp and wise guide. Your words are brief, direct, and sometimes poetic. "
        "IF the user is focused and on track, respond with exactly and only the word: okay\n"
        "If they are off track, respond with a firm but kind one-liner that creatively reminds them of their true purpose. "
        "Speak like a mentor who blends honesty with gentle wisdom — not soft, but never cruel.\n\n"
        f"User says: I'm currently on: {current_tab}\n"
        "Provide a concise, single-sentence response.\n\n"
        "IMPORTANT: To help my app parse your response easily, please prepend your reply with either:\n"
        "- [FOCUSED] if the user is on track\n"
        "- [DISTRACTED] if the user is off track (and then write the nudge message)\n"
        "Do not add any other text or punctuation before the tags."
    )

    start_time = time.time()

    response = ollama.chat(
        model=model,
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        options={
            "temperature": 0.4,
            "num_predict": 40,
            "top_p": 0.85,
            "repeat_penalty": 1.15
        }
    )

    end_time = time.time()
    duration = end_time - start_time

    print(current_tab)
    print(precept)
    print(f"Duration: {duration:.2f}s")

    
    return response['message']['content']

import sqlite3
import os
from datetime import datetime

def initialize_db():
    DB_Folder = os.path.join(os.path.expanduser("~"), "preceptorDB")
    DB_File = os.path.join(DB_Folder, "precepts.db")

    if not os.path.exists(DB_File):
        os.makedirs(DB_Folder)

    conn = sqlite3.connect(DB_File , check_same_thread=False)
    return conn

def create_table():
    conn = initialize_db()
    cursor = conn.cursor()

    # Current Precepts table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS precepts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # History of Precepts table 
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS precepts_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content TEXT NOT NULL,
            moved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    conn.commit()
    conn.close()

def add_current_precept(precept):
    create_table()
    conn = initialize_db()
    cursor = conn.cursor()
    local_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    cursor.execute("INSERT INTO precepts (content, created_at) VALUES (?, ?)", (precept, local_time))
    conn.commit()
    conn.close()

def move_all_current_precept_to_history():
    conn = initialize_db()
    cursor = conn.cursor()

    cursor.execute("SELECT content FROM precepts")
    current_precepts = cursor.fetchall()

    for(content,) in current_precepts:
        cursor.execute(
            'INSERT INTO precepts_history (content) VALUES (?)', (content,)
        )
    
    cursor.execute("DELETE FROM precepts")
    conn.commit()
    conn.close()
    
def delete_all_precept_history():
    conn = initialize_db()
    cursor = conn.cursor()
    
    cursor.execute("DELETE FROM precepts_history")

    conn.commit()
    conn.close()

def get_all_current_precepts():
    conn = initialize_db()
    cursor = conn.cursor()
    cursor.execute("SELECT id , content , created_at FROM precepts")
    rows = cursor.fetchall()

    conn.close()

    return {"preceptData": rows[0]}

def get_all_history_precepts():
    conn = initialize_db()
    cursor = conn.cursor()
    cursor.execute("SELECT id , content , moved_at FROM precepts_history")
    rows = cursor.fetchall()

    conn.close()

    return [{"id" : row[0] , "precept" : row[1], "movedAt": row[2]} for row in rows]

def move_current_precept_to_history(id:int):
    conn = initialize_db()
    cursor = conn.cursor 
    cursor.execute("SELECT content FROM precepts WHERE id = ?", (id,))
    row = cursor.fetchone()
    if row is None:
        conn.close()
    
    content = row[0]

    # Insert into precepts_history
    cursor.execute("INSERT INTO precepts_history (content) VALUES (?)", (content,))

    cursor.execute("DELETE FROM precepts WHERE id = ?", (id,))

    conn.commit()
    conn.close()

def delete_history_precept(id: int):
    conn = initialize_db()
    cursor = conn.cursor
    cursor.execute("DELETE FROM precepts_history WHERE id = ?", (id,))
    conn.commit()
    conn.close()


import sqlite3
import os

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
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS precepts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()


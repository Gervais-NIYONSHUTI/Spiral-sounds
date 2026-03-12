import Database from 'better-sqlite3'


const db = new Database('database.db')

db.exec(`
      CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,  
            artist TEXT NOT NULL, 
            price REAL NOT NULL,
            image TEXT NOT NULL, 
            year INTEGER,
            genre TEXT,
            stock INTEGER
            )
      `)

db.close()

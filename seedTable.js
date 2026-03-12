import Database from "better-sqlite3";
import { vinyl } from "./data.js";

const db = new Database('database.db')

const insertData = db.transaction(data => {
    for (const { title, artist, price, image, year, genre, stock } of data) {
        db.prepare('INSERT INTO products (title, artist, price, image, year, genre, stock) VALUES (?, ?, ?, ?, ?, ?, ?)').run(title, artist, price, image, year, genre, stock)
    }
})
try{
 insertData(vinyl)
}catch(err){console.log(err)}

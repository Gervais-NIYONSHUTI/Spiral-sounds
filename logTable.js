import Database from 'better-sqlite3'

// async function viewAllProducts(){
    const db = new Database('database.db')
    const select = db.prepare('Select* from products')
    console.table(select.all())
// }
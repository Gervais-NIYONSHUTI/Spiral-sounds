import { db } from './db/dbConnection.js'

// async function viewAllProducts(){
    const select = db.prepare('Select* from users')
    console.table(select.all())
// }
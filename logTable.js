import { db } from './db/dbConnection.js'

// async function viewAllProducts(){
    const select = db.prepare('Select* from cart_items')
    console.table(select.all())
// }
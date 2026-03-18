import { db } from "../db/dbConnection.js";

export function addToCart(req, res) {
    const productId = parseInt(req.body.productId, 10)
    if (isNaN(productId)) {
        return res.status(400).json({ error: 'Invalid product ID' })
    }
    const userId = req.session.userID
    console.log(req.session, userId)
    const existing = db.prepare('SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?').get(userId, productId)
    if (existing) {
        db.prepare('UPDATE cart_items SET quantity = quantity + 1 WHERE id = ?').run(existing.id)
    } else {
        db.prepare('INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, 1)').run(userId, productId)
    }
    res.json({ message: "Added to cart" })
}

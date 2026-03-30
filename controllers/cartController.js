import { db } from "../db/dbConnection.js";

export function addToCart(req, res) {
    const productId = parseInt(req.body.productId, 10)
    if (isNaN(productId)) {
        return res.status(400).json({ error: 'Invalid product ID' })
    }
    const userId = req.session.userID
    const existing = db.prepare('SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?').get(userId, productId)
    if (existing) {
        db.prepare('UPDATE cart_items SET quantity = quantity + 1 WHERE id = ?').run(existing.id)
    } else {
        db.prepare('INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, 1)').run(userId, productId)
    }
    res.json({ message: "Added to cart" })
}

export async function getCartCount(req, res) {
  const result = db.prepare(`SELECT SUM(quantity) AS totalItems FROM cart_items WHERE user_id = ?`).get(req.session.userID)
  res.json({ totalItems: result.totalItems || 0 })
}

export async function getAll(req, res) {
    const result = db.prepare(`SELECT ci.id AS cartItemId, ci.quantity, p.title, p.artist, p.price FROM cart_items ci JOIN products p ON p.id = ci.product_id WHERE ci.user_id = ?`).all(req.session.userID)
    console.log(result)
    res.json({items: result})
}

export async function deleteItem(req, res) {
    const itemId = parseInt(req.params.itemId, 10)
    if(isNaN(itemId)){
        return res.status(400).json({error: "Invalid item ID"})
    }
    const item = db.prepare('SELECT quantity FROM cart_items WHERE id = ? AND user_id = ?').get(itemId, req.session.userID)
    if (!item) {
      return res.status(400).json({error: 'Item not found'})
    }
    const del = db.prepare('DELETE FROM cart_items WHERE id = ? AND user_id = ?').run(itemId, req.session.userID)
    res.status(204).send()
}

export async function deleteAll(req, res) {
    const delAll = db.prepare('DELETE FROM cart_items WHERE user_id = ?').run(req.session.userID)
    res.status(204).send()
}
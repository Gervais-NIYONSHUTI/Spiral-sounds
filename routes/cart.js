import { addToCart, getCartCount, getAll, deleteItem, deleteAll } from "../controllers/cartController.js";
import { requireAuth } from "../middleware/requireAuth.js";
import express from "express";

export const cartRouter = express.Router()

cartRouter.post('/add', requireAuth, addToCart)
cartRouter.get('/cart-count', requireAuth, getCartCount)
cartRouter.get('/', getAll)
cartRouter.delete('/all', requireAuth, deleteAll)
cartRouter.delete('/:itemId', requireAuth, deleteItem)
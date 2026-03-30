import { addToCart, getCartCount, getAll, deleteItem } from "../controllers/cartController.js";
import express from "express";

export const cartRouter = express.Router()

cartRouter.post('/add', addToCart)
cartRouter.get('/cart-count', getCartCount)
cartRouter.get('/', getAll)
cartRouter.delete('/:itemId', deleteItem)
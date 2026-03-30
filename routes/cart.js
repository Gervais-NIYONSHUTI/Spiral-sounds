import { addToCart, getCartCount, getAll } from "../controllers/cartController.js";
import express from "express";

export const cartRouter = express.Router()

cartRouter.post('/add', addToCart)
cartRouter.get('/cart-count', getCartCount)
cartRouter.get('/', getAll)
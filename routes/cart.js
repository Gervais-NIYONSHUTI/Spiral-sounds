import { addToCart } from "../controllers/cartController.js";
import express from "express";

export const cartRouter = express.Router()

cartRouter.post('/add', addToCart)
import { Router } from "express";
import CartManager from "../controllers/CartManager.js";


const CartRouter = Router()
const carts = new CartManager


CartRouter.post("/", async (req, res) =>{
   res.send (await carts.addCarts())

})

CartRouter.get("/", async (req,res) =>{
    res.send(await carts.readCarts())
})

CartRouter.get("/:id", async (req,res) =>{
    res.send(await carts.getCartsById(req.params.id))
})

CartRouter.post("/:cid/products/:pid", async (req, res) =>{
    const cartId = req.params.cid
    const productId = req.params.pid
    res.send(await carts.addProductInCart(cartId, productId)) 
 })


export default CartRouter
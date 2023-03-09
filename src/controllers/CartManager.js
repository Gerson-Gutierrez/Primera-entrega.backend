import {promises as fs} from 'fs';
import { nanoid } from 'nanoid';
import ProductManager from "./ProductManager.js";

const productAll = new ProductManager

class CartManager {
    constructor() {
        this.path = "./src/models/carts.json";
    }

    readCarts = async ()=> {
        const carts = await fs.readFile(this.path, "utf-8")
        return JSON.parse(carts)

    }

    writeCarts = async (carts) =>{
        await fs.writeFile(this.path, JSON.stringify(carts))

    };

    exist = async (id) => {
        const carts = await this.readCarts();
        return carts.find(carts => carts.id === id)
    }




    addCarts = async ()=> {
      const cartsOld = await this.readCarts();
      const id = nanoid(1)
      const cartsConcat = [{id :id, products : []}, ...cartsOld]
      await this.writeCarts(cartsConcat)
      return "Carrito Agregado"

    }

    getCartsById = async (id) => {
        const cartsById = await this.exist(id)
        if(!cartsById) return "Carrito No Encontrado"
        return cartsById
    };

    addProductInCart = async (cartId, productId) =>{
        const cartById = await this.exist(cartId)
        if(!cartById) return "Carrito no encontrado"
        const productById = await productAll.exist(productId)
        if(!cartById) return "Producto no encontrado"
        
        const cartsAll = await this.readCarts()
        const cartFilter = cartsAll.filter((cart) => cart.id != cartId)

        if(cartById.products.some((prod) => prod.id === productId)){
            const moreProductInCart = cartById.products.find((prod) => prod.id === productId
            )
            moreProductInCart.quantity++
            const cartsConcat = [cartById, ...cartFilter]
            await this.writeCarts(cartsConcat)
            return "producto sumado  al carrito"
        }

       cartById.products.push({id:productById.id, quantity: 1});
         
        const cartsConcat = [cartById, ...cartFilter];
        await this.writeCarts(cartsConcat);
        return "producto agregado al carrito"



    }



}

export default CartManager
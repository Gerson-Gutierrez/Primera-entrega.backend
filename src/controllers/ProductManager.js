import {promises as fs} from 'fs';
import { nanoid } from 'nanoid';

class ProductManager {
    constructor() {
        this.path = "./src/models/products.json";
    }

    readProducts = async ()=> {
        const products = await fs.readFile(this.path, "utf-8");
        return JSON.parse(products);

    }

    writeProducts = async (product) => {
        await fs.writeFile(this.path, JSON.stringify(product));

    }

    exist = async (id) => {
        const products = await this.readProducts();
        return products.find(prod => prod.id === id)
    } 




    addProducts = async (product) =>{
        const productsOld = await this.readProducts();
        product.id = nanoid(1)
        const productAll = [...productsOld, product];
        await this.writeProducts(productAll);
        return "Producto Agregado";
    };

    getProducts = async () =>{
       return await this.readProducts()
    };
    
    getProductsById = async (id) => {
        const productById = await this.exist(id)
        if(!productById) return "Producto No Encontrado"
        return productById
    };

    
    
    updateProducts = async (id, product) => {
        const productById = await this.exist(id)
        if(!productById) return "Producto No Encontrado"
        await this.deleteProducts(id)
        const productOld = await this.readProducts();
        const products = [{...product, id : id}, ...productOld]
        await this.writeProducts(products)
        return "Producto Actualizado"
    }


    deleteProducts = async  (id) => {
     const products = await this.readProducts();
     const productsExists = products.some(prod => prod.id === id)
     
     if (productsExists) {
        const filterProducts = products.filter(prod => prod.id != id)
        await this.writeProducts(filterProducts)
        return "Producto Eliminado"
     }
     return "El Producto a Eliminar no Existe"

    }

}

export default ProductManager




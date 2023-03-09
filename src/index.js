import  express  from "express";
import  ProductRouter from "./router/product.routes.js";
import  CartRouter from "./router/carts.routes.js";
import { engine } from "express-handlebars";
import * as path from "path"
import __dirname from "./utils.js";
import ProductManager from "./controllers/ProductManager.js";
import {Server} from 'socket.io';


const app = express();
const product = new ProductManager();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname + "/views"));
app.use("/", express.static(__dirname + "/public"));


app.get("/", async (req,res)=>{
  const allProducts = await product.getProducts()
  res.render("home",{
    title:"gerson",
    products: allProducts
  })
});


app.use("/api/products", ProductRouter);
app.use("/api/cart", CartRouter);


const PORT = 8080;
const httpServer = app.listen(PORT, () =>{
  console.log(`Servidor Express Puerto ${PORT}`);
});

const socketServer = new Server(httpServer);
socketServer.on('connection',(socket)=>{
  console.log('socket conectado');
});
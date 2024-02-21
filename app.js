
const express = require('express');

//Obtener el ProductManager
const ProductManager = require('./productManager');

//App y PORT
const app = express();
const PORT = 8080;

//Uso del JSON
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

const pm = new ProductManager();

//Ruta para obtener todos los productos con un límite opcional.
app.get('/products', async (req, res) => {
    try{
        let limit = req.query.limit;
        let products = await pm.getProducts();
        if (limit) {
            let prodLimit = products.slice(0, parseInt(limit));
            res.send(prodLimit);
        }else {
            res.send(products);
        }
    }catch (error) {
        res.status(418).send({error, message:"No funciona"});
    }
});

//Ruta para obtener un producto especifico por su id
app.get('/products/:pid', async (req, res) => {
    try{
        let ProdId = req.params.pid;
        const product = await pm.getProductById(Number(ProdId));
        if (product) {
            res.send(product);
        } else {
            res.status(404).send({status: "error", message: "No se encuentra el ID"});
        };
    } catch (error) {
        res.status(418).send({error, message:"No funciona"})
    }
});

//Iniciar server
app.listen(PORT, () => {
    console.log(`Server funcionando en Puerto ${PORT}.`);
});
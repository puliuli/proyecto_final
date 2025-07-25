import {Router} from "express";
import { getAllProducts, getProductById, createProduct, deleteProduct, updatedProduct } from "../controllers/products.controller.js";
import {auth} from "../middlewares/auth.middleware.js"
import { patchProduct } from "../models/products.models.js";
const router = Router();

/** 
const products = [
    { id: 1, nombre: "nombre1" , precio:10 },
    { id: 2, nombre: "nombre2" , precio:20 },
    { id: 3, nombre: "nombre3" , precio:30 },
    { id: 4, nombre: "nombre4" , precio:40 },
];
*/
router.get("/products", getAllProducts);
//router.get("products/search", searchProduct);
router.get("/products/:id", getProductById );

router.post("/products", auth, createProduct );

router.put("/products/:id",auth, patchProduct);
router.put("/products/:id",auth, updatedProduct);

router.delete("/products/:id",auth, deleteProduct);

export default router;





/* router.put('/products/:id', (req,res) => {
    const productId = parseInt(req.params.id,10);
    const productIndex = products.findIndex((p) => p.id === productId);

    if (productIndex === -1) {
        return res.status(404).json({error:  "Producto no encontrado"});
    };
    const { nombre,precio} = req.body;

    products[productIndex] = {id : productId, nombre, precio};
    res.json(products[productIndex]);

});

router.delete('/products/:id', auth , (req,res) =>{
    const productId = parseInt(req.params.id,10);
    const productIndex = products.findIndex((p) => p.id === productId);

    if (productIndex === -1) {
        return res.status(404).json({error:  "Producto no encontrado"});
    };

    products.splice(productId, 1);
    res.status(204).send();
   
});

*/
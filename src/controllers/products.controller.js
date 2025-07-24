//import * as services from '../services/products.services.js';
//la funcion de servicio y controlador se llaman igual, 
// para que no genere erro lo llamo * as services, y lo aplico como funcion (services.getAllpro())

import * as model from '../models/products.models.js';

export const getAllProducts = async (req,res) => {
    const products = model.getAllProducts();
    return await model.getAllProducts();
    //res.json(services.getAllProducts()); //referencia de products de services
};

export const searchProduct = (req,res) => {
    const {name} = req.query;

    const products = model.getAllProducts();

    const filteredProducts = products.filter((p) => {
        p.name.toLowerCase().includes(name.toLowerCase())
    });
    res.json(filteredProducts);
}

export const getProductById = async (req,res) => {
    const { id } = req.params;
    const product = await model.getProductById(id);
    if (!product) {
        res.status(404).json( {error : "No existe el producto" });
    }
    res.json(product);
};

export const postProduct = (req,res) => {
    const { name, price } = req.body;
    const newProduct = model.postProduct({name,price});

    res.status(201).json(newProduct);

};
//import * as services from '../services/products.services.js';
//la funcion de servicio y controlador se llaman igual, 
// para que no genere erro lo llamo * as services, y lo aplico como funcion (services.getAllpro())

import * as model from '../models/products.models.js';

export const getAllProducts = async (req,res) => {
    try {
        const products = await model.getAllProducts();
        res.json(products);
    } catch (error){
        res.status(500).json({error: error.message});
    }

    //res.json(services.getAllProducts()); //referencia de products de services
};


export const getProductById = async (req,res) => {
    const { id } = req.params; 
    const product = await model.getProductById(id);
    if (!product) {
        res.status(404).json( {error : "No existe el producto" });
    }
    res.json(product);
};


export const createProduct = async(req,res) => {
    const newProduct = req.body; // OTRA forma: const { name, price, categories } = req.body;
    const createdProduct = await model.createProduct(newProduct); //model.createProduct({ name, price, categories });
    res.status(201).json(createdProduct);
};
//otra forma:
export const createProduct2 = async (req, res) => {
  const { name, price, categories } = req.body;

  const newProduct = await model.createProduct2({ name, price, categories });

  res.status(201).json(newProduct);
};



export const updatedProduct = async(req,res) => {
    const {id} = req.params;
    const updatedProductData = req.body;

    const updatedProduct = await model.updatedProduct(id,updatedProductData);

    if(updatedProduct) {
        res.json(updatedProduct);
    } else {
        res.status(404).json({message: "Producto no encontrado"});
    }
};

export const patchProduct = async(req,res) => {
    const {id} = req.params;
    const patchProductData = req.body;

    const patchProduct = await model.patchProduct(id,patchProductData);

    if(patchProduct) {
        res.json(patchProduct);
    } else {
        res.status(404).json({message: "Producto no encontrado"});
    }
};


export const deleteProduct = async (req, res) => {
  const productId = req.params.id; // si fuese SOLO numerico puedo parseInt()
  console.log(productId);

  const product = await model.deleteProduct(productId);

  if (!product) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }
  res.status(204).send();
};

/*

export const searchProduct = (req,res) => {
    const {name} = req.query;

    const products = model.getAllProducts();

    const filteredProducts = products.filter((p) => {
        p.name.toLowerCase().includes(name.toLowerCase())
    });
    res.json(filteredProducts);
}

export const postProduct = (req,res) => {
    const { name, price } = req.body;
    const newProduct = model.postProduct({name,price});

    res.status(201).json(newProduct);

};



*/
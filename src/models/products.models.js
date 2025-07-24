import fs from 'fs';
import path from 'path';
import { db } from './firebase.js';
import {collection, getDoc, getDocs, doc } from "firebase/firestore";

const productsCollection = collection(db, "products");

/*
const __dirname = import.meta.dirname;

const filePath = path.join(__dirname, "./products.json");

const json = fs.readFileSync(filePath, 'utf-8');  

const products = JSON.parse(json);
console.log(products);
*/
export const getAllProducts = async () => {
    try {
        const snapshot = await getDocs(productsCollection); //saca una "foto"
        const products =snapshot.docs.map((doc) => ({  //por cada doc trae id y dato
            id: doc.id,
            ...doc.data(),
        }));
        return products;   //genera un array de products
    } catch (error) { //si falla(no hay internet-no tengo permisos) Hago un catch
        console.error(error);
    }
    
};

export const getProductById = async (id) => {
    try {
        const docRef = doc(productsCollection, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id:docSnap.id, ...docSnap.data()};
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
    }
};

export const postProduct = (data) => { //es cmo poner (name,price)
   // console.log({...data});

    const newProduct = {
        id: products.length +1,
        ...data, //llamo a name,price que cree en el controler.
    };

    products.push(newProduct);
    fs.writeFileSync(filePath, JSON.stringify(products) ); //guardo en el texto el objeto de java product pasado a json.
    return newProduct;
};
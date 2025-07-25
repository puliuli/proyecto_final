import fs from 'fs';
import path from 'path';
import { db } from './firebase.js';
import {collection, getDoc, getDocs, doc, setDoc,addDoc, deleteDoc } from "firebase/firestore";

const productsCollection = collection(db, "products");
//de todo lo de db busca solo productos.

const __dirname = import.meta.dirname;
const filePath = path.join(__dirname, "./products.json");
const json = fs.readFileSync(filePath, 'utf-8');  
const products = JSON.parse(json);
//console.log(products);

export const getAllProducts = async () => { //async usa .then /catch o await
    try { //puede fallar pq las credenciales se vencieron por ejemplo
        const snapshot = await getDocs(productsCollection); //el await espera que se conecte a firebase, y getDocs trae todo los prod y saca una "foto". 
        const products =snapshot.docs.map((doc) => ({  //mapeo y recorro todo los documentos
            id: doc.id, //por cada doc trae id y dato. genera un array con todo los documentos q tengo en la coleccion
            ...doc.data(),
        }));
        return products;   //genera un array de products
    } catch (error) { //si falla(no hay internet-no tengo permisos) Hago un catch
        console.error(error);
        throw new Error("Error con conexion con Firestore");
    }
    
};

/*
doc-->trae REFERENCIA
getDoc-->trae UN documento a partir de referencia (ID)
getDocs-->trae TODOS los documentos
addDoc-->agrega NUEVO documento
deleteDoc-->obtiene referencia a un doc especifico para eliminarlo
setDoc-->Reemplazar data (piso referencia completa)
*/
export const getProductById = async (id) => {
    try {
        const productRef = doc(productsCollection, id); //para un search busco por const q= query(productsCollection,where (field, "==", value)); 
        const snapshot = await getDoc(productRef); //getDocs(q)
        if (snapshot.exists()) {
            return { id:docSnap.id, ...snapshot.data()};
        } else {
            return null;
        }
    } catch (error) {
        console.error(error); //
    }
};

//con base de datos internas:
export const createProduct2 = async(data) => { 
const newProduct = {
    id: products.length + 1,
    ...data,
};
products.push(newProduct);
fs.writeFileSync(jsonPath, JSON.stringify(products)); //gardo
return newProduct;
};

export const createProduct = async(newProduct) => { //otra forma
    try { // addDoc(que coleccion, que cosa queres guardar)
        const docRef = await addDoc(productsCollection, newProduct); //crea objeto con la fata nueva
        return {id: docRef.id, ...newProduct};//veo lo q cree
    } catch (error) {
        console.error(error);
    }
};

//patch
export async function patchProduct (id,updatedProductData)  {
    try {
        const productRef =doc(productsCollection, id);
        const snapshot = await getDoc(productRef);
        if (!snapshot.exists()) {
            return false;
        }
        await setDoc(productRef,updatedProductData, { merge: true }); //merge:put o patch
        return {id, ...updatedProductData};
    } catch (error) {
        console.error(error);
        return null;
    }
};
export async function updatedProduct (id,updatedProductData)  {
    try {
        const productRef =doc(productsCollection, id);
        const snapshot = await getDoc(productRef);
        if (!snapshot.exists()) {
            return false;
        }
        await setDoc(productRef,updatedProductData); 
        return {id, ...updatedProductData};
    } catch (error) {
        console.error(error);
        return null;
    }
};


export const deleteProduct = async(id) => {
    try {
        const productRef = doc(productsCollection,id); //busco por referencia (id)
        const snapshot = await getDoc(productRef);
        if (!snapshot.exists()) { //chequeo si existe
            return false; //si no existe retorna falso
        }
        await deleteDoc(productRef) //si existe lo elimina
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

/*

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


export const deleteProduct2 = (id) => {
    const productIndex = products.findIndex((p) => p.id === id);  // === comprara VALOR Y TIPO
    if(productIndex == -1) {  // == compara VALOR
    return null;
    } else {
        const product = products.splice(productIndez, 1);
        fs.writeFileSync(jsonPath, JSON.stringify(products));
        return product;
        }
    };


*/
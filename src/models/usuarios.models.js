import { db } from './firebase.js';
import {collection, getDocs, doc, query,where, addDoc } from "firebase/firestore";
import bcrypt from 'bcrypt';


const usuariosCollection = collection(db, "usuarios");

export const getAllUsuarios = async () => { 
    try { 
        const snapshot = await getDocs(usuariosCollection);
        const usuarios = snapshot.docs.map((doc) => ({  
            id: doc.id, 
            ...doc.data(),
        }));
    } catch (error) { 
        console.error(error);
        throw new Error("Error con conexión con Firestore");
    }
};
export const getUsuariobyMail = async (email) => { 
    try {
        const q= query(usuariosCollection,where("email", "==",email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            return {id:doc.id,...doc.data()};
        } else {
            return null;   
        };
    } catch (error) {
        console.error(error); //
        throw new Error("Error al obtener usuario");
    }
};



// En createUsuario, antes de guardar:

export const createUsuario = async (usuario) => {
    try {
        const hashedPassword = await bcrypt.hash(usuario.password, 10);
        
        const docRef = await addDoc(usuariosCollection, {
            email: usuario.email,
            name: usuario.name,
            password: hashedPassword  // Guardar contraseña hasheada
        });
        
        return { id: docRef.id, email: usuario.email, name: usuario.name };
    } catch (error) {
        console.error(error);
        throw new Error("Error al crear usuario");
    }
};







/*
export const createUsuario = async (usuario) => {
    try {
        const docRef = await addDoc(usuariosCollection, {
            email: usuario.email,
            name: usuario.name,
            password: usuario.password // ¡En la práctica debería estar hasheado!
        });
        return { id: docRef.id, ...usuario };
    } catch (error) {
        console.error(error);
        throw new Error("Error al crear usuario");
    }
};

// Uso:
await createUsuario({
    email: "correo@gmail.com",
    name: "Pepe",
    password: "strongPass1234"
});

*/
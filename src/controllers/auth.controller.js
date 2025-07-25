// auth.controller.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getUsuariobyMail } from '../models/usuarios.models.js';

export const login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // 1. Buscar usuario por email
        const usuario = await getUsuariobyMail(email);
        
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        // 2. Verificar si el usuario tiene contraseña hasheada
        const isPasswordHashed = usuario.password.startsWith('$2b$');
        
        // 3. Comparar contraseñas
        let match = false;
        
        if (isPasswordHashed) {
            // Contraseña está hasheada, usar bcrypt.compare
            match = await bcrypt.compare(password, usuario.password);
        } else {
            // Contraseña en texto plano (para migración)
            match = (password === usuario.password);
            
            // Si coincide, actualizar a hash
            if (match) {
                const hashedPassword = await bcrypt.hash(password, 10);
                // Aquí deberías agregar código para actualizar el usuario en la base de datos
                console.warn("Actualizar contraseña del usuario a hash");
            }
        }
        
        // 4. Si las contraseñas coinciden, generar token
        if (match) {
            const token = jwt.sign(
                { 
                    id: usuario.id, 
                    email: usuario.email,
                    name: usuario.name
                },
                process.env.JWT_SECRET,
                { expiresIn: '3h' }
            );
            return res.json({ token });
        } else {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }
    } catch (error) {
        console.error("Error en login:", error);
        return res.status(500).json({ error: "Error en el servidor" });
    }
};



/*
const default_user = {
    email:"correo@gmail.com",
    password:"strongPass1234",
};

export const login = (req,res) => {

    if (email == default_user.email && password == default_user.password)  {
        const payload = {id: user.id}; //creo objeto llamado payload q es publico TOKEN basico
        const expiration = {expiresIn: "3h"}; //depende del sistema cuando expira

        const token = jwt.sign(payload, process.env.JWT_SECRET, expiration); //token completo
        return res.json({token});
    } else {
        return res.sendStatus(401).json({error : 'No coinciden sus credenciales'});
    }
    res.json({message:"ok"});
};

////
export const login = async (req,res) => {
    const {email,password} = req.body;
    
    if (!usuario) {
        throw new Error("Usuario no encontrado");
    }

    // Comparar contraseña hasheada (ejemplo con bcrypt)
    const match = await bcrypt.compare(password, usuario.password);
    
    if (match) {
        // Generar token JWT
        return { token: generarToken(usuario) };
    } else {
        throw new Error("Contraseña incorrecta");
    }
};

*/
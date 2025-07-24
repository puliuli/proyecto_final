import jwt from 'jsonwebtoken';

const default_user = {
    id : 1,
    email:"prueba@email.com",
    password:"strongPass123",
};

export const login = async (req,res) => {
    const {email, password} = req.body;
    const user = {id :1, email};

    if (email === default_user.email && password ===default_user.password)  {
        const payload = {id: user.id}; //creo objeto llamado payload q es publico
        const expiration = {expiresIn: "3h"}; //depende del sistema cuando expira

        const token = jwt.sign(payload, process.env.JWT_SECRET, expiration);
        res.json({token});
    } else {
        return res.sendStatus(401).json({error : 'No coinciden sus credenciales'});
    }

    res.json({message : "ok"});
};


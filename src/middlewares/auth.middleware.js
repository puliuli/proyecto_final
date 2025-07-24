import jwt from "jsonwebtoken";

export const auth = (req,res, next) => {
    console.log(req.headers);
    
    const token = req.header["authorization"]?.split("")[1]; //?--> solo si existe .header, usa split

    if (!token) return res.sendStatus(401); //corta con return si no es token valido
    
    jwt.verify(token, process.env.JTW_SECRET, (err) => {
        if(err) return req.sendStatus(403);
        next();
    });
    
};

export const error404 = (req,res,next) => 
    res.status(404).json({error: "Not Found"});

    
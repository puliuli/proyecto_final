import "dotenv/config";
import express from "express";
const app = express();
app.use(express.json()); 

import cors from "cors";
app.use(cors());

import productsRouter from './src/routes/products.router.js';
app.use("/api", productsRouter);

import authRouter from './src/routes/auth.router.js';
app.use("/api/auth",authRouter);

import { error404 } from "./src/middlewares/auth.middleware.js";



app.get('/', (req,res) => {
    res.send("API rest en NODE");
})

app.use(error404);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
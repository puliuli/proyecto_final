import { Router } from "express";
import jwt from 'jsonwebtoken';
import {login} from '../controllers/auth.controller.js'

const router = Router();

router.post("/login", login);  //envio informacion sensible uso POST y no GET

export default router;

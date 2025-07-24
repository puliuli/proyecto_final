import { Router } from "express";
import {login} from '../controllers/auth.controller.js'

const router = Router();

router.post("/login", login);  //envio informacion sensible uso POST y no GET

export default router;

import express from "express";
import { register } from "../controllers/aut.js";
import { login } from "../controllers/aut.js";
const router = express.Router();


router.post ("/register", register);
router.post("/login",login);

export default router
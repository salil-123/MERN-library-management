import express from "express";
import { createReturn, serveReturn, viewReturns ,findReturn } from "../controllers/return.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

router.post("/",createReturn);
router.get("",verifyAdmin,viewReturns);
router.put("/:id",verifyUser,serveReturn);
router.get("/bookId/:bookId",verifyUser,findReturn);

export default router
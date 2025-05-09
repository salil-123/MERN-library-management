
import Book from "../models/Book.js";
import express from "express";
import { createError } from "../utils/error.js";
import { getBookById,createBook, deleteBook, getBook, getBooks, updateBook, getAvailability} from "../controllers/book.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE
router.post("/",verifyAdmin,createBook);

//UPDATE
router.put("/:id",verifyAdmin,updateBook);

//DELETE
router.delete("/:id",verifyAdmin,deleteBook);

//GET
router.get("/:name",getBook);

router.get("/availability/:id", getAvailability);

//GETALL
router.get("/",getBooks);

router.get("/id/:id",getBookById);


export default router
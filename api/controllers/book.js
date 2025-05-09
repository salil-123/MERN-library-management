import Book from "../models/Book.js";
import mongoose from "mongoose";
export const createBook = async (req,res,next)=>{
    const newBook= new Book(req.body)
    try{
        const savedBook= await newBook.save()
        res.status(200).json(savedBook)
    }catch(err){
        next(err);
    }
}
export const updateBook = async (req,res,next)=>{
    try{
        const updatedBook= await Book.findByIdAndUpdate(req.params.id, {$set: req.body},{new:true})
        res.status(200).json(updatedBook);
    }catch(err){
        next(err);
    }
}
export const deleteBook = async (req,res,next)=>{
    try{
        await Book.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel has been deleted.");
    }catch(err){
    next(err);
    }
}
export const getBook = async (req, res, next) => {
    try {
      const searchTerm = req.params.name;
      
      let books = [];
  
      const bookByName = await Book.findOne({ bookName: searchTerm });
      const booksByAuth = await Book.find({ authName: searchTerm });
  
      if (bookByName) {
        books.push(bookByName);
      }
      
      if (booksByAuth && booksByAuth.length > 0) {
        books = books.concat(booksByAuth);
      }
  
      if (books.length > 0) {
        res.status(200).json(books);
      } else {
        res.status(404).json({ message: `No book found with name or author '${searchTerm}'` });
      }
    } catch (err) {
      next(err);
    }
  };
  
export const getBookById = async (req,res,next)=>{
    try{
        const Book1= await Book.findById(req.params.id);
        res.status(200).json(Book1);
    }catch(err){
        next(err);
    }
}

export const getAvailability = async (req,res,next)=>{
    const currentDate = new Date();
    try{
        const Book1= await Book.findById(req.params.id);
        if(Book1.appDate.getTime() + 7 * 24 * 60 * 60 * 1000 < currentDate.getTime()){
            res.status(200).json({availability:"true"});
        }else{
            res.status(403).json({availability:"false"});
        }
    }catch(err){
        next(err);
    }
}
  
  
export const getBooks = async (req, res, next) => {
    try {
        const { limit, featured, popular, top } = req.query;
        const query = {};

        if (typeof featured === 'string') {
            query.featured = featured === 'true';
        }

        if (typeof popular === 'string') {
            query.popular = popular === 'true';
        }

        if (typeof top === 'string') {
            query.top = top === 'true';
        }

        const Books = await Book.find(query).limit(limit);
        res.status(200).json(Books);
    } catch (err) {
        next(err);
    }
}


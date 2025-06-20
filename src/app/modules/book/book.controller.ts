import { Request, Response } from "express";
import Book from "./book.model";
import { IBook } from "./book.interface";

const createBook = async (req: Request, res: Response) => {
   const payload: IBook = req.body;
   console.log({ payload });
   try {
      const data = await Book.create(payload);

      res.status(201).send({
         success: true,
         message: "Book created successfully",
         data: data,
      });
   } catch (error: any) {
      res.status(400).send({
         success: false,
         message: error.message,
         error,
      });
   }
};

const getAllBooks = async (req: Request, res: Response) => {
   try {
      const data = await Book.find();

      res.status(200).send({
         success: true,
         message: "Books retrieved successfully",
         data: data,
      });
   } catch (error: any) {
      res.status(400).send({
         success: false,
         message: error.message,
         error,
      });
   }
};

const getSingleBook = async (req: Request, res: Response) => {
   const { bookId } = req.params;

   try {
      const data = await Book.findById(bookId);

      res.status(200).send({
         success: true,
         message: "Book retrieved successfully",
         data: data,
      });
   } catch (error: any) {
      res.status(400).send({
         success: false,
         message: error.message,
         error,
      });
   }
};
const updateBook = async (req: Request, res: Response) => {
   const { bookId } = req.params;
   const payload = req.body;
   try {
      const data = await Book.findByIdAndUpdate(bookId, payload, {
         new: true,
         runValidators: true, // this will run validators
      });

      res.status(200).send({
         success: true,
         message: "Book updated successfully",
         data: data,
      });
   } catch (error: any) {
      res.status(400).send({
         success: false,
         message: error.message,
         error,
      });
   }
};
const deleteBook = async (req: Request, res: Response) => {
   const { bookId } = req.params;

   try {
      await Book.findByIdAndDelete(bookId);

      res.status(200).send({
         success: true,
         message: "Book deleted successfully",
         data: null,
      });
   } catch (error: any) {
      res.status(400).send({
         success: false,
         message: error.message,
         error,
      });
   }
};

export const mangoController = {
   createBook,
   getAllBooks,
   getSingleBook,
   updateBook,
   deleteBook,
};

/*
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}
*/

import { NextFunction, Request, Response } from "express";
import Book from "./book.model";
import { IBook } from "./book.interface";
import { SortOrder } from "mongoose";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
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
      next(error);
   }
};

const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const filter = req.query.filter ? { genre: req.query.filter } : {};
      const limit = parseInt(req.query.limit as string) || 10;

      const data = await Book.find(filter)
         .sort({ createdAt: (req.query.sort as SortOrder) || "asc" })
         .limit(limit);

      res.status(200).send({
         success: true,
         message: "Books retrieved successfully",
         data: data,
      });
   } catch (error: any) {
      next(error);
   }
};

const getSingleBook = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   const { bookId } = req.params;

   try {
      const data = await Book.findById(bookId);

      res.status(200).send({
         success: true,
         message: "Book retrieved successfully",
         data: data,
      });
   } catch (error: any) {
      next(error);
   }
};
const updateBook = async (req: Request, res: Response, next: NextFunction) => {
   const { bookId } = req.params;
   const payload = req.body;

   if (payload.copies === 0) {
      payload.available = false;
   }
   console.log({ payload });

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
      next(error);
   }
};
const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
   const { bookId } = req.params;

   try {
      await Book.findByIdAndDelete(bookId);

      res.status(200).send({
         success: true,
         message: "Book deleted successfully",
         data: null,
      });
   } catch (error: any) {
      next(error);
   }
};

export const mangoController = {
   createBook,
   getAllBooks,
   getSingleBook,
   updateBook,
   deleteBook,
};

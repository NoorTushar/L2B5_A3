import { NextFunction, Request, Response } from "express";
import { IBorrow } from "./borrow.interface";
import Borrow from "./borrow.model";

const createBorrow = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   const payload: IBorrow = req.body;

   try {
      const data = await Borrow.create(payload);

      // update the availability to `false` if copies become 0
      // using static method
      await Borrow.updateAvailability(data.book);

      res.status(201).send({
         success: true,
         message: "Book borrowed successfully",
         data: data,
      });
   } catch (error: any) {
      next(error);
   }
};

const getAllBorrows = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const data = await Borrow.find().populate("book");

      res.status(200).send({
         success: true,
         message: "Borrow list retrieved successfully",
         data: data,
      });
   } catch (error: any) {
      next(error);
   }
};

const getBorrowSummary = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const data = await Borrow.aggregate([
         {
            $group: { _id: "$book", totalQuantity: { $sum: "$quantity" } },
         },
         {
            $lookup: {
               from: "books",
               localField: "_id",
               foreignField: "_id",
               as: "bookDetails",
            },
         },
         {
            $unwind: "$bookDetails",
         },
         {
            $project: {
               book: {
                  title: "$bookDetails.title",
                  isbn: "$bookDetails.isbn",
               },
               totalQuantity: "$totalQuantity",

               _id: 0,
            },
         },
      ]);

      res.status(200).send({
         success: true,
         message: "Borrowed books summary retrieved successfully",
         data: data,
      });
   } catch (error: any) {
      next(error);
   }
};

export const borrowController = {
   createBorrow,
   getAllBorrows,
   getBorrowSummary,
};

/*
db.borrows.aggregate([
  {
    $group: {
      _id: "$book",
      totalQuantity: { $sum: "$quantity" },
    },
  },
  {
    $lookup: {
      from: "books",
      localField: "_id",
      foreignField: "_id",
      as: "bookDetails",
    },
  },
  {
    $unwind: "$bookDetails",
  },
  {
    $project: {
      book: {
        title: "$bookDetails.title",
        isbn: "$bookDetails.isbn",
      },
      totalQuantity: 1,
      _id: 0,
    },
  },
]);

*/

import { model, Schema } from "mongoose";
import { IBorrow } from "./borrow.interface";
import Book from "../book/book.model";
import { IBook } from "../book/book.interface";

const borrowSchema = new Schema<IBorrow>(
   {
      book: {
         type: Schema.ObjectId,
         required: [true, "Must provide a book title"],
         ref: "Book",
      },
      quantity: {
         type: Number,
         required: [true, "Must provide a quantity to borrow."],
         min: [1, "Must borrow atleast quantity of 1."],
      },
      dueDate: {
         type: Date,
         required: [true, "Must provide the due date"],
      },
   },
   {
      timestamps: true,
      versionKey: false,
   }
);

// pre-hook middleware: before borrowing check book availability
borrowSchema.pre("save", async function (next) {
   // fetch the book which wants to be borrowed
   const book: IBook | null = await Book.findById(this.book);

   // if invalid bookId then throw Error
   if (!book) {
      throw new Error("The book does not exist.");
   }

   // if the quantity asked to borrow is not in stock, throw Error
   if (book.copies < this.quantity) {
      throw new Error(
         `Insufficient book stock. You are trying to borrow ${this.quantity} pcs while the book has got ${book.copies} pcs`
      );
   }

   next();
});

// post-hook middleware: after borrowing update the book quantity
borrowSchema.post("save", async function (doc) {
   await Book.findByIdAndUpdate(doc.book, {
      $inc: { copies: -doc.quantity },
   });
});

const Borrow = model<IBorrow>("Borrow", borrowSchema);

export default Borrow;

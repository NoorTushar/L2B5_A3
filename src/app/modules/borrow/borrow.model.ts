import { model, Schema } from "mongoose";
import { IBorrow } from "./borrow.interface";

const borrowSchema = new Schema<IBorrow>(
   {
      book: {
         type: Schema.ObjectId,
         required: [true, "Must provide a book title"],
         ref: "Book",
      },
      quantity: {
         type: Number,
         required: [true, "Must provide quantity to borrow."],
         min: 1,
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

const Borrow = model<IBorrow>("Borrow", borrowSchema);

export default Borrow;
// book (objectId) — Mandatory. References the borrowed book’s ID.
// quantity (number) — Mandatory. Positive integer representing the number of copies borrowed.
// dueDate (date) — Mandatory. The date by which the book must be returned.

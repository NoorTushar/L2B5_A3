import { Schema } from "mongoose";
import { IBook } from "./book.interface";

const bookSchema = new Schema<IBook>(
   {
      title: {
         type: String,
         required: true,
         trim: true,
      },
      author: {
         type: String,
         required: true,
         trim: true,
      },
      genre: {
         type: String,
         required: true,
         enum: [
            "FICTION",
            "NON_FICTION",
            "SCIENCE",
            "HISTORY",
            "BIOGRAPHY",
            "FANTASY",
         ],
      },
      isbn: {
         type: String,
         required: true,
         trim: true,
         unique: true,
      },
      description: {
         type: String,
         trim: true,
         required: false,
      },
      copies: {
         type: Number,
         required: true,
         min: 0,
      },
      available: {
         type: Boolean,
         default: true,
         required: true,
      },
   },
   {
      timestamps: true,
   }
);

// interface IBook {
//     title: string;
//     author: string;
//     genre:
//        | "FICTION"
//        | "NON_FICTION"
//        | "SCIENCE"
//        | "HISTORY"
//        | "BIOGRAPHY"
//        | "FANTASY";
//     isbn: string;
//     description?: string;
//     copies: number;
//     available: boolean;
//  }

// title (string) — Mandatory. The book’s title.
// author (string) — Mandatory. The book’s author.
// genre (string) — Mandatory. Must be one of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY.
// isbn (string) — Mandatory and unique. The book’s International Standard Book Number.
// description (string) — Optional. A brief summary or description of the book.
// copies (number) — Mandatory. Non-negative integer representing total copies available.
// available (boolean) — Defaults to true. Indicates if the book is currently available for borrowing.

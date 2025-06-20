import { Router } from "express";
import {
   createBook,
   deleteBook,
   getAllBooks,
   getSingleBook,
   updateBook,
} from "./book.controller";

const bookRoute = Router();

bookRoute.post("/", createBook);
bookRoute.get("/:bookId", getSingleBook);
bookRoute.get("/", getAllBooks);
bookRoute.put("/:bookId", updateBook);
bookRoute.delete("/:bookId", deleteBook);

export default bookRoute;

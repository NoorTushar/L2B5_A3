import { Router } from "express";
import { mangoController } from "./book.controller";

const bookRoute = Router();

bookRoute.post("/", mangoController.createBook);
bookRoute.get("/:bookId", mangoController.getSingleBook);
bookRoute.get("/", mangoController.getAllBooks);
bookRoute.put("/:bookId", mangoController.updateBook);
bookRoute.delete("/:bookId", mangoController.deleteBook);

export default bookRoute;

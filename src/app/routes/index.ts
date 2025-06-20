import { Router } from "express";
import bookRoute from "../modules/book/book.route";

const routes = Router();

routes.use("/api/books", bookRoute);

export default routes;

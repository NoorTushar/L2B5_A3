import { Router } from "express";
import { borrowController } from "./borrow.controller";

const borrowRoute = Router();

borrowRoute.post("/", borrowController.createBorrow);
borrowRoute.get("/all", borrowController.getAllBorrows);
borrowRoute.get("/", borrowController.getBorrowSummary);

export default borrowRoute;

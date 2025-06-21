"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mangoController = void 0;
const book_model_1 = __importDefault(require("./book.model"));
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    console.log({ payload });
    try {
        const data = yield book_model_1.default.create(payload);
        res.status(201).send({
            success: true,
            message: "Book created successfully",
            data: data,
        });
    }
    catch (error) {
        res.status(400).send({
            success: false,
            message: error.message,
            error,
        });
    }
});
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield book_model_1.default.find();
        res.status(200).send({
            success: true,
            message: "Books retrieved successfully",
            data: data,
        });
    }
    catch (error) {
        res.status(400).send({
            success: false,
            message: error.message,
            error,
        });
    }
});
const getSingleBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    try {
        const data = yield book_model_1.default.findById(bookId);
        res.status(200).send({
            success: true,
            message: "Book retrieved successfully",
            data: data,
        });
    }
    catch (error) {
        res.status(400).send({
            success: false,
            message: error.message,
            error,
        });
    }
});
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const payload = req.body;
    try {
        const data = yield book_model_1.default.findByIdAndUpdate(bookId, payload, {
            new: true,
            runValidators: true, // this will run validators
        });
        res.status(200).send({
            success: true,
            message: "Book updated successfully",
            data: data,
        });
    }
    catch (error) {
        res.status(400).send({
            success: false,
            message: error.message,
            error,
        });
    }
});
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    try {
        yield book_model_1.default.findByIdAndDelete(bookId);
        res.status(200).send({
            success: true,
            message: "Book deleted successfully",
            data: null,
        });
    }
    catch (error) {
        res.status(400).send({
            success: false,
            message: error.message,
            error,
        });
    }
});
exports.mangoController = {
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

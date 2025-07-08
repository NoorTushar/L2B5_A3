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
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        next(error);
    }
});
const getAllBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = req.query.filter ? { genre: req.query.filter } : {};
        const limit = parseInt(req.query.limit) || 10;
        const data = yield book_model_1.default.find(filter)
            .sort({ createdAt: req.query.sort || "asc" })
            .limit(limit);
        res.status(200).send({
            success: true,
            message: "Books retrieved successfully",
            data: data,
        });
    }
    catch (error) {
        next(error);
    }
});
const getSingleBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        next(error);
    }
});
const updateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const payload = req.body;
    if (payload.copies === 0) {
        payload.available = false;
    }
    console.log({ payload });
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
        next(error);
    }
});
const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        next(error);
    }
});
exports.mangoController = {
    createBook,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteBook,
};

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
const mongoose_1 = require("mongoose");
const book_model_1 = __importDefault(require("../book/book.model"));
const borrowSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.ObjectId,
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
}, {
    timestamps: true,
    versionKey: false,
});
// pre-hook middleware: before borrowing check book availability
borrowSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // fetch the book which wants to be borrowed
        const book = yield book_model_1.default.findById(this.book);
        // if invalid bookId then throw Error
        if (!book) {
            throw new Error("The book does not exist.");
        }
        // if the quantity asked to borrow is not in stock, throw Error
        if (book.copies < this.quantity) {
            throw new Error(`Insufficient book stock. You are trying to borrow ${this.quantity} pcs while the book has got ${book.copies} pcs`);
        }
        next();
    });
});
// post-hook middleware: after borrowing update the book quantity
borrowSchema.post("save", function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        yield book_model_1.default.findByIdAndUpdate(doc.book, {
            $inc: { copies: -doc.quantity },
        });
    });
});
const Borrow = (0, mongoose_1.model)("Borrow", borrowSchema);
exports.default = Borrow;

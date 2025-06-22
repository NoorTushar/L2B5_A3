"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Must provide a book title"],
        trim: true,
    },
    author: {
        type: String,
        required: [true, "Must provide an author name"],
        trim: true,
    },
    genre: {
        type: String,
        required: true,
        enum: {
            values: [
                "FICTION",
                "NON_FICTION",
                "SCIENCE",
                "HISTORY",
                "BIOGRAPHY",
                "FANTASY",
            ],
            message: "Must provide a valid genre. {VALUE} is not a valid genre.",
        },
    },
    isbn: {
        type: String,
        required: [true, "Must provide an isbn."],
        trim: true,
        unique: [
            true,
            "Must provide an unique isbn. This isbn already exist.",
        ],
    },
    description: {
        type: String,
        trim: true,
        required: false,
    },
    copies: {
        type: Number,
        required: [true, "Must provide 'copies' quantity amount."],
        min: [0, "Copies must be a positive number"],
    },
    available: {
        type: Boolean,
        default: true,
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
const Book = (0, mongoose_1.model)("Book", bookSchema);
exports.default = Book;
// title (string) — Mandatory. The book’s title.
// author (string) — Mandatory. The book’s author.
// genre (string) — Mandatory. Must be one of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY.
// isbn (string) — Mandatory and unique. The book’s International Standard Book Number.
// description (string) — Optional. A brief summary or description of the book.
// copies (number) — Mandatory. Non-negative integer representing total copies available.
// available (boolean) — Defaults to true. Indicates if the book is currently available for borrowing.

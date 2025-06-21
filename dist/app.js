"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(routes_1.default);
app.get("/", (req, res) => {
    res.send("Hello from server");
});
app.use((req, res, next) => {
    res.status(404).send({
        message: "Route not found 😔",
    });
});
app.use((error, req, res, next) => {
    if (error) {
        res.status(400).send({
            message: "Something went wrong",
            error: error,
        });
    }
});
exports.default = app;

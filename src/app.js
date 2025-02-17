"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("module-alias/register");
const errorHandler_1 = require("./middlewares/errorHandler");
const modelLists_1 = require("./models/modelLists");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
// middlewares
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(express_1.default.static('uploads'));
app.use((req, res, next) => {
    console.log(req.url);
    next();
});
// Models
modelLists_1.modelLists;
// Routes
app.use("/api", routes_1.default);
// global error handling
app.use(errorHandler_1.errorHandler);
exports.default = app;

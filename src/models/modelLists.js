"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelLists = void 0;
const admin_model_1 = __importDefault(require("./admin.model"));
const booking_model_1 = __importDefault(require("./booking.model"));
const movie_model_1 = __importDefault(require("./movie.model"));
const user_model_1 = __importDefault(require("./user.model"));
exports.modelLists = [
    admin_model_1.default,
    booking_model_1.default,
    movie_model_1.default,
    user_model_1.default
];

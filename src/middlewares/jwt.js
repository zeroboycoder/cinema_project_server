"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { JWT_SECRET } = process.env;
const generateToken = (data) => {
    return jsonwebtoken_1.default.sign(data, JWT_SECRET);
};
exports.generateToken = generateToken;
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, payload) => {
            const result = payload;
            if (err) {
                throw err;
            }
            if (result.type === 'admin') {
                req.admin = result;
            }
            req.user = result;
            next();
        });
    }
    else {
        throw new Error("Unauthorized");
    }
};
exports.verifyToken = verifyToken;

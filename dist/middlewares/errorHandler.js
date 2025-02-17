"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, req, res, next) => {
    const statusCode = error.statusCode || 400;
    res.status(500).json({
        name: error.name,
        statusCode,
        message: error.message
    });
};
exports.errorHandler = errorHandler;

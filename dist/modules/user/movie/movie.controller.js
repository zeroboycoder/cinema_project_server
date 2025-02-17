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
exports.getMovieDetail = exports.getMovies = void 0;
const sequelize_1 = require("sequelize");
const movie_model_1 = __importDefault(require("@models/movie.model"));
const response_1 = require("@utils/response");
const getMovies = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { page = 1, pageSize = 10, order = "DESC", search } = req.query;
        page = Number(page);
        pageSize = Number(pageSize);
        order = String(order);
        search = String(search);
        let where = {};
        if (search) {
            where["name"] = {
                [sequelize_1.Op.like]: `%${search}%`
            };
        }
        const movies = yield movie_model_1.default.findAll({
            where,
            limit: pageSize,
            offset: (page - 1) * pageSize,
            order: [["createdAt", order]]
        });
        return (0, response_1.successResponse)(res, "Successfully retrived", movies);
    }
    catch (error) {
        next(error);
    }
});
exports.getMovies = getMovies;
const getMovieDetail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const movie = yield movie_model_1.default.findOne({
            where: {
                id
            }
        });
        (0, response_1.successResponse)(res, "Successfully retrived", movie);
    }
    catch (error) {
        next(error);
    }
});
exports.getMovieDetail = getMovieDetail;

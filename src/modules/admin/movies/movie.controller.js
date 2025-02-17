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
exports.uploadMovie = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const movie_model_1 = __importDefault(require("@models/movie.model"));
const file_1 = require("@utils/file");
const response_1 = require("@utils/response");
const uploadMovie = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name, description, duration } = req.body;
        const result = yield (0, file_1.fileUpload)(req.file);
        const url = result.secure_url;
        yield movie_model_1.default.create({
            name,
            description,
            image: url,
            duration
        });
        // delete the file
        fs_1.default.unlinkSync(path_1.default.resolve(__dirname, `../../../uploads/${(_a = req.file) === null || _a === void 0 ? void 0 : _a.filename}`));
        return (0, response_1.successResponse)(res, "Successfully created", {});
    }
    catch (error) {
        console.log({ error });
        next(error);
    }
});
exports.uploadMovie = uploadMovie;

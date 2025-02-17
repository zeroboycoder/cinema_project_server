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
exports.updateUserProfile = exports.getUserProfileById = void 0;
const user_model_1 = __importDefault(require("@models/user.model"));
const index_1 = require("@utils/index");
const response_1 = require("@utils/response");
const getUserProfileById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = (0, index_1.p)(req);
        if (!params.userId)
            throw new Error("User id is required");
        const user = yield user_model_1.default.findOne({
            where: {
                id: params.userId
            },
            attributes: ["id", "email", "name"]
        });
        return (0, response_1.successResponse)(res, "Successfully retrived", user);
    }
    catch (error) {
        next(error);
    }
});
exports.getUserProfileById = getUserProfileById;
const updateUserProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = (0, index_1.p)(req);
        if (!params.userId)
            throw new Error("User id is required");
        const user = yield user_model_1.default.findOne({
            where: {
                id: params.userId
            }
        });
        if (!user) {
            throw new Error("User not found");
        }
        yield user_model_1.default.update({
            name: params.name,
            email: params.email
        }, {
            where: {
                id: user.id
            }
        });
        return (0, response_1.successResponse)(res, "Successfully updated", {});
    }
    catch (error) {
        next(error);
    }
});
exports.updateUserProfile = updateUserProfile;

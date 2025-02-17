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
exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("@models/user.model"));
const response_1 = require("@utils/response");
const jwt_1 = require("@middlewares/jwt");
const index_1 = require("@utils/index");
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = (0, index_1.cleanObj)(req.body);
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        // check the user exist or not
        const user = yield user_model_1.default.findOne({
            where: {
                email
            }
        });
        if (user) {
            throw new Error('User already exist');
        }
        const newUser = yield user_model_1.default.create({
            email,
            password: hashedPassword
        });
        // generate token
        const token = (0, jwt_1.generateToken)({ id: newUser.id, type: 'user' });
        (0, response_1.successResponse)(res, 'Register successfully', { token });
    }
    catch (error) {
        console.log("error : ");
        next(error);
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = (0, index_1.cleanObj)(req.body);
        const user = yield user_model_1.default.findOne({
            where: {
                email
            }
        });
        if (!user) {
            throw new Error('User not found');
        }
        const validPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!validPassword) {
            throw new Error('Invalid credentials');
        }
        // generate token
        const token = (0, jwt_1.generateToken)({ id: user.id, type: 'user' });
        (0, response_1.successResponse)(res, 'Login successfully', { token });
    }
    catch (error) {
        next(error);
    }
});
exports.loginUser = loginUser;

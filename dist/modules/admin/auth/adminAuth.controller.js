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
exports.loginAdmin = exports.registerAdmin = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const admin_model_1 = __importDefault(require("@models/admin.model"));
const response_1 = require("@utils/response");
const jwt_1 = require("@middlewares/jwt");
const index_1 = require("@utils/index");
const registerAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = (0, index_1.cleanObj)(req.body);
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const newAdmin = yield admin_model_1.default.create({
            email,
            password: hashedPassword
        });
        // generate token
        const token = (0, jwt_1.generateToken)({ id: newAdmin.id, type: 'admin' });
        (0, response_1.successResponse)(res, 'Register successfully', { token });
    }
    catch (error) {
        console.log("error : ");
        next(error);
    }
});
exports.registerAdmin = registerAdmin;
const loginAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = (0, index_1.cleanObj)(req.body);
        const admin = yield admin_model_1.default.findOne({
            where: {
                email
            }
        });
        if (!admin) {
            throw new Error('User not found');
        }
        const validPassword = yield bcrypt_1.default.compare(password, admin.password);
        if (!validPassword) {
            throw new Error('Invalid credentials');
        }
        // generate token
        const token = (0, jwt_1.generateToken)({ id: admin.id, type: 'admin' });
        (0, response_1.successResponse)(res, 'Login successfully', { token });
    }
    catch (error) {
        next(error);
    }
});
exports.loginAdmin = loginAdmin;

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
exports.getBookingDetail = exports.getBookings = exports.makeBooking = void 0;
const booking_model_1 = __importDefault(require("@models/booking.model"));
const response_1 = require("@utils/response");
const makeBooking = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.user;
        let { movie_id, seat_number, showing_time, card_number, mmyy, cvv } = req.query;
        yield booking_model_1.default.create({
            user_id: id,
            movie_id,
            seat_number,
            showing_time,
            card_number,
            mmyy,
            cvv
        });
        return (0, response_1.successResponse)(res, "Successfully make booking", {});
    }
    catch (error) {
        next(error);
    }
});
exports.makeBooking = makeBooking;
const getBookings = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.user;
        let { page = 1, pageSize = 10, order = "DESC" } = req.query;
        page = Number(page);
        pageSize = Number(pageSize);
        order = String(order);
        const bookings = yield booking_model_1.default.findAll({
            where: {
                user_id: id
            },
            limit: pageSize,
            offset: (page - 1) * pageSize,
            order: [["createdAt", order]]
        });
        return (0, response_1.successResponse)(res, "Successfully retrived", bookings);
    }
    catch (error) {
        next(error);
    }
});
exports.getBookings = getBookings;
const getBookingDetail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.user;
        const { booking_id } = req.params;
        const booking = yield booking_model_1.default.findOne({
            where: {
                id: booking_id,
                user_id: id
            }
        });
        return (0, response_1.successResponse)(res, "Successfully retrived", booking);
    }
    catch (error) {
        next(error);
    }
});
exports.getBookingDetail = getBookingDetail;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userAuth_routes_1 = __importDefault(require("../modules/user/auth/userAuth.routes"));
const userProfile_routes_1 = __importDefault(require("../modules/user/profile/userProfile.routes"));
const movie_routes_1 = __importDefault(require("../modules/user/movie/movie.routes"));
const booking_routes_1 = __importDefault(require("../modules/user/booking/booking.routes"));
const route = (0, express_1.Router)();
route.use('/auth', userAuth_routes_1.default);
route.use('/profile', userProfile_routes_1.default);
route.use('/movies', movie_routes_1.default);
route.use('/bookings', booking_routes_1.default);
exports.default = route;

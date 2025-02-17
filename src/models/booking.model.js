"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = require(".");
const user_model_1 = __importDefault(require("./user.model"));
const movie_model_1 = __importDefault(require("./movie.model"));
class Booking extends sequelize_1.Model {
}
Booking.init({
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    seat_number: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    movie_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    showing_time: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    card_number: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    mmyy: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    cvv: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE(6),
        allowNull: true,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE(6),
        allowNull: true,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: _1.sequelize,
    modelName: "Booking",
    tableName: "booking",
    timestamps: true,
    paranoid: false
});
user_model_1.default.hasMany(Booking, {
    foreignKey: 'user_id',
    sourceKey: 'id',
    as: 'bookings'
});
Booking.belongsTo(user_model_1.default, {
    foreignKey: 'user_id',
    targetKey: 'id',
    as: 'user'
});
movie_model_1.default.hasMany(Booking, {
    foreignKey: 'movie_id',
    sourceKey: 'id',
    as: 'bookings'
});
Booking.belongsTo(movie_model_1.default, {
    foreignKey: 'movie_id',
    targetKey: 'id',
    as: 'movie'
});
exports.default = Booking;

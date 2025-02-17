"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = require(".");
class Movie extends sequelize_1.Model {
}
Movie.init({
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    duration: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
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
    modelName: "Movie",
    tableName: "movie",
    timestamps: true,
    paranoid: false
});
exports.default = Movie;

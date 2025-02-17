'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
require('dotenv').config();
const Sequelize = require('sequelize');
const db = {};
const { DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_DIALECT, } = process.env;
exports.sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT,
    logging: false,
});
db.sequelize = exports.sequelize;
db.Sequelize = Sequelize;
exports.default = db;

'use strict';

require('dotenv').config();

const Sequelize = require('sequelize');
const db: any = {};
const {
  DB_NAME,
  DB_USER,
  DB_PASS,
  DB_HOST,
  DB_PORT,
  DB_DIALECT,
} = process.env;

export let sequelize: any;

sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT,
  logging: false,
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;


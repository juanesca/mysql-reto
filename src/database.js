const MySQL = require("mysql");
const { promisify } = require("util");

require('dotenv').config();



const db = MySQL.createPool({
  host: 'bhzgkv18y4fjeez0nw4d-mysql.services.clever-cloud.com',
  user: 'uypxdjhtlxni25dm',
  password: 'XvECT2rpiaFIQcGCQY0p',
  database: 'bhzgkv18y4fjeez0nw4d',
  connectionLimit: 10
});

db.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Databse connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Databse has to many connections.");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused.");
    }
  }

  if (connection) connection.release();
  console.log("DB is connected");

  return;
});

db.query = promisify(db.query);

module.exports = db;

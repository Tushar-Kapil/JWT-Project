const { Pool } = require("pg");

const pool = new Pool({
  user: "tushar",
  password: "",
  host: "localhost",
  port: 5432,
  database: "jwt",
});

module.exports = pool;

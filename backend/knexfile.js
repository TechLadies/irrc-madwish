require("dotenv").config();
const parse = require("pg-connection-string").parse;

module.exports = {
  development: {
    client: "pg",
    useNullAsDefault: true,
    connection: {
      user: process.env.DB_USERNAME || "postgres",
      password: process.env.DB_PASSWORD,
      database: "irrc_development",
    },
  },
  test: {
    client: "pg",
    useNullAsDefault: true,
    connection: {
      user: process.env.DB_USERNAME || "postgres",
      password: process.env.DB_PASSWORD,
      database: "irrc_test",
    },
  },
  production: {
    client: "pg",
    useNullAsDefault: true,
    connection: {
      ...parse(process.env.DATABASE_URL || ""),
      ssl: {
        rejectUnauthorized: false,
      },
    },
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
};

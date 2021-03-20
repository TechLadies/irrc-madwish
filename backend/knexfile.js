require("dotenv").config();

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
    connection: `${process.env.DATABASE_URL}?ssl=true`,
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
};

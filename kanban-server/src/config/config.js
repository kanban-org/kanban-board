if (process.env.NODE_ENV !== 'production') require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    host: '0.0.0.0',
    dialect: process.env.DB_DIALECT,
    logging: false,
  },

  production: {
    username: process.env.DB_PROD_USERNAME,
    password: process.env.DB_PROD_PASSWORD,
    database: process.env.DB_PROD_DATABASE,
    port: process.env.DB_PROD_PORT,
    host: '0.0.0.0',
    dialect: process.env.DB_PROD_DIALECT,
    logging: false,
  },
};

const { Client } = require('pg');
require('dotenv').config()

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS
});

client
  .connect()
  .then(() => console.log(`Connected to ${process.env.DB_NAME} on ${process.env.DB_HOST}`))
  .catch(err => console.error('Connection Error', err.stack));

module.exports = client;
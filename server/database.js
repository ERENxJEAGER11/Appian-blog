const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 3001,
  user: 'postgres',
  password: '@m@n$#@!k#',
  database: 'APPIAN_BLOG',
});

module.exports = pool;

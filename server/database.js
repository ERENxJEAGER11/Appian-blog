const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'Nuc@1234$*',
  database: 'APPIAN BLOG',
});

module.exports = pool;

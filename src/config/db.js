const { Pool } = require('pg');

module.exports = new Pool({
  user: 'italoteix',
  password: '',
  database: 'foodfy',
  host: 'localhost',
  port: 5432
});

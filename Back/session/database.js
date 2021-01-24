/**
 * Just the PostGre SQL pool
 */
var postgresql = require('pg').Pool;

const poolpgsql = new postgresql({
    user: 'Baptiste',
    host: 'localhost',
    database: 'hms',
    password: 'TotoTiti23',
    port: 5432,
  })
  
module.exports = poolpgsql;

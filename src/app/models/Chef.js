const db = require('../../config/db');

module.exports = {
  all(callback) {
    db.query('SELECT * FROM chefs', function(err, results) {
      if (err) throw `Database error! ${err}`;

      callback(results.rows);
    });
  },
  create(data, callback) {
    const query = `
      INSERT INTO chefs (
        name,
        avatar_url
      ) VALUES ($1, $2)
      RETURNING id;
    `;

    db.query(query, [data.name, data.avatar_url], function(err, results) {
      if (err) throw `Database error! ${err}`;

      callback(results.rows[0]);
    })
  }
};

const db = require('../../config/db');

module.exports = {
  all(callback) {
    db.query('SELECT * FROM recipes', function(err, results) {
      if (err) throw `Database error! ${err}`;

      callback(results.rows);
    })
  },
  create(data, callback) {
    const query = `
      INSERT INTO recipes (
        chef_id,
        image,
        title,
        ingredients,
        preparation,
        information
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `;

    const values = [
      data.chef_id,
      data.image,
      data.title,
      data.ingredients,
      data.preparation,
      data.information
    ];

    db.query(query, values, function(err, results) {
      if (err) throw `Database error! ${err}`;

      callback(results.rows[0]);
    });
  },
  find(id, callback) {
    db.query(
      `
        SELECT recipes.*, chefs.name AS chef_name
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        WHERE recipes.id = $1
      `, [id], function(err, results) {
        if (err) throw `Database error! ${err}`;

        callback(results.rows[0]);
      }
    );
  },
  chefsAvailable(callback) {
    db.query('SELECT id, name FROM chefs', function(err, results) {
      if (err) throw `Database error! ${err}`;

      callback(results.rows);
    });
  }
};

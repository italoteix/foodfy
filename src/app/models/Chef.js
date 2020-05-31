const db = require('../../config/db');

module.exports = {
  all(callback) {
    db.query(`
      SELECT chefs.*, count(recipes) AS recipes_count
      FROM chefs
      LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
      GROUP BY chefs.id
      ORDER BY recipes_count DESC
    `, function(err, results) {
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
    });
  },
  find(id, callback) {
    const query = `
      SELECT chefs.*, count(recipes) AS recipes_count
      FROM chefs
      LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
      WHERE chefs.id = $1
      GROUP BY chefs.id;
    `;

    db.query(query, [id], function(err, results) {
      if (err) throw `Database error! ${err}`;

      callback(results.rows[0]);
    });
  },
  findRecipes(id, callback) {
    db.query('SELECT id, title, image FROM recipes WHERE chef_id = $1;', [id], function(err, results) {
      if (err) throw `Database error! ${err}`;

      callback(results.rows);
    });
  },
  update(data, callback) {
    const query = `
      UPDATE chefs SET
        name = $1,
        avatar_url = $2
      WHERE id = $3
    `;

    const values = [
      data.name,
      data.avatar_url,
      data.id
    ];

    db.query(query, values, function(err, results) {
      if (err) throw `Database error! ${err}`;

      callback();
    });
  },
  delete(id, callback) {
    db.query('DELETE FROM chefs WHERE id = $1', [id], function(err, results) {
      if (err) throw `Database error! ${err}`;

      callback();
    });
  }
};

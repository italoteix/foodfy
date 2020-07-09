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
  create(name, file_id) {
    const query = `
      INSERT INTO chefs (
        name,
        file_id
      ) VALUES ($1, $2)
      RETURNING id;
    `;

    return db.query(query, [name, file_id]);
  },
  find(id) {
    const query = `
      SELECT chefs.*, count(recipes) AS recipes_count
      FROM chefs
      LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
      WHERE chefs.id = $1
      GROUP BY chefs.id;
    `;

    return db.query(query, [id]);
  },
  findRecipes(id, callback) {
    db.query('SELECT id, title FROM recipes WHERE chef_id = $1;', [id], function(err, results) {
      if (err) throw `Database error! ${err}`;

      callback(results.rows);
    });
  },
  update(data) {
    const query = `
      UPDATE chefs SET
        name = $1,
        file_id = $2
      WHERE id = $3
    `;

    const values = [
      data.name,
      data.file_id,
      data.id
    ];

    return db.query(query, values);
  },
  delete(id, callback) {
    db.query('DELETE FROM chefs WHERE id = $1', [id], function(err, results) {
      if (err) throw `Database error! ${err}`;

      callback();
    });
  }
};

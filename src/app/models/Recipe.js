const db = require('../../config/db');

module.exports = {
  all(callback) {
    db.query(`
      SELECT recipes.*, chefs.name AS chef_name 
      FROM recipes
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)`
      , function(err, results) {
      if (err) throw `Database error! ${err}`;

      callback(results.rows);
    })
  },
  create(data) {
    const query = `
      INSERT INTO recipes (
        chef_id,
        title,
        ingredients,
        preparation,
        information
      ) VALUES ($1, $2, $3, $4, $5)
      RETURNING id;
    `;

    const values = [
      data.chef_id,
      data.title,
      data.ingredients,
      data.preparation,
      data.information
    ];

    return db.query(query, values);
  },
  find(id) {
    return db.query(
      `
        SELECT recipes.*, chefs.name AS chef_name
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        WHERE recipes.id = $1;
      `, [id]);
  },
  findBy(filter, callback) {
    db.query(
      `
        SELECT recipes.*, chefs.name AS chef_name
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        WHERE recipes.title ILIKE '%${filter}%'
      `, function(err, results) {
        if (err) throw `Database error! ${err}`;

        callback(results.rows);
      }
    );
  },
  update(data) {
    const query = `
      UPDATE recipes SET
        chef_id = $1,
        title = $2,
        ingredients = $3,
        preparation = $4,
        information = $5
      WHERE id = $6
    `;

    const values = [
      data.chef_id,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      data.id,
    ];

    return db.query(query, values);
  },
  delete(id, callback) {
    return db.query('DELETE FROM recipes WHERE id = $1', [id]);
  },
  chefsAvailable() {
    return db.query('SELECT id, name FROM chefs');
  },
  pagination(limit, offset, callback) {
    const query = `
      SELECT recipes.*, (SELECT count(*) FROM recipes) AS total, chefs.name AS chef_name
      FROM recipes
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
      LIMIT $1 OFFSET $2
    `;

    db.query(query, [limit, offset], function(err, results) {
      if (err) throw `Database error! ${err}`;

      callback(results.rows);
    });
  },
  files(id) {
    const query = `
      SELECT files.*
      FROM recipe_files
      LEFT JOIN files ON recipe_files.file_id = files.id
      WHERE recipe_files.recipe_id = $1;
    `;

    return db.query(query, [id]);
  }
};

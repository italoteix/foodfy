const db = require('../../config/db');

module.exports = {
  create(recipe_id, file_id) {
    const query = `
      INSERT INTO recipe_files (
        recipe_id,
        file_id
      ) VALUES ($1, $2)
      RETURNING id;
    `;

    return db.query(query, [recipe_id, file_id]);
  }, 
  deleteByFile(file_id) {
    return db.query('DELETE FROM recipe_files WHERE file_id = $1', [file_id]);
  },
  deleteByRecipe(recipe_id) {
    return db.query('DELETE FROM recipe_files WHERE recipe_id = $1', [recipe_id]);
  }
}

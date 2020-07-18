const Recipe = require('../models/Recipe');
const File = require('../models/File');
const RecipeFile = require('../models/RecipeFile');

module.exports = {
  async index(req, res) {
    try {
      let results = await Recipe.all();
      const recipes = results.rows;

      return res.render('admin/recipes/index', { recipes });
    } catch (err) {
      return res.send(err);
    }
  },
  async create(req, res) {
    try {
      const options = await Recipe.chefsAvailable();
      return res.render('admin/recipes/create', { chefOptions: options.rows });
    } catch (err ) {
      console.log(err);
    }
  },
  async show(req, res) {
    const { id } = req.params;

    try {
      const recipe = (await Recipe.find(id)).rows[0];
      
      if (!recipe) return res.send('Recipe not found!');
      
      const files = (await Recipe.files(id)).rows;
      files.forEach(file => {
        file.url = `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`;
      });

      recipe.information = recipe.information.replace(/\\n/gi, '<br>')
  
      return res.render('admin/recipes/show', { recipe, files });
    } catch (err) {
      console.log(err);
    }
  },
  async edit(req, res) {
    const { id } = req.params;

    try {
      let results = await Recipe.find(id);
      const recipe = results.rows[0];
  
      if (!recipe) return res.send('Recipe not found!');
  
      const [chefOptions, files] = await Promise.all([Recipe.chefsAvailable(), Recipe.files(id)]);
  
      files.rows.forEach(file => {
        file.url = `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`;
      });
  
      return res.render('admin/recipes/edit', { recipe, chefOptions: chefOptions.rows, files: files.rows });
    } catch (err) {
      console.log(err);
    }
  },
  async post(req, res) {
    for (let key in req.body) {
      if (key !== 'information' && req.body[key] === '' || req.body[key][0] === '') {
        return res.send('Fill all the fields!');
      }
    }

    if (req.files.length === 0) return res.send('Please, send at least one image!');

    try {
      let results = await Recipe.create(req.body);
      const recipeId = results.rows[0].id;

      let filesPromise = req.files.map(file => File.create({ ...file }));
      results = await Promise.all(filesPromise);

      filesPromise = results.map(result => RecipeFile.create(recipeId, result.rows[0].id));
      await Promise.all(filesPromise);
  
      return res.redirect(`/admin/recipes/${recipeId}`);
    } catch (err) {
      console.log(err);
    }
  },
  async put(req, res) {
    for (let key in req.body) {
      if (key !== 'removed_files' && req.body[key] === '' || req.body[key][0] === '') {
        return res.send('Fill all the fields!');
      }
    }

    try {
      if (req.body.removed_files) {
        const removedFiles = req.body.removed_files.split(',');
        const lastIndex = removedFiles.length - 1;
        removedFiles.splice(lastIndex, 1);
  
        const removedRecipeFilesPromise = removedFiles.map(id => RecipeFile.deleteByFile(id));
        const removedFilesPromise = removedFiles.map(id => File.delete(id));

        await Promise.all(removedRecipeFilesPromise);
        await Promise.all(removedFilesPromise);
      }

      if (req.files.length !== 0) {
        const oldFiles = await Recipe.files(req.body.id);
        const totalFiles = oldFiles.rows.length + req.files.length;

        if (totalFiles <= 5) {
          const newFilesPromise = req.files.map(file => File.create({ ...file }))
          let results = await Promise.all(newFilesPromise);

          const newRecipeFilesPromise = results.map(result => RecipeFile.create(req.body.id, result.rows[0].id));
          await Promise.all(newRecipeFilesPromise);
        }
      }
  
      await Recipe.update(req.body);
      
      return res.redirect(`/admin/recipes/${req.body.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  async delete(req, res) {
    const { id } = req.body;

    try {
      await RecipeFile.deleteByRecipe(id);
      await Recipe.delete(id);
      return res.redirect('/admin/recipes');
    } catch (err) {
      console.log(err);
    }
  }
};

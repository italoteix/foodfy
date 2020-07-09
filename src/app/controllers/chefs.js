const Chef = require('../models/Chef');
const File = require('../models/File');

module.exports = {
  index(req, res) {
    Chef.all(function(chefs) {
      return res.render('admin/chefs/index', { chefs, showButton: true });
    });
  },
  create(req, res) {
    return res.render('admin/chefs/create');
  },
  async show(req, res) {
    const { id } = req.params;

    try {
      let result = await Chef.find(id);
      let chef = result.rows[0];

      if (!chef) return res.send('Chef not found!');

      result = await File.find(chef.file_id);
      chef.avatar_url = `${req.protocol}://${req.headers.host}${result.rows[0].path.replace('public', '')}`;

      Chef.findRecipes(id, function(recipes) {
        return res.render('admin/chefs/show', { chef, recipes });
      });
    } catch (err) {
      return res.send(err);
    }
  },
  async edit(req, res) {
    const { id } = req.params;

    try {
      let result = await Chef.find(id);
      let chef = result.rows[0];
        
      if (!chef) return res.send('Chef not found!');

      result = await File.find(chef.file_id);
      chef.avatar_url = `${req.protocol}://${req.headers.host}${result.rows[0].path.replace('public', '')}`;

      return res.render('admin/chefs/edit', { chef });
    } catch (err) {
      console.log(err);
    }
  },
  async post(req, res) {
    for (let key in req.body) {
      if (req.body[key] === '') return res.send('Please, fill all fields!');
    }

    if (req.files.length == 0) {
      return res.send('Please, send one image!');
    }

    try {
      let result = File.create({ ...req.files[0] });
      const fileId = (await result).rows[0].id;

      result = await Chef.create(req.body.name, fileId);
      return res.redirect(`/admin/chefs/${(await result).rows[0].id}`)
    } catch (err) {
      return res.send(err);
    }
  },
  async put(req, res) {
    for (let key in req.body) {
      if (req.body[key] === '') return res.send('Please, fill all fields!');
    }

    let newFileId = 0;

    if (req.files.length !== 0) {
      let result = await File.create({ ...req.files[0] });
      newFileId = result.rows[0].id;
    }

    if (newFileId !== 0) req.body.file_id = newFileId;

    Chef.update(req.body);
    
    return res.redirect(`/admin/chefs/${req.body.id}`);
  },
  delete(req, res) {
    Chef.delete(req.body.id, function() {
      return res.redirect('/admin/chefs');
    });
  },
};

const router = require('express').Router();
let Column = require('../models/models');
// Find column
router.route('/').get((req, res) => {
  Column.find()
    .then(columns => res.json(columns))
    .catch(err => res.status(400).json('Error: ' + err));
});
//Add column
router.route('/add').post((req, res) => {
  const title = req.body.title;
  const limit = req.body.limit;
  const tasks = [{
    content: req.body.tasks[0].content,
    // user: {name: req.body.tasks[0].user.name}
  }];
  
  const newColumn = new Column({
    title,
    limit,
    tasks,
  });
  newColumn.save()
  .then(() => res.json('Column added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});
//Find column by ID
router.route('/:id').get((req, res) => {
  Column.findById(req.params.id)
    .then(task => res.json(task))
    .catch(err => res.status(400).json('Error: ' + err));
});
//Delete column by ID
router.route('/:id').delete((req, res) => {
  Column.findByIdAndDelete(req.params.id)
    .then(() => res.json('Column deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
//Update column by ID
router.route('/update/:id').post((req, res) => {
  Column.findById(req.params.id)
    .then(col => {
        col.status = req.body.status;
        col.save()
        .then(() => res.json('Column updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
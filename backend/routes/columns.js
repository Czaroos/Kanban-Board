const router = require('express').Router();
let Column = require('../models/column.model');
// Find column
router.route('/').get((req, res) => {
  Column.find()
    .then(columns => res.json(columns))
    .catch(err => res.status(400).json('Error: ' + err));
});
//Add col
router.route('/add').post((req, res) => {
  const status = req.body.status;
  const newColumn = new Column({
    status
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
//Delete task by ID
router.route('/:id').delete((req, res) => {
  Column.findByIdAndDelete(req.params.id)
    .then(() => res.json('Column deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
//Updata task by ID
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
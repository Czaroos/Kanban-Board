
const router = require('express').Router();
let Task = require('../models/task.model');

// Find task

router.route('/').get((req, res) => {
  Task.find()
    .then(tasks => res.json(tasks))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Add task
router.route('/add').post((req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const status = req.body.status;
  const user = req.body.user;
  
  const newTask = new Task({
    name,
    description,
    status,
    user,
  });
  newTask.save()
  .then(() => res.json('Task added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});
//Find task by ID
router.route('/:id').get((req, res) => {
  Task.findById(req.params.id)
    .then(task => res.json(task))
    .catch(err => res.status(400).json('Error: ' + err));
});
//Delete task by ID
router.route('/:id').delete((req, res) => {
  Task.findByIdAndDelete(req.params.id)
    .then(() => res.json('Task deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
//Updata task by ID
router.route('/update/:id').post((req, res) => {
  Task.findById(req.params.id)
    .then(task => {
        task.name = req.body.name;
        task.description = req.body.description;
        task.status = req.body.status;
        task.user = req.body.user;
        task.save()
        .then(() => res.json('Task updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
const router = require("express").Router();
const model = require("../models/models");
const mongoose = require("mongoose");

// ------------------------------- /COLUMNS -------------------------------

// Get columns
router.route("/columns").get((req, res) => {
  model.Column.find()
    .then((columns) => res.json(columns))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Save columns
router.route("/columns").post((req, res) => {
  model.Column.deleteMany({})
    .then(
      () =>
        (newState = req.body.map((column) => {
          let tasks = column.tasks.map((task) => {
            let users = task.users.map((user) => {
              return (newUser = {
                _id: user._id,
                name: user.name,
                color: user.color,
              });
            });
            return (newTask = {
              _id: task.id,
              content: task.content,
              priority: task.priority,
              columnId: task.columnID,
              users: users,
              progress: task.progress,
              color: task.color,
              isLocked: task.isLocked
            });
          });
          newColumn = new model.Column({
            _id: column.id,
            title: column.title,
            limit: column.limit,
            tasks: tasks,
            index: column.index,
            indexX: column.indexX,
            indexY: column.indexY,
            info: column.info,
            color: column.color,
          });
          newColumn.save().then({});
          return newColumn;
        }))
    )
    .then(() => res.json(newState));
});

//Add column
router.route("/columns/add").post((req, res) => {
  model.Column.countDocuments({}).then((count) => {
    newColumn = new model.Column({
      _id: mongoose.Types.ObjectId(),
      title: req.body.title,
      limit: req.body.limit,
      tasks: [],
      index: count,
      indexX: req.body.indexX,
      indexY: req.body.indexY,
      info: req.body.info,
      color: req.body.color,
    });
    newColumn
      .save()
      .then((newColumn) => res.json(newColumn))
      .catch((err) => res.status(400).json("Error: " + err));
  });
});

//Delete column by ID
router.route("/columns/:id").delete((req, res) => {
  model.Column.findByIdAndDelete(req.params.id)
    .then(() => res.json(req.params.id))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Update column by ID
router.route("/columns/:id").put((req, res) => {
  model.Column.findById(req.params.id)
    .then((col) => {
      col.title = req.body.title;
      col.limit = req.body.limit;
      col.info = req.body.info;
      col
        .save()
        .then((col) => res.json(col))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// ------------------------------- /TASKS -------------------------------

// Add task to column
router.route("/tasks/add").post((req, res) => {
  task = {
    content: req.body.content,
    columnId: req.body.columnID,
    users: [],
    priority: req.body.priority,
    color: req.body.color
  };

  model.Column.findById(req.body.columnID)
    .then((col) => {
      col.tasks.push(task);
      col.limit--;
      col.save().then((col) => res.json(col));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// Delete task
router.route("/tasks/delete/:id").post((req, res) => {
  deletedTask = {
    _id: req.params.id,
    columnID: req.body.columnID,
  };

  model.Column.findById(req.body.columnID)
    .then((col) => {
      col.tasks.id(req.params.id).remove();
      col.limit++;
      col.save().then(() => res.json(deletedTask));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// Update task by ID
router.route("/tasks/:id").put((req, res) => {
  changedTask = {
    _id: req.params.id,
    content: req.body.content,
    priority: req.body.priority,
    columnId: req.body.columnID,
    color: req.body.color,
    progress: req.body.progress,
    isLocked: req.body.isLocked
  };

  model.Column.findById(req.body.columnID)
    .then((col) => {
      col.tasks.id(req.params.id).set(changedTask);
      return col.save();
    })
    .then(() => res.json(changedTask))
    .catch((err) => res.status(400).json("Error: " + err));
});

// ------------------------------- /USERS -------------------------------

// Get users
router.route("/users").get((req, res) => {
  model.User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Save users
router.route("/users").post((req, res) => {
  model.User.deleteMany({})
    .then(
      () =>
        (newState = req.body.map((user) => {
          newUser = new model.User({
            _id: user._id,
            name: user.name,
            color: user.color,
          })
          newUser.save().then({});
          return newUser;
        }))
    )
    .then(() => res.json(newState));
});

// Add new user
router.route("/users/add").post((req, res) => {
  newUser = new model.User({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    color: req.body.color,
  });
  newUser
    .save()
    .then((newUser) => res.json(newUser))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Delete user by ID
router.route("/users/:id").delete((req, res) => {
  model.User.findByIdAndDelete(req.params.id)
    .then(() => res.json(req.params.id))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Delete user by name
router.route("/users/deleteByName/:name").delete((req, res) => {
  model.User.deleteMany({ name: req.params.name })
    .then(() => res.json(req.params.name))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;

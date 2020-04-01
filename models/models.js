const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const taskSchema = Schema({
  _id: mongoose.ObjectId,
  content: String,
  // title: String,
  // user: { type: Schema.Types.ObjectId, ref: 'User' },
});

const columnSchema = Schema({
  // _id: Schema.Types.ObjectId,
  title: String,
  limit: Number,
  tasks: [{ 
    type: Schema.Types.Mixed,
    ref: 'Tasks' 
  }]
});

const userSchema = ({
  name: String,
});

const Column = mongoose.model('Columns', columnSchema, 'columns');
const Task = mongoose.model('Tasks', taskSchema, 'tasks');
const User = mongoose.model('Users', userSchema);

module.exports = User;
module.exports = Task;
module.exports = Column;

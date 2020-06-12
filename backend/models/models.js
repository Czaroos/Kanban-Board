const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userSchema = ({
  _id: Schema.Types.ObjectId,
  name: String,
  color: String,
});

const taskSchema = Schema({
  content: String,
  columnId: { type: Schema.Types.ObjectId, ref: 'Column' },
  users: [userSchema],
  priority: { type: String, enum: ['normal', 'high', 'very high'], default: 'normal'},
  progress: { type: Number, default: 0},
  color: Object,
  isLocked: { type: Boolean, default: false}
});

const columnSchema = Schema({
  _id: Schema.Types.ObjectId,
  index: { type: Number, default: 1 },
  indexX: { type: Number, default: 0 },
  indexY: { type: Number, default: 0 },
  title: String,
  limit: { type: Number, default: -99999 },
  info: String,
  color: String,
  tasks: [taskSchema]
});


const User = mongoose.model('User', userSchema);
const Column = mongoose.model('Column', columnSchema);
const Task = mongoose.model('Task', taskSchema);

module.exports.User = User;
module.exports.Task = Task;
module.exports.Column = Column;

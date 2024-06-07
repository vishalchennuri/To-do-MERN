const mongoose = require('mongoose');

// Define the schema
const TodoSchema = new mongoose.Schema({
  task: { type: String, required: true },
  status: {type:Boolean , default:false}
});

// Specify the collection name
const TodoModel = mongoose.model("TODO", TodoSchema, 'todoCollection');

module.exports = TodoModel;

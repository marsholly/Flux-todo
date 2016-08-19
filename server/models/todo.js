const mongoose = require('mongoose');

//if use Date.now(): that meaning invoke right now, then the time is just in that time.
// therefore each time is same. So, we need to a function.==>Date.now
const todoSchema = new mongoose.Schema({
  task:{type: String, required: true },
  isComplete: {type: Boolean, required: true, default: false},
  createdAt: {type: Date, required: true, default: Date.now}
});

todoSchema.statics.toggle = function(id, cb){
  //this === Todo model
  this.findById(id, (err, todo)=>{
    if(err) return cb(err);
    todo.isComplete = !todo.isComplete;
    // todo.save((err, savedTodo)=>{
    //   cb(err, savedTodo);
    // })
    todo.save(cb);
  })
};


const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;

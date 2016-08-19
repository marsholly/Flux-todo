  import { EventEmitter } from 'events'
  import AppDispatcher from '../AppDispatcher';
  import uuid from 'uuid';

  let _todos = [];

  class TodoStore extends EventEmitter {
    constructor(){
      super();

      AppDispatcher.register(action => {
        switch (action.type) {
          case 'RECEIVE_TODOS':
            _todos = action.todos;
            this.emit('CHANGE');
            break;
          case'RECEIVE_ONE_TODO':
            var { todo } = action;
            _todos.push(action.todo);
            this.emit('CHANGE');
            break;
          case 'CREATE_TODO':
            //action.todo --->{task: 'DO stuff' }
            var { todo } = action;
            todo._id = uuid();
            todo._createAt = Date.now();
            todo.isComplete = false;
            _todos.push(todo);
            this.emit('CHANGE');
            break;
        }
      });
    }

    startListening(cb){
      this.on('CHANGE', cb);
    }

    stopListening(cb){
      this.removeListener('CHANGE', cb);
    }

    getAll(){
      return _todos;
    }
  }

  export default new TodoStore();

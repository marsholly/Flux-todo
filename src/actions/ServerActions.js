import AppDispatcher from '../AppDispatcher';

const ServerActions ={
  receiveTodos(todos){
    AppDispatcher.dispatch({
      type: 'RECEIVE_TODOS',
      todos
    })
  },
  receiveOneTodo(todo){
    AppDispatcher.dispatch({
      type: 'RECEIVE_ONE_TODO',
      todo
    })
  }
}

export default ServerActions;

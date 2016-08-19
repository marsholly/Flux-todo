import API from '../API';


const TodoActions = {
  getAllTodos: API.getAllTodos,
  createTodo(todo){
    API.createTodo(todo);
  },
  deleteItem(id){
    API.deleteItem(id);
  },
  editTask(id, todo){
    API.editTask(id, todo);
  }
}

export default TodoActions;

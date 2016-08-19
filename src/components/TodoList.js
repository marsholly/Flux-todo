import React, {Component} from 'react';
import ListItem from './ListItem';
import TodoStore from '../stores/TodoStore';
import TodoActions from '../actions/TodoActions';

export default class TodoList extends Component{
  constructor(){
    super();

    this._onChange = this._onChange.bind(this);

    this.state = {
      todos: TodoStore.getAll()
    }

  }

  componentDidMount(){
    TodoActions.getAllTodos();
    TodoStore.startListening(this._onChange);

  }

  componentWillUnmount(){
    TodoStore.stopListening(this._onChange);

  }

  _onChange(){
    this.setState({
      todos: TodoStore.getAll()
    });
  }

  render(){
    console.log('this.state.todos:', this.state.todos);
    const ListItems = this.state.todos.map(todo =>{
      return (
        <ListItem key={todo._id} {...todo} />
      )
    })

    return (
      <table className="table">
        <thead>
          <tr>
            <th>Task</th>
            <th>created At</th>
            <th>Is Complete</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {ListItems}
        </tbody>
      </table>
    )
  }

}

import React, {Component} from 'react';
import moment from 'moment';
import TodoActions from '../actions/TodoActions';
import { Modal, Button } from 'react-bootstrap';

export default class ListItem extends Component{
  constructor(){
    super();
    this.deleteTaskItem = this.deleteTaskItem.bind(this);
    this.editTaskItem = this.editTaskItem.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);

    this.state = {
      editTask: '',
      showModal: false
    }

  }

  deleteTaskItem(id){
    TodoActions.deleteItem(id);
  }

  editTaskItem(id){
    this.openModal();
    this.setState({editTask: this.props.task});
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  openModal() {
    this.setState({ showModal: true });
  }

  saveEdit(id) {
    let task = this.state.editTask;
    let newTask = {task};
    TodoActions.editTask(id, newTask);
    this.setState({editTask: ''});
    this.closeModal();
  }

  cancelEdit() {
    this.closeModal();
  }

  render(){
    let {_id, task, createAt, isComplete} = this.props;
    return (
        <tr>
          <td>{task}</td>
          <td>{moment(createAt).format('lll')}</td>
          <td>
            <input readOnly type="checkbox" checked = {isComplete} />
          </td>
          <td>
            <button className="btn btn-primary btn-xs" onClick={() => this.editTaskItem(_id)}>
              <span className="glyphicon glyphicon-edit"></span>
            </button>
          </td>
          <td>
            <button className="btn btn-danger btn-xs" onClick={() => this.deleteTaskItem(_id)}>
              <span className="glyphicon glyphicon-trash"></span>
            </button>
          </td>
          <Modal show={this.state.showModal} onHide={this.closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Edit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <span>Task: </span><input type="text" value={this.state.editTask} onChange={e => {this.setState({editTask: e.target.value}) }}/>
            </Modal.Body>
            <Modal.Footer>
              <Button className="btn btn-primary" onClick={() => this.saveEdit(_id)}>Save</Button>
              <Button onClick={this.cancelEdit}>Close</Button>
            </Modal.Footer>
          </Modal>
        </tr>
    )
  }
}

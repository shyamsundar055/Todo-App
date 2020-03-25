import React from 'react';
import './App.css';
import ToDoItems from './components/todoitems'
import todosData from './components/tododata'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todoItems: todosData,
      todoItemsCount: todosData.length,
      todoItemsPending: todosData.filter((item) => { return item.itemCompleted === false; }).length
    }

    this.enterPressed = this.enterPressed.bind(this);
    this.updateAllItems = this.updateAllItems.bind(this);
    this.changeItemStatus = this.changeItemStatus.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

  }

  enterPressed(event) { 
    if (event.key === "Enter"  && event.target.value.trim() !== "") { 
      let inputItemName = event.target.value.trim();
      event.target.value = "";

      this.setState(prevState => {
        let updatedToDoItems = prevState.todoItems;
        const itemsCount = updatedToDoItems.length
        const newItem = { itemId: itemsCount + 1, itemName: inputItemName, itemCompleted: false }
        updatedToDoItems.push(newItem);

        return {
          todoGroups: updatedToDoItems,
          todoItemsCount: updatedToDoItems.length,
          todoItemsPending: updatedToDoItems.filter((item) => { return item.itemCompleted === false; }).length
        }
      })
    }
  }

  updateAllItems() {
    this.setState(prevState => {
      let updatedToDoItems = prevState.todoItems;
      let selectAllItems = false;

      for (let i = 0; i < updatedToDoItems.length; i++) {
        if (!updatedToDoItems[i].itemCompleted) {
          selectAllItems = true;
          break;
        }
      }


      updatedToDoItems = updatedToDoItems.map(item => {
        item.itemCompleted = selectAllItems;
        return item
      })
      return {
        todoItems: updatedToDoItems,
        todoItemsCount: updatedToDoItems.length,
        todoItemsPending: updatedToDoItems.filter((item) => { return item.itemCompleted === false; }).length
      }
    })
  }

  changeItemStatus(itemId) {
    this.setState(prevState => {

      let updatedToDoItems = prevState.todoItems;

      updatedToDoItems = updatedToDoItems.map(item => {
        if (item.itemId === itemId) {
          item.itemCompleted = !item.itemCompleted;
        }

        return item
      })

      return {
        todoItems: updatedToDoItems,
        todoItemsCount: updatedToDoItems.length,
        todoItemsPending: updatedToDoItems.filter((item) => { return item.itemCompleted === false; }).length
      }
    })

  }

  handleDelete(itemId) {
    this.setState(prevState => {
      let updatedToDoItems = prevState.todoItems;
      if (itemId) {
        updatedToDoItems = updatedToDoItems.filter((item) => { return item.itemId !== itemId; })
      }
      else {
        updatedToDoItems = updatedToDoItems.filter((item) => { return item.itemCompleted === false; })
      }

      return {
        todoItems: updatedToDoItems,
        todoItemsCount: updatedToDoItems.length,
        todoItemsPending: updatedToDoItems.filter((item) => { return item.itemCompleted === false; }).length
      }
    })
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron">
          <div className="container">
            <h1 className="display-4 text-center"><i className="fa fa-list"></i>&nbsp;ToDos App</h1>
          </div>
        </div>
        <div className="container">
          <div className="input-group input-group-lg">
            <div className="input-group-prepend">
              <button className="btn btn-info" type="button" onClick={this.updateAllItems} >Mark / Unmark All</button>
            </div>
            <input type="text"
              className="form-control"
              placeholder="Enter item to add"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-lg"
              name="txtInputItem"
              autoComplete="off"
              onKeyPress={this.enterPressed} />
            {/* <div className="input-group-append">
              <button className="btn btn-info" type="button" onClick={this.enterPressed} ><i className="fa fa-plus"></i></button>
            </div> */}
          </div>

        </div>

        <ToDoItems items={this.state.todoItems}
          changeItemStatus={this.changeItemStatus}
          handleDelete={this.handleDelete}
          todoItemsCount={this.state.todoItemsCount}
          todoItemsPending={this.state.todoItemsPending} />
      </div>
    )
  }

}

export default App;

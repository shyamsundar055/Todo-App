import React from 'react';
import './App.css';
import ToDoItems from './components/todoitems'

class App extends React.Component {
  constructor() {
    super();

    //TODO: set expiry time for localstorage
    let todoFromLocal = localStorage.getItem("todosData") ? JSON.parse(localStorage.getItem("todosData")) : [];

    this.state = {
      todoItems: todoFromLocal,
      todoItemsCount: todoFromLocal.length,
      todoItemsPending: todoFromLocal.filter((item) => { return item.itemCompleted === false; }).length
    }

    this.enterPressed = this.enterPressed.bind(this);
    this.updateAllItems = this.updateAllItems.bind(this);
    this.changeItemStatus = this.changeItemStatus.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.todoItems.length > 0)
      localStorage.setItem("todosData", JSON.stringify(this.state.todoItems));
    else
      localStorage.removeItem("todosData");

    if (prevState.todoItems !== this.state.todoItems) {
      this.setState({
        todoItemsCount: this.state.todoItems.length,
        todoItemsPending: this.state.todoItems.filter((item) => { return item.itemCompleted === false; }).length
      })
    }
  }

  enterPressed(event) {
    if (event.key === "Enter" && event.target.value.trim() !== "") {
      let inputItemName = event.target.value.trim();
      event.target.value = "";

      this.setState(prevState => {
        let updatedToDoItems = [...prevState.todoItems];

        const newItem = { itemId: Math.random(), itemName: inputItemName, itemCompleted: false }
        updatedToDoItems.push(newItem);

        return {
          todoItems: updatedToDoItems
        }
      })
    }
  }

  updateAllItems() {
    this.setState(prevState => {
      let updatedToDoItems = [...prevState.todoItems];
      let allItemsCompleted = false;

      for (let i = 0; i < updatedToDoItems.length; i++) {
        if (!updatedToDoItems[i].itemCompleted) {
          allItemsCompleted = true;
          break;
        }
      }


      updatedToDoItems = updatedToDoItems.map(item => {
        item.itemCompleted = allItemsCompleted;
        return item
      })

      return {
        todoItems: updatedToDoItems
      }
    })
  }

  changeItemStatus(itemId) {
    this.setState(prevState => {

      let updatedToDoItems = [...prevState.todoItems];

      updatedToDoItems = updatedToDoItems.map(item => {
        if (item.itemId === itemId) {
          item.itemCompleted = !item.itemCompleted;
        }

        return item
      })

      return {
        todoItems: updatedToDoItems
      }
    })

  }

  handleDelete(itemId) {
    this.setState(prevState => {
      let updatedToDoItems = [...prevState.todoItems];
      if (itemId) {
        updatedToDoItems = updatedToDoItems.filter((item) => { return item.itemId !== itemId; })
      }
      else {
        updatedToDoItems = updatedToDoItems.filter((item) => { return item.itemCompleted === false; })
      }

      return {
        todoItems: updatedToDoItems
      }
    })
  }



  render() {
    return (
      <>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4 text-center"><i className="fa fa-list"></i>&nbsp;ToDos App</h1> 
          </div>
        </div> 
        <div className="container">
          <div className="input-group input-group-lg">
            <div className="input-group-prepend">
              <button className="btn btn-info btn-sm" type="button" onClick={this.updateAllItems} >Mark / Unmark All</button>
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
        <div className="container">
            &nbsp;
        </div>
        <ToDoItems items={this.state.todoItems}
          changeItemStatus={this.changeItemStatus}
          handleDelete={this.handleDelete}
          todoItemsCount={this.state.todoItemsCount}
          todoItemsPending={this.state.todoItemsPending} />
        <div className="container">
            &nbsp;
        </div>
        <footer className="text-center text-muted font-weight-light">
          <div className="container">
            <span style={{fontSize:"12px"}} >Created by <a href="https://github.com/shyamsundar055" target="_blank" rel="noopener noreferrer">Shyam Sundar</a></span>
          </div>
        </footer>
      </>
    )
  }

}

export default App;

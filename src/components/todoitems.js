import React from 'react'

function ToDoItems(props) {
    const completedStyle = {
        textDecoration: "line-through",
        color: "#d9d9d9"
    }
    return (

        <div className="container">
            <ul className="list-group">
                {
                    props.items.map(item =>
                        <li className="list-group-item" key={item.itemId}>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" checked={item.itemCompleted} onChange={() => props.changeItemStatus(item.itemId)} />
                                <label className="form-check-label lead" style={item.itemCompleted ? completedStyle : null} htmlFor={"defaultCheck" + item.itemId}>
                                    {item.itemName}
                                </label>
                                <button type="button" className="close" aria-label="Close" onClick={() => props.handleDelete(item.itemId)}>
                                    <span aria-hidden="true" style={{ color: "red" }}>&times;</span>
                                </button>
                            </div>
                        </li>

                    )
                }
                {
                    props.items.length > 0 ?
                        <li className="list-group-item">
                            <div>
                                <label className="form-check-label">
                                    Total items : <span className="badge badge-pill badge-secondary">{props.todoItemsCount}</span>&nbsp;
                                    Items left : <span className="badge badge-pill badge-warning">{props.todoItemsPending}</span>&nbsp;
                                    Items Completed : <span className="badge badge-pill badge-success">{props.todoItemsCount - props.todoItemsPending}</span>&nbsp;
                                </label>
                                
                                <div className="float-right">
                                    <button type="button" className="btn btn-link" onClick={() => props.handleDelete()}>Clear completed</button> 
                                </div>
                                </div>
                        </li>
                    : 
                    <li className="list-group-item">
                        <div className="alert alert-warning" role="alert">
                            List is empty start adding items !!
                        </div>
                    </li> 
                }
            </ul> 
        </div>
    )

}

export default ToDoItems
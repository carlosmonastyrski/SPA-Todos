import {React, useState, useEffect} from 'react'
import TodoItem from './TodoItem'
import axios from 'axios';

function TodoList({idFolder}) {

    const [todos, setTodos] = useState([]);

    useEffect(()=>{
        console.log(idFolder)
        const url = "http://localhost:4000/tasks/tasks?idFolder=" + parseInt(idFolder.idFolder)
        console.log(url)
        axios.get(url)
        .then(res => {
            setTodos(Array.from(res.data.todos));
        }). catch(err => {
        }) 
    },[])

    return (
        <>
            <ul>
                {todos.map(todo => 
                    <TodoItem key={todo.id} todo={{id: todo.id,
                                                description : todo.description,
                                                isFinished:todo.isFinished}} folderId={idFolder}/>
                )}
            </ul>
        </>
    )
}

export default TodoList

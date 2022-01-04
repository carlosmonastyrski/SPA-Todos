import {React, useState, useEffect} from 'react'
import TodoList from '../TodoList'
import { TextField } from '@mui/material'
import { Button } from '@mui/material'
import axios from 'axios'

function Folder(props) {
    const [description, setDescription] = useState("");

    const handleAddTask = () => {
        const idTask = new URL(window.location).href.split("/").at(-1)
        if (description !== ""){
            axios.post('http://localhost:4000/tasks/create-task' , {description, folder: idTask})
            .then(res => {
                if (res.status == 200){
                    console.log("Success")
                    window.location.reload();
                }
            }). catch(err => {
                console.log(err.status)
            }) 
        }
    }

    return (
        <>
            <h1>Folders {'>'} Work</h1>
            <TodoList idFolder={{idFolder:new URL(window.location).href.split("/").at(-1)}} />
            <div>
                <TextField id="outlined-basic" placeholder="New Task" variant="outlined" 
                onChange={(e) => setDescription(e.target.value)}/>
                <Button onClick={handleAddTask} variant="outlined">Add</Button>
            </div>
        </>
    )
}

export default Folder

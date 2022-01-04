import {React, useState, useEffect} from 'react'
import TodoList from '../TodoList'
import { TextField } from '@mui/material'
import { Button } from '@mui/material'
import axios from 'axios'
import './Folder.css'

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
            <h1><a href="/">Folders</a> {'>'} Work</h1>
            <TodoList idFolder={{idFolder:new URL(window.location).href.split("/").at(-1)}} />
            <div className="input-container">
                <TextField id="outlined-basic" placeholder="New Task" variant="outlined" 
                onChange={(e) => setDescription(e.target.value)}/>
                <Button sx={{
                    marginLeft: 4
                }} onClick={handleAddTask} variant="outlined">Add</Button>
            </div>
        </>
    )
}

export default Folder

import {React,useState} from 'react'
import { TextField } from '@mui/material'
import { Button } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function EditTask() {
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const handleSave = () => {
        const idTask = new URL(window.location).href.split("/").at(-2)
        if (description !== ""){
            axios.put('http://localhost:4000/tasks/update-task?idTodo=' + idTask, {description})
            .then(res => {
                if (res.status == 200){
                    console.log("Success")
                    const idFolder = new URL(window.location).href.split("/").at(-3)
                    const url = '/folder/' + idFolder;
                    navigate(url);
                }
            }). catch(err => {
                console.log(err.status)
            }) 
        }
    }

    const handleCancel = () => {
        const idFolder = new URL(window.location).href.split("/").at(-3)
        const url = '/folder/' + idFolder;
        navigate(url);
    }

    return (
        <>
            <h1>Editing Task "{new URL(window.location).href.split("/").at(-1).replaceAll("_", " ")}"</h1>
            <div>
                <TextField id="outlined-basic" placeholder="New Description" variant="outlined" 
                onChange={(e) => setDescription(e.target.value)}/>
            </div>
            <div>
                <Button onClick={handleSave} variant="contained">Save</Button>
                <Button onClick={handleCancel} variant="contained">Cancel</Button>
            </div>
        </>
    )
}

export default EditTask

import {React,useState} from 'react'
import { TextField } from '@mui/material'
import { Button } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './EditTask.css'

function EditTask(props) {
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
        console.log(props)
        const idFolder = new URL(window.location).href.split("/").at(-3)
        const url = '/folder/' + idFolder;
        navigate(url);
    }

    return (
        <>
            <h1>Editing Task "{new URL(window.location).href.split("/").at(-1).replaceAll("_", " ")}"</h1>
            <div className="input-container">
                <TextField className="input-description" id="outlined-basic" placeholder="New Description" variant="outlined" 
                onChange={(e) => setDescription(e.target.value)}/>
            </div>
            <div className='buttons-container'>
                <Button onClick={handleSave} color="success" variant="contained">Save</Button>
                <Button sx={{
                    marginLeft: 4
                }} onClick={handleCancel} color="error" variant="contained">Cancel</Button>
            </div>
        </>
    )
}

export default EditTask

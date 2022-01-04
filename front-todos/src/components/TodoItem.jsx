import {React, useState, useEffect, useRef } from 'react'
import { Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './TodoItem.css'
import { Checkbox } from '@mui/material';
import { orange } from '@mui/material/colors';
import { Grid } from '@mui/material';

function TodoItem({todo, folderId}) {
    const {id,description,isFinished} = todo;
    const initialRender = useRef(true);
    const navigate = useNavigate();
    const [isCompleted, setIsCompleted] = useState(isFinished);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const handleEdit = () => {
        const url = '/folder/edit-task/' + folderId.idFolder + "/" + id + "/" + description.replaceAll(" ", "_");
        navigate(url);
        }
    
    const handleChange = () => {
        setIsCompleted(!isCompleted);
    }

    useEffect(() => {
        if (!initialRender.current){
            axios.put('http://localhost:4000/tasks/update-task?idTodo=' + id, {isFinished: isCompleted})
            .then(res => {
                if (res.status == 200){
                    console.log("Success")
                }
            }). catch(err => {
                console.log(err.status)
        }) 
        }
        else{
            initialRender.current = false;
        }
    } , [isCompleted])

    return (
        <li className='todo-item'>
            <div className='container-todo'>
                <div className="content-container">
                    <Checkbox
                    {...label}
                    sx={{
                        color: orange[800],
                        '&.Mui-checked': {
                        color: orange[600],
                        },
                    }}
                    checked={isCompleted}
                    onChange={handleChange}
                    />
                    <p className="description-todo">{description}</p>
                </div>
                <div className="button-container">
                    <Button className="edit-button" onClick={handleEdit} variant="text">Edit</Button>
                </div>
            </div>
        </li>
    )
}
export default TodoItem

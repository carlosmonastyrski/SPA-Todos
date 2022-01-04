import React from 'react'
import Checkbox from '@mui/material/Checkbox';
import { Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TodoItem({todo, folderId}) {
    const {id,description,isFinished} = todo;
    const navigate = useNavigate();
    const handleChange = () => {}

    const handleEdit = () => {
        const url = '/folder/edit-task/' + folderId.idFolder + "/" + id + "/" + description.replaceAll(" ", "_");
        navigate(url);
        }

    return (
        <li>
            <Checkbox
                checked={isFinished}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
            />
            {description}
            <Button onClick={handleEdit} variant="text">Edit</Button>
        </li>
    )
}
export default TodoItem

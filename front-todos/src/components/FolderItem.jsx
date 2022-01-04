import React from 'react'
import { Button } from '@mui/material'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function FolderItem({folder}) {

    const {id,description} = folder
    const navigate = useNavigate();

    const handleViewItems = () => {
        const url = '/folder/' + id;
        navigate(url);
    }

    function handleRemove() {
        console.log(id)
        const url = "http://localhost:4000/tasks/delete-folder?idFolder=" + id
        axios.delete(url)
        .then(res => {
            if (res.status == 200){
                console.log("Success")
                window.location.reload();
            }
        }). catch(err => {
            console.log(err);
        }) 
    }

    return (
        <li>
            {description}
            <Button variant="text" onClick={() =>handleViewItems()}>View items</Button>
            <Button variant="text" onClick={() => handleRemove()}>Remove</Button>
        </li>
    )
}

export default FolderItem

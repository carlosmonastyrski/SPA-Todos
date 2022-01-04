import React from 'react'
import { Button } from '@mui/material'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './FolderItem.css'

function FolderItem({folder}) {

    const {id,description} = folder
    const navigate = useNavigate();

    const handleViewItems = () => {
        const url = '/folder/' + id;
        navigate(url);
    }

    function handleRemove() {
        const token = window.localStorage.getItem('Auth');
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
        <li className='folder-item'>
            <div className='container-folders'>
                <div className="content-container">
                    <p className="description-folder">- {description}</p>
                </div>
            </div>
            <div className="button-container">
                <Button sx={{
                    marginLeft: 2,
                    fontSize: '1rem' 
                }} variant="text" onClick={() =>handleViewItems()}>View items</Button>
                <Button sx={{
                    marginLeft: 2,
                    fontSize: '1rem' 
                }} variant="text" onClick={() => handleRemove()}>Remove</Button>
            </div>
        </li>
    )
}

export default FolderItem

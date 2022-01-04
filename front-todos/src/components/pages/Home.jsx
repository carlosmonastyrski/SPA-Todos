import {React, useState} from 'react'
import FolderList from '../FolderList'
import { TextField } from '@mui/material'
import { Button } from '@mui/material'
import axios from 'axios'
import './Home.css'

function Home() {
    const [description, setDescription] = useState("");

    const handleAddFolder = () => {
        axios.post('http://localhost:4000/tasks/create-folder', {description})
        .then(res => {
            if (res.status == 200){
                console.log("Success")
                window.location.reload();
            }
        }). catch(err => {
            console.log(err.status)
        }) 
    }

    return (
        <>
            <h1>Folders</h1>
            <FolderList/>
            <div className="input-folder-container">
                <div className="input-text">
                    <TextField fullWidth  id="fullWidth"
                    sx={{
                        fontSize: '1rem',
                        width: 400,
                        height: 60
                    }} placeholder="New Folder" onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className='add-container'>
                <Button sx={{
                    marginLeft: 2,
                    fontSize: '1rem',
                    height: 60
                }} variant="outlined" onClick={handleAddFolder}>Add</Button>
            </div>
            </div>
        </>
    )
}

export default Home

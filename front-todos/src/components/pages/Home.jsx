import {React, useState} from 'react'
import FolderList from '../FolderList'
import { TextField } from '@mui/material'
import { Button } from '@mui/material'
import axios from 'axios'


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
            <div>
                <TextField id="outlined-basic" placeholder="New Folder" variant="outlined"
                onChange={(e) => setDescription(e.target.value)} />
                <Button variant="outlined" onClick={handleAddFolder}>Add</Button>
            </div>
        </>
    )
}

export default Home

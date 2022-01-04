import {React, useState, useEffect} from 'react'
import FolderItem from  './FolderItem'
import axios from 'axios';
import './FolderList.css'

function FolderList() {

    const [folders, setFolders] =  useState([])

    useEffect(()=>{
        axios.get('http://localhost:4000/tasks')
        .then(res => {
            console.log(res.data.folders)
            setFolders(Array.from(res.data.folders));
        }). catch(err => {
            console.log(err)
        }) 
    },[])

    return (
        <>
        <ul>
            {folders.map(folder => 
                <FolderItem className="todo-item-content" key={folder.id} folder={folder}/>
            )}
        </ul>
    </>
    )
}

export default FolderList

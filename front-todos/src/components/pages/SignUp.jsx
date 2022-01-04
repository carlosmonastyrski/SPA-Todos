import {React, useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserForm from '../UserForm';
import './SignUp.css'

function SignUp() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const navigate = useNavigate();
  
    function handleSignUp(){
        console.log({username, password})
        axios.post('http://localhost:4000/users/local/signup', {username,password})
        .then(res => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + res.data.answer
            localStorage.setItem('Authorization', "Bearer " + res.data.answer)
            navigate('/');
        }). catch(err => {
            console.log(err);
        }) 
    }

    return (
        <div className="SignUp">
            <h1 className="titleSignUp">Sign Up</h1>
            <UserForm username={username} setUsername={setUsername} 
            password={password} setPassword={setPassword} handleButton={handleSignUp} title={'Sign Up'}/>
        </div>
    )
}

export default SignUp

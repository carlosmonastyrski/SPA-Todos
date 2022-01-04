import {React, useState} from 'react'
import UserForm from '../UserForm';
import './Login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const navigate = useNavigate();

    const handleSignUpClick = () => {
        navigate('/signUp');
    }
  
    function handleLogin(){
        console.log({username, password})
        axios.post('http://localhost:4000/users/local/signin', {username,password})
        .then(res => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + res.data.answer
            localStorage.setItem('Authorization', "Bearer " + res.data.answer)
            navigate('/');
        }). catch(err => {
            console.log(err);
        }) 
    }

    return (
        <div className="Login">
            <h1 className="titleLogIn">Log In</h1>
            <UserForm username={username} setUsername={setUsername} 
            password={password} setPassword={setPassword} handleButton={handleLogin} title={'Login'}/>
            <div className='sign-up-button'>
                <h5><a onClick={handleSignUpClick} href="" disabled="disabled">Sign Up</a></h5>
            </div>
        </div>
    )
}

export default Login

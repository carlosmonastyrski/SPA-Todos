import React from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './UserForm.css'

function UserForm({username, setUsername, password, setPassword, handleButton,title}) {

    function validateForm() {
        return username.length > 0 && password.length > 0;
      }
    
      function handleSubmit(event) {
        event.preventDefault();
      }  
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group size="lg" controlId="email">
                <Form.Label>Email</Form.Label>
                <div className="email-container">
                    <Form.Control
                        autoFocus
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                <Form.Label>Password</Form.Label>
                <div className="email-container">
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                </Form.Group>
                <Form.Group size="lg">
                <Button onClick={handleButton} className="boton_login" size="lg" type="submit" disabled={!validateForm()}>
                    {title}
                </Button>
            </Form.Group>
        </Form>
    )
}

export default UserForm

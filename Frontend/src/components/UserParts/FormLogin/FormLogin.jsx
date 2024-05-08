import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

function FormLogin(props) {

    const { handlerUserLogin, accessLogin, SetAccessLogin} = props;

    const userFormLogin_init = { email: "", password: "" };
    const [userFormLogin, SetUserFormLogin] = useState(userFormLogin_init);
    const [message, SetMessage] = useState("");
    const navigate = useNavigate();


    const handlerChange = function (e) {
        SetUserFormLogin({ ...userFormLogin, [e.target.name]: e.target.value });
        console.log(userFormLogin);
    }

    const handlerSubmit = async function (e) {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        const {respToken, respMessage, respStatus, respLogin} = await handlerUserLogin(email, password);
        console.log(respLogin);
        handlerLogin(respLogin);
    }

    const handlerLogin = function(respLogin){

        if (respLogin == true) {

            navigate("/products/user/data");
            SetMessage("Ingresando...");

        } else {

            SetMessage("Email o contraseña incorrectas");
        }
    }

    const handlerRegister = function(){

        navigate("/products/register");
    }


    return (
        <Form style={{ width: "100%", padding: "1rem" }} onSubmit={handlerSubmit}>
            <Form.Group className="mb-3">
                <Form.Text className="text-muted">Ingresar</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name='email' placeholder="" className='mt-3' value={userFormLogin.email} onChange={handlerChange}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" name='password' className='mt-3' value={userFormLogin.password} onChange={handlerChange} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Button variant="primary" type="submit">Ingresar</Button>
                <Form.Label>{message}</Form.Label>
                <Form.Text className="text-muted" onClick={handlerRegister} >Registrase</Form.Text>
            </Form.Group>
        </Form>
    )
}

export default FormLogin
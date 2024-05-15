import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../FormLogin/FormLogin.css';


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
        const respAccess = await handlerUserLogin(email, password);

        if(respAccess.status == 200 && respAccess.result && respAccess.message == 'Login successfully'){

            handlerLogin(respAccess.result.login);

        }else{

            SetMessage("Email o Contraseña incorrectas");
        }
    }

    const handlerLogin = function(respLogin){

        if (respLogin == true) {

            navigate("/products/user/data");
            SetMessage("Ingresando...");
        } 
    }

    const handlerRegister = function(){

        navigate("/products/register");
    }


    return (
        <Form className='formlogin' onSubmit={handlerSubmit}>
            <Form.Group className="mb-2 formlogin-email">
                <Form.Label className='mb-1'>Email</Form.Label>
                <Form.Control type="email" name='email' placeholder="" className='mt-0 formlogin-email-input' value={userFormLogin.email} onChange={handlerChange}/>
            </Form.Group>
            <Form.Group className="mb-2 formlogin-password">
                <Form.Label className='mb-1' >Contraseña</Form.Label>
                <Form.Control type="password" name='password' className='mt-0 formlogin-password-input' value={userFormLogin.password} onChange={handlerChange} />
            </Form.Group>
            <Form.Group className="mb-2 formlogin-footer">
                <Button variant="dark" type="submit" className="mt-0 formlogin-footer-button">Ingresar</Button>
                <Form.Label className="mb-3 formlogin-footer-register" onClick={handlerRegister} >Registrarse</Form.Label>
            </Form.Group>
            <Form.Group className='formlogin-message'>
                <Form.Text className='text-muted'>{message}</Form.Text>
            </Form.Group>
        </Form>
    )
}

export default FormLogin
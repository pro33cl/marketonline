import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';


function FormUserPassword(props) {

    const {user, SetUser, handlerUserPut } = props;
    const [edit, SetEdit] = useState(false);
    const [message, SetMessage] = useState("");
    const [newPassword, SetNewPassword] = useState({password1:"", password2:""});
    

    const handlerEdit = function(e){
        SetEdit(true);
        SetMessage("");
    }

    const handlerCancel = function(e){
        SetMessage("");
        SetNewPassword({password1:"", password2:""});
        SetEdit(false);
    }

    const handlerSubmit = function(e){
        e.preventDefault();
        let new_password;
        if(newPassword.password1 == newPassword.password2){
            new_password = newPassword.password1;
            const user_actual = {password: new_password};
            handlerUserPut(user_actual);
            SetEdit(false);
            SetMessage("Clave exitosa!");
            console.log(user);
        }
        else{
            SetMessage("Claves no coinciden")
            SetEdit(true);
        }
    }

    const handlerChange = function(e){
        SetNewPassword({...newPassword,[e.target.name]:e.target.value});
        console.log(newPassword);
    }


    return (
        <div>
            <Form style={{ width: "100%", padding: "1rem" }} onSubmit={handlerSubmit}>
                <Form.Group className="mb-3">
                    <Form.Text className="text-muted">Cambio Contraseña</Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Contraseña Nueva</Form.Label>
                {edit==true?<Form.Control type="password" name='password1' className='mt-3' value={newPassword.password1} onChange={handlerChange}/>:<Form.Control type="password" name='password1' className='mt-3' value={newPassword.password1} onChange={handlerChange} disabled/>}
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Repita Contraseña Nueva</Form.Label>
                {edit==true?<Form.Control type="password" name='password2' className='mt-3' value={newPassword.password2} onChange={handlerChange}/>:<Form.Control type="password" name='password2' className='mt-3' value={newPassword.password2} onChange={handlerChange} disabled/>}
                <Form.Text className="text-muted">{message}</Form.Text>
                </Form.Group>
                <Button variant="primary" onClick={()=>{handlerEdit()}}>Editar</Button>
                {edit==true?<Button variant="primary" onClick={()=>{handlerCancel()}}>Cancelar</Button>:null}
                {edit==true?<Button variant="primary" type="submit">Cambiar</Button>:<Button variant="primary" type="submit" disabled>Guardar</Button>}
            </Form>
        </div>
    )
}

export default FormUserPassword
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../FormUserData/FormUserData.css';
import { useEffect } from "react";


function FormUserData(props) {

    const { user, SetUser, handlerUserPut } = props;
    const [edit, SetEdit] = useState(false);


    useEffect(() => {

        console.log(user);

    }, [user]);


    const handlerEdit = function (e) {
        SetEdit(true);
    }

    const handlerChange = function (e) {
        SetUser({ ...user, [e.target.name]: e.target.value });
    }

    const handlerSubmit = function (e) {
        e.preventDefault();
        console.log("user antes de handlerUserPut al principio de handlerSubmit");
        console.log(user);
        handlerUserPut(user);
        SetEdit(false);
        console.log("user despues de handlerUserPut al final de handlerSubmit");
        console.log(user);
    }


    return (
        <div>
            <Form className='form mb-2' onSubmit={handlerSubmit}>
                <Form.Group className="form-title mb-2">
                    <Form.Label className='form-title-text fs-5 fw-bold text-secondary'>Datos Usuario</Form.Label>
                </Form.Group>
                <Form.Group className="form-group mb-1">
                    <Form.Label className='form-group-text'>Nombre</Form.Label>
                    {edit == true ? <Form.Control type="text" name='name' placeholder={user.name} className='form-group-input mt-0' value={user.name} onChange={handlerChange} /> : <Form.Control type="text" name='name' placeholder={user.name} className='form-group-input mt-0' value={user.name} onChange={handlerChange} disabled />}
                </Form.Group>
                <Form.Group className="form-group mb-1">
                    <Form.Label className='form-group-text'>Apellido</Form.Label>
                    {edit == true ? <Form.Control type="text" name='lastname' placeholder={user.lastname} className='form-group-input mt-0' value={user.lastname} onChange={handlerChange} /> : <Form.Control type="text" name='lastname' placeholder={user.lastname} className='form-group-input mt-0' value={user.lastname} onChange={handlerChange} disabled />}
                </Form.Group>
                <Form.Group className="form-group mb-1">
                    <Form.Label className='form-group-text'>Email</Form.Label>
                    {edit == true ? <Form.Control type="email" name='email' placeholder={user.email} className='form-group-input mt-0' value={user.email} onChange={handlerChange} /> : <Form.Control type="email" name='email' placeholder={user.email} className='form-group-input mt-0' value={user.email} onChange={handlerChange} disabled />}
                </Form.Group>
                <Form.Group className="form-group mb-1">
                    <Form.Label className='form-group-text'>Edad</Form.Label>
                    {edit == true ? <Form.Control type="text" name='age' placeholder={user.age} className='form-group-input mt-0' value={user.age} onChange={handlerChange} /> : <Form.Control type="text" name='age' placeholder={user.age} className='form-group-input mt-0' value={user.age} onChange={handlerChange} disabled />}
                </Form.Group>
                <Form.Group className="form-footer">
                    <Button className="form-footer-button" variant="dark" onClick={() => { handlerEdit() }}>Editar</Button>
                    {edit == true ? <Button className="form-footer-button" variant="dark" type="submit">Guardar</Button> : <Button className="form-footer-button" variant="dark" type="submit" disabled>Guardar</Button>}
                </Form.Group>
            </Form>
        </div>
    )
}

export default FormUserData
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';


function FormUserData(props) {

    const { user, SetUser, handlerUserPut } = props;
    const [edit, SetEdit] = useState(false);
    

    const handlerEdit = function(e){
        SetEdit(true);
    }

    const handlerChange = function(e){
        SetUser({...user,[e.target.name]:e.target.value});
        console.log(user);
    }

    const handlerSubmit = function(e){
        e.preventDefault();
        console.log(user);
        handlerUserPut(user.id,user);
        SetEdit(false);
    }


    return (
        <div>
            <Form style={{ width: "100%", padding: "1rem" }} onSubmit={handlerSubmit}>
                <Form.Group className="mb-3">
                    <Form.Text className="text-muted">Datos Usuario</Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                {edit==true?<Form.Control type="text" name='name' placeholder={user.name} className='mt-3' value={user.name} onChange={handlerChange}/>:<Form.Control type="text" name='name' placeholder={user.name} className='mt-3' value={user.name} onChange={handlerChange} disabled/>}
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Apellido</Form.Label>
                {edit==true?<Form.Control type="text" name='lastname' placeholder={user.lastname} className='mt-3' value={user.lastname} onChange={handlerChange}/>:<Form.Control type="text" name='lastname' placeholder={user.lastname} className='mt-3' value={user.lastname} onChange={handlerChange} disabled/>}
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                {edit==true?<Form.Control type="email" name='email' placeholder={user.email} className='mt-3' value={user.email} onChange={handlerChange}/>:<Form.Control type="email" name='email' placeholder={user.email} className='mt-3' value={user.email} onChange={handlerChange} disabled/>}
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Edad</Form.Label>
                {edit==true?<Form.Control type="text" name='age' placeholder={user.age} className='mt-3' value={user.age} onChange={handlerChange}/>:<Form.Control type="text" name='age' placeholder={user.age} className='mt-3' value={user.age} onChange={handlerChange} disabled/>}
                </Form.Group>
                <Button variant="primary" onClick={()=>{handlerEdit()}}>Editar</Button>
                {edit==true?<Button variant="primary" type="submit">Guardar</Button>:<Button variant="primary" type="submit" disabled>Guardar</Button>}
            </Form>
        </div>
    )
}

export default FormUserData
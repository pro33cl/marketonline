import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';




function FormUserSale(props) {

    const {
        userSales,
        SetUserSales,
        handlerUserSalesGet,
        handlerUserSalePost,
        handlerUserSalePut,
        handlerUserSaleDelete} = props;
    
    

    const handlerEdit = function(e){
        SetEdit(true);
    }

    const handlerChange = function(e){
        SetUserSale({...userSale,[e.target.name]:e.target.value});
        console.log(userSale);
    }

    const handlerSubmit = function(e){
        e.preventDefault();
        console.log(userSale);
        handlerUserSalePut(userSale.id,userSale);
        SetEdit(false);
    }

    const handlerCancel = function(e){


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
                <Form.Label>Fecha Nacimiento</Form.Label>
                {edit==true?<Form.Control type="text" name='birthday' placeholder={user.birthday} className='mt-3' value={user.birthday} onChange={handlerChange}/>:<Form.Control type="text" name='birthday' placeholder={user.birthday} className='mt-3' value={user.birthday} onChange={handlerChange} disabled/>}
                </Form.Group>
                <Button variant="primary" onClick={()=>{handlerEdit()}}>Editar</Button>
                {edit==true?<Button variant="primary" type="submit">Guardar</Button>:<Button variant="primary" type="submit" disabled>Guardar</Button>}
            </Form>
    </div>
  )
}

export default FormUserSale
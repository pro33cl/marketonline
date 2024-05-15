import React, { useState } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context_User } from '../../contexts/Context_User.jsx';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../PageUserRegister/PageUserRegister.css';



function PageUserRegister() {

  const receiving = useContext(Context_User);
  const userFormRegister_init = { email: "", name: "", lastname: "", phone: "", age: "", password1: "", password2: ""};
  const [userFormRegister, SetUserFormRegister] = useState(userFormRegister_init);
  const [message, SetMessage] = useState("");
  const navigate = useNavigate();

  const {
    
    user,
    SetUser, 
    userSales,
    SetUserSales, 
    handlerUserGet, 
    handlerUserPut,
    handlerUserPost,
    handlerUserSalesGet,
    handlerUserSalePost,
    handlerUserSalePut,
    handlerUserSaleDelete,
    FindIndexById,
    handlerUserLogin,
    handlerRefreshAccess,
    accessLogin,
    SetAccessLogin,
    totalPagesUserSales,
    SetTotalPagesUserSales
  
  } = receiving;

    const handlerChange = function (e) {
      SetUserFormRegister({ ...userFormRegister, [e.target.name]: e.target.value });
      console.log(userFormRegister);
    }
  
    const handlerSubmit = async function (e) {
      e.preventDefault();

      if(userFormRegister.password1 == userFormRegister.password2){
        
        const userPost = { email: userFormRegister.email, name: userFormRegister.name, lastname: userFormRegister.lastname, age: userFormRegister.age, phone: userFormRegister.phone,  password:userFormRegister.password1 };
        
        if( (userPost.email == "" || userPost.email == undefined) || 
            (userPost.name == "" || userPost.name == undefined) || 
            (userPost.lastname == "" || userPost.lastname == undefined) || 
            (userPost.age == "" || userPost.age == undefined) || 
            (userPost.phone == "" || userPost.phone == undefined) || 
            (userPost.password == "" || userPost.password == undefined)){

          SetMessage("Faltan Datos");

        }else{

          const userPost_resp = await handlerUserPost(userPost);

          console.log(userPost_resp);
        
          if( userPost_resp.message == 'Posted' && userPost_resp.status == 201 && userPost_resp.result){

            SetMessage("Usuario Creado con Éxito");
            SetUserFormRegister(userFormRegister_init);
            navigate("/products/login");

          }else{

            SetMessage("Email ya existe o debes corregir algún dato");
          }

        }

      }else{

        SetMessage("Las Contraseñas no coinciden");
      }
    }

  return (

    <div style={{width: "100%", padding: "2rem", display: 'flex', flexDirection: 'column', justifyContent:'start', alignItems:'center'}}>
      <Form className='formregister' onSubmit={handlerSubmit}>
        <Form.Group className="formregister-title mb-3">
          <Form.Label className="formregister-title-text mb-0 fs-5 fw-bold text-secondary">Registrar Usuario</Form.Label>
        </Form.Group>
        <Form.Group className="formregister-group mb-1">
          <Form.Label className="formresgister-group-text mb-0">Email</Form.Label>
          <Form.Control size='sm' className="formregister-group-input mt-0" type="text" name='email' placeholder={userFormRegister.email} value={userFormRegister.email} onChange={handlerChange} />
        </Form.Group>
        <Form.Group className="formregister-group mb-1">
          <Form.Label className="formregister-group-text mb-0">Nombre</Form.Label>
          <Form.Control size='sm' className="formregister-group-input mt-0" type="text" name='name' placeholder={userFormRegister.name} value={userFormRegister.name} onChange={handlerChange} />
        </Form.Group>
        <Form.Group className="formregister-group mb-1">
          <Form.Label className="formregister-group-text mb-0">Apellido</Form.Label>
          <Form.Control size='sm' className="formregister-group-input mt-0" type="text" name='lastname' placeholder={userFormRegister.lastname} value={userFormRegister.lastname} onChange={handlerChange} />
        </Form.Group>
        <Form.Group className="formregister-group mb-1">
          <Form.Label className="formresgister-group-text mb-0">Teléfono</Form.Label>
          <Form.Control size='sm' className="formregister-group-input mt-0" type="text" name='phone' placeholder={userFormRegister.phone} value={userFormRegister.phone} onChange={handlerChange} />
        </Form.Group>
        <Form.Group className="formregister-group mb-1">
          <Form.Label className="formresgister-group-text mb-0">Edad</Form.Label>
          <Form.Control size='sm' className="formregister-group-input mt-0" type="text" name='age' placeholder={userFormRegister.age} value={userFormRegister.age} onChange={handlerChange} />
        </Form.Group>
        <Form.Group className="formregister-group mb-1">
          <Form.Label className="formresgister-group-text mb-0">Ingrese Contraseña</Form.Label>
          <Form.Control size='sm' className="formregister-group-input mt-0" type="password" name='password1' placeholder={userFormRegister.password1} value={userFormRegister.password1} onChange={handlerChange} />
        </Form.Group>
        <Form.Group className="formregister-group mb-1">
          <Form.Label className="formresgister-group-text mb-0">Repita Contraseña</Form.Label>
          <Form.Control size='sm' className="formregister-group-input mt-0" type="password" name='password2' placeholder={userFormRegister.password2} value={userFormRegister.password2} onChange={handlerChange} />
        </Form.Group>
        <Form.Group className='formregister-footer'>
          <Button className='formregister-footer-button' variant="dark" type="submit">Registrar</Button>
          <Form.Text className="formregister-footer-text text-muted">{message}</Form.Text>
        </Form.Group>
        
      </Form>
    </div>
  )
}

export default PageUserRegister
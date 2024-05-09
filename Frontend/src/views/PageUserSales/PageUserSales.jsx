import React, { useState } from 'react';
import MenuUser from '../../components/UserParts/MenuUser/MenuUser';
import '../PageUserSales/PageUserSales.css';
import { useContext } from 'react';
import { Context_User } from '../../contexts/Context_User.jsx';
import { useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';



function PageUserSales() {

  useEffect(() => {
    
    console.log(userSales);

  }, []);

  const receiving = useContext(Context_User);

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
    SetAccessLogin
  
  } = receiving;

  const userFormSale_init = { id: null, name: "", description: "", image: "", price: 0, category: "" }
  const [edit, SetEdit] = useState(false);
  const [add, SetAdd] = useState(false);
  const [enabled, SetEnabled] = useState(false);
  const [userFormSale, SetUserFormSale] = useState(userFormSale_init);
  const [message, SetMessage] = useState("");

  
  const handlerEdit = function (id) {

    SetEdit(true);
    SetAdd(false);
    SetEnabled(true);
    console.log(id);
    const index = FindIndexById(userSales,id);
    const userFormSale_actual = userSales[index];
    SetUserFormSale(userFormSale_actual); 
  }

  const handlerAdd = function (e) {

    SetEdit(false);
    SetAdd(true);
    SetEnabled(true)
    SetUserFormSale(userFormSale_init);
  }

  const handlerDelete = function (id) {

    handlerUserSaleDelete(id);
  }

  const handlerCancel = function (e) {
    SetUserFormSale(userFormSale_init);
    SetEdit(false);
    SetAdd(false);
    SetEnabled(false);
  }

  const handlerChange = function (e) {
    SetUserFormSale({ ...userFormSale, [e.target.name]: e.target.value });
    console.log(userFormSale);
  }

  const handlerSubmit = function (e) {
    e.preventDefault();
    console.log(e);
    const formDataImage = new FormData();
    formDataImage.append("file",e.target[1].value);
    console.log(formDataImage);
    console.log(userFormSale);


    if (edit == true) {
      handlerUserSalePut(userFormSale.id, userFormSale);
      console.log(userSales);
    } else if (add == true) {
      handlerUserSalePost(userFormSale, formDataImage);
    }
    console.log(userFormSale);
    console.log(userSales);
    SetUserFormSale(userFormSale_init);
    SetEdit(false);
    SetAdd(false);
    SetEnabled(false);
  }


  return (
    <div className='page'>
      <div className='header'>
        <MenuUser></MenuUser>
      </div>
      <div className='body'>
        <div className='form'>
          <Form style={{ width: "100%", padding: "1rem" }} onSubmit={handlerSubmit}>
            <Form.Group  className="mb-2">
              <Form.Label className="mb-0">Formulario Venta</Form.Label>
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label className="mb-0">Producto</Form.Label>
              {enabled == true ? <Form.Control size='sm' className="mt-0" type="text" name='name' placeholder={userFormSale.name} value={userFormSale.name} onChange={handlerChange} />:<Form.Control size='sm' className="mt-0" type="text" name='name' placeholder={userFormSale.name} value={userFormSale.name} onChange={handlerChange} disabled/>}
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label className="mb-0">Cargar Imagen</Form.Label>
              {enabled == true ? <Form.Control size='sm' className="mt-0" type="file" name='image'/>:<Form.Control size='sm' className="mt-0" type="file" name='image' disabled/>}
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label className="mb-0">Precio</Form.Label>
              {enabled == true ? <Form.Control size='sm' className="mt-0" type="text" name='price' placeholder={userFormSale.price} value={userFormSale.price} onChange={handlerChange} />:<Form.Control size='sm' className="mt-0" type="text" name='price' placeholder={userFormSale.price} value={userFormSale.price} onChange={handlerChange} disabled/>}
            </Form.Group>
            <Form.Group className="mb-1">
            {enabled == true ?
              <Form.Select onChange={handlerChange} name='category' aria-label="Default select example">
                <option>Categoría</option>
                <option value="pantalon">Pantalón</option>
                <option value="falda">Falda</option>
                <option value="camisa">Camisa</option>
                <option value="blusa">Blusa</option>
                <option value="zapatos">Zapatos</option>
                <option value="zapatillas">Zapatillas</option>
              </Form.Select>:
              <Form.Select onChange={handlerChange} name='category' aria-label="Default select example" disabled>
                <option>Categoría</option>
                <option value="pantalon">Pantalón</option>
                <option value="falda">Falda</option>
                <option value="camisa">Camisa</option>
                <option value="blusa">Blusa</option>
                <option value="zapatos">Zapatos</option>
                <option value="zapatillas">Zapatillas</option>
              </Form.Select>
            }
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label className="mb-0">Descripción:</Form.Label>
              {enabled == true ? <Form.Control as="textarea" name='description' rows={7}  placeholder={userFormSale.description} className='mt-3' value={userFormSale.description} onChange={handlerChange}/>:<Form.Control as="textarea" name='description' rows={7}  placeholder={userFormSale.description} className='mt-3' value={userFormSale.description} onChange={handlerChange} disabled/>}
            </Form.Group>
            {enabled == true ? <Button variant="primary" onClick={() => { handlerAdd()}} disabled >Nuevo</Button>:<Button variant="primary" onClick={() => { handlerAdd()}}>Nuevo</Button>}
            {enabled == true ? <Button variant="primary" onClick={() => { handlerCancel()}}>Cancelar</Button>:<Button variant="primary" onClick={() => { handlerCancel()}} disabled >Cancelar</Button>}
            {enabled == true ? <Button  variant="primary" type="submit">Guardar</Button>:<Button  variant="primary" type="submit"disabled>Guardar</Button>}
          </Form>

        </div>
        <div className='table'>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Producto</th>
                <th>Imagen</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {
                userSales.map((element, i) => {
                  return (
                    <tr key={element.id}>
                      <td>{i}</td>
                      <td>{element.name}</td>
                      <td>{element.image}</td>
                      <td>{element.price}</td>
                      <td>{element.category}</td>
                      <td><Button size='sm' variant="primary" onClick={() => { handlerEdit(element.id) }}>Editar</Button></td>
                      <td><Button size='sm' variant="danger" onClick={() => { handlerDelete(element.id) }}>X</Button></td>
                    </tr>
                  );
                })
              }
            </tbody>
          </Table>
        </div>

      </div>
    </div>
  )




}

export default PageUserSales
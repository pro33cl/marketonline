import React, { useState } from 'react';
import MenuUser from '../../components/UserParts/MenuUser/MenuUser';
import '../PageUserSales/PageUserSales.css';
import { useContext } from 'react';
import { Context_User } from '../../contexts/Context_User.jsx';
import { Context_Products } from '../../contexts/Context_Products.jsx';
import { useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import PagesIndex from '../../components/PageParts/PagesIndex/PagesIndex.jsx';
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
    SetAccessLogin,
    totalPagesUserSales,
    SetTotalPagesUserSales,
    pageUserSales, 
    SetPageUserSales
  
  } = receiving;

  const receiving2 = useContext(Context_Products);

  const {
    
    matrixProducts,
    pagination,
    SetPagination, 
    totalPages,
    SetTotalPages,
    page,
    SetPage,
    handlerMatrixProductsGet
  
  } = receiving2;


  const userFormSale_init = { id: null, name: "", description: "", file: "", image: "", price: 0, category: "" }
  const [edit, SetEdit] = useState(false);
  const [add, SetAdd] = useState(false);
  const [enabled, SetEnabled] = useState(false);
  const [userFormSale, SetUserFormSale] = useState(userFormSale_init);
  const [message, SetMessage] = useState("");

  
  const handlerEdit = function (id) {

    SetEdit(true);
    SetAdd(false);
    SetEnabled(true);
    const index = FindIndexById(userSales,id);
    const userFormSale_actual = userSales[index];
    console.log(userFormSale_actual);
    SetUserFormSale(userFormSale_actual);
    handlerShowImage(userFormSale_actual.image);
  }

  const handlerAdd = function (e) {

    SetEdit(false);
    SetAdd(true);
    SetEnabled(true)
    SetUserFormSale(userFormSale_init);
  }

  const handlerDelete = async function (id) {

    const userSaleDelete_resp = await handlerUserSaleDelete(id);

    console.log(userSaleDelete_resp);

    if(userSaleDelete_resp.message == 'Deleted' && userSaleDelete_resp.status == 200 && userSaleDelete_resp){

      const userSales_res = await handlerUserSalesGet();
      await handlerRefreshPageHome();
    }
  }

  const handlerCancel = function (e) {
    
    const formSaleFileInput = document.querySelector("#formfileinput");
    formSaleFileInput.value = ""; 
    handlerShowImage("");   
    SetUserFormSale(userFormSale_init);
    SetEdit(false);
    SetAdd(false);
    SetEnabled(false);
  }

  const handlerChangeInputFile = function(e){

    SetUserFormSale({ ...userFormSale, file: e.target.value });
    
    const formSale = document.querySelector("#formSale");
    const formData = new FormData(formSale);
    const imageUrl = URL.createObjectURL(formData.get("file"));

    handlerShowImage(imageUrl);
    
  }

  const handlerShowImage = function(imageValue){

    const formImage = document.querySelector("#formimage");
    formImage.setAttribute('src', imageValue);
  }

  const handlerChange = function (e) {
    SetUserFormSale({ ...userFormSale, [e.target.name]: e.target.value });
    console.log(userFormSale);
  }


  const handlerSubmit = async function (e) {
    
    e.preventDefault();
    let userSales_res
    const formSale = document.querySelector("#formSale");
    const formSaleFileInput = document.querySelector("#formfileinput");
    const formData = new FormData(formSale);
;
    if (edit == true) {

      const userSalePut_resp = await handlerUserSalePut(userFormSale.id, userFormSale, formData);
      
      if(userSalePut_resp.message == 'Posted' && userSalePut_resp.status == 201 && userSalePut_resp.result){

        userSales_res = await handlerUserSalesGet();
        await handlerRefreshPageHome();
        SetUserFormSale(userFormSale_init);
        formSaleFileInput.value = "";
        handlerShowImage("");
        SetEdit(false);
        SetAdd(false);
        SetEnabled(false);
        SetMessage("Datos modificados con éxito");

      }else{

        SetMessage("Error al modificar datos");
      }

    } else if (add == true) {

      const userSalePost_resp = await handlerUserSalePost(userFormSale, formData);

      if(userSalePost_resp.message == 'Posted' && userSalePost_resp.status == 201 && userSalePost_resp.result){

        userSales_res = await handlerUserSalesGet();
        await handlerRefreshPageHome();
        SetUserFormSale(userFormSale_init);
        formSaleFileInput.value = "";
        handlerShowImage("");
        SetEdit(false);
        SetAdd(false);
        SetEnabled(false);
        SetMessage("Datos cargados con éxito");

      }else{

        SetMessage("Error al cargar datos");
      }
    }
  }

  const handlerRefreshPageHome = async function(){

    handlerMatrixProductsGet(pagination.category, pagination.search , pagination.orderby, pagination.limit, page);

  }


  return (
    <div className='page'>
      <div className='header'>
        <MenuUser></MenuUser>
      </div>
      <div className='body'>
        <div className='form'>
          <Form id='formSale'  style={{ width: "100%", padding: "1rem" }} onSubmit={handlerSubmit}>
            <Form.Group  className="mb-2">
              <Form.Label className="mb-0">Formulario Venta</Form.Label>
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label className="mb-0">Producto</Form.Label>
              {enabled == true ? <Form.Control size='sm' className="mt-0" type="text" name='name' placeholder={userFormSale.name} value={userFormSale.name} onChange={handlerChange} />:<Form.Control size='sm' className="mt-0" type="text" name='name' placeholder={userFormSale.name} value={userFormSale.name} onChange={handlerChange} disabled/>}
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label className="mb-0">Cargar Imagen</Form.Label>
              {enabled == true ? <Form.Control size='sm' className="mt-0" type="file" name='file' onChange={handlerChangeInputFile} id='formfileinput' />:<Form.Control size='sm' className="mt-0" type="file" name='file' onChange={handlerChangeInputFile} id='formfileinput' disabled/>}
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
            <Form.Group className="mb-1">
              <Image id='formimage' width={'200px'} rounded/>
            </Form.Group>
            <Form.Group className="mb-1">
              {enabled == true ? <Button variant="primary" onClick={() => { handlerAdd()}} disabled >Nuevo</Button>:<Button variant="primary" onClick={() => { handlerAdd()}}>Nuevo</Button>}
              {enabled == true ? <Button variant="primary" onClick={() => { handlerCancel()}}>Cancelar</Button>:<Button variant="primary" onClick={() => { handlerCancel()}} disabled >Cancelar</Button>}
              {enabled == true ? <Button  variant="primary" type="submit">Guardar</Button>:<Button  variant="primary" type="submit"disabled>Guardar</Button>}
              <Form.Label className="mb-0">{message}</Form.Label>
            </Form.Group>
          </Form>

        </div>
        <div className='table'>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Producto</th>
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
                      <td>{i+1}</td>
                      <td>{element.name}</td>
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
          <PagesIndex totalPages={totalPagesUserSales} page={pageUserSales} SetPage={SetPageUserSales}></PagesIndex>
        </div>

      </div>
    </div>
  )




}

export default PageUserSales
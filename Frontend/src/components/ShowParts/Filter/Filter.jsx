import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';



function Filter(props) {

    const { pagination, SetPagination } = props;

    const formSearch = document.querySelector("#formFilterSearch");
    const formCategory = document.querySelector("#formFilterCategory");
    const formOrderBy= document.querySelector("#formFilterOrderBy");
    const [formFilter, SetFormFilter] = useState(""); 

    const handlerSubmit = function(e){

        e.preventDefault();

        let category;
        let orderby;
        let search;

        category = formCategory.value;
        if(category == 'Categoría'){

            category = "";

        }else{

            category = formCategory.value;
        }

        const OrderBy = formOrderBy.value;
        if(OrderBy == 'Ordenar por'){

            orderby = "id_ASC";

        }else{

            orderby = formOrderBy.value;
        }

        search = formSearch.value;
        SetFormFilter(search);
        
        console.log(category);
        console.log(search);
        console.log(orderby);

        const paginationActual =  {category: category, search: search, orderby: orderby, limit: 10};
        const paginationActual_copy = JSON.parse(JSON.stringify(paginationActual));
        console.log(paginationActual);
        SetPagination(paginationActual_copy);

    }

    const handlerClean = function(e){

        const paginationInit =  {category:"", search: "", orderby: "id", order: "ASC", limit: 10};
        const paginationInit_copy = JSON.parse(JSON.stringify(paginationInit));
        console.log(paginationInit);
        SetPagination(paginationInit_copy);
        SetFormFilter("");
        formCategory.value = "Categoría";
        formOrderBy.value = "Ordenar por";
    }


    const handlerChange = function (e) {
        SetFormFilter(e.target.value);
      }

    return (

        <Form id='formfilter' style={{ width: "100%", padding: "1rem" }} onSubmit={handlerSubmit}>
            <Form.Group className="mb-1">
                <Form.Control size='sm' className="mt-0" type="text" name='search' placeholder='Buscar' id='formFilterSearch' value={formFilter} onChange={handlerChange}/>
                <Form.Select size='sm' name='category' aria-label="Default select example" id='formFilterCategory'>
                        <option>Categoría</option>
                        <option value="pantalon">Pantalón</option>
                        <option value="falda">Falda</option>
                        <option value="camisa">Camisa</option>
                        <option value="blusa">Blusa</option>
                        <option value="zapatos">Zapatos</option>
                        <option value="zapatillas">Zapatillas</option>
                </Form.Select>
                <Form.Select size='sm' name='orderby' aria-label="Default select example" id='formFilterOrderBy'>
                        <option>Ordenar por</option>
                        <option value="price_ASC">Precio: menor a mayor</option>
                        <option value="price_DESC">Precio: mayor a menor</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-1">
                <Button variant="primary" type="submit">Filtrar</Button>
                <Button variant="primary" onClick={() => { handlerClean() }}>Limpiar Filtros</Button>   
            </Form.Group>   
        </Form>
    )
}

export default Filter
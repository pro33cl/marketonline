import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Filter/Filter.css';



function Filter(props) {

    const { pagination, SetPagination } = props;

    const formSearch = document.querySelector("#formFilterSearch");
    const formCategory = document.querySelector("#formFilterCategory");
    const formOrderBy = document.querySelector("#formFilterOrderBy");
    const [formFilterSearch, SetFormFilterSearch] = useState("");
    const [formFilterCategory, SetFormFilterCategory] = useState("Categoría");
    const [formFilterOrderBy, SetFormFilterOrderBy] = useState("Ordenar por");


    const handlerFormInit = function () {

        SetFormFilterSearch("");
        SetFormFilterCategory("Categoría");
        SetFormFilterOrderBy("Ordenar por");
        formSearch.value = "";
        formCategory.value = "Categoría";
        formOrderBy.value = "Ordenar por";

    }

    const handlerLoad = function (e) {

        handlerFormInit();
    }

    const handlerSubmit = function (e) {

        e.preventDefault();

        let category;
        let orderby;
        let search;

        category = formFilterCategory;
        if (category == 'Categoría') {

            category = "";

        } else {

            category = formFilterCategory;
        }

        const OrderBy = formFilterOrderBy;
        if (OrderBy == 'Ordenar por') {

            orderby = "id_ASC";

        } else {

            orderby = formFilterOrderBy;
        }

        search = formFilterSearch;

        console.log(category);
        console.log(search);
        console.log(orderby);

        const paginationActual = { category: category, search: search, orderby: orderby, limit: 10 };
        const paginationActual_copy = JSON.parse(JSON.stringify(paginationActual));
        console.log(paginationActual);
        SetPagination(paginationActual_copy);
    }

    const handlerClean = function (e) {

        const paginationInit = { category: "", search: "", orderby: "id", order: "ASC", limit: 10 };
        const paginationInit_copy = JSON.parse(JSON.stringify(paginationInit));
        console.log(paginationInit);
        SetPagination(paginationInit_copy);
        handlerFormInit();
    }


    const handlerChangeSearch = function (e) {
        SetFormFilterSearch(e.target.value);
    }

    const handlerChangeCategory = function (e) {
        SetFormFilterCategory(e.target.value);
    }

    const handlerChangeOrderBy = function (e) {
        SetFormFilterOrderBy(e.target.value);
    }







    return (

        <Form id='formfilter' className='formfilter' onSubmit={handlerSubmit} onLoad={handlerLoad}>
            <Form.Group className="mb-1 formfilter-inputs">
                <Form.Control size='sm' className="mt-0 formfilter-inputs-search" type="text" name='search' placeholder='Buscar' id='formFilterSearch' value={formFilterSearch} onChange={handlerChangeSearch} />
                <Form.Select size='sm' className='formfilter-inputs-category' name='category' aria-label="Default select example" id='formFilterCategory' onChange={handlerChangeCategory}>
                    <option>Categoría</option>
                    <option value="pantalon">Pantalón</option>
                    <option value="falda">Falda</option>
                    <option value="camisa">Camisa</option>
                    <option value="blusa">Blusa</option>
                    <option value="zapatos">Zapatos</option>
                    <option value="zapatillas">Zapatillas</option>
                </Form.Select>
                <Form.Select size='sm' className='formfilter-inputs-orderby' name='orderby' aria-label="Default select example" id='formFilterOrderBy' onChange={handlerChangeOrderBy}>
                    <option>Ordenar por</option>
                    <option value="price_ASC">Precio: menor a mayor</option>
                    <option value="price_DESC">Precio: mayor a menor</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-1 formfilter-button">
                <Button variant="dark" type="submit" className='formfilter-button-filter'>Filtrar</Button>
                <Button variant="dark" onClick={() => { handlerClean() }} className='formfilter-button-clean'>Limpiar Filtros</Button>
            </Form.Group>
        </Form>
    )
}

export default Filter
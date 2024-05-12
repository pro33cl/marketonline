import React, { createContext, useState } from 'react';
import { useEffect} from "react";
import {URLBASE} from "../constants/constants.js";



export const Context_Products = createContext();


const Context_Products_Provider = ({children}) =>{

    const [matrixProducts, SetMatrixProducts] = useState([]);
    const [pagination, SetPagination] = useState({category:"", search: "", orderby: "id_ASC", limit: 10});
    const [totalPages, SetTotalPages] = useState(1);
    const [page, SetPage] = useState(1);

    
    const urlServer = URLBASE;

    useEffect(()=>{

        console.log(pagination);
        handlerMatrixProductsGet(pagination.category, pagination.search , pagination.orderby, pagination.limit, page);
     
      },[page, pagination]);

    
    const ApiProductsGet = async function(category, search, orderby, limit, page){

        console.log(category);
        console.log(search);
        console.log(orderby);
        console.log(limit);
        console.log(page);

        const resp = await fetch(`${urlServer}/products/?category=${category}&search=${search}&orderby=${orderby}&limit=${limit}&page=${page}`);
        const products = await resp.json();
        console.log(products);
        SetTotalPages(products.result.totalpages);
        return products.result.products;
    }

   
    const handlerMatrixProductsGet = async function(category, search, orderby, limit, page){
        const matrix = await ApiProductsGet(category, search, orderby, limit, page);
        console.log(matrix);
        const matrix_copy = JSON.parse(JSON.stringify(matrix));
        SetMatrixProducts(matrix_copy);
    }

    const exporting = {

        matrixProducts,
        pagination,
        SetPagination, 
        totalPages,
        SetTotalPages,
        page,
        SetPage,
        handlerMatrixProductsGet

    };

    return (
        <Context_Products.Provider value={exporting}>
            {children}
        </Context_Products.Provider>
      );

};


export default Context_Products_Provider;
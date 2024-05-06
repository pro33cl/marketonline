import React, { createContext, useState } from 'react';
import { useEffect} from "react";
import {URLBASE} from "../constants/constants.js";



export const Context_Products = createContext();


const Context_Products_Provider = ({children}) =>{

    const [matrixProducts, SetMatrixProducts] = useState([]);
    const [pagination, SetPagination] = useState({category:"", search: "", orderby: "id", order: "ASC", limit: 10, page: 1});
    const [totalPages, SetTotalPages] = useState(1);
    const urlServer = URLBASE;

    useEffect(()=>{

        handlerMatrixProductsGet(pagination.category, pagination.search , pagination.orderby, pagination.order, pagination.limit, pagination.page);
     

      },[pagination]);

    
    const ApiProductsGet = async function(category, search, orderby, order, limit, page){

        const resp = await fetch(`${urlServer}/products/?category=${category}&search=${search}&orderby=${orderby}&order=${order}&limit=${limit}&page=${page}`);
        const products = await resp.json();
        SetTotalPages(products.result.totalpages);
        return products.result.products;
    }

   
    const handlerMatrixProductsGet = async function(category, search, orderby, order, limit, page){
        const matrix = await ApiProductsGet(category, search, orderby, order, limit, page);
        console.log(matrix);
        const matrix_copy = JSON.parse(JSON.stringify(matrix));
        SetMatrixProducts(matrix_copy);
    }


    return (
        <Context_Products.Provider value={{matrixProducts, pagination, SetPagination, totalPages, SetTotalPages}}>
            {children}
        </Context_Products.Provider>
      );

};


export default Context_Products_Provider;
import React, { createContext, useState } from 'react';
import { useEffect} from "react";
import {URLBASE} from "../constants/constants.js";



export const Context_Products = createContext();


const Context_Products_Provider = ({children}) =>{

    const [matrixProducts, SetMatrixProducts] = useState([]);
    const urlServer = URLBASE;

    useEffect(()=>{

        handlerMatrixProductsGet();

      },[]);

    
    const ApiProductsGet = async function(){
        const resp = await fetch(`${urlServer}/products`);
        const products = await resp.json();
        return products;
        /*
       const matrix_products = [
            {id: 0, name: "feer", description:"ernwren qerq oerf or", images:["fer","erer","rvwr"], price: 5000, evaluation: 4.9, category: "shoes", seller: "wwfw"},
            {id: 1, name: "vrvr", description:"ernwrere", images:["fer","erer","rvwr"], price: 6000, evaluation: 4.2, category: "t-shirt", seller: "wwfw"},
            {id: 2, name: "vrvr", description:"ernwrere", images:["fer","erer","rvwr"], price: 7000, evaluation: 4.3, category: "t-shirt", seller: "wwfw"},
            {id: 3, name: "vrvr", description:"ernwrere", images:["fer","erer","rvwr"], price: 8000, evaluation: 4.3, category: "pants", seller: "wwfw"},
            {id: 4, name: "vrvr", description:"ernwrerfee", images:["fer","erer","rvwr"], price: 9000, evaluation: 4.3, category: "pants", seller: "wwfw"},
            {id: 5, name: "vrvr", description:"ernwrg4g4erfee", images:["fer","erer","rvwr"], price: 10000, evaluation: 4.0, category: "pants", seller: "wwfw"},
        ];
        return matrix_products;
        */
    }
    


    const handlerMatrixProductsGet = async function(){
        const matrix = await ApiProductsGet();
        console.log(matrix);
        const matrix_copy = JSON.parse(JSON.stringify(matrix));
        SetMatrixProducts(matrix_copy);
    }

    return (
        <Context_Products.Provider value={{matrixProducts}}>
            {children}
        </Context_Products.Provider>
      );

};


export default Context_Products_Provider;
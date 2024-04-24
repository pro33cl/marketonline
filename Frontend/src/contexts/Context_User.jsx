import React, { createContext, useState } from 'react';
import { useEffect} from "react";
import {URLBASE} from "../constants/constants.js";


export const Context_User = createContext();


const Context_User_Provider = ({children}) =>{

    const [user, SetUser] = useState({});
    const [userSales, SetUserSales] = useState([])
    const urlServer = URLBASE;


    const ApiUserLoginPost = async function(email, password){
        const login = {email:email, password:password}
        const configuration= { 
            method: 'POST',
            body: JSON.stringify(login)
        };
        const resp = await fetch(`${urlServer}/login`,configuration);
        const user_post = await resp.json();
        return user_post;
    }

    
    const ApiUserGet = async function(id){
        const resp = await fetch(`${urlServer}/users/${id}`);
        const user = await resp.json();
        return user;

        /*const user = {id: 0, email:"email@email.com", password:"ERFWERFee", birthday: "05/05/1985", name: "frtg4", lastname: "wfwef", phone: "+5699988522" };
        return user;
        */
    }

    const ApiUserPut = async function(id, userPut){
        
        const configuration= { 
            method: 'PUT',
            body: JSON.stringify(userPut)
        };
        const resp = await fetch(`${urlServer}/users/${id}`,configuration);
        const user_put = await resp.json();
        return user_put;

    }

    const ApiUserPost = async function(userPost){
        
        const configuration= { 
            method: 'POST',
            body: JSON.stringify(userPost)
        };
        const resp = await fetch(`${urlServer}/users`,configuration);
        const user_post = await resp.json();
        return user_post;

    }

    const ApiUserSalesGet = async function(){
        const resp = await fetch(`${urlServer}/users_sales`);
        const users_sales = await resp.json();
        return users_sales;
    }

    const ApiUserSalePost = async function(userSalePost){

        const configuration= { 
            method: 'POST',
            body: JSON.stringify(userSalePost)
        };
        const resp = await fetch(`${urlServer}/users_sales`,configuration);
        const user_sale = await resp.json();
        return user_sale;

    }

    const ApiUserSalePut = async function(id, userSalePut){

        const configuration= { 
            method: 'PUT',
            body: JSON.stringify(userSalePut)
        };
        const resp = await fetch(`${urlServer}/users_sales/${id}`,configuration);
        const user_sale = await resp.json();
        return user_sale;

    }

    const ApiUserSaleDelete = async function(id, userSaleDelete){

        const configuration= { 
            method: 'DELETE',
            body: JSON.stringify(userSaleDelete)
        };
        const resp = await fetch(`${urlServer}/users_sales/${id}`,configuration);
        const user_sale = await resp.json();
        return user_sale;

    }

    const handlerUserLogin = async function(email, password){
        //const token = await ApiUserPost(email, password);
        if(email="email2@email.com" && password=="12345"){
            return true;
        }
        else{
            return false;
        }
    }


    const handlerUserGet = async function(id){
        const user_actual = await ApiUserGet(id);
        const user_copy = JSON.parse(JSON.stringify(user_actual));
        SetUser(user_copy);
    }

    const handlerUserPut = async function(id, userPut){
        const user_actual = await ApiUserPut(id, userPut);
        const user_actual_copy = JSON.parse(JSON.stringify(user_actual));
        SetUser(user_actual_copy);
    }

    const handlerUserPost = async function(userPost){
        const userPost_actual = await ApiUserPost(userPost);
        const userPost_actual_copy = JSON.parse(JSON.stringify(userPost_actual));
        SetUser(userPost_actual_copy);
    }

    
    const handlerUserSalesGet = async function(){
        const userSales_actual = await ApiUserSalesGet();
        const userSales_copy = JSON.parse(JSON.stringify(userSales_actual));
        SetUserSales(userSales_copy);
    }

    const handlerUserSalePost = async function(userSalePost){
        let userSales_actual = [];
        const userSalePost_actual = await ApiUserSalePost(userSalePost);
        const userSalePost_actual_copy = JSON.parse(JSON.stringify(userSalePost_actual));
        userSales_actual = JSON.parse(JSON.stringify(userSales));
        userSales_actual.push(userSalePost_actual_copy);
        SetUserSales(userSales_actual);
    }

    const handlerUserSalePut = async function(id, userSalePut){
        let userSales_actual = [];
        let index;
        console.log(userSalePut);
        const userSalePut_actual = await ApiUserSalePut(id, userSalePut);
        const userSalePut_actual_copy = JSON.parse(JSON.stringify(userSalePut_actual));
        userSales_actual = JSON.parse(JSON.stringify(userSales));
        console.log(userSales_actual);
        index = FindIndexById(userSales_actual,id);
        userSales_actual[index]=userSalePut_actual_copy;
        console.log(userSales_actual)
        SetUserSales(userSales_actual);
        console.log(userSales)
        
    }

    const handlerUserSaleDelete = async function(id){
        let userSales_actual = [];
        let index;
        const userSaleDelete_actual = await ApiUserSaleDelete(id);
        const userSaleDelete_actual_copy = JSON.parse(JSON.stringify(userSaleDelete_actual));
        userSales_actual = JSON.parse(JSON.stringify(userSales));
        index = FindIndexById(userSales_actual, id);
        userSales_actual.splice(index,1);
        SetUserSales(userSales_actual);
    }

    const FindIndexById = function(matrix, id){
        let index;
        matrix.forEach((element,i)=>{
            if(element.id == id){
                index = i;
            }
        });
        return index;
    }


    const exporting = {
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
        FindIndexById
    
    };


    return (
        <Context_User.Provider value={exporting}>
            {children}
        </Context_User.Provider>
      );

};


export default Context_User_Provider;
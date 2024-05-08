import React, { createContext, useState } from 'react';
import { useEffect} from "react";
import {URLBASE} from "../constants/constants.js";


export const Context_User = createContext();


const Context_User_Provider = ({children}) =>{

    const [user, SetUser] = useState({});
    const [userSales, SetUserSales] = useState([]);
    const accessLogin_Init = {token: "", message: "", status:0, login: false};
    const [accessLogin, SetAccessLogin]= useState(accessLogin_Init);

    const urlServer = URLBASE;


    useEffect(()=>{

        handlerUserGet();
    
    },[accessLogin]);

// ----------------------------------------------------------
// FUNCIONES PARA PAGEUSERREGISTER
// ----------------------------------------------------------

    const ApiUserPost = async function(userPost){
            
        const configuration= { 
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userPost)
        };

        const urlApi =`${urlServer}/products/register/`;
        const resp = await fetch(urlApi,configuration);
        const user_post = await resp.json();
        return user_post;

    }

    const handlerUserPost = async function(userPost){
        console.log(userPost);
        const userPost_actual = await ApiUserPost(userPost);
        //const userPost_actual_copy = JSON.parse(JSON.stringify(userPost_actual));
        //SetUser(userPost_actual_copy);
    }

// ----------------------------------------------------------
// FUNCIONES PARA PAGEUSERLOGIN
// ----------------------------------------------------------

    const ApiUserLoginPost = async function(email, password){
        const login_data = {email:email, password:password}
        const configuration= { 
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(login_data)
        };
        const urlApi =`${urlServer}/products/login/`;

        const resp = await fetch(urlApi,configuration);
        return resp;
    }

    const handlerRefreshAccess = function(access_token, access_message, access_status, access_login){
        const accessLogin_Actual = {token: access_token, message: access_message, status: access_status, login: access_login};
        SetAccessLogin(accessLogin_Actual);
    } 

    const handlerUserLogin = async function(email, password){
        
        const access = await ApiUserLoginPost(email, password);
        const accessJson = await access.json();

        let access_token;
        let access_message;
        let access_login;
        let access_status;

        
        access_token = JSON.parse(JSON.stringify(accessJson.result));
        access_message = accessJson.message;
        access_status = access.status;

        if(access_status == 200 && access_token && access_message == "Login successfully" ){
            
            access_login = true;
            
        }else{

            access_login = false;
            access_token = "";
        }

        handlerRefreshAccess(access_token, access_message, access_status, access_login);

        return {respToken: access_token, respMessage: access_message, respStatus: access_status, respLogin: access_login};
    }

// ----------------------------------------------------------
// FUNCIONES PARA PAGEUSERDATA
// ----------------------------------------------------------
    
    const ApiUserGet = async function(){

        const configuration= { 
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${accessLogin.token}`
            }
        };

        const urlApi =`${urlServer}/products/user/data`;

        const resp = await fetch(urlApi, configuration);
        return resp;
    }

    const handlerUserGet = async function(){
        const user_actual = await ApiUserGet();
        const userJson = await user_actual.json();
        const user_message = userJson.message;
        const user_result = {email: userJson.result.email, name: userJson.result.name, lastname: userJson.result.lastname, age: userJson.result.age, phone: userJson.result.phone};
        const user_result_copy = JSON.parse(JSON.stringify(user_result));
        const user_status = user_actual.status;
        const user_resp = {message: user_message, result: user_result_copy, status: user_status};

        if(user_resp.status == 200 && user_resp.message == "Success" && user_resp.result){

            handlerRefreshUser(user_resp.result);
        }else{

            handlerRefreshUser({});
        }
    }

    const ApiUserPut = async function(user){
        
        const userPut = {email: user.email, name: user.name, lastname: user.lastname, age: user.age, phone: user.phone, password: user.password };

        console.log(userPut);

        const config= { 
            method: 'PUT',

            headers: {
                'Authorization': `Bearer ${accessLogin.token}`,
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userPut)
        };

        const urlApi =`${urlServer}/products/user/data`;

        const resp = await fetch(urlApi, config);
        return resp;
    }

    const handlerUserPut = async function(userPut){
        const user_actual = await ApiUserPut(userPut);
        const userJson = await user_actual.json();
        const user_message = userJson.message;
        const user_result = {email: userJson.result.email, name: userJson.result.name, lastname: userJson.result.lastname, age: userJson.result.age, phone: userJson.result.phone};
        const user_result_copy = JSON.parse(JSON.stringify(user_result));
        const user_status = user_actual.status;
        const user_resp = {message: user_message, result: user_result_copy, status: user_status};

        if(user_resp.status == 200 && user_resp.message == "Success" && user_resp.result){

            handlerRefreshUser(user_resp.result);
        }else{

            handlerRefreshUser({});
        }
    }

    const handlerRefreshUser = function(user_act){

        const user_actual = {email: user_act.email, name: user_act.name, lastname: user_act.lastname, age: user_act.age, phone: user_act.phone};
        const user_actual_copy = JSON.parse(JSON.stringify(user_actual));
        SetUser(user_actual_copy);
    }

// ----------------------------------------------------------
// FUNCIONES PARA PAGEUSERSALES
// ----------------------------------------------------------

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
        FindIndexById,
        handlerUserLogin,
        handlerRefreshAccess,
        accessLogin,
        SetAccessLogin
    };


    return (
        <Context_User.Provider value={exporting}>
            {children}
        </Context_User.Provider>
      );

};


export default Context_User_Provider;
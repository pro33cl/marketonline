import React, { createContext, useState } from 'react';
import { useEffect} from "react";
import {URLBASE} from "../constants/constants.js";


export const Context_User = createContext();


const Context_User_Provider = ({children}) =>{

    const [user, SetUser] = useState({});
    const [userSales, SetUserSales] = useState([]);
    const accessLogin_Init = {token: "", message: "", status:0, login: false};
    const [accessLogin, SetAccessLogin]= useState(accessLogin_Init);
    const [pageUserSales, SetPageUserSales]= useState(1);
    const [totalPagesUserSales, SetTotalPagesUserSales] = useState(1);

    const urlServer = URLBASE;


    useEffect(()=>{

        const user_res = handlerUserGet();
    
    },[accessLogin]);

    useEffect(()=>{

        const userSales_res = handlerUserSalesGet();

    },[accessLogin, pageUserSales]);

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
        return resp;
            
    }

    const handlerUserPost = async function(userPost){
        console.log(userPost);
        const userPost_actual = await ApiUserPost(userPost);
        const userPostJson = await userPost_actual.json();

        const userPost_message = userPostJson.message;
        const userPost_result = {email: userPostJson.result.email, name: userPostJson.result.name, lastname: userPostJson.result.lastname, age: userPostJson.result.age, phone: userPostJson.result.phone};
        const userPost_status = userPost_actual.status;
        const userPost_resp = {message: userPost_message, result: userPost_result, status: userPost_status};
        console.log(userPost_resp);
        return userPost_resp;
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
        
        try {

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
            return {message: access_message , result: {token: access_token, login: access_login} , status: access_status};

        } catch (error) {

            return {message: error , result: null, status: 400};
        }
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

        try {

            const user_actual = await ApiUserGet();
            const userJson = await user_actual.json();
            const user_message = userJson.message;
            const user_result = {email: userJson.result.email, name: userJson.result.name, lastname: userJson.result.lastname, age: userJson.result.age, phone: userJson.result.phone};
            const user_result_copy = JSON.parse(JSON.stringify(user_result));
            const user_status = user_actual.status;
            const user_resp = {message: user_message, result: user_result_copy, status: user_status};

            if(user_resp.status == 200 && user_resp.message == "Success" && user_resp.result){

                handlerRefreshUser(user_resp.result);
                return {message: user_resp.message, result: user_resp.result, status: user_resp.status};

            }else{

                handlerRefreshUser({});
                return {message: user_resp.message, result: null, status: user_resp.status};

            }
            
        } catch (error) {

            return {message: error, result: null, status: 400}; 
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

        const configuration= { 
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${accessLogin.token}`
            }
        };

        const urlApi =`${urlServer}/products/user/sales/?page=${pageUserSales}`;
        const resp = await fetch(urlApi, configuration);
        return resp;
    }

    const handlerUserSalesGet = async function(){

        try {
            
            const userSales_actual = await ApiUserSalesGet();
            const userSalesJson = await userSales_actual.json();
            const userSales_message = userSalesJson.message;
            const userSales_result = userSalesJson.result;
            const userSales_result_copy = JSON.parse(JSON.stringify(userSales_result));
            const userSales_status = userSales_actual.status;
            let userSales_resp = {message: userSales_message, result: userSales_result_copy, status: userSales_status};
            console.log(userSales_resp);

            if(userSales_resp.message == 'Success' && userSales_resp.status == 200 && userSales_resp.result){

                handlerRefreshUserSales(userSales_resp.result.sales);
                SetTotalPagesUserSales(userSales_resp.result.totalpages);
                return {message: userSales_resp.message, result: userSales_resp.result, status: userSales_resp.status};

            }else{

                handlerRefreshUserSales([]);
                SetTotalPagesUserSales(1);
                return {message: userSales_resp.message, result: null, status: userSales_resp.status};
            }

        } catch (error) {
            
            return {message: error, result: null, status: 400};
        }
    }

    const handlerRefreshUserSales = function(userSales_actual){

        const userSales_actual_copy = JSON.parse(JSON.stringify(userSales_actual));
        SetUserSales(userSales_actual_copy);
    }


    const ApiUserSalePost = async function(userSalePost){

        console.log(userSalePost);

        const config= { 
            method: 'POST',

            headers: {
                'Authorization': `Bearer ${accessLogin.token}`,
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userSalePost)
        };

        const urlApi =`${urlServer}/products/user/sales`;

        const resp = await fetch(urlApi, config);
        return resp;
    }

    const ApiUserSaleImagePost = async function(id_product, formDataImage){

        const config= { 
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessLogin.token}`
            },
            body: formDataImage
        };

        const urlApi =`${urlServer}/productimage/${id_product}`;
        const resp = await fetch(urlApi, config);
        return resp;
    }

    const handlerUserSalePost = async function(userSalePost, formDataImage){
        
        try {
            
            const userSalePost_formated = {name: userSalePost.name, 
                image: "image", 
                image_name: "image", 
                description: userSalePost.description, 
                price: userSalePost.price, 
                category: userSalePost.category };

            const userSalePost_actual = await ApiUserSalePost(userSalePost_formated);
            const userSalePostJson = await userSalePost_actual.json();
            const userSalePost_message = userSalePostJson.message;
            const userSalePost_result = userSalePostJson.result;
            const userSalePost_status = userSalePost_actual.status;
            const userSalePost_resp = {message: userSalePost_message, result: userSalePost_result, status: userSalePost_status};

            console.log(userSalePost_resp);

            if(userSalePost_resp.message == 'Posted' && userSalePost_resp.status == 201 && userSalePost_resp.result){

                const userSaleImagePost = await ApiUserSaleImagePost(userSalePost_resp.result.id, formDataImage);
                const userSaleImagePostJson = await userSaleImagePost.json();
                const userSaleImagePost_message = userSaleImagePostJson.message;
                const userSaleImagePost_result = userSaleImagePostJson.result;
                const userSaleImagePost_status = userSaleImagePost.status;
                const userSaleImagePost_resp = {message: userSaleImagePost_message, result: userSaleImagePost_result, status: userSaleImagePost_status};

                if(userSaleImagePost_resp.message == 'Posted' && userSaleImagePost_resp.status == 201 && userSaleImagePost_resp.result){

                    let userSales_actual = [];
                    const userSalePostJson_copy = JSON.parse(JSON.stringify(userSalePostJson));
                    userSales_actual = JSON.parse(JSON.stringify(userSales));
                    userSales_actual.push(userSalePostJson_copy);
                    handlerRefreshUserSales(userSales_actual);

                }else{

                    return {message: userSaleImagePost_resp.message, result: userSaleImagePost_resp.result , status: userSaleImagePost_resp.status};
                }

            }else{

                return {message: userSalePost_resp.message, result: userSalePost_resp.result , status: userSalePost_resp.status};
            }

        } catch (error) {
            
            return {message: error, result: null , status: 400};
        } 
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
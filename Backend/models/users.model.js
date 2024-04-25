// ----------------------------------------------------------
// IMPORTANDO
// ----------------------------------------------------------

import {pool} from "../database/connection.js";
import format from "pg-format";

// ----------------------------------------------------------
// FUNCIONES
// ----------------------------------------------------------

const findAll_Users = async function(){}

const findByFilter_Users = async function(){}

// FUNCION - FINDIDBYEMAIL_USER
const findByEmail_User = async function(email){

    const query = "SELECT * FROM users WHERE email = '%s'";
    const values = email;
    const formattedQuery = format(query, values);
    const {rows} = await pool.query(formattedQuery);
    return rows[0];
}

// FUNCION - FINDIDBYEMAIL_USER
const ifExistEmail_User = async function(email){

    const user = await findByEmail_User(email);

    if(user.email && user.email != undefined){

        return true;
    }else{

        return false;
    }
}


// FUNCION - FINDBYID_USER
const findById_User = async function(id){

    const query = "SELECT * FROM users WHERE id = %s";
    const values = id;
    const formattedQuery = format(query, values);
    const {rows} = await pool.query(formattedQuery);
    return rows[0];
} 

// FUNCION - CREATE_USER
const create_User = async function(user){

    const query = "INSERT INTO users (email, name, lastname, age, phone) VALUES ('%s', '%s', '%s', %s, '%s') RETURNING *";
    const values = [user.email, user.name, user.lastname, user.age, user.phone];
    const formattedQuery = format(query, ...values);
    const {rows} = await pool.query(formattedQuery);
    return rows[0]; 
} 

// FUNCION - UPDATEBYID_USER
const updateById_User = async function(id, user){

    let query;
    let formattedQuery;

    if(user.email && user.email != undefined && isNaN(user.email)){

        query = `UPDATE users SET email = '%s' WHERE id = %s`;
        formattedQuery = format(query, user.email, id);
        let {rows} = await pool.query(formattedQuery);
    }

    if(user.name && user.name != undefined && isNaN(user.name)){

        query = `UPDATE users SET name = '%s' WHERE id = %s`;
        formattedQuery = format(query, user.name, id);
        let {rows} = await pool.query(formattedQuery);
    }

    if(user.lastname && user.lastname != undefined && isNaN(user.lastname)){

        query = `UPDATE users SET lastname = '%s' WHERE id = %s`;
        formattedQuery = format(query, user.lastname, id);
        let {rows} = await pool.query(formattedQuery);
    }

    if(user.age && user.age != undefined && !isNaN(user.age)){

        query = `UPDATE users SET age = %s WHERE id = %s`;
        formattedQuery = format(query, user.age, id);
        let {rows} = await pool.query(formattedQuery);
    }

    if(user.phone && user.phone != undefined && isNaN(user.phone)){

        query = `UPDATE users SET phone = %s WHERE id = %s`;
        formattedQuery = format(query, user.phone, id);
        let {rows} = await pool.query(formattedQuery);
    }

    const response = await findById_User(Number(id));
    return response;
}

const removeById_User = async function(){}



export const usersModel = {findAll_Users, findByFilter_Users, findById_User, create_User, updateById_User, removeById_User};
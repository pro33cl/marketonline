
// ----------------------------------------------------------
// IMPORTANDO
// ----------------------------------------------------------

import { pool } from "../database/connection.js";
import format from "pg-format";

// ----------------------------------------------------------
// FUNCIONES
// ----------------------------------------------------------

// FUNCION - COUNTPAGES
const countPages = async function (limit_V, filters_V) {

    const limit = limit_V;
    const { category, search } = filters_V;

    let query, formattedQuery;
    let values = [];
    let queryValues1 = [];
    let queryValues2 = [];
    let total_rows;
    let total_pages;

    if (category || search) {

        query = 'SELECT COUNT(*) FROM products WHERE';

        if (category) {

            values.push(category);
            queryValues1.push("category = '%s'");
        }

        if (search) {

            values.push(search);
            values.push(search);
            queryValues2.push("name = '%s'");
            queryValues2.push("description CONTAINS '%s'");
        }

        if(category && search){

            query = `${query} ${queryValues1} AND ( ${queryValues2.join(' OR ')} )`;

        }else if(category && !search){

            query = `${query} ${queryValues1}`;

        }else if(!category && search){

            query = `${query} ${queryValues2.join(' OR ')}`;

        }

        formattedQuery = format(query, ...values);
        const { rows: countResults } = await pool.query(formattedQuery);
        total_rows = parseInt(countResults[0].count, 10);

    }
    else {

        query = 'SELECT COUNT(*) FROM products';
        const { rows: countResults } = await pool.query(query);
        total_rows = parseInt(countResults[0].count, 10);
    }

    total_pages = limit > 0 ? Math.ceil(total_rows / limit) : 1;
    
    return total_pages;
}

// FUNCION - FINDALLBYFILTERPAGINATION_PRODUCTS
const findAllCategories = async function(){

    const query = "SELECT * FROM category";
    const formattedQuery = format(query);
    const {rows} = await pool.query(formattedQuery);
    return rows;
}

// FUNCION - FINDALLBYFILTERPAGINATION_PRODUCTS
const findAllByFilterPagination_Products = async function (filters_V, pagination_V) {

    const { category, search } = filters_V;
    const { orderby, order, limit, page} = pagination_V;
    const offset = (page-1)*limit;
    
    let query;
    let values = [];
    let queryValues1 = [];
    let queryValues2 = [];
    let formattedQuery;

    if(category || search){

        query = 'SELECT * FROM products WHERE';

        if (category) {

            values.push(category);
            queryValues1.push("category = '%s'");
        }

        if (search) {

            values.push(search);
            values.push(search);
            queryValues2.push("name = '%s'");
            queryValues2.push("description CONTAINS '%s'");
        }

        if(category && search){

            query = `${query} ${queryValues1} AND ( ${queryValues2.join(' OR ')} )`;

        }else if(category && !search){

            query = `${query} ${queryValues1}`;

        }else if(!category && search){

            query = `${query} ${queryValues2.join(' OR ')}`;
        }

        if(limit){

            values.push(orderby);
            values.push(order);

            if (limit <= 0) {

                query = `${query} ORDER BY %s %s`;
                formattedQuery = format(query, ...values);

            }else{

                values.push(limit);
                values.push(offset);
                query = `${query} ORDER BY %s %s LIMIT %s OFFSET %s`;
                formattedQuery = format(query, ...values);
            }

        }else{

            formattedQuery = format(query, ...values);
        }
    }
    else{

        values.push(orderby);
        values.push(order);

        if(limit<=0){
    
            query = 'SELECT * FROM products ORDER BY %s %s ';
            formattedQuery = format(query, ...values);
    
        }
        else{

            values.push(limit);
            values.push(offset);
            query = 'SELECT * FROM products ORDER BY %s %s LIMIT %s OFFSET %s';
            formattedQuery = format(query, ...values);
    
        }
    }

    const { rows } = await pool.query(formattedQuery);
    return rows;
}

// FUNCION - FINDBYFILTER_PRODUCTS
const findById_Product = async function (id) {

    const query = "SELECT * FROM products WHERE id = %s";
    const values = id;
    const formattedQuery = format(query, values);
    const {rows} = await pool.query(formattedQuery);
    return rows[0];

}


export const productsModel = { countPages, findAllCategories, findAllByFilterPagination_Products, findById_Product };
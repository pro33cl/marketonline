
// ----------------------------------------------------------
// IMPORTANDO
// ----------------------------------------------------------

import {pool} from "../database/connection.js";
import format from "pg-format";


// ----------------------------------------------------------
// FUNCIONES
// ----------------------------------------------------------

// Asociar category con id_category

// FUNCION - FINDIDCATEGORYBYSALE
const findIdCategoryBySale_Sales = async function(sale){

    const category = sale.category;

    const query = "SELECT * FROM category WHERE name = '%s'";
    const values = category;
    const formattedQuery = format(query, values);
    const {rows} = await pool.query(formattedQuery);
    return rows[0].id;
}

const countPages_Sales = async function(id_seller){

    const limit = 10;
    const query = `SELECT COUNT(*) FROM products WHERE id_seller = %s`;
    const values = id_seller;
    const formattedQuery = format(query, values);
    const { rows: countResults } = await pool.query(formattedQuery);
    total_rows = parseInt(countResults[0].count, 10);

    total_pages = limit > 0 ? Math.ceil(total_rows / limit) : 1;

    return total_pages;
}

// FUNCION - FINDALLBYID_SALES
const findAllById_Sales = async function(id_seller){

    const query = `SELECT products.id, products.name, products.image, products.description, products.price, category.name AS category
	                    FROM products 
	                    LEFT JOIN category 
	                    ON products.id_category = category.id
	                        WHERE products.id_seller = %s`;
    const values = id_seller;
    const formattedQuery = format(query, values);
    const {rows} = await pool.query(formattedQuery);
    return rows;
}

// FUNCION - FINDALLBYIDPAGINATION_SALES
const findAllByIdPagination_Sales = async function(id_seller, pagination_V){

    const query = `SELECT products.id, products.name, products.image, products.description, products.price, category.name AS category
                        FROM products 
                        LEFT JOIN category 
                        ON products.id_category = category.id
                        WHERE products.id_seller = %s`;

    const { orderby, order, limit, page} = pagination_V;
    const offset = (page-1)*limit;

    values.push(id_seller);

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

    const { rows } = await pool.query(formattedQuery);
    return rows;

} 

// FUNCION - FINBYID_SALE
const findById_Sale = async function(id){

    const query = `SELECT products.id, products.name, products.image, products.description, products.price, category.name AS category
                    FROM products 
                    LEFT JOIN category 
                    ON products.id_category = category.id
                        WHERE products.id = %s`;

    const values = id;
    const formattedQuery = format(query, values);
    const {rows} = await pool.query(formattedQuery);
    return rows[0];
} 

const create_Sale = async function(){} 

// FUNCION - CREATEBYID_SALE
const createById_Sale = async function(id_seller, sale){

    const id_category = await findIdCategoryBySale_Sales(sale);

    const query = "INSERT INTO products (name, image, description, price, id_category, id_seller) VALUES ('%s', '%s', '%s', %s, %s, %s) RETURNING *";
    const values = [sale.name, sale.image, sale.description, sale.price, id_category, id_seller];
    const formattedQuery = format(query, ...values);
    const {rows} = await pool.query(formattedQuery);
    return rows[0]; 
} 


// FUNCION - UPDATEBYID_SALE
const updateById_Sale = async function(id, sale){

    let query;
    let formattedQuery;

    const id_category = await findIdCategoryBySale_Sales(sale);

    if(sale.name && sale.name != undefined && isNaN(sale.name)){

        query = `UPDATE products SET name = '%s' WHERE id = %s`;
        formattedQuery = format(query, sale.name, id);
        let {rows} = await pool.query(formattedQuery);
    }

    if(sale.image && sale.image != undefined && isNaN(sale.image)){

        query = `UPDATE products SET image = '%s' WHERE id = %s`;
        formattedQuery = format(query, sale.image, id);
        let {rows} = await pool.query(formattedQuery);
    }

    if(sale.description && sale.description != undefined && isNaN(sale.description)){

        query = `UPDATE products SET description = '%s' WHERE id = %s`;
        formattedQuery = format(query, sale.description, id);
        let {rows} = await pool.query(formattedQuery);
    }

    if(sale.price && sale.price != undefined && !isNaN(sale.price)){

        query = `UPDATE products SET price = '%s' WHERE id = %s`;
        formattedQuery = format(query, sale.price, id);
        let {rows} = await pool.query(formattedQuery);
    }

    if(id_category && id_category != undefined && !isNaN(id_category)){

        query = `UPDATE products SET id_category = %s WHERE id = %s`;
        formattedQuery = format(query, id_category, id);
        let {rows} = await pool.query(formattedQuery);
    }

    const response = await findById_Sale(Number(id));
    return response;
}

// FUNCION - REMOVEBYID_SALE
const removeById_Sale = async function(id){

    const query = "DELETE FROM products WHERE id = %s RETURNING *";
    const formattedQuery = format(query, Number(id));
    const {rows} = await pool.query(formattedQuery);
    return rows[0];
}


export const salesModel = {countPages_Sales, findAllById_Sales, findAllByIdPagination_Sales, findById_Sale, createById_Sale , updateById_Sale, removeById_Sale};
// ----------------------------------------------------------
// IMPORTANDO
// ----------------------------------------------------------

import { productsModel } from "../models/products.model.js";


// ----------------------------------------------------------
// FUNCIONES
// ----------------------------------------------------------

// FUNCION - VERIFYFILTERPAGINATION
const VerifyFilterPagination = function (data){

    try {

        console.log("products.controller.VerifyFilterPagination: Start");
        const {category, search, limit, page, orderby} = data;

        let errorExist = false;
        let messageError = [];
        let responseJson = {message: "", result: null};
        let category_V, search_V, limit_V, page_V, orderby_V, order_V;
        let categories = [];
        

        categories = productsModel.findAllCategories();

        // Verificando category
        if(category){

            if(isNaN(category)){

                categories.forEach((element)=>{
                    if(element.name == category){
                        category_V = category;
                    }
                });

                if(!category_V){
                    category_V = null
                }
            }   
            else{

                category_V = null;
            }
        }
        else{

            category_V = null;
        }

        // Verificando search
        if(search){

            if(isNaN(search)){

               search_V = search;
            }   
            else{

                search_V = null;
            }
        }
        else{

            search_V = null;
        }

        // Verificando limit
        if(limit && !isNaN(limit) && limit!=undefined){

            if(limit>=0){

                limit_V = parseInt(limit,10);
            }else{

                limit_V = 0;
            }
        }
        else{
    
            limit_V = 0;
        }

        // Verificando page
        const total_pages = productsModel.countPages(limit_V, {category_V, search_V});

        if(page && !isNaN(page) && page!=undefined){

            if(total_pages >= page >1){

                page_V = parseInt(page,10);

            }else if(page < 1){

                page_V = 1;

            }else if (total_pages < page){

                page_V = total_pages;
            }
        }
        else{
    
            page_V = 1;
        }

        // Verificando order_by
        if(orderby && orderby!=undefined){

            const [orderby_param, orderby_order] = orderby.split("_");
    
            if(orderby_param && (orderby_param == "id" || orderby_param == "price")){
    
                orderby_V = orderby_param;
    
            }
            else{
    
                orderby_V = "id";
    
            }
    
            if(orderby_order && (orderby_order == "ASC" || orderby_order == "DESC")){
    
                order_V = orderby_order;
            }
            else{
    
                order_V = "ASC";
    
            }
        }
        else {
    
            orderby_V = "id";
            order_V = "ASC";
        }

        console.log("products.controller.VerifyFilterPagination: Verified");
        return {category_V, search_V, orderby_V, order_V, limit_V, page_V, total_pages};

    } catch (error) {

        console.log("products.controller.VerifyFilterPagination: Error");
        throw error;
    }
    finally{

        console.log("products.controller.VerifyFilterPagination: End");
    }
}



// FUNCION - FINDALLBYFILTERPAGINATION_PRODUCTS
const findAllByFilterPagination_Products = async function (req, res){

    try {

        console.log("products.controller.findAllByFilterPagination_Products: Start");
        const {category, search, orderby, order, limit, page} = await req.query;
        const {category_V, search_V, orderby_V, order_V, limit_V, page_V, total_pages} = VerifyFilterPagination({category, search, orderby, order, limit, page});

        const products = await productsModel.findAllByFilterPagination_Products({category_V, search_V},{orderby_V, order_V, limit_V, page_V});
        console.log("products.controller.findAllByFilterPagination_Products: Success");
        return res.status(200).json({message:"Success", result: {totalpages: total_pages, products: products}});

    } catch (error) {

        console.log("products.controller.findAllByFilterPagination_Products: Internal server error");
        return res.status(500).json({message: "Internal server error", result: error}); 
        
    }finally{

        console.log("products.controller.findAllByFilterPagination_Products: End");
    }
}

// FUNCION - FINDBYFILTER_PRODUCTS
const findById_Product = async function (req, res){

    try {

        console.log("products.controller.findById_Product: Start");
        const product_id = await req.params.id;
        const product = await productsModel.findById_Product(product_id);

        if(!product){

            console.log("products.controller.findById_Product: User not found");
            return res.status(404).json({message:"User not found", result: null});

        }else{

            console.log("products.controller.findById_Product: Success");
            return res.status(200).json({message:"Success", result: product});
        } 
    } catch (error) {

        console.log("products.controller.findById_Product: Internal server error");
        return res.status(500).json({message: "Internal server error", result: error}); 

    }finally{

        console.log("products.controller.findById_Product: End");
    }
}


// ----------------------------------------------------------
// EXPORTANDO
// ----------------------------------------------------------

export const productsController = { findAllByFilterPagination_Products, findById_Product };
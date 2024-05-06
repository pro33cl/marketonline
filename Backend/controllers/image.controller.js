// ----------------------------------------------------------
// IMPORTANDO
// ----------------------------------------------------------

import "dotenv/config";
import jwt from "jsonwebtoken";
import { imageModel } from "../models/image.model.js";
import { productsModel } from "../models/products.model.js";
import multer from 'multer';
import {dirname, extname, join} from 'path';
import {fileURLToPath} from 'url';
import { salesModel } from "../models/sales.model.js";

// ----------------------------------------------------------
// DECLARACIÓN VARIABLES
// ----------------------------------------------------------

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));
const FILETYPES = ['image/jpeg','image/png','image/jpg'];

const SERVER = process.env.SERVER || "http://localhost:";
const PORT = process.env.PORT || 3000;

// ----------------------------------------------------------
// FUNCIONES
// ----------------------------------------------------------

const upload = multer(
    {
        storage: multer.diskStorage({

            destination: join(CURRENT_DIR, "../uploads"),

            filename: (req, file, cb)=>{

                const id = req.params.id;
                const fileExtension = extname(file.originalname);
                const fileName = `imageproduct_${id}${fileExtension}`;

                cb(null,fileName);
            }
        }),

        fileFilter: (req, file, cb)=>{

            if(FILETYPES.includes(file.mimetype)){
                cb(null,true);
            }else{
                cb( new Error("Format file not accept"),false);
            }
        },

        limits:{fieldSize:10000000},

    }
);

const getById_Image = async function(req, res){

    try {

        console.log("image.controller.getById_Image: Start");
        const product_id = await req.params.id;
        const sale_exist = await productsModel.findById_Product(product_id);

        const image_name = sale_exist.image_name;

        if(sale_exist){

            const path = join(CURRENT_DIR, `../uploads/${image_name}`);
            console.log("image.controller.getById_Image: Success");
            return res.status(200).sendFile(path);

        }else{

            console.log("image.controller.getById_Image: Image not found");
            return res.status(404).json({message:"Image not found", result: null})

        }
        
    } catch (error) {

        console.log("image.controller.getById_Image: Internal server error");
        return res.status(500).json({message: "Internal server error", result: error});

    }finally{

        console.log("image.controller.getById_Image: End");
    }
}

const autorization_Image = async function(req, res, next){

    try {
        console.log("image.controller.autorization_Image: Start");
        const sale_id = await req.params.id;
        const Authorization = await req.header("Authorization");
        const token = Authorization.split(" ")[1];
        const {user_id, user_email} = jwt.decode(token);
        const sale_exist = await productsModel.findById_Product(sale_id);
    
        if(user_id == sale_exist.id_seller){
    
            console.log("image.controller.autorization_Image: Access to post");
            next();
        }
        else{
    
            console.log("sales.controller.updateById_Sale: No access to post");
            return res.status(400).json({message:"No access to post", result: null});
        }
        
    } catch (error) {

        console.log("sales.controller.updateById_Sale: Internal server error");
        return res.status(500).json({message: "Internal server error", result: error});
        
    }finally{

        console.log("image.controller.autorization_Image: End");
    }
}

const post_Image = async function(req, res){

    try {

        console.log("image.controller.create_Image: Start");
        const sale_id = await req.params.id;
        const file = await req.file;
        let sale_exist;
        let sale_updated;

        console.log(file);

        if(file){

            sale_exist = await productsModel.findById_Product(sale_id);
            const image_name = file.filename;
            const image_url = `${SERVER}${PORT}/productimage/${sale_id}`;
            sale_exist.image_name = image_name;
            sale_exist.image = image_url;
            sale_updated = await salesModel.updateById_Sale(sale_id, sale_exist);
            console.log("image.controller.create_Image: Posted");
            return res.status(201).json({message:"Posted", result: sale_updated});

        }else{

            console.log("image.controller.create_Image: Not posted");
            return res.status(201).json({message:"Not posted", result: file});
        }

    } catch (error) {

        console.log("image.controller.create_Image: Internal server error");
        return res.status(500).json({message: "Internal server error", result: error});
        
    }finally{

        console.log("image.controller.create_Image: End");
    }
  
}



// ----------------------------------------------------------
// EXPORTANDO
// ----------------------------------------------------------

export const imageController = { upload, autorization_Image, getById_Image, post_Image};
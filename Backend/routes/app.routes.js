// ----------------------------------------------------------
// IMPORTANDO
// ----------------------------------------------------------

import {usersController} from "../controllers/users.controller.js";
import {productsController} from "../controllers/products.controller.js";
import {salesController} from "../controllers/sales.controller.js";
import {credentialController} from "../controllers/credential.controller.js";
import {Router} from "express";

// ----------------------------------------------------------
// DECLARACION DE VARIABLES
// ----------------------------------------------------------

const router = Router();

// ----------------------------------------------------------
// GET
// ----------------------------------------------------------

router.get("/", productsController.findAll_Products);

router.get("/products/", productsController.findAll_Products);

router.get("/products/:id", productsController.findById_Product);

router.get("/products/filter/", productsController.findByFilter_Products);

router.get("/products/user/data", credentialController.validateToken, usersController.findById_User);

router.get("/products/user/sales", credentialController.validateToken, salesController.findAllById_Sales);

// ----------------------------------------------------------
// POST
// ----------------------------------------------------------

router.post("/products/login/", usersController.login);

router.post("/products/register/", usersController.create_User);

router.post("/products/user/sales", credentialController.validateToken, salesController.createById_Sale);

// ----------------------------------------------------------
// PUT
// ----------------------------------------------------------

router.put("/products/user/data", credentialController.validateToken, usersController.updateById_User);

router.put("/products/user/sales", credentialController.validateToken, salesController.updateById_Sale);

// ----------------------------------------------------------
// DELETE
// ----------------------------------------------------------

router.delete("/products/user/sales", credentialController.validateToken, salesController.removeById_Sale);

// ----------------------------------------------------------
// EXPORTANDO
// ----------------------------------------------------------

export default router;

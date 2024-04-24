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

router.get("/", productsController.welcome);

router.get("/products/", productsController.read);

router.get("/products/:id", productsController.readById);

router.get("/products/filter/", productsController.readByFilter);

router.get("/products/user/data", credentialController.validateToken, usersController.readUserById);

router.get("/products/user/sales", credentialController.validateToken, salesController.read);

// ----------------------------------------------------------
// POST
// ----------------------------------------------------------

router.post("/products/login/", usersController.login);

router.post("/products/register/", usersController.register);

router.post("/products/user/sales", credentialController.validateToken, salesController.add);

// ----------------------------------------------------------
// PUT
// ----------------------------------------------------------

router.put("/products/user/data", credentialController.validateToken, usersController.modifyById);

router.put("/products/user/sales", credentialController.validateToken, salesController.modifyById);

// ----------------------------------------------------------
// DELETE
// ----------------------------------------------------------

router.delete("/products/user/sales", credentialController.validateToken, salesController.deleteById);

// ----------------------------------------------------------
// EXPORTANDO
// ----------------------------------------------------------

export default router;

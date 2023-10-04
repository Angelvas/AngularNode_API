"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roles_controller_1 = require("../controllers/roles-controller");
const routerRoles = (0, express_1.Router)();
routerRoles.get('/getAllRoles', roles_controller_1.getAllRoles); //consulta todos los roles en la base de datos
routerRoles.get('/getRol', roles_controller_1.getRol); //consulta un rol en la base de datos
routerRoles.post('/postRol', roles_controller_1.postRol); // inserta un rol en la base de datos
routerRoles.delete('/deleteRol', roles_controller_1.deleteRol); // elimina el rol en la base de datos
routerRoles.post('/updateRoles', roles_controller_1.updateRoles); // actualiza el rol en la base de datos
exports.default = routerRoles;

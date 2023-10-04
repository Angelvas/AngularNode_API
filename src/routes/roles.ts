import {Router} from 'express';
import validarToken from './validarToken';
import { deleteRol, getAllRoles, getRol, postRol, updateRoles } from '../controllers/roles-controller';

const routerRoles = Router()

routerRoles.get('/getAllRoles', getAllRoles);//consulta todos los roles en la base de datos
routerRoles.get('/getRol', getRol);//consulta un rol en la base de datos
routerRoles.post('/postRol', postRol); // inserta un rol en la base de datos
routerRoles.delete('/deleteRol', deleteRol); // elimina el rol en la base de datos
routerRoles.post('/updateRoles', updateRoles); // actualiza el rol en la base de datos

export default routerRoles;
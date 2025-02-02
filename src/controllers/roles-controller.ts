import {Request, Response} from 'express';
import { Roles } from '../models/roles-models';
import jwt from 'jsonwebtoken';


//Obtiene todos los roles de la base de datos
export const getAllRoles = async (req: Request, res: Response) => {

    const _roles = await Roles.findAll();
    res.json({_roles})

}

//Obtiene un rol de la base de datos
export const getRol = async (req: Request, res: Response) => {
    const { id_rol } = req.body;

    const _rol = await Roles.findOne({
        where: {id_rol: id_rol}
    });
    if(_rol){
        res.json({_rol})
    }
    else{
        res.status(404).json({
            msg: `el Id del rol no existe: ${id_rol}`
        })
    }
}

//Inserta un rol en la base de datos
export const postRol = async (req: Request, res: Response) => {

    const { rol, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion  } = req.body;

    try{
        const _Rol = await Roles.findOne({
            where: {rol: rol}
        })
    
        if (_Rol){
            return res.status(400).json({
                msg: 'Rol ya registrado en la base de datos: '+ rol
            })
        }else{
            await Roles.create({
                rol: rol,
                descripcion: descripcion, 
                creado_por: creado_por,
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por,
                fecha_modificacion: fecha_modificacion
            })
            res.json({
                msg: 'El Rol: '+ rol+  ' ha sido creada exitosamente',
            })
        }
    }
    catch (error){
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        }); 
    }
    /*// Generamos token
    const token = jwt.sign({
        usuario: usuario
    }, process.env.SECRET_KEY || 'Lamers005*');
    res.json(token);*/
}

//Elimina un rol de la base de datos
export const deleteRol = async (req: Request, res: Response) => {
    const { id_rol } = req.body;

    const _rol = await Roles.findOne({
        where: {id_rol: id_rol}
    });
    if(_rol){
        return res.status(404).json({
            msg: 'Rol ya registrado en la base de datos: '+ id_rol
        });
    }

    await _rol.destroy();
    res.json({
        msg: 'El rol con el ID: '+ id_rol+  ' ha eliminada exitosamente',
    });
}

//actualiza el rol en la base de datos
export const updateRoles = async (req: Request, res: Response) => {
    const { id_rol, rol, descripcion, modificado_por, fecha_modificacion  } = req.body;

    const _rol = await Roles.findOne({
        where: {id_rol: id_rol}
    });
    if(!_rol){
        return res.status(404).json({
            msg: 'Rol con el ID: '+ id_rol +' no existe en la base de datos'
        });
    }

    await _rol.update({
        id_rol: id_rol,
        rol: rol,
        descripcion: descripcion,
        modificado_por: modificado_por,
        fecha_modificacion: fecha_modificacion
    });
    res.json({
        msg: 'El Rol con el ID: '+ id_rol+  ' ha sido actualizado exitosamente',
    });
}
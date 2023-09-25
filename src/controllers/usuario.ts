import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/usuario';
import jwt from 'jsonwebtoken';

export const newuser = async (req: Request, res: Response) => {
    const { usuario, nombre_usuario, correo_electronico, contrasena  } = req.body;
    const hashedPassword = await bcrypt.hash(contrasena, 10);
    const fecha_creacion = Date.now();

    const user = await User.findOne({
        where: {usuario: usuario}
    })

    if (user){
        return res.status(400).json({
            msg: 'Usuario ya existe: '+usuario
        })
    }

    try{
        await User.create({
            fecha_creacion: fecha_creacion,
            usuario: usuario,
            nombre_usuario: nombre_usuario,
            correo_electronico: correo_electronico,
            contrasena: hashedPassword
        })
    
        res.json({
            msg: 'Usuario: '+ usuario+ ' creado exitosamente',
        })
    }
    catch (error){
        res.status(400).json({
            msg: 'Error',
            error
        }); 
    }


} 

export const loginUser = async (req: Request, res: Response) => {
    const { 
        id_usuario,
        creado_por,
        fecha_creacion,
        modificado_por,
        fecha_modificacion,
        usuario, 
        nombre_usuario,
        correo_electronico,
        estado_usuario,
        contrasena,
        id_rol,
        fecha_ultima_conexion,
        preguntas_contestadas,
        primer_ingreso,
        fecha_vencimiento

     } = req.body;

    
    
    //Validar si el usuario existe en la base de datos
    const user: any = await User.findOne({
        where: {usuario: usuario}
    })

    try{
        if(user.estado_usuario = false){
            return res.status(400).json({
                msg: 'Usuario inactivo '+ usuario
            })
        }
    }catch(error){
        res.status(400).json({
            msg: 'Error',
            error
        }); 
    }

    //Validamos password

    const passwordValid = await bcrypt.compare(contrasena, user.contrasena);
    if(!passwordValid){
        return res.status(400).json({
            msg: 'Contraseña incorrecta',
        }); 
    }

    // Generamos token

    const token = jwt.sign({
        usuario: usuario
    }, process.env.SECRET_KEY || 'Lamers005*');
       
    res.json(token);
}
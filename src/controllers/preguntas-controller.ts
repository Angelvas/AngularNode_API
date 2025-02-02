import {Request, Response} from 'express';
import { Preguntas } from '../models/preguntas-model';
import jwt from 'jsonwebtoken';


//Obtiene todas las preguntas de la base de datos
export const getAllPreguntas = async (req: Request, res: Response) => {

    const _pregunta = await Preguntas.findAll();
    res.json({_pregunta})

}

//Obtiene una pregunta de la base de datos
export const getPregunta = async (req: Request, res: Response) => {
    const { id_pregunta } = req.body;

    const _pregunta = await Preguntas.findOne({
        where: {id_pregunta: id_pregunta}
    });
    if(_pregunta){
        res.json({_pregunta})
    }
    else{
        res.status(404).json({
            msg: `el ID de la pregunta no existe: ${id_pregunta}`
        })
    }
}

//Inserta una pregunta en la base de datos
export const postPregunta = async (req: Request, res: Response) => {

    const { pregunta, creado_por, fecha_creacion, modificado_por, fecha_modificacion  } = req.body;

    try{
        const _Pregunta = await Preguntas.findOne({
            where: {pregunta: pregunta}
        })
    
        if (_Pregunta){
            return res.status(400).json({
                msg: 'Pregunta ya registrada en la base de datos: '+ pregunta
            })
        }else{
            await Preguntas.create({
                pregunta: pregunta,
                creado_por: creado_por,
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por,
                fecha_modificacion: fecha_modificacion
            })
            res.json({
                msg: 'La pregunta: '+ pregunta+  ' ha sido creada exitosamente',
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

//Elimina la pregunta de la base de datos
export const deletePregunta = async (req: Request, res: Response) => {
    const { id_pregunta } = req.body;

    const _pregunta = await Preguntas.findOne({
        where: {id_pregunta: id_pregunta}
    });
    if(_pregunta){
        return res.status(404).json({
            msg: 'Pregunta ya registrada en la base de datos: '+ id_pregunta
        });
    }

    await _pregunta.destroy();
    res.json({
        msg: 'La pregunta con el ID: '+ id_pregunta+  ' ha eliminada exitosamente',
    });
}

//actualiza la pregunta de la base de datos
export const updatePregunta = async (req: Request, res: Response) => {
    const { id_pregunta, pregunta, modificado_por, fecha_modificacion  } = req.body;

    const _pregunta = await Preguntas.findOne({
        where: {id_pregunta: id_pregunta}
    });
    if(!_pregunta){
        return res.status(404).json({
            msg: 'Pregunta con el ID: '+ id_pregunta +' no existe en la base de datos'
        });
    }

    await _pregunta.update({
        id_pregunta: id_pregunta,
        pregunta: pregunta,
        modificado_por: modificado_por,
        fecha_modificacion: fecha_modificacion
    });
    res.json({
        msg: 'La pregunta con el ID: '+ id_pregunta+  ' ha sido actualizada exitosamente',
    });
}
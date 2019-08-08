import {Router, Request, Response} from 'express';
import Mysql from '../mysql/mysql';
import { isNumber } from 'util';

const router = Router();

router.get('/heroe', (req: Request, resp: Response) =>{

    const query ='select id, nombre, poder from hereos';
    Mysql.ejecutarQuery(query, (err: any, heroes: Object[])=>{
        if(err){
            resp.status(400).json({
                err:true,
                error:err
            });
        }else{
            resp.json({
                ok:true,
                heroes
            })
        }
    });
});

router.get('/heroe/:id', (req: Request, resp: Response) =>{
    try{
        let id= req.params.id;
        const scapeID = Mysql.instance.connection.escape(id);  // para que no envien cosas raras como injecciones
    // if(!id || !Number(id)){
    //     resp.status(400).json({
    //         err:true,
    //         error:'El id es un parámetro númerico y obligatorio'
    //     });
    // }
        const query ='select id, nombre, poder from hereos where id ='+scapeID;
        Mysql.ejecutarQuery(query, (err: any, heroes: Object[])=>{
            if(err){
                return resp.status(500).json({
                    err:true,
                    error:err
                });
            }else{
                return  resp.json({
                    ok:true,
                    heroes
                })
            }
        });
    }catch(error){
        console.log('asd1');
        return resp.status(500).json({
            err:true,
            error:error
        });
    }
    
});


export default  router;
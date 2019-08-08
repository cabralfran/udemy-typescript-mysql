import mysql = require('mysql');

export default class Mysql{

    private  static _instance : Mysql;

    connection: mysql.Connection;

    constructor (){
        console.log('se inicializo la instancia de MYSQL');
        this.connection= mysql.createConnection({
            host:'localhost',
            user: 'node_user',
            password:'123456',
            database:'node_db'
        });
        this.conectarDB();
    }

    public static get instance(){
        if(!this._instance){
            this._instance = new Mysql();
        }
        return this._instance;
    }

    public static  ejecutarQuery(query: string, callback: Function){
        try{
            this.instance.connection.query(query, (err:any, results:Object[], fields:any[]) =>{
                if(err){
                    console.log('Error en query: '+ err);
                    return callback(err);
                }else{
                    if(!results || results.length===0){
                        return callback('No se obtuvieron datos');
                    }else{
                        callback(null,results)
                    }
                }
            })
        }catch(error){
            return callback(error); 
        }
        
    }

    private conectarDB(){
        this.connection.connect((err: mysql.MysqlError)=>{
             if(err){
                 console.log(err.message);
                 return;
             }
             console.log('Base de datos online');
        });
    }

}
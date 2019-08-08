"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class Mysql {
    constructor() {
        console.log('se inicializo la instancia de MYSQL');
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'node_user',
            password: '123456',
            database: 'node_db'
        });
        this.conectarDB();
    }
    static get instance() {
        if (!this._instance) {
            this._instance = new Mysql();
        }
        return this._instance;
    }
    static ejecutarQuery(query, callback) {
        try {
            this.instance.connection.query(query, (err, results, fields) => {
                if (err) {
                    console.log('Error en query: ' + err);
                    return callback(err);
                }
                else {
                    if (!results || results.length === 0) {
                        return callback('No se obtuvieron datos');
                    }
                    else {
                        callback(null, results);
                    }
                }
            });
        }
        catch (error) {
            return callback(error);
        }
    }
    conectarDB() {
        this.connection.connect((err) => {
            if (err) {
                console.log(err.message);
                return;
            }
            console.log('Base de datos online');
        });
    }
}
exports.default = Mysql;
